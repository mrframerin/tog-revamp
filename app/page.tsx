import {
  AiGenerateSection,
  AiTitleSection,
  BrandsSection,
  CollaborationSection,
  CollaborationTitleSection,
  FlimCursor,
  FlimFooter,
  FlimHeader,
  FlimLoader,
  HeroSection,
  IntroPlatformSection,
} from "@/components/flim/generated";
import FlimScripts from "@/components/flim/FlimScripts";

export default function Home() {
  return (
    <>
      <FlimLoader />
      <FlimHeader />
      <HeroSection />
      <BrandsSection />
      <IntroPlatformSection />
      <AiTitleSection />
      <AiGenerateSection />
      <CollaborationTitleSection />
      <CollaborationSection />
      <FlimFooter />
      <FlimCursor />
      <FlimScripts />
    </>
  );
}
