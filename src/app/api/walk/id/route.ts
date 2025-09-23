// import {NextRequest, NextResponse} from "next/server";
//
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//
//   try {
//     await prisma.walk.delete({
//       where: { id },
//     });
//
//     return NextResponse.json({ message: '산책 기록이 성공적으로 삭제되었습니다.' }, { status: 200 });
//   } catch (error) {
//     console.error(`DELETE /api/walk/[id] error:`, error);
//     return NextResponse.json(
//       { error: '산책 기록 삭제에 실패했습니다.' },
//       { status: 500 }
//     );
//   }
// }
