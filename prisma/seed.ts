// prisma/seed.ts
import { PrismaClient, Level } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data
  await prisma.developerSoftSkill.deleteMany()
  await prisma.developerTechnicalSkill.deleteMany()
  await prisma.developer.deleteMany()
  await prisma.softSkill.deleteMany()
  await prisma.technicalSkill.deleteMany()
  await prisma.meetingNote.deleteMany()
  await prisma.developerExperienceBasedDaily.deleteMany()

  // Create MeetingNotes
  const meetingNote1 = await prisma.meetingNote.create({
    data: {
      title: "Sprint Planning Meeting",
      participants_email: "john@example.com, sarah@example.com",
      participants_name: "John Doe, Sarah Smith",
      recording_start_time: "2024-03-15T09:00:00Z",
      recording_end_time: "2024-03-15T10:00:00Z",
      recording_summary: "Discussed upcoming sprint goals and task allocation."
    }
  })

  // Create DeveloperExperienceBasedDaily
  const devExperience1 = await prisma.developerExperienceBasedDaily.create({
    data: {
      name: "Code Review Best Practices",
      short_description: "Guidelines for conducting effective code reviews"
    }
  })

  // Create SoftSkills
  const softSkills = await prisma.softSkill.createMany({
    data: [
      { name: "Communication", rangeLevel: 5 },
      { name: "Leadership", rangeLevel: 5 },
      { name: "Problem Solving", rangeLevel: 5 },
      { name: "Team Collaboration", rangeLevel: 5 }
    ]
  })

  // Create TechnicalSkills
  const technicalSkills = await prisma.technicalSkill.createMany({
    data: [
      { name: "JavaScript" },
      { name: "Python" },
      { name: "React" },
      { name: "Node.js" },
      { name: "PostgreSQL" }
    ]
  })

  // Create Developers with their relationships
  const developer1 = await prisma.developer.create({
    data: {
      email: "george@gmail.com",
      name: "George",
      lastname : "Smith",
      seniority: Level.ADVANCED,
      languageSkills: Level.ADVANCED,
      position: "Full Stack Developer",
      availability: 100,
      softSkills: {
        create: [
          {
            softSkillId: 1,
            level: 4
          },
          {
            softSkillId: 2,
            level: 5
          }
        ]
      },
      technicalSkills: {
        create: [
          {
            technicalSkillId: 1,
            level: Level.ADVANCED
          },
          {
            technicalSkillId: 3,
            level: Level.ADVANCED
          }
        ]
      }
    }
  })

  const developer2 = await prisma.developer.create({
    data: {
      email: "andrew@gmail.com",
      name: "Andrew",
      lastname : "Johnson",
      seniority: Level.INTERMEDIATE,
      languageSkills: Level.INTERMEDIATE,
      position: "Backend Developer",
      availability: 80,
      softSkills: {
        create: [
          {
            softSkillId: 3,
            level: 3
          },
          {
            softSkillId: 4,
            level: 4
          }
        ]
      },
      technicalSkills: {
        create: [
          {
            technicalSkillId: 2,
            level: Level.INTERMEDIATE
          },
          {
            technicalSkillId: 5,
            level: Level.ADVANCED
          }
        ]
      }
    }
  })

  console.log({
    meetingNote1,
    devExperience1,
    developer1,
    developer2,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })