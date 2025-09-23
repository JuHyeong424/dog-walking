import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface HandlerContext {
  params: {
    id: string;
  };
}

export async function DELETE(
  request: NextRequest,
  context: HandlerContext
) {
  const id = context.params.id;

  try {
    await prisma.walk.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: '산책 기록이 성공적으로 삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error(`DELETE /api/walk/${id} error:`, error);
    return NextResponse.json(
      { error: '산책 기록 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}
