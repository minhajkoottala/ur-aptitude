import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'archetypes.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const strengthMap: Record<string, string> = {
  "systems-architect": "You have a natural ability to deconstruct complex puzzles. Because of this, you learn best when you can see how the 'gears' turn behind the scenes.",
  "creative-visionary": "You blend wild creativity with deep curiosity. You excel in environments that give you the freedom to explore abstract ideas and design original solutions.",
  "growth-strategist": "You spot opportunities quickly and think in terms of leverage and scale. You thrive when given the autonomy to strategize and lead projects.",
  "tech-alchemist": "You bridge physical mechanics and logic effortlessly. You learn fastest through hands-on experimentation, building, and empirical troubleshooting.",
  "empathetic-storyteller": "You have a gift for emotional resonance and narrative. You naturally excel in fields that allow you to connect with people and communicate powerful ideas.",
  "ops-maestro": "You transform chaos into clockwork. Your brain naturally optimizes processes and allocates resources, making you an execution powerhouse.",
  "quantitative-pioneer": "You see the world through numbers and patterns. You have an exceptional ability to analyze raw data and extract logical, objective truths.",
  "human-centric-leader": "You have a profound understanding of human dynamics. You naturally mentor, guide, and elevate the people around you to achieve their best.",
  "digital-craftsman": "You are a master of digital creation. You naturally focus deeply to write, code, or build high-quality digital assets with extreme precision.",
  "data-detective": "Your analytical mind naturally connects the dots. You love diving deep into information, conducting research, and solving intricate mysteries.",
  "community-builder": "You naturally bring people together. Your strength lies in fostering collaboration, resolving conflicts, and building strong, supportive communities.",
  "product-strategist": "You sit at the intersection of logic and creativity. You naturally envision what people need and systematically figure out how to build it.",
  "mechanical-innovator": "You have an innate grasp of physical structures. Your mind naturally understands how materials and forces interact to solve real-world problems.",
  "scientific-explorer": "You are deeply driven by curiosity and the scientific method. You naturally question the status quo and seek empirical answers to complex questions.",
  "venture-catalyst": "You are an engine of action and enterprise. You naturally take calculated risks, mobilize teams, and turn abstract visions into tangible ventures.",
  "expressive-communicator": "You have a commanding presence and expressive energy. You naturally capture attention and communicate ideas with passion and clarity."
};

data.forEach((arch: any) => {
  // Add practical strength
  arch.practicalStrength = strengthMap[arch.id] || "You have a unique combination of strengths that allow you to excel in your chosen path.";
  
  // Clean explorer
  if (arch.explorer) {
    delete arch.explorer.parentTip;
    delete arch.explorer.recommendedStream; // Not needed for explorer
    delete arch.explorer.coreSkills; // Simplifying
    delete arch.explorer.broadCareers; // Simplifying
  }

  // Clean navigator
  if (arch.navigator) {
    if (arch.navigator.recommendedStream && arch.navigator.recommendedStream.category) {
       arch.navigator.simpleStream = arch.navigator.recommendedStream.category;
    } else {
       arch.navigator.simpleStream = "Science"; // Fallback
    }
    delete arch.navigator.recommendedStream;
    delete arch.navigator.streamFit;
    delete arch.navigator.strategicFields;
    delete arch.navigator.coreSkills;
  }
  
  // Clean root
  delete arch.recommendedStream;
  delete arch.broadCareers;
  delete arch.coreSkills;
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('Successfully transformed archetypes.json');
