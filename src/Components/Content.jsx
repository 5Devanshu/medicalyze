export function Content(){  
    return(
        <div>
            <div className="flex  justify-start items-center h-[900px] w-full shadow-md shadow-blue-200 ">
               
               <div>
                <img src="/public/image.png" alt="" className="flex h-[500px] ml-20" />
               </div>

               <div className="flex absolute left-[950px] top-[800px] text-[60px] font-semibold text-blue-500 ">
                Direction 1
               </div>

               <div className="flex absolute left-[950px] top-[850px] text-[60px] font-semibold text-blue-500 ">
                Click the button
               </div>

               <div className="flex absolute left-[950px] top-[925px] text-[20px] font-semibold text-blue-500 ">
               Start your journey by clicking the "Analyze My Symptom" button below. This will take you to the symptom analysis interface, where you'll have the opportunity to enter your health concerns.

               </div>

               

                
                

            </div>
        </div>

    );
}