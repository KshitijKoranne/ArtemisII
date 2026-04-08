'use client';

const CREW = [
  {
    name: 'Reid Wiseman',
    role: 'Commander',
    agency: 'NASA',
    flag: '🇺🇸',
    bio: 'U.S. Navy test pilot and NASA astronaut. Former Commander of ISS Expedition 41. First Artemis II mission.',
    missions: 'ISS Expedition 40/41 (2014)',
    twitter: '@astro_reid',
    color: '#4a9eff',
    initials: 'RW',
  },
  {
    name: 'Victor Glover',
    role: 'Pilot',
    agency: 'NASA',
    flag: '🇺🇸',
    bio: 'U.S. Navy test pilot. First Black astronaut to serve as Pilot on a lunar mission. ISS Crew Dragon veteran.',
    missions: 'SpX-Crew 1 (2020–21)',
    twitter: '@AstroVicGlover',
    color: '#22c55e',
    initials: 'VG',
  },
  {
    name: 'Christina Koch',
    role: 'Mission Specialist',
    agency: 'NASA',
    flag: '🇺🇸',
    bio: 'First woman to travel to deep space. Holds record for longest single spaceflight by a woman — 328 days.',
    missions: 'ISS Expedition 59–62 (2019–20)',
    twitter: '@Astro_Christina',
    color: '#a78bfa',
    initials: 'CK',
  },
  {
    name: 'Jeremy Hansen',
    role: 'Mission Specialist',
    agency: 'CSA',
    flag: '🇨🇦',
    bio: "First non-American to travel to the Moon. Canadian Space Agency astronaut and former CF-18 fighter pilot. First spaceflight.",
    missions: 'First Spaceflight',
    twitter: '@Astro_Jeremy',
    color: '#f59e0b',
    initials: 'JH',
  },
];

export default function CrewProfiles() {
  return (
    <section className="fade-in-up delay-5">
      <div className="label-tag mb-4 text-white" style={{ fontSize: '11px', letterSpacing: '0.2em' }}>
        CREW · ORION INTEGRITY
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CREW.map((member) => (
          <div key={member.name} className="panel panel-corner p-4 md:p-5 group transition-all duration-300 hover:-translate-y-0.5">
            {/* Avatar */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-orbitron font-black text-sm"
                   style={{
                     background: `radial-gradient(circle at 35% 35%, ${member.color}30, ${member.color}10)`,
                     border: `2px solid ${member.color}50`,
                     color: member.color,
                     boxShadow: `0 0 12px ${member.color}20`,
                   }}>
                {member.initials}
              </div>
              <div>
                <div className="font-orbitron font-bold text-sm text-white leading-tight">{member.name}</div>
                <div className="label-tag mt-0.5" style={{ color: member.color }}>{member.role}</div>
                <div className="label-tag mt-0.5" style={{ fontSize: '9px' }}>
                  {member.flag} {member.agency}
                </div>
              </div>
            </div>

            <div className="nasa-divider mb-3"></div>

            <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(200,211,232,0.8)' }}>
              {member.bio}
            </p>

            <div style={{ background: 'rgba(74,158,255,0.06)', border: '1px solid rgba(74,158,255,0.12)', borderRadius: 3, padding: '6px 8px' }}>
              <div className="label-tag mb-0.5" style={{ fontSize: '8px' }}>Previous Mission</div>
              <div className="font-orbitron text-xs" style={{ color: member.color, letterSpacing: '0.05em' }}>{member.missions}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
