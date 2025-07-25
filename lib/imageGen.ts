import Replicate from "replicate";

export async function generateImage(prompt: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_REPLICATE_API_KEY;
  
  if (!apiKey) {
    throw new Error('Replicate API key is not configured. Please check your environment variables.');
  }

  try {
    const replicate = new Replicate({
      auth: apiKey,
    });

    const input = {
      prompt: prompt,
      width: 1024,
      height: 1024,
      num_inference_steps: 50,
      guidance_scale: 7.5,
      scheduler: "K_EULER",
      seed: Math.floor(Math.random() * 1000000), // Random seed for variety
      output_quality: 80,
      speed_mode: "Juiced 🔥 (more speed)"
    };

    // Using Stable Diffusion XL model
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      { input }
    ) as string[];

    if (!output || !output[0]) {
      throw new Error('No image generated');
    }

    return output[0];
  } catch (error) {
    console.error('Image generation error:', error);
    throw new Error(`Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Alternative function using the HiDream model
export async function generateImageWithHiDream(prompt: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_REPLICATE_API_KEY;
  
  if (!apiKey) {
    throw new Error('Replicate API key is not configured. Please check your environment variables.');
  }

  try {
    const replicate = new Replicate({
      auth: apiKey,
    });

    const input = {
      seed: Math.floor(Math.random() * 1000000),
      prompt: prompt,
      speed_mode: "Juiced 🔥 (more speed)",
      output_quality: 80
    };

    // Using HiDream model
    const output = await replicate.run(
      "prunaai/hidream-l1-full:03d58532fd29e39fd2ed80e86c3da1cebec28ef2734081cf1366710d30388f42",
      { input }
    ) as string;

    if (!output) {
      throw new Error('No image generated');
    }

    return output;
  } catch (error) {
    console.error('HiDream image generation error:', error);
    throw new Error(`Failed to generate image with HiDream: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}