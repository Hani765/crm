import PublicLayout from "@/Layouts/PublicLayout";
import { MetaType, Routes } from "@/types";
import Projects from "./components/projects";
import Hero from "./components/hero";
import Services from "./components/services";
import SecondHero from "./components/second-hero";
import { Responses } from "./components/responces";
import DescriptionOfCompany from "./components/description";
import AuthroizedBy from "./components/authroizedBy";
import OurProjects from "./components/ourProjects";

export default function index({
    meta,
    routes,
}: {
    meta: MetaType;
    routes: Routes[];
}) {
    return (
        <PublicLayout meta={meta} routes={routes}>
            <Hero />
            <SecondHero />
            <DescriptionOfCompany />
            <OurProjects />
            <AuthroizedBy />
            <Services />
        </PublicLayout>
    );
}
