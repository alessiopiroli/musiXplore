'use server';
/**
 * @fileOverview A flow to generate a user avatar based on their player type.
 *
 * - generateAvatar - A function that generates an avatar image.
 * - GenerateAvatarInput - The input type for the generateAvatar function.
 * - GenerateAvatarOutput - The return type for the generateAvatar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAvatarInputSchema = z.object({
  playerType: z
    .enum(['Socializer', 'Achiever', 'Explorer', 'Killer'])
    .describe("The user's Bartle player type."),
});
export type GenerateAvatarInput = z.infer<typeof GenerateAvatarInputSchema>;

const GenerateAvatarOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe('The generated avatar image as a data URI.'),
});
export type GenerateAvatarOutput = z.infer<typeof GenerateAvatarOutputSchema>;

export async function generateAvatar(
  input: GenerateAvatarInput
): Promise<GenerateAvatarOutput> {
  return generateAvatarFlow(input);
}

const generateAvatarFlow = ai.defineFlow(
  {
    name: 'generateAvatarFlow',
    inputSchema: GenerateAvatarInputSchema,
    outputSchema: GenerateAvatarOutputSchema,
  },
  async ({playerType}) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a futuristic, abstract, vibrant, and artistic avatar for a music application user. The avatar should be based on the following player type: '${playerType}'. The style should be minimalist, suitable for a profile picture, with a dark, modern background.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {imageDataUri: media.url};
  }
);
