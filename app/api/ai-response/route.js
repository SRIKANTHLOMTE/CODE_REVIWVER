import airesponse from "../../services/airesponse.js"
import { NextResponse ,NextRequest} from "next/server";
export async function POST(request) {
    const prompt=await request.json();
    if(!prompt){
        return NextResponse.json({
            success:false,
            data:"Wow , You Can write Code that I Can't see ..."
        })
    }
    const result=await airesponse(prompt);
    return NextResponse.json({
        success:true,
        data:result
    })
       
}
