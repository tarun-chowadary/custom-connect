import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, occasion, style, constraints } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generating description for:', { title, occasion, style, constraints });

    const systemPrompt = `You are a product description writer for Customise.in, a marketplace for custom-made artisan products.

Write a compelling product description based on the user's inputs. Follow these rules strictly:
- Output 1-3 short paragraphs (120-220 words total)
- Mention: purpose/occasion, style/vibe, materials, size, colors, and any constraints
- Do NOT include: price, timeline, delivery details, or casual commentary
- Output ONLY the description text, no headers or formatting
- Write in a warm, professional tone that appeals to artisan craftsmanship
- Be specific and evocative to help makers understand the vision`;

    const userPrompt = `Create a product description for:

Title: ${title}
Purpose/Occasion: ${occasion || 'Not specified'}
Style & Vibe: ${style || 'Not specified'}
Materials, Size, Colors & Constraints: ${constraints || 'Not specified'}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI usage limit reached. Please try again later.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const generatedDescription = data.choices?.[0]?.message?.content || '';

    console.log('Generated description successfully');

    return new Response(JSON.stringify({ description: generatedDescription }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error in generate-description function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate description';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
