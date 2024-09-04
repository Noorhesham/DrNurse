import React from "react";
import MiniTitle from "./defaults/MiniTitle";
import Paragraph from "./defaults/Paragraph";

const AboutDoctor = () => {
  return (
    <section className=" flex flex-col gap-2 ">
      <MiniTitle boldness="bold" color=" text-main2" text="ABOUT ME" />
      <Paragraph
        full
        description="Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet.
Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet."
      />
      <div className=" flex  items-start flex-col gap-3">
        <MiniTitle boldness="bold" color=" text-main2" text="SKILLS" />
        <ul className=" mx-4  list-disc">
          <li className=" leading-8">Quisque semper gravida est et consectetur.</li>
          <li className=" leading-8">Quisque semper gravida est et consectetur.</li>
          <li className=" leading-8">Quisque semper gravida est et consectetur.</li>
          <li className=" leading-8">Quisque semper gravida est et consectetur.</li>
        </ul>
      </div>
    </section>
  );
};

export default AboutDoctor;
