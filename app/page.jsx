import Image from "next/image";
import HeroSection from "./sections/HeroSection";
import HelpSeekerSection from "./sections/HelpSeekerSection";
import MindsetBookSection from "./sections/Mindset-book";
import LetsTalkSection from "./sections/LetsTalkSection";
import BookSection from "./sections/BookSection";
import AskQuestionIntro from "./sections/AskQuestionIntro";
import OurNumbersSection from "./sections/OurNumbersSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import DoubtsSection from "./sections/DoubtsSection";
import YoutubeLatestVideosSections from "./components/YoutubeContent";
import ListedInMagazine from "./components/ListedInMagazine";
import RecentBlogs from "./sections/RecentBlogs";
import HOCDIntro from "./sections/HOCDIntro";

export default function Home() {
  return (
    <div>
      <main>
        <HeroSection />
        <HelpSeekerSection />
        <MindsetBookSection />
        <section>
          <Image src='/apps coming soon banner.png' width='720' height='720' className='w-full' alt='Apps coming soon | OCD HOCD | Break up' />
        </section>
        <YoutubeLatestVideosSections channelId={"UUbVS0QWs2qSP02xkOjtqVCQ"}/>
        <LetsTalkSection/>
        <BookSection/>
        <ListedInMagazine/>
        <AskQuestionIntro/>
        <HOCDIntro/>
        <TestimonialsSection/>
        <RecentBlogs/>  
        <DoubtsSection/>
      </main>
    </div>
  );
}
