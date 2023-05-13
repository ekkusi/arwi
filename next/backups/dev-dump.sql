--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Homebrew)

-- Started on 2023-04-20 11:35:32 EEST

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

ALTER TABLE IF EXISTS ONLY public."Student" DROP CONSTRAINT IF EXISTS "Student_groupId_fkey";
ALTER TABLE IF EXISTS ONLY public."Group" DROP CONSTRAINT IF EXISTS "Group_teacherId_fkey";
ALTER TABLE IF EXISTS ONLY public."Evaluation" DROP CONSTRAINT IF EXISTS "Evaluation_studentId_fkey";
ALTER TABLE IF EXISTS ONLY public."Evaluation" DROP CONSTRAINT IF EXISTS "Evaluation_evaluationCollectionId_fkey";
ALTER TABLE IF EXISTS ONLY public."EvaluationCollection" DROP CONSTRAINT IF EXISTS "EvaluationCollection_groupId_fkey";
DROP INDEX IF EXISTS public."Teacher_email_key";
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public."Teacher" DROP CONSTRAINT IF EXISTS "Teacher_pkey";
ALTER TABLE IF EXISTS ONLY public."Student" DROP CONSTRAINT IF EXISTS "Student_pkey";
ALTER TABLE IF EXISTS ONLY public."Group" DROP CONSTRAINT IF EXISTS "Group_pkey";
ALTER TABLE IF EXISTS ONLY public."Evaluation" DROP CONSTRAINT IF EXISTS "Evaluation_pkey";
ALTER TABLE IF EXISTS ONLY public."EvaluationCollection" DROP CONSTRAINT IF EXISTS "EvaluationCollection_pkey";
DROP TABLE IF EXISTS public._prisma_migrations;
DROP TABLE IF EXISTS public."Teacher";
DROP TABLE IF EXISTS public."Student";
DROP TABLE IF EXISTS public."Group";
DROP TABLE IF EXISTS public."EvaluationCollection";
DROP TABLE IF EXISTS public."Evaluation";
DROP TYPE IF EXISTS public."Rating";
--
-- TOC entry 857 (class 1247 OID 25520)
-- Name: Rating; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Rating" AS ENUM (
    'POOR',
    'FAIR',
    'GOOD',
    'EXCELLENT',
    'GREAT'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16484)
-- Name: Evaluation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Evaluation" (
    id text NOT NULL,
    "studentId" text NOT NULL,
    notes text,
    "evaluationCollectionId" text NOT NULL,
    "wasPresent" boolean DEFAULT true NOT NULL,
    "skillsRating" public."Rating",
    "behaviourRating" public."Rating"
);


--
-- TOC entry 217 (class 1259 OID 16476)
-- Name: EvaluationCollection; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EvaluationCollection" (
    id text NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type text NOT NULL,
    description text,
    "groupId" text NOT NULL,
    "environmentCode" text NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 16469)
-- Name: Group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Group" (
    id text NOT NULL,
    name text NOT NULL,
    "teacherId" text NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "subjectCode" text NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 16491)
-- Name: Student; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Student" (
    id text NOT NULL,
    name text NOT NULL,
    "groupId" text NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 16462)
-- Name: Teacher; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Teacher" (
    id text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL
);


--
-- TOC entry 214 (class 1259 OID 16453)
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
-- TOC entry 3367 (class 0 OID 16484)
-- Dependencies: 218
-- Data for Name: Evaluation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Evaluation" (id, "studentId", notes, "evaluationCollectionId", "wasPresent", "skillsRating", "behaviourRating") FROM stdin;
eba6d961-923f-4ab8-9fcf-803fd008c26f	1fb19977-06e3-4b97-9e19-843fb8115514	\N	f1aef52b-f653-4897-af88-6b49427b0481	t	GOOD	GREAT
384736cd-0194-41c9-8f96-b712eea4cff8	631c328d-b98a-4e60-a3c8-08122b60302a	\N	f1aef52b-f653-4897-af88-6b49427b0481	t	GREAT	GREAT
5f87d6e1-11bc-42da-892c-9afea11463d8	39a7cc68-cf8a-4a3c-a301-3c579d8ab68a	Uusia huomioita Matille	f1aef52b-f653-4897-af88-6b49427b0481	f	GOOD	GREAT
80bd2e51-7929-4213-b32b-de793e7cca84	ce7c40d0-5372-4b0b-88ce-9b94fabdc424	Huomioita	f1aef52b-f653-4897-af88-6b49427b0481	t	GREAT	GREAT
88e87490-90c8-445c-96ac-f34eaca418a6	d2af8e38-e557-4a9c-8e29-c772492606aa	\N	1c663a86-7eac-4f8f-bf15-84ab83f59485	t	GREAT	GOOD
d79ce95a-4db5-4b44-aea1-04ea6784f559	1a3ce7b5-74af-46a2-9092-cc0c262ee980	\N	cc917c19-aaf1-462b-9e9b-06c49c0c8980	t	GOOD	GOOD
288a06c0-2b52-4e3d-a3a5-96b14540f2bf	28c45610-171f-4141-8cb4-e6296ef10c51	\N	cc917c19-aaf1-462b-9e9b-06c49c0c8980	f	\N	\N
436e75a9-a53d-4804-aced-de8d3a8edbc0	d2af8e38-e557-4a9c-8e29-c772492606aa	\N	cc917c19-aaf1-462b-9e9b-06c49c0c8980	t	FAIR	GOOD
00d21be1-9ca2-46a7-9966-5dd7c2f5230d	1e125949-c5d1-4b2a-946f-f0c2863823e9	\N	cc917c19-aaf1-462b-9e9b-06c49c0c8980	f	\N	\N
220da093-550a-4047-bb31-3dea3d93f9d4	d2be36c4-e6d0-42e7-a8dc-a108f0c2ddb5	\N	cc917c19-aaf1-462b-9e9b-06c49c0c8980	t	GOOD	GREAT
2ec164c4-0ee9-46c6-ae0f-47dfe5c1fbd3	6daf6655-93a9-41b8-a22b-8ae11924f4d8	\N	cc917c19-aaf1-462b-9e9b-06c49c0c8980	f	\N	\N
7c1268e4-314e-4c38-8bbb-380c6d2e8dc8	e229a33d-fae2-4569-b56a-a5d3225a850a	\N	cc917c19-aaf1-462b-9e9b-06c49c0c8980	t	GREAT	GREAT
b3200fc0-6900-418d-9e72-4bdd2d72badd	8798a05d-6d5f-496f-bf43-46ad49086110	\N	cc917c19-aaf1-462b-9e9b-06c49c0c8980	f	\N	\N
939d316b-ef2e-4f88-9acd-d62d59c825e3	ce7c40d0-5372-4b0b-88ce-9b94fabdc424	\N	4f8c9e0c-4855-46ab-bb53-523d6574b17e	t	GREAT	GREAT
372ba66c-3e9d-4527-87b0-ace177849f07	1fb19977-06e3-4b97-9e19-843fb8115514	Ja pekalle huomioita käsin kirjotettuna	4f8c9e0c-4855-46ab-bb53-523d6574b17e	t	GOOD	FAIR
281a558d-70e8-4d93-8f47-9ec923ffdd3a	631c328d-b98a-4e60-a3c8-08122b60302a	\N	4f8c9e0c-4855-46ab-bb53-523d6574b17e	t	FAIR	GOOD
58127c81-c679-46f3-9351-848bef7b14f9	39a7cc68-cf8a-4a3c-a301-3c579d8ab68a	Matille vähän huomioita Terve terve	4f8c9e0c-4855-46ab-bb53-523d6574b17e	t	GOOD	GOOD
9ddf9f7d-57fa-407c-b489-5e39d65963c7	89e9ab33-9a0b-4a22-9951-a44f9f715f4f	\N	28c86132-d892-4676-b807-10b9f6460c78	t	\N	\N
ca5eb17d-7a6a-4b0d-b2b0-34220cf6218b	341a0f48-42b8-446e-a8f1-7a30faa0d1b1	\N	28c86132-d892-4676-b807-10b9f6460c78	t	\N	\N
4dc53bd0-5be3-4623-80c7-7989574de561	ce7c40d0-5372-4b0b-88ce-9b94fabdc424	\N	7f0b3ee8-7875-4883-9147-24c1a6578dbf	t	\N	\N
03a6c6a8-c2e1-4ccb-9162-7580cb78df4c	39a7cc68-cf8a-4a3c-a301-3c579d8ab68a	\N	7f0b3ee8-7875-4883-9147-24c1a6578dbf	t	\N	\N
63162194-2e58-4102-9a76-7d3fe8592ef7	1fb19977-06e3-4b97-9e19-843fb8115514	\N	7f0b3ee8-7875-4883-9147-24c1a6578dbf	f	\N	\N
2934ac6f-8807-4b8b-a9c1-2968f56a6931	631c328d-b98a-4e60-a3c8-08122b60302a	\N	7f0b3ee8-7875-4883-9147-24c1a6578dbf	t	\N	\N
038c38ef-f8ab-433a-8536-44b8012fd7b1	39a7cc68-cf8a-4a3c-a301-3c579d8ab68a	\N	4f49c9f2-b1be-476b-9e42-2730cf634239	f	\N	\N
92d834cb-a9bc-4aee-bc39-7e33d41246e0	1fb19977-06e3-4b97-9e19-843fb8115514	\N	aff3a5c9-d739-4285-9a6c-b712803dec58	t	GOOD	GREAT
714dd1bd-e85d-4ff9-98bb-77586f9b4017	39a7cc68-cf8a-4a3c-a301-3c579d8ab68a	\N	aff3a5c9-d739-4285-9a6c-b712803dec58	t	GOOD	GREAT
8585f11e-f363-4760-86f8-63a6b8a08478	ce7c40d0-5372-4b0b-88ce-9b94fabdc424	\N	aff3a5c9-d739-4285-9a6c-b712803dec58	t	GOOD	\N
2bef0af7-6390-470f-a434-b0ec0cda47ee	631c328d-b98a-4e60-a3c8-08122b60302a	\N	aff3a5c9-d739-4285-9a6c-b712803dec58	t	GOOD	GREAT
0e643149-a1ce-4a73-9e9c-d43990e2816c	d2af8e38-e557-4a9c-8e29-c772492606aa	\N	f018f095-e490-42c5-8b16-20e67a471bce	t	GOOD	GREAT
52171988-d5c9-44a3-9b76-eca11247e396	631c328d-b98a-4e60-a3c8-08122b60302a	\N	4f49c9f2-b1be-476b-9e42-2730cf634239	t	\N	\N
bfbd339e-13c4-4ffc-9a45-55631040ea09	1fb19977-06e3-4b97-9e19-843fb8115514	Jotain	4f49c9f2-b1be-476b-9e42-2730cf634239	t	GOOD	GREAT
8837de36-f104-4a0e-a7b2-3f8b7671d02f	ce7c40d0-5372-4b0b-88ce-9b94fabdc424	Huomioita	4f49c9f2-b1be-476b-9e42-2730cf634239	t	GOOD	GREAT
44066d30-53ff-4664-b61e-2ed792f43294	1e125949-c5d1-4b2a-946f-f0c2863823e9	\N	f018f095-e490-42c5-8b16-20e67a471bce	t	\N	\N
0b18d547-a0e8-4f57-9e62-3f4ddad5a8aa	28c45610-171f-4141-8cb4-e6296ef10c51	\N	f018f095-e490-42c5-8b16-20e67a471bce	t	\N	\N
5568aaf3-63cf-48d0-ab5a-342431731768	6daf6655-93a9-41b8-a22b-8ae11924f4d8	\N	f018f095-e490-42c5-8b16-20e67a471bce	f	\N	\N
f97727be-6b9e-494d-9c14-05268777d532	8798a05d-6d5f-496f-bf43-46ad49086110	\N	f018f095-e490-42c5-8b16-20e67a471bce	f	\N	\N
863d8337-9917-4a87-82e5-0afec18a970a	e229a33d-fae2-4569-b56a-a5d3225a850a	\N	f018f095-e490-42c5-8b16-20e67a471bce	f	\N	\N
b9b277c7-1ddb-417d-867c-8df0324262d0	d2be36c4-e6d0-42e7-a8dc-a108f0c2ddb5	\N	f018f095-e490-42c5-8b16-20e67a471bce	f	\N	\N
34daeaec-0898-4461-b238-0040962a2e07	1a3ce7b5-74af-46a2-9092-cc0c262ee980	\N	f018f095-e490-42c5-8b16-20e67a471bce	f	\N	\N
23a0fa87-8877-49d3-b965-551cf42a048c	89e9ab33-9a0b-4a22-9951-a44f9f715f4f	\N	a0446bc5-12b3-4009-8306-c79aab7129a6	t	\N	\N
63210a0c-002a-4f60-abd8-785721765fb5	341a0f48-42b8-446e-a8f1-7a30faa0d1b1	\N	a0446bc5-12b3-4009-8306-c79aab7129a6	t	GOOD	GREAT
cd551c24-6712-4878-949b-6a5d2dd32957	89e9ab33-9a0b-4a22-9951-a44f9f715f4f	\N	dce9d4e8-ca92-4fee-ade5-e72c7a9f7540	t	GOOD	GOOD
1be583b2-14b6-4409-9007-9e70b0f51a4f	341a0f48-42b8-446e-a8f1-7a30faa0d1b1	\N	dce9d4e8-ca92-4fee-ade5-e72c7a9f7540	t	GOOD	FAIR
9134e74c-2ed0-4c89-ac89-2be41acae5b6	955ea302-092f-4836-9c59-a491c4a41c42	Teppo osallistui sählynpeluuseen sisällä salissa. Hänellä oli vaikeuksia pallon käsittelyssä aluksi, mutta paransi otettaan pelin edetessä. Hän kannusti joukkuetovereitaan ja pelasi reilusti.	ef04a024-da0e-4552-890f-db5d83fa0c84	t	FAIR	GOOD
b6955da5-ee86-40e1-8c08-457e9b5cfc33	955ea302-092f-4836-9c59-a491c4a41c42	Teppo osallistui retkeilyyn metsässä. Hän käveli 10 kilometrin lenkin metsäpolkuja pitkin, mutta väsyi hieman loppua kohti. Hän ihasteli kaunista luontoa ja jaksoi silti hymyillä.	9be4600c-3d6d-455d-94c7-8559183bac9c	t	FAIR	GREAT
46a6608a-0213-4fda-89d6-6f88b2861f4d	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Tanssi ei sujunut tänään kovin hyvin. Matti ei pysynyt rytmissä ja tanssi liian nopeasti.	2caa116a-af30-44a8-ac27-2262396b7e73	t	POOR	\N
5f88d5dd-e869-4a12-87d3-94a5cec27d5e	e79219a8-f48d-4331-87c0-30ccbf4f94fb	\N	0e302301-4ff0-4c98-9e95-bb28617568b6	f	\N	\N
1fb8ac1f-840e-4819-81ed-764cde92e43a	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa juoksi peruskestävyystreenin aikana, mutta hänellä oli vaikeuksia mäkien kanssa. Hän pysyi kuitenkin positiivisena ja jatkoi yrittämistä.	671b2652-2253-4c80-981c-1c44267b2ff0	t	FAIR	GOOD
28c88420-ed6c-4646-b0e8-8a1d9e199159	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa nautti lenkkeilystä luonnonkauniilla polulla ja jakoi mielenkiintoisia havaintojaan maisemista muiden kanssa. Hän oli hyvässä kunnossa koko lenkin ajan.	a650569c-0401-4186-9d0c-540a392b5372	t	GOOD	EXCELLENT
5dbc9614-13c6-400a-bbb8-f8b12c16869b	d2be36c4-e6d0-42e7-a8dc-a108f0c2ddb5	\N	1c663a86-7eac-4f8f-bf15-84ab83f59485	f	\N	\N
229cb35f-8bf3-4cba-a638-8773567baffe	1a3ce7b5-74af-46a2-9092-cc0c262ee980	\N	1c663a86-7eac-4f8f-bf15-84ab83f59485	f	\N	\N
5cebca0c-32aa-4a21-98d6-3580d1d4536f	e229a33d-fae2-4569-b56a-a5d3225a850a	\N	1c663a86-7eac-4f8f-bf15-84ab83f59485	f	\N	\N
d6dff8e9-8e05-46a1-a6b4-e25a8f0e9ff4	28c45610-171f-4141-8cb4-e6296ef10c51	\N	1c663a86-7eac-4f8f-bf15-84ab83f59485	t	GREAT	EXCELLENT
9d6616fa-76ae-4cdd-b058-b2de0b29d48f	6daf6655-93a9-41b8-a22b-8ae11924f4d8	Huomioita...\n	1c663a86-7eac-4f8f-bf15-84ab83f59485	f	\N	\N
066ddbb9-b600-423d-8c0f-735efcbddca9	1e125949-c5d1-4b2a-946f-f0c2863823e9	\N	1c663a86-7eac-4f8f-bf15-84ab83f59485	t	GOOD	GREAT
8a9662be-43d8-4567-ac23-fed951bfe9e9	28c45610-171f-4141-8cb4-e6296ef10c51	\N	09228632-b935-4db3-8ff0-82cd575cee17	f	GOOD	GOOD
cff8a656-5aa8-480e-82c5-c00f3504b760	d2af8e38-e557-4a9c-8e29-c772492606aa	\N	5efe20d1-f112-4940-a7f5-fed89ce00783	t	FAIR	GOOD
d6e10b32-abf5-4ee4-98f0-848228c38ade	e229a33d-fae2-4569-b56a-a5d3225a850a	\N	5efe20d1-f112-4940-a7f5-fed89ce00783	t	FAIR	GREAT
106fc4ed-4ff4-464d-9599-491ec336daaf	e229a33d-fae2-4569-b56a-a5d3225a850a	\N	09228632-b935-4db3-8ff0-82cd575cee17	f	GOOD	GREAT
6dfb585c-831a-486b-bcb8-dd0f43cfc6fc	28c45610-171f-4141-8cb4-e6296ef10c51	\N	5efe20d1-f112-4940-a7f5-fed89ce00783	t	GOOD	GOOD
3b200adc-d216-41e9-bf2f-cd953a1e70a1	d2be36c4-e6d0-42e7-a8dc-a108f0c2ddb5	\N	5efe20d1-f112-4940-a7f5-fed89ce00783	t	GOOD	GOOD
7cfe9737-ecb7-4ca9-8d9c-d5e032e9fd17	8798a05d-6d5f-496f-bf43-46ad49086110	\N	5efe20d1-f112-4940-a7f5-fed89ce00783	t	GOOD	GOOD
d11549dc-874c-455e-9d44-f6876c446418	1e125949-c5d1-4b2a-946f-f0c2863823e9	\N	5efe20d1-f112-4940-a7f5-fed89ce00783	t	FAIR	FAIR
8d0cec25-d91b-44c7-aa52-f29b819c88c7	6daf6655-93a9-41b8-a22b-8ae11924f4d8	\N	5efe20d1-f112-4940-a7f5-fed89ce00783	t	GOOD	GOOD
01fc9fc8-f2f3-447c-8242-9efdf045cfd4	955ea302-092f-4836-9c59-a491c4a41c42	Teppo osallistui luontojoogaan ulkona puistossa. Hän teki joogaliikkeitä rauhallisesti ja keskittyneesti, nauttien samalla raikkaasta ulkoilmasta. Hän auttoi muita osallistujia tarvittaessa.	ad60702e-baa4-4358-8bb6-419baa7bda77	t	GOOD	GREAT
356ecce8-6169-4ff0-a6f9-2aaf4f5063b5	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matti ui hyvin ja jaksoi treenata koko harjoituksen ajan. Hän piti tauot sopivissa väleissä ja oli ystävällinen muille uimareille.	5ce99f45-24fa-44b8-8053-fdc41f469120	t	GOOD	GOOD
1179fbe8-b773-4f2c-959b-792ae02c696c	89e9ab33-9a0b-4a22-9951-a44f9f715f4f	\N	94631131-627b-4db7-b365-2601117b71d4	t	\N	\N
75b09e10-6d82-44d3-afb0-83714677e3a8	d2be36c4-e6d0-42e7-a8dc-a108f0c2ddb5	\N	09228632-b935-4db3-8ff0-82cd575cee17	t	GOOD	GOOD
260a5c2d-4656-4189-9efb-71e23e66f88b	d2af8e38-e557-4a9c-8e29-c772492606aa	\N	09228632-b935-4db3-8ff0-82cd575cee17	t	FAIR	GOOD
0c7f8ae0-069f-410a-86d1-fc0fd5ed518e	341a0f48-42b8-446e-a8f1-7a30faa0d1b1	Hienosti osasi tunnistaa kaikki kasvilajit! Työskentely tunnilla aktiivista ja keskittynyttä.	94631131-627b-4db7-b365-2601117b71d4	t	GOOD	GREAT
b5ea1dff-a99d-4565-b807-ee1f26812222	8798a05d-6d5f-496f-bf43-46ad49086110	\N	09228632-b935-4db3-8ff0-82cd575cee17	f	\N	\N
339efa4d-abe7-4836-b846-99ac7a52fef1	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa harjoitteli tanssin koreografiaa erittäin hyvin ja osasi seurata rytmiä. Hän auttoi muita oppimaan haastavat liikkeet ja piti tunnelman kevyenä.	2caa116a-af30-44a8-ac27-2262396b7e73	f	EXCELLENT	GREAT
46d1972f-0444-4991-9a9b-69b2bb1a000e	6daf6655-93a9-41b8-a22b-8ae11924f4d8	\N	09228632-b935-4db3-8ff0-82cd575cee17	f	\N	\N
7c003ce6-ca64-490b-8f30-cbabb013e6bc	1a3ce7b5-74af-46a2-9092-cc0c262ee980	\N	09228632-b935-4db3-8ff0-82cd575cee17	t	GREAT	GREAT
983aee9e-bbcb-46ac-a78d-b81cf3c4f29c	1e125949-c5d1-4b2a-946f-f0c2863823e9	\N	09228632-b935-4db3-8ff0-82cd575cee17	f	\N	\N
1b4917d1-9fa7-47a4-a773-4de3dcfa0358	c95bc4dd-ec94-4634-8e83-09ec4a86234d	\N	338bcaa9-d9d5-4e4e-83f6-0aef3a27594b	f	\N	\N
17e0bb16-71af-440b-9a28-5119b6d9c8bc	c227c16e-3847-42cd-878a-b2de9aa428f9	\N	338bcaa9-d9d5-4e4e-83f6-0aef3a27594b	f	\N	\N
677be662-d23f-4a78-9d78-2cb9429d5b36	dbe4db82-789f-439f-8bf8-b039c33a807d	\N	338bcaa9-d9d5-4e4e-83f6-0aef3a27594b	f	\N	\N
23adb839-c3aa-43bd-98fb-a8f0366b4260	b3308885-04d1-4dcf-a953-dcc3c5d2b707	\N	338bcaa9-d9d5-4e4e-83f6-0aef3a27594b	f	\N	\N
da524e61-4eff-48aa-be17-612c7c8ee405	378b96cc-6e69-4d33-8f67-db09e69d40cd	\N	338bcaa9-d9d5-4e4e-83f6-0aef3a27594b	f	\N	\N
6b007334-d724-4634-96db-fc692d998291	4472f7fb-1a36-408c-a281-b9b50681ceaa	\N	338bcaa9-d9d5-4e4e-83f6-0aef3a27594b	t	\N	\N
d1c9ec3c-9e3e-4f5b-a1e6-216b254a9714	d8a4e73e-850b-4742-85ab-7c67b6e55b29	\N	338bcaa9-d9d5-4e4e-83f6-0aef3a27594b	t	GOOD	GREAT
df0e2820-c028-47e2-8544-1a07aab520f8	2a60f14e-ca1b-4982-97ae-efcd23375291	\N	338bcaa9-d9d5-4e4e-83f6-0aef3a27594b	t	GOOD	FAIR
9825ca21-4e71-4611-870a-6a906e3dd09a	955ea302-092f-4836-9c59-a491c4a41c42	Teppo harjoitteli perusvoimistelua voimistelusalilla. Hän teki erilaisia liikkeitä ja hyppyjä, mutta tarvitsi vielä harjoitusta tasapainonsa säilyttämisessä. Hän yritti parhaansa ja kuunteli ohjaajan neuvoja.	0e302301-4ff0-4c98-9e95-bb28617568b6	t	FAIR	GOOD
82026d03-2e92-4abc-be8d-a1bb0c72290d	955ea302-092f-4836-9c59-a491c4a41c42	Teppo osallistui kiipeilytunnille kiipeilyseinällä. Hän osoitti erinomaista kehonhallintaa ja voimaa, ja kiipesi nopeasti ylös seinää. Hän myös tuki muita osallistujia ja opasti heitä tarvittaessa.	5ce99f45-24fa-44b8-8053-fdc41f469120	t	EXCELLENT	GREAT
ee52bbc8-8764-4760-9715-df744c74e8c1	955ea302-092f-4836-9c59-a491c4a41c42	Teppo osallistui uintiharjoituksiin ja näytti erinomaisia taitojaan eri uintitekniikoissa. Hän ui nopeasti ja kehitti tekniikkaansa jatkuvasti. Hän myös auttoi ja kannusti muita uimareita.	020b0618-97af-4757-8fcc-9c707eb2ff77	t	EXCELLENT	EXCELLENT
6bb01ca6-0c78-49d2-802f-470db7b41efd	955ea302-092f-4836-9c59-a491c4a41c42	Teppo harjoitteli voimistelua ja kokeili erilaisia akrobaattisia liikkeitä. Hän ei onnistunut kaikissa liikkeissä heti, mutta oli sisukas ja yritti uudelleen kunnes onnistui.	9a591496-3790-40d6-bf01-bc76caeff6ac	t	GOOD	GREAT
0436babc-bf0d-41ca-81d2-11ad37123a64	955ea302-092f-4836-9c59-a491c4a41c42	Teppo harjoitteli kuntoilua puistossa. Hän teki erilaisia lihaskunto- ja venyttelyliikkeitä puiston penkeillä ja portailla, mutta tarvitsi vielä harjoitusta tietyissä liikkeissä.	887964c4-6178-4b1f-b2ca-470717b0c1bc	t	FAIR	GOOD
15e30b6f-8d69-44f9-ab28-a12a699656d8	955ea302-092f-4836-9c59-a491c4a41c42	Teppo pelasi pallopeliä hiekkakentällä ja kokeili beach tennistä. Vaikka laji oli uusi hänelle, hän oppi nopeasti ja kannusti muita pelaajia. Tunnelma oli innostunut ja hauska.	9b80c1c8-6caa-492f-a049-4be23acb9b00	t	GOOD	EXCELLENT
f216f82e-0593-4648-ba7d-c9c964873d93	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matilla meni tosi hyvin tänään. Maila pysyi kädessä ja tekniikka oli kunnossa. Matti kannusti myös toisia mukaan pelaamaan	ef04a024-da0e-4552-890f-db5d83fa0c84	t	GOOD	GREAT
6346283c-9a12-48b0-b043-5cf6e955b7cf	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matti osallistui aktiivisesti beach tennikseen, vaikka hänellä oli hieman vaikeuksia pelin sääntöjen ymmärtämisessä.	9b80c1c8-6caa-492f-a049-4be23acb9b00	t	\N	GOOD
6193910b-1257-4824-8c1b-83f9fbaa6e58	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matti osallistui joogaan keskittyneesti ja rauhallisesti. Hän auttoi muita osallistujia ja piti positiivista ilmapiiriä yllä.	ad60702e-baa4-4358-8bb6-419baa7bda77	t	GREAT	EXCELLENT
2	e79219a8-f48d-4331-87c0-30ccbf4f94fb	\N	a650569c-0401-4186-9d0c-540a392b5372	f	\N	\N
8daca054-20b2-4c30-93db-9e28f52e635f	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Vaikka Matti ei ollut aivan parhaimmillaan latinalaistansseissa, hän osallistui tunnille positiivisella asenteella ja kannusti muita.	8a8bd6a0-de2f-40ad-84f0-6b706c4a70a5	t	FAIR	GREAT
38537838-ca83-4e60-8aaf-7492e6bd1ca9	89e9ab33-9a0b-4a22-9951-a44f9f715f4f	\N	b8f9e8d1-cd14-46d8-897b-92cd057d0cf2	t	\N	\N
f111061b-b2b2-453c-916a-d6b19f1c1338	341a0f48-42b8-446e-a8f1-7a30faa0d1b1	Hienoa työskentelyä! Kehityskohtana levottomuus tunnin loppua kohden. Hieman keskittymiskyky alkaa laantua.	b8f9e8d1-cd14-46d8-897b-92cd057d0cf2	t	FAIR	FAIR
16dee03a-9f21-4d75-9cb5-05bfd65ed632	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matti ui avovesialtaassa hyväntuulisena, vaikka vesi oli kylmää. Hän jaksoi treenata koko harjoituksen ajan ja kannusti muita uimareita.	f958cf22-b7bd-4587-b758-e38824f6aebe	t	\N	GREAT
1f0dcc58-6f94-49bd-85fa-991ab858a40f	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matti osallistui vesijumppaan innokkaasti, mutta hänellä oli vaikeuksia joissakin liikkeissä. Hän ei kuitenkaan lannistunut ja yritti parhaansa.	84484211-f080-453c-a05b-f26aac190285	t	FAIR	GOOD
e8eac58a-b729-4158-913d-0ff0b0c1fe35	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Uintitreeni ei sujunut parhaalla mahdollisella tavalla. Liisa ei ollut kovin motivoitunut ja hänen tekniikkansa kaipasi parannusta.	5ce99f45-24fa-44b8-8053-fdc41f469120	t	POOR	FAIR
f5a511b6-6314-4bf4-a9e2-bf6a1cfe01b3	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa osallistui luontojoogaan aktiivisesti ja keskittyi hyvin harjoitukseen. Hän auttoi muita osallistujia tarvittaessa ja nautti ulkoilmasta.	ad60702e-baa4-4358-8bb6-419baa7bda77	t	GREAT	EXCELLENT
3c55c516-377c-43b7-a71b-6c4158c91b86	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa nautti retkeilystä metsässä ja käveli reippaasti koko 10 kilometrin lenkin. Hän ihasteli luontoa ja otti valokuvia matkan varrella.	9be4600c-3d6d-455d-94c7-8559183bac9c	t	GREAT	GREAT
5ac82d6d-d83d-4540-be1c-70aad193225d	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	\N	dbe34534-fc11-4d1d-92d1-279707d80b55	f	\N	\N
de932cdb-c368-4962-8748-1a4468749826	1a3ce7b5-74af-46a2-9092-cc0c262ee980	\N	5efe20d1-f112-4940-a7f5-fed89ce00783	t	GOOD	GOOD
b2e0a685-092c-4e6c-83b7-9a72ae0a65ff	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa nautti retkeilystä järvellä ja teki tasaisen vauhdin koko 8 kilometrin lenkin. Hän otti kuvia ja nautti luonnon kauneudesta ympärillään.	3fd9c99b-457b-4806-b5fb-20b8ba439386	t	GREAT	GREAT
56875e70-3d16-4ae3-9159-598a8e820f5a	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa harjoitteli latinalaistansseja tanssitunnilla ja oppi nopeasti uudet askeleet. Hän auttoi muita oppimaan ja piti tunnelman kevyenä.	8a8bd6a0-de2f-40ad-84f0-6b706c4a70a5	t	EXCELLENT	GREAT
a5009c60-2f59-4cb9-b5c7-ad6aeb3d4e8c	39a7cc68-cf8a-4a3c-a301-3c579d8ab68a	Joitakin huomioita Matille	19416df0-ce47-405d-bb73-d29910395a33	t	GOOD	GREAT
0f6c5136-8ea5-4335-9efb-b6614293da8f	631c328d-b98a-4e60-a3c8-08122b60302a	\N	19416df0-ce47-405d-bb73-d29910395a33	t	GOOD	GOOD
95baf315-5195-46d2-9ba0-8e8ad6899b9f	1a3ce7b5-74af-46a2-9092-cc0c262ee980	\N	fd6ebb4d-f69d-4fd5-9f93-92c8daf8528f	t	GOOD	GREAT
c2b4de97-bf4d-4ee9-ab84-aeec672cbd6b	1fb19977-06e3-4b97-9e19-843fb8115514	\N	19416df0-ce47-405d-bb73-d29910395a33	t	GOOD	GREAT
b220726d-5aa1-4c5f-b958-ea54f5ad67a0	6daf6655-93a9-41b8-a22b-8ae11924f4d8	\N	fd6ebb4d-f69d-4fd5-9f93-92c8daf8528f	t	GOOD	FAIR
10a24430-aaa7-4413-ac18-d58bf0d17ab4	ce7c40d0-5372-4b0b-88ce-9b94fabdc424	\N	19416df0-ce47-405d-bb73-d29910395a33	t	GOOD	GOOD
c0907bf0-f8c2-49e2-a520-cfa1ddff3696	d2af8e38-e557-4a9c-8e29-c772492606aa	Huomioita...\n	fd6ebb4d-f69d-4fd5-9f93-92c8daf8528f	f	GOOD	GREAT
61a0bdb2-2c3a-40ad-84b2-2716befd66b0	28c45610-171f-4141-8cb4-e6296ef10c51	\N	fd6ebb4d-f69d-4fd5-9f93-92c8daf8528f	f	\N	\N
1440e873-066b-44e9-8dcf-49ec27ba4740	8798a05d-6d5f-496f-bf43-46ad49086110	\N	fd6ebb4d-f69d-4fd5-9f93-92c8daf8528f	t	GOOD	GREAT
55ff661f-e4c0-47fd-81d6-e391a9b68605	8798a05d-6d5f-496f-bf43-46ad49086110	\N	1c663a86-7eac-4f8f-bf15-84ab83f59485	f	\N	\N
3c4149f4-2666-4e7c-af2d-0ebe08e9fc83	39a7cc68-cf8a-4a3c-a301-3c579d8ab68a	\N	77263534-efba-4025-9a45-d97df9af8968	f	\N	\N
4532346d-989d-4aaa-a51f-1bd7d2d762eb	1fb19977-06e3-4b97-9e19-843fb8115514	\N	77263534-efba-4025-9a45-d97df9af8968	f	\N	\N
2a60bdc1-ad01-4375-b581-342cf717b6f6	631c328d-b98a-4e60-a3c8-08122b60302a	\N	77263534-efba-4025-9a45-d97df9af8968	t	GOOD	GREAT
26644183-e6b3-4979-b8af-cabf3995cb40	ce7c40d0-5372-4b0b-88ce-9b94fabdc424	\N	77263534-efba-4025-9a45-d97df9af8968	t	GOOD	GREAT
4ebac4a1-7f8e-437d-8ebf-f86c0aea3b85	631c328d-b98a-4e60-a3c8-08122b60302a	Terve terve tässä Laurille vähän huomioita	a47e071a-4ff3-4989-99b2-27312586cd62	t	GOOD	GREAT
4c16bfb7-9b0c-4b5a-8893-9c1ef3c1089d	ce7c40d0-5372-4b0b-88ce-9b94fabdc424	No niin Tässäpä Maijalle jotakin huomioita	a47e071a-4ff3-4989-99b2-27312586cd62	t	FAIR	GOOD
624ad8e5-2a60-4af7-b90a-1d9c3afde079	39a7cc68-cf8a-4a3c-a301-3c579d8ab68a	Matille tässä Matille meni oikein oikein hyvin	a47e071a-4ff3-4989-99b2-27312586cd62	t	GREAT	GREAT
56a62b0d-1e6d-4450-a517-7fede15b064d	d2af8e38-e557-4a9c-8e29-c772492606aa	\N	be67da1b-a130-4dce-b49b-fdcee5177d4c	t	GOOD	GREAT
8d0512de-5eff-4cf1-94ca-ab28269bde9d	1fb19977-06e3-4b97-9e19-843fb8115514	No niin tässä Pekalle vielä uudet huomiot	a47e071a-4ff3-4989-99b2-27312586cd62	t	GOOD	GREAT
f27027b8-3107-47d9-8b4f-767baabc9445	631c328d-b98a-4e60-a3c8-08122b60302a	\N	b69d279e-af39-4dab-8af4-678e975ce715	t	GOOD	GREAT
d7de3db4-7aa9-4b90-86ed-8fdf3283e393	39a7cc68-cf8a-4a3c-a301-3c579d8ab68a	\N	b69d279e-af39-4dab-8af4-678e975ce715	t	FAIR	GOOD
e61d7b17-c372-42ea-a2e6-5d514b0f6e9e	ce7c40d0-5372-4b0b-88ce-9b94fabdc424	\N	b69d279e-af39-4dab-8af4-678e975ce715	t	GOOD	GREAT
c6ba32cd-8bf0-4011-8ac6-cea9cd41b09f	1fb19977-06e3-4b97-9e19-843fb8115514	\N	b69d279e-af39-4dab-8af4-678e975ce715	t	GOOD	GOOD
de4b1429-5033-4bbf-9cbd-a5a27f670270	1e125949-c5d1-4b2a-946f-f0c2863823e9	\N	be67da1b-a130-4dce-b49b-fdcee5177d4c	t	\N	\N
6c400757-78d6-4c93-a7ca-c5254bad546d	28c45610-171f-4141-8cb4-e6296ef10c51	\N	be67da1b-a130-4dce-b49b-fdcee5177d4c	t	\N	\N
2f96c439-29b1-41a7-98d9-6dabd8d2035f	6daf6655-93a9-41b8-a22b-8ae11924f4d8	\N	be67da1b-a130-4dce-b49b-fdcee5177d4c	t	\N	\N
58f677d1-bc22-476b-9fd6-8d1562aee271	8798a05d-6d5f-496f-bf43-46ad49086110	\N	be67da1b-a130-4dce-b49b-fdcee5177d4c	t	\N	\N
144a0add-ffc0-45c5-866f-f54fa4dc4f45	e229a33d-fae2-4569-b56a-a5d3225a850a	\N	be67da1b-a130-4dce-b49b-fdcee5177d4c	t	\N	\N
61e12658-adde-4b75-aaf8-1045bc7bc8d0	d2be36c4-e6d0-42e7-a8dc-a108f0c2ddb5	\N	be67da1b-a130-4dce-b49b-fdcee5177d4c	t	\N	\N
d069e2c9-c668-413d-9b99-60002fe17f27	1a3ce7b5-74af-46a2-9092-cc0c262ee980	\N	be67da1b-a130-4dce-b49b-fdcee5177d4c	t	\N	\N
0a94b9de-5957-453c-bdcf-ac89ac1d3990	e229a33d-fae2-4569-b56a-a5d3225a850a	\N	fd6ebb4d-f69d-4fd5-9f93-92c8daf8528f	f	\N	\N
e92a26de-985b-4297-8036-c99bfab53b36	d2be36c4-e6d0-42e7-a8dc-a108f0c2ddb5	\N	fd6ebb4d-f69d-4fd5-9f93-92c8daf8528f	f	\N	\N
fb8e48f6-90c8-4e92-9828-cc6906bc8970	1e125949-c5d1-4b2a-946f-f0c2863823e9	\N	fd6ebb4d-f69d-4fd5-9f93-92c8daf8528f	f	\N	\N
554603c6-f760-4603-bca0-e1ad88417154	955ea302-092f-4836-9c59-a491c4a41c42	Teppo osallistui joogatunnille ja harjoitteli erilaisia asentoja ja hengitystekniikoita. Hän keskittyi hyvin ja auttoi muita osallistujia, kun he tarvitsivat apua.	a3b17ce6-a3b6-47b0-8de5-aaa5dfb0689f	t	GOOD	EXCELLENT
89ee54d9-c08f-4a70-b8c6-1a5950a8ea5d	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matilla selvästi kunto on hyvä ja saa salilla tehtyä hyviä liikkeitä. Keskittyminen poikkesi kuitenkin useasti ja Matti häiritsi hieman tunnin kulkua.	dbe34534-fc11-4d1d-92d1-279707d80b55	t	EXCELLENT	FAIR
0e43f212-7bdd-4e3c-8691-7173d5beb7dd	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa pelasi sählyä innokkaasti, vaikka pallon käsittely ei ollut vielä täydellistä. Hän kannusti joukkuettaan ja oli positiivinen.	ef04a024-da0e-4552-890f-db5d83fa0c84	t	FAIR	GREAT
61ad33b3-fd13-42bf-a459-cd5b64deabd9	955ea302-092f-4836-9c59-a491c4a41c42	Teppo pelasi jalkapalloa koulun pihalla kavereiden kanssa. Hän osoitti hyviä taitoja ja teki pari maalia. Hän kannusti joukkuetovereitaan ja nautti pelistä.	214cda4a-6558-4cc7-b136-9eb21e1bcb19	t	GOOD	GREAT
d071352f-91fa-4ea9-992c-3f76038c19e7	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	\N	214cda4a-6558-4cc7-b136-9eb21e1bcb19	f	\N	\N
47c701fc-c44d-459b-acbf-9e2d7862d971	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	\N	64d87b06-5bdc-40ca-9003-c81114fa49ef	t	\N	GREAT
bf67fa61-2344-4f4f-8d8d-6a1c6c886505	e79219a8-f48d-4331-87c0-30ccbf4f94fb	\N	64d87b06-5bdc-40ca-9003-c81114fa49ef	t	\N	GOOD
6a2f3891-0ee3-447c-aa75-a3285e0c70b5	955ea302-092f-4836-9c59-a491c4a41c42	\N	64d87b06-5bdc-40ca-9003-c81114fa49ef	t	\N	\N
d1778d16-b721-413f-bb29-12e3c4fa0d53	e79219a8-f48d-4331-87c0-30ccbf4f94fb	\N	307a1a79-3792-40f3-80c4-5fc9f6c80217	t	GREAT	GOOD
391d4feb-6d66-4ec0-895b-1284f035ddbc	955ea302-092f-4836-9c59-a491c4a41c42	\N	307a1a79-3792-40f3-80c4-5fc9f6c80217	t	GREAT	EXCELLENT
d9a3444a-400c-40a5-a2ab-789abb28f8b9	10553a64-de1e-4561-a08d-6b191d7f67f7	\N	307a1a79-3792-40f3-80c4-5fc9f6c80217	t	GOOD	GREAT
b758afe5-e4dc-48be-9aa2-0f303c9d0b82	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	\N	307a1a79-3792-40f3-80c4-5fc9f6c80217	t	GREAT	EXCELLENT
5bccee9f-fbf3-4b3a-aa14-2e189bec3b4d	955ea302-092f-4836-9c59-a491c4a41c42	Teppo osallistui peruskestävyystreeniin juoksuradalla. Hän juoksi noin 5 kilometrin lenkin, mutta hengästyi muutamissa mäissä. Hän kannusti itseään ja jatkoi juoksua.	671b2652-2253-4c80-981c-1c44267b2ff0	t	FAIR	GOOD
d7d9d30b-de58-4a27-84d0-e5bd4e49c349	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matti nautti retkeilystä metsässä ja piti huolta, että ryhmä pysyi koossa. Hän myös auttoi muita retkeläisiä tarvittaessa.	9be4600c-3d6d-455d-94c7-8559183bac9c	t	GREAT	\N
3696e7d4-f3ab-45d1-b141-341a3af14c49	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa osallistui vesijumppaan aktiivisesti ja suoritti liikkeitä hyvällä asenteella. Hän auttoi muita osallistujia ja kannusti heitä yrittämään parhaansa.	84484211-f080-453c-a05b-f26aac190285	t	GOOD	EXCELLENT
36c7ebd9-ee9e-4c48-97bf-8b2a9bf1e0a9	17073276-362e-4ba4-9bf9-6526145e167d	\N	115d16b1-39e1-48ba-b1a3-40be5b324309	t	GOOD	GREAT
fe1dc5a6-b6b8-4815-ad9b-1a064905d1a0	e79219a8-f48d-4331-87c0-30ccbf4f94fb	\N	115d16b1-39e1-48ba-b1a3-40be5b324309	t	GOOD	FAIR
b63ad759-2b71-4eda-b9e1-e211885a8465	10553a64-de1e-4561-a08d-6b191d7f67f7	\N	115d16b1-39e1-48ba-b1a3-40be5b324309	t	GREAT	GOOD
8e9c905f-a866-487b-bb9d-56a269587f92	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	\N	115d16b1-39e1-48ba-b1a3-40be5b324309	t	GOOD	GREAT
02bfabf6-96e0-44cb-8e2b-12e9c329c009	955ea302-092f-4836-9c59-a491c4a41c42	\N	115d16b1-39e1-48ba-b1a3-40be5b324309	t	GOOD	GREAT
02ffe03c-365a-48b1-96c7-cdeb1000537a	e79219a8-f48d-4331-87c0-30ccbf4f94fb	\N	3563f286-3b7c-4211-a94c-2c4c98e367d1	f	\N	\N
097c7460-38c1-4631-93f6-cbf88355dadd	955ea302-092f-4836-9c59-a491c4a41c42	\N	3563f286-3b7c-4211-a94c-2c4c98e367d1	t	POOR	POOR
8aed2601-dd73-4ccd-ab77-eae1b04a6812	17073276-362e-4ba4-9bf9-6526145e167d	\N	3563f286-3b7c-4211-a94c-2c4c98e367d1	t	POOR	POOR
f936f8b0-efaf-4e85-91a9-e9abc419f0ed	10553a64-de1e-4561-a08d-6b191d7f67f7	\N	3563f286-3b7c-4211-a94c-2c4c98e367d1	t	POOR	POOR
d0847f73-0fd4-4f12-be3c-f7d5bb56d401	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	\N	3563f286-3b7c-4211-a94c-2c4c98e367d1	f	\N	\N
cc6221b2-f99b-41d3-b649-3dd1deaa206c	e79219a8-f48d-4331-87c0-30ccbf4f94fb	\N	1d94f0fd-4511-4d2f-9051-af3348205184	f	\N	\N
33ac9900-2f68-4fce-ac81-ab2abc859314	17073276-362e-4ba4-9bf9-6526145e167d	\N	1d94f0fd-4511-4d2f-9051-af3348205184	t	FAIR	FAIR
77fc98ff-0a39-40d8-88e5-20744ab3fd8a	955ea302-092f-4836-9c59-a491c4a41c42	\N	1d94f0fd-4511-4d2f-9051-af3348205184	t	FAIR	FAIR
036c09f5-1c92-43a6-8eee-dc0199ef838f	10553a64-de1e-4561-a08d-6b191d7f67f7	\N	1d94f0fd-4511-4d2f-9051-af3348205184	t	FAIR	FAIR
cc8ab425-4ab5-4553-85ea-62b598f5ecd9	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	\N	1d94f0fd-4511-4d2f-9051-af3348205184	t	FAIR	GOOD
e7ef4683-6d77-4841-9037-f27c57fdc090	955ea302-092f-4836-9c59-a491c4a41c42	Teppo osallistui tanssitunnille ja harjoitteli latinalaistansseja, kuten salsaa ja cha chaa. Hän ei ollut aivan rytmissä koko ajan, mutta nautti tanssista ja oppi nopeasti.	8a8bd6a0-de2f-40ad-84f0-6b706c4a70a5	t	GOOD	GREAT
4a1f1a13-c7a2-4f5d-8c55-bc7f9189c448	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matti juoksi hyvin ja jaksoi koko lenkin ajan. Hän kannusti muita juoksijoita ja piti hyvää tahtia yllä.	671b2652-2253-4c80-981c-1c44267b2ff0	t	GREAT	GOOD
5c62091d-3082-429c-983b-09b9e353ff5b	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa kokeili beach tennisä ensimmäistä kertaa ja sopeutui nopeasti sääntöihin. Hän ei aina osunut palloon, mutta pysyi positiivisena ja kannustavana.	9b80c1c8-6caa-492f-a049-4be23acb9b00	t	GOOD	GOOD
77e31141-a08e-496d-9adc-a042b265da96	955ea302-092f-4836-9c59-a491c4a41c42	Teppo osallistui vesijumppaan uimahallissa. Hän treenasi erilaisia liikkeitä vedessä ja keskittyi kunnon kohottamiseen. Hän auttoi myös muita ja oli innokas oppimaan.	84484211-f080-453c-a05b-f26aac190285	t	GOOD	EXCELLENT
6601045b-89c9-41b3-948d-83efa04eeb89	955ea302-092f-4836-9c59-a491c4a41c42	Teppo osallistui koripalloharjoituksiin ja näytti erinomaisia taitojaan. Hän teki useita koreja ja antoi hyviä syöttöjä. Hän myös kannusti ja auttoi joukkuetovereitaan.	f958cf22-b7bd-4587-b758-e38824f6aebe	t	EXCELLENT	EXCELLENT
77404864-3b7f-4065-9cec-721cdc1ddf6a	e79219a8-f48d-4331-87c0-30ccbf4f94fb	\N	214cda4a-6558-4cc7-b136-9eb21e1bcb19	f	\N	\N
8a9bd6a7-56d7-443b-9d49-237bf0017aa7	e79219a8-f48d-4331-87c0-30ccbf4f94fb	\N	fc56e629-af84-4fc6-aa84-6774bcddd2b2	f	\N	\N
7ed21a50-7653-4fca-9cd1-64d695f85493	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa pelasi sählyä salissa ja yritti parhaansa, vaikka hänen mailankäsittelynsä ei ollut vahvinta. Hän kannusti joukkuettaan ja auttoi heitä.	fc56e629-af84-4fc6-aa84-6774bcddd2b2	t	FAIR	GOOD
2d7ea1e5-98c5-403a-bb71-6d1b8785714f	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa osallistui vesijumppaan ja teki liikkeitä energisesti. Hän auttoi muita osallistujia ja oli positiivinen koko tunnin ajan.	9a591496-3790-40d6-bf01-bc76caeff6ac	t	GOOD	EXCELLENT
6015805d-761a-4c79-b033-9d8088dd3a23	955ea302-092f-4836-9c59-a491c4a41c42	Teppo pelasi sählyä salissa ja osallistui tiukkaan otteluun. Hän teki yhden maalin ja auttoi joukkuettaan puolustuksessa. Hän myös kannusti muita pelaajia.	fc56e629-af84-4fc6-aa84-6774bcddd2b2	t	GOOD	GREAT
03a02283-5392-4e97-8b7c-d32e0d6fbc07	955ea302-092f-4836-9c59-a491c4a41c42	Teppo osallistui kuntosalitreeniin ja keskittyi erityisesti keskivartalon lihaksiin. Hän teki liikkeitä hyvällä tekniikalla ja auttoi muita osallistujia tarvittaessa. Treeni sujui hyvin.	dbe34534-fc11-4d1d-92d1-279707d80b55	t	GREAT	GREAT
ad1fa95e-8681-48e3-ae52-89f84be22581	955ea302-092f-4836-9c59-a491c4a41c42	Teppo osallistui pyöräilyretkelle ja ajoi noin 15 kilometrin lenkin. Hänellä oli alussa vaikeuksia pysyä muiden mukana, mutta päätti kuitenkin jatkaa ja saavutti lopulta muut.	77d55566-b658-47e7-9eec-8ab3576ad26f	t	FAIR	GOOD
ddc2ba2c-74d3-4608-a60c-22dd2bc3609e	955ea302-092f-4836-9c59-a491c4a41c42	Teppo osallistui hiihtoretkelle ja hiihti noin 8 kilometrin lenkin. Hän kaatui muutaman kerran, mutta päätti jatkaa ja paransi tekniikkaansa matkan varrella.	3fd9c99b-457b-4806-b5fb-20b8ba439386	t	FAIR	GOOD
7a5434fd-560f-4779-ba91-1976cfa922bb	955ea302-092f-4836-9c59-a491c4a41c42	Teppo nautti luonnonkauniilla polulla lenkkeilystä. Hän piti hyvää vauhtia yllä ja auttoi muita osallistujia vaikeissa kohdissa. Maisemat olivat upeat ja Teppo jakoi iloaan muiden kanssa.	a650569c-0401-4186-9d0c-540a392b5372	t	GOOD	GREAT
3c780db2-681e-41f9-aa68-00ef7d170df0	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matti teki lihaskuntoliikkeet ja venyttelyt huolellisesti. Hän auttoi myös muita osallistujia ja jakoi vinkkejä parhaiden tekniikoiden suhteen.	887964c4-6178-4b1f-b2ca-470717b0c1bc	t	GOOD	EXCELLENT
62af2f90-29a8-4dee-be08-7da3f83487b2	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matti nautti kansallispuiston retkestä ja jakoi mielenkiintoisia tietoja maisemista ja luonnosta muiden kanssa. Hän auttoi muita tarvittaessa ja piti ryhmän yhtenäisenä.	020b0618-97af-4757-8fcc-9c707eb2ff77	t	GREAT	EXCELLENT
ae049012-0e16-4e30-825a-90c5bd055d77	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Vaikka Matilla oli vaikeuksia voimisteluliikkeiden kanssa, hän osallistui harjoitukseen hyvällä asenteella ja yritti parhaansa.	77d55566-b658-47e7-9eec-8ab3576ad26f	t	POOR	\N
c43139fe-78f0-4ff7-bf6b-c6b6020b3f0a	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matti pelasi tennistä hyvällä asenteella ja nautti ulkokentällä pelaamisesta. Hän auttoi muita pelaajia ja piti hauskaa.	9a591496-3790-40d6-bf01-bc76caeff6ac	t	\N	\N
7d83f687-0070-4a5e-8bfd-0275b74cfb84	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matti treenasi kuntosalia tehokkaasti ja keskittyi ylävartalon lihaksiin. Hän kuitenkin keskusteli välillä liikaa muiden kanssa, mikä häiritsi hieman treeniä.	3fd9c99b-457b-4806-b5fb-20b8ba439386	t	GREAT	GOOD
f858a8a0-4b8b-4ae0-990e-ed2433663e83	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa treenasi perusvoimistelutreeniä ahkerasti, mutta tarvitsi apua muutamissa liikkeissä. Hän kuunteli ohjeita ja pyrki parantamaan suoritustaan.	0e302301-4ff0-4c98-9e95-bb28617568b6	t	FAIR	GOOD
8f353675-485e-48d0-b692-ced5f735b891	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa juoksi kestävyystreenin aikana, mutta hänellä oli haasteita pidempien mäkien kanssa. Hän ei kuitenkaan luovuttanut ja kannusti muita osallistujia.	020b0618-97af-4757-8fcc-9c707eb2ff77	t	FAIR	GOOD
7f4812b5-8cac-4fe6-888e-34ed795ff994	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa harjoitteli voimistelutreeniä salilla ja teki hyviä hyppyjä ja liikkeitä. Hän tarvitsi apua tasapainossa, mutta oli motivoitunut ja kuunteli ohjeita.	77d55566-b658-47e7-9eec-8ab3576ad26f	t	GOOD	GOOD
6679c8e7-186f-472c-9fcf-e0fba68ab1d8	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa osallistui luontojoogaan rannalla ja harjoitteli liikkeitä keskittyneesti. Hän nautti auringonlaskun tunnelmasta ja auttoi muita osallistujia.	a3b17ce6-a3b6-47b0-8de5-aaa5dfb0689f	t	GREAT	EXCELLENT
1da5205d-97d8-4e78-8415-e9d9a5b480da	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa osallistui uintitreeniin ja yritti parantaa tekniikkaansa. Vaikka hän ei ollut nopein uimari, hän pysyi positiivisena ja kannusti muita osallistujia.	f958cf22-b7bd-4587-b758-e38824f6aebe	t	FAIR	GREAT
866eb51c-a807-4813-9db5-31139ea3d837	955ea302-092f-4836-9c59-a491c4a41c42	Teppo osallistui tanssitunnille ja yritti oppia uutta koreografiaa. Hänellä oli vaikeuksia muutamien liikkeiden kanssa, mutta hän ei luovuttanut ja jatkoi yrittämistä.	2caa116a-af30-44a8-ac27-2262396b7e73	t	FAIR	GOOD
ee8f9e3a-7f72-4eee-9f2e-1cc1d1be2411	e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matti osallistui luontojoogaan aktiivisesti ja nautti rannan tunnelmasta. Hän auttoi muita osallistujia tarvittaessa ja piti hyvää ilmapiiriä yllä.	a3b17ce6-a3b6-47b0-8de5-aaa5dfb0689f	t	GOOD	EXCELLENT
b7d56c6e-9070-4437-9e90-782badc88bd9	feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa teki kuntoiluharjoituksia puistossa, mutta keskittyminen herpaantui ajoittain. Hän suoritti liikkeet oikein, mutta olisi voinut olla tarkkaavaisempi.	887964c4-6178-4b1f-b2ca-470717b0c1bc	t	GOOD	FAIR
\.


--
-- TOC entry 3366 (class 0 OID 16476)
-- Dependencies: 217
-- Data for Name: EvaluationCollection; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EvaluationCollection" (id, date, type, description, "groupId", "environmentCode") FROM stdin;
f1aef52b-f653-4897-af88-6b49427b0481	2023-03-30 00:00:00	Koripallo		69f3a714-c3d2-4434-b30b-014da067a58d	LI_TALVI
1c663a86-7eac-4f8f-bf15-84ab83f59485	2023-03-31 00:00:00	Sähly	Tunnilla pelattiin sählyä intensiivisesti	ba900802-f46a-4f7e-9d4a-e3bf16c0904c	LI_TALVI
cc917c19-aaf1-462b-9e9b-06c49c0c8980	2023-04-08 00:00:00	Koripallo	Moimoimoim	ba900802-f46a-4f7e-9d4a-e3bf16c0904c	LI_TALVI
94631131-627b-4db7-b365-2601117b71d4	2023-04-10 00:00:00	Jokin	\N	0ca3e239-0437-4693-aebe-09d8f11e63c2	BI_YMPARISTO
a47e071a-4ff3-4989-99b2-27312586cd62	2023-04-10 00:00:00		\N	69f3a714-c3d2-4434-b30b-014da067a58d	LI_VESI
f018f095-e490-42c5-8b16-20e67a471bce	2023-04-10 00:00:00		\N	ba900802-f46a-4f7e-9d4a-e3bf16c0904c	LI_LUONTO
a0446bc5-12b3-4009-8306-c79aab7129a6	2023-04-10 00:00:00		\N	0ca3e239-0437-4693-aebe-09d8f11e63c2	BI_YMPARISTO
be67da1b-a130-4dce-b49b-fdcee5177d4c	2023-04-10 00:00:00		\N	ba900802-f46a-4f7e-9d4a-e3bf16c0904c	LI_VESI
dce9d4e8-ca92-4fee-ade5-e72c7a9f7540	2023-04-10 00:00:00		\N	0ca3e239-0437-4693-aebe-09d8f11e63c2	BI_MIKRO
ef04a024-da0e-4552-890f-db5d83fa0c84	2023-04-11 00:00:00		Sählyn pelailua sisällä salissa. Ensin harjoiteltiin pallon käsittelyä ja sitten pelattiin peliä. Peli oli 3 vs 3 ja pelattiin 2 x 10 minuuttia	96671fa3-27c9-4efb-8434-4cc4329834da	LI_PALLO
214cda4a-6558-4cc7-b136-9eb21e1bcb19	2023-04-03 13:30:00		Pallopeliä koulun pihalla. Pelasimme jalkapalloa kavereiden kanssa. Peli oli tasainen ja lopulta päättyi 2-2.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_PALLO
8a8bd6a0-de2f-40ad-84f0-6b706c4a70a5	2023-03-30 15:30:00		Tanssitunti tanssikoululla. Tällä kertaa harjoittelimme latinalaistansseja, kuten salsaa ja cha chaa. Tunnin kesto oli 60 minuuttia.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_TANSSI
9a591496-3790-40d6-bf01-bc76caeff6ac	2023-03-23 10:30:00		Pallopeliä ulkokentällä. Pelasimme tennistä kavereiden kanssa. Peli oli tasainen ja lopulta päättyi 6-4.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_PALLO
dbe34534-fc11-4d1d-92d1-279707d80b55	2023-04-08 16:30:00		Kuntosali treeniä. Treenasimme erityisesti keskivartalon lihaksia ja käytimme myös kuntopyöriä. Treenin kesto oli noin 90 minuuttia.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_KUNTO
671b2652-2253-4c80-981c-1c44267b2ff0	2023-03-31 11:00:00		Peruskestävyystreeniä juoksuradalla. Juoksimme noin 5 kilometrin lenkin, joka sisälsi myös muutamia mäkiä.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_PERUS
887964c4-6178-4b1f-b2ca-470717b0c1bc	2023-03-29 09:30:00		Kuntoilua puistossa. Teimme erilaisia lihaskunto- ja venyttelyliikkeitä puiston penkeillä ja portailla.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_KUNTO
7f0b3ee8-7875-4883-9147-24c1a6578dbf	2023-03-28 00:00:00	Koripallo		69f3a714-c3d2-4434-b30b-014da067a58d	LI_TALVI
4f49c9f2-b1be-476b-9e42-2730cf634239	2023-03-31 00:00:00	Koripallo		69f3a714-c3d2-4434-b30b-014da067a58d	LI_TALVI
aff3a5c9-d739-4285-9a6c-b712803dec58	2023-03-30 00:00:00	Pesäpallo		69f3a714-c3d2-4434-b30b-014da067a58d	LI_TALVI
338bcaa9-d9d5-4e4e-83f6-0aef3a27594b	2023-04-02 00:00:00	Koripallo	Moimoi	a1a53a6c-632f-467f-a9d8-0458dd1ebf3e	LI_TALVI
b69d279e-af39-4dab-8af4-678e975ce715	2023-03-30 00:00:00	Terve		69f3a714-c3d2-4434-b30b-014da067a58d	LI_TALVI
19416df0-ce47-405d-bb73-d29910395a33	2023-03-30 00:00:00	Joku		69f3a714-c3d2-4434-b30b-014da067a58d	LI_TALVI
77263534-efba-4025-9a45-d97df9af8968	2023-03-30 00:00:00	Pesäpallo		69f3a714-c3d2-4434-b30b-014da067a58d	LI_TALVI
2caa116a-af30-44a8-ac27-2262396b7e73	2023-04-09 09:00:00		Tanssitunti tanssikoululla. Harjoittelimme uutta koreografiaa ja se oli haastavaa, mutta myös hauskaa. Tunnin kesto oli 60 minuuttia.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_TANSSI
77d55566-b658-47e7-9eec-8ab3576ad26f	2023-03-26 12:00:00		Voimistelutreeniä salilla. Treenasimme erilaisia hyppyjä ja liikkeitä, jotka vaativat hyvää tasapainoa.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_VOIM
3fd9c99b-457b-4806-b5fb-20b8ba439386	2023-03-24 19:00:00		Kuntosali treeniä. Treenasimme erityisesti ylävartalon lihaksia ja käytimme painoja ja kuntopyöriä.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_KUNTO
fd6ebb4d-f69d-4fd5-9f93-92c8daf8528f	2023-03-30 00:00:00	Sähly jee	Tähän jotain tietoja...	ba900802-f46a-4f7e-9d4a-e3bf16c0904c	LI_TALVI
f958cf22-b7bd-4587-b758-e38824f6aebe	2023-03-25 16:30:00		Uintitreeniä avovesialtaassa. Uinti oli hieman haastavaa, sillä vesi oli vielä melko kylmää, mutta keli oli kaunis ja aurinkoinen.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_VESI
020b0618-97af-4757-8fcc-9c707eb2ff77	2023-03-22 13:00:00		Retkeilyä kansallispuistossa. Kävelimme noin 15 kilometrin lenkin ja ihastelimme upeita maisemia.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_LUONTO
9be4600c-3d6d-455d-94c7-8559183bac9c	2023-04-02 10:00:00		Retkeilyä metsässä. Kävelimme noin 10 kilometrin lenkin metsäpolkuja pitkin ja ihastelimme kaunista luontoa.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_LUONTO
5ce99f45-24fa-44b8-8053-fdc41f469120	2023-04-04 19:00:00		Uintitreeniä uimahallissa.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_VESI
09228632-b935-4db3-8ff0-82cd575cee17	2023-04-04 00:00:00	Pesäpallo	Jotain tietoja pesäpallotunnista	ba900802-f46a-4f7e-9d4a-e3bf16c0904c	LI_TALVI
9b80c1c8-6caa-492f-a049-4be23acb9b00	2023-04-07 11:00:00		Pallopeliä hiekkakentällä. Pelasimme beach volleyn sijaan beach tennistä, joka oli hieman erilaista ja haastavaa. Peliaika oli 2 x 15 minuuttia.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_PALLO
fc56e629-af84-4fc6-aa84-6774bcddd2b2	2023-03-28 14:00:00		Pallopeliä salissa. Pelasimme sählyä ja ottelu oli tiukka. Peli päättyi lopulta 4-3.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_PALLO
a3b17ce6-a3b6-47b0-8de5-aaa5dfb0689f	2023-03-27 17:00:00		Luontojoogaa rannalla. Joogasimme rannalla auringonlaskun aikaan ja tunnelma oli upea. Joogan kesto oli 60 minuuttia.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_LUONTO
84484211-f080-453c-a05b-f26aac190285	2023-04-01 16:00:00		Vesijumppaa uimahallissa. Tunnin aikana treenasimme erilaisia liikkeitä vedessä, jotka oli suunniteltu erityisesti kunnon kohottamiseen.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_VESI
ad60702e-baa4-4358-8bb6-419baa7bda77	2023-04-06 18:00:00		Luontojooga ulkona puistossa. Jooga oli rentouttavaa ja samalla nautimme raikkaasta ulkoilmasta. Joogan kesto oli 60 minuuttia.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_LUONTO
a650569c-0401-4186-9d0c-540a392b5372	2023-04-10 14:00:00		Luonnonkauniilla polulla lenkkeilyä. Polku oli mäkinen, mutta maisemat olivat upeat. Lenkin kesto oli noin 45 minuuttia.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_LUONTO
0e302301-4ff0-4c98-9e95-bb28617568b6	2023-04-05 15:00:00		Perusvoimistelutreeniä voimistelusalilla. Treenasimme erilaisia liikkeitä ja hyppyjä. Treenin kesto oli 90 minuuttia.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_PERUS
64d87b06-5bdc-40ca-9003-c81114fa49ef	2023-04-13 00:00:00		Polttopalloa ulkona.	96671fa3-27c9-4efb-8434-4cc4329834da	LI_PALLO
307a1a79-3792-40f3-80c4-5fc9f6c80217	2023-04-14 00:00:00		\N	96671fa3-27c9-4efb-8434-4cc4329834da	LI_VOIM
115d16b1-39e1-48ba-b1a3-40be5b324309	2023-04-14 00:00:00		\N	96671fa3-27c9-4efb-8434-4cc4329834da	LI_TANSSI
3563f286-3b7c-4211-a94c-2c4c98e367d1	2023-04-17 00:00:00		\N	96671fa3-27c9-4efb-8434-4cc4329834da	LI_PALLO
b8f9e8d1-cd14-46d8-897b-92cd057d0cf2	2023-04-10 00:00:00	Koripallo	\N	0ca3e239-0437-4693-aebe-09d8f11e63c2	BI_KASVI
4f8c9e0c-4855-46ab-bb53-523d6574b17e	2023-04-10 00:00:00		Voimistelutunti	69f3a714-c3d2-4434-b30b-014da067a58d	LI_VOIM
5efe20d1-f112-4940-a7f5-fed89ce00783	2023-04-10 00:00:00		\N	ba900802-f46a-4f7e-9d4a-e3bf16c0904c	LI_VESI
28c86132-d892-4676-b807-10b9f6460c78	2023-04-10 00:00:00		\N	0ca3e239-0437-4693-aebe-09d8f11e63c2	BI_YMPARISTO
1d94f0fd-4511-4d2f-9051-af3348205184	2023-04-16 00:00:00		\N	96671fa3-27c9-4efb-8434-4cc4329834da	LI_PALLO
\.


--
-- TOC entry 3365 (class 0 OID 16469)
-- Dependencies: 216
-- Data for Name: Group; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Group" (id, name, "teacherId", "updatedAt", "subjectCode") FROM stdin;
96671fa3-27c9-4efb-8434-4cc4329834da	Testiryhmä	473b02e3-044e-4d79-a947-d8cf52f4bfb3	2023-04-17 11:33:34.322	LI
77114574-edbe-4e28-91d3-dfe462e32136	2B	9f2dfed2-48c6-418d-bfbf-2019e8368311	2023-03-31 16:07:30.699	LI
a1a53a6c-632f-467f-a9d8-0458dd1ebf3e	1AB	9f2dfed2-48c6-418d-bfbf-2019e8368311	2023-04-02 08:34:53.689	LI
ba900802-f46a-4f7e-9d4a-e3bf16c0904c	Keskikokoinen ryhmä	9f2dfed2-48c6-418d-bfbf-2019e8368311	2023-04-08 19:41:31.952	LI
8f7c3ca7-ebbc-476b-aac8-14ac0aa95cd3	Moi	9f2dfed2-48c6-418d-bfbf-2019e8368311	2023-04-09 11:28:53.777	LI
69f3a714-c3d2-4434-b30b-014da067a58d	Pikku ryhmä	9f2dfed2-48c6-418d-bfbf-2019e8368311	2023-04-10 10:47:12.028	LI
0ca3e239-0437-4693-aebe-09d8f11e63c2	Biologiaryhmä	9f2dfed2-48c6-418d-bfbf-2019e8368311	2023-04-10 15:13:28.267	BI
\.


--
-- TOC entry 3368 (class 0 OID 16491)
-- Dependencies: 219
-- Data for Name: Student; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Student" (id, name, "groupId") FROM stdin;
e79219a8-f48d-4331-87c0-30ccbf4f94fb	Matti Meikäläinen	96671fa3-27c9-4efb-8434-4cc4329834da
feea0cdf-2bdd-4659-a29d-0edd8b715c3a	Liisa Lahtinen	96671fa3-27c9-4efb-8434-4cc4329834da
955ea302-092f-4836-9c59-a491c4a41c42	Teppo Tavallinen	96671fa3-27c9-4efb-8434-4cc4329834da
10553a64-de1e-4561-a08d-6b191d7f67f7	Paula Päivinen	96671fa3-27c9-4efb-8434-4cc4329834da
17073276-362e-4ba4-9bf9-6526145e167d	Mauri Mäkinen	96671fa3-27c9-4efb-8434-4cc4329834da
631c328d-b98a-4e60-a3c8-08122b60302a	Lauri M	69f3a714-c3d2-4434-b30b-014da067a58d
2a60f14e-ca1b-4982-97ae-efcd23375291	Pekka	a1a53a6c-632f-467f-a9d8-0458dd1ebf3e
c95bc4dd-ec94-4634-8e83-09ec4a86234d	Poika	a1a53a6c-632f-467f-a9d8-0458dd1ebf3e
c227c16e-3847-42cd-878a-b2de9aa428f9	Tyttö	a1a53a6c-632f-467f-a9d8-0458dd1ebf3e
dbe4db82-789f-439f-8bf8-b039c33a807d	Nainen	a1a53a6c-632f-467f-a9d8-0458dd1ebf3e
b3308885-04d1-4dcf-a953-dcc3c5d2b707	Mies	a1a53a6c-632f-467f-a9d8-0458dd1ebf3e
378b96cc-6e69-4d33-8f67-db09e69d40cd	Muu	a1a53a6c-632f-467f-a9d8-0458dd1ebf3e
9d53c7a4-86d6-4dfc-858a-264a5f0da7c5	Yksi	77114574-edbe-4e28-91d3-dfe462e32136
4881184a-d9e2-400d-9622-78da070b3d47	Kaksi	77114574-edbe-4e28-91d3-dfe462e32136
9d32bff1-1071-4b40-aaad-1b037d1d96a4	Kolme	77114574-edbe-4e28-91d3-dfe462e32136
1fb19977-06e3-4b97-9e19-843fb8115514	Pekka P	69f3a714-c3d2-4434-b30b-014da067a58d
39a7cc68-cf8a-4a3c-a301-3c579d8ab68a	Matti M	69f3a714-c3d2-4434-b30b-014da067a58d
ce7c40d0-5372-4b0b-88ce-9b94fabdc424	Maija S	69f3a714-c3d2-4434-b30b-014da067a58d
d2af8e38-e557-4a9c-8e29-c772492606aa	Matti M	ba900802-f46a-4f7e-9d4a-e3bf16c0904c
d8a4e73e-850b-4742-85ab-7c67b6e55b29	Uusi	a1a53a6c-632f-467f-a9d8-0458dd1ebf3e
1e125949-c5d1-4b2a-946f-f0c2863823e9	Pekka P	ba900802-f46a-4f7e-9d4a-e3bf16c0904c
4472f7fb-1a36-408c-a281-b9b50681ceaa	Asd	a1a53a6c-632f-467f-a9d8-0458dd1ebf3e
28c45610-171f-4141-8cb4-e6296ef10c51	Maiju E	ba900802-f46a-4f7e-9d4a-e3bf16c0904c
6daf6655-93a9-41b8-a22b-8ae11924f4d8	Tellervo V	ba900802-f46a-4f7e-9d4a-e3bf16c0904c
8798a05d-6d5f-496f-bf43-46ad49086110	Taavetti B	ba900802-f46a-4f7e-9d4a-e3bf16c0904c
e229a33d-fae2-4569-b56a-a5d3225a850a	Mauriina S	ba900802-f46a-4f7e-9d4a-e3bf16c0904c
d2be36c4-e6d0-42e7-a8dc-a108f0c2ddb5	Kalevi K	ba900802-f46a-4f7e-9d4a-e3bf16c0904c
1a3ce7b5-74af-46a2-9092-cc0c262ee980	Tuulevi M	ba900802-f46a-4f7e-9d4a-e3bf16c0904c
f423af27-e96f-4ea8-b689-d8e85ab53ca2	Toka	8f7c3ca7-ebbc-476b-aac8-14ac0aa95cd3
4ed3fbf0-5382-4134-b868-9acb30db3529	Oppilas	8f7c3ca7-ebbc-476b-aac8-14ac0aa95cd3
89e9ab33-9a0b-4a22-9951-a44f9f715f4f	Terveterve	0ca3e239-0437-4693-aebe-09d8f11e63c2
341a0f48-42b8-446e-a8f1-7a30faa0d1b1	Moimoi hei hei	0ca3e239-0437-4693-aebe-09d8f11e63c2
1d0f5e58-428a-47ae-9a17-303a30c5e76d	Uusi moi moi	0ca3e239-0437-4693-aebe-09d8f11e63c2
\.


--
-- TOC entry 3364 (class 0 OID 16462)
-- Dependencies: 215
-- Data for Name: Teacher; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Teacher" (id, email, "passwordHash") FROM stdin;
9f2dfed2-48c6-418d-bfbf-2019e8368311	eke@email.com	$2a$12$ZhsDWwGRJeeHgiKRkOHC1e2WnGIDKdBdSgIS2EaeEX0vhJIQBQASG
473b02e3-044e-4d79-a947-d8cf52f4bfb3	test@email.com	$2a$12$LlHdsHQIA/muyargXgda4.fBn0dx6XGHd7cdHeBwcufKnR4jGvoYW
\.


--
-- TOC entry 3363 (class 0 OID 16453)
-- Dependencies: 214
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
93b05c9f-d1e0-4922-a1bc-dbe2b2dbf76c	b379deefa4a67298b58446847420bf02ba0226020e98e6b4a9c00b375607695e	2023-03-01 09:45:09.381976+00	20230223160957_init	\N	\N	2023-03-01 09:45:09.359984+00	1
94fa6d83-6abd-4950-a1ed-391deb70bdb5	721c829f97ff3a53db02fd3a75d63244216f19825b764e0d5cc470067ea8ba0a	\N	20230419112352_add_class_year	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20230419112352_add_class_year\n\nDatabase error code: 23502\n\nDatabase error:\nERROR: null value in column "id" of relation "ClassYear" violates not-null constraint\nDETAIL: Failing row contains (null, PRIMARY_FIRST, 96671fa3-27c9-4efb-8434-4cc4329834da).\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E23502), message: "null value in column \\"id\\" of relation \\"ClassYear\\" violates not-null constraint", detail: Some("Failing row contains (null, PRIMARY_FIRST, 96671fa3-27c9-4efb-8434-4cc4329834da)."), hint: None, position: None, where_: None, schema: Some("public"), table: Some("ClassYear"), column: Some("id"), datatype: None, constraint: None, file: Some("execMain.c"), line: Some(1968), routine: Some("ExecConstraints") }\n\n   0: sql_migration_connector::apply_migration::apply_script\n           with migration_name="20230419112352_add_class_year"\n             at migration-engine/connectors/sql-migration-connector/src/apply_migration.rs:105\n   1: migration_core::commands::apply_migrations::Applying migration\n           with migration_name="20230419112352_add_class_year"\n             at migration-engine/core/src/commands/apply_migrations.rs:91\n   2: migration_core::state::ApplyMigrations\n             at migration-engine/core/src/state.rs:200	\N	2023-04-20 08:27:25.462511+00	0
20ec6648-c639-447e-9d7b-4ebfa87e102d	fa370045669a4054a9e149925c28622620a919bd08890c3ba8ea1f0c4a04013f	2023-03-01 09:45:09.392062+00	20230223161150_description_and_notes_optional	\N	\N	2023-03-01 09:45:09.386249+00	1
8066fcaa-84a0-41c8-9b7d-77c0d548f9aa	df9edb7f62c2956fe0145a4c64b97406dc37963ddc83a621bb9c17a58fcd5589	2023-03-01 09:45:09.401376+00	20230224201012_make_ratings_voluntary	\N	\N	2023-03-01 09:45:09.396374+00	1
b8118d86-464d-4c8d-97b9-a6c9b78743c5	5824d8b8ef722b39ebe6f424437133c7b19ffdcdb7fc7685622fe65baf087c1c	2023-03-01 09:45:09.408633+00	20230225084447_add_password_hash	\N	\N	2023-03-01 09:45:09.403666+00	1
7d0b2b81-5082-4996-a5e1-4154dc85d71b	1c1cc8d4615292758155c01c061621566a575e6419f46d7e6889c93a6c98eeb6	2023-03-04 07:34:08.372176+00	20230304073408_add_cascade_deletes	\N	\N	2023-03-04 07:34:08.349388+00	1
07e95056-aedb-4f78-bdce-2fc9db63186a	0b75b4a387d5460641f545e5842fa4bc854b45eaf0351575ad2b8e9ae669718e	2023-03-04 08:57:42.524715+00	20230304085742_add_was_present_field	\N	\N	2023-03-04 08:57:42.49885+00	1
1912b6f4-a01f-4b8e-9291-685fec22b528	a78677f335a0106da3ffaa51c476a53bdb0815d25f5597b848b145e5a151caa9	2023-03-05 08:43:52.609921+00	20230305084352_rating_enum	\N	\N	2023-03-05 08:43:52.593346+00	1
3a4635ec-0a4e-4578-8fbc-e3a8d989dc4b	8bbbb46544a7fc9e118d5a89e7904b9bbf0ab68754419f304124f37b2b264025	2023-03-05 17:56:39.62981+00	20230305175639_add_great_rating	\N	\N	2023-03-05 17:56:39.61837+00	1
8d3603c5-07cd-48ae-ad4f-27efbe777866	bcfcf4daff679c29e232ad994388150180ef0bc13cb5a92057e13358a0a84ab2	2023-03-07 15:40:24.900027+00	20230307152132_rename_class_to_group	\N	\N	2023-03-07 15:40:24.889953+00	1
2745d279-9278-4d0b-99b3-e0e1f75dcd32	e4c5a98596ef886aaa9f8240ee974ca9668d312151eddfd24cc5efa1b572f3b4	2023-03-12 15:11:19.273215+00	20230312151119_cascade_student_delete_to_evaluationt	\N	\N	2023-03-12 15:11:19.256519+00	1
2d627872-cafa-4442-96e7-ee36e42c70d1	e98b093364209042095842e5a7af79c98a7370a55fdbc99e364f1c87e017f678	2023-03-30 14:46:34.023397+00	20230330144633_add_updated_at_to_group	\N	\N	2023-03-30 14:46:34.006489+00	1
5f17aede-8d22-4d42-bd33-a4f28e348edc	ac52be372ee64c1433dd367b4a69d2950c982b8443386f140e938cc9dab46f77	2023-04-09 08:18:38.630334+00	20230409081404_add_subject_and_environment_fields	\N	\N	2023-04-09 08:18:38.60816+00	1
8eb3bd4c-8563-4ddc-9f98-aa61acf66b82	6435ed345fe6ed5fabfe828d42083e5375ed570fdde861115d69fba4c2b1ce70	2023-04-09 08:18:44.434336+00	20230409081844_	\N	\N	2023-04-09 08:18:44.426822+00	1
\.


--
-- TOC entry 3211 (class 2606 OID 16483)
-- Name: EvaluationCollection EvaluationCollection_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EvaluationCollection"
    ADD CONSTRAINT "EvaluationCollection_pkey" PRIMARY KEY (id);


--
-- TOC entry 3213 (class 2606 OID 16490)
-- Name: Evaluation Evaluation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_pkey" PRIMARY KEY (id);


--
-- TOC entry 3209 (class 2606 OID 16475)
-- Name: Group Group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_pkey" PRIMARY KEY (id);


--
-- TOC entry 3215 (class 2606 OID 16497)
-- Name: Student Student_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY (id);


--
-- TOC entry 3207 (class 2606 OID 16468)
-- Name: Teacher Teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY (id);


--
-- TOC entry 3204 (class 2606 OID 16461)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3205 (class 1259 OID 16498)
-- Name: Teacher_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Teacher_email_key" ON public."Teacher" USING btree (email);


--
-- TOC entry 3217 (class 2606 OID 28509)
-- Name: EvaluationCollection EvaluationCollection_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EvaluationCollection"
    ADD CONSTRAINT "EvaluationCollection_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."Group"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3218 (class 2606 OID 24839)
-- Name: Evaluation Evaluation_evaluationCollectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_evaluationCollectionId_fkey" FOREIGN KEY ("evaluationCollectionId") REFERENCES public."EvaluationCollection"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3219 (class 2606 OID 29579)
-- Name: Evaluation Evaluation_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3216 (class 2606 OID 24829)
-- Name: Group Group_teacherId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES public."Teacher"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3220 (class 2606 OID 28514)
-- Name: Student Student_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."Group"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2023-04-20 11:35:32 EEST

--
-- PostgreSQL database dump complete
--

