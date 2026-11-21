import type {SensiValues} from '../types/sensi';

const clamp = (value: number) => Math.max(0, Math.min(200, Math.round(value)));

/** Valores iniciais orientativos; não lê nem altera o Free Fire. */
export function calculateSensi(answers: Record<string, string>): SensiValues {
  const pc = answers.platform === 'PC / Emulador';
  const speed = answers.speed === 'Mais rápida' ? 14 : answers.speed === 'Mais controlada' ? -13 : 0;
  const aim = answers.aim === 'Passa do alvo' ? -13
    : answers.aim === 'Movimento muito lento' ? 12
    : answers.aim === 'Mira tremendo' ? -10
    : answers.aim === 'Fica abaixo do alvo' ? 8 : 0;
  const fps = answers.fps === 'Quedas frequentes' ? -8 : answers.fps === 'Pequenas quedas' ? -4 : 0;
  const intensity = answers.adjust === 'Conservador' ? 0.55
    : answers.adjust === 'Mais perceptível' ? 1.2 : 1;

  // PC recebe perguntas de mouse/DPI. Mobile recebe perguntas de toque, tela e dedos.
  const input = pc
    ? (['1600', '2400+'].includes(answers.dpi) ? -8 : answers.dpi === '400' ? 6 : 0)
      + (answers.mouse === 'Movimentos curtos' ? 5 : answers.mouse === 'Movimentos longos' ? -6 : 0)
    : (answers.touch === 'Arrastos curtos' ? 5 : answers.touch === 'Arrastos longos' ? -6 : 0)
      + (answers.device === 'Celular compacto' ? -3 : answers.device === 'Tablet / iPad' ? 4 : 0)
      + (answers.fingers === '2 dedos' ? -2 : answers.fingers === '5 ou mais dedos' ? 2 : 0);
  const adjustment = Math.round((speed + aim + fps + input) * intensity);
  const base = pc ? [160, 168, 151, 137, 88, 130] : [150, 160, 145, 130, 82, 125];
  const weights = [1, 1, 0.8, 0.6, 0.45, 0.65];
  const values = base.map((value, i) => clamp(value + Math.round(adjustment * weights[i])));

  const selectedScope = { 'Ponto vermelho': 1, 'Mira 2x': 2, 'Mira 4x': 3, AWM: 4 }[answers.scope];
  if (selectedScope !== undefined) values[selectedScope] = clamp(values[selectedScope] + 4);

  return {geral: values[0], red: values[1], x2: values[2], x4: values[3], awm: values[4], look: values[5]};
}
