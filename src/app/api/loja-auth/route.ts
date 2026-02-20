import { NextRequest, NextResponse } from 'next/server';

const LOJA_PASSWORD = '123AnacliBR';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === LOJA_PASSWORD) {
      // Cria resposta com cookie de autenticação
      const response = NextResponse.json({ success: true });
      
      // Define cookie que expira em 7 dias
      response.cookies.set('loja-auth', LOJA_PASSWORD, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Senha incorreta' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erro ao processar requisição' },
      { status: 500 }
    );
  }
}
