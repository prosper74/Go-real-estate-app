import {
  FacebookIconFilled,
  InstagramIcon,
  TwitterIcon,
  PhoneIcon,
  LocationIcon,
  EmailIcon,
} from "../helpers/svgIcons";

export const MainMenu = [
  {
    id: 1,
    name: "Buy",
    url: "/buy",
  },
  {
    id: 2,
    name: "Rent",
    url: "/rent",
  },
  {
    id: 3,
    name: "Shortlet",
    url: "/shortlet",
  },
];

export const ResourcesMenu = [
  {
    id: 1,
    name: "How it works",
    url: "/how-it-works",
  },
  {
    id: 2,
    name: "About Us",
    url: "/about",
  },
  {
    id: 3,
    name: "Contact Us",
    url: "/contact",
  },
];

export const LegalMenu = [
  {
    id: 1,
    name: "FAQ",
    url: "/faq",
  },
  {
    id: 2,
    name: "Privacy Policy",
    url: "/privacy",
  },
  {
    id: 3,
    name: "Terms & Conditions",
    url: "/terms-and-conditions",
  },
];

export const FooterSocials = [
  {
    id: 1,
    name: "Facebook",
    icon: <FacebookIconFilled />,
    url: "#",
  },
  {
    id: 2,
    name: "Instagram",
    icon: <InstagramIcon />,
    url: "#",
  },
  {
    id: 3,
    name: "Twitter",
    icon: <TwitterIcon />,
    url: "#",
  },
];

export const ContactUsLinks = [
  {
    id: 1,
    contact: "+234 803 333 333",
    description: "Call us any time",
    icon: <PhoneIcon fill="#a0a0a0" />,
    url: "tel:+234 803 333 333",
  },
  {
    id: 2,
    contact: "property@realestate.com",
    description: "Email Us",
    icon: <EmailIcon fill="#a0a0a0" />,
    url: "mailto:property@realestate.com",
  },
  {
    id: 3,
    contact: "4 Lorem Ipsum way, Lorem, Comatose.",
    description: "Visit us week days 8am - 6pm",
    icon: <LocationIcon fill="#a0a0a0" />,
  },
];

export const HowItWorksData = [
  {
    id: 1,
    heading: "Filter and Search",
    description: "Browse our list of homes and properties, and find your favourite space.",
  },
  {
    id: 2,
    heading: "Schedule Viewing",
    description: "Look through our available properties and schedule a viewing.",
  },
  {
    id: 3,
    heading: "Make an Offer",
    description: "Make payment and prepare to move into your new space.",
  },
];
