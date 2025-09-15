
"use client";


import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export function FooterComponent() {
  return (
    <Footer container className="!bg-[#47D7AC]">
      <div className="w-full"  >
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <h1 className="text-4xl mb-2 font-body text-[#11111F]"><strong>Eco</strong>Link</h1>
            <p className="font-body text-[#11111F]">Conectando pessoas pela sustentabilidade. Junte-se a <br />nós e faça parte da mudança!</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="Sobre" className="!text-[#11111F]" />
              <FooterLinkGroup col>
                <FooterLink href="#" className="text-[#11111F]">Contato</FooterLink>
                <FooterLink href="#" className="text-[#11111F]" >Blog</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Nos Siga" className="!text-[#11111F]" />
              <FooterLinkGroup col>
                <FooterLink href="#" className="text-[#11111F]">Github</FooterLink>
                <FooterLink href="#" className="text-[#11111F]">Instagram</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" className="!text-[#11111F]" />
              <FooterLinkGroup col>
                <FooterLink href="#" className="text-[#11111F]">Política e Privacidade</FooterLink>
                <FooterLink href="#" className="text-[#11111F]">Termos &amp; Condições</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider className="!border-[#11111F]" />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Ecolink™" year={2024} className="!text-[#11111F]"/>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} className="text-[#11111F]" />
            <FooterIcon href="#" icon={BsInstagram} className="text-[#11111F]"  />
            <FooterIcon href="#" icon={BsTwitter} className="text-[#11111F]" />
            <FooterIcon href="#" icon={BsGithub} className="text-[#11111F]" />
            <FooterIcon href="#" icon={BsDribbble} className="text-[#11111F]" />
          </div>
        </div>
      </div>
    </Footer>
  );
}
