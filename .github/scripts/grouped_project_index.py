from pathlib import Path
from PIL import Image

script_path = Path('script.js')
s = script_path.read_text()


def replace_once(old: str, new: str, label: str):
    global s
    if old not in s:
        raise SystemExit(f'Missing expected block: {label}')
    s = s.replace(old, new, 1)

# Re-encode the ECS reference graphic to a browser-safe WebP and update its path.
png = Path('assets/projects/shield/military-aircraft.png')
webp = Path('assets/projects/shield/military-aircraft.webp')
with Image.open(png) as image:
    image.load()
    if image.mode not in ('RGB', 'RGBA'):
        image = image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
    image.save(webp, 'WEBP', quality=92, method=6)
s = s.replace('assets/projects/shield/military-aircraft.png', 'assets/projects/shield/military-aircraft.webp')

# Academic / internship projects use the same gray company-band hierarchy as professional work.
replace_once(
"""// Academic and internship projects keep Company · Job Title directly above each project title.
document.querySelectorAll('.early-company-band').forEach((band) => band.remove());
""",
"""// Academic and internship projects use the same gray company-band hierarchy as professional work.
document.querySelectorAll('.early-company-band').forEach((band) => band.remove());
let previousEarlyCompany = '';
document.querySelectorAll('.early-project').forEach((project) => {
  const roleLine = project.querySelector('.early-copy .role-line');
  if (!roleLine) return;
  const { company, role } = splitRole(roleLine.textContent);
  if (!company) return;

  if (company !== previousEarlyCompany) {
    const band = document.createElement('header');
    band.className = 'early-company-band';
    const companyName = document.createElement('h2');
    companyName.textContent = company;
    band.append(companyName);
    project.before(band);
  }

  previousEarlyCompany = company;
  if (role) roleLine.textContent = role;
});
""",
'academic company bands')

# Replace the split professional/academic shortcut lists with one grouped project index above both sections.
start = s.find("const academicProjectIds = new Set([")
end = s.find("const reduceMotion = window.matchMedia", start)
if start == -1 or end == -1:
    raise SystemExit('Missing existing project shortcut block')

new_shortcuts = r"""const projectGroups = [
  {
    name: 'Aerospace',
    ids: [
      'xbat-wing-fold',
      'xbat-ecs',
      'vbat',
      'intel-fixed-wing',
      'sensorcraft',
      'uav-launcher',
      'skysafe-gen2',
      'aero-uav'
    ]
  },
  {
    name: 'Consumer Products',
    ids: ['flexstyle', 'hyperair', 'speedstyle', 'smoothstyle']
  },
  {
    name: 'Machine Design',
    ids: ['reverb-metal-printer', 'cnc-mill']
  },
  {
    name: 'Software & Modeling',
    ids: ['mission-control', 'matlab-heat-flux', 'zinc-air-battery']
  }
];

const projectById = new Map(projectDefinitions.map((project) => [project.id, project]));
const expertiseSection = document.querySelector('#expertise');
if (expertiseSection && !document.querySelector('.project-jump')) {
  const jump = document.createElement('section');
  jump.className = 'project-jump shell';
  jump.setAttribute('aria-labelledby', 'project-jump-title');

  const title = document.createElement('h2');
  title.className = 'project-jump-title';
  title.id = 'project-jump-title';
  title.textContent = 'Project Shortcuts';

  const groups = document.createElement('div');
  groups.className = 'project-shortcut-groups';

  projectGroups.forEach(({ name, ids }) => {
    const group = document.createElement('section');
    group.className = 'project-shortcut-group';

    const heading = document.createElement('h3');
    heading.textContent = name;

    const nav = document.createElement('nav');
    nav.className = 'project-jump-links';
    nav.setAttribute('aria-label', `${name} projects`);

    ids.forEach((id) => {
      const project = projectById.get(id);
      if (!project || !document.getElementById(id)) return;
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = project.label;
      nav.append(link);
    });

    group.append(heading, nav);
    groups.append(group);
  });

  jump.append(title, groups);
  expertiseSection.after(jump);
}

"""
s = s[:start] + new_shortcuts + s[end:]
script_path.write_text(s)

# Replace the cleanup stylesheet with a clear three-level hierarchy:
# dark major section banners, gray company bands, then project titles.
Path('cleanup.css').write_text(r'''.site-header nav a[href^="mailto:"] {
  display: none;
}

.header-actions {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 14px;
}
.header-actions a[href*="Stephen_Murphy_Resume"] { order: 1; }
.header-actions a[href^="mailto:"] { order: 2; }

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.hero-actions a[href*="Stephen_Murphy_Resume"] { order: 1; }
.hero-actions a[href^="mailto:"] { order: 2; }

/* Major page sections are visually distinct from company bands. */
.expertise > .kicker,
.portfolio-section-heading,
.academic-group-header {
  background: var(--ink);
  color: #fff;
  border: 1px solid var(--ink);
  border-radius: 18px;
}

.expertise > .kicker {
  display: block;
  margin: 0 0 30px;
  padding: 27px 30px;
  color: #fff;
  font-size: clamp(34px, 4.2vw, 50px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -.04em;
  text-transform: none;
}

.portfolio-section-heading,
.academic-group-header {
  margin-top: 72px;
  margin-bottom: 30px;
  padding: 27px 30px;
}

.portfolio-section-heading h2,
.academic-group-header h2 {
  margin: 0;
  color: #fff;
  font-size: clamp(34px, 4.2vw, 50px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -.04em;
}

/* One project index spans professional and academic work. */
.project-jump {
  padding: 8px 0 10px;
}
.project-jump-title {
  margin-bottom: 20px;
  font-size: 25px;
  line-height: 1.1;
  letter-spacing: -.025em;
}
.project-shortcut-groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px 34px;
}
.project-shortcut-group {
  min-width: 0;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}
.project-shortcut-group h3 {
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: .01em;
}

/* Company names always use the same gray parent-band treatment. */
.company-section {
  border-top: 1px solid var(--line);
}
.company-header .kicker,
.single-company-band h2,
.early-company-band h2 {
  margin: 0;
  color: var(--ink);
  font-size: clamp(30px, 3.7vw, 44px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -.035em;
  text-transform: none;
}
.company-header h2 {
  display: none;
}
.single-company-band,
.early-company-band {
  padding-top: 24px;
  padding-bottom: 24px;
}
.early-company-band {
  display: block;
}

.academic-group {
  background: var(--surface);
}
.academic-group-header {
  margin-bottom: 30px;
}
.academic-group .earlier {
  padding-top: 0;
  background: transparent;
}

.carousel figcaption a {
  text-decoration: underline;
  text-underline-offset: 2px;
}

@media (max-width: 720px) {
  .header-actions {
    gap: 9px;
  }
  .header-actions .header-link {
    font-size: 12px;
  }
  .expertise > .kicker,
  .portfolio-section-heading h2,
  .academic-group-header h2 {
    font-size: 34px;
  }
  .expertise > .kicker,
  .portfolio-section-heading,
  .academic-group-header {
    border-radius: 14px;
  }
  .expertise > .kicker {
    padding: 22px 18px;
  }
  .portfolio-section-heading,
  .academic-group-header {
    margin-top: 52px;
    margin-bottom: 24px;
    padding: 22px 18px;
  }
  .project-shortcut-groups {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .company-header .kicker,
  .single-company-band h2,
  .early-company-band h2 {
    font-size: 32px;
  }
  .single-company-band,
  .early-company-band {
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
''')
