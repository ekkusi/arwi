import { Box, Flex, ListItem, SimpleGrid, Text, UnorderedList } from "@chakra-ui/react";
import Image from "next/image";
import PageWrapper from "@/components/general/PageWrapper";
import { LocalizedPage } from "@/types/page";
import Link from "@/components/primitives/Link";
import { getTranslation } from "@/i18n";
import Section from "../../components/general/Section";

const people = [
  {
    name: "Eetu Kalapudas",
    title: "Liikuntatieteiden maisteri",
    img_src: "/images/people/eetu-small.webp",
  },
  {
    name: "Leevi Huuskonen",
    title: "Liikuntatieteiden maisteri",
    img_src: "/images/people/leevi-2-small.webp",
  },
  {
    name: "Ekku Sipilä",
    title: "Filosofian maisteri",
    subtitle: "(tietotekniikka)",
    img_src: "/images/people/ekku-small.webp",
  },
  {
    name: "Mika Sipilä",
    title: "Filosofian maisteri",
    subtitle: "(tilastotiede)",
    img_src: "/images/people/mika-small.webp",
  },
  {
    name: "Artte Jalkanen",
    title: "Kauppatieteiden kandidaatti",
    subtitle: "(tietojärjestelmätiede)",
    img_src: "/images/people/artte-small.webp",
  },
];

export default async function Home({ params }: LocalizedPage) {
  const { lng } = params;
  const { t } = await getTranslation(lng);

  return (
    <PageWrapper
      flex={1}
      display="flex"
      position="relative"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      mb="-8"
      px="4"
      pb={{ base: "16", md: "8" }}
      footerProps={{
        paddingTop: { base: 8, md: 7 },
        isDecorationFixed: true,
        extraContent: (
          <Box paddingTop={{ base: 12 }}>
            <Text as="h2" textAlign="center" mb={{ base: 12 }} fontWeight="300">
              {t("home.arwi-team", "Arwin porukka")}
            </Text>
            <Flex justifyContent="center" mx="4" flexWrap="wrap">
              {people.map((person) => (
                <Box key={person.name} mx={{ base: "2", md: "4", lg: "6", xl: "9", "2xl": "12" }} mb={{ base: "6", md: 0 }} fontSize="md">
                  <Image src={person.img_src} alt={person.name} width={200} height={200} style={{ borderRadius: "100%" }} />
                  <Text textAlign="center" mt="2" mb="1" fontWeight="normal">
                    {person.name}
                  </Text>
                  <Text textAlign="center">{person.title}</Text>
                  {person.subtitle && (
                    <Text textAlign="center" mt="-3">
                      {person.subtitle}
                    </Text>
                  )}
                </Box>
              ))}
            </Flex>
            <Box textAlign="center" py={{ base: "16", md: "28" }}>
              <Text
                as="h2"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="light"
                marginBottom={{ base: "12", md: "8" }}
                maxWidth="800px"
                mx="auto"
                px="2"
              >
                {t("home.interested-in-arwi", "Kiinnostuitko? Haluaisitko saada arwin käyttöön itsellesi tai koulullesi?")}
              </Text>
              <Text as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="thin" marginBottom="2">
                {t("contact-us", "Ota yhteyttä")}
              </Text>
              <Link
                fontSize={{ base: "4xl", md: "5xl" }}
                href="mailto:info@arwi.fi"
                fontWeight="light"
                color="white"
                noTranslate
                hoverStyle="underline"
                underLineSize="2px"
              >
                info@arwi.fi
              </Link>
            </Box>
          </Box>
        ),
      }}
    >
      <Section marginTop={{ base: 4, md: 20, xl: 16, "2xl": 12 }} marginBottom="20">
        <SimpleGrid columns={{ base: 1, md: 2 }}>
          <Box position="relative" marginLeft={{ base: "auto" }} marginRight={{ base: "auto", md: "8" }} marginBottom={{ base: "6" }}>
            <Image src="/images/arwi-ios-1.webp" width={270} height={480} alt="Arwi iOS 1" priority />
          </Box>
          <Box>
            <Text as="h2" textAlign={{ base: "center", md: "left" }} marginBottom={{ base: 8 }} marginTop={{ base: 0, md: 16 }}>
              {t("home.what-is-arwi", "Mikä on arwi?")}
            </Text>
            <UnorderedList spacing={4}>
              <ListItem>{t("home.digital-evaluation-app", "Digitaalinen arviointisovellus")}</ListItem>
              <ListItem>{t("home.utilizes-ai", "Hyödyntää tekoälyä")}</ListItem>
              <ListItem>{t("home.encourages-continuous-assessment", "Kannustaa jatkuvaan arviointiin")}</ListItem>
              <ListItem>{t("home.all-assessment-data-in-one-place", "Kaikki arviontidata samassa paikassa")}</ListItem>
              <ListItem>
                {t("home.enables-assessment-data-utilization", "Mahdollistaa arviointidatan hyödyntämisen päivittäisessä opetustyössä")}
              </ListItem>
            </UnorderedList>
          </Box>
        </SimpleGrid>
      </Section>
      <Section marginBottom={{ base: 0 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }}>
          <Box>
            <Text as="h2" textAlign={{ base: "center", md: "left" }} marginBottom={{ base: 8 }} marginTop={{ base: 0, md: 16 }}>
              {t("home.where-is-arwi-going", "Missä arwi menee?")}
            </Text>
            <UnorderedList spacing={4}>
              <ListItem>{t("home.always-with-you", "Taskussa, aina mukana")}</ListItem>
              <ListItem>{t("home.app-ready-to-use", "Sovellus on valmis käyttöön")}</ListItem>
              <ListItem>{t("home.pilot-phase-in-jyvaskyla", "Pilottijakso Jyväskylässä")}</ListItem>
              <ListItem>{t("home.constantly-updating-teacher-needs", "Alati päivittyvä opettajien tarpeet huomioiden")}</ListItem>
            </UnorderedList>
          </Box>
          <Box position="relative" marginRight={{ base: "auto" }} marginLeft={{ base: "auto", md: "8" }}>
            <Image src="/images/arwi-ios-2.webp" width={270} height={480} alt="Arwi iOS 1" />
          </Box>
        </SimpleGrid>
      </Section>
    </PageWrapper>
  );
}
