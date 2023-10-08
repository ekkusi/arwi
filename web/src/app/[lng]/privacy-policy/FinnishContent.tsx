import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import Link from "@/components/primitives/Link";

export default function PrivacyPolicyContentFi() {
  return (
    <>
      <Text as="h1" fontSize={{ base: "4xl", md: "6xl" }}>
        Tietosuojaseloste
      </Text>
      <Text>
        <Link href="https://finlex.fi/fi/laki/ajantasa/2018/20181050" noTranslate target="_blank">
          Henkilötietolaki
        </Link>{" "}
        (523/1999) 10 § ja 24 §
      </Text>
      <Text as="h2">1. Rekisterin nimi</Text>
      <Text>Arwi-sovelluksen asiakasrekisteri</Text>
      <Text as="h2">2. Rekisterin pitäjä</Text>
      <Text mb="0">Ekku Sipilä</Text>
      <Text>Juuttaankatu 11, 70500 Kuopio</Text>
      <Text mb="0">+358 440966617</Text>
      <Text>info@arwi.fi</Text>
      <Text as="h2">3. Rekisteriasioiden yhteyshenkilö</Text>
      <Text mb="0">Ekku Sipilä</Text>
      <Text>Juuttaankatu 11, 70500 Kuopio</Text>
      <Text mb="0">+358 440966617</Text>
      <Text>info@arwi.fi</Text>
      <Text as="h2">4. Henkilötietojen käsittelyn tarkoitus ja oikeusperusteet</Text>
      <Text>
        Rekisterin käyttötarkoitus on arwi-sovelluksen toiminnallisuuksien ylläpitäminen. Henkilötietoja voidaan käyttää sovelluksen personointiin,
        maksutoiminnon toteuttamiseen, asiakasviestintään, muuhun asiakassuhteen hoitamiseen sekä väärinkäytösten ja ongelmatilanteiden ehkäisyyn ja
        selvittämiseen.
      </Text>
      <Text>
        Pseudonymisoituja henkilötietoja käytetään sovelluksen laadun varmistamiseen, sovelluksen käytön tilastolliseen seuraamiseen sekä
        virhetilanteiden selvittämiseen ja korjaamiseen.
      </Text>
      <Text>Henkilötietojen keräämisen oikeusperusteena on rekisteröidyn suostumus.</Text>
      <Text as="h2">5. Rekisterin tietosisältö</Text>
      <Text>Sovelluksen käyttäjä:</Text>
      <UnorderedList>
        <ListItem>Käyttäjän yhteystiedot</ListItem>
        <ListItem>Sovelluksen personointitiedot</ListItem>
        <ListItem>Maksujen kuittitiedot</ListItem>
        <ListItem>Muut käyttäjän suostumuksella kerätyt tiedot</ListItem>
      </UnorderedList>
      <Text>Pseudonymisoitu tieto sovelluksen käyttäjästä:</Text>
      <UnorderedList>
        <ListItem>Tiedot sovelluksen käytöstä</ListItem>
        <ListItem>Puhelinmallin ja käyttöjärjestelmän tiedot</ListItem>
        <ListItem>Sijainti tilastollisella tavalla</ListItem>
        <ListItem>Käyttäjän keräämä arviointidata oppilaista</ListItem>
        <ListItem>Tekniset lokitiedot</ListItem>
      </UnorderedList>
      <Text as="h2">6. Säännönmukaiset tietolähteet</Text>
      <Text>Rekisterin sisältämiä tietoja kerätään seuraavista lähteistä:</Text>
      <UnorderedList>
        <ListItem>Rekisteröidyltä itseltään</ListItem>
        <ListItem>Firebase-laadunvarmistuspalvelusta</ListItem>
      </UnorderedList>
      <Text as="h2">7. Henkilötietojen luovuttaminen</Text>
      <Text>Pseudonymisoituja henkilön yksilöiviä tietoja luovutetaan seuraaviin tarkoituksiin:</Text>
      <UnorderedList>
        <ListItem>
          Firebase-laadunvarmistuspalveluun sovelluksen laadun varmistamiseen, sovelluksen käytön tilastolliseen seuraamiseen ja virhetilanteiden
          selvittämiseen sekä korjaamiseen
        </ListItem>
      </UnorderedList>
      <Text>Henkilön yksilöiviä tietoja luovutetaan arwi-sovelluksen ja sen henkilöstön ulkopuolelle vain lain pakottamissa tilanteissa.</Text>
      <Text as="h2">8. Tietojen siirto EU:n tai ETA:n ulkopuolelle</Text>
      <Text>
        Tietoja saatetaan siirtää EU:n tai Euroopan talousalueen ulkopuolelle Firebase-laadunvarmistuspalvelussa. Tämä huolellisesti valittu
        hyvämaineinen palveluntarjoaja on sitoutunut osallistumaan kaikkiin kulloinkin tarvittaviin EU:n ja Yhdysvaltojen välisiin sopimuksiin ja
        järjestelyihin (kuten Privacy Shield).
      </Text>
      <Text as="h2">9. Henkilötietojen säilytysaika</Text>
      <Text>
        Henkilön yksilöiviä tietoja säilytetään ilman aikarajaa niin kauan kuin rekisteröity käyttää arwi-sovellusta. Henkilön katsotaan käyttävän
        sovellusta niin kauan kuin tällä on rekisteröitynyt käyttäjä sovelluksessa. Kaikki yksilöivät henkilötiedot poistetaan, kun henkilö poistaa
        käyttäjänsä, tai erikseen pyydettäessä. Teknisiä lokitietoja säilytetään järjestelmän eheyden varmistamiseksi 12 kuukautta.
      </Text>
      <Text>Pseudonymisoituja henkilön yksilöiviä tietoja säilytetään niiden tilastollisen luonteen vuoksi pysyvästi.</Text>
      <Text as="h2">10. Rekisterin suojauksen periaatteet</Text>
      <Text>Manuaalista aineistoa ei ole.</Text>
      <Text>
        Sähköinen aineisto säilytetään Suomessa sijaitsevalla, rekisterinpitäjän hallinnoimalla palvelimella lukuun ottamatta selosteessa mainittujen
        ulkopuolisten palveluiden sisäisiä tietokantoja. Pääsy rekisterin tietosisältöön on rajoitettu salausavaimin tai vahvan salasanan perusteella
        vain arwi-sovelluksen tuottamiseen osallistuville henkilöille.
      </Text>
      <Text as="h2">11. Automaattinen päätöksenteko</Text>
      <Text>Henkilötietoja ei käytetä profilointiin tai muuhun automaattiseen päätöksentekoon.</Text>
      <Text as="h2">12. Rekisteröidyn oikeudet</Text>
      <Text>
        Kaikki rekisteriasioita koskevat yhteydenotot osoitetaan sähköpostitse tai kirjeitse reksiterinpitäjän rekisteriasioiden yhteyshenkilölle.
      </Text>
      <UnorderedList>
        <ListItem>
          Oikeus saada pääsy henkilötietoihin <br />
          Rekisteröidyllä on oikeus saada tieto siitä, käsitelläänkö häntä koskevia henkilötietoja, ja jos käsitellään, kopio henkilötiedoistaan.
        </ListItem>
        <ListItem>
          Oikeus tietojen oikaisemiseen <br />
          Rekisteröidyllä on oikeus pyytää häntä koskevien epätarkkojen ja virheellisten tietojen korjaamista tai täydentämistä.
        </ListItem>
        <ListItem>
          Oikeus tietojen poistamiseen
          <br />
          Rekisteröidyllä on oikeus pyytää häntä koskevien henkilötietojen poistamista.
        </ListItem>
        <ListItem>
          Oikeus käsittelyn rajoittamiseen <br />
          Rekisteröidyllä on oikeus rajoittaa häntä koskevien henkilötietojen käsittelyä tietyissä tilanteissa.
        </ListItem>
        <ListItem>
          Vastustamisoikeus <br />
          Rekisteröidyllä on oikeus milloin tahansa vastustaa häntä koskevien henkilötietojen käsittelyä.
        </ListItem>
        <ListItem>
          Oikeus siirtää tiedot järjestelmästä toiseen <br />
          Rekisteröidyllä on oikeus saada häntä koskevat ja hänen itse toimittamansa henkilötiedot jäsennellyssä, yleisesti käytetyssä ja
          koneellisesti luettavassa muodossa.
        </ListItem>
        <ListItem>
          Oikeus peruuttaa suostumus
          <br />
          Rekisteröidyllä on oikeus peruuttaa käsittelyyn antamansa suostumus milloin tahansa.
        </ListItem>
        <ListItem>
          Oikeus tehdä valitus valvontaviranomaiselle
          <br />
          Rekisteröidyllä on oikeus tehdä valitus valvontaviranomaiselle tavasta, jolla rekisterinpitäjä käsittelee rekisteröidyn henkilötietoja.
          Suomessa kansallisena valvontaviranomaisena toimii tietosuojavaltuutettu.
        </ListItem>
      </UnorderedList>
      <Text as="h2">13. Tietosuojaselosteen päivittäminen</Text>
      <Text>
        Arwi-sovellus voi tehdä tähän tietosuojaselosteeseen muutoksia ilman erillistä ilmoitusta, jos henkilötietojen käyttöä ei samalla laajenneta.
        Jos henkilötietojen käyttö laajenee, päivityksestä ilmoitetaan rekisteröidyille Arwi-sovelluksen kautta.
      </Text>
    </>
  );
}
