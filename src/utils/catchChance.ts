export function catchPokemon(experience: number): boolean {
  const baseChance = Math.max(10, 90 - experience * 0.5);

  const catchChance = Math.min(95, baseChance);

  const random = Math.random() * 100;

  return random < catchChance;
}
