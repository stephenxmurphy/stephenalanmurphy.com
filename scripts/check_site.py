#!/usr/bin/env python3
"""Lightweight structural checks for the static portfolio."""

from __future__ import annotations

from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
import sys
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]


class DocumentParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: list[str] = []
        self.references: list[tuple[str, str, str, int]] = []
        self.images: list[tuple[dict[str, str | None], int]] = []
        self.canonical: str | None = None
        self.title_count = 0
        self.description_count = 0
        self.h1_count = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        line = self.getpos()[0]
        if element_id := values.get("id"):
            self.ids.append(element_id)
        if tag == "img":
            self.images.append((values, line))
        if tag == "h1":
            self.h1_count += 1
        if tag == "link" and values.get("rel") == "canonical":
            self.canonical = values.get("href")
        if tag == "meta" and values.get("name") == "description":
            self.description_count += 1
        for attribute in ("href", "src", "poster"):
            if value := values.get(attribute):
                self.references.append((tag, attribute, value, line))

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)

    def handle_data(self, data: str) -> None:
        # HTMLParser does not expose title state, so the counter is set in the
        # explicit start/end handlers below.
        pass

    def handle_endtag(self, tag: str) -> None:
        pass


def parse(path: Path) -> DocumentParser:
    parser = DocumentParser()
    parser.feed(path.read_text(encoding="utf-8"))
    parser.title_count = path.read_text(encoding="utf-8").lower().count("<title>")
    return parser


def main() -> int:
    errors: list[str] = []
    documents = {path.resolve(): parse(path) for path in sorted(ROOT.glob("*.html"))}

    for path, document in documents.items():
        label = path.relative_to(ROOT)
        duplicate_ids = [key for key, count in Counter(document.ids).items() if count > 1]
        if duplicate_ids:
            errors.append(f"{label}: duplicate IDs: {', '.join(duplicate_ids)}")
        if document.title_count != 1:
            errors.append(f"{label}: expected one title, found {document.title_count}")
        if document.description_count != 1:
            errors.append(f"{label}: expected one meta description, found {document.description_count}")
        if document.h1_count != 1:
            errors.append(f"{label}: expected one h1, found {document.h1_count}")
        if label.name != "404.html" and not document.canonical:
            errors.append(f"{label}: missing canonical URL")

        ids = set(document.ids)
        for tag, attribute, value, line in document.references:
            parsed = urlparse(value)
            if parsed.scheme in {"http", "https", "mailto", "tel", "data"} or value.startswith("//"):
                continue
            if value.startswith("#"):
                if value[1:] not in ids:
                    errors.append(f"{label}:{line}: broken fragment {value}")
                continue
            if parsed.path.startswith("/"):
                target = (ROOT / unquote(parsed.path.lstrip("/"))).resolve()
            else:
                target = (path.parent / unquote(parsed.path)).resolve() if parsed.path else path
            if not target.exists():
                errors.append(f"{label}:{line}: missing {tag} {attribute} target {value}")
            elif parsed.fragment and target.suffix.lower() == ".html":
                target_document = documents.get(target) or parse(target)
                if parsed.fragment not in target_document.ids:
                    errors.append(f"{label}:{line}: broken target fragment {value}")

        for attributes, line in document.images:
            source = attributes.get("src", "")
            if "alt" not in attributes:
                errors.append(f"{label}:{line}: image missing alt text: {source}")
            if source and not urlparse(source).scheme and not source.lower().endswith(".svg"):
                if not attributes.get("width") or not attributes.get("height"):
                    errors.append(f"{label}:{line}: local image missing dimensions: {source}")

    sitemap = ET.parse(ROOT / "sitemap.xml")
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemap_urls = {element.text for element in sitemap.findall(".//sm:loc", namespace)}
    canonical_urls = {
        document.canonical
        for path, document in documents.items()
        if path.name != "404.html" and document.canonical
    }
    if sitemap_urls != canonical_urls:
        errors.append("sitemap URLs do not match canonical page URLs")

    if errors:
        print("Site checks failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Site checks passed for {len(documents)} HTML files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
