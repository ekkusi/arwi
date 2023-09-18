--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.3 (Homebrew)

-- Started on 2023-08-22 19:46:20 EEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."_ClassYearToStudent" DROP CONSTRAINT IF EXISTS "_ClassYearToStudent_B_fkey";
ALTER TABLE IF EXISTS ONLY public."_ClassYearToStudent" DROP CONSTRAINT IF EXISTS "_ClassYearToStudent_A_fkey";
ALTER TABLE IF EXISTS ONLY public."Student" DROP CONSTRAINT IF EXISTS "Student_groupId_fkey";
ALTER TABLE IF EXISTS ONLY public."Group" DROP CONSTRAINT IF EXISTS "Group_teacherId_fkey";
ALTER TABLE IF EXISTS ONLY public."Evaluation" DROP CONSTRAINT IF EXISTS "Evaluation_studentId_fkey";
ALTER TABLE IF EXISTS ONLY public."Evaluation" DROP CONSTRAINT IF EXISTS "Evaluation_evaluationCollectionId_fkey";
ALTER TABLE IF EXISTS ONLY public."EvaluationCollection" DROP CONSTRAINT IF EXISTS "EvaluationCollection_classYearId_fkey";
ALTER TABLE IF EXISTS ONLY public."ClassYear" DROP CONSTRAINT IF EXISTS "ClassYear_groupId_fkey";
DROP INDEX IF EXISTS public."_ClassYearToStudent_B_index";
DROP INDEX IF EXISTS public."_ClassYearToStudent_AB_unique";
DROP INDEX IF EXISTS public."Teacher_email_key";
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public."Teacher" DROP CONSTRAINT IF EXISTS "Teacher_pkey";
ALTER TABLE IF EXISTS ONLY public."Student" DROP CONSTRAINT IF EXISTS "Student_pkey";
ALTER TABLE IF EXISTS ONLY public."Group" DROP CONSTRAINT IF EXISTS "Group_pkey";
ALTER TABLE IF EXISTS ONLY public."Evaluation" DROP CONSTRAINT IF EXISTS "Evaluation_pkey";
ALTER TABLE IF EXISTS ONLY public."EvaluationCollection" DROP CONSTRAINT IF EXISTS "EvaluationCollection_pkey";
ALTER TABLE IF EXISTS ONLY public."ClassYear" DROP CONSTRAINT IF EXISTS "ClassYear_pkey";
DROP TABLE IF EXISTS public._prisma_migrations;
DROP TABLE IF EXISTS public."_ClassYearToStudent";
DROP TABLE IF EXISTS public."Teacher";
DROP TABLE IF EXISTS public."Student";
DROP TABLE IF EXISTS public."Group";
DROP TABLE IF EXISTS public."EvaluationCollection";
DROP TABLE IF EXISTS public."Evaluation";
DROP TABLE IF EXISTS public."ClassYear";
DROP TYPE IF EXISTS public."Rating";
DROP TYPE IF EXISTS public."ClassYearCode";
DROP EXTENSION IF EXISTS "uuid-ossp";
--
-- TOC entry 2 (class 3079 OID 32889)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 2622 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 882 (class 1247 OID 32969)
-- Name: ClassYearCode; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ClassYearCode" AS ENUM (
    'PRIMARY_FIRST',
    'PRIMARY_SECOND',
    'PRIMARY_THIRD',
    'PRIMARY_FOURTH',
    'PRIMARY_FIFTH',
    'PRIMARY_SIXTH',
    'PRIMARY_SEVENTH',
    'PRIMARY_EIGHTH',
    'PRIMARY_NINTH',
    'HIGH_SCHOOL_FIRST',
    'HIGH_SCHOOL_SECOND',
    'HIGH_SCHOOL_THIRD',
    'VOCATIONAL_FIRST',
    'VOCATIONAL_SECOND',
    'VOCATIONAL_THIRD',
    'VOCATIONAL_FOURTH'
);


--
-- TOC entry 870 (class 1247 OID 32861)
-- Name: Rating; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Rating" AS ENUM (
    'POOR',
    'FAIR',
    'GOOD',
    'EXCELLENT',
    'GREAT',
    'FAILED',
    'PASSABLE'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 32933)
-- Name: ClassYear; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ClassYear" (
    id text NOT NULL,
    code public."ClassYearCode" NOT NULL,
    "groupId" text NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 32799)
-- Name: Evaluation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Evaluation" (
    id text NOT NULL,
    "studentId" text NOT NULL,
    notes text,
    "evaluationCollectionId" text NOT NULL,
    "wasPresent" boolean DEFAULT true NOT NULL,
    "skillsRating" public."Rating",
    "behaviourRating" public."Rating",
    "isStellar" boolean DEFAULT false NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 32791)
-- Name: EvaluationCollection; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EvaluationCollection" (
    id text NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type text NOT NULL,
    description text,
    "environmentCode" text NOT NULL,
    "classYearId" text NOT NULL,
    "learningObjectiveCodes" text[]
);


--
-- TOC entry 217 (class 1259 OID 32784)
-- Name: Group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Group" (
    id text NOT NULL,
    name text NOT NULL,
    "teacherId" text NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "subjectCode" text NOT NULL,
    "currentYearCode" public."ClassYearCode" NOT NULL,
    archived boolean DEFAULT false NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 32806)
-- Name: Student; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Student" (
    id text NOT NULL,
    name text NOT NULL,
    "groupId" text NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 32777)
-- Name: Teacher; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Teacher" (
    id text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL
);


--
-- TOC entry 222 (class 1259 OID 32941)
-- Name: _ClassYearToStudent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_ClassYearToStudent" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 32768)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 2615 (class 0 OID 32933)
-- Dependencies: 221
-- Data for Name: ClassYear; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ClassYear" (id, code, "groupId") FROM stdin;
7f20ecf1-939c-4a9d-b5e2-31baa5ef7e28	HIGH_SCHOOL_FIRST	e97b032a-536c-4331-8075-45de1ffee124
5a1cea2e-8126-4f34-8a08-5a6e675b84f0	PRIMARY_EIGHTH	29627f0e-5406-4c0a-8919-5afb93b3bf2d
34b47355-73a3-41ac-b8c3-3958b3602951	PRIMARY_FIRST	201552e5-b73d-439c-bd17-b3db92725403
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	PRIMARY_THIRD	0214a9fc-3c21-48f2-abab-9ac705059cc1
cd281a47-18ce-4116-86a9-f365dd3e1fc7	PRIMARY_FIFTH	d63d7e1f-283a-43c2-a420-f4c6899f5a8f
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	PRIMARY_FIFTH	3c6c6f5f-efde-49cb-959c-4a46705e2d05
840989b6-a7ca-4476-bd1c-1d3d3cab99b9	PRIMARY_EIGHTH	1ee180cc-0fd2-4b33-ab90-3b23278904dd
ef973513-7d3a-4cf3-abf7-2d2ca41ec8d2	PRIMARY_FIFTH	9bb51a1c-ff1e-4731-83c4-41242a918782
784bbcc6-bc85-4b9a-b308-19df8a26d68f	PRIMARY_SEVENTH	0856ecf9-c6fe-4e0e-9887-805ea86d2561
04ce156a-ecc4-46b0-9a53-03f61fb2e5a9	PRIMARY_SIXTH	bdf8ef36-e213-405d-8eed-cc673cbb95f7
9566dd74-6ae9-45d3-b8cc-e4bbfb182a5a	PRIMARY_SEVENTH	0e9303b3-5ac2-4d35-918d-b38b5b702e2e
41b6ac05-07ec-4fbf-b623-f56241b433e0	PRIMARY_FIFTH	73155753-55f4-4c8c-b5c4-6915ab6bdb79
a1956976-5895-4be9-ae98-a8eaeb11cc4e	PRIMARY_SIXTH	c8439254-6dab-47b6-8f28-24ac3460bfe8
2b65f4d1-3bea-4d02-9c13-056907ed486a	PRIMARY_SEVENTH	f4404ca3-5493-4e1f-a81e-2ab6e6ae5c2a
0bf6db7f-82fa-49a3-9e9a-8d7a6afb29a2	PRIMARY_FIFTH	2c7feaca-9582-4a79-9c9c-8c34e8c0485c
ad630fab-59d6-4f95-85f3-fe78b14da668	PRIMARY_SEVENTH	558998de-3364-412a-908a-70b27920ea42
f2cb19af-b198-4e9d-b2c0-2945024848fb	PRIMARY_SEVENTH	ec6035c5-7677-4cab-b7dc-75f3f998194f
56507bfa-ff4a-4e22-a7a0-d1086c587d45	PRIMARY_NINTH	885f85f3-3708-40ea-ae0b-cdb636126740
0edef857-3f65-4e82-aba3-02c69e0191a8	PRIMARY_SEVENTH	b03b85ef-19a9-47ab-9903-b0a2b82bb1de
7481aede-c286-49ad-a2bd-2e036d70f0db	PRIMARY_SIXTH	b742b732-1232-4326-8f53-b6c68495c4b8
e17aef4a-e022-4ed6-a646-663f9aa0815a	PRIMARY_SIXTH	44ed5f5a-32d9-49bf-8b27-f7baf236771f
1fb061b2-60a7-4bbb-a6f1-52a6f00be3f7	PRIMARY_FIFTH	aaa3df48-b514-44fb-9c15-10aa18e3454e
6b761a28-ed39-4e13-a51c-f4452e8756c3	PRIMARY_NINTH	8e6af31c-465e-427e-b72f-f8116a77ea33
11455bcc-2381-45d9-aeac-ad4bb321eab9	PRIMARY_FIRST	53bbc105-6e07-4841-a795-c75f806bea01
7bfd943e-c11d-458c-a010-48c84b8a6a43	PRIMARY_FIRST	e6299525-7a48-4030-a523-cf249433d62a
b84acf3b-29a2-48a0-899c-8ea75f7920f2	PRIMARY_FIRST	9d124d20-5f11-4647-9256-b1c43740dd81
f6160571-beff-4c21-b3af-399f376429ae	PRIMARY_SEVENTH	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	PRIMARY_SEVENTH	e768794b-c688-4dce-9445-23e8d4c3c986
cf7246cc-5760-499a-9252-c3d1bbcc79e8	PRIMARY_SEVENTH	8eba147b-a52c-4bb7-b42c-7525324113f4
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	PRIMARY_SEVENTH	4c36484b-3244-47a9-a5e3-235c9474383e
45982a54-e42c-4e48-8b84-32689d592abd	PRIMARY_EIGHTH	36b2f528-25fa-4ce2-8d35-6d487a5078d9
640e87de-8063-4c00-9087-c17709e34059	PRIMARY_EIGHTH	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
999be80c-ff15-4515-ba2d-3f330319b986	PRIMARY_EIGHTH	5922e468-ecb6-481e-bfdb-c4e2386cb070
a6a42248-8033-4254-8b5d-ba325479414d	PRIMARY_NINTH	bde28363-5c62-493c-afee-04d21e9eecde
fd028225-16dd-4d8e-8c86-a81a9d9243e5	PRIMARY_NINTH	5d674efc-3549-4837-b221-44c4d622eb09
61dc37a4-b86f-4563-8fca-37aad69a1f05	PRIMARY_NINTH	e5fde4bf-6630-4459-9d8e-31740b307c02
a9bc4d8f-b2da-468d-8054-c60ddadae58c	VOCATIONAL_FIRST	d69b86d5-ca2b-4958-b968-51f360cec0a3
\.


--
-- TOC entry 2613 (class 0 OID 32799)
-- Dependencies: 219
-- Data for Name: Evaluation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Evaluation" (id, "studentId", notes, "evaluationCollectionId", "wasPresent", "skillsRating", "behaviourRating", "isStellar") FROM stdin;
2b4ff521-5282-4702-8295-4fac539f6931	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa nautti lenkkeilystä luonnonkauniilla polulla ja jakoi mielenkiintoisia havaintojaan maisemista muiden kanssa. Hän oli hyvässä kunnossa koko lenkin ajan.	01e458e0-1e9e-4420-8145-0adfeccf2611	t	GOOD	EXCELLENT	t
87a93d06-11cc-4218-94da-5fa1c919b243	d49c17d9-50ee-4d08-8e32-ead9b47358d7	\N	4a0cde87-1f99-4958-82f9-22c0af3937f4	f	\N	\N	f
e67ee33d-7e6b-4e60-aa75-065a20f10ec9	d49c17d9-50ee-4d08-8e32-ead9b47358d7	\N	0c08a1fd-dbfb-40a7-b043-7d2625bf2236	f	\N	\N	f
2891c739-c445-4e55-8364-56b90049b3ac	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa kokeili beach tennisä ensimmäistä kertaa ja sopeutui nopeasti sääntöihin. Hän ei aina osunut palloon, mutta pysyi positiivisena ja kannustavana.	b0fb1852-4b83-4299-9531-80bb0c913b74	t	GOOD	GOOD	f
ab802a43-db95-412b-904a-cacf4065cfd8	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa pelasi sählyä innokkaasti, vaikka pallon käsittely ei ollut vielä täydellistä. Hän kannusti joukkuettaan ja oli positiivinen.	954f425d-6746-4cf5-a30a-2efe89d1f997	t	FAIR	GREAT	f
be8ff204-5d16-4be1-8fae-0cb73481f4f8	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Uintitreeni ei sujunut parhaalla mahdollisella tavalla. Liisa ei ollut kovin motivoitunut ja hänen tekniikkansa kaipasi parannusta.	22968ad6-b092-4551-90e3-a2dbfa3ea7b1	t	POOR	FAIR	f
7d70a496-05dd-4479-9083-528d7bddaf9f	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa harjoitteli tanssin koreografiaa erittäin hyvin ja osasi seurata rytmiä. Hän auttoi muita oppimaan haastavat liikkeet ja piti tunnelman kevyenä.	635a35ee-bce5-4780-ab79-8e915a808eec	t	EXCELLENT	GREAT	t
10b6903d-7aed-477e-a48d-204896852331	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa treenasi perusvoimistelutreeniä ahkerasti, mutta tarvitsi apua muutamissa liikkeissä. Hän kuunteli ohjeita ja pyrki parantamaan suoritustaan.	ebcfa57e-1bcc-4414-99a5-9339ddc320e2	t	FAIR	GOOD	t
8d9be809-689d-4600-af6d-c72ae6cbc5a3	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa osallistui luontojoogaan aktiivisesti ja keskittyi hyvin harjoitukseen. Hän auttoi muita osallistujia tarvittaessa ja nautti ulkoilmasta.	ddc664b7-696e-49df-8580-47badac74ad6	t	GREAT	EXCELLENT	f
863ba06c-3b3d-4587-888a-21d11ffadb76	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa nautti retkeilystä metsässä ja käveli reippaasti koko 10 kilometrin lenkin. Hän ihasteli luontoa ja otti valokuvia matkan varrella.	b30d61cb-25c3-46f2-841c-047642d0714c	t	GREAT	GREAT	t
580c6d81-0c85-4b6d-8202-43f6827e8164	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa juoksi peruskestävyystreenin aikana, mutta hänellä oli vaikeuksia mäkien kanssa. Hän pysyi kuitenkin positiivisena ja jatkoi yrittämistä.	efe24343-b2ca-40e0-ae52-a28c82d286c2	t	FAIR	GOOD	f
2cddedee-3fc8-4f0d-b5ab-422d62e94730	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa teki kuntoiluharjoituksia puistossa, mutta keskittyminen herpaantui ajoittain. Hän suoritti liikkeet oikein, mutta olisi voinut olla tarkkaavaisempi.	97f8ec00-2d10-4609-8329-0d8db104819a	t	GOOD	FAIR	t
13886451-60d6-46c6-9ee2-bffe83aa8536	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa pelasi sählyä salissa ja yritti parhaansa, vaikka hänen mailankäsittelynsä ei ollut vahvinta. Hän kannusti joukkuettaan ja auttoi heitä.	9e26e178-432e-4125-b276-a7ad955916f4	t	FAIR	GOOD	f
c85ecbc6-b399-433f-8f4e-40e5a83385bd	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa osallistui vesijumppaan aktiivisesti ja suoritti liikkeitä hyvällä asenteella. Hän auttoi muita osallistujia ja kannusti heitä yrittämään parhaansa.	ce67c2e6-ee48-40cc-8d36-9c91f8558dd4	t	GOOD	EXCELLENT	f
00e83b8e-2b7d-4801-84a2-36d2e9d94686	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa osallistui luontojoogaan rannalla ja harjoitteli liikkeitä keskittyneesti. Hän nautti auringonlaskun tunnelmasta ja auttoi muita osallistujia.	0d71d426-6012-4cf0-988f-5ac3328413e5	t	GREAT	EXCELLENT	f
778a8c9a-d0ec-4bcc-87a6-e789a5047f9e	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa harjoitteli voimistelutreeniä salilla ja teki hyviä hyppyjä ja liikkeitä. Hän tarvitsi apua tasapainossa, mutta oli motivoitunut ja kuunteli ohjeita.	5770c83f-70c0-4cf2-a931-73a1082c0b89	t	GOOD	GOOD	t
314445a7-0bf2-4099-8826-130c1bd1091d	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa harjoitteli latinalaistansseja tanssitunnilla ja oppi nopeasti uudet askeleet. Hän auttoi muita oppimaan ja piti tunnelman kevyenä.	eee35041-667f-4142-9506-bffcba305ad8	t	EXCELLENT	GREAT	t
65c357b0-ee75-492e-a12e-8e46729d8306	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa osallistui uintitreeniin ja yritti parantaa tekniikkaansa. Vaikka hän ei ollut nopein uimari, hän pysyi positiivisena ja kannusti muita osallistujia.	ab4df1d5-7402-484e-b1cb-65c18a196ac3	t	FAIR	GREAT	t
cae51d89-6140-4239-820f-6d0ad776d274	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa nautti retkeilystä järvellä ja teki tasaisen vauhdin koko 8 kilometrin lenkin. Hän otti kuvia ja nautti luonnon kauneudesta ympärillään.	c5e7922a-7308-4b78-b0dd-9a67f14b73c1	t	GREAT	GREAT	f
6b736eb7-a04a-42b6-a100-d579506725c7	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa osallistui vesijumppaan ja teki liikkeitä energisesti. Hän auttoi muita osallistujia ja oli positiivinen koko tunnin ajan.	50018534-e995-4788-a885-816beda65c1a	t	GOOD	EXCELLENT	f
d0fb0a7c-9c7e-43dd-9823-ef85db79d185	d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa juoksi kestävyystreenin aikana, mutta hänellä oli haasteita pidempien mäkien kanssa. Hän ei kuitenkaan luovuttanut ja kannusti muita osallistujia.	9c6555de-12e8-40a5-8f67-da827cde1fb7	t	FAIR	GOOD	f
d874e854-127e-4755-b7d5-5570595370c6	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo osallistui sählynpeluuseen sisällä salissa. Hänellä oli vaikeuksia pallon käsittelyssä aluksi, mutta paransi otettaan pelin edetessä. Hän kannusti joukkuetovereitaan ja pelasi reilusti.	954f425d-6746-4cf5-a30a-2efe89d1f997	t	FAIR	GOOD	f
2c2e8970-f90c-48b1-abc0-ea817450e35a	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo nautti luonnonkauniilla polulla lenkkeilystä. Hän piti hyvää vauhtia yllä ja auttoi muita osallistujia vaikeissa kohdissa. Maisemat olivat upeat ja Teppo jakoi iloaan muiden kanssa.	01e458e0-1e9e-4420-8145-0adfeccf2611	t	GOOD	GREAT	f
d3a30459-ff98-43fa-854d-e629fa0964ef	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo osallistui kuntosalitreeniin ja keskittyi erityisesti keskivartalon lihaksiin. Hän teki liikkeitä hyvällä tekniikalla ja auttoi muita osallistujia tarvittaessa. Treeni sujui hyvin.	4a0cde87-1f99-4958-82f9-22c0af3937f4	t	GREAT	GREAT	f
7c22c897-c59e-4f74-809e-e0004832c474	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo osallistui tanssitunnille ja yritti oppia uutta koreografiaa. Hänellä oli vaikeuksia muutamien liikkeiden kanssa, mutta hän ei luovuttanut ja jatkoi yrittämistä.	635a35ee-bce5-4780-ab79-8e915a808eec	t	FAIR	GOOD	f
9c1b981a-b449-4def-8d31-9325fc07e81d	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo pelasi pallopeliä hiekkakentällä ja kokeili beach tennistä. Vaikka laji oli uusi hänelle, hän oppi nopeasti ja kannusti muita pelaajia. Tunnelma oli innostunut ja hauska.	b0fb1852-4b83-4299-9531-80bb0c913b74	t	GOOD	EXCELLENT	f
9ab9add0-0384-4fab-8ce5-a700af4aa2a4	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo osallistui luontojoogaan ulkona puistossa. Hän teki joogaliikkeitä rauhallisesti ja keskittyneesti, nauttien samalla raikkaasta ulkoilmasta. Hän auttoi muita osallistujia tarvittaessa.	ddc664b7-696e-49df-8580-47badac74ad6	t	GOOD	GREAT	f
262dffef-f5e2-47a6-8471-f564048c3ea7	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo pelasi sählyä salissa ja osallistui tiukkaan otteluun. Hän teki yhden maalin ja auttoi joukkuettaan puolustuksessa. Hän myös kannusti muita pelaajia.	9e26e178-432e-4125-b276-a7ad955916f4	t	GOOD	GREAT	f
f78d43f2-290e-43b2-9122-57d1599bc11e	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Tanssi ei sujunut tänään kovin hyvin. Matti ei pysynyt rytmissä ja tanssi liian nopeasti.	635a35ee-bce5-4780-ab79-8e915a808eec	t	POOR	\N	f
7a6e1c57-2bf4-4cee-a894-5474a884fed2	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matti juoksi hyvin ja jaksoi koko lenkin ajan. Hän kannusti muita juoksijoita ja piti hyvää tahtia yllä.	efe24343-b2ca-40e0-ae52-a28c82d286c2	t	GREAT	GOOD	f
d44140b5-9c52-4f87-b7df-6bbdd8b7d633	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matti pelasi tennistä hyvällä asenteella ja nautti ulkokentällä pelaamisesta. Hän auttoi muita pelaajia ja piti hauskaa.	50018534-e995-4788-a885-816beda65c1a	t	\N	\N	f
cae6c151-3c44-4941-80d6-1316920361dc	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo harjoitteli perusvoimistelua voimistelusalilla. Hän teki erilaisia liikkeitä ja hyppyjä, mutta tarvitsi vielä harjoitusta tasapainonsa säilyttämisessä. Hän yritti parhaansa ja kuunteli ohjaajan neuvoja.	ebcfa57e-1bcc-4414-99a5-9339ddc320e2	t	FAIR	GOOD	f
c360b941-0873-4336-a706-56f9ebc61840	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo osallistui joogatunnille ja harjoitteli erilaisia asentoja ja hengitystekniikoita. Hän keskittyi hyvin ja auttoi muita osallistujia, kun he tarvitsivat apua.	0d71d426-6012-4cf0-988f-5ac3328413e5	t	GOOD	EXCELLENT	f
47a0769f-e21b-47e9-9135-6c5ed959b984	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matilla selvästi kunto on hyvä ja saa salilla tehtyä hyviä liikkeitä. Keskittyminen poikkesi kuitenkin useasti ja Matti häiritsi hieman tunnin kulkua.	4a0cde87-1f99-4958-82f9-22c0af3937f4	t	EXCELLENT	FAIR	f
3572571f-7406-42ee-a4c7-9d502beac32a	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Vaikka Matti ei ollut aivan parhaimmillaan latinalaistansseissa, hän osallistui tunnille positiivisella asenteella ja kannusti muita.	eee35041-667f-4142-9506-bffcba305ad8	t	FAIR	GREAT	f
1ecc244e-00ed-488d-a8ae-6f81f98928dd	7ebec83f-f17b-4770-a9af-ea290f26e168	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	GOOD	GREAT	f
109ca9dc-7de7-4200-939e-b0f248f3a29f	40a52df7-f50b-4105-b4d2-00e0b391156b	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	FAIR	FAIR	f
d5cba415-e655-43ee-a390-397f81e92f58	6edb9c7d-338c-42b3-8bed-95c037398e1d	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	f	\N	\N	f
5cfc497d-f3dd-4785-833b-95ebfafb12fb	0de6a87e-13a1-4713-988d-655e950c9fea	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	FAIR	GOOD	f
4b93ce96-d3b2-4aea-88ee-11c85698be94	76d7ba34-af4d-41e0-934a-63461dc3aeac	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	GREAT	GREAT	f
6130f0f1-2570-4980-9fab-3393f50a4a4b	92214907-4fe9-442f-9f35-c7b59f78e08a	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	GREAT	GOOD	f
f78772a4-01c8-4cd8-b196-a66994a1b3dd	9c95ce1a-b395-4179-9558-10abb9105fd0	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	GOOD	GREAT	f
1aa02c67-fbd6-47c8-ad49-2f17f406fb88	e2500f5c-1aea-4ffe-9f18-9b86022fce62	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	GOOD	GOOD	f
a3003ee2-c707-4cac-be71-818db7caad49	33ce32f8-0ac8-47f6-a2a9-f5aa880442f4	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	GREAT	FAIR	f
3b825da3-c96e-4c75-9e27-bcd8bf71b803	e3e017a1-6c30-4320-8ccf-3b2b276e8128	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	GOOD	GREAT	f
d0d6d08a-f178-4f7a-9df0-c6bd5b51ebee	3cb1e21e-1338-4fac-8380-c69946fc26c6	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	FAIR	POOR	f
2acc39e1-5897-41e2-846d-2bebee6848bd	e1ceb28e-8139-41aa-bf55-3ef379c568ab	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	FAIR	FAIR	f
6055e60d-1b6c-4749-af87-09eb430618e7	72a94026-88ad-4cbb-b1e4-e6aa917db696	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	FAIR	GOOD	f
47c12c6d-6c71-47cb-8fa5-9a9c51802547	5de52dab-1765-4acf-8020-053b68336487	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	GOOD	FAIR	f
45e69e09-0e85-4964-a3e8-8dd345ce0e57	268e1a31-5cba-4861-8aae-7d38fb140f13	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	GOOD	FAIR	f
22e604ea-8c63-4796-ae3c-7ed506775dc8	0b357c38-9cda-428a-8a3b-0254143564df	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	FAIR	GOOD	f
8a52a6e3-8b56-4bbd-ac24-1e8ed66b719c	01ab146e-d9da-4562-a7dc-f3d151d4992b	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	\N	\N	f
94cc2fda-84ba-4c43-a811-a9d1e07a42ea	9fc6c35d-b42d-4594-a960-5836531c7282	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	FAIR	GREAT	f
82f269ba-8e18-4e7a-9397-5b78489503fd	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo osallistui kiipeilytunnille kiipeilyseinällä. Hän osoitti erinomaista kehonhallintaa ja voimaa, ja kiipesi nopeasti ylös seinää. Hän myös tuki muita osallistujia ja opasti heitä tarvittaessa.	22968ad6-b092-4551-90e3-a2dbfa3ea7b1	t	EXCELLENT	GREAT	f
16708006-ac69-4af1-a5c0-e12c05355e58	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo osallistui pyöräilyretkelle ja ajoi noin 15 kilometrin lenkin. Hänellä oli alussa vaikeuksia pysyä muiden mukana, mutta päätti kuitenkin jatkaa ja saavutti lopulta muut.	5770c83f-70c0-4cf2-a931-73a1082c0b89	t	FAIR	GOOD	f
4443aaba-e92b-4597-b31b-ca1acb8b76df	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matti osallistui aktiivisesti beach tennikseen, vaikka hänellä oli hieman vaikeuksia pelin sääntöjen ymmärtämisessä.	b0fb1852-4b83-4299-9531-80bb0c913b74	t	\N	GOOD	f
656ce9a8-923b-479f-a858-9d9cb163ff82	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	9e26e178-432e-4125-b276-a7ad955916f4	f	\N	\N	f
6d437ecd-2532-4d92-86d7-0fb431b18e27	18ccbf25-0831-40e9-9145-602b9d17ed2c	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	FAIR	GOOD	f
2d74d66f-90cc-4a08-81a5-c0c89fa04b0a	189e5ac6-f54b-4b10-ae14-ff92e63c3e5f	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	GREAT	\N	f
a6997375-5cf4-4e33-b141-e90525e046bd	39e44baf-d5a4-4a7b-85ba-8d9ef3dd9567	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	GREAT	GREAT	f
885b5059-5d92-46e5-89e6-c028bc00f26d	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo pelasi jalkapalloa koulun pihalla kavereiden kanssa. Hän osoitti hyviä taitoja ja teki pari maalia. Hän kannusti joukkuetovereitaan ja nautti pelistä.	0c08a1fd-dbfb-40a7-b043-7d2625bf2236	t	GOOD	GREAT	f
d25f5712-1b2e-4fd1-8e48-9ad834e77bb7	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo osallistui hiihtoretkelle ja hiihti noin 8 kilometrin lenkin. Hän kaatui muutaman kerran, mutta päätti jatkaa ja paransi tekniikkaansa matkan varrella.	c5e7922a-7308-4b78-b0dd-9a67f14b73c1	t	FAIR	GOOD	f
bfd694a1-2695-4da3-a735-d9b003223c2d	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matti osallistui joogaan keskittyneesti ja rauhallisesti. Hän auttoi muita osallistujia ja piti positiivista ilmapiiriä yllä.	ddc664b7-696e-49df-8580-47badac74ad6	t	GREAT	EXCELLENT	f
7702d73b-7b5f-4abe-ae86-4d24a6c290f6	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matti teki lihaskuntoliikkeet ja venyttelyt huolellisesti. Hän auttoi myös muita osallistujia ja jakoi vinkkejä parhaiden tekniikoiden suhteen.	97f8ec00-2d10-4609-8329-0d8db104819a	t	GOOD	EXCELLENT	f
c4d859c7-ca63-4bfc-8b34-22c71af744c8	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo osallistui retkeilyyn metsässä. Hän käveli 10 kilometrin lenkin metsäpolkuja pitkin, mutta väsyi hieman loppua kohti. Hän ihasteli kaunista luontoa ja jaksoi silti hymyillä.	b30d61cb-25c3-46f2-841c-047642d0714c	t	FAIR	GREAT	f
0988b752-ec75-4829-bfdf-57a159f8ecfc	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo harjoitteli voimistelua ja kokeili erilaisia akrobaattisia liikkeitä. Hän ei onnistunut kaikissa liikkeissä heti, mutta oli sisukas ja yritti uudelleen kunnes onnistui.	50018534-e995-4788-a885-816beda65c1a	t	GOOD	GREAT	f
3c438e4e-29ea-411e-834d-7a239cd5151d	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matti ui hyvin ja jaksoi treenata koko harjoituksen ajan. Hän piti tauot sopivissa väleissä ja oli ystävällinen muille uimareille.	22968ad6-b092-4551-90e3-a2dbfa3ea7b1	t	GOOD	GOOD	f
09505176-bd32-46d4-9e3f-68e4ded86b9d	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Vaikka Matilla oli vaikeuksia voimisteluliikkeiden kanssa, hän osallistui harjoitukseen hyvällä asenteella ja yritti parhaansa.	5770c83f-70c0-4cf2-a931-73a1082c0b89	t	POOR	\N	f
be7aa8ed-04bc-44d6-b0b2-03979683007e	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo osallistui vesijumppaan uimahallissa. Hän treenasi erilaisia liikkeitä vedessä ja keskittyi kunnon kohottamiseen. Hän auttoi myös muita ja oli innokas oppimaan.	ce67c2e6-ee48-40cc-8d36-9c91f8558dd4	t	GOOD	EXCELLENT	f
ad3c3008-40fa-42b5-99a0-840c8a6c14f0	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo osallistui koripalloharjoituksiin ja näytti erinomaisia taitojaan. Hän teki useita koreja ja antoi hyviä syöttöjä. Hän myös kannusti ja auttoi joukkuetovereitaan.	ab4df1d5-7402-484e-b1cb-65c18a196ac3	t	EXCELLENT	EXCELLENT	f
50b7c4ee-d4f3-42f2-8e54-0126bc60ef5a	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	ebcfa57e-1bcc-4414-99a5-9339ddc320e2	f	\N	\N	f
edd85fab-ccd2-4eff-a41d-95e7a2a9a661	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matti osallistui luontojoogaan aktiivisesti ja nautti rannan tunnelmasta. Hän auttoi muita osallistujia tarvittaessa ja piti hyvää ilmapiiriä yllä.	0d71d426-6012-4cf0-988f-5ac3328413e5	t	GOOD	EXCELLENT	f
aabe9b66-b644-4215-8d5b-00b858f3f691	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo osallistui peruskestävyystreeniin juoksuradalla. Hän juoksi noin 5 kilometrin lenkin, mutta hengästyi muutamissa mäissä. Hän kannusti itseään ja jatkoi juoksua.	efe24343-b2ca-40e0-ae52-a28c82d286c2	t	FAIR	GOOD	f
38ecc518-9d6a-4e44-9435-b6422c9d6fa8	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo osallistui uintiharjoituksiin ja näytti erinomaisia taitojaan eri uintitekniikoissa. Hän ui nopeasti ja kehitti tekniikkaansa jatkuvasti. Hän myös auttoi ja kannusti muita uimareita.	9c6555de-12e8-40a5-8f67-da827cde1fb7	t	EXCELLENT	EXCELLENT	f
22dea29b-69c2-4443-a4db-6b3181120430	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	0c08a1fd-dbfb-40a7-b043-7d2625bf2236	f	\N	\N	f
431371e3-9535-4464-8e2b-f6d10edffe4b	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matti nautti kansallispuiston retkestä ja jakoi mielenkiintoisia tietoja maisemista ja luonnosta muiden kanssa. Hän auttoi muita tarvittaessa ja piti ryhmän yhtenäisenä.	9c6555de-12e8-40a5-8f67-da827cde1fb7	t	GREAT	EXCELLENT	f
56425e1f-9da7-4e99-858c-62e2f3b0ebce	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo osallistui tanssitunnille ja harjoitteli latinalaistansseja, kuten salsaa ja cha chaa. Hän ei ollut aivan rytmissä koko ajan, mutta nautti tanssista ja oppi nopeasti.	eee35041-667f-4142-9506-bffcba305ad8	t	GOOD	GREAT	f
2	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	01e458e0-1e9e-4420-8145-0adfeccf2611	f	\N	\N	f
917a6b7a-a659-4401-a933-30760d97c517	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matti nautti retkeilystä metsässä ja piti huolta, että ryhmä pysyi koossa. Hän myös auttoi muita retkeläisiä tarvittaessa.	b30d61cb-25c3-46f2-841c-047642d0714c	t	GREAT	\N	f
3e3e0f2f-d233-47f6-bd11-e634f00d5847	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matti ui avovesialtaassa hyväntuulisena, vaikka vesi oli kylmää. Hän jaksoi treenata koko harjoituksen ajan ja kannusti muita uimareita.	ab4df1d5-7402-484e-b1cb-65c18a196ac3	t	\N	GREAT	f
488133db-f86e-4010-9f8c-4d4f6b8daa96	11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo harjoitteli kuntoilua puistossa. Hän teki erilaisia lihaskunto- ja venyttelyliikkeitä puiston penkeillä ja portailla, mutta tarvitsi vielä harjoitusta tietyissä liikkeissä.	97f8ec00-2d10-4609-8329-0d8db104819a	t	FAIR	GOOD	f
c1fed00b-11a3-4169-a88c-0c1511ae416a	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matilla meni tosi hyvin tänään. Maila pysyi kädessä ja tekniikka oli kunnossa. Matti kannusti myös toisia mukaan pelaamaan	954f425d-6746-4cf5-a30a-2efe89d1f997	t	GOOD	GREAT	f
ee837bef-ba46-4aac-88a1-0e6a29353720	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matti osallistui vesijumppaan innokkaasti, mutta hänellä oli vaikeuksia joissakin liikkeissä. Hän ei kuitenkaan lannistunut ja yritti parhaansa.	ce67c2e6-ee48-40cc-8d36-9c91f8558dd4	t	FAIR	GOOD	f
80f13c1b-0a57-49ee-8e93-f3a57643e8c6	5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matti treenasi kuntosalia tehokkaasti ja keskittyi ylävartalon lihaksiin. Hän kuitenkin keskusteli välillä liikaa muiden kanssa, mikä häiritsi hieman treeniä.	c5e7922a-7308-4b78-b0dd-9a67f14b73c1	t	GREAT	GOOD	f
77506543-ecc7-4b61-8a92-e5e87f499397	d49c17d9-50ee-4d08-8e32-ead9b47358d7	\N	3e52d3b7-7d7f-407f-b286-8997a0de8e3b	t	GOOD	GREAT	f
a1483b1b-a6c3-4a46-8cb1-f0623f7e43a0	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	3e52d3b7-7d7f-407f-b286-8997a0de8e3b	t	FAIR	GOOD	f
2e5abe06-83be-42a6-9acd-322bdaa0a4f2	11cd88f0-bd26-47c9-bd44-e928cc73941b	\N	3e52d3b7-7d7f-407f-b286-8997a0de8e3b	t	FAIR	FAIR	f
2c19b996-5b95-4357-af9f-602cc6ce9e04	67ea0653-c9ce-4392-aac0-7ef8f7c5ca26	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	EXCELLENT	EXCELLENT	f
ee628ee0-b4f4-41f2-a66a-a2eb465b5ab3	63ac40cf-5435-4847-ab5e-9aa7f87be4c8	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	EXCELLENT	EXCELLENT	f
23b42545-6d75-49ed-9796-17de25c0315a	d11bfb03-737b-4674-885e-8106e7fcb822	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	GREAT	EXCELLENT	f
a5a6e0c2-73d9-4476-ae05-9f97f877af7d	8f91dadf-8cd4-49d2-8bbd-19f21997ccfd	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	GOOD	FAIR	f
d7109647-c245-4544-b6da-e72679520a52	eb679a62-4942-4687-ae5e-41c051705198	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	EXCELLENT	POOR	f
28f62041-a555-473f-8664-5d340b3c67c8	fbfc259b-92b8-473a-be4c-af41872eb4ed	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	EXCELLENT	FAIR	f
0207e93d-bed7-43db-af5f-bfd1a8f375b8	be981090-64ab-412b-b619-781d00ba30eb	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	EXCELLENT	POOR	f
68fde367-80d2-4ec3-94f4-d58e22126f20	caa864dc-2238-45c3-a014-7dae91be7891	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	EXCELLENT	EXCELLENT	f
62046f1c-d055-4ade-aa68-e8b7174ff111	777a6529-5d2d-4037-a8d9-49721e37b6f7	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	GREAT	GREAT	f
1b858798-c3a2-4256-ac43-8d64f4ca61b7	f695e8be-7103-4c28-a0ac-6f8a67cc44ad	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	FAIR	EXCELLENT	f
4fc8b77c-76fe-4be2-8ddd-cd9905f3af93	180c7590-34fd-403c-9496-a1d8db4d7dba	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	GOOD	EXCELLENT	f
8e7d3ba1-e628-4e06-9ad1-bb22229a86ef	d52a0745-d5ce-46c3-89f1-2a54007e7bde	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	EXCELLENT	EXCELLENT	f
498aed7c-7e88-4d68-91c9-af76b3368013	a68027c8-a6bd-4d50-90cc-337a7a4ce42f	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	GREAT	FAIR	f
6ffc3fa8-144d-46d8-ab67-295591e07eb3	7fb42188-30c7-4fe1-b71e-b34420d9fec1	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	GREAT	GOOD	f
fcb938f6-1111-468c-99d9-3e1c7e533ca6	06e78983-176e-4899-a198-238f9bdcd608	\N	b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	t	EXCELLENT	EXCELLENT	f
9af8d90c-bc23-4e9a-afed-a7f3968bb6ab	d49c17d9-50ee-4d08-8e32-ead9b47358d7	\N	acd2d0d1-7e43-40a6-80c9-ee1e152eebf6	t	FAIR	GOOD	f
6d539b52-1be7-4f20-9707-be0ba1fc7676	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	acd2d0d1-7e43-40a6-80c9-ee1e152eebf6	t	GOOD	FAIR	f
7e438d9b-a150-4968-adad-3d54cbbfa5dd	11cd88f0-bd26-47c9-bd44-e928cc73941b	\N	acd2d0d1-7e43-40a6-80c9-ee1e152eebf6	t	FAIR	GOOD	f
15778ad0-276c-45a1-8f94-907d2a629e3f	d49c17d9-50ee-4d08-8e32-ead9b47358d7	\N	7b608481-86ee-4cfb-9b69-f151abc5923b	t	GOOD	FAIR	f
7e82b479-f536-41a2-834a-2d48bd6e0f56	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	7b608481-86ee-4cfb-9b69-f151abc5923b	t	EXCELLENT	GREAT	f
12e13a4b-3249-414d-ae87-6d5996a098c7	11cd88f0-bd26-47c9-bd44-e928cc73941b	Terve terve	7b608481-86ee-4cfb-9b69-f151abc5923b	t	FAIR	FAIR	f
547f81f7-4fc2-4765-aa7b-952eaed13396	d49c17d9-50ee-4d08-8e32-ead9b47358d7	\N	66936a7f-050a-4073-af7b-5c0d5cb2bf84	t	FAIR	GOOD	f
601c772f-de70-494b-ae7b-323d8cca3ae2	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	66936a7f-050a-4073-af7b-5c0d5cb2bf84	t	FAIR	FAIR	f
7e6443c4-299e-46d6-ae9e-2c97f907bd7d	11cd88f0-bd26-47c9-bd44-e928cc73941b	\N	66936a7f-050a-4073-af7b-5c0d5cb2bf84	t	GOOD	GOOD	f
6df21dbf-a6c9-4a81-9473-99157a24b246	ff5f5fb8-e156-4a1b-821a-d918a7b4f879	Uskomatonta työtä	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	EXCELLENT	EXCELLENT	f
3e6a4a52-ac9c-449c-8a41-5cb31f9b3b72	e99ee5ed-2abf-4af9-8d8b-44c0cc187712	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	GREAT	GOOD	f
47c1c506-7e2c-417a-b5fb-60b9c381a16c	b81ed4fb-93f6-4870-be6a-4e16d7040aa6	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	GOOD	GOOD	f
57946d06-4533-4654-bda5-1c85ac801ac5	8c9e57f5-1dc1-4c32-9775-200315ee9ca7	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	FAIR	GREAT	f
82d32bb2-1693-4134-850c-b47a5ff29274	5b4efcd1-784f-4d70-9d8a-39b3efe9252a	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	POOR	POOR	f
e5647e27-dc66-4871-8c08-ed5a90a59bb1	3076b97b-4518-4fad-bf84-6c716330f5ca	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	f	GOOD	FAIR	f
fd7efca3-6196-4bbe-8a0d-16479411aa4e	6ab3fb53-9ed8-4d3b-9b83-649673a18f8c	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	EXCELLENT	POOR	f
21411767-4f2f-4217-9410-c1346397aff1	3e491af6-d9d3-47a5-bb80-9cf1bf9296de	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	GREAT	FAIR	f
c8fead15-39f8-4ce3-92e6-d7dc0fbe4980	baa4f222-d2f9-47f9-bfb6-7f52e03e1614	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	GOOD	EXCELLENT	f
6f211aac-95f8-47f3-b95d-0ce8c78fc5f5	2e7a1237-7f0c-46ac-bf32-df23571f0e82	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	POOR	EXCELLENT	f
47875bf9-d123-47d0-848d-f4c37b257d2e	e0520bdb-0175-4c95-9eb6-7b821f291b84	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	f	FAIR	GREAT	f
2faf5e2b-eb94-4145-afe3-163ed0d875bf	bfe30e38-2410-419e-8e1a-57fc39ea5dff	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	GREAT	EXCELLENT	f
01532417-1ee2-4ceb-a2b0-1ee383af9e3f	3c8ea8e2-a3ee-403a-96e8-715d670e228c	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	EXCELLENT	EXCELLENT	f
d534d007-92ed-44c4-884c-9e9c8c090440	3fc922f0-3d2f-4d53-99e2-93e987a6e403	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	EXCELLENT	FAIR	f
aedbb89f-76e3-43d6-82fa-5eec5458abc1	203c350a-f4ba-40d5-b3eb-08e8af216a15	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	EXCELLENT	EXCELLENT	f
6f5c65ce-9c11-40ce-a4e5-82d5a2e6897c	32ed8751-d751-4481-a987-6cb4ec026395	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	FAIR	FAIR	f
7e70854b-8ae1-4d4f-8194-aeaaac856b1b	21579927-936b-44ba-bb3d-3c81a17f2edf	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	f	EXCELLENT	EXCELLENT	f
526ee578-5dc5-4319-af58-9ca73f86cf37	ff5f5fb8-e156-4a1b-821a-d918a7b4f879	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	EXCELLENT	GREAT	f
4d04c395-370e-4558-aa1e-d5c41ce413d3	e99ee5ed-2abf-4af9-8d8b-44c0cc187712	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	GREAT	EXCELLENT	f
5c06314b-ad06-475a-bd21-a492b890849c	b81ed4fb-93f6-4870-be6a-4e16d7040aa6	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	GOOD	GOOD	f
58a8dfed-c405-4be0-b620-d59d1e07dfd7	8c9e57f5-1dc1-4c32-9775-200315ee9ca7	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	FAIR	GREAT	f
01c97db8-dbbd-4390-8b3c-ef9f64f0b38a	5b4efcd1-784f-4d70-9d8a-39b3efe9252a	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	EXCELLENT	EXCELLENT	f
fe5db646-4a45-4896-8151-2d1b020e4f54	3076b97b-4518-4fad-bf84-6c716330f5ca	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	EXCELLENT	FAIR	f
273affa2-f3aa-4a22-a35b-d47b034066da	6ab3fb53-9ed8-4d3b-9b83-649673a18f8c	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	FAIR	FAIR	f
51be9e38-6ebb-4127-bbec-289eafcc0223	3e491af6-d9d3-47a5-bb80-9cf1bf9296de	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	EXCELLENT	EXCELLENT	f
cc303b9f-018e-4658-8a9c-01152ff54118	baa4f222-d2f9-47f9-bfb6-7f52e03e1614	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	FAIR	POOR	f
934b7bc3-51d0-474c-9383-0a5b8eda8b9e	2e7a1237-7f0c-46ac-bf32-df23571f0e82	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	GREAT	POOR	f
24882fc8-302e-46c2-889b-e782bd9a4cdc	e0520bdb-0175-4c95-9eb6-7b821f291b84	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	EXCELLENT	GREAT	f
80b01023-dec7-42ac-9ccc-038fbe3e0938	bfe30e38-2410-419e-8e1a-57fc39ea5dff	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	EXCELLENT	EXCELLENT	f
1c55d7ce-2f7e-4639-bb6a-00714c4cf0d8	3c8ea8e2-a3ee-403a-96e8-715d670e228c	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	GREAT	EXCELLENT	f
93e41f03-8963-4977-a92e-8bdae26851b1	3fc922f0-3d2f-4d53-99e2-93e987a6e403	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	EXCELLENT	GOOD	f
ffc4fc56-5fd6-418e-b204-a4eab06c099c	203c350a-f4ba-40d5-b3eb-08e8af216a15	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	GOOD	EXCELLENT	f
017201ea-da77-4c3b-8868-8c3d41b6cb53	32ed8751-d751-4481-a987-6cb4ec026395	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	FAIR	EXCELLENT	f
67ebc63c-dd3e-4b4a-bcb5-50e157e24e0d	b3bd6d2e-1bf6-4f56-a561-806a2d11bd97	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	GOOD	EXCELLENT	f
74f4159e-6afa-4da3-80bb-40661b80b104	21579927-936b-44ba-bb3d-3c81a17f2edf	\N	c4c4cba4-49cf-4b74-a24e-5fde3ec62003	t	GOOD	EXCELLENT	f
8570618d-4792-47d1-aed5-53370a1299cb	ff5f5fb8-e156-4a1b-821a-d918a7b4f879	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	EXCELLENT	EXCELLENT	f
ba2624e3-0a8a-42b3-90da-a5cc7c2d7ce0	e99ee5ed-2abf-4af9-8d8b-44c0cc187712	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	GREAT	GOOD	f
b894823f-f15d-4d80-94eb-50841b0b78c5	b81ed4fb-93f6-4870-be6a-4e16d7040aa6	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	EXCELLENT	EXCELLENT	f
dbf55f24-ac4a-43db-85db-eda69d380b5b	8c9e57f5-1dc1-4c32-9775-200315ee9ca7	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	GREAT	FAIR	f
d71d2a53-e0b7-4eb2-b94f-cab28d7044cd	5b4efcd1-784f-4d70-9d8a-39b3efe9252a	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	EXCELLENT	GREAT	f
b9be4ba9-765e-4788-99fc-0ac342d3304f	3076b97b-4518-4fad-bf84-6c716330f5ca	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	GOOD	EXCELLENT	f
41368be5-3ed4-4bf2-a859-97befca21c6a	6ab3fb53-9ed8-4d3b-9b83-649673a18f8c	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	f	FAIR	EXCELLENT	f
2341efae-3d6a-4bbe-841e-b3538a3a78ce	3e491af6-d9d3-47a5-bb80-9cf1bf9296de	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	EXCELLENT	GREAT	f
08cb90ae-a3aa-4668-a2bb-a9a8b64973ef	baa4f222-d2f9-47f9-bfb6-7f52e03e1614	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	EXCELLENT	GOOD	f
bfce45ef-7a98-4dbe-b8a8-47dff15a1974	2e7a1237-7f0c-46ac-bf32-df23571f0e82	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	EXCELLENT	GOOD	f
fe940227-9038-4e50-9fc8-39c0ca376d21	e0520bdb-0175-4c95-9eb6-7b821f291b84	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	EXCELLENT	EXCELLENT	f
7f397e91-6865-4534-b8d5-eb247021bf80	bfe30e38-2410-419e-8e1a-57fc39ea5dff	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	GOOD	FAIR	f
50052c6c-db72-4f48-9378-102abecb9f7a	3c8ea8e2-a3ee-403a-96e8-715d670e228c	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	GOOD	EXCELLENT	f
f1bb5051-6e7a-4bbb-9471-6419eb3668e3	3fc922f0-3d2f-4d53-99e2-93e987a6e403	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	f	GREAT	GOOD	f
d0168237-e26d-4855-8821-8208f312b379	203c350a-f4ba-40d5-b3eb-08e8af216a15	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	GREAT	EXCELLENT	f
f51059db-6229-4380-b39e-c2ca9b4384e5	32ed8751-d751-4481-a987-6cb4ec026395	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	EXCELLENT	EXCELLENT	f
2bc1f3e8-44b2-428a-aebf-c715cb9473a0	b3bd6d2e-1bf6-4f56-a561-806a2d11bd97	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	EXCELLENT	GOOD	f
95b23529-f84a-4b4d-bbad-f9846c4cd5e9	21579927-936b-44ba-bb3d-3c81a17f2edf	\N	2a10af5b-4d60-4334-9d35-713b4d47f185	t	EXCELLENT	EXCELLENT	f
f5e9f328-67fa-4f43-8680-4d0544dd077b	b72524ad-9c84-445c-828d-5a9b04e3a701	\N	c4edaf55-10a8-4db1-b836-4e9848ae57e0	t	EXCELLENT	EXCELLENT	f
d5b735ee-1bc3-4dbb-9c94-f695cc45e9f2	b8e9dd6c-a10f-414e-8655-a7d18fb2fa29	\N	c4edaf55-10a8-4db1-b836-4e9848ae57e0	t	GOOD	GOOD	f
ae942b9e-37eb-4ebf-8d30-9ee682ce8263	dceed483-b8f9-4734-97c0-5555ea46617b	\N	c4edaf55-10a8-4db1-b836-4e9848ae57e0	t	FAIR	EXCELLENT	f
8d74339e-fa23-47eb-9214-9e4eda5d02b2	d49c17d9-50ee-4d08-8e32-ead9b47358d7	\N	df62dba2-f967-4c61-90fb-00756cc5f90a	t	GREAT	GOOD	f
133a15a8-e4bf-4d8e-9a28-3f402001fd0b	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	df62dba2-f967-4c61-90fb-00756cc5f90a	t	GREAT	GREAT	f
349f4c65-0e45-4370-a7fd-a48c3f66a1af	11cd88f0-bd26-47c9-bd44-e928cc73941b	\N	df62dba2-f967-4c61-90fb-00756cc5f90a	t	GOOD	GREAT	f
e3d3622e-d1fd-4adb-ba61-fe6f9217b86b	d49c17d9-50ee-4d08-8e32-ead9b47358d7	\N	0e15154f-12c5-4cb7-b246-c8d2ef7a7c68	t	GREAT	GOOD	f
be4db496-50dd-4d6f-b839-ce2dea20c18f	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	0e15154f-12c5-4cb7-b246-c8d2ef7a7c68	t	GREAT	FAIR	f
17a71b39-b31b-4fab-a193-550a4d45d16c	11cd88f0-bd26-47c9-bd44-e928cc73941b	\N	0e15154f-12c5-4cb7-b246-c8d2ef7a7c68	t	FAIR	GREAT	f
f0943063-19ce-425a-80d9-e5b0126feb68	d49c17d9-50ee-4d08-8e32-ead9b47358d7	\N	956c70f5-d282-47e0-85e2-c55d961d047e	t	GREAT	GREAT	f
ca9856db-8c5d-41b3-a6cc-0dde4b8e8397	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	956c70f5-d282-47e0-85e2-c55d961d047e	t	EXCELLENT	GREAT	f
f584f8ac-2067-4bff-8c32-696a0d24c544	11cd88f0-bd26-47c9-bd44-e928cc73941b	Kiroili\n	956c70f5-d282-47e0-85e2-c55d961d047e	t	GOOD	GOOD	f
b53ccaec-080e-451f-87b1-18a320edfea3	d49c17d9-50ee-4d08-8e32-ead9b47358d7	\N	b96ae584-33f9-4646-ac8f-1a05e8ebb5fa	t	FAIR	GREAT	f
7e5d2ff3-0e98-4054-be4e-6a1646b1a0d6	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	b96ae584-33f9-4646-ac8f-1a05e8ebb5fa	t	GOOD	GOOD	f
3cf02791-71c6-402c-9d1b-03681333c3d0	11cd88f0-bd26-47c9-bd44-e928cc73941b	\N	b96ae584-33f9-4646-ac8f-1a05e8ebb5fa	t	\N	FAIR	f
30f9c41d-c276-4da9-a5a2-cb609cd25324	d49c17d9-50ee-4d08-8e32-ead9b47358d7	\N	60fdfad9-1697-4a29-9cea-8ae57a51c245	t	GOOD	EXCELLENT	f
a592c05b-cdd6-4ce6-8fdd-a3e8e85116b3	5a026b03-52f6-4cb1-b282-f7ac2ea21048		60fdfad9-1697-4a29-9cea-8ae57a51c245	t	EXCELLENT	FAIR	f
5b39daed-0d92-4dd6-9201-e5ccfdce1475	11cd88f0-bd26-47c9-bd44-e928cc73941b	\N	60fdfad9-1697-4a29-9cea-8ae57a51c245	t	GOOD	GOOD	f
2c5a4a75-685e-4dfc-a116-5cea0ce12f63	67ea0653-c9ce-4392-aac0-7ef8f7c5ca26	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	GREAT	GOOD	f
906de0fe-2750-4776-a503-ebd68a41a9f8	63ac40cf-5435-4847-ab5e-9aa7f87be4c8	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	GREAT	GOOD	f
2b1f575f-1ce9-4729-b4c3-c97b761ea267	d11bfb03-737b-4674-885e-8106e7fcb822	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	FAIR	GREAT	f
6fc28a0e-7de9-4ae0-8b6d-9a9d66b4de8e	8f91dadf-8cd4-49d2-8bbd-19f21997ccfd	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	EXCELLENT	GREAT	f
905ba971-e23a-4448-a99a-8f88fad99d5c	eb679a62-4942-4687-ae5e-41c051705198	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	GOOD	GREAT	f
196438d7-04be-4afa-bb22-f6307dcbc674	fbfc259b-92b8-473a-be4c-af41872eb4ed	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	FAIR	FAIR	f
dfafa2dc-2a1b-4aee-b78a-3c57e9847579	be981090-64ab-412b-b619-781d00ba30eb	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	FAIR	GOOD	f
bc382b8b-7f07-4ee5-94b4-0742050df2fa	caa864dc-2238-45c3-a014-7dae91be7891	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	GOOD	FAIR	f
a8d387fb-2746-41dd-8775-666e5daad084	777a6529-5d2d-4037-a8d9-49721e37b6f7	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	GREAT	GREAT	f
941963d3-ea49-472c-a5b3-0ed5c5917c1e	f695e8be-7103-4c28-a0ac-6f8a67cc44ad	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	EXCELLENT	EXCELLENT	f
03961861-692d-4160-b8ea-f42eb0cfaab0	180c7590-34fd-403c-9496-a1d8db4d7dba	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	GREAT	GREAT	f
7a4dd9eb-18a5-4c8b-81e5-00a1e48d6e1b	d52a0745-d5ce-46c3-89f1-2a54007e7bde	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	FAIR	GREAT	f
9224faa9-37e8-4e60-854f-718c98c51382	a68027c8-a6bd-4d50-90cc-337a7a4ce42f	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	EXCELLENT	GREAT	f
1f544ad3-330b-4973-9872-03a8d7c2140b	7fb42188-30c7-4fe1-b71e-b34420d9fec1	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	EXCELLENT	GREAT	f
5bf43f1a-2fbb-4d39-9346-53b7687048de	06e78983-176e-4899-a198-238f9bdcd608	\N	c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	t	GOOD	GOOD	f
6b2c843a-aebf-4859-81e4-f9795e99dc6f	67ea0653-c9ce-4392-aac0-7ef8f7c5ca26	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	t	EXCELLENT	EXCELLENT	f
ff55c39f-5762-492a-aa5d-98356f0d5dad	63ac40cf-5435-4847-ab5e-9aa7f87be4c8	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	t	GOOD	GOOD	f
a63e2bca-82bd-463c-b826-4c6c61cab7cd	d11bfb03-737b-4674-885e-8106e7fcb822	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	t	GREAT	GOOD	f
d73feadc-bb32-4136-a9f1-4667c506503d	8f91dadf-8cd4-49d2-8bbd-19f21997ccfd	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	t	FAIR	GOOD	f
bf0d4427-f440-4b61-a5c3-a8ee00ab13e6	eb679a62-4942-4687-ae5e-41c051705198	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	f	GREAT	EXCELLENT	f
9ef9d067-fc8c-4388-9a68-1529e27afe67	fbfc259b-92b8-473a-be4c-af41872eb4ed	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	t	GREAT	GOOD	f
2d17314c-933a-4723-baaf-08387a3991ae	be981090-64ab-412b-b619-781d00ba30eb	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	t	GOOD	GREAT	f
ac2c5f0f-5b4f-4209-87d3-a0402222ed45	caa864dc-2238-45c3-a014-7dae91be7891	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	t	EXCELLENT	EXCELLENT	f
0ad68b36-9973-4896-af88-6d8740809b99	777a6529-5d2d-4037-a8d9-49721e37b6f7	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	t	GREAT	GOOD	f
abeed5a3-6756-4728-b558-552c4173a5ac	f695e8be-7103-4c28-a0ac-6f8a67cc44ad	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	f	FAIR	GOOD	f
e28784f2-c28f-47f8-a202-33e4ee79843d	180c7590-34fd-403c-9496-a1d8db4d7dba	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	t	GREAT	GOOD	f
4642a226-048e-4fb3-9721-790be6fe284b	d52a0745-d5ce-46c3-89f1-2a54007e7bde	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	t	EXCELLENT	FAIR	f
305c27b4-0e31-461d-95f4-9d26f3fe69e4	a68027c8-a6bd-4d50-90cc-337a7a4ce42f	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	t	GREAT	GOOD	f
89e589cb-cdd4-4613-bab6-fd6d9fe9afee	7fb42188-30c7-4fe1-b71e-b34420d9fec1	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	t	EXCELLENT	GREAT	f
02e72f3a-7da6-4c57-8fa0-3aebafac9a66	06e78983-176e-4899-a198-238f9bdcd608	\N	2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	t	GOOD	GREAT	f
6fd89b1b-954d-4ece-95ef-7a41d71cbe06	67ea0653-c9ce-4392-aac0-7ef8f7c5ca26	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	GREAT	GOOD	f
6bf2868c-10c8-4bf6-b788-ea9d02886acd	63ac40cf-5435-4847-ab5e-9aa7f87be4c8	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	GREAT	GOOD	f
523a4394-de32-4d02-b128-8a52ffbd5514	d11bfb03-737b-4674-885e-8106e7fcb822	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	GREAT	EXCELLENT	f
2c6aa871-dbed-4821-bc00-c48a3deb83bf	8f91dadf-8cd4-49d2-8bbd-19f21997ccfd	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	EXCELLENT	GREAT	f
3cfa1ccf-4dd6-4606-ac33-5384c27127c2	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	1743ed58-645f-41e4-8f80-22cd286f5cbb	t	EXCELLENT	EXCELLENT	f
a3389471-1f60-4db3-a757-c5675307740e	eb679a62-4942-4687-ae5e-41c051705198	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	GREAT	GREAT	f
84c02203-ea82-4bdb-8f63-504722eef9f2	fbfc259b-92b8-473a-be4c-af41872eb4ed	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	GREAT	GREAT	f
2d506b66-21cc-4e30-a8b4-e3b7ce6bf412	be981090-64ab-412b-b619-781d00ba30eb	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	GREAT	GOOD	f
4ca4a52d-f81b-4c97-9b2c-c0e3d32832f4	caa864dc-2238-45c3-a014-7dae91be7891	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	GOOD	GREAT	f
fdc01395-0b76-4cfb-a7ec-d22f6f51476c	777a6529-5d2d-4037-a8d9-49721e37b6f7	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	EXCELLENT	GOOD	f
ebda1d8b-77ab-4562-a85c-6ab48db14ed6	f695e8be-7103-4c28-a0ac-6f8a67cc44ad	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	EXCELLENT	GREAT	f
975e21e5-ea6f-48d8-a90a-4126c5b92cc2	180c7590-34fd-403c-9496-a1d8db4d7dba	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	GOOD	GOOD	f
98a6716c-a949-405c-baa6-0bd46fd1cc96	d52a0745-d5ce-46c3-89f1-2a54007e7bde	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	GREAT	FAIR	f
9a76b597-b1a3-4b63-9f06-bd751cc5a6bb	a68027c8-a6bd-4d50-90cc-337a7a4ce42f	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	EXCELLENT	EXCELLENT	f
62ebb089-27b0-4a5c-bbb3-2dd1cbb9c351	7fb42188-30c7-4fe1-b71e-b34420d9fec1	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	GREAT	GOOD	f
70784079-12e5-44c5-aec2-6e64f2253f70	06e78983-176e-4899-a198-238f9bdcd608	\N	b97ba445-01a2-4e2e-815e-1111ab082751	t	EXCELLENT	GOOD	f
e27744a7-0345-467f-bab5-11277ad4efe0	82b20571-c15e-49d9-902a-b57316fad8c2	\N	02218fe1-be24-4558-ad74-40f94600a19c	t	GREAT	GOOD	f
cdfdc851-2085-47ce-93db-6e0be7675320	84fbffad-8a66-46a0-a308-6b186a11875e	\N	02218fe1-be24-4558-ad74-40f94600a19c	t	EXCELLENT	GOOD	f
41dac2de-c4fd-47e4-846c-ed7f3fb26cd3	b166c4db-80d0-410a-b948-9634e7c68efd	\N	02218fe1-be24-4558-ad74-40f94600a19c	t	FAIR	GOOD	f
c425fa90-495e-4fcd-a2b0-67b223aad1c2	77dee450-240b-4563-842a-b619aea8e612	\N	02218fe1-be24-4558-ad74-40f94600a19c	t	GOOD	GOOD	f
ae0b15bc-67e3-4021-b34f-20bafbd97d66	82b20571-c15e-49d9-902a-b57316fad8c2	\N	22773d7e-a7fe-4885-8ffd-890d8079d388	t	EXCELLENT	GREAT	f
e588bd98-0af0-4b0a-aaf2-af356f4a7051	84fbffad-8a66-46a0-a308-6b186a11875e	\N	22773d7e-a7fe-4885-8ffd-890d8079d388	t	GREAT	GREAT	f
ccd13e26-5b13-4b93-b87c-4c3730cb360e	b166c4db-80d0-410a-b948-9634e7c68efd	\N	22773d7e-a7fe-4885-8ffd-890d8079d388	t	GREAT	FAIR	f
385fe89f-ee9b-474c-814d-e6ef2a03133f	77dee450-240b-4563-842a-b619aea8e612	\N	22773d7e-a7fe-4885-8ffd-890d8079d388	t	GOOD	GREAT	f
e7c06e54-4642-450a-8f43-869a04c7ea36	82b20571-c15e-49d9-902a-b57316fad8c2	\N	c6bb8352-2477-4706-9e0e-6f924db4f259	t	GOOD	EXCELLENT	f
d752a181-5629-4ea2-be1c-06b550762d1f	84fbffad-8a66-46a0-a308-6b186a11875e	\N	c6bb8352-2477-4706-9e0e-6f924db4f259	t	FAIR	GREAT	f
9e207ea1-b230-46f6-bc4e-5ea1a7790884	b166c4db-80d0-410a-b948-9634e7c68efd	\N	c6bb8352-2477-4706-9e0e-6f924db4f259	t	GREAT	GREAT	f
a15d05ba-ccd0-4517-b3e1-4633f59123b6	77dee450-240b-4563-842a-b619aea8e612	\N	c6bb8352-2477-4706-9e0e-6f924db4f259	t	EXCELLENT	EXCELLENT	f
3d601df1-4d93-453f-bb57-1bf53fb0e5bd	82b20571-c15e-49d9-902a-b57316fad8c2	\N	924867f8-b4bc-4c57-a3dd-6598b68755ba	t	GREAT	GOOD	f
c22cc2f0-9224-4117-9535-b94692017d58	84fbffad-8a66-46a0-a308-6b186a11875e	\N	924867f8-b4bc-4c57-a3dd-6598b68755ba	t	GOOD	GREAT	f
840f0fd5-5429-44cc-9758-7a3b66c3671b	b166c4db-80d0-410a-b948-9634e7c68efd	\N	924867f8-b4bc-4c57-a3dd-6598b68755ba	t	FAIR	GOOD	f
a8c89dc4-486a-48ab-bbf5-b26462a07f33	77dee450-240b-4563-842a-b619aea8e612	\N	924867f8-b4bc-4c57-a3dd-6598b68755ba	t	EXCELLENT	GREAT	f
8e6d80d0-7f93-4874-9202-40b0af883020	82b20571-c15e-49d9-902a-b57316fad8c2	\N	b8174720-8b37-455f-bed9-4a2c1046167f	t	GOOD	EXCELLENT	f
fa89b853-1a7b-4a67-9db4-90d47cd7628d	84fbffad-8a66-46a0-a308-6b186a11875e	\N	b8174720-8b37-455f-bed9-4a2c1046167f	t	GOOD	GREAT	f
0942eb4d-2755-43fe-92a5-768d264f963d	b166c4db-80d0-410a-b948-9634e7c68efd	\N	b8174720-8b37-455f-bed9-4a2c1046167f	t	GREAT	GREAT	f
715f5994-933b-4c3d-8618-3e443d2f781c	77dee450-240b-4563-842a-b619aea8e612	\N	b8174720-8b37-455f-bed9-4a2c1046167f	t	GREAT	GREAT	f
d37c9738-d1b3-418e-9c6e-6d9865bf0f6d	82b20571-c15e-49d9-902a-b57316fad8c2	\N	f6c0dc5c-cfda-4cca-ae5b-de06db69041a	t	FAIR	GOOD	f
f364c1d4-1e2f-44c5-8f20-e90a3adad0e6	84fbffad-8a66-46a0-a308-6b186a11875e	\N	f6c0dc5c-cfda-4cca-ae5b-de06db69041a	t	GOOD	GOOD	f
f913d016-c185-49a0-af8e-4f24a2a0ad80	b166c4db-80d0-410a-b948-9634e7c68efd	\N	f6c0dc5c-cfda-4cca-ae5b-de06db69041a	t	EXCELLENT	FAIR	f
234353b5-f5dd-4312-a846-65044c981460	77dee450-240b-4563-842a-b619aea8e612	\N	f6c0dc5c-cfda-4cca-ae5b-de06db69041a	t	GREAT	GREAT	f
bb19f666-b551-45fd-a112-e5299ba0cf34	ceccaf73-1e73-432c-9ad7-d2f9845b93ed	\N	79b19207-8297-4c1e-a382-285c8811bdb6	t	EXCELLENT	GREAT	f
644005bc-b902-4bdb-8c69-58ccfe33f121	c79cac18-a6e3-41bd-a6a2-8e3b76631467	\N	79b19207-8297-4c1e-a382-285c8811bdb6	t	GOOD	GREAT	f
e94cfea5-acbc-45a7-bd73-dda9fb4d41c3	89930c8d-cdcb-484e-927d-688bbd096478	\N	79b19207-8297-4c1e-a382-285c8811bdb6	t	GOOD	EXCELLENT	f
4b54b8d8-9f36-4d9d-ae09-ae88f4effcfe	ceccaf73-1e73-432c-9ad7-d2f9845b93ed	\N	3ab770f6-2964-489c-9a99-b003a97c83f8	t	EXCELLENT	GOOD	f
5d46bb46-f066-419a-8d2b-da291da192a2	c79cac18-a6e3-41bd-a6a2-8e3b76631467	\N	3ab770f6-2964-489c-9a99-b003a97c83f8	t	GOOD	GREAT	f
d675bdc9-8689-4e92-89e8-551a223aec81	89930c8d-cdcb-484e-927d-688bbd096478	\N	3ab770f6-2964-489c-9a99-b003a97c83f8	t	GOOD	EXCELLENT	f
ed6f7dbf-ee99-46eb-bf7a-251320ab76a3	ceccaf73-1e73-432c-9ad7-d2f9845b93ed	\N	e2296b24-8a05-4273-afd9-d8fcdc595b56	t	GREAT	FAIR	f
2be24664-c05b-4229-8488-ba59f3b5d4b6	c79cac18-a6e3-41bd-a6a2-8e3b76631467	\N	e2296b24-8a05-4273-afd9-d8fcdc595b56	t	FAIR	GOOD	f
7d6b7cbf-95bd-411a-9dcc-359124ab93a9	89930c8d-cdcb-484e-927d-688bbd096478	\N	e2296b24-8a05-4273-afd9-d8fcdc595b56	t	GOOD	GREAT	f
880019b6-ed89-4e4c-aeeb-dc5809a921c5	ceccaf73-1e73-432c-9ad7-d2f9845b93ed	\N	687f2732-b37c-4fd2-bfbc-debe495a8230	t	GREAT	FAIR	f
159d9034-abc0-4679-9f7f-83aa950b43db	c79cac18-a6e3-41bd-a6a2-8e3b76631467	\N	687f2732-b37c-4fd2-bfbc-debe495a8230	t	FAIR	GREAT	f
f4d8d4a5-2a15-4793-9d40-5ef60a837bbe	89930c8d-cdcb-484e-927d-688bbd096478	\N	687f2732-b37c-4fd2-bfbc-debe495a8230	t	FAIR	FAIR	f
3bff0f5a-e8ac-4e76-9941-272a800c8a9b	ceccaf73-1e73-432c-9ad7-d2f9845b93ed	\N	c10b5c97-268d-4a40-97ff-48524d92f069	t	GREAT	GOOD	f
0d6d4a01-1eef-49f4-8126-1be8f402298b	c79cac18-a6e3-41bd-a6a2-8e3b76631467	\N	c10b5c97-268d-4a40-97ff-48524d92f069	t	GREAT	EXCELLENT	f
1c5ec441-bf9a-465e-a000-4c20ad175544	89930c8d-cdcb-484e-927d-688bbd096478	\N	c10b5c97-268d-4a40-97ff-48524d92f069	t	GREAT	GREAT	f
c0369713-6f49-4b4e-abf4-90fa3a3975aa	ceccaf73-1e73-432c-9ad7-d2f9845b93ed	\N	b176b1cb-7450-4149-b1cf-2c55ee107d29	t	GREAT	GOOD	f
5936ceff-2eec-4f60-8bf1-f3f165c3acc3	c79cac18-a6e3-41bd-a6a2-8e3b76631467	\N	b176b1cb-7450-4149-b1cf-2c55ee107d29	t	GOOD	GOOD	f
8381dcc3-f1f1-4c22-9300-ab4e42df2109	89930c8d-cdcb-484e-927d-688bbd096478	\N	b176b1cb-7450-4149-b1cf-2c55ee107d29	t	GOOD	EXCELLENT	f
e27f962b-a0d4-4353-bc8f-3c6076818d75	ceccaf73-1e73-432c-9ad7-d2f9845b93ed	\N	4e401f99-6851-4842-9e0c-66c5683ab8f1	t	GOOD	GOOD	f
f8d82a17-a85c-401e-b33b-e101ff8c4981	c79cac18-a6e3-41bd-a6a2-8e3b76631467	\N	4e401f99-6851-4842-9e0c-66c5683ab8f1	t	GREAT	EXCELLENT	f
6ddae095-3051-43f3-9be7-9c5dff258ea6	89930c8d-cdcb-484e-927d-688bbd096478	\N	4e401f99-6851-4842-9e0c-66c5683ab8f1	t	GREAT	GREAT	f
b96fb49c-78f6-4811-a3e7-e90b30ce95ca	ceccaf73-1e73-432c-9ad7-d2f9845b93ed	\N	10cf0d5c-3bf8-4ca7-beb4-2eac074985fb	t	GREAT	GREAT	f
16f0c64d-67db-4e62-a28d-c4468c2bb74b	c79cac18-a6e3-41bd-a6a2-8e3b76631467	\N	10cf0d5c-3bf8-4ca7-beb4-2eac074985fb	t	GOOD	EXCELLENT	f
8c119b20-debf-4947-82e4-ca8150e096ed	89930c8d-cdcb-484e-927d-688bbd096478	\N	10cf0d5c-3bf8-4ca7-beb4-2eac074985fb	t	GREAT	EXCELLENT	f
6f947ff7-0bae-46ca-8b2c-2ffbd69788c4	ceccaf73-1e73-432c-9ad7-d2f9845b93ed	\N	701d0096-a5e9-480d-a09f-02533f719c99	t	EXCELLENT	EXCELLENT	f
692eec5c-98c2-456b-9534-2a2cc519bdf5	c79cac18-a6e3-41bd-a6a2-8e3b76631467	\N	701d0096-a5e9-480d-a09f-02533f719c99	t	GREAT	EXCELLENT	f
70fd47a8-478b-4c23-bf1d-b62e788fe7ef	89930c8d-cdcb-484e-927d-688bbd096478	\N	701d0096-a5e9-480d-a09f-02533f719c99	t	GOOD	EXCELLENT	f
49dd72ca-13c0-4a3c-ae27-e3a3c0ddabdf	ceccaf73-1e73-432c-9ad7-d2f9845b93ed	\N	a183f57e-e4bd-42f4-8145-0574b4af332d	t	GREAT	EXCELLENT	f
d9096454-3343-49ef-826b-af24a21fcb3d	c79cac18-a6e3-41bd-a6a2-8e3b76631467	\N	a183f57e-e4bd-42f4-8145-0574b4af332d	t	GOOD	EXCELLENT	f
91215dcd-b841-4b5e-a22a-89bcebe24605	89930c8d-cdcb-484e-927d-688bbd096478	\N	a183f57e-e4bd-42f4-8145-0574b4af332d	t	GREAT	EXCELLENT	f
672ff6c5-69a9-4acc-824c-d3a714dca756	d49c17d9-50ee-4d08-8e32-ead9b47358d7	\N	46decadd-ce65-41e6-be12-83de28707361	t	FAIR	GOOD	f
3c04253a-8c99-40c1-a34f-3f347f9ff8ca	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	46decadd-ce65-41e6-be12-83de28707361	t	GREAT	GOOD	f
04733e25-a1d5-43c4-9d67-5034102af453	11cd88f0-bd26-47c9-bd44-e928cc73941b	\N	46decadd-ce65-41e6-be12-83de28707361	t	GREAT	EXCELLENT	f
26059035-c8dd-438c-b835-ccb64ea1e04a	d49c17d9-50ee-4d08-8e32-ead9b47358d7	 Liisa se pelasi niin hienosti jalkapalloa	1743ed58-645f-41e4-8f80-22cd286f5cbb	t	GREAT	GREAT	f
1e8a433f-72ae-4ff3-b072-976675ec145a	11cd88f0-bd26-47c9-bd44-e928cc73941b	\N	1743ed58-645f-41e4-8f80-22cd286f5cbb	t	GREAT	EXCELLENT	f
cb009444-731d-4436-b8ac-b6a968045ecf	7b49606e-202a-408a-acd7-51bebabf18e0	\N	9cd49f96-06d9-4b21-b309-85179a146fe8	t	\N	\N	f
8b419307-9de6-4033-9821-9a226ea5b9bb	83ed3567-3b8b-444c-8f44-934e9d6c15fb	\N	9cd49f96-06d9-4b21-b309-85179a146fe8	t	\N	\N	f
cc2b7b4c-5585-4ce8-9957-fbc7c4930259	8117cf8b-a0ff-49e1-a2fa-4a18a2a1f03a	\N	5bd573d2-8627-4e82-ab62-512d93e4c87c	t	GREAT	GOOD	f
87896fce-e331-44d7-be58-1abeac89386d	860f1644-7f92-4a08-8fa7-8b345732ccc4	\N	5bd573d2-8627-4e82-ab62-512d93e4c87c	t	GREAT	GREAT	f
e4d9da4c-2e82-457a-9075-8d66df3e74dc	79721f61-835e-44ab-8769-f79fe3c52ff1	\N	5bd573d2-8627-4e82-ab62-512d93e4c87c	t	EXCELLENT	GREAT	f
c2e09ce9-d7ac-4daa-9b50-da307e9d6a6d	1354e6ca-8716-440b-9012-24b76d7783c2	\N	6f95bb2b-dd9b-4321-adca-f89da6895b2a	t	GREAT	GREAT	f
89eb4db1-4547-4419-8b6c-e2790f16ec09	d49c17d9-50ee-4d08-8e32-ead9b47358d7	\N	6f95bb2b-dd9b-4321-adca-f89da6895b2a	t	GOOD	GREAT	f
8ae3bb3d-5549-45ea-8a2d-db915d22043f	5a026b03-52f6-4cb1-b282-f7ac2ea21048	\N	6f95bb2b-dd9b-4321-adca-f89da6895b2a	t	FAIR	GOOD	f
293b4510-a4de-4072-939d-dda9c21ddbd4	11cd88f0-bd26-47c9-bd44-e928cc73941b	\N	6f95bb2b-dd9b-4321-adca-f89da6895b2a	t	GOOD	GREAT	f
18f6a38d-70f2-4827-b9f6-f653e68039d0	03397f36-f253-476a-a333-556ae179dbda	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	GREAT	GREAT	f
602a4c25-96b0-4670-9274-8036deab1eff	e0c8876f-57f1-43dc-9950-3851d82380fe	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	GOOD	GOOD	f
7d337acc-1be7-4794-bda4-1ecda5cf55c0	4e00db97-fd93-416f-a349-655a240056ae	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	GOOD	GREAT	f
cbcb4cd8-2057-409c-be88-f22c82b28e4d	28e533c4-faf3-4e9f-ac97-ea948c1b019a	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	GREAT	GREAT	f
c0ac0c54-a35d-4203-9ff8-71bec634758f	775a7c76-dc4a-4849-baf1-d7f9080eaf89	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	FAIR	GOOD	f
536b318f-a01d-4825-9592-733404fc1bed	02ea3a66-aa4a-420a-9334-f2b0941c564b	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	GREAT	GREAT	f
a4b45734-299c-4a4b-a12f-416b948ca384	1dd2a92e-8754-4265-884f-db0a12b6a4c8	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	GOOD	GREAT	f
97301a58-b6de-42da-b95c-02dccdae7e0c	5e5f9c60-1c5e-43f6-97ff-6e6144ecf55f	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	FAIR	FAIR	f
9aa3ffcb-978f-48f3-af9d-3631ce815512	b03cc979-7da3-4d75-b187-943264397b04	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	f	\N	\N	f
78651505-c190-49e2-a924-fb7b284213e1	db1510ed-3bb6-4856-8ea9-5012eeb68192	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	FAIR	GOOD	f
53da01fa-ef8c-492c-b603-976265bc1eef	cfea9e73-0c9f-433f-909a-a088c3931b8f	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	FAIR	GREAT	f
5597818f-7940-453e-a1de-728bbd1c7042	ffb872b2-2bb5-4267-8e92-0514977ba44b	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	GREAT	GREAT	f
a4efd53a-4b12-4a32-aac6-04df8afc06c7	e34d25fc-b0e2-48f1-8d86-77ce7464822e	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	GREAT	GREAT	f
50e21780-1063-4af1-b3db-8d511c4ed236	05795f8f-d6de-4ec8-88fc-0df98df77292	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	FAIR	POOR	f
6873dbc6-7b1e-42fe-845e-2caf4fc1e8d1	de0b5abf-b8c5-4046-aaf7-f9bffc544ca4	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	GOOD	GREAT	f
53f65a64-e703-47e1-85d5-f2744ddd88ae	0eba0b59-1564-4d93-a65c-d5aa57c2ba93	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	GOOD	GREAT	f
7ed54959-d71c-42cf-b5f9-2ea1e933a2e0	1aa8b618-de8a-4a56-b1ef-33ea240f027b	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	GOOD	GREAT	f
8bf679eb-c7e8-4301-8072-6d8ea8b49422	dccdded4-f3c3-4949-937a-cfd65fae056d	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	f	\N	\N	f
a5d24192-ddd7-4c76-9865-fc84e9ec8f3b	e7eb8c8a-033d-416a-848a-6da0d65cbf8e	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	f	\N	\N	f
4f75b5f2-24fd-46a7-b706-413b9ffc523f	241042e2-7fa6-413a-a501-ab6c28dd86e7	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	f	\N	\N	f
b557321d-d88a-433d-b41a-ad292d22878a	16530cbd-5612-4a8c-920c-9744e32be7bc	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	f	\N	\N	f
6cf81e66-1dd0-4597-91e2-ccfff630e1a5	f18a8f1a-a17a-49da-8cc1-3603b4c21dc8	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	POOR	POOR	f
e26f5541-ab7a-4497-a5f9-bd776a9bf6cb	8cb49f42-d3d0-4a6a-9ac1-9569aed4991f	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	GREAT	GREAT	f
1352be86-62af-4a91-9d2b-8a8b87be863d	8a429230-9011-476a-9f6f-15494ecf57f2	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	FAIR	POOR	f
a58b5faf-df98-4397-bdf6-fb31ed2a5720	4d9888c7-3be7-4fec-a5d7-07759cdff766	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	GOOD	GOOD	f
bbc8f2bf-da75-4839-9c38-9f13cafba03c	436f9966-c204-4794-89fa-e5e1a30b6247	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	GREAT	GOOD	f
7e0a7077-ed99-4265-85a2-d898a42be813	5c10a0b2-145a-4701-a64c-80a9369890a3	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	FAIR	FAIR	f
9717b3fe-515a-43fb-95cc-aa3626d4c94b	8c057200-e725-4e08-b93c-88bd891fe862	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	GOOD	GOOD	f
e520bf21-55b7-4123-ba4c-9f26d20d8ac7	ad4248b3-989a-4794-844e-af4cb598a1e7	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	f	\N	\N	f
5f2cbe78-5387-4a0f-b3de-ccb31542fb87	61780abd-03a9-4ce4-89cc-059b5a2f5177	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	GREAT	GOOD	f
958f06d9-f6f7-4c4c-a9e8-d2ed2a22b864	92eecb4d-b8c2-43ce-ac29-eb7a46566311	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	GREAT	GOOD	f
e5c1f907-117c-43d8-96b0-df7b1af03ae8	e17db94c-c058-4163-b1df-3824f2f732b8	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	FAIR	GOOD	f
cb314a1c-b8e5-40ac-896f-d21654c65b6b	139ee728-7bd5-4ed5-b88e-65e455770b9f	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	GREAT	GREAT	f
054610f5-f586-426f-8319-2fad89c4eaa0	28bf177a-d273-4b22-963c-4206fcffa9cf	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	GREAT	GOOD	f
5757ef49-18d9-4eab-91f2-b2d055ada00f	48f6a291-18c4-4349-8578-e9d40a016f99	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	GREAT	GOOD	f
30488455-5f13-4101-a325-986b52a152dc	d1c1ad1a-62d0-4d6b-bf48-2dead02ed1f6	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	GREAT	GOOD	f
5587bd33-df97-4309-ae67-6c68a462612c	e6537a2f-233d-4b11-8f1b-5a0814a675c0	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	GOOD	GOOD	f
9d588864-2a7e-416d-a023-300b133a2427	6f8a2928-32c2-4e60-9c99-b8073fcd9d35	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	GOOD	GOOD	f
36dbed5b-c829-4d1f-ad69-5659f2ce8279	1a420969-4c65-4a34-bdc2-80e13ed51f0b	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	FAIR	GOOD	f
1c925499-a2e7-4955-9372-51d18ecd27bb	6e24ea61-532f-452b-865d-b67df86c48c4	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	f	\N	\N	f
e1aaf7fb-a5a7-47f4-be8f-e97469222d29	c08c69f9-ef26-4f6a-95ee-455d176dfa61	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	GOOD	GOOD	f
46eef231-504d-49ad-aad7-ed7d1949397f	3b6d04be-cd10-4e54-b5aa-28a67e8e2186	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	GOOD	GOOD	f
9619d268-b754-4e59-8aec-8fa0da4d7977	ec51a182-bf8d-436e-8704-b2d5cd897604	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	f	\N	\N	f
e1f2e224-f8d1-41b7-9374-b0ce7775c94c	a8df8354-0125-404f-a1d8-5584462a5b82	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	GREAT	GOOD	f
ab8edaba-823d-4a91-9ef7-69f9f93bc3f5	c80a1da2-c657-4a2d-8ee3-55eaa6a3b1f9	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	FAIR	GOOD	f
5468c70e-b6d4-434a-b206-b1f4d672d498	74744cbc-e78c-48df-b758-713f9a81751e	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	GOOD	GOOD	f
e7030269-11fe-4175-9373-dd964ea4fa65	634c3f80-8b4f-4c38-ac4e-937418ec9e8d	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	f	\N	\N	f
7a1d7349-7c3a-4e05-8ce9-ca429e1d643e	5ce6b918-bcba-4712-98c1-d891eec91168	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	GOOD	GREAT	f
03dc4563-3a01-416c-b499-76b77e7b6086	5e0e74f1-308a-4c20-bf9a-5011dff427d1		032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	GREAT	FAIR	f
f43b75dd-a3f9-49d0-b350-2043385a28e3	a2216f2c-6ade-4f5a-a8c5-515f09bd4b08	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	GREAT	GOOD	f
fc6bf4eb-1887-4bbd-a956-399412b9c6e4	b0aa13eb-dd72-4d41-9158-63ed22b2f65b	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	EXCELLENT	GOOD	f
65261044-209b-49ff-8319-841690cb8ad9	904493af-2f99-494c-8b42-5ebe4c1ae1b6	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	GREAT	GREAT	f
6e80a5a0-3f13-449a-afcf-397338c6acbc	db8905a7-084f-4d92-af60-cf29824dabe7	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	GOOD	FAIR	f
852424c4-33dd-46de-b7ea-cf480a886c97	fa71c8f8-45c8-4a24-b0fb-6a0ecd67af3c	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	FAIR	FAIR	f
6af71b31-56b1-4d87-94c9-7edde5812df8	5f877b5d-eaeb-404c-b3cc-d51a467fa428	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	GOOD	GREAT	f
bd8e3d23-98f4-475e-a867-4ffca3964bd8	fcabdea5-1224-442b-8142-62be862508e3	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	EXCELLENT	GOOD	f
1503807f-6d67-4f3d-a905-1ef56853f5f7	b580b35d-10c3-4ce3-9f87-37ce3a436eaf	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	GOOD	GOOD	f
5b21b6ed-6f1f-4417-847f-080b937bf6df	f034aa91-48ff-496e-b25b-9c81eaaaa3e3	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	GOOD	FAIR	f
319470d0-f21d-4536-8df9-5c1fa5ca6cc0	bf09f310-3700-49db-b3f3-384cd041e6f2	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	f	\N	\N	f
63633bac-2a1b-4a4e-a91f-2cf2a8d66794	eb6a2d6e-33a5-4ad2-95ea-a39741e9b905	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	f	\N	\N	f
672efaf6-f8f1-4fd4-b4ec-7eaa3a7a6a3f	7df2a50b-b064-49a7-a5d5-747b117f107c	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	EXCELLENT	GREAT	f
dba51af8-788e-4e64-a5d7-c5fe4d50961b	fe5ede8f-8290-4b69-b575-75aeaab46f2f	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	f	\N	\N	f
210bec63-2f2b-4b26-a0f3-6e51eb8e101f	50d7ab1f-3cf2-4e10-9286-36df63a6e81b	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	GREAT	GREAT	f
d535fd23-6d31-4520-a899-a25570f8b863	7756327f-59aa-40f9-aa95-88889e4ea759	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	GOOD	FAIR	f
2deabf5b-f36f-4a50-8da6-1a0846cb4267	8117cf8b-a0ff-49e1-a2fa-4a18a2a1f03a	\N	fbebf81c-ce89-4b93-80b5-ea5cdc471125	t	GREAT	GREAT	f
841904c7-1457-484f-a90f-84e29e06ce73	860f1644-7f92-4a08-8fa7-8b345732ccc4	\N	fbebf81c-ce89-4b93-80b5-ea5cdc471125	t	GOOD	EXCELLENT	f
53f9e9a6-919c-44e0-bb87-8e72ab29b07b	79721f61-835e-44ab-8769-f79fe3c52ff1	\N	fbebf81c-ce89-4b93-80b5-ea5cdc471125	t	EXCELLENT	GREAT	f
27a6cd97-49ed-41e2-bb45-817a9cdfb43e	b3bd6d2e-1bf6-4f56-a561-806a2d11bd97	\N	689bf99d-ead3-4bba-a96d-dd3cd99336ad	t	GOOD	EXCELLENT	f
aee8b6bb-a081-4a6b-92c2-0ef0f6dc1547	c5a69235-e2da-483a-b4d4-898fe3bd4c75	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	f	\N	\N	f
d9e138bd-e974-4e59-840c-d94963d6c8b5	d0c101ca-4d6b-43c2-beb1-a4680f44dd5a	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	FAIR	GREAT	f
9b4e3f0d-cff9-4724-8f28-5f65a7d5aca6	db6b1a3f-e485-4b8f-8a25-0a8e518a2026	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	FAIR	GOOD	f
8aa783d2-948a-44aa-82b7-c80ddd5f8990	7e447ce6-5569-47f0-9000-20ae93a68bd3	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GOOD	EXCELLENT	f
59d873be-88b6-4419-9857-a2b5b5da567b	95db6c22-a14c-4f47-b6c3-5ddffdbd933f	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GREAT	FAIR	f
85d3970a-aa1f-488a-bb39-fbe0918421cc	0025a5a3-6947-4d23-b100-bcd5a58c6e09	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GOOD	FAIR	f
fb463eb1-90b1-445f-94dc-e6db6b8de64c	971b8500-6c50-4f89-ab1e-f5219ccdef93	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GREAT	FAIR	f
a9a2fbdd-2c89-4bb9-a28c-f787ae36b066	a3be9480-89da-4490-aad6-4507acd56e6c	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GOOD	GOOD	f
ae98edce-544a-4328-9452-abd31875cb74	c695adc1-a07a-4ebf-b99f-9714e4ab4bf7	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	f	\N	\N	f
26e27741-4663-4be8-9543-e88e9e0be5df	2abacf8c-b973-4678-9504-e30861fdcba5	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	FAIR	GOOD	f
cc483b48-6e81-4c32-9852-f88f00cacfdf	bdbdbd45-458b-41df-ba2f-ab5e4406bb26	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	FAIR	GOOD	f
ce8619fe-9f66-4bfd-9f36-e5ca180ac90a	e0562708-15b5-478a-8f5a-1863c55a6f38	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	f	\N	\N	f
2247bd15-2786-4e95-8f61-c891957066b2	8730fbfe-4cab-41db-8b7d-a750e3448184	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GOOD	FAIR	f
0a7440e7-a965-45be-928d-2bbe2ab1c491	52c3b46f-5204-40ad-9150-17b0a7077eed	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GOOD	FAIR	f
a383b2e8-73c7-414c-89cf-30bfaae52e20	0d894576-e308-4a66-a809-d8530eb5753e	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GOOD	GREAT	f
824e7b83-8d81-4b0f-8114-b6a67d50c0c4	e111c54d-9b2e-406b-aab4-e61fe921dbe2	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	FAIR	GOOD	f
a8b68856-75f3-4129-88eb-81a5c246bb3e	7ac64248-1e14-4e88-ab15-a9a552d3811c	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GREAT	GOOD	f
54faefe7-7a09-450d-b3b8-28d2d3aac0a0	f4df5072-2986-4859-a7cc-6d06a6fe21ad	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GREAT	FAIR	f
b410c387-7959-4d5f-9cbd-e220b90621a6	3cd7167d-e20f-4291-9e18-5241b854e116	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GOOD	GOOD	f
39fd659e-b4d5-4ab0-910b-67d489793568	1e7d2903-2e91-4fca-b77f-211821ad0b07	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GOOD	GOOD	f
733dbacc-04f5-4ab6-95e9-ea5134f34ddc	cd9d11c7-9b20-4243-b816-d3986f7e22ad	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GOOD	GOOD	f
5de32d0c-bb44-41dd-804d-001b76c68daf	5e4779f0-fad2-4f94-b350-e56b4c5f5471	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GREAT	GOOD	f
ff205714-a54c-4631-9efa-1d52c86a09e1	77793959-dc53-44d1-8cd5-ddbe3c4b25a4	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	GREAT	GOOD	f
\.


--
-- TOC entry 2612 (class 0 OID 32791)
-- Dependencies: 218
-- Data for Name: EvaluationCollection; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EvaluationCollection" (id, date, type, description, "environmentCode", "classYearId", "learningObjectiveCodes") FROM stdin;
954f425d-6746-4cf5-a30a-2efe89d1f997	2023-04-11 00:00:00		Sählyn pelailua sisällä salissa. Ensin harjoiteltiin pallon käsittelyä ja sitten pelattiin peliä. Peli oli 3 vs 3 ja pelattiin 2 x 10 minuuttia	LI_PALLO	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T3,T6,T8}
b30d61cb-25c3-46f2-841c-047642d0714c	2023-04-02 10:00:00		Retkeilyä metsässä. Kävelimme noin 10 kilometrin lenkin metsäpolkuja pitkin ja ihastelimme kaunista luontoa.	LI_LUONTO	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T2,T3,T4,T5,T6,T7,T8}
ce67c2e6-ee48-40cc-8d36-9c91f8558dd4	2023-04-01 16:00:00		Vesijumppaa uimahallissa. Tunnin aikana treenasimme erilaisia liikkeitä vedessä, jotka oli suunniteltu erityisesti kunnon kohottamiseen.	LI_VESI	34b47355-73a3-41ac-b8c3-3958b3602951	{T2,T3,T4,T5,T6,T7}
ddc664b7-696e-49df-8580-47badac74ad6	2023-04-06 18:00:00		Luontojooga ulkona puistossa. Jooga oli rentouttavaa ja samalla nautimme raikkaasta ulkoilmasta. Joogan kesto oli 60 minuuttia.	LI_LUONTO	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T2,T3,T4,T5,T6,T7,T8}
01e458e0-1e9e-4420-8145-0adfeccf2611	2023-04-10 14:00:00		Luonnonkauniilla polulla lenkkeilyä. Polku oli mäkinen, mutta maisemat olivat upeat. Lenkin kesto oli noin 45 minuuttia.	LI_LUONTO	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T2,T3,T4,T5,T6,T7,T8}
635a35ee-bce5-4780-ab79-8e915a808eec	2023-04-09 09:00:00		Tanssitunti tanssikoululla. Harjoittelimme uutta koreografiaa ja se oli haastavaa, mutta myös hauskaa. Tunnin kesto oli 60 minuuttia.	LI_TANSSI	34b47355-73a3-41ac-b8c3-3958b3602951	{T2,T6}
0c08a1fd-dbfb-40a7-b043-7d2625bf2236	2023-04-03 13:30:00		Pallopeliä koulun pihalla. Pelasimme jalkapalloa kavereiden kanssa. Peli oli tasainen ja lopulta päättyi 2-2.	LI_PALLO	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T3,T5,T7,T8}
22968ad6-b092-4551-90e3-a2dbfa3ea7b1	2023-04-04 19:00:00		Uintitreeniä uimahallissa.	LI_VESI	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T2,T3,T4,T5,T6,T7,T8}
4a0cde87-1f99-4958-82f9-22c0af3937f4	2023-04-08 16:30:00		Kuntosali treeniä. Treenasimme erityisesti keskivartalon lihaksia ja käytimme myös kuntopyöriä. Treenin kesto oli noin 90 minuuttia.	LI_KUNTO	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T2,T3,T5,T8}
b0fb1852-4b83-4299-9531-80bb0c913b74	2023-04-07 11:00:00		Pallopeliä hiekkakentällä. Pelasimme beach volleyn sijaan beach tennistä, joka oli hieman erilaista ja haastavaa. Peliaika oli 2 x 15 minuuttia.	LI_PALLO	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T3,T4,T8}
ebcfa57e-1bcc-4414-99a5-9339ddc320e2	2023-04-05 15:00:00		Perusvoimistelutreeniä voimistelusalilla. Treenasimme erilaisia liikkeitä ja hyppyjä. Treenin kesto oli 90 minuuttia.	LI_PERUS	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T2,T3,T4,T5,T6,T7,T8}
efe24343-b2ca-40e0-ae52-a28c82d286c2	2023-03-31 11:00:00		Peruskestävyystreeniä juoksuradalla. Juoksimme noin 5 kilometrin lenkin, joka sisälsi myös muutamia mäkiä.	LI_PERUS	34b47355-73a3-41ac-b8c3-3958b3602951	{T3,T5,T7,T8}
eee35041-667f-4142-9506-bffcba305ad8	2023-03-30 15:30:00		Tanssitunti tanssikoululla. Tällä kertaa harjoittelimme latinalaistansseja, kuten salsaa ja cha chaa. Tunnin kesto oli 60 minuuttia.	LI_TANSSI	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T3,T4,T5,T7}
97f8ec00-2d10-4609-8329-0d8db104819a	2023-03-29 09:30:00		Kuntoilua puistossa. Teimme erilaisia lihaskunto- ja venyttelyliikkeitä puiston penkeillä ja portailla.	LI_KUNTO	34b47355-73a3-41ac-b8c3-3958b3602951	{T2,T4,T7,T8}
9e26e178-432e-4125-b276-a7ad955916f4	2023-03-28 14:00:00		Pallopeliä salissa. Pelasimme sählyä ja ottelu oli tiukka. Peli päättyi lopulta 4-3.	LI_PALLO	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T4,T5,T8}
0d71d426-6012-4cf0-988f-5ac3328413e5	2023-03-27 17:00:00		Luontojoogaa rannalla. Joogasimme rannalla auringonlaskun aikaan ja tunnelma oli upea. Joogan kesto oli 60 minuuttia.	LI_LUONTO	34b47355-73a3-41ac-b8c3-3958b3602951	{}
5770c83f-70c0-4cf2-a931-73a1082c0b89	2023-03-26 12:00:00		Voimistelutreeniä salilla. Treenasimme erilaisia hyppyjä ja liikkeitä, jotka vaativat hyvää tasapainoa.	LI_VOIM	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T2,T4,T6,T7}
ab4df1d5-7402-484e-b1cb-65c18a196ac3	2023-03-25 16:30:00		Uintitreeniä avovesialtaassa. Uinti oli hieman haastavaa, sillä vesi oli vielä melko kylmää, mutta keli oli kaunis ja aurinkoinen.	LI_VESI	34b47355-73a3-41ac-b8c3-3958b3602951	{T4,T8}
c5e7922a-7308-4b78-b0dd-9a67f14b73c1	2023-03-24 19:00:00		Kuntosali treeniä. Treenasimme erityisesti ylävartalon lihaksia ja käytimme painoja ja kuntopyöriä.	LI_KUNTO	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T3,T5,T7,T8}
50018534-e995-4788-a885-816beda65c1a	2023-03-23 10:30:00		Pallopeliä ulkokentällä. Pelasimme tennistä kavereiden kanssa. Peli oli tasainen ja lopulta päättyi 6-4.	LI_PALLO	34b47355-73a3-41ac-b8c3-3958b3602951	{T3,T4,T5,T6,T7}
9c6555de-12e8-40a5-8f67-da827cde1fb7	2023-03-22 13:00:00		Retkeilyä kansallispuistossa. Kävelimme noin 15 kilometrin lenkin ja ihastelimme upeita maisemia.	LI_LUONTO	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T2,T5,T8}
3e52d3b7-7d7f-407f-b286-8997a0de8e3b	2023-07-27 00:00:00			LI_VESI	34b47355-73a3-41ac-b8c3-3958b3602951	{T3,T4,T2}
b86f4c45-6ed5-4376-b1c4-efbe5d7adce1	2023-07-27 00:00:00			LI_TALVI	7fc07f1e-01ff-4fe5-8496-25854a55a1a0	{T6,T7}
acd2d0d1-7e43-40a6-80c9-ee1e152eebf6	2023-07-27 00:00:00			LI_LUONTO	34b47355-73a3-41ac-b8c3-3958b3602951	{T8,T7,T6}
7b608481-86ee-4cfb-9b69-f151abc5923b	2023-07-27 00:00:00		Moimoi	LI_TANSSI	34b47355-73a3-41ac-b8c3-3958b3602951	{T2,T1,T3}
66936a7f-050a-4073-af7b-5c0d5cb2bf84	2023-07-27 00:00:00			LI_VOIM	34b47355-73a3-41ac-b8c3-3958b3602951	{T4,T3,T5}
689bf99d-ead3-4bba-a96d-dd3cd99336ad	2023-07-27 00:00:00		Uintia	LI_VESI	fed0465f-5ad1-4c94-bbfd-d5fef986ba85	{T6,T7}
c4c4cba4-49cf-4b74-a24e-5fde3ec62003	2023-07-25 00:00:00		Hiihtoa kentällä	LI_TALVI	fed0465f-5ad1-4c94-bbfd-d5fef986ba85	{T4,T5}
2a10af5b-4d60-4334-9d35-713b4d47f185	2023-07-21 00:00:00		Futista kentällä	LI_PALLO	fed0465f-5ad1-4c94-bbfd-d5fef986ba85	{T1,T3}
c4edaf55-10a8-4db1-b836-4e9848ae57e0	2023-07-27 00:00:00		Ravitemusta	TE_RAVITSEMUS	840989b6-a7ca-4476-bd1c-1d3d3cab99b9	{}
df62dba2-f967-4c61-90fb-00756cc5f90a	2023-07-28 00:00:00			LI_VESI	34b47355-73a3-41ac-b8c3-3958b3602951	{T5}
2e896d48-6e08-4ec9-a24d-be6ce2eb37a7	2023-07-28 00:00:00			PY_AIVO	7f20ecf1-939c-4a9d-b5e2-31baa5ef7e28	{}
0e15154f-12c5-4cb7-b246-c8d2ef7a7c68	2023-07-30 00:00:00			LI_LUONTO	34b47355-73a3-41ac-b8c3-3958b3602951	{T6,T8}
956c70f5-d282-47e0-85e2-c55d961d047e	2023-07-31 00:00:00			LI_PALLO	34b47355-73a3-41ac-b8c3-3958b3602951	{T1}
88aeae92-b235-4b70-8387-13f28b8a151d	2023-07-31 00:00:00			PY_AIVO	7f20ecf1-939c-4a9d-b5e2-31baa5ef7e28	{}
b96ae584-33f9-4646-ac8f-1a05e8ebb5fa	2023-08-11 00:00:00			LI_VESI	34b47355-73a3-41ac-b8c3-3958b3602951	{T5}
60fdfad9-1697-4a29-9cea-8ae57a51c245	2023-08-12 00:00:00			LI_PERUS	34b47355-73a3-41ac-b8c3-3958b3602951	{T1,T3}
c730c62e-c75f-4ae0-ae68-c9b9b24c04cc	2023-08-18 00:00:00			LI_VOIM	7fc07f1e-01ff-4fe5-8496-25854a55a1a0	{T4,T7}
2a0458dc-4e1d-4f05-bf8c-2588b19fcf40	2023-08-18 00:00:00			LI_VESI	7fc07f1e-01ff-4fe5-8496-25854a55a1a0	{T6}
b97ba445-01a2-4e2e-815e-1111ab082751	2023-08-18 00:00:00			LI_PERUS	7fc07f1e-01ff-4fe5-8496-25854a55a1a0	{T3,T1}
02218fe1-be24-4558-ad74-40f94600a19c	2023-08-18 00:00:00			LI_TALVI	f2cb19af-b198-4e9d-b2c0-2945024848fb	{T3,T10}
22773d7e-a7fe-4885-8ffd-890d8079d388	2023-08-19 00:00:00			LI_VOIM	f2cb19af-b198-4e9d-b2c0-2945024848fb	{T4,T2}
c6bb8352-2477-4706-9e0e-6f924db4f259	2023-08-20 00:00:00			LI_LUONTO	f2cb19af-b198-4e9d-b2c0-2945024848fb	{T1,T7}
924867f8-b4bc-4c57-a3dd-6598b68755ba	2023-08-18 00:00:00			LI_TANSSI	f2cb19af-b198-4e9d-b2c0-2945024848fb	{T3,T8}
b8174720-8b37-455f-bed9-4a2c1046167f	2023-08-18 00:00:00			LI_KUNTO	f2cb19af-b198-4e9d-b2c0-2945024848fb	{}
f6c0dc5c-cfda-4cca-ae5b-de06db69041a	2023-08-18 00:00:00			LI_PALLO	f2cb19af-b198-4e9d-b2c0-2945024848fb	{}
79b19207-8297-4c1e-a382-285c8811bdb6	2023-08-18 00:00:00			LI_TALVI	56507bfa-ff4a-4e22-a7a0-d1086c587d45	{T3}
3ab770f6-2964-489c-9a99-b003a97c83f8	2023-08-19 00:00:00			LI_PALLO	56507bfa-ff4a-4e22-a7a0-d1086c587d45	{T7,T8}
e2296b24-8a05-4273-afd9-d8fcdc595b56	2023-08-20 00:00:00			LI_VESI	56507bfa-ff4a-4e22-a7a0-d1086c587d45	{T1,T4}
687f2732-b37c-4fd2-bfbc-debe495a8230	2023-08-21 00:00:00			LI_VOIM	56507bfa-ff4a-4e22-a7a0-d1086c587d45	{T6,T4}
c10b5c97-268d-4a40-97ff-48524d92f069	2023-08-22 00:00:00			LI_LUONTO	56507bfa-ff4a-4e22-a7a0-d1086c587d45	{}
b176b1cb-7450-4149-b1cf-2c55ee107d29	2023-08-23 00:00:00			LI_LUONTO	56507bfa-ff4a-4e22-a7a0-d1086c587d45	{T1,T4}
4e401f99-6851-4842-9e0c-66c5683ab8f1	2023-08-24 00:00:00			LI_TANSSI	56507bfa-ff4a-4e22-a7a0-d1086c587d45	{}
10cf0d5c-3bf8-4ca7-beb4-2eac074985fb	2023-08-25 00:00:00			LI_KUNTO	56507bfa-ff4a-4e22-a7a0-d1086c587d45	{}
701d0096-a5e9-480d-a09f-02533f719c99	2023-08-26 00:00:00			LI_PERUS	56507bfa-ff4a-4e22-a7a0-d1086c587d45	{T5,T3,T2}
a183f57e-e4bd-42f4-8145-0574b4af332d	2023-08-28 00:00:00			LI_TALVI	56507bfa-ff4a-4e22-a7a0-d1086c587d45	{T1,T2,T3}
46decadd-ce65-41e6-be12-83de28707361	2023-08-15 00:00:00			LI_LUONTO	34b47355-73a3-41ac-b8c3-3958b3602951	{T3,T5,T4}
d6e498fa-92dc-4425-ba9a-6ea712d40f92	2023-08-22 00:00:00		Keihäs ja kuula	LI_PERUS	f6160571-beff-4c21-b3af-399f376429ae	{T3}
1743ed58-645f-41e4-8f80-22cd286f5cbb	2023-08-19 00:00:00			LI_PALLO	34b47355-73a3-41ac-b8c3-3958b3602951	{T4,T5}
9cd49f96-06d9-4b21-b309-85179a146fe8	2023-08-20 00:00:00			LI_PALLO	7481aede-c286-49ad-a2bd-2e036d70f0db	{T5,T4}
5bd573d2-8627-4e82-ab62-512d93e4c87c	2023-08-20 00:00:00			LI_TALVI	6b761a28-ed39-4e13-a51c-f4452e8756c3	{T4,T1}
6f95bb2b-dd9b-4321-adca-f89da6895b2a	2023-08-20 00:00:00			LI_LUONTO	34b47355-73a3-41ac-b8c3-3958b3602951	{T3,T2,T1}
4a81ce87-bccf-4fb5-af09-51e8899bbed1	2023-08-21 00:00:00		Heitto ja työntö	LI_PERUS	31169d42-b6c4-485c-8ced-f3fca6fe9ea9	{T3}
bee802eb-1d02-4fec-9e4d-003a1361685e	2023-08-21 00:00:00		Kpk ja fudis	LI_PALLO	45982a54-e42c-4e48-8b84-32689d592abd	{T4}
032c110b-9a4c-47b8-914a-c07dc4a7f82d	2023-08-21 00:00:00		Koripallo ja beach volley	LI_PALLO	999be80c-ff15-4515-ba2d-3f330319b986	{T4}
fbebf81c-ce89-4b93-80b5-ea5cdc471125	2023-08-21 00:00:00			LI_VESI	6b761a28-ed39-4e13-a51c-f4452e8756c3	{T6,T7}
520adbc2-e093-40f1-8a8f-5b071f9c9c3f	2023-08-22 00:00:00		Keihäs ja kuula	LI_PERUS	c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	{T3}
\.


--
-- TOC entry 2611 (class 0 OID 32784)
-- Dependencies: 217
-- Data for Name: Group; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Group" (id, name, "teacherId", "updatedAt", "subjectCode", "currentYearCode", archived) FROM stdin;
29627f0e-5406-4c0a-8919-5afb93b3bf2d	8B	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-05-21 12:46:38.04	BI	PRIMARY_EIGHTH	f
d63d7e1f-283a-43c2-a420-f4c6899f5a8f	Eka	c881041e-3f38-4fce-abb8-b4e6b39bcf09	2023-07-27 13:54:02.386	KI	PRIMARY_FIFTH	f
3c6c6f5f-efde-49cb-959c-4a46705e2d05	5A	1b922f7e-e8ab-4da8-8db9-ef0ea31952ad	2023-07-27 17:06:30.438	LI	PRIMARY_FIFTH	f
1ee180cc-0fd2-4b33-ab90-3b23278904dd	8B	1b922f7e-e8ab-4da8-8db9-ef0ea31952ad	2023-07-27 17:12:29.888	TE	PRIMARY_EIGHTH	f
9bb51a1c-ff1e-4731-83c4-41242a918782	Moi	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-07-28 09:46:04.31	GE	PRIMARY_FIFTH	f
0856ecf9-c6fe-4e0e-9887-805ea86d2561	7a	3c237367-e3d8-468c-9cbd-5636f746172f	2023-07-28 10:53:53.176	LI	PRIMARY_SEVENTH	f
bdf8ef36-e213-405d-8eed-cc673cbb95f7	Dksjjd	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-07-28 15:40:01.902	US	PRIMARY_SIXTH	f
0e9303b3-5ac2-4d35-918d-b38b5b702e2e	Eujdjd	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-07-28 15:40:09.761	HI	PRIMARY_SEVENTH	f
73155753-55f4-4c8c-b5c4-6915ab6bdb79	Jsksj	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-07-28 15:40:35.258	US	PRIMARY_FIFTH	f
c8439254-6dab-47b6-8f28-24ac3460bfe8	Dbkdbd	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-07-28 15:41:11.391	KU	PRIMARY_SIXTH	f
f4404ca3-5493-4e1f-a81e-2ab6e6ae5c2a	Wujsjs	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-07-28 15:41:18.932	US	PRIMARY_SEVENTH	f
e97b032a-536c-4331-8075-45de1ffee124	Lukio 1.	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-07-31 12:51:24.8	PY	HIGH_SCHOOL_FIRST	f
201552e5-b73d-439c-bd17-b3db92725403	1A	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-08-20 13:56:24.124	LI	PRIMARY_FIRST	f
53bbc105-6e07-4841-a795-c75f806bea01	Testi	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-20 18:23:55.193	LI	PRIMARY_FIRST	t
0214a9fc-3c21-48f2-abab-9ac705059cc1	3B	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-08-18 10:50:13.852	LI	PRIMARY_THIRD	f
e6299525-7a48-4030-a523-cf249433d62a	Testi	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-20 18:23:59.295	LI	PRIMARY_FIRST	t
9d124d20-5f11-4647-9256-b1c43740dd81	Testi	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-20 18:24:03.326	LI	PRIMARY_FIRST	t
8eba147b-a52c-4bb7-b42c-7525324113f4	7C	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-20 18:29:55.327	LI	PRIMARY_SEVENTH	f
ec6035c5-7677-4cab-b7dc-75f3f998194f	7ADF	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-08-18 11:00:44.984	LI	PRIMARY_SEVENTH	f
ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f	8D	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-20 18:36:01.194	LI	PRIMARY_EIGHTH	f
bde28363-5c62-493c-afee-04d21e9eecde	9A	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-20 18:41:28.457	LI	PRIMARY_NINTH	f
5d674efc-3549-4837-b221-44c4d622eb09	9B	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-20 18:42:34.994	LI	PRIMARY_NINTH	f
e5fde4bf-6630-4459-9d8e-31740b307c02	9. Valinnainen	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-20 18:44:28.226	LI	PRIMARY_NINTH	f
4c36484b-3244-47a9-a5e3-235c9474383e	7D	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-21 06:55:04.331	LI	PRIMARY_SEVENTH	f
36b2f528-25fa-4ce2-8d35-6d487a5078d9	8C	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-21 10:47:34.567	LI	PRIMARY_EIGHTH	f
5922e468-ecb6-481e-bfdb-c4e2386cb070	8. Valinnainen	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-21 13:48:25.835	LI	PRIMARY_EIGHTH	f
885f85f3-3708-40ea-ae0b-cdb636126740	9BC	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-08-19 12:19:20.402	LI	PRIMARY_NINTH	t
2c7feaca-9582-4a79-9c9c-8c34e8c0485c	Bzjdkdj	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-08-19 19:26:32.212	KU	PRIMARY_FIFTH	t
8e6af31c-465e-427e-b72f-f8116a77ea33	Testi	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-08-21 13:51:09.804	LI	PRIMARY_NINTH	f
d69b86d5-ca2b-4958-b968-51f360cec0a3	Kullo	1b922f7e-e8ab-4da8-8db9-ef0ea31952ad	2023-08-21 14:40:24.166	LI	VOCATIONAL_FIRST	f
b03b85ef-19a9-47ab-9903-b0a2b82bb1de	Testi	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-20 07:33:16.858	LI	PRIMARY_SEVENTH	t
e768794b-c688-4dce-9445-23e8d4c3c986	7B	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-22 07:08:35.74	LI	PRIMARY_SEVENTH	f
942b9f78-b7b8-46aa-abff-18cf8da3ac9b	7A	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-22 12:52:08.475	LI	PRIMARY_SEVENTH	f
558998de-3364-412a-908a-70b27920ea42	Testi	79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	2023-08-20 07:33:44.762	LI	PRIMARY_SEVENTH	t
b742b732-1232-4326-8f53-b6c68495c4b8	Uusi ryhmä	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-08-20 13:38:32.233	LI	PRIMARY_SIXTH	f
44ed5f5a-32d9-49bf-8b27-f7baf236771f	Uuuuusi ryhmä	fc78b20c-b2a5-4fde-b57b-529baa33852f	2023-08-20 13:39:49.05	LI	PRIMARY_SIXTH	f
aaa3df48-b514-44fb-9c15-10aa18e3454e	Moi	1b922f7e-e8ab-4da8-8db9-ef0ea31952ad	2023-08-20 13:45:42.141	LI	PRIMARY_FIFTH	f
\.


--
-- TOC entry 2614 (class 0 OID 32806)
-- Dependencies: 220
-- Data for Name: Student; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Student" (id, name, "groupId") FROM stdin;
11cd88f0-bd26-47c9-bd44-e928cc73941b	Teppo Tavallinen	201552e5-b73d-439c-bd17-b3db92725403
5a026b03-52f6-4cb1-b282-f7ac2ea21048	Matti Meikäläinen	201552e5-b73d-439c-bd17-b3db92725403
06e78983-176e-4899-a198-238f9bdcd608	Tiia	0214a9fc-3c21-48f2-abab-9ac705059cc1
caa864dc-2238-45c3-a014-7dae91be7891	Laura	0214a9fc-3c21-48f2-abab-9ac705059cc1
f695e8be-7103-4c28-a0ac-6f8a67cc44ad	Mika	0214a9fc-3c21-48f2-abab-9ac705059cc1
63ac40cf-5435-4847-ab5e-9aa7f87be4c8	Ekku	0214a9fc-3c21-48f2-abab-9ac705059cc1
d11bfb03-737b-4674-885e-8106e7fcb822	Elmeri	0214a9fc-3c21-48f2-abab-9ac705059cc1
fbfc259b-92b8-473a-be4c-af41872eb4ed	Joona	0214a9fc-3c21-48f2-abab-9ac705059cc1
a68027c8-a6bd-4d50-90cc-337a7a4ce42f	Petteri	0214a9fc-3c21-48f2-abab-9ac705059cc1
8f91dadf-8cd4-49d2-8bbd-19f21997ccfd	Haku	0214a9fc-3c21-48f2-abab-9ac705059cc1
7fb42188-30c7-4fe1-b71e-b34420d9fec1	Poopo	0214a9fc-3c21-48f2-abab-9ac705059cc1
180c7590-34fd-403c-9496-a1d8db4d7dba	Nasse	0214a9fc-3c21-48f2-abab-9ac705059cc1
d52a0745-d5ce-46c3-89f1-2a54007e7bde	Pallu	0214a9fc-3c21-48f2-abab-9ac705059cc1
be981090-64ab-412b-b619-781d00ba30eb	Joppe	0214a9fc-3c21-48f2-abab-9ac705059cc1
eb679a62-4942-4687-ae5e-41c051705198	Hazi	0214a9fc-3c21-48f2-abab-9ac705059cc1
67ea0653-c9ce-4392-aac0-7ef8f7c5ca26	Ake	0214a9fc-3c21-48f2-abab-9ac705059cc1
777a6529-5d2d-4037-a8d9-49721e37b6f7	Marru	0214a9fc-3c21-48f2-abab-9ac705059cc1
5eafeddc-275c-4c4f-962e-b443a3bf2ee2	Tks	d63d7e1f-283a-43c2-a420-f4c6899f5a8f
20268fbb-e566-41bd-9810-479fefa9eb52	Kaks	d63d7e1f-283a-43c2-a420-f4c6899f5a8f
5825695e-aceb-4172-82aa-f65f51e7da79	Kolme	d63d7e1f-283a-43c2-a420-f4c6899f5a8f
b3bd6d2e-1bf6-4f56-a561-806a2d11bd97	Tiia	3c6c6f5f-efde-49cb-959c-4a46705e2d05
3e491af6-d9d3-47a5-bb80-9cf1bf9296de	Laura	3c6c6f5f-efde-49cb-959c-4a46705e2d05
bfe30e38-2410-419e-8e1a-57fc39ea5dff	Mika	3c6c6f5f-efde-49cb-959c-4a46705e2d05
21579927-936b-44ba-bb3d-3c81a17f2edf	Tuppe	3c6c6f5f-efde-49cb-959c-4a46705e2d05
e99ee5ed-2abf-4af9-8d8b-44c0cc187712	Halli	3c6c6f5f-efde-49cb-959c-4a46705e2d05
6ab3fb53-9ed8-4d3b-9b83-649673a18f8c	Lassi	3c6c6f5f-efde-49cb-959c-4a46705e2d05
e0520bdb-0175-4c95-9eb6-7b821f291b84	Maukku	3c6c6f5f-efde-49cb-959c-4a46705e2d05
3c8ea8e2-a3ee-403a-96e8-715d670e228c	Panu	3c6c6f5f-efde-49cb-959c-4a46705e2d05
ff5f5fb8-e156-4a1b-821a-d918a7b4f879	Alma	3c6c6f5f-efde-49cb-959c-4a46705e2d05
8c9e57f5-1dc1-4c32-9775-200315ee9ca7	Jesse	3c6c6f5f-efde-49cb-959c-4a46705e2d05
5b4efcd1-784f-4d70-9d8a-39b3efe9252a	Kalle	3c6c6f5f-efde-49cb-959c-4a46705e2d05
203c350a-f4ba-40d5-b3eb-08e8af216a15	Pimu	3c6c6f5f-efde-49cb-959c-4a46705e2d05
32ed8751-d751-4481-a987-6cb4ec026395	Taavi	3c6c6f5f-efde-49cb-959c-4a46705e2d05
3076b97b-4518-4fad-bf84-6c716330f5ca	Kerttu	3c6c6f5f-efde-49cb-959c-4a46705e2d05
2e7a1237-7f0c-46ac-bf32-df23571f0e82	Maisa	3c6c6f5f-efde-49cb-959c-4a46705e2d05
baa4f222-d2f9-47f9-bfb6-7f52e03e1614	Liisa	3c6c6f5f-efde-49cb-959c-4a46705e2d05
3fc922f0-3d2f-4d53-99e2-93e987a6e403	Pete	3c6c6f5f-efde-49cb-959c-4a46705e2d05
b81ed4fb-93f6-4870-be6a-4e16d7040aa6	Hilla	3c6c6f5f-efde-49cb-959c-4a46705e2d05
b8e9dd6c-a10f-414e-8655-a7d18fb2fa29	Mika	1ee180cc-0fd2-4b33-ab90-3b23278904dd
b72524ad-9c84-445c-828d-5a9b04e3a701	Maisa	1ee180cc-0fd2-4b33-ab90-3b23278904dd
dceed483-b8f9-4734-97c0-5555ea46617b	Pertti	1ee180cc-0fd2-4b33-ab90-3b23278904dd
7e60db96-e3c2-4472-beff-7a7e12b6e2db	Pekka	9bb51a1c-ff1e-4731-83c4-41242a918782
0e3d766a-e1f8-4148-b062-80909870809e	Pätkä	9bb51a1c-ff1e-4731-83c4-41242a918782
5f71395c-6752-4bbe-adaf-e6d9fb947c46	Putka	9bb51a1c-ff1e-4731-83c4-41242a918782
6536d176-9773-4dc7-908d-abf55f69f594	Mutka	9bb51a1c-ff1e-4731-83c4-41242a918782
9084a92f-09d6-458e-99ad-86bb9155d321	Ksk	0856ecf9-c6fe-4e0e-9887-805ea86d2561
68044dd4-1363-4868-a39f-ceef13aaa663	Jsjd	0856ecf9-c6fe-4e0e-9887-805ea86d2561
0d6ee227-afa5-4819-a125-9edcba8252da	Jsjd	0856ecf9-c6fe-4e0e-9887-805ea86d2561
072cff55-1fbd-4bdc-9d57-2b9c9f3f03a1	Jskd	0856ecf9-c6fe-4e0e-9887-805ea86d2561
389c20f4-ae5a-4652-9cbc-92d3a37369a9	Jsjd	0856ecf9-c6fe-4e0e-9887-805ea86d2561
f71f9495-cc37-45ac-aab3-f76ab8a5a840	Jjdp	0856ecf9-c6fe-4e0e-9887-805ea86d2561
6a343998-c100-47ec-b3f2-65d1869dcf71	Hshd	0856ecf9-c6fe-4e0e-9887-805ea86d2561
b166c4db-80d0-410a-b948-9634e7c68efd	Pekka	ec6035c5-7677-4cab-b7dc-75f3f998194f
82b20571-c15e-49d9-902a-b57316fad8c2	Maija	ec6035c5-7677-4cab-b7dc-75f3f998194f
77dee450-240b-4563-842a-b619aea8e612	Tuuli	ec6035c5-7677-4cab-b7dc-75f3f998194f
84fbffad-8a66-46a0-a308-6b186a11875e	Meri	ec6035c5-7677-4cab-b7dc-75f3f998194f
ceccaf73-1e73-432c-9ad7-d2f9845b93ed	Make	885f85f3-3708-40ea-ae0b-cdb636126740
89930c8d-cdcb-484e-927d-688bbd096478	Tuuli	885f85f3-3708-40ea-ae0b-cdb636126740
c79cac18-a6e3-41bd-a6a2-8e3b76631467	Sipe	885f85f3-3708-40ea-ae0b-cdb636126740
d49c17d9-50ee-4d08-8e32-ead9b47358d7	Liisa Lahtine	201552e5-b73d-439c-bd17-b3db92725403
1354e6ca-8716-440b-9012-24b76d7783c2	Jouko Pekkanen	201552e5-b73d-439c-bd17-b3db92725403
7b49606e-202a-408a-acd7-51bebabf18e0	Moimoi	b742b732-1232-4326-8f53-b6c68495c4b8
83ed3567-3b8b-444c-8f44-934e9d6c15fb	Terve terve	b742b732-1232-4326-8f53-b6c68495c4b8
221c2623-db3b-491e-89fb-868ba2f1c16e	Terve	44ed5f5a-32d9-49bf-8b27-f7baf236771f
19fb0b30-73ad-40a8-94a0-79ed12f571ea	Moi	44ed5f5a-32d9-49bf-8b27-f7baf236771f
5e389aba-7b19-459b-ab9d-3fb8b4baa0f0	Noimoi	44ed5f5a-32d9-49bf-8b27-f7baf236771f
e0ae99d3-2bd5-4308-a1b2-38484a93ce2c	Jassi	aaa3df48-b514-44fb-9c15-10aa18e3454e
1ee41eb4-487b-4df0-ad3a-0f68b0b4ff3c	Passi	aaa3df48-b514-44fb-9c15-10aa18e3454e
f170822b-1dfb-4ae4-8bed-4478c43a63bc	Lassi	aaa3df48-b514-44fb-9c15-10aa18e3454e
98b7a92a-261b-4d69-b949-09ff5c10d072	Kassi	aaa3df48-b514-44fb-9c15-10aa18e3454e
8b8d40f8-3f62-4181-a35e-62aa49b2ce97	Tassi	aaa3df48-b514-44fb-9c15-10aa18e3454e
017c47ee-d211-44d5-ba4b-24340713ad23	Massi	aaa3df48-b514-44fb-9c15-10aa18e3454e
79721f61-835e-44ab-8769-f79fe3c52ff1	Pekka	8e6af31c-465e-427e-b72f-f8116a77ea33
8117cf8b-a0ff-49e1-a2fa-4a18a2a1f03a	Jaska	8e6af31c-465e-427e-b72f-f8116a77ea33
860f1644-7f92-4a08-8fa7-8b345732ccc4	Kakka	8e6af31c-465e-427e-b72f-f8116a77ea33
77457577-1ab9-4dbb-8065-2ab12ece1a84	Eetu	53bbc105-6e07-4841-a795-c75f806bea01
ce193ad9-d314-4c7f-bdb6-908585b7fad0	Eetu Immu Jaska Pekka	e6299525-7a48-4030-a523-cf249433d62a
689748d3-6df3-4578-ba76-9f081abb32c4	Eetu	9d124d20-5f11-4647-9256-b1c43740dd81
c2d546b1-48e3-45d8-a6dc-6042c118f2b8	Immu	9d124d20-5f11-4647-9256-b1c43740dd81
b0fdc629-cd54-4a92-9827-472024663b28	Jaska	9d124d20-5f11-4647-9256-b1c43740dd81
cd357f8b-2fc9-489c-a3b2-a5850207d2d2	Pekka	9d124d20-5f11-4647-9256-b1c43740dd81
7ebec83f-f17b-4770-a9af-ea290f26e168	7A Ali Hoodo	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
40a52df7-f50b-4105-b4d2-00e0b391156b	7A Arkan Marija	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
6edb9c7d-338c-42b3-8bed-95c037398e1d	7A Azizi Asl Daniar	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
0de6a87e-13a1-4713-988d-655e950c9fea	7A Heikkerö Minja	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
76d7ba34-af4d-41e0-934a-63461dc3aeac	7A Karimi Shahed	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
9c95ce1a-b395-4179-9558-10abb9105fd0	7A Koivulahti Max	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
e2500f5c-1aea-4ffe-9f18-9b86022fce62	7A Kosonen Matias	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
92214907-4fe9-442f-9f35-c7b59f78e08a	7A Köiv Thomas	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
33ce32f8-0ac8-47f6-a2a9-f5aa880442f4	7A Nieminen Aatos	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
e3e017a1-6c30-4320-8ccf-3b2b276e8128	7A Osman Ikraam	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
3cb1e21e-1338-4fac-8380-c69946fc26c6	7A Peltokangas Stella	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
e1ceb28e-8139-41aa-bf55-3ef379c568ab	7A Prydnia Yaroslava	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
72a94026-88ad-4cbb-b1e4-e6aa917db696	7A Rastas Lotta	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
5de52dab-1765-4acf-8020-053b68336487	7A Rinta-Kahila Fanni	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
268e1a31-5cba-4861-8aae-7d38fb140f13	7A Saastamoinen Anton	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
0b357c38-9cda-428a-8a3b-0254143564df	7A Salmi Viola	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
01ab146e-d9da-4562-a7dc-f3d151d4992b	7A Seppälä Veeti	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
9fc6c35d-b42d-4594-a960-5836531c7282	7A Sumarokov Timur-Artur 	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
18ccbf25-0831-40e9-9145-602b9d17ed2c	7A Tekko Krislin	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
189e5ac6-f54b-4b10-ae14-ff92e63c3e5f	7A Tiullinen Tatiana	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
39e44baf-d5a4-4a7b-85ba-8d9ef3dd9567	7A Välilahti Emre	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
d0c101ca-4d6b-43c2-beb1-a4680f44dd5a	7B Abdikadir Ali Nawal 	e768794b-c688-4dce-9445-23e8d4c3c986
db6b1a3f-e485-4b8f-8a25-0a8e518a2026	7B Al-Dulaimi Rimas	e768794b-c688-4dce-9445-23e8d4c3c986
95db6c22-a14c-4f47-b6c3-5ddffdbd933f	7B Alhiiti Eslem	e768794b-c688-4dce-9445-23e8d4c3c986
0025a5a3-6947-4d23-b100-bcd5a58c6e09	7B Ali Aisha	e768794b-c688-4dce-9445-23e8d4c3c986
7e447ce6-5569-47f0-9000-20ae93a68bd3	7B Al-Tikriti Rawan	e768794b-c688-4dce-9445-23e8d4c3c986
971b8500-6c50-4f89-ab1e-f5219ccdef93	7B Elberg Oliver	e768794b-c688-4dce-9445-23e8d4c3c986
a3be9480-89da-4490-aad6-4507acd56e6c	7B Ibrahimkhel Safa 	e768794b-c688-4dce-9445-23e8d4c3c986
c695adc1-a07a-4ebf-b99f-9714e4ab4bf7	7B Jatkola Ada	e768794b-c688-4dce-9445-23e8d4c3c986
2abacf8c-b973-4678-9504-e30861fdcba5	7B Kallioniemi Neve	e768794b-c688-4dce-9445-23e8d4c3c986
bdbdbd45-458b-41df-ba2f-ab5e4406bb26	7B Leinonen Taika	e768794b-c688-4dce-9445-23e8d4c3c986
e0562708-15b5-478a-8f5a-1863c55a6f38	7B Louko Seela	e768794b-c688-4dce-9445-23e8d4c3c986
8730fbfe-4cab-41db-8b7d-a750e3448184	7B Mahad Ainab Najma	e768794b-c688-4dce-9445-23e8d4c3c986
52c3b46f-5204-40ad-9150-17b0a7077eed	7B Mohamud Mohamed Nasteho 	e768794b-c688-4dce-9445-23e8d4c3c986
0d894576-e308-4a66-a809-d8530eb5753e	7B Mude Sabirina	e768794b-c688-4dce-9445-23e8d4c3c986
e111c54d-9b2e-406b-aab4-e61fe921dbe2	7B Mudei Kaalid	e768794b-c688-4dce-9445-23e8d4c3c986
7ac64248-1e14-4e88-ab15-a9a552d3811c	7B Muyima Djency	e768794b-c688-4dce-9445-23e8d4c3c986
f4df5072-2986-4859-a7cc-6d06a6fe21ad	7B Saksa Samuel	e768794b-c688-4dce-9445-23e8d4c3c986
3cd7167d-e20f-4291-9e18-5241b854e116	7B Satomaa Klara	e768794b-c688-4dce-9445-23e8d4c3c986
1e7d2903-2e91-4fca-b77f-211821ad0b07	7B Seppälä Lili	e768794b-c688-4dce-9445-23e8d4c3c986
cd9d11c7-9b20-4243-b816-d3986f7e22ad	7B Tajik Niayesh	e768794b-c688-4dce-9445-23e8d4c3c986
77793959-dc53-44d1-8cd5-ddbe3c4b25a4	7B Wisam Latif Muhammed 	e768794b-c688-4dce-9445-23e8d4c3c986
5e4779f0-fad2-4f94-b350-e56b4c5f5471	7B Üzün Mustafa	e768794b-c688-4dce-9445-23e8d4c3c986
d2bb5704-bed1-47cc-8879-681b17da4686	7C Abdilkader Isse Hamza 	8eba147b-a52c-4bb7-b42c-7525324113f4
31a2c199-fb37-4e7c-afb7-2619cc4f8260	7C Ahmed Abdi Abdishakur 	8eba147b-a52c-4bb7-b42c-7525324113f4
36f9a75d-23d0-4a2c-b6c0-e04cee9b1e26	7C Ahmed Ali Mahad	8eba147b-a52c-4bb7-b42c-7525324113f4
25567d61-dd6a-4b36-a934-5f6894070674	7C Al-Nazary Fatima	8eba147b-a52c-4bb7-b42c-7525324113f4
3d4ca7fc-a3bc-46f5-b48e-eb549cdc4e2b	7C Ben Younes Safia 	8eba147b-a52c-4bb7-b42c-7525324113f4
f3d70376-e85f-44c5-ae21-9c138e6c1663	7C Cherkasov Artur 	8eba147b-a52c-4bb7-b42c-7525324113f4
de688b84-f770-47b6-9e15-3224c355d563	7C El Farkoussi Anas 	8eba147b-a52c-4bb7-b42c-7525324113f4
c177824f-0392-45e8-a26b-95cd21f3bbdb	7C Ikonen Pihla	8eba147b-a52c-4bb7-b42c-7525324113f4
aaf7140c-7da3-4882-b2a2-99b19054b43c	7C Kaikkonen Sofia 	8eba147b-a52c-4bb7-b42c-7525324113f4
fa187771-3d5e-4cb5-81eb-342568b7e833	7C Khan Mishel	8eba147b-a52c-4bb7-b42c-7525324113f4
cd2ac37f-bba5-4131-8a91-20280bb9b26c	7C Kujala Beata	8eba147b-a52c-4bb7-b42c-7525324113f4
f44523a8-bbd2-442c-8305-0dd8fb3cea0b	7C Kukk Evelis	8eba147b-a52c-4bb7-b42c-7525324113f4
a5fcc76a-56b1-4ed8-ba9d-5d62e20510d7	7C Lahti Noa	8eba147b-a52c-4bb7-b42c-7525324113f4
cf94a62d-ef7c-448b-9f61-16a9c6b90911	7C Laine Elsa	8eba147b-a52c-4bb7-b42c-7525324113f4
e1ee0c51-198d-441c-a0e3-cce4c418d122	7C Lämsä Veera	8eba147b-a52c-4bb7-b42c-7525324113f4
9f715b18-4cd7-48ac-b927-f43f7c166538	 7C Matikainen Vera 	8eba147b-a52c-4bb7-b42c-7525324113f4
69c689de-b305-43a9-a6e8-c65382e4e476	7C Mirzae Kamran (Ali)	8eba147b-a52c-4bb7-b42c-7525324113f4
288da2c9-c807-4e5f-9f49-507f1cabc93e	7C Mutka Ronja	8eba147b-a52c-4bb7-b42c-7525324113f4
918413c4-6838-4a64-b031-6d026f3ce183	7C Pyrylä Lucas	8eba147b-a52c-4bb7-b42c-7525324113f4
4ac1e1d2-cafe-4171-a02a-773ae38292c9	7C Rissanen Leo 	8eba147b-a52c-4bb7-b42c-7525324113f4
d2430900-d731-43d5-ae88-a0166a7cfdde	7C Ruokonen Laura 	8eba147b-a52c-4bb7-b42c-7525324113f4
1f768e05-8228-4b44-9288-7eae6b5b4686	7C Syväste Ellen 	8eba147b-a52c-4bb7-b42c-7525324113f4
d3433aa4-3325-4b9d-8d15-c4ebfdc7533b	7C Tuomi Sara	8eba147b-a52c-4bb7-b42c-7525324113f4
a29cc6ca-adec-4a7e-8b7b-3a6261a709be	7C Zhang Jingxian (Tiina)	8eba147b-a52c-4bb7-b42c-7525324113f4
03397f36-f253-476a-a333-556ae179dbda	7D Abdalla Karim	4c36484b-3244-47a9-a5e3-235c9474383e
4e00db97-fd93-416f-a349-655a240056ae	7D Ali Abdulahi	4c36484b-3244-47a9-a5e3-235c9474383e
e0c8876f-57f1-43dc-9950-3851d82380fe	7D Al-Jafari Elaf	4c36484b-3244-47a9-a5e3-235c9474383e
28e533c4-faf3-4e9f-ac97-ea948c1b019a	7D Bakac Aisha	4c36484b-3244-47a9-a5e3-235c9474383e
775a7c76-dc4a-4849-baf1-d7f9080eaf89	7D Diamonika Kinsangula Destiny 	4c36484b-3244-47a9-a5e3-235c9474383e
02ea3a66-aa4a-420a-9334-f2b0941c564b	7D Haaksikari Luca	4c36484b-3244-47a9-a5e3-235c9474383e
1dd2a92e-8754-4265-884f-db0a12b6a4c8	7D Heliara Unna 	4c36484b-3244-47a9-a5e3-235c9474383e
5e5f9c60-1c5e-43f6-97ff-6e6144ecf55f	7D Kalenius Iina 	4c36484b-3244-47a9-a5e3-235c9474383e
b03cc979-7da3-4d75-b187-943264397b04	7D Kettunen Topias 	4c36484b-3244-47a9-a5e3-235c9474383e
db1510ed-3bb6-4856-8ea9-5012eeb68192	7D Kibala Carmelo 	4c36484b-3244-47a9-a5e3-235c9474383e
cfea9e73-0c9f-433f-909a-a088c3931b8f	7D Kiuru Matias	4c36484b-3244-47a9-a5e3-235c9474383e
ffb872b2-2bb5-4267-8e92-0514977ba44b	7D Lindberg Rony	4c36484b-3244-47a9-a5e3-235c9474383e
e34d25fc-b0e2-48f1-8d86-77ce7464822e	7D Mattanen Jimi	4c36484b-3244-47a9-a5e3-235c9474383e
05795f8f-d6de-4ec8-88fc-0df98df77292	7D Obandarme-Mokulu Blessing 	4c36484b-3244-47a9-a5e3-235c9474383e
de0b5abf-b8c5-4046-aaf7-f9bffc544ca4	7D Olice Elin	4c36484b-3244-47a9-a5e3-235c9474383e
0eba0b59-1564-4d93-a65c-d5aa57c2ba93	7D Pandey Ayushma	4c36484b-3244-47a9-a5e3-235c9474383e
dccdded4-f3c3-4949-937a-cfd65fae056d	7D Pitkänen Emma	4c36484b-3244-47a9-a5e3-235c9474383e
e7eb8c8a-033d-416a-848a-6da0d65cbf8e	7D Pohjonen Joonatan	4c36484b-3244-47a9-a5e3-235c9474383e
241042e2-7fa6-413a-a501-ab6c28dd86e7	7D Repo Antti	4c36484b-3244-47a9-a5e3-235c9474383e
16530cbd-5612-4a8c-920c-9744e32be7bc	7D Siitonen Marcus	4c36484b-3244-47a9-a5e3-235c9474383e
f18a8f1a-a17a-49da-8cc1-3603b4c21dc8	7D Torikka Toivo	4c36484b-3244-47a9-a5e3-235c9474383e
8cb49f42-d3d0-4a6a-9ac1-9569aed4991f	7D Velho Roope	4c36484b-3244-47a9-a5e3-235c9474383e
8a429230-9011-476a-9f6f-15494ecf57f2	7D Yamin Rana	4c36484b-3244-47a9-a5e3-235c9474383e
4d9888c7-3be7-4fec-a5d7-07759cdff766	8C Ahmed Ruqiya	36b2f528-25fa-4ce2-8d35-6d487a5078d9
5c10a0b2-145a-4701-a64c-80a9369890a3	8C Elasri Samira	36b2f528-25fa-4ce2-8d35-6d487a5078d9
436f9966-c204-4794-89fa-e5e1a30b6247	8C El-Habbal Musa 	36b2f528-25fa-4ce2-8d35-6d487a5078d9
8c057200-e725-4e08-b93c-88bd891fe862	8C Friman Renata 	36b2f528-25fa-4ce2-8d35-6d487a5078d9
ad4248b3-989a-4794-844e-af4cb598a1e7	8C Graham Daniel 	36b2f528-25fa-4ce2-8d35-6d487a5078d9
61780abd-03a9-4ce4-89cc-059b5a2f5177	8C Halgma Kail	36b2f528-25fa-4ce2-8d35-6d487a5078d9
92eecb4d-b8c2-43ce-ac29-eb7a46566311	8C Hautanen Aaron	36b2f528-25fa-4ce2-8d35-6d487a5078d9
e17db94c-c058-4163-b1df-3824f2f732b8	8C Ibrahimkhel Marwa	36b2f528-25fa-4ce2-8d35-6d487a5078d9
139ee728-7bd5-4ed5-b88e-65e455770b9f	8C Immonen Matias	36b2f528-25fa-4ce2-8d35-6d487a5078d9
28bf177a-d273-4b22-963c-4206fcffa9cf	8C Laitala Altti	36b2f528-25fa-4ce2-8d35-6d487a5078d9
48f6a291-18c4-4349-8578-e9d40a016f99	8C Leinonen Jermu	36b2f528-25fa-4ce2-8d35-6d487a5078d9
d1c1ad1a-62d0-4d6b-bf48-2dead02ed1f6	8C Liao Elli	36b2f528-25fa-4ce2-8d35-6d487a5078d9
e6537a2f-233d-4b11-8f1b-5a0814a675c0	8C Metso Julia	36b2f528-25fa-4ce2-8d35-6d487a5078d9
6f8a2928-32c2-4e60-9c99-b8073fcd9d35	8C Mielonen Alexandra	36b2f528-25fa-4ce2-8d35-6d487a5078d9
1a420969-4c65-4a34-bdc2-80e13ed51f0b	8C Moisio Olli	36b2f528-25fa-4ce2-8d35-6d487a5078d9
6e24ea61-532f-452b-865d-b67df86c48c4	8C Muhumed Kalombi Salma 	36b2f528-25fa-4ce2-8d35-6d487a5078d9
3b6d04be-cd10-4e54-b5aa-28a67e8e2186	8C Pekki Samu	36b2f528-25fa-4ce2-8d35-6d487a5078d9
ec51a182-bf8d-436e-8704-b2d5cd897604	8C Piskunen Juulia	36b2f528-25fa-4ce2-8d35-6d487a5078d9
a8df8354-0125-404f-a1d8-5584462a5b82	8C Saarinen Juuso	36b2f528-25fa-4ce2-8d35-6d487a5078d9
c08c69f9-ef26-4f6a-95ee-455d176dfa61	8C Öhman Jimmy	36b2f528-25fa-4ce2-8d35-6d487a5078d9
1f12b19a-138f-4000-a576-c5dab30ec9e9	8D Abdikadir Abdi Caziiza 	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
7c8f19ba-b172-40e7-8e9b-da74d07eb54a	8D Hongisto Aarni	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
f031aca9-7acb-43fa-9884-72547dac5709	8D Hopia Valtteri	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
2113c63e-c4a7-4e49-90a6-626646c3d949	8D How Oliver	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
c732359d-e9bd-44c3-aa2e-bd92bfb911c2	8D Häkkinen Andreas 	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
3eb15f99-938b-40e3-b16f-bce35248b3b8	8D Kaitaranta Daniel 	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
e0357050-7b2a-4b32-87cf-af5747b17208	8D Keränen Iiris	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
a09eec89-d6b8-4a66-b95d-356d800aaa8f	8D Keskinen Eino	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
d202ea60-e678-49fd-8ecc-581cad6b508c	8D Lahtinen Lukas	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
d4e6aa85-cd60-4901-bd59-413ee93a3314	8D Lamminen Joel	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
13e7ba68-1fc6-4e4f-947a-0370f5aff61a	8D Nikula Laura	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
0fe083de-7bae-4fc1-815e-b4ead74b6a69	8D Nykäin Tuomas	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
7a3453eb-b303-4944-9bfa-f7bfdde76864	8D Näränen Ida	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
9b2269f7-aba5-42f6-afab-ccfa7bc42585	8D Perez Joakim	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
23d41b74-018e-45f5-966c-c729188c1ca3	8D Piipponen Teemu 	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
c0a2a247-d6f0-4e43-bfd7-79d01e4eb16c	8D Taivaanranta Soraja 	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
848b881e-e506-4273-b778-61cd669267d2	8D Väisänen Vilho	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
c80a1da2-c657-4a2d-8ee3-55eaa6a3b1f9	6-8H Al Hillo Rukaia	5922e468-ecb6-481e-bfdb-c4e2386cb070
74744cbc-e78c-48df-b758-713f9a81751e	6-8H Hamshar Shabnam 	5922e468-ecb6-481e-bfdb-c4e2386cb070
634c3f80-8b4f-4c38-ac4e-937418ec9e8d	7-9E Rauhansalo Emil	5922e468-ecb6-481e-bfdb-c4e2386cb070
5ce6b918-bcba-4712-98c1-d891eec91168	8A Hassan Samira	5922e468-ecb6-481e-bfdb-c4e2386cb070
a2216f2c-6ade-4f5a-a8c5-515f09bd4b08	8A Plaku Rapush	5922e468-ecb6-481e-bfdb-c4e2386cb070
b0aa13eb-dd72-4d41-9158-63ed22b2f65b	8A Rumjantsev Nikita	5922e468-ecb6-481e-bfdb-c4e2386cb070
904493af-2f99-494c-8b42-5ebe4c1ae1b6	8A Salmi Johan	5922e468-ecb6-481e-bfdb-c4e2386cb070
db8905a7-084f-4d92-af60-cf29824dabe7	8A Sheikh Ilyaas	5922e468-ecb6-481e-bfdb-c4e2386cb070
fa71c8f8-45c8-4a24-b0fb-6a0ecd67af3c	8A Sistonen Samuel	5922e468-ecb6-481e-bfdb-c4e2386cb070
fcabdea5-1224-442b-8142-62be862508e3	8C Hautanen Aaron	5922e468-ecb6-481e-bfdb-c4e2386cb070
b580b35d-10c3-4ce3-9f87-37ce3a436eaf	8C Metso Julia	5922e468-ecb6-481e-bfdb-c4e2386cb070
f034aa91-48ff-496e-b25b-9c81eaaaa3e3	8C Mielonen Alexandra	5922e468-ecb6-481e-bfdb-c4e2386cb070
bf09f310-3700-49db-b3f3-384cd041e6f2	8C Muhumed Kalombi Salma 	5922e468-ecb6-481e-bfdb-c4e2386cb070
eb6a2d6e-33a5-4ad2-95ea-a39741e9b905	8C Piskunen Juulia	5922e468-ecb6-481e-bfdb-c4e2386cb070
7df2a50b-b064-49a7-a5d5-747b117f107c	8C Saarinen Juuso	5922e468-ecb6-481e-bfdb-c4e2386cb070
fe5ede8f-8290-4b69-b575-75aeaab46f2f	8D Hopia Valtteri	5922e468-ecb6-481e-bfdb-c4e2386cb070
50d7ab1f-3cf2-4e10-9286-36df63a6e81b	8D Lahtinen Lukas	5922e468-ecb6-481e-bfdb-c4e2386cb070
7756327f-59aa-40f9-aa95-88889e4ea759	8D Nykäin Tuomas	5922e468-ecb6-481e-bfdb-c4e2386cb070
5e0e74f1-308a-4c20-bf9a-5011dff427d1	8A Khan Muhammad 	5922e468-ecb6-481e-bfdb-c4e2386cb070
5f877b5d-eaeb-404c-b3cc-d51a467fa428	8B Laiho Katariina 	5922e468-ecb6-481e-bfdb-c4e2386cb070
c5a69235-e2da-483a-b4d4-898fe3bd4c75	8D Piipponen Teemu	5922e468-ecb6-481e-bfdb-c4e2386cb070
959e8e48-e3dc-4672-b263-cb8fcb8f3057	9A Ahmed Nada	bde28363-5c62-493c-afee-04d21e9eecde
ac72adf3-79e8-4479-a81a-be13b2603b33	9A Al-Abedi Ahmed	bde28363-5c62-493c-afee-04d21e9eecde
403d2ef2-23cd-437b-9688-43756e24a287	9A Kainulainen Jenny	bde28363-5c62-493c-afee-04d21e9eecde
c71cbbc5-3ad5-4c1b-a751-616db7f95169	9A Kettunen Olivia	bde28363-5c62-493c-afee-04d21e9eecde
8585f583-e996-4173-acc7-e61b2992a3c3	9A Korpijaakko Ilari	bde28363-5c62-493c-afee-04d21e9eecde
ed8b008e-b272-4a8f-a28b-3e10943865d0	9A Kuha Felix	bde28363-5c62-493c-afee-04d21e9eecde
b924bdca-75a4-4049-978c-22b6d57a75ed	9A Lönnqvist Mai	bde28363-5c62-493c-afee-04d21e9eecde
05d139e2-1d0d-44d0-9d55-8640833f9067	9A Mahad Ainab Naeema	bde28363-5c62-493c-afee-04d21e9eecde
fe65a7a8-1054-4dce-a078-47e176bca0d3	9A Marttila Eemeli	bde28363-5c62-493c-afee-04d21e9eecde
3ff48490-fb0c-4328-8b8e-010efa10de13	9A Metsämaa Vilma	bde28363-5c62-493c-afee-04d21e9eecde
394795ec-5959-4d19-9ee5-362213b77dee	9A Mielonen Patrick	bde28363-5c62-493c-afee-04d21e9eecde
476293ef-adda-4c53-9a52-f977cb79d14e	9A Mohamed Mohamed	bde28363-5c62-493c-afee-04d21e9eecde
53394cde-fdca-44d6-bae2-9c928f2f23a0	9A Mohamed Farah Fartun 	bde28363-5c62-493c-afee-04d21e9eecde
89864582-b6ce-4434-97ee-14767b35e1d0	9A Mohamud Mohamed Said 	bde28363-5c62-493c-afee-04d21e9eecde
b7be5ecd-cc80-443f-8a6a-8125c91da527	9A Muhumed Kalombi Saara 	bde28363-5c62-493c-afee-04d21e9eecde
1199e08d-681c-4104-b883-89ebd887d53e	9A Olkhovskiy Jegor	bde28363-5c62-493c-afee-04d21e9eecde
fb382ba6-005a-42a0-9882-9735de457bc0	9A Pavlushkin Artõm	bde28363-5c62-493c-afee-04d21e9eecde
1d0f2b30-e376-4890-86af-e2585b65ee33	9A Selenius Pinja	bde28363-5c62-493c-afee-04d21e9eecde
8fc516e0-c5ba-4181-a5cd-01f85629b4ac	9A Sileoni Jenni	bde28363-5c62-493c-afee-04d21e9eecde
41dbd3de-0883-454d-baaf-7613476052f3	9A Starov Daniil	bde28363-5c62-493c-afee-04d21e9eecde
5092be97-7e39-4aa6-bd2a-a517b48ff540	9A Tammi Nea	bde28363-5c62-493c-afee-04d21e9eecde
264fe413-3243-45aa-809a-0f752bce3b4a	9A Vähätörmä Alisa	bde28363-5c62-493c-afee-04d21e9eecde
71f99d4c-e3e1-4c88-af9f-2641131f3422	9A Wdane Ridab	bde28363-5c62-493c-afee-04d21e9eecde
df5032e6-8740-4c54-a869-03e11dab715e	9B Ahmed Aaron	5d674efc-3549-4837-b221-44c4d622eb09
79171cdb-2833-4e72-bbf7-504cd4304ed1	9B Ahmed Abdi Abdi 	5d674efc-3549-4837-b221-44c4d622eb09
9aaed25e-67f8-4d9d-ab09-96d4607a98a7	9B Ahti Aleksanteri	5d674efc-3549-4837-b221-44c4d622eb09
0786da40-e26b-439b-8300-4d5915d038c4	9B Ahtinen Veli	5d674efc-3549-4837-b221-44c4d622eb09
d63a461f-521c-4430-8e64-c4a05a9d6114	9B Al-Tikriti Yusuf	5d674efc-3549-4837-b221-44c4d622eb09
75c425cd-2ba2-433d-a0b1-cfaca6290abd	9B Hassan Kowsar	5d674efc-3549-4837-b221-44c4d622eb09
892e5773-39a1-4412-84cc-c219683ca4f9	9B Ikon Janal	5d674efc-3549-4837-b221-44c4d622eb09
b5e44718-3033-432f-83a9-81edc4a14d47	9B Jama Fadumo	5d674efc-3549-4837-b221-44c4d622eb09
91a52f1d-e774-4925-8a10-9f5d7d7995fc	9B Jama Mohamed	5d674efc-3549-4837-b221-44c4d622eb09
ae1feef0-be68-422a-8522-98700c2bd931	9B Kahin Haamud	5d674efc-3549-4837-b221-44c4d622eb09
a56a92a5-893f-4de0-af0a-e764be900502	9B Katusiime Esther 	5d674efc-3549-4837-b221-44c4d622eb09
82cd71ff-8e57-44ab-829f-f296a2929585	9B Koivusalo Sara	5d674efc-3549-4837-b221-44c4d622eb09
d08c6dc6-1dc2-4a86-af3c-22e920af695e	9B Matan Nawaal	5d674efc-3549-4837-b221-44c4d622eb09
b71238b6-1cfd-41c1-92dd-fae83e40bea6	9B Mirzae Sadaf	5d674efc-3549-4837-b221-44c4d622eb09
e5032b31-071d-4ac1-a61e-f341a7170084	9B Rastas Elina	5d674efc-3549-4837-b221-44c4d622eb09
35c11fca-684d-4018-bbe6-ff17c59a80d2	9B Roimaa Sara	5d674efc-3549-4837-b221-44c4d622eb09
f5051172-84d5-4fbc-bca0-e4d808fa36f3	9B Salmela Lukas	5d674efc-3549-4837-b221-44c4d622eb09
498d994f-bb8a-4e31-8451-79c4519c6541	9B Torkkel Emma	5d674efc-3549-4837-b221-44c4d622eb09
9549b80b-fa32-4340-98fb-f827e29982ee	9B Vuzimpundu Happy 	5d674efc-3549-4837-b221-44c4d622eb09
20f182b2-d260-4286-a228-80f03a83d6d5	9B Woolley Silja	5d674efc-3549-4837-b221-44c4d622eb09
a678e014-275a-4fc3-96dd-0d356b8b84e3	9B Zhang Kairuo	5d674efc-3549-4837-b221-44c4d622eb09
789cb197-e7fc-43dc-b4bf-99fa339f92b4	9A Marttila Eemeli 	e5fde4bf-6630-4459-9d8e-31740b307c02
abb97912-4c5e-4cec-b3e7-d1d840be7e81	9B Al-Tikriti Yusuf 	e5fde4bf-6630-4459-9d8e-31740b307c02
9573f6aa-4bd6-4bf6-b320-1ee6b5ba8edb	9B Jama Mohamed	e5fde4bf-6630-4459-9d8e-31740b307c02
f30953fb-1f87-41c5-b6f1-b9dbc28825ed	7-9G Mokan Brajikan 	e5fde4bf-6630-4459-9d8e-31740b307c02
d8d038a9-73b4-4ae5-8a92-88ed3edde4fe	7-9G Öztürk Ahmet 	e5fde4bf-6630-4459-9d8e-31740b307c02
eb053966-13fe-4afb-996f-d6646db325e4	9A Pavlushkin Artõm 	e5fde4bf-6630-4459-9d8e-31740b307c02
1242a7b5-d53d-4cd5-ae38-f65402ecf98d	9A Wdane Ridab	e5fde4bf-6630-4459-9d8e-31740b307c02
e8b17234-4ce5-4c04-9507-ef785e100d73	9B Ahmed Abdi Abdi	e5fde4bf-6630-4459-9d8e-31740b307c02
7993aaf7-401e-4bef-b8c2-185aefd95344	9B Kahin Haamud	e5fde4bf-6630-4459-9d8e-31740b307c02
0bd6f7ee-7d70-4a7b-9342-0e0d7b6548f7	9C Khalif Mohamed Abshir 	e5fde4bf-6630-4459-9d8e-31740b307c02
51954512-0767-4d9d-b15b-439329a27094	9C Kinturi Matias	e5fde4bf-6630-4459-9d8e-31740b307c02
f510b335-8874-49a7-b7a5-e0e1c68bf05c	9C Ormo Juuso	e5fde4bf-6630-4459-9d8e-31740b307c02
da006afb-aec4-4638-91e8-81bab1da0a69	9C Salmi Severi	e5fde4bf-6630-4459-9d8e-31740b307c02
deca6386-deb7-4ce1-a697-d43c08ebe017	9C Sutt Sebastian	e5fde4bf-6630-4459-9d8e-31740b307c02
d9ac630a-298d-422c-8d37-72fc3991857d	7-9F Jaakkola Andreas	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
1aa8b618-de8a-4a56-b1ef-33ea240f027b	7D Pham Tu (Jessie)	4c36484b-3244-47a9-a5e3-235c9474383e
\.


--
-- TOC entry 2610 (class 0 OID 32777)
-- Dependencies: 216
-- Data for Name: Teacher; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Teacher" (id, email, "passwordHash") FROM stdin;
13b24831-03f4-4d63-a030-c64c84e2f670	terve@email.com	$2a$12$e/uE87IovBWP6Hsqkud.Z.UfmZKbHo0KwfO1DMyHUkxilP64VlQfK
22fbd7c4-bfd8-478a-8b93-d0238132817e	joku@email.com	$2a$12$.o2FwNcx8anFBHsEVn0vDenshAegBAJ410CoZBclXPhCmgvMhO0Ni
fc78b20c-b2a5-4fde-b57b-529baa33852f	test@email.com	$2a$12$GlBFKuVn0T.bYu1.gQKO4uIe/W3vHCy26griorDHX.2MfsfV.wBEi
c881041e-3f38-4fce-abb8-b4e6b39bcf09	eke@email.com	$2a$12$81FXbi.uhliY1lSebcZdpOAM9eXlHo4XfMp/C7xewwabA8SjsWT3u
1b922f7e-e8ab-4da8-8db9-ef0ea31952ad	mikasip11@gmail.com	$2a$12$WZH3rRieC3naj8tllbha/.uTnCphG5pxJsNzMAImsA/stVA0ITOcq
e8c4ae6a-f17d-45fd-979e-8c157fad31d9	artte@gmail.com	$2a$12$CYMNjoMG7suVPoJFywViRuw3JRUmrZ78zQQBOV9xVkNR83Smvt.Xi
3c237367-e3d8-468c-9cbd-5636f746172f	leevelihuuskonen@gmail.com	$2a$12$RJfwY/S2u7Uui1a8XozHe.JSCxcBWIb5sFJLPFFVNepiebgsuUgPO
79b7aa21-42a6-4f6f-88f3-4cb7dceca9d9	ilmariaarela@gmail.com	$2a$12$Z6IJo5OB8otH4tbI/7V83O9IbhFvNtrp825B9MyKelj1.XjYx13Ae
9f9744c8-04f5-4342-805c-c6413de9b33b	test-user@email.com	$2a$12$QGYZDMjvzS8XnFJZLAOkFuVZ9POFc0YIw7FG9Sir12jarWDq5wS8u
\.


--
-- TOC entry 2616 (class 0 OID 32941)
-- Dependencies: 222
-- Data for Name: _ClassYearToStudent; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."_ClassYearToStudent" ("A", "B") FROM stdin;
34b47355-73a3-41ac-b8c3-3958b3602951	d49c17d9-50ee-4d08-8e32-ead9b47358d7
34b47355-73a3-41ac-b8c3-3958b3602951	11cd88f0-bd26-47c9-bd44-e928cc73941b
34b47355-73a3-41ac-b8c3-3958b3602951	5a026b03-52f6-4cb1-b282-f7ac2ea21048
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	06e78983-176e-4899-a198-238f9bdcd608
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	caa864dc-2238-45c3-a014-7dae91be7891
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	f695e8be-7103-4c28-a0ac-6f8a67cc44ad
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	63ac40cf-5435-4847-ab5e-9aa7f87be4c8
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	d11bfb03-737b-4674-885e-8106e7fcb822
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	fbfc259b-92b8-473a-be4c-af41872eb4ed
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	a68027c8-a6bd-4d50-90cc-337a7a4ce42f
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	8f91dadf-8cd4-49d2-8bbd-19f21997ccfd
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	7fb42188-30c7-4fe1-b71e-b34420d9fec1
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	180c7590-34fd-403c-9496-a1d8db4d7dba
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	d52a0745-d5ce-46c3-89f1-2a54007e7bde
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	be981090-64ab-412b-b619-781d00ba30eb
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	eb679a62-4942-4687-ae5e-41c051705198
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	67ea0653-c9ce-4392-aac0-7ef8f7c5ca26
7fc07f1e-01ff-4fe5-8496-25854a55a1a0	777a6529-5d2d-4037-a8d9-49721e37b6f7
cd281a47-18ce-4116-86a9-f365dd3e1fc7	5eafeddc-275c-4c4f-962e-b443a3bf2ee2
cd281a47-18ce-4116-86a9-f365dd3e1fc7	20268fbb-e566-41bd-9810-479fefa9eb52
cd281a47-18ce-4116-86a9-f365dd3e1fc7	5825695e-aceb-4172-82aa-f65f51e7da79
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	b3bd6d2e-1bf6-4f56-a561-806a2d11bd97
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	3e491af6-d9d3-47a5-bb80-9cf1bf9296de
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	bfe30e38-2410-419e-8e1a-57fc39ea5dff
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	21579927-936b-44ba-bb3d-3c81a17f2edf
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	e99ee5ed-2abf-4af9-8d8b-44c0cc187712
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	6ab3fb53-9ed8-4d3b-9b83-649673a18f8c
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	e0520bdb-0175-4c95-9eb6-7b821f291b84
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	3c8ea8e2-a3ee-403a-96e8-715d670e228c
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	ff5f5fb8-e156-4a1b-821a-d918a7b4f879
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	8c9e57f5-1dc1-4c32-9775-200315ee9ca7
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	5b4efcd1-784f-4d70-9d8a-39b3efe9252a
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	203c350a-f4ba-40d5-b3eb-08e8af216a15
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	32ed8751-d751-4481-a987-6cb4ec026395
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	3076b97b-4518-4fad-bf84-6c716330f5ca
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	2e7a1237-7f0c-46ac-bf32-df23571f0e82
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	baa4f222-d2f9-47f9-bfb6-7f52e03e1614
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	3fc922f0-3d2f-4d53-99e2-93e987a6e403
fed0465f-5ad1-4c94-bbfd-d5fef986ba85	b81ed4fb-93f6-4870-be6a-4e16d7040aa6
840989b6-a7ca-4476-bd1c-1d3d3cab99b9	b8e9dd6c-a10f-414e-8655-a7d18fb2fa29
840989b6-a7ca-4476-bd1c-1d3d3cab99b9	b72524ad-9c84-445c-828d-5a9b04e3a701
840989b6-a7ca-4476-bd1c-1d3d3cab99b9	dceed483-b8f9-4734-97c0-5555ea46617b
ef973513-7d3a-4cf3-abf7-2d2ca41ec8d2	7e60db96-e3c2-4472-beff-7a7e12b6e2db
ef973513-7d3a-4cf3-abf7-2d2ca41ec8d2	0e3d766a-e1f8-4148-b062-80909870809e
ef973513-7d3a-4cf3-abf7-2d2ca41ec8d2	5f71395c-6752-4bbe-adaf-e6d9fb947c46
ef973513-7d3a-4cf3-abf7-2d2ca41ec8d2	6536d176-9773-4dc7-908d-abf55f69f594
784bbcc6-bc85-4b9a-b308-19df8a26d68f	9084a92f-09d6-458e-99ad-86bb9155d321
784bbcc6-bc85-4b9a-b308-19df8a26d68f	68044dd4-1363-4868-a39f-ceef13aaa663
784bbcc6-bc85-4b9a-b308-19df8a26d68f	0d6ee227-afa5-4819-a125-9edcba8252da
784bbcc6-bc85-4b9a-b308-19df8a26d68f	072cff55-1fbd-4bdc-9d57-2b9c9f3f03a1
784bbcc6-bc85-4b9a-b308-19df8a26d68f	389c20f4-ae5a-4652-9cbc-92d3a37369a9
784bbcc6-bc85-4b9a-b308-19df8a26d68f	f71f9495-cc37-45ac-aab3-f76ab8a5a840
784bbcc6-bc85-4b9a-b308-19df8a26d68f	6a343998-c100-47ec-b3f2-65d1869dcf71
f2cb19af-b198-4e9d-b2c0-2945024848fb	b166c4db-80d0-410a-b948-9634e7c68efd
f2cb19af-b198-4e9d-b2c0-2945024848fb	82b20571-c15e-49d9-902a-b57316fad8c2
f2cb19af-b198-4e9d-b2c0-2945024848fb	77dee450-240b-4563-842a-b619aea8e612
f2cb19af-b198-4e9d-b2c0-2945024848fb	84fbffad-8a66-46a0-a308-6b186a11875e
56507bfa-ff4a-4e22-a7a0-d1086c587d45	ceccaf73-1e73-432c-9ad7-d2f9845b93ed
56507bfa-ff4a-4e22-a7a0-d1086c587d45	89930c8d-cdcb-484e-927d-688bbd096478
56507bfa-ff4a-4e22-a7a0-d1086c587d45	c79cac18-a6e3-41bd-a6a2-8e3b76631467
34b47355-73a3-41ac-b8c3-3958b3602951	1354e6ca-8716-440b-9012-24b76d7783c2
7481aede-c286-49ad-a2bd-2e036d70f0db	7b49606e-202a-408a-acd7-51bebabf18e0
7481aede-c286-49ad-a2bd-2e036d70f0db	83ed3567-3b8b-444c-8f44-934e9d6c15fb
e17aef4a-e022-4ed6-a646-663f9aa0815a	221c2623-db3b-491e-89fb-868ba2f1c16e
e17aef4a-e022-4ed6-a646-663f9aa0815a	19fb0b30-73ad-40a8-94a0-79ed12f571ea
e17aef4a-e022-4ed6-a646-663f9aa0815a	5e389aba-7b19-459b-ab9d-3fb8b4baa0f0
1fb061b2-60a7-4bbb-a6f1-52a6f00be3f7	e0ae99d3-2bd5-4308-a1b2-38484a93ce2c
1fb061b2-60a7-4bbb-a6f1-52a6f00be3f7	1ee41eb4-487b-4df0-ad3a-0f68b0b4ff3c
1fb061b2-60a7-4bbb-a6f1-52a6f00be3f7	f170822b-1dfb-4ae4-8bed-4478c43a63bc
1fb061b2-60a7-4bbb-a6f1-52a6f00be3f7	98b7a92a-261b-4d69-b949-09ff5c10d072
1fb061b2-60a7-4bbb-a6f1-52a6f00be3f7	8b8d40f8-3f62-4181-a35e-62aa49b2ce97
1fb061b2-60a7-4bbb-a6f1-52a6f00be3f7	017c47ee-d211-44d5-ba4b-24340713ad23
6b761a28-ed39-4e13-a51c-f4452e8756c3	79721f61-835e-44ab-8769-f79fe3c52ff1
6b761a28-ed39-4e13-a51c-f4452e8756c3	8117cf8b-a0ff-49e1-a2fa-4a18a2a1f03a
6b761a28-ed39-4e13-a51c-f4452e8756c3	860f1644-7f92-4a08-8fa7-8b345732ccc4
11455bcc-2381-45d9-aeac-ad4bb321eab9	77457577-1ab9-4dbb-8065-2ab12ece1a84
7bfd943e-c11d-458c-a010-48c84b8a6a43	ce193ad9-d314-4c7f-bdb6-908585b7fad0
b84acf3b-29a2-48a0-899c-8ea75f7920f2	689748d3-6df3-4578-ba76-9f081abb32c4
b84acf3b-29a2-48a0-899c-8ea75f7920f2	c2d546b1-48e3-45d8-a6dc-6042c118f2b8
b84acf3b-29a2-48a0-899c-8ea75f7920f2	b0fdc629-cd54-4a92-9827-472024663b28
b84acf3b-29a2-48a0-899c-8ea75f7920f2	cd357f8b-2fc9-489c-a3b2-a5850207d2d2
f6160571-beff-4c21-b3af-399f376429ae	7ebec83f-f17b-4770-a9af-ea290f26e168
f6160571-beff-4c21-b3af-399f376429ae	40a52df7-f50b-4105-b4d2-00e0b391156b
f6160571-beff-4c21-b3af-399f376429ae	6edb9c7d-338c-42b3-8bed-95c037398e1d
f6160571-beff-4c21-b3af-399f376429ae	0de6a87e-13a1-4713-988d-655e950c9fea
f6160571-beff-4c21-b3af-399f376429ae	76d7ba34-af4d-41e0-934a-63461dc3aeac
f6160571-beff-4c21-b3af-399f376429ae	9c95ce1a-b395-4179-9558-10abb9105fd0
f6160571-beff-4c21-b3af-399f376429ae	e2500f5c-1aea-4ffe-9f18-9b86022fce62
f6160571-beff-4c21-b3af-399f376429ae	92214907-4fe9-442f-9f35-c7b59f78e08a
f6160571-beff-4c21-b3af-399f376429ae	33ce32f8-0ac8-47f6-a2a9-f5aa880442f4
f6160571-beff-4c21-b3af-399f376429ae	e3e017a1-6c30-4320-8ccf-3b2b276e8128
f6160571-beff-4c21-b3af-399f376429ae	3cb1e21e-1338-4fac-8380-c69946fc26c6
f6160571-beff-4c21-b3af-399f376429ae	e1ceb28e-8139-41aa-bf55-3ef379c568ab
f6160571-beff-4c21-b3af-399f376429ae	72a94026-88ad-4cbb-b1e4-e6aa917db696
f6160571-beff-4c21-b3af-399f376429ae	5de52dab-1765-4acf-8020-053b68336487
f6160571-beff-4c21-b3af-399f376429ae	268e1a31-5cba-4861-8aae-7d38fb140f13
f6160571-beff-4c21-b3af-399f376429ae	0b357c38-9cda-428a-8a3b-0254143564df
f6160571-beff-4c21-b3af-399f376429ae	01ab146e-d9da-4562-a7dc-f3d151d4992b
f6160571-beff-4c21-b3af-399f376429ae	9fc6c35d-b42d-4594-a960-5836531c7282
f6160571-beff-4c21-b3af-399f376429ae	18ccbf25-0831-40e9-9145-602b9d17ed2c
f6160571-beff-4c21-b3af-399f376429ae	189e5ac6-f54b-4b10-ae14-ff92e63c3e5f
f6160571-beff-4c21-b3af-399f376429ae	39e44baf-d5a4-4a7b-85ba-8d9ef3dd9567
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	d0c101ca-4d6b-43c2-beb1-a4680f44dd5a
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	db6b1a3f-e485-4b8f-8a25-0a8e518a2026
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	95db6c22-a14c-4f47-b6c3-5ddffdbd933f
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	0025a5a3-6947-4d23-b100-bcd5a58c6e09
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	7e447ce6-5569-47f0-9000-20ae93a68bd3
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	971b8500-6c50-4f89-ab1e-f5219ccdef93
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	a3be9480-89da-4490-aad6-4507acd56e6c
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	c695adc1-a07a-4ebf-b99f-9714e4ab4bf7
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	2abacf8c-b973-4678-9504-e30861fdcba5
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	bdbdbd45-458b-41df-ba2f-ab5e4406bb26
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	e0562708-15b5-478a-8f5a-1863c55a6f38
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	8730fbfe-4cab-41db-8b7d-a750e3448184
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	52c3b46f-5204-40ad-9150-17b0a7077eed
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	0d894576-e308-4a66-a809-d8530eb5753e
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	e111c54d-9b2e-406b-aab4-e61fe921dbe2
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	7ac64248-1e14-4e88-ab15-a9a552d3811c
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	f4df5072-2986-4859-a7cc-6d06a6fe21ad
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	3cd7167d-e20f-4291-9e18-5241b854e116
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	1e7d2903-2e91-4fca-b77f-211821ad0b07
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	cd9d11c7-9b20-4243-b816-d3986f7e22ad
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	77793959-dc53-44d1-8cd5-ddbe3c4b25a4
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	5e4779f0-fad2-4f94-b350-e56b4c5f5471
cf7246cc-5760-499a-9252-c3d1bbcc79e8	d2bb5704-bed1-47cc-8879-681b17da4686
cf7246cc-5760-499a-9252-c3d1bbcc79e8	31a2c199-fb37-4e7c-afb7-2619cc4f8260
cf7246cc-5760-499a-9252-c3d1bbcc79e8	36f9a75d-23d0-4a2c-b6c0-e04cee9b1e26
cf7246cc-5760-499a-9252-c3d1bbcc79e8	25567d61-dd6a-4b36-a934-5f6894070674
cf7246cc-5760-499a-9252-c3d1bbcc79e8	3d4ca7fc-a3bc-46f5-b48e-eb549cdc4e2b
cf7246cc-5760-499a-9252-c3d1bbcc79e8	f3d70376-e85f-44c5-ae21-9c138e6c1663
cf7246cc-5760-499a-9252-c3d1bbcc79e8	de688b84-f770-47b6-9e15-3224c355d563
cf7246cc-5760-499a-9252-c3d1bbcc79e8	c177824f-0392-45e8-a26b-95cd21f3bbdb
cf7246cc-5760-499a-9252-c3d1bbcc79e8	aaf7140c-7da3-4882-b2a2-99b19054b43c
cf7246cc-5760-499a-9252-c3d1bbcc79e8	fa187771-3d5e-4cb5-81eb-342568b7e833
cf7246cc-5760-499a-9252-c3d1bbcc79e8	cd2ac37f-bba5-4131-8a91-20280bb9b26c
cf7246cc-5760-499a-9252-c3d1bbcc79e8	f44523a8-bbd2-442c-8305-0dd8fb3cea0b
cf7246cc-5760-499a-9252-c3d1bbcc79e8	a5fcc76a-56b1-4ed8-ba9d-5d62e20510d7
cf7246cc-5760-499a-9252-c3d1bbcc79e8	cf94a62d-ef7c-448b-9f61-16a9c6b90911
cf7246cc-5760-499a-9252-c3d1bbcc79e8	e1ee0c51-198d-441c-a0e3-cce4c418d122
cf7246cc-5760-499a-9252-c3d1bbcc79e8	9f715b18-4cd7-48ac-b927-f43f7c166538
cf7246cc-5760-499a-9252-c3d1bbcc79e8	69c689de-b305-43a9-a6e8-c65382e4e476
cf7246cc-5760-499a-9252-c3d1bbcc79e8	288da2c9-c807-4e5f-9f49-507f1cabc93e
cf7246cc-5760-499a-9252-c3d1bbcc79e8	918413c4-6838-4a64-b031-6d026f3ce183
cf7246cc-5760-499a-9252-c3d1bbcc79e8	4ac1e1d2-cafe-4171-a02a-773ae38292c9
cf7246cc-5760-499a-9252-c3d1bbcc79e8	d2430900-d731-43d5-ae88-a0166a7cfdde
cf7246cc-5760-499a-9252-c3d1bbcc79e8	1f768e05-8228-4b44-9288-7eae6b5b4686
cf7246cc-5760-499a-9252-c3d1bbcc79e8	d3433aa4-3325-4b9d-8d15-c4ebfdc7533b
cf7246cc-5760-499a-9252-c3d1bbcc79e8	a29cc6ca-adec-4a7e-8b7b-3a6261a709be
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	03397f36-f253-476a-a333-556ae179dbda
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	4e00db97-fd93-416f-a349-655a240056ae
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	e0c8876f-57f1-43dc-9950-3851d82380fe
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	28e533c4-faf3-4e9f-ac97-ea948c1b019a
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	775a7c76-dc4a-4849-baf1-d7f9080eaf89
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	02ea3a66-aa4a-420a-9334-f2b0941c564b
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	1dd2a92e-8754-4265-884f-db0a12b6a4c8
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	5e5f9c60-1c5e-43f6-97ff-6e6144ecf55f
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	b03cc979-7da3-4d75-b187-943264397b04
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	db1510ed-3bb6-4856-8ea9-5012eeb68192
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	cfea9e73-0c9f-433f-909a-a088c3931b8f
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	ffb872b2-2bb5-4267-8e92-0514977ba44b
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	e34d25fc-b0e2-48f1-8d86-77ce7464822e
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	05795f8f-d6de-4ec8-88fc-0df98df77292
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	de0b5abf-b8c5-4046-aaf7-f9bffc544ca4
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	0eba0b59-1564-4d93-a65c-d5aa57c2ba93
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	1aa8b618-de8a-4a56-b1ef-33ea240f027b
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	dccdded4-f3c3-4949-937a-cfd65fae056d
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	e7eb8c8a-033d-416a-848a-6da0d65cbf8e
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	241042e2-7fa6-413a-a501-ab6c28dd86e7
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	16530cbd-5612-4a8c-920c-9744e32be7bc
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	f18a8f1a-a17a-49da-8cc1-3603b4c21dc8
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	8cb49f42-d3d0-4a6a-9ac1-9569aed4991f
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	8a429230-9011-476a-9f6f-15494ecf57f2
45982a54-e42c-4e48-8b84-32689d592abd	4d9888c7-3be7-4fec-a5d7-07759cdff766
45982a54-e42c-4e48-8b84-32689d592abd	5c10a0b2-145a-4701-a64c-80a9369890a3
45982a54-e42c-4e48-8b84-32689d592abd	436f9966-c204-4794-89fa-e5e1a30b6247
45982a54-e42c-4e48-8b84-32689d592abd	8c057200-e725-4e08-b93c-88bd891fe862
45982a54-e42c-4e48-8b84-32689d592abd	ad4248b3-989a-4794-844e-af4cb598a1e7
45982a54-e42c-4e48-8b84-32689d592abd	61780abd-03a9-4ce4-89cc-059b5a2f5177
45982a54-e42c-4e48-8b84-32689d592abd	92eecb4d-b8c2-43ce-ac29-eb7a46566311
45982a54-e42c-4e48-8b84-32689d592abd	e17db94c-c058-4163-b1df-3824f2f732b8
45982a54-e42c-4e48-8b84-32689d592abd	139ee728-7bd5-4ed5-b88e-65e455770b9f
45982a54-e42c-4e48-8b84-32689d592abd	28bf177a-d273-4b22-963c-4206fcffa9cf
45982a54-e42c-4e48-8b84-32689d592abd	48f6a291-18c4-4349-8578-e9d40a016f99
45982a54-e42c-4e48-8b84-32689d592abd	d1c1ad1a-62d0-4d6b-bf48-2dead02ed1f6
45982a54-e42c-4e48-8b84-32689d592abd	e6537a2f-233d-4b11-8f1b-5a0814a675c0
45982a54-e42c-4e48-8b84-32689d592abd	6f8a2928-32c2-4e60-9c99-b8073fcd9d35
45982a54-e42c-4e48-8b84-32689d592abd	1a420969-4c65-4a34-bdc2-80e13ed51f0b
45982a54-e42c-4e48-8b84-32689d592abd	6e24ea61-532f-452b-865d-b67df86c48c4
45982a54-e42c-4e48-8b84-32689d592abd	3b6d04be-cd10-4e54-b5aa-28a67e8e2186
45982a54-e42c-4e48-8b84-32689d592abd	ec51a182-bf8d-436e-8704-b2d5cd897604
45982a54-e42c-4e48-8b84-32689d592abd	a8df8354-0125-404f-a1d8-5584462a5b82
45982a54-e42c-4e48-8b84-32689d592abd	c08c69f9-ef26-4f6a-95ee-455d176dfa61
640e87de-8063-4c00-9087-c17709e34059	1f12b19a-138f-4000-a576-c5dab30ec9e9
640e87de-8063-4c00-9087-c17709e34059	7c8f19ba-b172-40e7-8e9b-da74d07eb54a
640e87de-8063-4c00-9087-c17709e34059	f031aca9-7acb-43fa-9884-72547dac5709
640e87de-8063-4c00-9087-c17709e34059	2113c63e-c4a7-4e49-90a6-626646c3d949
640e87de-8063-4c00-9087-c17709e34059	c732359d-e9bd-44c3-aa2e-bd92bfb911c2
640e87de-8063-4c00-9087-c17709e34059	3eb15f99-938b-40e3-b16f-bce35248b3b8
640e87de-8063-4c00-9087-c17709e34059	e0357050-7b2a-4b32-87cf-af5747b17208
640e87de-8063-4c00-9087-c17709e34059	a09eec89-d6b8-4a66-b95d-356d800aaa8f
640e87de-8063-4c00-9087-c17709e34059	d202ea60-e678-49fd-8ecc-581cad6b508c
640e87de-8063-4c00-9087-c17709e34059	d4e6aa85-cd60-4901-bd59-413ee93a3314
640e87de-8063-4c00-9087-c17709e34059	13e7ba68-1fc6-4e4f-947a-0370f5aff61a
640e87de-8063-4c00-9087-c17709e34059	0fe083de-7bae-4fc1-815e-b4ead74b6a69
640e87de-8063-4c00-9087-c17709e34059	7a3453eb-b303-4944-9bfa-f7bfdde76864
640e87de-8063-4c00-9087-c17709e34059	9b2269f7-aba5-42f6-afab-ccfa7bc42585
640e87de-8063-4c00-9087-c17709e34059	23d41b74-018e-45f5-966c-c729188c1ca3
640e87de-8063-4c00-9087-c17709e34059	c0a2a247-d6f0-4e43-bfd7-79d01e4eb16c
640e87de-8063-4c00-9087-c17709e34059	848b881e-e506-4273-b778-61cd669267d2
999be80c-ff15-4515-ba2d-3f330319b986	c80a1da2-c657-4a2d-8ee3-55eaa6a3b1f9
999be80c-ff15-4515-ba2d-3f330319b986	74744cbc-e78c-48df-b758-713f9a81751e
999be80c-ff15-4515-ba2d-3f330319b986	634c3f80-8b4f-4c38-ac4e-937418ec9e8d
999be80c-ff15-4515-ba2d-3f330319b986	5ce6b918-bcba-4712-98c1-d891eec91168
999be80c-ff15-4515-ba2d-3f330319b986	a2216f2c-6ade-4f5a-a8c5-515f09bd4b08
999be80c-ff15-4515-ba2d-3f330319b986	b0aa13eb-dd72-4d41-9158-63ed22b2f65b
999be80c-ff15-4515-ba2d-3f330319b986	904493af-2f99-494c-8b42-5ebe4c1ae1b6
999be80c-ff15-4515-ba2d-3f330319b986	db8905a7-084f-4d92-af60-cf29824dabe7
999be80c-ff15-4515-ba2d-3f330319b986	fa71c8f8-45c8-4a24-b0fb-6a0ecd67af3c
999be80c-ff15-4515-ba2d-3f330319b986	fcabdea5-1224-442b-8142-62be862508e3
999be80c-ff15-4515-ba2d-3f330319b986	b580b35d-10c3-4ce3-9f87-37ce3a436eaf
999be80c-ff15-4515-ba2d-3f330319b986	f034aa91-48ff-496e-b25b-9c81eaaaa3e3
999be80c-ff15-4515-ba2d-3f330319b986	bf09f310-3700-49db-b3f3-384cd041e6f2
999be80c-ff15-4515-ba2d-3f330319b986	eb6a2d6e-33a5-4ad2-95ea-a39741e9b905
999be80c-ff15-4515-ba2d-3f330319b986	7df2a50b-b064-49a7-a5d5-747b117f107c
999be80c-ff15-4515-ba2d-3f330319b986	fe5ede8f-8290-4b69-b575-75aeaab46f2f
999be80c-ff15-4515-ba2d-3f330319b986	50d7ab1f-3cf2-4e10-9286-36df63a6e81b
999be80c-ff15-4515-ba2d-3f330319b986	7756327f-59aa-40f9-aa95-88889e4ea759
999be80c-ff15-4515-ba2d-3f330319b986	5e0e74f1-308a-4c20-bf9a-5011dff427d1
999be80c-ff15-4515-ba2d-3f330319b986	5f877b5d-eaeb-404c-b3cc-d51a467fa428
999be80c-ff15-4515-ba2d-3f330319b986	c5a69235-e2da-483a-b4d4-898fe3bd4c75
a6a42248-8033-4254-8b5d-ba325479414d	959e8e48-e3dc-4672-b263-cb8fcb8f3057
a6a42248-8033-4254-8b5d-ba325479414d	ac72adf3-79e8-4479-a81a-be13b2603b33
a6a42248-8033-4254-8b5d-ba325479414d	403d2ef2-23cd-437b-9688-43756e24a287
a6a42248-8033-4254-8b5d-ba325479414d	c71cbbc5-3ad5-4c1b-a751-616db7f95169
a6a42248-8033-4254-8b5d-ba325479414d	8585f583-e996-4173-acc7-e61b2992a3c3
a6a42248-8033-4254-8b5d-ba325479414d	ed8b008e-b272-4a8f-a28b-3e10943865d0
a6a42248-8033-4254-8b5d-ba325479414d	b924bdca-75a4-4049-978c-22b6d57a75ed
a6a42248-8033-4254-8b5d-ba325479414d	05d139e2-1d0d-44d0-9d55-8640833f9067
a6a42248-8033-4254-8b5d-ba325479414d	fe65a7a8-1054-4dce-a078-47e176bca0d3
a6a42248-8033-4254-8b5d-ba325479414d	3ff48490-fb0c-4328-8b8e-010efa10de13
a6a42248-8033-4254-8b5d-ba325479414d	394795ec-5959-4d19-9ee5-362213b77dee
a6a42248-8033-4254-8b5d-ba325479414d	476293ef-adda-4c53-9a52-f977cb79d14e
a6a42248-8033-4254-8b5d-ba325479414d	53394cde-fdca-44d6-bae2-9c928f2f23a0
a6a42248-8033-4254-8b5d-ba325479414d	89864582-b6ce-4434-97ee-14767b35e1d0
a6a42248-8033-4254-8b5d-ba325479414d	b7be5ecd-cc80-443f-8a6a-8125c91da527
a6a42248-8033-4254-8b5d-ba325479414d	1199e08d-681c-4104-b883-89ebd887d53e
a6a42248-8033-4254-8b5d-ba325479414d	fb382ba6-005a-42a0-9882-9735de457bc0
a6a42248-8033-4254-8b5d-ba325479414d	1d0f2b30-e376-4890-86af-e2585b65ee33
a6a42248-8033-4254-8b5d-ba325479414d	8fc516e0-c5ba-4181-a5cd-01f85629b4ac
a6a42248-8033-4254-8b5d-ba325479414d	41dbd3de-0883-454d-baaf-7613476052f3
a6a42248-8033-4254-8b5d-ba325479414d	5092be97-7e39-4aa6-bd2a-a517b48ff540
a6a42248-8033-4254-8b5d-ba325479414d	264fe413-3243-45aa-809a-0f752bce3b4a
a6a42248-8033-4254-8b5d-ba325479414d	71f99d4c-e3e1-4c88-af9f-2641131f3422
fd028225-16dd-4d8e-8c86-a81a9d9243e5	df5032e6-8740-4c54-a869-03e11dab715e
fd028225-16dd-4d8e-8c86-a81a9d9243e5	79171cdb-2833-4e72-bbf7-504cd4304ed1
fd028225-16dd-4d8e-8c86-a81a9d9243e5	9aaed25e-67f8-4d9d-ab09-96d4607a98a7
fd028225-16dd-4d8e-8c86-a81a9d9243e5	0786da40-e26b-439b-8300-4d5915d038c4
fd028225-16dd-4d8e-8c86-a81a9d9243e5	d63a461f-521c-4430-8e64-c4a05a9d6114
fd028225-16dd-4d8e-8c86-a81a9d9243e5	75c425cd-2ba2-433d-a0b1-cfaca6290abd
fd028225-16dd-4d8e-8c86-a81a9d9243e5	892e5773-39a1-4412-84cc-c219683ca4f9
fd028225-16dd-4d8e-8c86-a81a9d9243e5	b5e44718-3033-432f-83a9-81edc4a14d47
fd028225-16dd-4d8e-8c86-a81a9d9243e5	91a52f1d-e774-4925-8a10-9f5d7d7995fc
fd028225-16dd-4d8e-8c86-a81a9d9243e5	ae1feef0-be68-422a-8522-98700c2bd931
fd028225-16dd-4d8e-8c86-a81a9d9243e5	a56a92a5-893f-4de0-af0a-e764be900502
fd028225-16dd-4d8e-8c86-a81a9d9243e5	82cd71ff-8e57-44ab-829f-f296a2929585
fd028225-16dd-4d8e-8c86-a81a9d9243e5	d08c6dc6-1dc2-4a86-af3c-22e920af695e
fd028225-16dd-4d8e-8c86-a81a9d9243e5	b71238b6-1cfd-41c1-92dd-fae83e40bea6
fd028225-16dd-4d8e-8c86-a81a9d9243e5	e5032b31-071d-4ac1-a61e-f341a7170084
fd028225-16dd-4d8e-8c86-a81a9d9243e5	35c11fca-684d-4018-bbe6-ff17c59a80d2
fd028225-16dd-4d8e-8c86-a81a9d9243e5	f5051172-84d5-4fbc-bca0-e4d808fa36f3
fd028225-16dd-4d8e-8c86-a81a9d9243e5	498d994f-bb8a-4e31-8451-79c4519c6541
fd028225-16dd-4d8e-8c86-a81a9d9243e5	9549b80b-fa32-4340-98fb-f827e29982ee
fd028225-16dd-4d8e-8c86-a81a9d9243e5	20f182b2-d260-4286-a228-80f03a83d6d5
fd028225-16dd-4d8e-8c86-a81a9d9243e5	a678e014-275a-4fc3-96dd-0d356b8b84e3
61dc37a4-b86f-4563-8fca-37aad69a1f05	789cb197-e7fc-43dc-b4bf-99fa339f92b4
61dc37a4-b86f-4563-8fca-37aad69a1f05	abb97912-4c5e-4cec-b3e7-d1d840be7e81
61dc37a4-b86f-4563-8fca-37aad69a1f05	9573f6aa-4bd6-4bf6-b320-1ee6b5ba8edb
61dc37a4-b86f-4563-8fca-37aad69a1f05	f30953fb-1f87-41c5-b6f1-b9dbc28825ed
61dc37a4-b86f-4563-8fca-37aad69a1f05	d8d038a9-73b4-4ae5-8a92-88ed3edde4fe
61dc37a4-b86f-4563-8fca-37aad69a1f05	eb053966-13fe-4afb-996f-d6646db325e4
61dc37a4-b86f-4563-8fca-37aad69a1f05	1242a7b5-d53d-4cd5-ae38-f65402ecf98d
61dc37a4-b86f-4563-8fca-37aad69a1f05	e8b17234-4ce5-4c04-9507-ef785e100d73
61dc37a4-b86f-4563-8fca-37aad69a1f05	7993aaf7-401e-4bef-b8c2-185aefd95344
61dc37a4-b86f-4563-8fca-37aad69a1f05	0bd6f7ee-7d70-4a7b-9342-0e0d7b6548f7
61dc37a4-b86f-4563-8fca-37aad69a1f05	51954512-0767-4d9d-b15b-439329a27094
61dc37a4-b86f-4563-8fca-37aad69a1f05	f510b335-8874-49a7-b7a5-e0e1c68bf05c
61dc37a4-b86f-4563-8fca-37aad69a1f05	da006afb-aec4-4638-91e8-81bab1da0a69
61dc37a4-b86f-4563-8fca-37aad69a1f05	deca6386-deb7-4ce1-a697-d43c08ebe017
640e87de-8063-4c00-9087-c17709e34059	d9ac630a-298d-422c-8d37-72fc3991857d
\.


--
-- TOC entry 2609 (class 0 OID 32768)
-- Dependencies: 215
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
f5a64fc9-28b6-4917-b69a-e6a00dfd8b3c	b379deefa4a67298b58446847420bf02ba0226020e98e6b4a9c00b375607695e	2023-05-21 09:51:41.420364+00	20230223160957_init	\N	\N	2023-05-21 09:51:41.311263+00	1
1b287171-cbd8-4007-bc74-3e1307d3f468	f7485e40c39b9e0f40cd56b18442ee8cc75a2e810a5df0c0cf9c763b9dcace0e	2023-05-21 09:51:43.046362+00	20230419112352_add_class_year	\N	\N	2023-05-21 09:51:42.938475+00	1
7b0985b1-9298-458c-9bfa-c11ec12f906d	fa370045669a4054a9e149925c28622620a919bd08890c3ba8ea1f0c4a04013f	2023-05-21 09:51:41.538955+00	20230223161150_description_and_notes_optional	\N	\N	2023-05-21 09:51:41.45416+00	1
792b62bb-b4c1-4546-8c13-13d83b35fd47	df9edb7f62c2956fe0145a4c64b97406dc37963ddc83a621bb9c17a58fcd5589	2023-05-21 09:51:41.657944+00	20230224201012_make_ratings_voluntary	\N	\N	2023-05-21 09:51:41.572478+00	1
a4481180-a40b-40b2-ae08-e077b268be97	5824d8b8ef722b39ebe6f424437133c7b19ffdcdb7fc7685622fe65baf087c1c	2023-05-21 09:51:41.779842+00	20230225084447_add_password_hash	\N	\N	2023-05-21 09:51:41.691907+00	1
36de5ce9-221f-43db-a18a-db54c5cbb5d8	0c922af221ad21eb6bfdfacf425d3f273f986bdf0ca465cdb57412fd33dffec2	2023-05-21 09:51:43.165564+00	20230420083910_fix_add_class_year_conflicts	\N	\N	2023-05-21 09:51:43.08013+00	1
83c473b6-65f3-43ed-b782-a15e578c2eb7	1c1cc8d4615292758155c01c061621566a575e6419f46d7e6889c93a6c98eeb6	2023-05-21 09:51:41.901959+00	20230304073408_add_cascade_deletes	\N	\N	2023-05-21 09:51:41.815347+00	1
2ad30a6c-50f1-40e1-bbc6-2c8fede446b2	0b75b4a387d5460641f545e5842fa4bc854b45eaf0351575ad2b8e9ae669718e	2023-05-21 09:51:42.021451+00	20230304085742_add_was_present_field	\N	\N	2023-05-21 09:51:41.935788+00	1
80804c09-85f1-4c40-b54e-ea0ce8015776	a78677f335a0106da3ffaa51c476a53bdb0815d25f5597b848b145e5a151caa9	2023-05-21 09:51:42.145417+00	20230305084352_rating_enum	\N	\N	2023-05-21 09:51:42.055335+00	1
b56d717d-c9b4-4448-a9fe-b59a81c25b43	9c6a796341388e90bd33795338158836c5daaddf87c4b37d9b571b857befecf8	2023-05-21 09:51:43.288724+00	20230420091646_fix_eight_class_code	\N	\N	2023-05-21 09:51:43.199168+00	1
1f671451-6c8d-420e-96b5-216c1b621590	8bbbb46544a7fc9e118d5a89e7904b9bbf0ab68754419f304124f37b2b264025	2023-05-21 09:51:42.274102+00	20230305175639_add_great_rating	\N	\N	2023-05-21 09:51:42.183679+00	1
1e4c2771-50d2-4625-9cdf-56598508cc41	bcfcf4daff679c29e232ad994388150180ef0bc13cb5a92057e13358a0a84ab2	2023-05-21 09:51:42.400528+00	20230307152132_rename_class_to_group	\N	\N	2023-05-21 09:51:42.307728+00	1
74855edb-ab28-407f-b6b8-6409f594e5c5	e4c5a98596ef886aaa9f8240ee974ca9668d312151eddfd24cc5efa1b572f3b4	2023-05-21 09:51:42.531548+00	20230312151119_cascade_student_delete_to_evaluationt	\N	\N	2023-05-21 09:51:42.437926+00	1
0ec0f471-a50c-4020-af4f-2491af662ae4	07ac29988ecc2be12ee40c61aa0baeadcf8ca7ccb16c3ff0287da7c1abb795d8	2023-05-21 09:51:43.409603+00	20230420101930_remove_group_collection_relation	\N	\N	2023-05-21 09:51:43.322129+00	1
794d2352-164d-4db5-a543-ea9869d089c6	e98b093364209042095842e5a7af79c98a7370a55fdbc99e364f1c87e017f678	2023-05-21 09:51:42.651105+00	20230330144633_add_updated_at_to_group	\N	\N	2023-05-21 09:51:42.564887+00	1
41b49a64-e98d-4920-a2a4-b9b32abb5ffb	ac52be372ee64c1433dd367b4a69d2950c982b8443386f140e938cc9dab46f77	2023-05-21 09:51:42.779851+00	20230409081404_add_subject_and_environment_fields	\N	\N	2023-05-21 09:51:42.685705+00	1
73d02a1b-7eb4-4659-9ad6-2d909e179083	6435ed345fe6ed5fabfe828d42083e5375ed570fdde861115d69fba4c2b1ce70	2023-05-21 09:51:42.904536+00	20230409081844_	\N	\N	2023-05-21 09:51:42.818343+00	1
3bf0a8b5-fbe8-4178-83e7-b4351441d36a	1e1a2d27c8976ca8460364775753729052b7bfd6279ee25030a23458485b35a3	2023-05-21 09:51:43.535289+00	20230422075622_add_learning_objectives	\N	\N	2023-05-21 09:51:43.449664+00	1
a347ee00-d1b7-48c2-aa35-8be4e33fed73	bf42af5126eec814dae41af5fcfae095f3c3e200f7cb59cd20f148657fed43a5	2023-05-21 09:51:43.658381+00	20230428104824_add_is_stellar_field	\N	\N	2023-05-21 09:51:43.57237+00	1
9f2fe557-2083-475e-baf0-bd89d50c5e3c	562dd89e9b5f87d8136e42da2d3bd9c88835d978fb9ceb12dc2850077e66f525	2023-07-29 12:12:07.723033+00	20230729120240_add_failed_and_passable_to_rating	\N	\N	2023-07-29 12:12:07.62112+00	1
e5d890fe-de57-417a-9501-d9dfa9179291	8d7a41e5392215de7be93b31c88a59d46dd0c55a187dbff8f40b4190993de164	2023-08-10 08:29:48.549998+00	20230810063517_add_archived_field_to_group	\N	\N	2023-08-10 08:29:48.412445+00	1
\.


--
-- TOC entry 2456 (class 2606 OID 32939)
-- Name: ClassYear ClassYear_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ClassYear"
    ADD CONSTRAINT "ClassYear_pkey" PRIMARY KEY (id);


--
-- TOC entry 2450 (class 2606 OID 32798)
-- Name: EvaluationCollection EvaluationCollection_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EvaluationCollection"
    ADD CONSTRAINT "EvaluationCollection_pkey" PRIMARY KEY (id);


--
-- TOC entry 2452 (class 2606 OID 32805)
-- Name: Evaluation Evaluation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_pkey" PRIMARY KEY (id);


--
-- TOC entry 2448 (class 2606 OID 32790)
-- Name: Group Group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_pkey" PRIMARY KEY (id);


--
-- TOC entry 2454 (class 2606 OID 32812)
-- Name: Student Student_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY (id);


--
-- TOC entry 2446 (class 2606 OID 32783)
-- Name: Teacher Teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY (id);


--
-- TOC entry 2443 (class 2606 OID 32776)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 2444 (class 1259 OID 32813)
-- Name: Teacher_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Teacher_email_key" ON public."Teacher" USING btree (email);


--
-- TOC entry 2457 (class 1259 OID 32946)
-- Name: _ClassYearToStudent_AB_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "_ClassYearToStudent_AB_unique" ON public."_ClassYearToStudent" USING btree ("A", "B");


--
-- TOC entry 2458 (class 1259 OID 32947)
-- Name: _ClassYearToStudent_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_ClassYearToStudent_B_index" ON public."_ClassYearToStudent" USING btree ("B");


--
-- TOC entry 2464 (class 2606 OID 32948)
-- Name: ClassYear ClassYear_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ClassYear"
    ADD CONSTRAINT "ClassYear_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."Group"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2460 (class 2606 OID 32953)
-- Name: EvaluationCollection EvaluationCollection_classYearId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EvaluationCollection"
    ADD CONSTRAINT "EvaluationCollection_classYearId_fkey" FOREIGN KEY ("classYearId") REFERENCES public."ClassYear"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2461 (class 2606 OID 32849)
-- Name: Evaluation Evaluation_evaluationCollectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_evaluationCollectionId_fkey" FOREIGN KEY ("evaluationCollectionId") REFERENCES public."EvaluationCollection"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2462 (class 2606 OID 32881)
-- Name: Evaluation Evaluation_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2459 (class 2606 OID 32839)
-- Name: Group Group_teacherId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES public."Teacher"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2463 (class 2606 OID 32876)
-- Name: Student Student_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."Group"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2465 (class 2606 OID 32958)
-- Name: _ClassYearToStudent _ClassYearToStudent_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ClassYearToStudent"
    ADD CONSTRAINT "_ClassYearToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES public."ClassYear"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2466 (class 2606 OID 32963)
-- Name: _ClassYearToStudent _ClassYearToStudent_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ClassYearToStudent"
    ADD CONSTRAINT "_ClassYearToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2023-08-22 19:46:27 EEST

--
-- PostgreSQL database dump complete
--

