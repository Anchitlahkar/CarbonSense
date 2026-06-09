import { getPromptTemplate, ParsedPrompt } from '@carbonsense/knowledge-base';

export class PromptManager {
  /**
   * Loads a prompt template from the knowledge-base and interpolates double-curly placeholder variables.
   */
  public static compilePrompt(
    name: 'receipt-analysis' | 'coach-system' | 'coach-context' | 'coach-rules',
    variables: Record<string, string | number | boolean>
  ): { template: string; version: string } {
    const parsed = getPromptTemplate(name);
    let promptText = parsed.template;

    for (const [key, value] of Object.entries(variables)) {
      const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      promptText = promptText.replace(placeholder, String(value));
    }

    return {
      template: promptText.trim(),
      version: parsed.metadata.version,
    };
  }
}
export default PromptManager;
