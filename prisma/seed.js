const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

function role({ summary, duringYear, onSite, skills, lookingFor, age }) {
  return [
    summary,
    '',
    'Weekly time commitment: 3-4 hours per week during the build season. During race week itself, this becomes a full-time commitment.',
    '',
    'During the year:',
    ...duringYear.map((line) => `- ${line}`),
    '',
    'On-site (race week):',
    ...onSite.map((line) => `- ${line}`),
    '',
    `Skills & tools: ${skills.join(', ')}`,
    '',
    `Who we're looking for: ${lookingFor}`,
    '',
    `Age requirement: ${age}`,
  ].join('\n');
}

const POSITIONS = [
  {
    title: 'Team Captain / Project Manager',
    teamSize: '1 student',
    department: 'Leadership',
    description: role({
      summary:
        'The Team Captain is responsible for keeping the entire project on schedule and making sure all departments are working toward the same goal. This role holds an overview of the whole build, identifying problems before they affect the final result.',
      duringYear: [
        'Run the weekly team meeting and collect progress updates from each department.',
        'Identify where the work of different teams may conflict and resolve it early.',
        'Maintain a shared project timeline so deadlines are clear to everyone.',
        'Track the budget together with the Logistics & Welfare Coordinator.',
        'Follow up with team members who are falling behind.',
        "Report honestly to the teacher supervisor on the project's status, including delays.",
      ],
      onSite: [
        "Act as the team's main point of contact with the Shell Eco-marathon organizers.",
        'Handle schedules, paperwork, and decisions that arise on short notice.',
        'Coordinate where team members need to be throughout each day (scrutineering, practice runs, rest periods).',
      ],
      skills: ['Microsoft Excel / Teams', 'Google Workspace (Sheets, Docs)', 'Microsoft Planner'],
      lookingFor:
        'Well organized, able to manage several responsibilities at once, and comfortable communicating with teachers, other teams, and event organizers independently. Technical expertise is less important than the ability to keep the project moving and to hold the team accountable to its deadlines.',
      age: 'Shell Eco-marathon requires a minimum age of 16. Because this role involves budget responsibility and representing the team to organizers, the school may set an internal minimum age of 18 at its discretion.',
    }),
  },
  {
    title: 'Sponsorship & Communications Officer',
    teamSize: '1 student',
    department: 'Operations',
    description: role({
      summary:
        'The Sponsorship & Communications Officer secures the funding that makes the project possible and manages how the team presents itself to sponsors and the public.',
      duringYear: [
        'Identify and contact potential sponsors and prepare pitch materials.',
        'Maintain sponsor relationships throughout the year.',
        "Manage the team's Instagram and Facebook, posting regularly on the build.",
        'Prepare entries for Shell Eco-marathon off-track awards (Telemetry, Data Communication, Safety, etc.), working with the relevant engineers for accurate technical content.',
      ],
      onSite: [
        'Produce and publish live content during race week, including results and updates.',
        'Keep sponsors informed directly throughout the event.',
        'Help represent the team in judging sessions if shortlisted for an off-track award.',
      ],
      skills: ['Canva', 'Adobe Photoshop, Illustrator, Premiere', 'Inkscape', 'GIMP'],
      lookingFor:
        "A capable writer, able to adapt between formal sponsor correspondence and public social media content. Consistency is essential, as sponsors and followers notice when a team's communication lapses.",
      age: 'Minimum age 16, in line with Shell Eco-marathon rules.',
    }),
  },
  {
    title: 'Logistics & Welfare Coordinator',
    teamSize: '1 student',
    department: 'Operations',
    description: role({
      summary:
        'The Logistics & Welfare Coordinator ensures the practical side of the project runs smoothly, from parts arriving on time to the team being properly supported during race week.',
      duringYear: [
        'Order and track parts and materials, and monitor the budget with the Captain.',
        'Maintain a checklist of tools, spares, and camping equipment for the event.',
        'Plan the campsite and paddock layout ahead of departure.',
        'Prepare the race-week meal plan and shopping list.',
        "Set up the team's WhatsApp and Discord communication channels.",
      ],
      onSite: [
        'Lead the loading and unloading of the vehicles, checking against the list so nothing is left behind.',
        'Manage setup and breakdown of the campsite and organize a cleaning rota.',
        'Arrange meals and run the daily schedule (wake-up times, meals, work shifts).',
        "Act as the team's central reference point for daily organization.",
      ],
      skills: ['Microsoft Excel', 'Google Sheets', 'Microsoft Planner'],
      lookingFor:
        'Highly organized and comfortable with detailed record-keeping, while also willing to take on hands-on, practical work on-site. The role combines administrative and physical responsibilities in roughly equal measure.',
      age: 'Minimum age 16, in line with Shell Eco-marathon rules.',
    }),
  },
  {
    title: 'Chassis & Structures Engineer',
    teamSize: '1 student',
    department: 'Engineering',
    description: role({
      summary:
        'The chassis forms the structural foundation of the vehicle. Every other system, including the battery, electronics, and autonomous sensors, is mounted to it, so the accuracy of this work affects the entire car.',
      duringYear: [
        "Design and build the vehicle frame within Shell Eco-marathon's structural and safety regulations.",
        'Minimize weight, as every additional kilogram reduces efficiency.',
        'Coordinate with the aerodynamics and electrical teams on component placement.',
        'Understand the materials and structural loads well enough to justify the design at technical inspection.',
      ],
      onSite: [
        'Inspect the chassis for cracks, loosened fasteners, or shifted components between runs, and carry out repairs.',
        'Support the team during scrutineering by explaining the structural design to inspectors.',
      ],
      skills: ['Fusion 360', 'SolidWorks', 'Blender'],
      lookingFor:
        'An interest in CAD software and in materials and structural design. Prior mastery is not expected, but a genuine wish to understand how a structure carries load is important.',
      age: 'Minimum age 16, in line with Shell Eco-marathon rules. This engineer is also a strong candidate for the Driver or Reserve Driver role, given their detailed knowledge of the chassis dimensions.',
    }),
  },
  {
    title: 'Aerodynamics & Bodywork Engineer',
    teamSize: '1 student',
    department: 'Engineering',
    description: role({
      summary:
        'In an efficiency competition, aerodynamic drag has a significant effect on performance. Two vehicles of similar appearance can perform quite differently depending on how air flows around them.',
      duringYear: [
        "Design the vehicle's aerodynamic body within the regulations and the chassis constraints.",
        'Use CFD simulation or physical testing to reduce drag.',
        'Manufacture the outer shell in composite materials such as carbon fiber or fiberglass.',
        'Handle finishing and weight optimization of the bodywork.',
      ],
      onSite: [
        'Check the fit of the bodywork panels before each run.',
        'Carry out composite repairs on-site if a panel is damaged during transport or a run.',
      ],
      skills: ['Fusion 360 (CAD + Simulation)', 'SolidWorks + SolidWorks Flow Simulation', 'Autodesk CFD'],
      lookingFor:
        'An interest in fluid dynamics and simulation, in hands-on composite fabrication, or in both. Either background is a suitable starting point.',
      age: 'Minimum age 16, in line with Shell Eco-marathon rules.',
    }),
  },
  {
    title: 'Battery & Powertrain Engineer',
    teamSize: '1 student',
    department: 'Engineering',
    description: role({
      summary:
        'The battery and motor are what drive the vehicle. Errors in this area are not only a performance concern but a safety one, so this role carries a high level of responsibility.',
      duringYear: [
        'Design the battery pack and its Battery Management System.',
        'Select and integrate the electric motor and controller.',
        'Ensure safety compliance throughout the design.',
        "Understand the vehicle's energy requirements and efficient power delivery to the wheels.",
      ],
      onSite: [
        'Manage battery charging or replacement between runs.',
        'Perform safety and performance checks before every run without exception.',
        'Monitor the Battery Management System data and troubleshoot powertrain problems on-site.',
      ],
      skills: ['KiCad', 'Python (data logging / analysis)'],
      lookingFor:
        'A genuine interest in electrical engineering or energy storage, working in a careful, methodical manner, as this is safety-critical work.',
      age: 'Minimum age 16, in line with Shell Eco-marathon rules. Because this work involves battery and high-voltage systems, the school may set an internal minimum age of 18 for this role at its discretion.',
    }),
  },
  {
    title: 'Electrical Systems & Wiring Engineer',
    teamSize: '1 student',
    department: 'Engineering',
    description: role({
      summary:
        'Every sensor and controller in the vehicle must be connected reliably and safely, and the wiring must withstand the vibration and movement of a car in operation.',
      duringYear: [
        'Design the wiring harness and low-voltage systems.',
        "Integrate the vehicle's sensors into the wiring.",
        'Work closely with the Battery & Powertrain Engineer and the Autonomous Systems team.',
      ],
      onSite: [
        'Diagnose and repair electrical faults (loose connectors, shorts, sensors not reporting), often under time pressure between runs.',
        'Support the electrical portion of technical inspection.',
      ],
      skills: ['KiCad'],
      lookingFor: 'Works methodically and is comfortable with circuit design and, in particular, with systematic debugging.',
      age: 'Minimum age 16, in line with Shell Eco-marathon rules.',
    }),
  },
  {
    title: 'Autonomous Systems & Perception Engineer — Position A',
    teamSize: '2 students total for this position',
    department: 'Autonomous Systems',
    description: role({
      summary:
        "Developing the vehicle's self-driving capability is the most demanding technical challenge the team has undertaken. The workload and complexity are beyond what a single student can manage, so the position is filled by two engineers working in partnership.",
      duringYear: [
        'Build and test the system first in a ROS2 and Gazebo simulation before deploying to the physical vehicle.',
        'Develop the autonomous driving software, including path planning and decision-making.',
        'Work with cameras, LiDAR, and GPS to build the detection systems.',
        'Carry out substantial programming and testing, with repeated refinement expected.',
      ],
      onSite: [
        'Calibrate the sensors for the actual track lighting and conditions.',
        "Tune the vehicle's behavior and resolve issues between runs.",
        'Record run data to improve performance over successive attempts.',
      ],
      skills: ['Python', 'C++', 'ROS2', 'Gazebo (simulation)', 'OpenCV', 'PyTorch', 'Raspberry Pi'],
      lookingFor:
        'Programming experience in Python or C++ and a genuine interest in robotics or computer vision. Equally important is the ability to collaborate closely, as the role depends on the two engineers working as a genuine team rather than dividing the work independently.',
      age: 'Minimum age 16, in line with Shell Eco-marathon rules.',
    }),
  },
  {
    title: 'Autonomous Systems & Perception Engineer — Position B',
    teamSize: '2 students total for this position',
    department: 'Autonomous Systems',
    description: role({
      summary:
        "Developing the vehicle's self-driving capability is the most demanding technical challenge the team has undertaken. The workload and complexity are beyond what a single student can manage, so the position is filled by two engineers working in partnership.",
      duringYear: [
        'Build and test the system first in a ROS2 and Gazebo simulation before deploying to the physical vehicle.',
        'Develop the autonomous driving software, including path planning and decision-making.',
        'Work with cameras, LiDAR, and GPS to build the detection systems.',
        'Carry out substantial programming and testing, with repeated refinement expected.',
      ],
      onSite: [
        'Calibrate the sensors for the actual track lighting and conditions.',
        "Tune the vehicle's behavior and resolve issues between runs.",
        'Record run data to improve performance over successive attempts.',
      ],
      skills: ['Python', 'C++', 'ROS2', 'Gazebo (simulation)', 'OpenCV', 'PyTorch', 'Raspberry Pi'],
      lookingFor:
        'Programming experience in Python or C++ and a genuine interest in robotics or computer vision. Equally important is the ability to collaborate closely, as the role depends on the two engineers working as a genuine team rather than dividing the work independently.',
      age: 'Minimum age 16, in line with Shell Eco-marathon rules.',
    }),
  },
  {
    title: 'Controls & Embedded Software Engineer',
    teamSize: '1 student',
    department: 'Autonomous Systems',
    description: role({
      summary:
        'Between the decisions made by the autonomous system and the physical movement of the vehicle sits the control software, which must translate commands into precise, reliable action in real time.',
      duringYear: [
        'Develop the control software for steering, braking, and throttle.',
        'Program the microcontrollers that run the control software.',
        'Work to a high standard of precision, as the software must operate correctly on every attempt.',
      ],
      onSite: [
        'Perform real-time debugging of the control behavior when the vehicle does not respond as expected.',
        'Deploy firmware updates between runs based on observed track performance.',
      ],
      skills: ['C++', 'Rust', 'STM32', 'Arduino', 'Raspberry Pi'],
      lookingFor: 'An interest in embedded systems and real-time control. The role rewards care and precision over speed.',
      age: 'Minimum age 16, in line with Shell Eco-marathon rules.',
    }),
  },
];

const HOME_TOPICS = [
  {
    title: 'The Challenge',
    description:
      "It's not about speed — it's about efficiency. In the Shell Eco-marathon, teams from across Europe answer one question: who can travel the furthest on the energy of a single litre of fuel? Every single millilitre counts.",
  },
  {
    title: 'Designing & Building the Car',
    description:
      'We build our prototype from the ground up — chassis, bodywork and a lightweight, aerodynamic shell shaped for minimum drag and maximum efficiency.',
  },
  {
    title: 'Mechanical & Electrical Engineering',
    description:
      'Powertrain, drivetrain, steering and brakes on the mechanical side; wiring, sensors, motor control and safety systems on the electrical side. Every component is tuned to save energy.',
  },
  {
    title: 'Informatics & Telemetry',
    description:
      'Our own software and live telemetry system stream data straight from the car — GPS position, engine data, lap times and fuel consumption — so we can follow every run in real time and analyse it afterwards.',
  },
  {
    title: 'Race Week at the Track',
    description:
      'For one intense week we live at the circuit, camping right next to the racetrack and working out of our paddock from early morning until late evening.',
  },
  {
    title: 'Technical Inspection & Prep',
    description:
      'Before we can compete, the car must pass a strict technical inspection. Between runs we are constantly maintaining, repairing and fine-tuning to keep it race-ready.',
  },
  {
    title: 'Driving, Strategy & Competition',
    description:
      'Drivers complete timed attempts within tight limits while the team refines strategy lap by lap. Every touch of throttle and every metre of coasting shapes the final result.',
  },
  {
    title: 'The Journey',
    description:
      'Getting there and back is part of the adventure — long road trips across Europe with the car, the tools and the whole team on board.',
  },
  {
    title: 'Life at Camp',
    description:
      "It's not all work. Building tents, cooking barbecue, evenings around the fire and the friendships that form are what make the experience unforgettable.",
  },
  {
    title: 'Beyond the Race',
    description:
      'Alongside the efficiency runs, we take part in other awards and challenges — from design and communication to teamwork and innovation.',
  },
];

async function main() {
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.warn('ADMIN_PASSWORD not set - skipping admin account creation/update.');
  } else {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.admin.upsert({
      where: { username: adminUser },
      update: { passwordHash },
      create: { username: adminUser, passwordHash },
    });
    console.log(`Admin account ready: ${adminUser}`);
  }

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      teamName: 'Formula LAM',
      tagline: 'Lycée des Arts et Métiers — Shell Eco-marathon Electric Autonomous Prototype',
      aboutText:
        'Formula LAM is the Shell Eco-marathon team of Lycée des Arts et Métiers in Luxembourg, building an electric autonomous prototype vehicle for the 2027 season. Replace this placeholder text from the admin settings page.',
      contactEmail: '',
    },
  });

  const memberCount = await prisma.member.count();
  if (memberCount === 0) {
    await prisma.member.createMany({
      data: [
        { name: 'Placeholder Name', role: 'Team Captain / Project Manager', bio: 'Placeholder bio - replace from the admin panel.', sortOrder: 0 },
        { name: 'Placeholder Name', role: 'Chassis & Structures Engineer', bio: 'Placeholder bio - replace from the admin panel.', sortOrder: 1 },
        { name: 'Placeholder Name', role: 'Battery & Powertrain Engineer', bio: 'Placeholder bio - replace from the admin panel.', sortOrder: 2 },
        { name: 'Placeholder Name', role: 'Autonomous Systems & Perception Engineer', bio: 'Placeholder bio - replace from the admin panel.', sortOrder: 3 },
      ],
    });
    console.log('Seeded placeholder team members.');
  }

  for (const position of POSITIONS) {
    await prisma.position.upsert({
      where: { title: position.title },
      update: {},
      create: { ...position, active: true },
    });
  }
  console.log(`Ensured ${POSITIONS.length} open positions exist.`);

  const newsCount = await prisma.newsPost.count();
  if (newsCount === 0) {
    await prisma.newsPost.create({
      data: {
        title: 'Welcome to Formula LAM',
        slug: 'welcome-to-formula-lam',
        excerpt: 'Our new home for team news, recruitment, and build updates.',
        body:
          'This is a placeholder news post. Edit or delete it from the admin panel at /admin, and start publishing real updates about build progress, competitions, and events.',
        published: true,
        publishedAt: new Date(),
      },
    });
    console.log('Seeded placeholder news post.');
  }

  const sponsorCount = await prisma.sponsor.count();
  if (sponsorCount === 0) {
    await prisma.sponsor.createMany({
      data: [
        { name: 'Placeholder Sponsor 1', tier: 'platinum', sortOrder: 0 },
        { name: 'Placeholder Sponsor 2', tier: 'gold', sortOrder: 1 },
        { name: 'Placeholder Sponsor 3', tier: 'silver', sortOrder: 2 },
        { name: 'Placeholder Sponsor 4', tier: 'supporter', sortOrder: 3 },
      ],
    });
    console.log('Seeded placeholder sponsors.');
  }

  const homeTopicCount = await prisma.homeTopic.count();
  if (homeTopicCount === 0) {
    await prisma.homeTopic.createMany({
      data: HOME_TOPICS.map((topic, i) => ({ ...topic, sortOrder: i })),
    });
    console.log(`Seeded ${HOME_TOPICS.length} home page topics.`);
  }

  await prisma.vehicle.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Formula LAM 2027',
      category: 'Electric Autonomous Prototype',
      tagline: 'Placeholder tagline - replace from the admin panel.',
      description:
        'Placeholder description of our Shell Eco-marathon 2027 electric autonomous prototype vehicle. Replace this text and add photos from the admin panel once the build is underway.',
      specs:
        'Category: Prototype\nEnergy class: Battery Electric\nAutonomous: Yes\nWeight: TBD\nTop speed: TBD',
    },
  });
  console.log('Ensured vehicle info exists.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
