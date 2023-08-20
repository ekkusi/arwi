--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2 (Debian 13.2-1.pgdg100+1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-1.pgdg22.04+1)

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

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
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
-- Name: ClassYear; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ClassYear" (
    id text NOT NULL,
    code public."ClassYearCode" NOT NULL,
    "groupId" text NOT NULL
);


--
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
-- Name: Group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Group" (
    id text NOT NULL,
    name text NOT NULL,
    "teacherId" text NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "subjectCode" text NOT NULL,
    "currentYearCode" public."ClassYearCode" NOT NULL
);


--
-- Name: Student; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Student" (
    id text NOT NULL,
    name text NOT NULL,
    "groupId" text NOT NULL
);


--
-- Name: Teacher; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Teacher" (
    id text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL
);


--
-- Name: _ClassYearToStudent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_ClassYearToStudent" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


--
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
-- Data for Name: ClassYear; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ClassYear" (id, code, "groupId") FROM stdin;
2ddc3367-6ac7-4423-ac9e-0da999b30e46	PRIMARY_FIRST	293d7530-587a-4b1a-b216-585601c65f30
d7c6bbd6-d13d-4029-a13f-a3690c520c4d	PRIMARY_FIRST	7ceb709a-05c1-408b-912c-f8196c3b8694
4f8d34c5-bb24-4e3c-931e-91ee96a93333	PRIMARY_FIRST	176d8452-d61a-4115-9c3e-cfeb2c990daa
22ae2af2-d890-4b1a-8359-a8a14c862cf7	PRIMARY_FIRST	a5e350b6-8d0e-40da-a480-a9146a6eb556
0ef6cb66-7b2b-40f6-b8e9-7a37c5c80487	PRIMARY_FIRST	8c596bfe-60ff-4649-a27e-bddc4c81aa7e
5bfd766a-6f9c-4712-8ad9-dcc6dbd72d3f	PRIMARY_FIRST	f3bf4d11-99a7-4ec9-a8a5-cc5743424a92
bb5d74a9-972b-4141-a81b-95b2e3681c3d	PRIMARY_FIRST	1dc7d4c5-27c3-49c4-80de-9afdd54d69a1
f586e1b6-5297-4de1-8c7f-b7d76902ffc1	PRIMARY_FIRST	2701efce-305c-4914-b604-dcea230c2689
ac83bfa3-9f44-4aea-aac0-98e793367206	PRIMARY_FIRST	0af98668-1b27-481f-a1c1-54b3d775ee51
e55d4173-4aa1-4e65-8574-c99710578fdc	PRIMARY_FIRST	69f26527-bdb1-4e38-b999-9f2481fd62f6
0dbc9116-4412-40d5-8271-5e949d4f20a6	PRIMARY_FIRST	54fac98f-4253-487e-9e4e-e0ef4ae2443a
e056e70c-9acb-4de2-a6c7-bac93ba3000e	PRIMARY_FIRST	b5e709c0-8913-42b6-82b0-04d702347380
797914c3-3e04-4caa-8468-830bcc09659b	PRIMARY_FIRST	c3f1e3d5-7abc-44bb-bfa5-12a0fd2c6769
d0839b30-1412-448d-8856-5041b20701ec	PRIMARY_FIRST	aff9ac1f-ab9d-4d21-a161-408240f222d6
b8bf80db-46cf-4b75-a204-a842cc010e3e	PRIMARY_FIRST	eab532a9-07cc-4c9d-b11a-2d4ddb84996d
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	PRIMARY_FIRST	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
ffe74adb-ab34-42bd-b305-eff26e32b6ba	PRIMARY_FIRST	54d739bd-6c9f-48df-850c-78a43ed48a61
72d704a8-e209-4255-a595-40d96c4d42ad	PRIMARY_FIRST	8eda8460-b4f6-4ed0-b43a-253608ef0298
564ee2b5-5c55-4667-8732-f9f45d9ecd5a	PRIMARY_FIRST	c42525f7-172d-4d1f-9bf1-96bbed39414f
0497a2a4-6124-40dc-92d6-8fe3b708331e	PRIMARY_FIRST	1811d42e-eb46-4b97-a067-8d91a4c60bd1
6d55867f-186d-4f87-8317-17cb8d0fd463	PRIMARY_FIRST	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
10c06372-82ec-47ed-962c-77553126f3ae	PRIMARY_FIRST	1dffd2ea-91a3-4f2f-a001-ca61df2631b8
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	PRIMARY_FIRST	9c0fff82-1597-4447-84d2-28051ef96223
ba4535ec-16b4-4070-8a70-83cbe8b51340	PRIMARY_FIRST	1d45a2c2-1ae0-4068-adf4-d09fb4d6f31d
7088e255-6c73-4fa3-8699-3ecf9dbe5964	PRIMARY_FIRST	e61dbeae-376b-4fac-bd5b-7441b0533ee9
de31e354-3f10-499e-b9b8-7c17616175c8	PRIMARY_FIRST	110c9dff-5530-4184-baf5-bb6bb05bb40f
0664b09a-09b6-4ef6-81b3-1e9dc549c446	PRIMARY_FIRST	909b50c8-56c4-4618-bb55-e1a1feb7f1a9
439d550e-a5ef-4f51-a9fc-81fa9a0aed52	PRIMARY_FIRST	88e7273d-605d-483a-ae82-2c548472a6ec
decdfebc-8865-4884-85e2-532e1324b324	PRIMARY_FIRST	2556b6a9-4cab-4b65-99fe-94f5cf5d9123
4c789d28-06db-4d59-bfcd-17c846cea94c	PRIMARY_FIRST	11f9a50c-6d6d-405e-882d-dd0d828980c5
fc783adf-450b-45d5-b189-14ab3c6f7979	PRIMARY_FIRST	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
89d861be-d5e9-41a3-8672-d977b0895d54	PRIMARY_FIRST	018cd027-6fa7-468f-b53a-cee9bbf557cf
d492f954-cd06-4c86-8ce1-fff58bc72e38	PRIMARY_THIRD	909b50c8-56c4-4618-bb55-e1a1feb7f1a9
1e492cde-5525-44dc-b82f-6a34dd7eb995	PRIMARY_FOURTH	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
230317b4-fb83-4092-8da4-e641aadb600b	PRIMARY_NINTH	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
639595a0-0bb4-4c21-b41d-c1c81d2c29f3	HIGH_SCHOOL_FIRST	909b50c8-56c4-4618-bb55-e1a1feb7f1a9
435da3c4-87f7-4597-a447-7a3e6f4b15c4	PRIMARY_FOURTH	f118eb20-2ff4-4bec-a6b7-458e97ef062d
f86f29a9-cce9-4060-a07d-b8d899013b9f	HIGH_SCHOOL_SECOND	562cb013-14e0-4d29-ae33-5ba1813dfec6
b83c3bfe-9b2c-417b-a955-5d725e54f94e	PRIMARY_NINTH	562cb013-14e0-4d29-ae33-5ba1813dfec6
1cc91b32-fe7b-4efe-8b2e-d9cc852d7600	PRIMARY_EIGHTH	41f9142b-c05f-41c7-baea-7afafeabb8c7
ec5578dd-ad95-4279-be72-e0326b8cfd41	PRIMARY_FIRST	fde7c856-7b1b-4ca8-a624-67809c32bd65
f4ca4a93-f8d6-49ba-bea8-8390c99005b8	PRIMARY_THIRD	c65eb9ef-7f0b-48ec-8e07-29b20f9cfeb0
b369b11f-64ed-4278-83d7-588c59886416	PRIMARY_SECOND	57d7802e-5dd9-44d2-a652-4185942f2b97
c8b9bfe7-5d92-434c-97f3-97eb52714267	PRIMARY_SECOND	723f1c8d-8a79-4484-b31b-d2e4f7f50efd
38d0ac99-a402-410a-bf49-523a30d11f83	PRIMARY_FOURTH	556d49fe-2a7d-4818-8a64-3ecc6a59009c
512b3326-704d-4ffc-b566-618cb291d69f	PRIMARY_FOURTH	668d593b-2679-480d-9c37-6a7f5d4fb257
efb5a121-cf07-45c5-9c50-72f7be1fb9ff	PRIMARY_THIRD	018cd027-6fa7-468f-b53a-cee9bbf557cf
\.


--
-- Data for Name: Evaluation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Evaluation" (id, "studentId", notes, "evaluationCollectionId", "wasPresent", "skillsRating", "behaviourRating", "isStellar") FROM stdin;
d3e17332-f892-4c43-84dd-191f725cab6e	a639981f-4bf0-4871-b264-00ad02a9a286	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GOOD	GOOD	f
6db90de4-3daf-41a4-9327-d43b49a4cced	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GREAT	EXCELLENT	f
2c5cf9d7-bdd2-42de-aad0-47ca98bae8a7	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GREAT	GREAT	f
75486885-f53c-4b3b-91b2-32fd69d52a2e	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GOOD	EXCELLENT	f
358c1382-e84d-4004-9f7e-7019500ce3b3	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GOOD	GOOD	f
c4d09c63-5cba-4507-841d-f0e5b1d21c9c	e71cd959-78a0-4843-af83-1e8e741e7edf	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GREAT	GOOD	f
0bec5a10-f69e-4bc7-98c5-1d459547f144	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GOOD	GOOD	f
dfcb3c04-b3d4-4d4c-9420-aacbe85daeb1	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GOOD	GREAT	f
5d875f8d-ed40-4fa5-8138-868ce1123c5d	f03779c1-9d87-439c-8d95-14e384c7d2c0	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GREAT	GREAT	f
178f910b-7546-4153-9bb7-096b220313eb	c942743a-d10b-4460-bc99-44ea941f6f8f	Hienoa työskentelyä pariakrobatiassa	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	\N	f
0ef53625-a314-41f6-a691-1f539195a3dd	5bbc08f9-01e0-4911-9a6a-38790219ce2a	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	f	\N	\N	f
6d3f38c3-78c6-4a87-a521-8f14226b8721	148a28ac-012b-44c4-b684-87a00ace9c72	Työskentelit hienosti parisi kanssa!!	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	\N	f
7ddc395b-4525-49b2-b24c-fba07b241a46	e71cd959-78a0-4843-af83-1e8e741e7edf	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	EXCELLENT	f
90e61cab-6e87-4562-b6e8-e4baaa8736c9	5bbc08f9-01e0-4911-9a6a-38790219ce2a	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	GOOD	f
e861b589-6b77-4d67-a2e5-3282d6d78ae6	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	GOOD	f
67508c44-38e0-490e-8d29-5fc0995b542a	f03779c1-9d87-439c-8d95-14e384c7d2c0	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	GOOD	f
6dfeefc2-da1a-4e4d-9a5b-41c91d64f47e	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GREAT	GREAT	f
0f987059-3361-410c-a4d7-3662e6bdea4e	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	GREAT	f
5aa1f256-ead1-427e-9589-f6ddf3726ce8	148a28ac-012b-44c4-b684-87a00ace9c72	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GREAT	EXCELLENT	f
5a9d1c39-2148-40ac-8ab8-ee1d950a2a42	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	GREAT	f
d9b877cd-cd49-4ec7-b482-fb3b4dcf8d6d	84c79ed7-b6e3-488d-93e7-0462a6e51139	\N	61dae344-c6b1-465d-890c-d542dcd25a4b	t	GREAT	EXCELLENT	f
a87fbc47-31fa-492b-adbd-9353beb64c66	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	61dae344-c6b1-465d-890c-d542dcd25a4b	t	GOOD	GREAT	f
9a1f0588-d101-465e-ab4d-cab6e93212db	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	EXCELLENT	GREAT	f
af1483da-d7a1-45b8-8c8d-3e8af1c4fe08	350594d5-5cd4-4033-9294-6b50102afe7d	Paljon juttelua	4029717a-ba95-4c26-abfe-453df2616d81	t	GOOD	GOOD	f
9acdf63c-981e-48d6-b61c-66d6613a39d8	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	GREAT	GREAT	f
a3ed28b3-d106-41e8-8d3f-4f376c518bba	91a00bae-00db-464f-8376-591e16a5a811	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GREAT	GOOD	f
1ae8beab-580e-41b4-bc24-0cdde7559b30	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	f	\N	\N	f
ff8e5a44-b1a0-4778-bc07-b308e91e2354	81f9f274-c50a-4b30-b0f5-15c1479b942c	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
dc858ea5-f1c5-410a-a734-2bc7c6707899	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	GOOD	GOOD	f
e1ff49cd-aa9c-4cf7-b232-33150eed4d46	17a303e2-58b9-434a-b0e3-a3227ba197dc	Olet taitava uimaan usealla eri uintityylillä	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	EXCELLENT	GOOD	f
46dd36f5-4cff-4955-bdbc-cb601c72a234	a6eb654d-12a2-4350-a687-128314062791	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	GOOD	GREAT	f
0ae73025-7705-4e69-84cb-38f1c1f886c5	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	GOOD	GREAT	f
08a7fffe-d7a2-47c3-b72e-c98e5fb3fbbd	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GREAT	GREAT	f
bb6c82b7-8c12-4e86-8e5c-e6847a75dec6	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GOOD	GOOD	f
de671f6d-a296-4490-8a75-6f2630f6626f	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
471b6bc0-a013-43c5-8806-85709f4d2bdf	49c4aeec-3a4e-4761-b3cf-2546381857f7	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
c8da7618-1c1a-4b77-8f3b-7862e862b0ed	b8bc48bb-2b86-415c-837f-dbad58dd3e2d	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
5ddc9cb4-d683-4b07-8078-a009075a5341	a2a3736c-4cbd-43f4-b8e4-8041a2b9d8f5	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
d8fcc24e-5e1b-40dd-bbf1-e361ffb8dc45	7c413b7f-9005-43a9-9b44-1984a23ae65f	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
9c6558ad-b449-485d-89ea-227d05172154	f96609c4-4c21-4b74-8523-f2c3b78d4c49	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
7e25e499-01bc-49ff-9081-53235dbe2b1f	c7a9dddd-29a9-4698-991f-ecab63cf6fd0	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
09c29031-e45f-43a9-b6e3-e88c68c63626	7b55eeb0-4468-4696-b2fd-a50a7e058ec5	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
fef7e675-bcfa-4ef0-9f1b-1ac7d25a7e6c	25ba77b8-721c-4c32-b5c6-97ea194d2958	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
b6038e1a-b52c-4199-bfe0-9cdca28de633	f826618b-cee5-4d6c-bcde-27e7a74a0b63	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	GREAT	EXCELLENT	f
129c084f-ffd8-4d2e-87ec-2cb6835d93eb	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	GOOD	GOOD	f
023a2aed-1664-44c3-8f6a-6e113f019cb7	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	FAIR	GOOD	f
ebfa93d1-6b9e-4ab5-a216-9c3b09e8ba65	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	f	\N	\N	f
0fff3852-2b56-47cf-90cb-b958946fc5fa	ffcd87aa-e63f-4a34-a82b-ec98c80ff979	Leevi oli vähän tuhmana...	43d83271-76a1-453b-b117-72d4a3741fa6	t	GREAT	FAIR	f
90ee5ccd-ed6d-4f6d-b57b-a1b406fb72c7	b9f75da6-4587-44ca-b3f3-a5bdbaa9fd90	Pelkkää posia!!	43d83271-76a1-453b-b117-72d4a3741fa6	t	EXCELLENT	EXCELLENT	f
9d447fe0-5859-41b6-849c-fda3dc71961b	16c2d264-2e7c-452d-980a-114909d369f3	Eetu ihan ok, vähän lähti Leevin temppuihin mukaan	43d83271-76a1-453b-b117-72d4a3741fa6	t	GREAT	GOOD	f
62c8d1d5-75a0-433d-8716-c1c4cffcb576	ffcd87aa-e63f-4a34-a82b-ec98c80ff979	\N	024a5d62-d90f-4f73-b293-3286175ca586	t	\N	\N	f
4741188e-56cf-4578-a314-53076f1cdaff	b9f75da6-4587-44ca-b3f3-a5bdbaa9fd90	\N	024a5d62-d90f-4f73-b293-3286175ca586	t	\N	\N	f
816490aa-e214-442c-b7a5-e89ff100e920	16c2d264-2e7c-452d-980a-114909d369f3	\N	024a5d62-d90f-4f73-b293-3286175ca586	t	\N	\N	f
4c51fd46-536d-4f40-acea-00d57653ddc9	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	f	\N	\N	f
5b646f41-7f66-4714-9cee-f27701b8ebab	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	GOOD	GREAT	f
2319da22-22c2-49a3-98c0-773905c574d2	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	GREAT	GREAT	f
6e8886bf-11bf-4e4e-be74-0c8cb856cb37	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	GOOD	FAIR	f
34eff05b-d843-4c5d-bda1-13ccb106981c	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	GOOD	GREAT	f
86b9fa0d-9cbb-4a8f-8467-5cfe4bff6b19	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	GOOD	GREAT	f
bdeb30be-2f84-4781-a864-16dcedacad21	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	Toimintaasi on oli seurata vesiliikunta ympäristössä	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	EXCELLENT	EXCELLENT	f
215a6f0b-dec2-4bad-9d66-929817547468	8cc39180-992f-41be-88d7-d798fc88abe0	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	GOOD	GOOD	f
9e0e1a19-5385-432b-b3af-70e8eddaf89b	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	GREAT	GOOD	f
cc0566d7-4e3f-4d6e-89a1-510373e8f394	789e18c3-638d-4651-be65-ec0a1661539f	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	FAIR	FAIR	f
bb60538b-ad6b-41ef-b38c-9580f8e897fb	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	GOOD	FAIR	f
6b7c3223-0f65-4804-acd9-507e1e1f9b47	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	GOOD	GREAT	f
14117cbe-fe0a-4253-b0e3-9e197000cf65	d04c2d81-ce92-4221-990a-64c5e1142ee9	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
bb6dbb55-08e1-49fd-a3e2-a5a105e8d8ec	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	GREAT	f
4bf1a76a-15ad-47cb-870e-21c95cd275c7	86ad5e56-2605-4fd5-a0a2-3004e6136a7c	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
595809a4-fe39-4fb4-bffc-62f453691878	3c489011-57bc-41fa-a0b1-2166fd23bac5	\N	4d3fddca-2214-40dd-aa09-3f4031174783	t	GOOD	GOOD	f
d61d3f11-f3a1-448f-b876-34e3252da7d0	39826f74-cf4a-41b7-a295-5cb63ec3a196	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
1725345e-2045-4087-b903-1f25271b8b4f	954c2876-5f2b-4618-a2c0-8f86ff5b3da5	Kiinniottaminen onnistui ja kehittyi tunnilla. 	4d3fddca-2214-40dd-aa09-3f4031174783	t	GOOD	GREAT	f
b4bd3983-2650-4b42-864a-131cfbeb117a	3d55963e-6744-4828-b25d-c02aaa7ccc4c	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
46e3fd73-f439-4dec-8d3d-94e6f0244676	c2ae2a6b-93f6-4dc5-bcb9-1f90a26c11d8	\N	0b6aeb65-5d32-46cb-9c00-bb7579506258	f	\N	\N	f
9409f479-cccd-4050-bc81-a5dc6f8f0f81	9f830199-bde9-43a4-84e9-986992a1e3d3	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
3f067b52-ad95-4cd4-8f61-c2be39172095	7af2670e-d622-44de-9458-0e3490224f19	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	GREAT	EXCELLENT	f
834176a4-72f6-4c7f-a912-616d1676ebcc	081d3462-484c-45f4-b7df-9eef1712d829	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	GREAT	EXCELLENT	f
03fcfa62-c65e-4344-87c4-d2951535e00c	74c83e0a-3e21-4c01-b18a-a81f7e089d64	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	GREAT	EXCELLENT	f
1294103d-cd0e-41e2-8819-b3edd582a13d	1efd1671-ff54-4332-9da1-474aa3f3ec04	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
bae41fd8-522e-434f-b8be-f68da9854888	45adabcd-6682-4ff7-abee-9f8061af9a3b	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
51d4ec61-4977-4214-8221-d61a724bf834	750d8c1e-30f2-49fc-a445-7acdb4bff78e	Kiroilua ja salista poistumista. Vaikea päivä työskentelyn osalta.	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	GREAT	FAIR	f
bf6d0618-658b-40f8-9874-ea2c6ebf15dd	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	GOOD	GOOD	f
728d69ee-a86d-481a-8885-f771a28c164b	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	Kiroilua ja vaikeuksia työskentelyssä. 	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	GOOD	GOOD	f
f8ab12d8-2675-4517-85e5-fae59a6b1fe5	c4365db1-b405-4aac-ad56-4f21780797c0	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	GOOD	FAIR	f
152ebd69-4200-498e-a8fa-35a37c6ac865	eac386e1-ca07-42b6-9817-50f1d1081903	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	GOOD	GREAT	f
b8e5abb3-e3c6-4e61-8680-5c7a7ccb4cbc	0d39a916-dd79-4bc8-b493-771b456ed8ce	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
9ac970dc-622b-487a-83af-57464b065d51	e25eac4b-ed6a-433b-b311-c27ea3f1faa4	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
7ab154f5-7322-4e02-8b74-d83b2f85f915	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
4ea90939-ce56-4bed-861c-1321bf2b6be4	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	Poistui tilasta omin lupineen. Vaikea päivä. Osallistui viirin ryöstöön tsemppauksen jälkeen.	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	GOOD	FAIR	f
5406d550-0509-494d-af2d-4dca473a0ceb	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	GOOD	GOOD	f
e46fb98b-23a6-4e37-b2d0-cd120e4349a5	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	t	GREAT	EXCELLENT	f
450e11df-53b6-463e-9e90-2046fb22cb81	c0011bcd-6952-4d60-a01b-3b455c7eea4c	Passiivista osallistumista.	117ab460-e5a7-4e15-a674-aed050c43bf5	t	FAIR	FAIR	f
315e796a-3bc7-455e-9fb8-daa4576b042c	67c02902-d7e2-47e1-abef-9d1ae14a3da5	Passiivista osallistumista.	117ab460-e5a7-4e15-a674-aed050c43bf5	t	GOOD	FAIR	f
55d34e7c-e29c-4435-b8a9-5a7aeed4fbd6	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	EXCELLENT	f
5f0afe16-d975-4768-95ca-b2ff7d38444a	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	EXCELLENT	f
3c692436-bc41-4e2a-a71f-46a09d65c13c	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	EXCELLENT	f
9abbe2eb-feb2-41e7-bfcd-e49f0fcc6304	7b55eeb0-4468-4696-b2fd-a50a7e058ec5	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
d07cadb4-e25c-4e49-b3ea-0a2f90d8bdb2	c7a9dddd-29a9-4698-991f-ecab63cf6fd0	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
4e9cf351-5de3-4f8e-8bfb-b06e4796dc19	d04c2d81-ce92-4221-990a-64c5e1142ee9	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
86c9e338-06fd-4113-ba0e-1dbc33bf7744	7c413b7f-9005-43a9-9b44-1984a23ae65f	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
150e9334-cdbd-43d4-bb4e-9e2eb51b060e	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
8879cd7c-4d83-4f37-a88e-796685033cff	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	GOOD	GREAT	f
6c8f7edd-5a6f-4c86-a29c-5905c211a6f5	74c83e0a-3e21-4c01-b18a-a81f7e089d64	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	EXCELLENT	EXCELLENT	f
cdcf9bc5-70c4-4dc1-bfe2-4a4183c83c43	4fa0db05-161f-4165-b00c-52528866490c	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	GREAT	EXCELLENT	f
e868e01b-d4b8-4a8d-95ff-5c5a95e3d21b	4bb3b891-7462-4e8d-ae54-e2df607d1478	Osallistuminen vaihtelevaa. Etenkin alkutunti meni muiden asioiden kun liikunnan parissa.	4d3fddca-2214-40dd-aa09-3f4031174783	t	GOOD	GOOD	f
9970a9b5-cd67-4198-9fff-957c6b7d6bc7	98d2b651-d44d-4a40-ab28-da3fa61df960	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
29fc69f7-2288-4175-8bf3-1137a8f575b4	dc61c65a-cfe6-4743-a80b-98c54491a42c	Loistavaa työskentelyä. Mukana kaikessa. Kokeili ja otti osaa.	4d3fddca-2214-40dd-aa09-3f4031174783	t	GOOD	GREAT	f
47ff899d-a233-4a45-a06a-87a6966dd0a5	1ba24224-da11-4745-be85-ed1ce7bb2669	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
9823bf05-fa4e-4684-9077-edc3063f9a77	8faa9bc9-fbb9-4c0c-ac24-99c987bd412f	Pää kipeä. Oli silti mukana tunnilla ja osallistui myös pelissä!	4d3fddca-2214-40dd-aa09-3f4031174783	t	GOOD	GOOD	f
963ceb8b-5ff9-4d81-b15c-db616470a7cb	81f9f274-c50a-4b30-b0f5-15c1479b942c	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
893d3378-ec05-4662-8e46-fa4d2e3776b5	213addc7-6d5d-4a39-95bf-ded6afa510a6	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
311c164e-ed85-4b25-b818-2b493f147384	dc43f223-8b76-457a-b035-8b186320bdea	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
54ca757b-9690-40c4-ab7c-bef484f70af0	2487435b-5598-4a44-bc31-f93ed8a2ec43	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
37d52524-befd-4e24-994e-529a7fbe610c	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
8cfb9b98-9a81-4bbd-bb15-90b361b62ab6	49c4aeec-3a4e-4761-b3cf-2546381857f7	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
bdde364e-903b-48d1-b481-22e118bef7ca	b8bc48bb-2b86-415c-837f-dbad58dd3e2d	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
b15eb462-fde3-4bd9-a450-77e38069953f	f826618b-cee5-4d6c-bcde-27e7a74a0b63	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
1d43c96b-7a41-4a16-84a3-02c5ee9ce7fa	a2a3736c-4cbd-43f4-b8e4-8041a2b9d8f5	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
007fa2fb-c150-4e96-a253-6a45090632a7	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
752881e2-e6b9-41e7-a1ce-2eaaffcc9c8d	7c413b7f-9005-43a9-9b44-1984a23ae65f	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
45603ef5-c981-4326-a94f-5847ab418113	2487435b-5598-4a44-bc31-f93ed8a2ec43	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	GREAT	GOOD	f
ef32d413-132a-4233-bf3a-2e2493467677	28426aca-f675-46f7-bafc-dc5f7eb649c5	\N	66d2d829-a0e3-4d31-accc-ec37f5bc90c1	t	EXCELLENT	EXCELLENT	f
ed9e0099-b5f1-41a5-bf0e-f45003177695	251b27c1-5684-424b-b17b-7257a311bd33	\N	66d2d829-a0e3-4d31-accc-ec37f5bc90c1	t	GREAT	EXCELLENT	f
64fbe531-806f-4cd4-8f7f-88820f500009	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	66d2d829-a0e3-4d31-accc-ec37f5bc90c1	t	GREAT	EXCELLENT	f
334bc20b-bdfd-463c-897d-72b49ef74111	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	66d2d829-a0e3-4d31-accc-ec37f5bc90c1	t	GREAT	EXCELLENT	f
6e090fd5-ffb7-4c22-8f29-eb2929965bef	9c66fa7f-c08f-4905-9c54-5da739156493	\N	66d2d829-a0e3-4d31-accc-ec37f5bc90c1	t	EXCELLENT	EXCELLENT	f
08e3bf4c-3e8c-4a4b-b495-fb1f84e40069	04629d10-42df-4873-bb8e-a38230d93b8a	\N	66d2d829-a0e3-4d31-accc-ec37f5bc90c1	t	GREAT	EXCELLENT	f
5affd774-e847-468a-8c5f-96e975a0e462	b8a8e21b-2e09-4855-a354-0c48800913c9	\N	66d2d829-a0e3-4d31-accc-ec37f5bc90c1	t	GREAT	EXCELLENT	f
a764fa0e-4749-499f-94ad-4d268b93fc69	f96609c4-4c21-4b74-8523-f2c3b78d4c49	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
94ea6647-ee56-4bb9-8c7b-5fbba0c760a2	c7a9dddd-29a9-4698-991f-ecab63cf6fd0	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
ab08e6ae-65de-475d-a864-e3bcbcad0b37	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
dede9dd8-042b-4646-8f88-68364b19bf2b	7b55eeb0-4468-4696-b2fd-a50a7e058ec5	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
c42632b5-14ee-42ed-a347-3edb9f52222f	25ba77b8-721c-4c32-b5c6-97ea194d2958	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
d1de33f0-c0d8-4c96-8f0d-12fb960ea221	081d3462-484c-45f4-b7df-9eef1712d829	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
77ec0a28-3652-4c91-a17d-8bb411973a8f	d04c2d81-ce92-4221-990a-64c5e1142ee9	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
61009ac7-a25d-4bcf-844e-483e72429bd7	74c83e0a-3e21-4c01-b18a-a81f7e089d64	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
5aff1531-e76b-4002-a586-a26d10b02b26	9f830199-bde9-43a4-84e9-986992a1e3d3	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
6291ee7c-7b55-4dfc-a898-c7bad0f57cd9	750d8c1e-30f2-49fc-a445-7acdb4bff78e	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
f15fddbe-cb59-49be-b14b-024177ba0a27	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	GREAT	GREAT	f
2	75bba92f-9f9c-47c0-a89a-2add75007cf6	\N	726ca314-dc27-480f-923d-10f9c840d1a0	f	\N	\N	f
cc03f567-973d-44b9-925f-dd082dc592ca	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
88b768f0-581b-4c44-a7d1-1cdb35929f93	c4365db1-b405-4aac-ad56-4f21780797c0	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
217a5db5-af13-4f71-b365-ddbb2eeba09e	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
0c0ae688-9c94-4f25-9638-7b69a03f7213	eac386e1-ca07-42b6-9817-50f1d1081903	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
8c5061fb-33d9-48dd-b3cc-ea349659bffe	0d39a916-dd79-4bc8-b493-771b456ed8ce	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
bce6b5d5-f0c8-467c-aff1-aa32a242a370	e25eac4b-ed6a-433b-b311-c27ea3f1faa4	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
60ea7f95-2f7d-4394-a4e8-3b358a6b1100	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
e76fadc4-67af-4f75-aaa5-20cb5c772efe	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
923f2d1d-62d8-4d4d-adc6-6982bc242094	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	\N	d0c10212-08a6-44f8-ad34-cc0edb65b78f	t	\N	\N	f
6719aaac-956c-4aed-97c1-77836653d724	bf05969b-0fcf-4617-a8ea-340ae3a7d9ca	\N	0b6aeb65-5d32-46cb-9c00-bb7579506258	t	\N	\N	f
6aa4f103-d61f-43e6-95c3-156e69bc6cf4	404347be-f571-4254-b055-a06e9a9962f9	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	GREAT	f
9c6fa923-7d22-4074-962b-6944581abbc0	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	GOOD	GOOD	f
ff826293-45d1-4927-9888-84a60866e76f	49c4aeec-3a4e-4761-b3cf-2546381857f7	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	f	\N	\N	f
d4434c4c-e57a-4b8e-83d9-47ed9c40ac55	0d39a916-dd79-4bc8-b493-771b456ed8ce	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
abb47f73-f8a2-43e7-93f4-d3302d54c27c	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	4029717a-ba95-4c26-abfe-453df2616d81	f	\N	\N	f
87e693f9-2acf-4749-9add-d9bafb5ba6ac	a2a3736c-4cbd-43f4-b8e4-8041a2b9d8f5	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
59e8f5ba-58c5-4c69-a24b-2f7e00b8d0b6	213addc7-6d5d-4a39-95bf-ded6afa510a6	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	EXCELLENT	GREAT	f
4c1d12c2-90cc-4d8c-8046-ce2c394f6c61	b05b035e-4867-40c1-965e-f60630bfa457	Ei osallistunut alkuun, jalka kipeä tms.	4029717a-ba95-4c26-abfe-453df2616d81	t	GOOD	GOOD	f
b830b3c4-92b1-44a0-980c-abcff69c1a41	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	GREAT	GREAT	f
9978668a-b487-4f14-afda-1d49df54d0af	e25eac4b-ed6a-433b-b311-c27ea3f1faa4	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
a787ced0-7168-4cca-9678-a8ecada4b216	f826618b-cee5-4d6c-bcde-27e7a74a0b63	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	EXCELLENT	EXCELLENT	f
2f52f172-e781-4057-a297-a04e57743649	9f830199-bde9-43a4-84e9-986992a1e3d3	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	GREAT	GREAT	f
10e3f9b6-8058-4ed0-b7f3-bc7a39dc0358	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	GREAT	EXCELLENT	f
95ff2d6a-5362-491d-980f-319b5a2d8fdd	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	GREAT	GREAT	f
617902db-4ca8-417b-832e-df060b9387fd	2487435b-5598-4a44-bc31-f93ed8a2ec43	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	EXCELLENT	EXCELLENT	f
69743706-6852-4145-b375-fdb95b0de288	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	GREAT	EXCELLENT	f
0104cfed-37c2-4a13-ad9e-c1e4247707f3	c4365db1-b405-4aac-ad56-4f21780797c0	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	GREAT	GREAT	f
1fd9a9bd-ac5f-418c-8585-ce2eed6c7b28	a71c4a77-39cd-4672-a59a-0394bec62fcf	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
1c8c05cd-a916-4a0b-997b-12566c9334fa	f179052b-20ed-4b30-92df-04ae478b0f06	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
3fe48ae3-84ca-408e-831e-cb8f144834c8	74ff2516-b259-4f3d-b68b-dbc5c29d6daa	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
196946f7-8fea-43d6-af55-f0167c3f2336	0d410afb-beb1-4ac1-883c-f4d19f5f858f	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
c267a63a-7984-4db4-b4ca-b328b51e58b9	344890ff-a10d-4801-992d-36bcbcc43663	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GREAT	GREAT	f
6e4d39b2-4f43-4d22-a912-b76c15c30fb8	1b5d1532-f11c-4b7a-bb15-8754ae38223f	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GREAT	EXCELLENT	f
eba7d2a3-34c2-421b-afaa-78d2596be8dc	5b0a3d1b-efdc-4ec5-a0f5-50e84e66966e	Terve terve jotain huomioita	0b6aeb65-5d32-46cb-9c00-bb7579506258	t	\N	\N	f
f82db680-f1c5-4eb6-9931-433aae87f59d	213addc7-6d5d-4a39-95bf-ded6afa510a6	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	GREAT	EXCELLENT	f
52efa44b-18eb-495d-b121-0cee47b6a19e	a9823635-cc6a-4026-ad85-423287d7ec49	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	f	\N	\N	f
064b9e5b-3b61-4d92-b519-9a58e93f810a	e25eac4b-ed6a-433b-b311-c27ea3f1faa4	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	f	\N	\N	f
a763d868-cb93-4fab-9240-70afade0e277	7b55eeb0-4468-4696-b2fd-a50a7e058ec5	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
e6d6c4b0-ba59-46f7-bc72-4a521a59eacd	25ba77b8-721c-4c32-b5c6-97ea194d2958	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
09893d88-3da5-4c16-b6fd-175f3d3db336	081d3462-484c-45f4-b7df-9eef1712d829	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
e8946e72-6fa4-4ac4-845d-3ac32f39543b	d04c2d81-ce92-4221-990a-64c5e1142ee9	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GREAT	GOOD	f
3e813896-cf02-4f93-a48f-8fd7d32890ec	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matilla selvästi kunto on hyvä ja saa salilla tehtyä hyviä liikkeitä. Keskittyminen poikkesi kuitenkin useasti ja Matti häiritsi hieman tunnin kulkua.	abb65c1c-fb0f-44e8-84c8-c542fe24ef96	t	EXCELLENT	FAIR	f
23030189-bfab-490b-aecb-7dabcc178a56	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa harjoitteli tanssin koreografiaa erittäin hyvin ja osasi seurata rytmiä. Hän auttoi muita oppimaan haastavat liikkeet ja piti tunnelman kevyenä.	f9bbb84d-acab-4b52-a890-43dc7709963f	t	EXCELLENT	GREAT	t
0a442d00-c1e2-494a-8bd7-787e46c5b41f	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui sählynpeluuseen sisällä salissa. Hänellä oli vaikeuksia pallon käsittelyssä aluksi, mutta paransi otettaan pelin edetessä. Hän kannusti joukkuetovereitaan ja pelasi reilusti.	87721bf9-2237-4429-9e23-587ae97d05c1	t	FAIR	GOOD	f
83bd22b5-d44d-48eb-bb5e-e1145aca2fb1	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	dd81081e-3ed6-4807-99e9-988af80153fc	t	\N	\N	f
2512c53a-2004-404c-b2e1-5c297ef1752d	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	dd81081e-3ed6-4807-99e9-988af80153fc	t	\N	\N	f
ef741674-c2dc-4c5e-bdee-bee3ca0409ae	a639981f-4bf0-4871-b264-00ad02a9a286	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	GREAT	f
78b1f954-1ff1-4300-aa2d-b4bbbc50a824	bde08c48-5140-47eb-b28b-ce5c86ea8f46	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	f	\N	\N	f
d4e9884d-5080-495e-a9c8-46ebfd05047a	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	EXCELLENT	f
6dfeef35-dc88-42c5-829b-f2811bee4213	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui joogatunnille ja harjoitteli erilaisia asentoja ja hengitystekniikoita. Hän keskittyi hyvin ja auttoi muita osallistujia, kun he tarvitsivat apua.	0928afc3-d50e-4222-9adc-71d1c8dc4593	t	GOOD	EXCELLENT	f
60829fcb-1bb7-4876-9100-768c203a08a2	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	GREAT	\N	f
0803da03-b10a-4150-ac0d-baa6bfbf129c	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	Hienoa työskentelyä pariakrobatiassa	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	EXCELLENT	EXCELLENT	f
5285b2fe-13fd-47f6-9625-d38a81181d29	24c494db-a428-4430-ae3a-c321d5e765f7	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
c981e6ce-8d73-4cfd-8c15-8787982603d4	aff989da-421b-4128-968e-5f54d59ca7a0	Hieman levotonta työskentelyä. Mukana hienosti lopputunnilla.	4d3fddca-2214-40dd-aa09-3f4031174783	t	GREAT	GOOD	f
0e06737d-015e-4de1-8fd6-ce0253d45376	95ef1789-275a-42de-bfc3-c9c006432782	\N	4d3fddca-2214-40dd-aa09-3f4031174783	t	GOOD	GREAT	t
62a333fb-e7f6-43c7-b5ef-3cd281c9b4e4	6c629051-3712-43f1-8f21-c357442fc591	Loistavaa työskentelyä. Mukana kaikessa. Kokeili ja otti osaa. Taitavaa pelaamista ulkokentällä.	4d3fddca-2214-40dd-aa09-3f4031174783	t	GOOD	GREAT	f
0bb8d0d4-1d1a-4838-b80c-7e529e1deff5	b4766346-0c81-4d98-a489-654ca9b3c6db	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
9b7c70f7-808b-4f19-99ca-9d202351e231	36c47c4b-1f5b-43d8-843a-6f74ab4e86b9	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
086d19cc-cd76-492f-ac9f-06e7961559e3	14c62b14-21d5-468c-b04f-89d60b2efc76	\N	d9f552e0-8d39-43a7-9274-dfb573e5dc72	t	\N	\N	f
04256c8c-1987-4b9f-b8e6-b2490c471c88	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	d9f552e0-8d39-43a7-9274-dfb573e5dc72	t	\N	\N	f
5da3eb88-0b43-473f-abc7-5c000992016b	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	d9f552e0-8d39-43a7-9274-dfb573e5dc72	t	\N	\N	f
9c40bbf1-e001-4305-808f-b17c2de3e00d	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	5ce16688-56df-465d-bfb4-04d94f86a484	f	GREAT	EXCELLENT	f
9a99c887-c252-4094-946b-6a7b0b920303	dc43f223-8b76-457a-b035-8b186320bdea	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	FAIR	FAIR	f
ce511306-f1ce-4378-ac23-6b4f36e2ea03	25ba77b8-721c-4c32-b5c6-97ea194d2958	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
6aa5982f-aa68-405e-98b4-d24d45d62ef1	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
9bf829d9-327f-47b9-a4b2-640afd803d2c	81f9f274-c50a-4b30-b0f5-15c1479b942c	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
b26d0e77-7d31-4763-851c-42b6fb7399bf	b8bc48bb-2b86-415c-837f-dbad58dd3e2d	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
846f29aa-f955-4f47-a358-7edec77fb609	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
11f77e84-ba4c-49a4-8ad7-6297054d088a	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	GOOD	GREAT	f
223b8c46-8f6d-4b45-aa30-209487817a96	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	EXCELLENT	f
199f98f7-f1d8-45ce-926c-203840bc9fff	148a28ac-012b-44c4-b684-87a00ace9c72	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	f	\N	\N	f
36514e99-77bd-4fb9-9a88-849e054e3602	bde08c48-5140-47eb-b28b-ce5c86ea8f46	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	f	\N	\N	f
f3dd9d8a-d20a-4c8e-8056-82600a36fd46	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	GOOD	EXCELLENT	f
b4b3e13e-65c3-4bcc-9243-51f64695be7b	e71cd959-78a0-4843-af83-1e8e741e7edf	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	GOOD	GREAT	f
e9688da9-3f77-4c8d-9545-72fba3950f32	f03779c1-9d87-439c-8d95-14e384c7d2c0	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	EXCELLENT	EXCELLENT	f
13181a3d-c9b2-4ad4-9314-b95c9db1b55d	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	GOOD	GOOD	f
3284a007-4a38-4491-add1-094d434b35f4	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	FAIR	GREAT	f
e657bc83-239a-4a6c-9ba4-e39a948c156f	5bbc08f9-01e0-4911-9a6a-38790219ce2a	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	FAIR	FAIR	f
09460a30-04df-43c1-bb45-1c802795937a	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	FAIR	GREAT	f
53eb5d70-1d13-42f9-99ca-6f330b595f09	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	GOOD	GOOD	f
bd4c0b2b-f120-4ea7-8c19-e8bb3c4f0826	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	GOOD	FAIR	f
e1f03edd-8b18-492c-b035-f9d58e8f7abe	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	GOOD	EXCELLENT	f
66f15946-dbf2-48cd-aaa5-77a5e1cbddd2	a639981f-4bf0-4871-b264-00ad02a9a286	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	GOOD	GREAT	f
8cc6b441-e675-4a03-a441-d861521da8da	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	GOOD	GOOD	f
21e7e7c8-ccbb-45c1-93ab-7041a73cf242	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	GOOD	EXCELLENT	f
3edb7de6-59f7-4bcb-ac9d-666dd852200f	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	EXCELLENT	GREAT	f
7cfc61b9-40e9-47a8-95b4-c5b36de6a8ce	7af2670e-d622-44de-9458-0e3490224f19	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	f	\N	\N	f
ab9ef57a-c9c8-49b9-ac98-864fcc475a77	4cdb20f7-d8a7-480c-9379-bbe14d95d933	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	f	\N	\N	f
8ceafa4b-0a1f-4042-99e0-524efaf61de6	81f9f274-c50a-4b30-b0f5-15c1479b942c	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GREAT	GREAT	f
0a9b3402-0628-4f0c-9c56-6c09bc54d2cb	2487435b-5598-4a44-bc31-f93ed8a2ec43	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
e250b909-c09c-40bc-8c20-428ced811d79	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GREAT	GREAT	f
86960ba6-e719-45f1-ac31-3f6cd4a54aa2	b8bc48bb-2b86-415c-837f-dbad58dd3e2d	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GREAT	GREAT	f
2ba4d022-ab40-4042-8ca0-917873740b4f	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GREAT	f
e2e7539e-60d2-4632-9a42-c3dacff53ed0	f96609c4-4c21-4b74-8523-f2c3b78d4c49	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
a5871d61-8d96-4908-ad83-5791250519b3	750d8c1e-30f2-49fc-a445-7acdb4bff78e	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
60a3ff25-177d-4abf-a301-4a7bbb3e2ff0	eac386e1-ca07-42b6-9817-50f1d1081903	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
92f44426-cdf8-4c88-a7bf-c80ea39f03a0	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
83f2f921-64be-497e-b560-fda790dee6e1	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GREAT	GREAT	f
51a729db-a2b8-4c76-a8bb-d97bcbd3e5a9	14c62b14-21d5-468c-b04f-89d60b2efc76	\N	39716719-b0c7-4f70-87eb-221191db0e11	f	\N	\N	f
c11848f7-2ada-45ac-92e9-550a7b8b8b37	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	39716719-b0c7-4f70-87eb-221191db0e11	t	\N	\N	f
816a730c-dab0-40c1-a904-511bc3bc1ca0	b015f02b-0e21-4f21-93d4-8497311b6490	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	EXCELLENT	EXCELLENT	f
8e25ecee-8215-4526-8da3-309f9db807eb	898eaa06-334f-4446-98b3-2368ad2b6cef	\N	79820907-8332-42aa-9f52-a85b12399a81	f	\N	\N	f
92411207-e9c3-4705-ba2d-cd426218cb9a	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	79820907-8332-42aa-9f52-a85b12399a81	t	EXCELLENT	GREAT	f
caa5e796-d379-4dd1-ac30-395feed64cc1	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	\N	79820907-8332-42aa-9f52-a85b12399a81	t	GOOD	GREAT	f
dfba8321-15ba-4ccb-9e06-86251384db25	eb96e883-bf2d-4482-b8c9-6d272ee35354	\N	79820907-8332-42aa-9f52-a85b12399a81	t	GREAT	GOOD	f
a3349e50-3034-4509-83f3-98bb3d83c802	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	79820907-8332-42aa-9f52-a85b12399a81	t	GOOD	GREAT	f
e0f3190e-2d00-4acd-ab1d-3a945e4c149a	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	79820907-8332-42aa-9f52-a85b12399a81	t	EXCELLENT	GREAT	f
1b2647cb-ce39-4fdb-86ce-a14f5daade32	052654dc-bfba-4092-85d4-6894c908f9b1	\N	79820907-8332-42aa-9f52-a85b12399a81	t	EXCELLENT	GREAT	f
3252f1e6-5a52-453a-9641-786610226720	a9823635-cc6a-4026-ad85-423287d7ec49	\N	79820907-8332-42aa-9f52-a85b12399a81	t	GREAT	GREAT	f
12ce1170-c9a9-45d0-ad97-ee3402ff00fc	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	GREAT	EXCELLENT	f
4538f708-e9b5-4b23-9356-4f7ba0c03d73	4cdb20f7-d8a7-480c-9379-bbe14d95d933	\N	79820907-8332-42aa-9f52-a85b12399a81	f	\N	\N	f
348e4df5-2eee-4439-a423-bb9297b06dbd	16149225-d420-4254-88de-36f235415650	\N	79820907-8332-42aa-9f52-a85b12399a81	t	GREAT	EXCELLENT	f
f4858449-0ea6-4f82-a49e-dd3c995d2105	b015f02b-0e21-4f21-93d4-8497311b6490	\N	79820907-8332-42aa-9f52-a85b12399a81	t	GOOD	GREAT	f
36314e9d-48ed-4b68-b2a7-e8a34ec700da	c8e4a140-1c7a-4b6b-b04b-86711a322f58	\N	c3a67d69-4acc-4673-984e-1905a7b3833d	f	\N	\N	f
f7e9fdb6-1a4e-49cd-8b1d-a841cb675682	5c6ab41c-30dc-4f02-9c31-4d691b5469e8	Oli kyllä paras tunti ikinä!!	c3a67d69-4acc-4673-984e-1905a7b3833d	t	GREAT	EXCELLENT	f
8ab79ded-bb01-4816-81fa-e7008ec50d9f	fd559fc1-965a-485c-a34d-1a1d26b8a655	Miksumaista toiminta... Niin kuin aina	c3a67d69-4acc-4673-984e-1905a7b3833d	t	GREAT	FAIR	f
d8f4999c-d94b-4219-a464-757c2ae704f8	d8749772-8bf9-4840-a843-8c117837ade6	\N	c3a67d69-4acc-4673-984e-1905a7b3833d	t	GOOD	GOOD	f
58980a7e-e09a-4879-94ef-85bee2ac52ba	fd559fc1-965a-485c-a34d-1a1d26b8a655	\N	556446ed-89a7-43e4-b9b5-00abe95eceba	f	\N	\N	f
084b41ba-9b90-4816-a647-036f061ba3d3	5c6ab41c-30dc-4f02-9c31-4d691b5469e8	\N	556446ed-89a7-43e4-b9b5-00abe95eceba	t	GOOD	GREAT	f
92dbd97e-2eea-4409-a7fc-3dd618dc70f9	c8e4a140-1c7a-4b6b-b04b-86711a322f58	\N	556446ed-89a7-43e4-b9b5-00abe95eceba	t	EXCELLENT	EXCELLENT	f
a9075e8f-9839-48c8-9489-09a750edccde	d8749772-8bf9-4840-a843-8c117837ade6	\N	556446ed-89a7-43e4-b9b5-00abe95eceba	t	GREAT	EXCELLENT	f
c324e104-7058-42fa-83d5-41cfbff9d4c3	5c6ab41c-30dc-4f02-9c31-4d691b5469e8	\N	6f022179-e8e8-427f-b8fa-fb290acc84f4	f	\N	\N	f
8e5ef312-6716-440d-9e38-f69565c61111	c8e4a140-1c7a-4b6b-b04b-86711a322f58	Ihan paskaa tekemistä, riehu vaan menemään ja koitti hukuttaa muita	6f022179-e8e8-427f-b8fa-fb290acc84f4	t	POOR	POOR	f
25767a44-2e6d-45bc-b303-1116e76dbc2e	fd559fc1-965a-485c-a34d-1a1d26b8a655	Mallioppilas	6f022179-e8e8-427f-b8fa-fb290acc84f4	t	EXCELLENT	EXCELLENT	f
021d30b3-7c1c-4b8b-b5ec-15f7a8a2eea2	d8749772-8bf9-4840-a843-8c117837ade6	Hyvää yrittämistä	6f022179-e8e8-427f-b8fa-fb290acc84f4	t	FAIR	EXCELLENT	f
41c85425-3f1d-4835-b4bc-eabf9bf95714	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	79820907-8332-42aa-9f52-a85b12399a81	t	GREAT	GREAT	f
cb1e1dc2-795e-4bc3-96be-c568af20d5f8	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	79820907-8332-42aa-9f52-a85b12399a81	t	GREAT	EXCELLENT	f
c5d09455-15bb-4409-a245-403e132a94e1	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	4029717a-ba95-4c26-abfe-453df2616d81	f	\N	\N	f
1c400fe3-9be6-4bf8-b33d-e1bfbf1c36f1	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	GOOD	GREAT	f
ea4c008a-7d1d-46d8-930c-7e86f4d522d2	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	GREAT	GOOD	f
51847c50-dd48-430c-aeb0-9f39b73f630c	5fd1effd-1670-4a40-bfaf-75a2a048fc91	Hienosti vastuuta tekemisestä	4029717a-ba95-4c26-abfe-453df2616d81	t	GOOD	EXCELLENT	f
775b839f-2057-405b-9dad-f93a466c617e	720863b3-15b5-4928-b516-5a8ec0cee764	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	GREAT	GOOD	f
a84c7531-a896-4f13-8248-7d8cfb1449dd	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	Ahkeraa työskentelyä!	4029717a-ba95-4c26-abfe-453df2616d81	t	GOOD	EXCELLENT	f
a30b2c0c-0bc8-452d-9091-cbd69798e327	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GOOD	GREAT	f
4cb3d493-09c0-4acc-a8f5-733e24525115	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	GREAT	EXCELLENT	f
377a2350-20de-41d9-93ea-42f9fa453716	f03779c1-9d87-439c-8d95-14e384c7d2c0	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	EXCELLENT	EXCELLENT	f
258c4a16-b29c-4b1c-be07-ce0612a7a87c	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	GOOD	GREAT	f
3e760bf5-1130-45f9-9e5b-d07982db0733	5bbc08f9-01e0-4911-9a6a-38790219ce2a	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	\N	FAIR	f
e31ef1d9-459f-41ce-afdf-de16aad44183	e71cd959-78a0-4843-af83-1e8e741e7edf	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	\N	\N	f
8b8c110f-c31e-459f-8e3f-a89bfde4a5c6	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	GOOD	GOOD	f
be11e8b3-b202-49ec-a220-c0941cea22e8	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	GREAT	FAIR	f
bdeec8e2-f339-487b-b35e-9cae9157dcb9	148a28ac-012b-44c4-b684-87a00ace9c72	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	EXCELLENT	EXCELLENT	f
3d698470-d2df-49d0-ac04-cc3843bd81eb	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	GOOD	EXCELLENT	f
71426393-1438-4f66-ab93-58b9f7a08b4b	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	GOOD	FAIR	f
94539d77-f445-47f8-b113-495f65ac70c0	dc43f223-8b76-457a-b035-8b186320bdea	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
9309c1be-69b3-4ec0-9fea-45880c37b18d	f826618b-cee5-4d6c-bcde-27e7a74a0b63	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
8d443dcd-f5d4-4182-9529-47b421a6962a	7c413b7f-9005-43a9-9b44-1984a23ae65f	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
c98385b4-d8b1-49f6-8b86-a7c00ce5f8b7	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
0354f491-069e-48a7-a40f-5f4435ad5014	9f830199-bde9-43a4-84e9-986992a1e3d3	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
a99de5da-885d-4d8e-8dda-29dedeea0099	c4365db1-b405-4aac-ad56-4f21780797c0	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
904d0ade-7355-4cfe-98da-ea67635b52bd	0d39a916-dd79-4bc8-b493-771b456ed8ce	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
f3ea4a27-3b27-4108-b166-9c3c7e85b71b	8fa5f694-d7a7-49c2-98a2-e1aecdc80d3e	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
28a77b94-85b9-49e8-97f8-74d1b4ea8b36	00179acc-3d3c-496f-98db-fb88756116f4	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
93a2ed98-96b6-46f1-a06a-2b465707ffa8	fb78d640-ca97-407e-9d2b-6390b8a2c77d	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GREAT	EXCELLENT	f
e11e9bb9-28dd-463b-8719-693acb9e41d9	45cedf94-714b-404a-8ad5-db42f55919eb	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GREAT	GOOD	f
c3acb750-988f-4d85-9224-6736fa235d67	e47d29de-6a02-4e63-a52a-964fc17b744e	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GOOD	GOOD	f
2d43b2d6-6864-42cd-8c0d-a81102db03a1	9c66fa7f-c08f-4905-9c54-5da739156493	\N	ca38d48b-f9f3-4528-a4cb-dd823869ce72	t	GREAT	EXCELLENT	f
becd3704-d78b-41d7-a317-179b51cefb8b	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	GREAT	f
d8846dd6-cd10-4eb6-92d7-74995a94975a	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	GOOD	EXCELLENT	f
d0c5ca6a-2c9d-4601-aa86-2bff8625f8c3	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	GOOD	GOOD	f
b1870d5e-e904-48e8-baaf-fedad84d4da2	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	GOOD	GREAT	f
13c6e26e-f66c-4142-be78-bcbeab5dc8b0	bde08c48-5140-47eb-b28b-ce5c86ea8f46	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	\N	\N	f
6f447a0c-5b66-42d0-9d62-d91d9d0d8ee3	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	EXCELLENT	GOOD	f
d36acd1b-7d72-4c85-9e72-e529677b3ec5	a2a3736c-4cbd-43f4-b8e4-8041a2b9d8f5	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
113817d5-2a93-46d4-b979-31ad9a448944	c7a9dddd-29a9-4698-991f-ecab63cf6fd0	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	EXCELLENT	GOOD	f
109ea5bf-b533-41fb-ad2e-b8b80867b466	74c83e0a-3e21-4c01-b18a-a81f7e089d64	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
ffd18cb5-b981-4aac-bf3a-545bf1474c5a	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GREAT	f
4edcc16b-dbcb-4cc0-9b37-dfdc7b5cfbf9	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
92dbbcc6-9d38-481b-8b06-fa07e277ffd6	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	GOOD	GOOD	f
42119a90-6e84-409d-bbe2-630a77a52c51	7af2670e-d622-44de-9458-0e3490224f19	\N	79820907-8332-42aa-9f52-a85b12399a81	t	GREAT	GREAT	f
41060aa1-db71-4790-86db-1caf79bad196	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	79820907-8332-42aa-9f52-a85b12399a81	t	EXCELLENT	GREAT	f
d62cfe94-f530-4df1-b7da-8910445a2d10	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Haistatteli opettajalle. Tämän jälkeen toimi ihan ok	4029717a-ba95-4c26-abfe-453df2616d81	t	FAIR	FAIR	f
5dd5195b-224e-492f-bafb-b6842e51de68	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	fb2ac5a0-bd74-48ee-982a-f9f0a8fe8c75	t	\N	GOOD	f
bf56406d-fff1-4f0b-9716-3ffa08a7b838	24007058-ca39-4c69-9004-c3d29b441fb3	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	GREAT	FAIR	f
e677786d-9282-4569-9a76-f44c7f358baf	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	fb2ac5a0-bd74-48ee-982a-f9f0a8fe8c75	t	\N	FAIR	f
52859310-45b5-4d91-b308-4686cae4d7bd	14c62b14-21d5-468c-b04f-89d60b2efc76	Jotain huomioita Topin tunnista...	fb2ac5a0-bd74-48ee-982a-f9f0a8fe8c75	t	\N	\N	f
fcca3181-7fb1-4470-b1e3-4935c31494ea	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	Tunnilla vain 15min koska vanhempainkeskustelu	4029717a-ba95-4c26-abfe-453df2616d81	t	GREAT	GOOD	f
16073099-6e63-4972-bcfd-f539558ac6ab	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	GOOD	GOOD	f
51ce0da3-72eb-435f-91aa-50bfd2b5f3b0	abd4148b-b530-4440-b643-34d08a4bb811	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
be87b81a-ee88-4b9a-bdb0-c6220de1fbf9	de28725b-ccaf-45e6-b808-aeeba3fa151e	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
d615da21-6a7b-404d-822b-95bf0d2886d7	f4eb73ad-9a1f-4b7b-8899-b2a07ff4db2d	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
90beb0d6-a972-4c3a-ae96-8e570692e49f	4a3f375e-f8ce-46f9-8b9a-4587d069d036	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
67cdda15-b4c8-4ad1-a257-1ba058e8b72f	1461587b-fedd-4cb1-a122-58dd9ddc3fd9	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
18c58fc0-768b-4c56-886c-5ef9dbf6ff4d	3723e655-2484-4055-8570-13ee693d5a1a	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
6764418d-d718-4ca2-975d-360546158647	3e62f535-90a9-4a75-9748-27ea0d491a54	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
767c41b8-60ed-4405-b567-42c0941d44f5	ad671202-0d1b-4b31-a2fc-9fa9032f3b33	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
f7648376-271e-4670-be17-b709cff81697	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GREAT	GREAT	f
a7ab3448-1225-414a-aed3-e1569c2ec19d	69fec935-4bcd-43ab-9737-a524627dbe1e	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GOOD	GOOD	f
72e531a2-391b-4826-811d-f154e8c3b715	1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GOOD	GOOD	f
269f151b-a344-4a60-9cde-93f08ffa5c54	f9c6b20c-e57c-4e70-9f32-dedd975aab01	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GREAT	GOOD	f
045b7c5d-154f-46b6-86ab-e72e0b661485	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GREAT	GOOD	f
54da02a3-c3bc-4aad-a4ef-d3157a9bc2af	1556394a-6336-4838-8943-19088ecdf5e0	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GOOD	GOOD	f
c74a5aba-a19c-4cfb-ba79-82c66d33efb2	0e963947-3dcf-4f30-b316-ac9d07d81b0b	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GREAT	GREAT	f
dc63518d-2661-4140-80be-cb4b7001cff3	b1ef84a7-2238-4946-bd2d-97aae138bbad	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GREAT	GOOD	f
e8e75962-e96a-4ab8-bd63-7a03417b351f	1f770536-fee1-4ca2-9622-ed816628c9b7	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GREAT	EXCELLENT	f
8e250a16-9b82-4fd5-a1b0-065479a61130	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	39716719-b0c7-4f70-87eb-221191db0e11	t	\N	\N	f
a60e7648-c74c-4082-95d8-e743ea408f2f	49c4aeec-3a4e-4761-b3cf-2546381857f7	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
cfbca5a9-8724-4f16-ba05-bf11fe30d718	63f57cea-4036-4e38-9d84-3c36f99124ef	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GOOD	GREAT	f
e6e37871-5ced-4de3-a633-27bdd4e8fce1	f96609c4-4c21-4b74-8523-f2c3b78d4c49	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
cee65e07-34cb-495d-a771-3b2f585ee150	7b55eeb0-4468-4696-b2fd-a50a7e058ec5	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
fd0bb15e-71d0-479d-a2b2-b7bf3fe75380	c7a9dddd-29a9-4698-991f-ecab63cf6fd0	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
56e09bc2-73bd-436d-8c5f-ae420bfcc5d7	74c83e0a-3e21-4c01-b18a-a81f7e089d64	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
72f9e84b-fe10-4863-9ce3-bd2e15a84af8	d04c2d81-ce92-4221-990a-64c5e1142ee9	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
6665eb7c-ce7f-48b6-b4aa-64d49b96c37a	7c413b7f-9005-43a9-9b44-1984a23ae65f	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
4f5fd389-1f97-41b2-93c4-c794ead4bfa4	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
66ff972d-fe17-4d8b-9252-94134f33d1b6	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	Hyvää rintalihaspumppailua!	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	GOOD	GREAT	f
8a327336-ea60-4a30-91ab-f9dd876a7ded	f826618b-cee5-4d6c-bcde-27e7a74a0b63	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
be4bbeec-242e-40a4-9160-845eb5af2049	16149225-d420-4254-88de-36f235415650	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	GREAT	EXCELLENT	f
da88d9d2-79ed-41b6-b1d5-791b3cfd4953	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	ca38d48b-f9f3-4528-a4cb-dd823869ce72	t	EXCELLENT	EXCELLENT	f
ad495ddd-5e5d-4714-a177-76a1be6a0610	28426aca-f675-46f7-bafc-dc5f7eb649c5	\N	ca38d48b-f9f3-4528-a4cb-dd823869ce72	t	GOOD	EXCELLENT	f
c91422bb-f998-45ee-aabc-2c8d91281bc9	b8a8e21b-2e09-4855-a354-0c48800913c9	\N	ca38d48b-f9f3-4528-a4cb-dd823869ce72	t	EXCELLENT	EXCELLENT	f
6beb90c1-4bdf-4780-bcf2-68c6a61ad9a6	14c62b14-21d5-468c-b04f-89d60b2efc76	Terve terve Toimiiko tämä	a9f2c498-9fa5-4af6-897d-fdb395002668	t	\N	\N	f
023f11d8-4efa-4c33-ae96-7d3be3af1a11	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	ca38d48b-f9f3-4528-a4cb-dd823869ce72	t	GREAT	EXCELLENT	f
c0094014-c170-4aea-80ec-9febc63db701	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	a9f2c498-9fa5-4af6-897d-fdb395002668	t	\N	GOOD	f
91d9f474-4f29-4090-b53c-f5b6d6ee5984	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	a9f2c498-9fa5-4af6-897d-fdb395002668	t	\N	EXCELLENT	f
68554b2c-a45d-4c40-a7ce-2e2b549397b9	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	77b749a1-1322-4918-a8a3-75e5907d24c8	f	\N	\N	f
c7259abc-77b0-463b-87d2-4c82dc6199c9	14c62b14-21d5-468c-b04f-89d60b2efc76	\N	77b749a1-1322-4918-a8a3-75e5907d24c8	t	\N	EXCELLENT	f
15d89a43-2c70-42da-ad8c-49819fdf27ec	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	77b749a1-1322-4918-a8a3-75e5907d24c8	t	\N	GREAT	f
c058b99e-8ce3-4088-8311-c61dca13657a	0d39a916-dd79-4bc8-b493-771b456ed8ce	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
08663318-1cc5-45a7-87aa-76f513c80a53	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	bcaee1c8-84d7-442a-8080-f8cd3b64d5c9	t	\N	\N	f
09f47b31-712f-456e-888e-c02b73ccaa8f	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	bcaee1c8-84d7-442a-8080-f8cd3b64d5c9	t	\N	\N	f
60ac16f1-0d8c-4345-9cb9-cb492bd23daf	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	bcaee1c8-84d7-442a-8080-f8cd3b64d5c9	t	\N	\N	f
27009245-29e6-4b6d-a6cb-9e6914b51d64	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	bcaee1c8-84d7-442a-8080-f8cd3b64d5c9	t	\N	\N	f
42935a5b-3b50-4c70-871f-76b3d90308e7	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	bcaee1c8-84d7-442a-8080-f8cd3b64d5c9	t	\N	\N	f
4df96f50-64e7-4af6-a995-25f3ff3df776	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	bcaee1c8-84d7-442a-8080-f8cd3b64d5c9	t	\N	\N	f
8f4aaffe-ca4a-4ae8-8bba-fb5478f3cdc1	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	bcaee1c8-84d7-442a-8080-f8cd3b64d5c9	t	\N	\N	f
b2ed2d04-26df-470f-8ce4-1582789a4f2b	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	bcaee1c8-84d7-442a-8080-f8cd3b64d5c9	t	\N	\N	f
e056b30c-9eda-4686-8e2f-0f68a462bcc2	2487435b-5598-4a44-bc31-f93ed8a2ec43	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
59378433-2a16-43dd-9ae9-aececdf3b5d4	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
22856c1b-bc18-4f12-a26d-e66c897225d4	a2a3736c-4cbd-43f4-b8e4-8041a2b9d8f5	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
67cbca68-538c-4192-a014-4ad2e17a6a33	e25eac4b-ed6a-433b-b311-c27ea3f1faa4	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
89bd40c3-6e46-43fd-924e-c9900fd05a3b	750d8c1e-30f2-49fc-a445-7acdb4bff78e	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	GOOD	EXCELLENT	f
aceeca68-6d83-460a-9bca-ece4f0b9a476	213addc7-6d5d-4a39-95bf-ded6afa510a6	Hienoa toimintaa. Joka tunnilla täysillä mukana työskentelyssä. Sytyttää muut pelaamiseen.	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	EXCELLENT	EXCELLENT	f
470dcd77-f18d-488b-b7a7-7d1ae49c6cc1	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	f	\N	\N	f
e283f590-bf87-4e57-8367-11acad5cc110	9f830199-bde9-43a4-84e9-986992a1e3d3	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	GOOD	GREAT	f
edb02df9-7930-4d2d-b818-4623df3fd641	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	GREAT	GREAT	f
44996eba-775d-4ae5-aab0-af7c3c696112	c4365db1-b405-4aac-ad56-4f21780797c0	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	GOOD	GREAT	f
3fda7df8-e6fa-4261-ad53-576371883796	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	GREAT	GREAT	f
13288374-b9de-4d47-9f4d-3054e092b11c	148a28ac-012b-44c4-b684-87a00ace9c72	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	GREAT	EXCELLENT	f
627ded6d-fcce-4b5d-b3a9-922dcaf45f7a	a639981f-4bf0-4871-b264-00ad02a9a286	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	EXCELLENT	FAIR	f
0114aa9c-5d99-4ee9-897a-2744989255c6	bde08c48-5140-47eb-b28b-ce5c86ea8f46	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	EXCELLENT	GREAT	f
fbaa36a9-02d7-4a00-8041-a8e2b9e19a82	e71cd959-78a0-4843-af83-1e8e741e7edf	Työskentelit muita kunnioittavasti	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	GOOD	EXCELLENT	f
f0449e8b-a81f-43ad-9993-589aa68450b4	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	FAIR	GOOD	f
d83fca3b-be2a-43d4-a5a4-3cb7ba71cbbe	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	FAIR	GOOD	f
10ee5716-1c23-4bb9-9b34-b8644cf6b9a9	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	GOOD	GOOD	f
1a39769a-3c56-4b43-99f4-4e703cd60549	5bbc08f9-01e0-4911-9a6a-38790219ce2a	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	GOOD	FAIR	f
db54fa3d-7165-4c4e-815b-5c7fb51ac714	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	Työskentelit muita kunnioittavasti	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	GREAT	EXCELLENT	f
d85a77b8-cffb-47f8-b77c-d234d60b4bca	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	GOOD	GOOD	f
d378be3b-9f97-47bb-b46b-14f9d763a924	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	GREAT	GREAT	f
e9568f0a-31d1-4d9e-ac7c-6cc2605b1361	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	EXCELLENT	EXCELLENT	f
69ef1d54-f507-40e4-9785-7b7c2d35dae1	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	Huippuhyvää työskentelyä!	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	GREAT	EXCELLENT	f
0a7f3322-ffa8-4ef0-b62e-c577005658b6	eb96e883-bf2d-4482-b8c9-6d272ee35354	Myöhässä. Hienosti mukana.	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	GREAT	GREAT	f
400a2fc4-56e9-4d67-9571-e8a4a700087d	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	5ce16688-56df-465d-bfb4-04d94f86a484	t	GOOD	GREAT	f
a70ba233-838d-4f62-b8d1-2be61f4bc04e	14c62b14-21d5-468c-b04f-89d60b2efc76	\N	dda6bf2e-e54b-4d84-b5f4-991ebe0e3c89	t	GOOD	GREAT	f
9722fcae-979c-4099-8205-97c6ada8230e	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	dda6bf2e-e54b-4d84-b5f4-991ebe0e3c89	t	GOOD	GREAT	f
15ab15ee-d668-4f74-9eea-ee481c8cac2b	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	dda6bf2e-e54b-4d84-b5f4-991ebe0e3c89	t	FAIR	GOOD	f
3a06715b-cd98-4c4f-98b9-fb37873dd884	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	1966f8dd-9773-4d94-a99b-f078a09f06f9	f	\N	\N	f
0762742d-3c60-4493-b7ca-897c99267bf9	14c62b14-21d5-468c-b04f-89d60b2efc76	Terve	1966f8dd-9773-4d94-a99b-f078a09f06f9	t	FAIR	GOOD	f
55b73435-8f7b-43d6-8ac7-98de1f120787	a37dd7ab-82b3-41ed-b2a4-8213902dd004	Moimoi	1966f8dd-9773-4d94-a99b-f078a09f06f9	t	GOOD	GREAT	f
2593ebba-ba49-4ea3-a2d7-90b6d59aee4d	4cdb20f7-d8a7-480c-9379-bbe14d95d933	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	f	\N	\N	f
a7f71f7e-9531-44c6-9316-35c6300ed75d	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	GOOD	GOOD	f
f8c8e418-059f-42c9-a3bd-e831fcd03a98	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	GREAT	EXCELLENT	f
1d6bd721-055a-4fe1-8fa0-30d77583d53f	eb96e883-bf2d-4482-b8c9-6d272ee35354	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	GREAT	GREAT	f
4f0833a0-4d51-4d31-a29c-482507f5ea0b	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	GOOD	GREAT	f
3b121ad1-13f9-4d6c-8cc7-b61e2cc46c7a	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	EXCELLENT	GREAT	f
be9472a2-2c45-407a-a685-100ad2d64422	898eaa06-334f-4446-98b3-2368ad2b6cef	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	GOOD	GOOD	f
98cd0a8f-7ef8-4f15-a8f6-aa8d973ef855	052654dc-bfba-4092-85d4-6894c908f9b1	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	EXCELLENT	GREAT	f
75aa57bd-eb9e-4e4f-a066-1522e095c1d4	a9823635-cc6a-4026-ad85-423287d7ec49	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	GREAT	GREAT	f
a92dcf95-74e4-4556-83f6-418089ea8b98	b015f02b-0e21-4f21-93d4-8497311b6490	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	GOOD	GREAT	f
e5e609a8-b7eb-4f11-8fe2-ec08362b9ce5	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	GOOD	EXCELLENT	f
860c8d07-9341-4fae-be8c-022bb7f2d770	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	GREAT	EXCELLENT	f
b028d562-16a0-4106-a949-15ba057f4c1d	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	GOOD	GREAT	f
efc403c9-6cfb-4e3d-8817-029e5619c500	9bdfa82d-13bd-40be-9a9b-a57c2a072351	Härväilyä välillä	4029717a-ba95-4c26-abfe-453df2616d81	t	GREAT	GOOD	f
67dfe342-daa0-4498-a7e2-3873da69c6ce	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	\N	\N	f
3665328e-b93c-4119-a51e-8b6fe746a9ca	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GOOD	GREAT	f
8ed27396-8b6f-4e4a-853b-6ad729b30612	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GREAT	GREAT	f
ae2296ab-e95f-4a27-8ece-cfdb667f65f4	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GREAT	GREAT	f
e15699b8-1f0b-47a3-be30-d53812bde9f9	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GREAT	GREAT	f
e91f3106-b1e4-46ce-8f45-2afc8a4378c4	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	EXCELLENT	GREAT	f
13ba203e-fb96-41e3-85bc-419d4a074065	1e2db5dd-c171-460e-bf48-4bc55f04f49e	Vähän härväilyä	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GOOD	GREAT	f
afc8f302-ba94-4625-a513-b256fac67b61	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GREAT	GOOD	f
2c27d290-b510-4de0-b22b-ec8a5b0dda28	404347be-f571-4254-b055-a06e9a9962f9	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GOOD	GREAT	f
fb1c4fa8-d48e-4906-97e0-85863eec6efc	686241e9-7a4e-4eb6-bc99-26699999001b	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GOOD	GOOD	f
d82e9ada-3b53-4156-a86f-ddd24f77f603	2e03b196-3248-4f14-9f2d-4661e503665d	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GOOD	GOOD	f
9ecdddee-5c0e-4e3f-86cd-66b7dd622ce2	b9266745-39ba-4be3-b1a1-421801b79832	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GREAT	GREAT	f
e61d9757-cfa5-49b0-8318-8b51bafe94a7	799b59e5-c962-4f19-9f9d-01518c57a550	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GREAT	GREAT	f
d63d9341-3197-44dd-8ea3-d9b398002125	74e88236-472e-41ea-9475-73c94489ae2e	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GOOD	GREAT	f
ab24c379-ce57-4ec1-a748-7333cf81052f	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GOOD	GREAT	f
ef53f1e7-0c46-403f-8da4-2d68a04489bc	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GREAT	GREAT	f
f51b3c8b-7984-49ab-bfbb-ad9f158e1382	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	GOOD	GREAT	f
3c086364-9cc1-42e4-a4b5-999bc2a860c9	04629d10-42df-4873-bb8e-a38230d93b8a	\N	ca38d48b-f9f3-4528-a4cb-dd823869ce72	t	GREAT	EXCELLENT	f
53b5e770-a6ec-4e31-9505-e4545aaeb74f	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	GREAT	EXCELLENT	f
93ff7f18-628c-4c2b-be49-1c126d311821	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	GREAT	EXCELLENT	f
758497cd-8df7-43bf-83b6-6d397d717669	f03779c1-9d87-439c-8d95-14e384c7d2c0	Työskentelit hienosti, etkä antanut muiden huonon työskentelyn vaikuttaa omaasi	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	GOOD	GREAT	f
6fb1a665-36cf-44c9-84bd-da1ace931922	45cedf94-714b-404a-8ad5-db42f55919eb	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
7d3f6a75-9625-48e4-9b03-a3b568a44026	69fec935-4bcd-43ab-9737-a524627dbe1e	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
45a40c55-2b56-4fdc-9948-e412c3fd3f47	1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
4644e3e0-b3f7-477e-bdb3-f7c8063077ff	abd4148b-b530-4440-b643-34d08a4bb811	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
963be803-40e1-4f35-b6c4-05b3cfd918b3	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	EXCELLENT	EXCELLENT	f
b8f901fc-366f-42aa-99ab-49560898d897	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	GOOD	GREAT	f
9783020d-4b73-4f8e-bd61-53cf791abb11	081d3462-484c-45f4-b7df-9eef1712d829	Hyvää johtamista pelissä. Yritti ohjata pelaajia kentällä ja antaa neuvoja.	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	GREAT	EXCELLENT	f
b8663715-48e5-4e9a-b0c5-5c59d50e9804	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	GREAT	EXCELLENT	f
fe704d65-56b0-47c7-be35-0b4f8ad60d33	251b27c1-5684-424b-b17b-7257a311bd33	\N	ca38d48b-f9f3-4528-a4cb-dd823869ce72	t	GREAT	GREAT	f
2d916d04-6ee7-4867-a9ee-f7e7c0a74c55	16149225-d420-4254-88de-36f235415650	Päätöksenteko välillä haastavaa ja aikaa vievää. Havainnointia paljon kentällä👍	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	GOOD	GREAT	f
222c34c3-bf29-4f66-9651-a17601fc7a9d	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti teki lihaskuntoliikkeet ja venyttelyt huolellisesti. Hän auttoi myös muita osallistujia ja jakoi vinkkejä parhaiden tekniikoiden suhteen.	a8c5e1fb-bb1a-4811-9b48-6faa29f4f619	t	GOOD	EXCELLENT	f
194e0653-620e-48fb-8835-a2f12a5dacc2	4c047cf3-edbb-4aa0-b879-cd84077a8257	\N	abb65c1c-fb0f-44e8-84c8-c542fe24ef96	f	\N	\N	f
70a1a9e3-5000-409e-88b9-371b177ad1d8	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui pyöräilyretkelle ja ajoi noin 15 kilometrin lenkin. Hänellä oli alussa vaikeuksia pysyä muiden mukana, mutta päätti kuitenkin jatkaa ja saavutti lopulta muut.	78187248-1c3a-4f9d-80c5-a7d1a3ccafb8	t	FAIR	GOOD	f
2c9e6d2d-164a-427a-aa4d-f3c456bbb0cd	052654dc-bfba-4092-85d4-6894c908f9b1	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	GREAT	EXCELLENT	f
df455035-9b24-42e0-bbe9-22139279bfae	ad671202-0d1b-4b31-a2fc-9fa9032f3b33	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
e7c36417-97be-4964-bb54-b8552f5f3ee6	e06b8ddd-84b2-4101-abe1-ecea8ecb8afa	\N	539a7959-1d07-42ef-8fc4-a7d7dd4da344	t	FAIR	GOOD	f
2091038f-46a7-4539-a82d-bbc53735a2e9	8f4df76a-3d26-432b-882f-4790ba82a24a	\N	539a7959-1d07-42ef-8fc4-a7d7dd4da344	t	GOOD	GOOD	t
22b07277-7950-4ee1-bfd7-dd7647bda60e	e5cd5e34-6c87-4ccb-81c7-f70bae71ffee	Terve terve	539a7959-1d07-42ef-8fc4-a7d7dd4da344	t	FAIR	GOOD	f
62a1e351-0928-4fc4-8041-d47a1f414aa6	3723e655-2484-4055-8570-13ee693d5a1a	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
41a67c54-8434-475c-9a17-48b19431857d	f4eb73ad-9a1f-4b7b-8899-b2a07ff4db2d	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
0e6a6f16-bad2-47b6-afad-ef4625586de7	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
026bd550-b66a-450e-94cc-c2cb1af90205	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	f	\N	\N	f
f15407e0-069a-4e39-aa30-2e3a0c546ff4	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
ff71751f-b3e2-490a-ac0c-ed09c2166521	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
fd221a05-46eb-4cd3-bc22-28c61c5c18d6	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
831eb762-39d9-40e7-a7d2-316f3e1112c6	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
1acd77c1-5c8c-4374-8ba7-38eb056b7fd2	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
170c60c3-4e09-4e03-a6f7-4f025dca9a0f	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
8644c149-9ab5-4e6c-b982-b9f5d8f69a7d	404347be-f571-4254-b055-a06e9a9962f9	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	f	\N	\N	f
d4695902-aa45-433e-b9d8-dd80cf0b9aa8	686241e9-7a4e-4eb6-bc99-26699999001b	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
6c16a3ec-f904-4a8b-af5a-87a5a606eff7	2e03b196-3248-4f14-9f2d-4661e503665d	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
34262440-72d0-4fd3-a01f-41ff3ba92c71	de28725b-ccaf-45e6-b808-aeeba3fa151e	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
354ddd7c-71ca-478c-aaa4-6d9500d5e1b8	e47d29de-6a02-4e63-a52a-964fc17b744e	Kova vauhti päällä, mutta ei huonolla tavalla.	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	EXCELLENT	EXCELLENT	f
b7dfcfa6-0216-424f-95ea-5a33efb4b24b	aa420673-c8ba-41da-9ee4-061022bb4a51	Taitavaa asettumista kentälle. Hyviä syöttöjä ja pelin rauhoittamista.	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	EXCELLENT	EXCELLENT	f
138d1cfb-4a8f-4b29-a718-8098b9221d62	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	fab75884-b991-40c8-a22f-b9366be377ca	t	GREAT	EXCELLENT	f
88379646-f2e7-4117-98b5-66083e6fc163	b9266745-39ba-4be3-b1a1-421801b79832	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
1b81b2d9-9ef0-4c24-bce3-55e6951c9d36	799b59e5-c962-4f19-9f9d-01518c57a550	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	f	\N	\N	f
ea7cc634-cae7-4406-8e94-78df9417f91d	74e88236-472e-41ea-9475-73c94489ae2e	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
4691e4b7-694e-4373-ba15-0bb579724b06	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
c57b354f-fb20-4934-8571-384894fdbafc	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
463a2f19-39f0-48a8-a286-cc14925c154a	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
da959283-9546-4ce8-af18-cc631055a73f	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	598aa503-e92b-44e2-9eda-b8dd22dff167	t	\N	\N	f
4a9c2623-6581-49b7-a1d3-bd93f3e1bc3c	bcdcfdce-bc43-43af-88b2-ce2f79d40da0	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	f	\N	\N	f
c02892ca-07bd-496d-8b68-3d074b89f50c	7c3affe4-d2a3-4620-907f-abc411bd5534	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	f	\N	\N	f
cfb67864-70d3-465d-9a3f-4d29f5e06157	6bc63090-ea58-4189-b5d1-cba135d9da2b	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	f	\N	\N	f
fd6a0a27-3d7d-4ced-8363-28a9f56cd8da	d21c58bf-a09d-4a2e-ab5f-131a3233f6ba	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	f	\N	\N	f
d5947cee-4762-4494-a941-d840d518da9a	803c9cfd-c665-452f-9cf4-1315a875fa0e	Puolikuntoisena. Teki mindfullnesia ja venytteli mukana.	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GOOD	GREAT	f
1ca5362e-d911-4047-8630-4a0adcb653f4	545958d4-a061-46c0-a58b-e814f2864886	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GREAT	GREAT	f
3a177b8a-d234-45cd-916c-9162ac4d146e	e5570e54-941f-4e8b-b7de-f2dd3d7662e2	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GREAT	GREAT	f
3b19a51f-aa4e-44cb-8ea4-d04d8a29fbd6	f37fb196-de25-4ea8-a1ff-280491ef3865	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GOOD	EXCELLENT	f
c7381146-567d-40e4-b032-c4da0c71a616	7f64f516-bdbd-490a-9d83-6625c9834929	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GREAT	EXCELLENT	f
6796ca44-6c52-452d-a1b3-1aefcc06324d	3a817706-c52d-4a77-8f87-68ef4514aef9	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GOOD	GREAT	f
bc058bb2-e867-4ded-9dbb-fbb7ae60d560	d9dd649b-f9bf-4670-84ea-a102fc16cfcc	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GOOD	GREAT	f
6925dba9-ab22-4963-b595-60c41e8722d4	8597552c-2527-4294-8a08-56d47b563b33	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GOOD	GOOD	f
198965ae-b5ee-448e-863a-93a61291d629	34f18910-a0db-4e48-8129-8416b575d22b	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GOOD	GREAT	f
50c1ad69-cf76-4253-9525-929a5775015e	671ee4af-e36d-437d-b3ec-bee0179c96c4	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GOOD	GREAT	f
4155cb37-085c-4460-b4fa-c50ad052ff79	98160f96-0d06-40e7-9e12-1c1ad90442fd	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GOOD	GOOD	f
7ec04326-b8a1-4b43-b296-27994c8428b7	7b45664d-caff-4e11-a717-7c3e2e1ed7f7	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GOOD	GOOD	f
23532260-247f-4914-bb0a-1ca22c539afc	dc2469d2-1c1d-499c-bb3c-ff061b70307d	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GREAT	EXCELLENT	f
089ef49f-0cc9-4424-bc3e-92aba268941a	f2cd6a55-4291-4848-a66e-36d096f181c4	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GOOD	GOOD	f
6f132ebe-7675-4569-8641-dec720a8f6a0	9ffd35f9-d869-4406-aa8c-cf60cbc47830	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GREAT	GREAT	f
13bbc52a-5a68-4cff-9b07-25ce1d5d49c4	d6b3db8b-50e7-4a6c-8ed2-2247a659a3a9	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GREAT	GREAT	f
2b86c8dd-f2a6-4385-8e97-d19666b78cc6	a17ec781-f403-45b7-b1a2-2ad88dc2038e	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GREAT	GREAT	f
286a9d4e-60dc-4247-814b-a7e72492cac9	f71a7e38-187d-4dfb-823d-f959158a971f	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GOOD	GREAT	f
0734127e-0def-435b-b484-d296bfeb9427	165e6b48-6ffc-498b-a9c4-aac0d7a14fe2	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	GREAT	GREAT	f
a8ec1648-5cef-4866-b75b-4c72be63590b	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Mahtavaa työskentelyä. Avitti muitakin oppilaita keillä pallo ei pysynyt niin hyvin hallinnassa ja yleisesti levitti hyvää ilmapiiriä tunnilla	bca98182-4fea-4c2b-b829-6745f99e0321	t	GREAT	GREAT	f
a1a26c99-a421-4aa1-ab27-7849367eb5e2	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	7a43853a-3729-48b6-83ff-bd9f21a4a9c9	t	GOOD	GOOD	f
02e1a29a-2b79-45ed-9b72-32f8196e026c	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Hieman levoton tunti, lähti mukaan muiden pelleilyihin ja ei oikein keskittynyt tuntiin.\n\n	6216742f-6ee1-4b07-bb6c-8ce031ede1dd	t	GOOD	FAIR	f
b708fc38-99aa-40a2-8c82-02ead8be4bf5	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	6216742f-6ee1-4b07-bb6c-8ce031ede1dd	t	GOOD	GOOD	f
1d4ac376-d0e6-4fb3-b916-1e69d6c39b2d	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Keskittyminen ei mallikkainta, mutta taidot sujuivat oikein hyvin.	c854e589-492b-4b38-97fe-1c8717aa68ac	t	GREAT	FAIR	f
0740ee4f-ccd3-4824-a5d1-d0c28ae11d1b	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	c854e589-492b-4b38-97fe-1c8717aa68ac	t	\N	\N	f
11b5ea8a-47b7-4f28-a42f-88a2588e443d	74ff2516-b259-4f3d-b68b-dbc5c29d6daa	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
d5d634d4-2066-484f-b232-e221f284b6a9	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	bca98182-4fea-4c2b-b829-6745f99e0321	t	GREAT	GREAT	f
799804b5-e434-4334-8724-de0c446cd1b2	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
6b4083a5-7d9d-46d9-83b7-8dfce7b12a67	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
16221ded-e297-4bd4-bf3f-ca4bac170fca	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
cbd5228e-071b-4cf1-81ae-954ce4aeaa68	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
0ed137f4-7c63-4544-a109-24d7b5d42af7	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
0513b2c5-d151-4323-8ecd-1b3136093314	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
d9df3e92-d6c6-44fa-955c-cc4fef1afc90	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
3e95a54e-3e0b-4ac1-b4e3-992a9b1dc152	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
1a8f3053-a4a3-4430-b4b4-6b8e92219b17	404347be-f571-4254-b055-a06e9a9962f9	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	f	\N	\N	f
91e63dd6-6f99-40b0-b938-e6d9e78cc96e	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Hyvä tunti, ok työskentelyä ja pallon heitto sujui melko hyvin	7a43853a-3729-48b6-83ff-bd9f21a4a9c9	t	FAIR	GREAT	f
af3c60d2-713c-468a-8e85-0577a4085910	eac386e1-ca07-42b6-9817-50f1d1081903	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	GREAT	EXCELLENT	f
07c36c33-d55c-4159-a373-cdb576f7fb88	686241e9-7a4e-4eb6-bc99-26699999001b	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
dd245098-5b4d-48b6-9d5f-add192f8df24	2e03b196-3248-4f14-9f2d-4661e503665d	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	f	\N	\N	f
90ec30f4-52d2-4ed7-8321-421930586fed	b9266745-39ba-4be3-b1a1-421801b79832	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	f	\N	\N	f
2435704d-f9f6-4c7a-bd82-67cdb0dde505	799b59e5-c962-4f19-9f9d-01518c57a550	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
5664961f-572e-41c0-8fde-e0e5da2e6372	74e88236-472e-41ea-9475-73c94489ae2e	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
91b4fe7c-c1ed-4245-a008-be47c26f1d5a	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	f	\N	\N	f
0f7d620d-ec05-41d5-9487-a60e55248bc5	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
56ac12fe-d1cc-4363-923f-f256bbfa89cf	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	f	\N	\N	f
405f08ea-372d-4c59-ad5a-6f1b3d6e6a09	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	f	\N	\N	f
aa401431-f968-4dfe-9b6e-a5ff349e7f40	148a28ac-012b-44c4-b684-87a00ace9c72	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	GREAT	EXCELLENT	f
53e47dbe-adb0-43f4-8c25-8e5040805dc2	5bbc08f9-01e0-4911-9a6a-38790219ce2a	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	GREAT	FAIR	f
5f55f8e6-d3c5-4885-9474-6a2065209f80	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	GOOD	GREAT	f
85612b6c-c711-4c68-8c4f-0b0389dce68e	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	GOOD	GREAT	f
5ab7119b-a92d-4041-abe9-6d61091c71ba	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	f	\N	\N	f
1fa0c4d1-eeaf-44bc-a123-efe1faa1bb0c	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	Olet taitava välineenkäsittelijä	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	GREAT	GOOD	f
5feb7372-677a-481d-a33a-6b6ff5ed76b4	bde08c48-5140-47eb-b28b-ce5c86ea8f46	Lopetit työskentelyn, kun ope ei suostunut ottamaan leikkiä tunnin loppuun	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	GREAT	FAIR	f
7aa20023-1579-4ddb-a963-f3da3b5e2fae	e71cd959-78a0-4843-af83-1e8e741e7edf	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	GOOD	GOOD	f
acdf85f8-88a0-44c3-9074-f1082d3e4811	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	Haastoit omia taitojasi hienosti vanteiden avulla	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	GREAT	EXCELLENT	f
9d342419-4a5a-45d8-99d4-c59d7a15f61d	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	GOOD	GREAT	f
f1541b5b-f366-4fa0-acdc-a68b8c40cb0a	f03779c1-9d87-439c-8d95-14e384c7d2c0	Työskentelit sinnikkäästi ja lopulta opit uuden taidon	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	GOOD	GREAT	f
81826e45-99b9-4f50-a064-a73aa2fffa01	dc43f223-8b76-457a-b035-8b186320bdea	Vatsa kipeänä. Ei osallistunut suureen osaan sisällöissä. Hienosti kuitenkin kertoi tämän päivän tuntemuksistaan ja oli mukana reaktioviestissä, mikä oli hieno juttu.	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	FAIR	FAIR	f
681fedde-8d4a-4425-8996-07d3cf10eb57	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	f4ed3757-8623-42a2-a683-4d550a9b6f65	t	GOOD	GREAT	f
7a83354b-110e-4d2b-8a0f-27541f4a9686	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	b54b2774-53ec-4efe-9957-926827ff6edb	t	FAIR	GOOD	f
697ee5bb-901f-47fb-8d4b-5ff2e4b3f08d	f925429c-08cc-4cba-b5d4-d63ccf818c49	Moimoi	b54b2774-53ec-4efe-9957-926827ff6edb	t	GOOD	GREAT	f
5ff8d1dd-d125-4f75-ab0e-d68bf65f1e46	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	GREAT	EXCELLENT	f
28e15912-9ae8-4cc8-92fd-65545d8572e9	f179052b-20ed-4b30-92df-04ae478b0f06	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
ecf94d89-1254-4d88-855f-ee6b461a15cd	60c35aef-6137-44dc-b5d6-b796f1443148	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
e624adc9-bc6c-4b88-8b7a-867c0eb77139	0d410afb-beb1-4ac1-883c-f4d19f5f858f	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
f47f3dcd-4880-40a8-86e9-475b1439dc84	b4766346-0c81-4d98-a489-654ca9b3c6db	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
560ad48d-75dc-4bda-ace7-b57669f6716e	88c69065-37d1-45f2-a48a-a7b12a0694cf	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
19156985-387f-430c-9613-e6a9b1e164d9	1efd1671-ff54-4332-9da1-474aa3f3ec04	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
fc32f726-7155-4489-96c0-b6be7eae5149	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	GREAT	GREAT	f
42109ed1-3dbd-4280-9480-30fed95a8fe5	24c494db-a428-4430-ae3a-c321d5e765f7	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
1b610f16-71d3-42c1-be3a-e76f4053346f	39826f74-cf4a-41b7-a295-5cb63ec3a196	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
ba81145f-5aac-46f8-a4c5-4c5c1c52562d	86ad5e56-2605-4fd5-a0a2-3004e6136a7c	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
f81511b9-d17c-46bf-86f0-3f5fb0d870a8	a71c4a77-39cd-4672-a59a-0394bec62fcf	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
88966ba7-a5c6-4706-a801-e4ee578c22f9	3d55963e-6744-4828-b25d-c02aaa7ccc4c	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
00005d4b-7f05-4f07-9f4c-aeccf0522451	4bb3b891-7462-4e8d-ae54-e2df607d1478	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	EXCELLENT	EXCELLENT	f
d2c26161-405e-48e6-a41c-7506ec3389bc	95ef1789-275a-42de-bfc3-c9c006432782	Välillä meni pelleilyksi työskentely	2adfd36f-10bd-428b-9dfa-03225457702a	t	GREAT	GOOD	f
db3755b0-6862-48d8-ae9f-b077fc1a63a0	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Moimoi	de687f93-05ec-4f40-b524-15aefde3eeb2	t	FAIR	FAIR	f
18246b7e-9b50-475e-a03e-5a4a60163500	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	de687f93-05ec-4f40-b524-15aefde3eeb2	t	GOOD	GOOD	f
9726ca3b-39a7-4591-938a-73c3242f2728	92d51cc4-7e8c-4bcf-84b8-b3f4cad005cc	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	EXCELLENT	EXCELLENT	f
788f717f-76cf-4f2e-a103-5dfc75959c1f	954c2876-5f2b-4618-a2c0-8f86ff5b3da5	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	EXCELLENT	EXCELLENT	f
e1ba5c99-653f-4782-a3d4-a31dc12b19b4	bcdcfdce-bc43-43af-88b2-ce2f79d40da0	Omatoiminen jooga! 	1b994224-f869-4001-9336-6c5d07fe8e39	t	GOOD	GOOD	f
9992af2d-3bcc-4cf1-b20b-a9436fb6db80	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Toinen huomioi	f4ed3757-8623-42a2-a683-4d550a9b6f65	t	GREAT	GREAT	f
305e6c26-9a9c-4c5c-89d7-c56f0284a5f5	98160f96-0d06-40e7-9e12-1c1ad90442fd	\N	1b994224-f869-4001-9336-6c5d07fe8e39	f	\N	\N	f
64988bec-a018-4dd4-8f7c-d22bb92bd68d	d6b3db8b-50e7-4a6c-8ed2-2247a659a3a9	\N	1b994224-f869-4001-9336-6c5d07fe8e39	f	\N	\N	f
f5437440-65d9-41d5-aee5-404c60393e47	803c9cfd-c665-452f-9cf4-1315a875fa0e	\N	1b994224-f869-4001-9336-6c5d07fe8e39	t	\N	GOOD	f
8cf149b6-16c0-4386-9508-b28896c160a8	545958d4-a061-46c0-a58b-e814f2864886	Omatoiminen jooga!	1b994224-f869-4001-9336-6c5d07fe8e39	t	GOOD	GOOD	f
0133d296-77c9-4050-850b-ec80c7ffc5e5	e5570e54-941f-4e8b-b7de-f2dd3d7662e2	Laiska osallistuminen, salilla ei käytännössä työskentelyä.	1b994224-f869-4001-9336-6c5d07fe8e39	t	GOOD	GOOD	f
fbf846d7-7003-4669-8ab8-8cc2055178f6	7c3affe4-d2a3-4620-907f-abc411bd5534	Vaihteleva osallistuminen. Lopussa salilla mukana.	1b994224-f869-4001-9336-6c5d07fe8e39	t	GOOD	GOOD	f
6f6e4157-a228-4eb2-b18e-b175e3ce338e	f37fb196-de25-4ea8-a1ff-280491ef3865	Mukana tekemisessä. Hienoa työskentelyä. Itseohjautuvaa!	1b994224-f869-4001-9336-6c5d07fe8e39	t	GREAT	EXCELLENT	f
18fb3460-f96b-4060-b8bd-241a92feae6d	7f64f516-bdbd-490a-9d83-6625c9834929	Tosi hyvää työskentelemistä tunnilla. Innostaa muita.	1b994224-f869-4001-9336-6c5d07fe8e39	t	GREAT	GREAT	f
e449dd50-8396-40af-a01e-f041e547ce4f	3a817706-c52d-4a77-8f87-68ef4514aef9	Kävelylenkillä. Ei varusteita mukana.	1b994224-f869-4001-9336-6c5d07fe8e39	t	\N	\N	f
ef64d323-1d84-4dce-8011-25fab4b2ad20	d9dd649b-f9bf-4670-84ea-a102fc16cfcc	Mukana työskentelyssä. Lopussa myös nyrkkeilyssä!	1b994224-f869-4001-9336-6c5d07fe8e39	t	GOOD	GREAT	f
7da5f695-3fc8-4e4f-a424-4f64af427caa	8597552c-2527-4294-8a08-56d47b563b33	Tällä tunnilla selkeästi aktiivisemmin mukana. Omatoiminen jooga, nyrkkeily yms.	1b994224-f869-4001-9336-6c5d07fe8e39	t	GOOD	GREAT	f
b15f8683-9451-4595-838b-edb5e4630b9e	34f18910-a0db-4e48-8129-8416b575d22b	Vähän puolivillaista osallistumista. Kuitenkin mukana kaikessa!	1b994224-f869-4001-9336-6c5d07fe8e39	t	GOOD	GOOD	f
44617c2d-9176-45a8-8edb-cf40429c2d3d	6bc63090-ea58-4189-b5d1-cba135d9da2b	Kävelyllä. Puolikuntoinen.	1b994224-f869-4001-9336-6c5d07fe8e39	t	\N	\N	f
77d56ff4-1d1b-45ce-a56c-c023555378d5	7b45664d-caff-4e11-a717-7c3e2e1ed7f7	Tänään ei työskentelyssä mukana aktiivisesti. Ei jaksanut.	1b994224-f869-4001-9336-6c5d07fe8e39	t	GOOD	FAIR	f
ffb3cd05-7f4e-4f26-9e1b-2793ad7df202	671ee4af-e36d-437d-b3ec-bee0179c96c4	Vaihtelevaa osallistumista. Puolikuntoisena kuitenkin mukana.	1b994224-f869-4001-9336-6c5d07fe8e39	t	GREAT	GOOD	f
75a1810d-9dbe-4873-9a1d-af7938bd6986	dc2469d2-1c1d-499c-bb3c-ff061b70307d	Osallistuminen tunnille kiitettävää. Innokas ja aktiivinen työskentely.	1b994224-f869-4001-9336-6c5d07fe8e39	t	GREAT	GREAT	f
4d55640d-b6fc-41a0-8a71-cf4205db767c	d21c58bf-a09d-4a2e-ab5f-131a3233f6ba	Omatoiminen jooga! Nyrkkeilyssä mukana.	1b994224-f869-4001-9336-6c5d07fe8e39	t	GOOD	GOOD	f
86d407ec-120d-4f08-b18c-ec49c8615975	f2cd6a55-4291-4848-a66e-36d096f181c4	\N	1b994224-f869-4001-9336-6c5d07fe8e39	t	GOOD	GOOD	f
eb2d4b0a-7885-494d-8bfa-46d11b79ecf7	a17ec781-f403-45b7-b1a2-2ad88dc2038e	Vaihtelevaa työskentelyä tunnilla.	1b994224-f869-4001-9336-6c5d07fe8e39	t	GOOD	GOOD	f
5aa0b0ef-7d7f-489e-ac66-e6b05dea5653	9ffd35f9-d869-4406-aa8c-cf60cbc47830	Omatoiminen Ylläksellä	1b994224-f869-4001-9336-6c5d07fe8e39	t	EXCELLENT	EXCELLENT	f
60c68bdb-56bc-4e18-a33f-ab751230cc99	f71a7e38-187d-4dfb-823d-f959158a971f	\N	1b994224-f869-4001-9336-6c5d07fe8e39	t	GOOD	GREAT	f
c9beea5d-ebe4-4946-a76c-70e1b6fd2b7a	165e6b48-6ffc-498b-a9c4-aac0d7a14fe2	\N	1b994224-f869-4001-9336-6c5d07fe8e39	t	GOOD	GREAT	f
1ade653e-2fca-466d-8a07-f1d0b0684c70	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	f204db7e-8c50-4205-8253-2c4295f4cc23	t	GOOD	GOOD	f
b55f1bce-1e7b-4074-864e-5449485eae93	14c62b14-21d5-468c-b04f-89d60b2efc76	\N	f204db7e-8c50-4205-8253-2c4295f4cc23	t	FAIR	FAIR	f
231183cb-9860-4903-bc79-f61ad3814db1	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	Moimoi	f204db7e-8c50-4205-8253-2c4295f4cc23	t	GREAT	GREAT	f
39a63438-3a6b-4ca0-a80a-22410b19cf80	98d2b651-d44d-4a40-ab28-da3fa61df960	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
671940a8-7f11-4a7f-9713-6ad3295cf6e0	98160f96-0d06-40e7-9e12-1c1ad90442fd	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	f	\N	\N	f
b37762d7-37ac-4325-b4e4-a918540593c5	dc2469d2-1c1d-499c-bb3c-ff061b70307d	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	f	\N	\N	f
d61c414f-1ff9-4111-98b9-1b90520a7487	d6b3db8b-50e7-4a6c-8ed2-2247a659a3a9	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	f	\N	\N	f
40e388c5-1c43-4869-aa4f-03d670e9f205	803c9cfd-c665-452f-9cf4-1315a875fa0e	Vähemmän omaa työskentelyä mutta muiden tsemppausta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	\N	GOOD	f
3cafd45c-5108-435e-8407-8fed9ed9065a	e5570e54-941f-4e8b-b7de-f2dd3d7662e2	Hyvä tekemisen meininki!	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	\N	GREAT	f
a611bcda-1994-4ee4-82e5-a8c14843ab25	545958d4-a061-46c0-a58b-e814f2864886	Lentopallossa hieno itseohjautuvuutta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GOOD	GREAT	f
21906a22-268d-431f-b85f-2c5d11217853	7c3affe4-d2a3-4620-907f-abc411bd5534	Innokasta osallistumista.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GREAT	GREAT	f
8b195d7d-bd5d-4da6-952a-761a591698f6	f37fb196-de25-4ea8-a1ff-280491ef3865	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GREAT	EXCELLENT	f
6e4c2d47-a98f-45f5-9ba5-4f0ad90f3f36	7f64f516-bdbd-490a-9d83-6625c9834929	Auttoi Ainoa salilla. Kokeili uusia juttuja!	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GREAT	EXCELLENT	f
de2db57c-6000-4605-9886-eb05c7e3da28	8597552c-2527-4294-8a08-56d47b563b33	Lentopallossa hieno itseohjautuvuutta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GOOD	GREAT	f
cbab7b31-f469-4a53-b86a-1dc81fae679b	d9dd649b-f9bf-4670-84ea-a102fc16cfcc	Lentopallossa hieno itseohjautuvuutta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GOOD	GREAT	f
7505a97d-5ddc-468a-839b-925eb5f5268f	6bc63090-ea58-4189-b5d1-cba135d9da2b	Lentopallossa hieno itseohjautuvuutta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GOOD	GREAT	f
86fc9bf0-2394-446c-b0bc-2488d9621e92	671ee4af-e36d-437d-b3ec-bee0179c96c4	Lentopallossa hienoa itseohjautuvuutta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GREAT	EXCELLENT	f
de0ff127-63ec-4b8f-b7a0-42b259b24061	7b45664d-caff-4e11-a717-7c3e2e1ed7f7	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GREAT	EXCELLENT	f
0238b222-9ec6-4022-a30c-712383d3d407	f2cd6a55-4291-4848-a66e-36d096f181c4	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GOOD	GREAT	f
2785c423-c8c2-4948-8b89-1de256c5d279	d21c58bf-a09d-4a2e-ab5f-131a3233f6ba	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GOOD	GREAT	f
49c63a8b-0eaa-40bd-afee-e5b7d9c22112	9ffd35f9-d869-4406-aa8c-cf60cbc47830	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	f	\N	\N	f
45ce8007-5393-4e46-99f0-a93a94e01fa6	bcdcfdce-bc43-43af-88b2-ce2f79d40da0	Lentopallossa hieno itseohjautuvuutta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GOOD	GREAT	f
8a215e13-6012-4920-a941-6e815de35397	3a817706-c52d-4a77-8f87-68ef4514aef9	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GREAT	EXCELLENT	f
6a092fea-d9de-45cb-bcff-2f9aecd44787	34f18910-a0db-4e48-8129-8416b575d22b	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GREAT	GREAT	f
64de6426-a0f0-4b76-9edd-2064946cf3d4	a17ec781-f403-45b7-b1a2-2ad88dc2038e	Ei oikein napannut mikään. Mukana työskentelyssä mutta ei fyysisesti.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GOOD	GOOD	f
83b4467a-9e3c-4f19-91d4-0a8cadee78b6	f71a7e38-187d-4dfb-823d-f959158a971f	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GREAT	GREAT	f
43eed070-d385-4a5c-8fdf-94e088786f96	165e6b48-6ffc-498b-a9c4-aac0d7a14fe2	Lentopallossa hieno itseohjautuvuutta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	GOOD	GREAT	f
7f9676e2-08ba-40ef-875b-d81f40f720cd	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	Kannustit muita ja yhteistyötaitosi olivat erinomaisia	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	GREAT	EXCELLENT	f
543f9415-c6cd-4c17-8ae8-5b85ae0ce95c	05c4f013-bc9a-4155-925b-6f8485bb5378	Työskentelit lentopallo tunnilla erityisen hyvin	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	GREAT	GREAT	f
cacbaf5d-6fed-47df-924c-523dd8999d8a	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	GOOD	GOOD	f
487bf771-2567-4286-b108-4b24e1b701a2	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	GOOD	GREAT	f
b2fc6b4f-3a69-40d0-972a-35c03742bc94	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	\N	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	EXCELLENT	GREAT	f
b63920aa-1203-458e-8249-635e7a87e856	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	GREAT	EXCELLENT	f
e056c388-a14c-4952-a0e9-dd3f1269c2be	5bbc08f9-01e0-4911-9a6a-38790219ce2a	Olit taitava välineenkäsittelijä lentopallo tunnilla	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	GREAT	GOOD	f
85dd5b8d-d39b-49f6-919e-ea1090a94f24	f4fc8254-27a5-4a0d-aca1-03b85e4020ab		b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	GOOD	GOOD	f
d2e4db76-1535-47cd-a694-1ef772be8855	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	GOOD	GREAT	f
07c3a758-1bf3-4db8-a022-6fdfc0c56d4f	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	GREAT	GREAT	f
ec0f157f-d3f1-4717-bcaf-5527379004da	f03779c1-9d87-439c-8d95-14e384c7d2c0	\N	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	GREAT	GOOD	f
5ca85d72-eee4-4a61-aa27-8cfb601f0709	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	GOOD	FAIR	f
7bef522c-e8b0-467f-841e-33ef67772728	a6eb654d-12a2-4350-a687-128314062791	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	FAIR	GOOD	f
d8c83801-951b-433c-bf51-494363643cd7	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	GREAT	GOOD	f
503fa064-ab60-48dd-895b-b2938f35efd3	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	GOOD	GOOD	f
51d87cac-36a1-4fc3-a874-c1e83ea44098	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	e3c72671-2c10-4d64-95e1-107809ee55f2	t	GOOD	GREAT	f
e7673ba6-3d9c-4543-9e07-5bcb4d02a16d	14c62b14-21d5-468c-b04f-89d60b2efc76	\N	e3c72671-2c10-4d64-95e1-107809ee55f2	t	GOOD	GREAT	f
617924eb-83b9-4f81-9ea2-1b942d96baa7	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	e3c72671-2c10-4d64-95e1-107809ee55f2	t	FAIR	FAIR	f
c18c83f6-cfad-4e20-8272-0aef83224068	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	GREAT	GREAT	f
ab42f91c-d02a-4d74-8c98-84ec11f1bf99	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	GREAT	GREAT	f
e90049a0-8edb-4fbd-aeca-2b120afbfd7b	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	GOOD	GREAT	f
6796449c-3701-4fcd-9597-dd85ccdd7470	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	FAIR	GOOD	f
33c7c284-5bd7-4d9f-ab73-8a5fa63be03f	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	GREAT	GREAT	f
33db6f8b-9fd5-4406-80ee-b1c91221e9a5	148a28ac-012b-44c4-b684-87a00ace9c72	Teit hyvää yhteistyötä muiden kanssa	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	GOOD	EXCELLENT	f
8e4a2b51-7016-450a-8e62-c8820b65bd65	a639981f-4bf0-4871-b264-00ad02a9a286	Vahvuutesi pääsee esiin palloilu ympäristössä	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	EXCELLENT	GREAT	f
63c0b326-1454-4ee7-9a38-e0098c0ba8c0	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	Erotuit positiivisella toiminnalla lentopallo tunnilla. Teit hienosti yhteistyötä muiden kanssa	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	GREAT	EXCELLENT	f
a211a144-acbb-458d-8fb4-8ac6fd5e888b	bde08c48-5140-47eb-b28b-ce5c86ea8f46	Kannustan sinua kiinnittämään huomiota työskentelyysi. Toivon enemmän yhteistyötä muiden kanssa	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	GOOD	FAIR	f
23e493c9-a010-4768-8c04-d13ed5c46906	e71cd959-78a0-4843-af83-1e8e741e7edf	Työskentelit kiitettävästi vaikka fiiliksesi ei ollut parhain	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	GOOD	GREAT	f
3acdfbba-fe06-4cbe-9603-f5401f246c54	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	\N	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	GOOD	EXCELLENT	f
57efbc0e-04f3-48d3-823d-a2749ee1621e	1ba24224-da11-4745-be85-ed1ce7bb2669	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
96a31aab-fbeb-43e4-a117-f844dcf9c7db	dc61c65a-cfe6-4743-a80b-98c54491a42c	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	GOOD	GREAT	f
ddd588ff-c9a9-4af6-ae4a-4b0887706387	1b5d1532-f11c-4b7a-bb15-8754ae38223f	Hyvä tsemppaus nyrkkeilyssä	2adfd36f-10bd-428b-9dfa-03225457702a	t	GOOD	GOOD	f
4e109d23-ad72-4d49-a1fe-2d167cc22b84	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	Käsittelit välineitä hienosti, mutta keskity tulevaisuudessa paremmin työskentelyyn, vaikka tunnin aihe ei ole kiinnostavin	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	EXCELLENT	GOOD	f
490f3e50-3551-435f-bf65-0272655a879b	36c47c4b-1f5b-43d8-843a-6f74ab4e86b9	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
73f5cd5a-171d-496f-bd23-c2ec2bda6824	45adabcd-6682-4ff7-abee-9f8061af9a3b	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
7a0c355d-aaf9-4d19-b427-0582d054375f	8a993418-3f13-49b4-bb21-93368d8f7a50	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	GOOD	GOOD	f
6d6823ea-e3e0-4e57-a4f0-fc2c0e993a4d	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	f	\N	\N	f
76da08f7-5fc6-4758-8e8d-900594e5c85b	8faa9bc9-fbb9-4c0c-ac24-99c987bd412f	Huonovointinen	2adfd36f-10bd-428b-9dfa-03225457702a	t	GOOD	GOOD	f
aa8e1773-a036-43e4-98b7-36f4b78ca592	6c629051-3712-43f1-8f21-c357442fc591	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	GOOD	GREAT	f
5c3bdfc6-8bb5-4820-afb4-6b25b15b531b	12acc9ab-19a4-404d-b072-4760f41732dd	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	GREAT	GREAT	f
8cbff5f6-a157-4343-89b2-3c5a17f4206f	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	Huippuhyvää työskentelyä!	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	GREAT	GREAT	f
75f922f8-269e-47e3-be6a-26cba8343e36	84c79ed7-b6e3-488d-93e7-0462a6e51139	\N	f4860d37-f4ca-4ba4-8970-6bb133f22cd3	t	GOOD	GREAT	f
8b76a7d2-726e-4e76-b69b-bd326bafdb1c	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	f4860d37-f4ca-4ba4-8970-6bb133f22cd3	t	GOOD	FAIR	f
69b6d6a9-e0b3-4307-ad8e-33c54cf79c92	898eaa06-334f-4446-98b3-2368ad2b6cef	Ottaa vastuuta yhteisistä oppimistilanteista!	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	GREAT	EXCELLENT	f
e2046ecb-b911-4088-ab5b-932a8ba48b4d	f925429c-08cc-4cba-b5d4-d63ccf818c49	Moi	f60cf3aa-428c-42ac-984e-6f4e8ebdef25	t	GOOD	GREAT	f
90cb7510-69fa-41c3-a01c-6d85d243eec0	4454d03a-54da-4c2c-b931-b4b96ac0d81a	\N	fb37655d-6494-4657-9055-5e6a24b61e2a	t	GOOD	GOOD	f
c9b692e6-bb37-4e70-a983-4d7c3815d86e	4c658b14-0fce-4ca3-ac9a-42558969e0e2	\N	fb37655d-6494-4657-9055-5e6a24b61e2a	t	GOOD	GOOD	f
a9d320fb-10c9-4365-9893-7199c0c23f2a	7c159017-8908-4a89-bc0b-dadcb58a2d03	\N	fb37655d-6494-4657-9055-5e6a24b61e2a	t	GREAT	FAIR	f
c428d13d-7daf-4860-9dc0-5f0137bae897	7131bcea-6594-4433-be62-2dca8ffad861	\N	fb37655d-6494-4657-9055-5e6a24b61e2a	t	FAIR	GREAT	f
261146c0-9494-4b86-aaa6-b21d57cfc05f	f925429c-08cc-4cba-b5d4-d63ccf818c49	Tässäpä testiksi vähän huomiota terve	a25e0294-c261-4524-bdce-1038cfe49910	t	GREAT	GREAT	f
07580433-1a21-4326-b5f1-5b0f58743e6a	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	a25e0294-c261-4524-bdce-1038cfe49910	t	GOOD	GREAT	f
e22ae63c-a7d9-4952-8a27-13a58b2a6b85	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	a25e0294-c261-4524-bdce-1038cfe49910	t	FAIR	GOOD	f
5e2a9cfa-3b67-4e17-ab9b-32d6064b2b71	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	fab75884-b991-40c8-a22f-b9366be377ca	t	GREAT	EXCELLENT	f
0fb074d3-d7c8-49ca-9392-41a74701c1ed	251b27c1-5684-424b-b17b-7257a311bd33	\N	fab75884-b991-40c8-a22f-b9366be377ca	t	GREAT	EXCELLENT	f
3f445131-1c4a-4191-9aef-58c4e0b354cb	9c66fa7f-c08f-4905-9c54-5da739156493	Hyviä suunnanmuutoksia maalialueella	fab75884-b991-40c8-a22f-b9366be377ca	t	EXCELLENT	EXCELLENT	f
1a7bbe7d-0b43-4195-8a47-721ef2f35222	04629d10-42df-4873-bb8e-a38230d93b8a	\N	fab75884-b991-40c8-a22f-b9366be377ca	t	EXCELLENT	EXCELLENT	f
5152c8c3-b8f4-470c-976e-0eaddbba958e	b8a8e21b-2e09-4855-a354-0c48800913c9	\N	fab75884-b991-40c8-a22f-b9366be377ca	t	GREAT	EXCELLENT	f
23ec0152-360d-440f-a897-525cd76026e7	88c69065-37d1-45f2-a48a-a7b12a0694cf	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
f7e7a949-171d-4f21-8375-cb9bd1d905ce	60c35aef-6137-44dc-b5d6-b796f1443148	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
38589380-ede7-4dd6-b5df-280e609e3496	86ad5e56-2605-4fd5-a0a2-3004e6136a7c	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
de765420-0fc7-4508-869e-f341584f4de8	2eceab39-5d0a-4201-a275-17a1bed011a6	Huomioita	f60cf3aa-428c-42ac-984e-6f4e8ebdef25	t	GOOD	GREAT	f
0feac072-d570-4250-9d36-937712aa7ac6	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Jotain muuta	f60cf3aa-428c-42ac-984e-6f4e8ebdef25	t	GOOD	EXCELLENT	f
87ab6033-fc5e-4c08-a39d-df1ef448f8dd	39826f74-cf4a-41b7-a295-5cb63ec3a196	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
2dc5b165-0914-409d-b73d-69fbedd70aad	3d55963e-6744-4828-b25d-c02aaa7ccc4c	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
4a84da83-aee6-4c07-b636-410f1554f69a	1efd1671-ff54-4332-9da1-474aa3f3ec04	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
1cd7ba2a-0314-4bc1-a0a7-8a07ba314ef5	92d51cc4-7e8c-4bcf-84b8-b3f4cad005cc	Hyvää maalivahdin pelaamista	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GREAT	EXCELLENT	f
ddc626b9-edd8-479f-b30e-2011113ebbea	12acc9ab-19a4-404d-b072-4760f41732dd	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GOOD	GREAT	f
a54cae62-fac1-41ba-95ae-1dcf9f72579b	d6bae43b-c9c1-42c3-bd74-736d3be6e4f2	Kovalla vauhdilla!	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GREAT	EXCELLENT	f
e5ef3566-780b-4b1b-86a4-686bb683d386	8a993418-3f13-49b4-bb21-93368d8f7a50	Maalivahtina koko pelin!	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GOOD	GOOD	f
fee88ba9-490c-43a0-98a5-33ee8fedd77e	7e57c1d9-b037-4ae6-a0c9-2b409b90f748	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GOOD	GREAT	f
09c6bcfc-488d-4fbf-ab81-5483ce227b63	3c489011-57bc-41fa-a0b1-2166fd23bac5	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GOOD	GREAT	f
b7ff003e-b0c5-414d-80e6-b93bef186677	954c2876-5f2b-4618-a2c0-8f86ff5b3da5	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GREAT	EXCELLENT	f
051eeb77-dd53-4610-81af-0f1925be6f24	8cc39180-992f-41be-88d7-d798fc88abe0	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	f	\N	\N	f
47dbd556-477f-4397-ab83-598a03b014b9	d6bae43b-c9c1-42c3-bd74-736d3be6e4f2	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	EXCELLENT	EXCELLENT	f
a9d75cfd-aff5-4005-8687-cf390c146011	344890ff-a10d-4801-992d-36bcbcc43663	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	GOOD	GOOD	f
b849be50-e56a-4b8f-9ea1-269785a276a1	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	f	\N	\N	f
66a2b4ed-cf7d-42c5-b842-568d0cc0411c	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	f	\N	\N	f
fc1bded5-f0dc-4fcb-aa70-71d3aef5f5e5	16149225-d420-4254-88de-36f235415650	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	GOOD	GREAT	f
6e5f9f40-0f7f-407e-a44c-f4438c5108f5	7af2670e-d622-44de-9458-0e3490224f19	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	GREAT	GREAT	f
c6eb1c42-8af1-42e1-8003-9bcced11e64b	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	GREAT	GREAT	f
5fe9fc8d-e9e3-4055-b9f9-a51623a22906	eb96e883-bf2d-4482-b8c9-6d272ee35354	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	EXCELLENT	GREAT	f
358f1ac1-101f-4d62-af09-c02b351bf893	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	GREAT	GREAT	f
d1c8ea15-9d50-4a0d-b21b-18f8b8558449	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	GREAT	GREAT	f
71ca963d-41d1-42e8-8d9f-3a5721aa26e9	898eaa06-334f-4446-98b3-2368ad2b6cef	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	GREAT	GREAT	f
7c7c20d4-3239-4b3b-9f0e-9c30a69d28c2	052654dc-bfba-4092-85d4-6894c908f9b1	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	GREAT	GREAT	f
084d998b-a257-403c-9ad0-d0785af603e6	a9823635-cc6a-4026-ad85-423287d7ec49	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	GREAT	GREAT	f
4bed0d32-7aa6-4648-a45e-611437754c5c	b015f02b-0e21-4f21-93d4-8497311b6490	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	EXCELLENT	GREAT	f
0150fb97-8892-421f-8280-b651221054a0	4cdb20f7-d8a7-480c-9379-bbe14d95d933	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	\N	\N	f
87a246c0-f236-4799-a482-b0bb808dea1c	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	GOOD	GREAT	f
21f9b1eb-8c33-453b-afbe-9fd884dcfa48	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	GREAT	EXCELLENT	f
c2e7b9cf-bc5f-4cdc-aaa4-76cfad08f3f8	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	f	\N	\N	f
41e8eda6-0944-4d38-9628-e6f048a62ffd	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	f	\N	\N	f
6656dac8-fc77-43fe-8876-88128aa36b05	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	f	\N	\N	f
e85962e3-c32a-4f52-97da-6f3d25cf4465	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	GREAT	EXCELLENT	f
5d15db5a-9c2d-41c9-ac6b-4cc14dec428b	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	GREAT	GREAT	f
0be36c28-e8d4-4b59-84ca-510a3f67741e	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	GOOD	GOOD	f
86dca618-c24c-4d1a-91f3-555e61436770	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	GREAT	GREAT	f
bddd3177-bc44-46eb-86ba-101ddf5d651e	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	EXCELLENT	GREAT	f
bd16b4c5-0269-430a-9dad-08168486ff12	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	GREAT	GREAT	f
4cac8929-e8c4-4163-a66d-e5eb44b0886a	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	GOOD	GREAT	f
5b4d58dd-74a4-4807-9add-ffb5aea577b5	404347be-f571-4254-b055-a06e9a9962f9	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	GOOD	GREAT	f
0ceb5162-b0a7-490a-8d0e-36b77a4817c0	686241e9-7a4e-4eb6-bc99-26699999001b	Puhelimen käyttö	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	GOOD	GOOD	f
528b2b84-fdb7-4b33-8c75-4b69b0e0c017	2e03b196-3248-4f14-9f2d-4661e503665d	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	GOOD	GREAT	f
c8c9267d-903e-40e5-8f19-96dc9159f666	b9266745-39ba-4be3-b1a1-421801b79832	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	GOOD	GREAT	f
c3540ae1-54f4-41bd-b820-7930a0727bff	799b59e5-c962-4f19-9f9d-01518c57a550	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	EXCELLENT	GREAT	f
b889a48f-5be7-4bad-bfde-902f779c60c8	74e88236-472e-41ea-9475-73c94489ae2e	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	GOOD	GREAT	f
fee0f3b9-a0c2-4525-aba3-9763c8a2b2e7	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	GOOD	GREAT	f
631030fb-43b2-44f5-8364-8c2984d640e5	4943ad21-7f08-4b45-8d6c-7cccbfb05562	Jättäytyi pois osasta toiminnasta	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	GOOD	GOOD	f
7c89f2b2-e949-4209-a069-1283f266707a	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	f	\N	\N	f
d368c281-6ca9-442c-be91-19d184dd2aed	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	f	\N	\N	f
34d1b9f9-231c-4695-8caf-6f0e42aedf55	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	f	\N	\N	f
bea7130c-7046-4668-bc79-1fc282e51989	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Pesiksessä ei kunnollista osallistumista	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	GOOD	GOOD	f
2fec38c8-d33c-4a0e-85c6-d213c7fc3cd7	b05b035e-4867-40c1-965e-f60630bfa457	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	GOOD	GOOD	f
72481adc-c5f2-4d2b-8a27-aa93ca028ff3	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	GREAT	GREAT	f
f784032e-5774-47a4-8478-b64b24d7c406	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	EXCELLENT	GREAT	f
a6a11a43-d27a-4ef0-b03a-57e2fcd00b6b	350594d5-5cd4-4033-9294-6b50102afe7d	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	GOOD	GREAT	f
143480bc-e6ad-4815-a77f-48f831c4131d	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	GREAT	GREAT	f
2299721c-693c-47dd-8c91-11b5a82dd0a7	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	GOOD	EXCELLENT	f
d7baee49-7cd8-4fb1-a6d8-5ea378f7c2bc	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	GREAT	GREAT	f
340df978-2711-497a-9ae3-70e3db6f22b4	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	GREAT	GREAT	f
4f49d81a-4604-41ee-8c19-ac238e703efe	720863b3-15b5-4928-b516-5a8ec0cee764	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	GREAT	GREAT	f
18d56539-19ad-4c9c-bdba-00b4951cfe9a	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	GOOD	GREAT	f
023dea80-106a-4d75-9897-b43e28c2f817	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	GOOD	GREAT	f
6037968c-366e-4d75-b134-257675584810	24007058-ca39-4c69-9004-c3d29b441fb3	Nukkui pommiin	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	\N	\N	f
cab23c51-ca25-4088-a734-2b7225e05c7c	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	GOOD	EXCELLENT	f
6f848f7d-ad94-4a47-958c-1da8d46ae587	aff989da-421b-4128-968e-5f54d59ca7a0	Välillä meni pelleilyksi työskentely	2adfd36f-10bd-428b-9dfa-03225457702a	t	GREAT	GOOD	f
929082a3-667d-4eaf-be46-bc973e68ed75	7e57c1d9-b037-4ae6-a0c9-2b409b90f748	Puolikuntoinen, paikat kipeänä	2adfd36f-10bd-428b-9dfa-03225457702a	t	GOOD	GREAT	f
e6877cb9-b853-4865-9abc-56eebb9411cc	3c489011-57bc-41fa-a0b1-2166fd23bac5	Motivaatio hukassa	2adfd36f-10bd-428b-9dfa-03225457702a	t	FAIR	FAIR	f
557f7ecd-7748-415b-9790-e9aefc5077cf	e06b8ddd-84b2-4101-abe1-ecea8ecb8afa	\N	d92db901-9823-4102-b351-5d20f3c69b1f	t	EXCELLENT	EXCELLENT	f
e835b514-64de-41bd-9b51-7f5f844df617	8f4df76a-3d26-432b-882f-4790ba82a24a	\N	d92db901-9823-4102-b351-5d20f3c69b1f	t	EXCELLENT	EXCELLENT	f
3da3dee7-50c6-43d2-b21c-393cc2dd92f4	e5cd5e34-6c87-4ccb-81c7-f70bae71ffee	\N	d92db901-9823-4102-b351-5d20f3c69b1f	t	EXCELLENT	EXCELLENT	f
240c6dfa-b192-490d-8dfb-3a7da6185b7d	28426aca-f675-46f7-bafc-dc5f7eb649c5	Taitavia katkoja, hyviä ajoituksia	fab75884-b991-40c8-a22f-b9366be377ca	t	EXCELLENT	EXCELLENT	f
216a50df-373c-4804-9711-49dcabb5da96	fb78d640-ca97-407e-9d2b-6390b8a2c77d	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	t	FAIR	GREAT	f
0e23e7ad-9928-42cb-80fa-630c9286cd53	91a00bae-00db-464f-8376-591e16a5a811	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	t	GREAT	GREAT	f
b1e60827-8759-4fc1-8ca3-83ba3ee85551	f9c6b20c-e57c-4e70-9f32-dedd975aab01	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	t	EXCELLENT	GREAT	f
569ec425-ed4a-408b-ab17-c071d5fc344f	e47d29de-6a02-4e63-a52a-964fc17b744e	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	t	EXCELLENT	GREAT	f
d6066a8e-74c7-4455-bd36-0978f6f9a139	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	t	EXCELLENT	GREAT	f
d9ad6273-cc1f-4025-8dd2-1bfe1758af35	45adabcd-6682-4ff7-abee-9f8061af9a3b	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
99d064f1-e540-4314-9021-eb26b7bf8e3c	8fa5f694-d7a7-49c2-98a2-e1aecdc80d3e	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
6f2aa08a-8f06-4392-a33c-b6f28b34c616	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
951c2f3a-e221-4ca1-9159-ebac5f14dd4d	00179acc-3d3c-496f-98db-fb88756116f4	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
55b831fd-06b3-4bd7-99c5-fdea3366a6fa	45cedf94-714b-404a-8ad5-db42f55919eb	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
221ded89-5767-4639-b11b-ed4232a26f3d	1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
4e413201-2642-4d47-b296-e177eb8977ec	69fec935-4bcd-43ab-9737-a524627dbe1e	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
8af78bec-fd38-4ae1-939e-e88c445dc19d	abd4148b-b530-4440-b643-34d08a4bb811	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
91b75f04-fb88-40e5-8cf4-185736eb0351	1556394a-6336-4838-8943-19088ecdf5e0	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
dc35bc44-1a4f-4d99-93c4-e560bf1be9a6	0e963947-3dcf-4f30-b316-ac9d07d81b0b	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
45857959-ce8a-4990-9562-aa35fe740ece	b1ef84a7-2238-4946-bd2d-97aae138bbad	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
bf4f45d2-236c-478c-b53d-23b9f8574c7f	de28725b-ccaf-45e6-b808-aeeba3fa151e	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
268c921c-972b-4c02-a854-6d822be42770	f4eb73ad-9a1f-4b7b-8899-b2a07ff4db2d	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
83bbb858-8430-4e8f-8b93-e943b45cc4e6	4a3f375e-f8ce-46f9-8b9a-4587d069d036	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
d18422e3-34f4-4caa-acc0-ef9b7f9b7647	1461587b-fedd-4cb1-a122-58dd9ddc3fd9	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
82f8853b-4ba0-4353-911b-c3ecb34dae2c	1f770536-fee1-4ca2-9622-ed816628c9b7	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
6245493d-3b5d-4fa9-9e0b-b2db3981d54f	1ba24224-da11-4745-be85-ed1ce7bb2669	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
a21fbe76-29d0-432b-b4df-f4fc06ed1b48	4bb3b891-7462-4e8d-ae54-e2df607d1478	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GREAT	EXCELLENT	f
8465c29a-b30b-4e4d-8831-02a64ae76261	98d2b651-d44d-4a40-ab28-da3fa61df960	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GREAT	GREAT	f
9ef70222-87c7-412e-a6d7-06988ed3b836	dc61c65a-cfe6-4743-a80b-98c54491a42c	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GREAT	GREAT	f
1573c148-c219-4d15-8abd-2c2ed6e5fee6	8faa9bc9-fbb9-4c0c-ac24-99c987bd412f	Tänään oli huippuhyvää työskentelyä	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GREAT	EXCELLENT	f
c3b45eca-5ed0-44db-970c-6785db89cd17	a639981f-4bf0-4871-b264-00ad02a9a286	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	f	\N	\N	f
1b66095b-20e2-4789-a029-376127929ab4	bde08c48-5140-47eb-b28b-ce5c86ea8f46	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GOOD	GOOD	f
8711b51c-04b6-46c1-92f3-5effec003682	63f57cea-4036-4e38-9d84-3c36f99124ef	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
df8b4c39-c7e3-4bd0-b8e5-0fe4c03296ea	3723e655-2484-4055-8570-13ee693d5a1a	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
620de552-4342-4035-b87a-46654604d0cd	3e62f535-90a9-4a75-9748-27ea0d491a54	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
ce8034fb-2421-4265-b9fe-54df01db5700	ad671202-0d1b-4b31-a2fc-9fa9032f3b33	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
7bf66106-77d3-466f-bdfc-108956cdc486	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	t	GOOD	GREAT	f
5fb8264c-b380-455c-92b1-0470a195d5fc	aa420673-c8ba-41da-9ee4-061022bb4a51	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	t	GREAT	GREAT	f
50eadc10-dc90-4723-b0d7-d426d0768307	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	GOOD	GOOD	f
bf58a222-7740-4f0d-a1f5-c0f8b2dd280c	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	GOOD	GOOD	f
eb1bdafc-15d8-41b7-a610-e5bd169fc9cf	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti osallistui joogaan keskittyneesti ja rauhallisesti. Hän auttoi muita osallistujia ja piti positiivista ilmapiiriä yllä.	d54b8c42-67e5-49a5-85f3-f163230de4a7	t	GREAT	EXCELLENT	f
d528b938-26cd-438a-b65a-bfc55b5d663c	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa kokeili beach tennisä ensimmäistä kertaa ja sopeutui nopeasti sääntöihin. Hän ei aina osunut palloon, mutta pysyi positiivisena ja kannustavana.	c0076c27-405b-4dcc-a944-323b279d0986	t	GOOD	GOOD	f
60a4db35-64e2-4f4a-88ef-324bcf7afb1a	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui kuntosalitreeniin ja keskittyi erityisesti keskivartalon lihaksiin. Hän teki liikkeitä hyvällä tekniikalla ja auttoi muita osallistujia tarvittaessa. Treeni sujui hyvin.	abb65c1c-fb0f-44e8-84c8-c542fe24ef96	t	GREAT	GREAT	f
d53dc749-3673-44de-aeb2-ec56e0036a02	24bd87c1-454d-412e-a843-595ffdc4892b	\N	4f42caa2-bcc4-47e8-bab9-1ef88e9382c2	f	\N	\N	f
e72b1d09-13ab-42fc-ab88-af3b81a8eccd	df05106e-6e95-4a82-af93-c5f6f8a58047	\N	4f42caa2-bcc4-47e8-bab9-1ef88e9382c2	t	GREAT	EXCELLENT	f
17807db0-917f-4800-bd87-4bfcb5431500	e459564c-d6aa-4fec-8790-508218a41435	\N	4f42caa2-bcc4-47e8-bab9-1ef88e9382c2	t	GOOD	FAIR	f
62163ea9-4c90-4af8-927d-c8c03a9a50fd	c99cbc5a-d88b-4022-bc5a-aae33f51e30b	\N	4f42caa2-bcc4-47e8-bab9-1ef88e9382c2	t	FAIR	POOR	f
74936fde-5ea8-456a-be6e-768fecc0930d	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	0e16a08a-76d4-4cc9-9f50-1903a928125c	t	GOOD	GREAT	f
8e78b326-4a35-44a1-9135-2ee8d0868346	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	0e16a08a-76d4-4cc9-9f50-1903a928125c	t	FAIR	FAIR	f
16f5da69-43e5-44f7-863c-eb7d40a9cc07	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	EXCELLENT	GREAT	f
de948912-a946-4ca4-8142-07d5f6f8ce3b	750d8c1e-30f2-49fc-a445-7acdb4bff78e	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
17f12f79-c32b-4f80-b54b-ebaa96baf62c	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Jokin huomio	e5229c63-bab4-43aa-b959-523054e27f69	t	FAIR	FAIR	f
fcb5173c-c228-4e84-85ed-538a08a72532	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	e5229c63-bab4-43aa-b959-523054e27f69	t	EXCELLENT	EXCELLENT	f
e7681958-c8f9-4824-8284-c4b1c108118c	2eceab39-5d0a-4201-a275-17a1bed011a6	Terve terve	e5229c63-bab4-43aa-b959-523054e27f69	t	FAIR	GOOD	f
3d2ddd77-c84b-4bc5-8f0c-2788eba965cb	2eceab39-5d0a-4201-a275-17a1bed011a6	Huomioita jotain	0e16a08a-76d4-4cc9-9f50-1903a928125c	t	GOOD	GREAT	f
47bdd278-4ad4-4422-99d2-0537f440b990	81f9f274-c50a-4b30-b0f5-15c1479b942c	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
81fc2be6-d2c1-40b9-bf74-bbae9dead21e	eac386e1-ca07-42b6-9817-50f1d1081903	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
de3b865c-7ac9-4d83-8dff-9c2a8686cae0	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
c7ab2f8f-e64a-46dd-a437-e27faefcd105	081d3462-484c-45f4-b7df-9eef1712d829	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
f518644d-f0fa-4c90-ae30-c965e76fdd09	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
6491c19c-e734-41fe-889f-b4a339c11956	25ba77b8-721c-4c32-b5c6-97ea194d2958	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	GREAT	EXCELLENT	f
b6f72dcd-c87a-4663-a8b5-300e7d0fcdc2	213addc7-6d5d-4a39-95bf-ded6afa510a6	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
fcfdf8e4-a531-49f5-ab2a-dde18faf225f	dc43f223-8b76-457a-b035-8b186320bdea	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
bd145205-37bb-4960-ac78-5d11c67e2430	49c4aeec-3a4e-4761-b3cf-2546381857f7	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
66ecac2f-cb1b-4295-bfae-e59aaa12133b	f96609c4-4c21-4b74-8523-f2c3b78d4c49	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
09947344-222d-4fee-af3c-7176527cd04a	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
ac4683ff-b328-4d95-867c-2beca04480c5	c7a9dddd-29a9-4698-991f-ecab63cf6fd0	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
8e99c1d7-28ce-4618-8388-e01d98216b90	74c83e0a-3e21-4c01-b18a-a81f7e089d64	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
b58f9de4-3d0f-4589-bcdd-bc0e8a0fd06c	f826618b-cee5-4d6c-bcde-27e7a74a0b63	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
4363c4d7-1836-40c9-8cbd-026ae932a170	9f830199-bde9-43a4-84e9-986992a1e3d3	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
397c65ca-2caf-41ca-900f-0abaa7447c09	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
303ee210-8d30-4d12-b521-1d6a6a5649c9	0d39a916-dd79-4bc8-b493-771b456ed8ce	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
ba7da858-3aa9-467e-a6e5-6ffafeb46416	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
c1424502-62d1-4338-8876-940c2660cb5a	2487435b-5598-4a44-bc31-f93ed8a2ec43	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
7af7dd4b-5de2-416d-a374-eb58a234f041	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
19936d50-63db-4cd9-ba48-0cc3f5282348	c4365db1-b405-4aac-ad56-4f21780797c0	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
9f29b766-33d4-4042-b0d7-3e81f64dfb4f	a2a3736c-4cbd-43f4-b8e4-8041a2b9d8f5	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
61f4398c-e59f-4c6d-b73d-12e1eee54595	b8bc48bb-2b86-415c-837f-dbad58dd3e2d	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	EXCELLENT	GREAT	f
a8b74168-e253-486a-88ce-4003fd477613	7b55eeb0-4468-4696-b2fd-a50a7e058ec5	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	GOOD	GOOD	f
55497031-8423-451c-954f-1ddaf165a321	d04c2d81-ce92-4221-990a-64c5e1142ee9	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	EXCELLENT	GREAT	f
d4580ce1-ec95-4060-8ead-509297c48aaf	7c413b7f-9005-43a9-9b44-1984a23ae65f	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	GREAT	GREAT	f
c72a0d8a-ed81-4784-8995-e7cc398f4bc4	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	GOOD	EXCELLENT	f
8c519028-2f97-4200-a578-72c309ee19da	e25eac4b-ed6a-433b-b311-c27ea3f1faa4	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	GREAT	GREAT	f
2dd0f322-656d-472b-938f-9c855a4831df	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	GREAT	EXCELLENT	f
0f3a0410-3964-4495-b17e-cd329182a492	148a28ac-012b-44c4-b684-87a00ace9c72	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	GREAT	EXCELLENT	f
c316c4e3-71bf-4f08-8486-ef92aaac2c59	a639981f-4bf0-4871-b264-00ad02a9a286	Olet todella taitava palloilussa!	7b64a526-c49e-409e-9df0-af1f507313b5	t	EXCELLENT	EXCELLENT	f
0b701cfc-aad8-44c6-8009-1ed469d860fb	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	GREAT	EXCELLENT	f
21ecbab8-eebd-464a-96eb-e577e460a40a	bde08c48-5140-47eb-b28b-ce5c86ea8f46	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	GOOD	FAIR	f
117ac122-e4ad-475e-8d06-5a6fbf7c5431	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	GREAT	GOOD	f
5751cd03-092f-4acf-a080-251e11df13f0	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	7b64a526-c49e-409e-9df0-af1f507313b5	f	\N	\N	f
5b32fc64-743e-4732-9815-4c72b039673a	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	7b64a526-c49e-409e-9df0-af1f507313b5	f	\N	\N	f
01e95d7f-623a-4577-b339-0d8b3148a979	f03779c1-9d87-439c-8d95-14e384c7d2c0	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	GREAT	GOOD	f
87458690-c751-4c84-91ce-c7cf214d532e	5bbc08f9-01e0-4911-9a6a-38790219ce2a	Kiinnitä huomiosi omaan toimintaa ohjeiden aikana. Taidoiltasi olet taitava.	7b64a526-c49e-409e-9df0-af1f507313b5	t	EXCELLENT	GOOD	f
23165d52-163d-4f0d-b343-94439a2cae79	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	a6253c81-d539-4022-8bf3-45c7eee9cc2d	t	GOOD	GREAT	f
3eba6599-82b2-4f55-acb6-5c0cf576c91a	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	a6253c81-d539-4022-8bf3-45c7eee9cc2d	t	GOOD	GREAT	f
427f9894-ae72-473a-9344-0487e1be3779	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	a6253c81-d539-4022-8bf3-45c7eee9cc2d	t	GOOD	FAIR	f
5e8de9a7-508e-4040-b24b-4e1f8510a1d9	25ba77b8-721c-4c32-b5c6-97ea194d2958	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
bc848b43-9e93-4763-8582-60f53eef1211	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
9267ad2d-e86a-4eb5-bd1c-00bf43fec803	81f9f274-c50a-4b30-b0f5-15c1479b942c	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
8b9c7db7-5d1b-4e1f-8b9e-b1f5e32ddd34	b8bc48bb-2b86-415c-837f-dbad58dd3e2d	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
62c0698f-bbaf-4a4b-afbc-334c2f3266c2	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
3cd3e77a-c18c-4665-a049-00fd427a6205	49c4aeec-3a4e-4761-b3cf-2546381857f7	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
1a4bc460-6b55-4f43-96dd-1aea8ac0a959	750d8c1e-30f2-49fc-a445-7acdb4bff78e	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	GREAT	GREAT	f
b4b40768-b2ec-402d-8d76-6aecdc6549b5	eac386e1-ca07-42b6-9817-50f1d1081903	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	GREAT	EXCELLENT	f
a0696576-8695-4587-af76-7d7572425017	081d3462-484c-45f4-b7df-9eef1712d829	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	EXCELLENT	EXCELLENT	f
fdf3a360-f10d-4961-bd52-918fadd65587	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	GOOD	GREAT	f
2c3011bb-e9f8-4474-84a8-a9ee2af7e23c	213addc7-6d5d-4a39-95bf-ded6afa510a6	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	EXCELLENT	EXCELLENT	f
9c7c2a7a-501a-4857-be8a-4d2595682416	dc43f223-8b76-457a-b035-8b186320bdea	Ei tehnyt kuntosalilla tehtäviä	94a4cc72-3f10-44c0-821c-382909222c00	t	GOOD	GOOD	f
76ac643d-86eb-460b-a2c5-9fd3b9152517	f96609c4-4c21-4b74-8523-f2c3b78d4c49	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	\N	\N	f
375c8d89-5fd6-4b09-a8fb-0478b9c9ba9b	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	3740b2c7-10fd-434a-b025-354507eb0597	t	\N	\N	f
19fac0db-f3fb-4d79-87f0-9ebf9ebbdb13	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	3740b2c7-10fd-434a-b025-354507eb0597	t	\N	\N	f
bd32bd9f-36e5-4481-917e-411a89a89bca	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	3740b2c7-10fd-434a-b025-354507eb0597	t	\N	\N	f
7f0f9dad-e041-450f-862c-04a7bea97d69	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	7488ce86-5522-45d1-bf90-c8d8604ca3ca	f	\N	\N	f
0f90f47a-9e5d-4034-8e70-fd6d382877bf	e71cd959-78a0-4843-af83-1e8e741e7edf	\N	7b64a526-c49e-409e-9df0-af1f507313b5	f	\N	\N	f
9a0c7cfd-d086-4829-81a5-383f759a3f0b	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	d2ff8b16-ae97-456c-89a1-4a42be951b3c	t	\N	\N	f
f85c7e18-413a-437a-8c36-cd165149420d	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	d2ff8b16-ae97-456c-89a1-4a42be951b3c	t	\N	\N	f
07996255-f0f5-4fe0-a8af-63813275b360	404347be-f571-4254-b055-a06e9a9962f9	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
905d12b0-8c22-4b2c-81aa-72d3fb54d762	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	f	\N	\N	f
aa95bec8-7ef3-47e6-b83c-9d5370dc67b6	799b59e5-c962-4f19-9f9d-01518c57a550	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
36336130-d0cb-419c-b6ed-086df5f1b5e2	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
2bb08548-2aaa-4329-9dc9-c937aea7e44d	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
1222146f-45f8-4a16-9333-72690190f9b5	74e88236-472e-41ea-9475-73c94489ae2e	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
b02b811f-5654-4039-92ef-4931d084d7e3	2e03b196-3248-4f14-9f2d-4661e503665d	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
e42e5ed8-409e-4e1b-bbf7-628fb4aaea13	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
bdf053a6-a438-40a4-85e6-1fa3622890de	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
8bff6231-2dea-4ed3-97c7-70fa88e02d6b	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
a31a02ec-2217-4c23-aab3-5b690b580562	b9266745-39ba-4be3-b1a1-421801b79832	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	f	\N	\N	f
953d5446-ea43-4b4f-a781-4d341a13e9a4	686241e9-7a4e-4eb6-bc99-26699999001b	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
810016f8-3a6a-43c1-aab3-1b057367ab5b	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
4e43962a-0af8-4b4c-a462-83bd17aa6287	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
3133dde3-932c-4d92-8cb4-587489e61655	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
b48b027c-7de8-43fb-ad36-e16813464a86	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
4c092a1a-639e-4eeb-8bc2-8c1e388fa2a2	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
535c40a7-dea6-4a00-b106-8513c78475fc	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	f68f104b-19b9-4dc8-8564-9b27d16cac5d	t	\N	\N	f
802b69fa-5c6b-4853-b1c6-11e54c294aad	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	GOOD	EXCELLENT	f
3b062605-465f-46c3-bdac-6ac953d507a4	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	GOOD	GREAT	f
3131c83e-959d-4ab4-8fc4-cedc7660b58a	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	GREAT	GREAT	f
3a79d24b-edfe-4a2d-8a67-7b666dff18a3	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	EXCELLENT	EXCELLENT	f
e2fbf90d-cd69-4c39-af8d-9d849e4d5ce0	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	GREAT	EXCELLENT	f
b01f4f6d-c635-4da2-98f7-34ec21ea8b10	4fa0db05-161f-4165-b00c-52528866490c	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	GREAT	FAIR	f
0cab6a10-e4b3-4659-a626-54a3a5c7a6a8	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	GOOD	GREAT	f
4a3acf9b-106c-4a00-a162-c747d3b6f3ad	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	GREAT	GOOD	f
a8f9bba4-6933-4b6e-80ce-02b28cfcbc7b	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	GREAT	FAIR	f
374f2a54-2179-4e1d-905e-e9ff66fc66b5	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	FAIR	GOOD	f
d66ce4d9-e88f-4630-a6e5-ffbe1dbaff16	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	GOOD	GOOD	f
723f0cc4-7a12-4a89-96fa-f5368016d93c	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	d2ff8b16-ae97-456c-89a1-4a42be951b3c	t	GOOD	GREAT	f
7493f00b-d29a-41f5-94c4-9c239f5efe10	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	7488ce86-5522-45d1-bf90-c8d8604ca3ca	t	GOOD	GOOD	f
8dccd96f-2fcf-48c0-b7fc-80f0c767d2a5	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	GREAT	GOOD	f
e8f92767-ad16-4b9f-8b19-0aaebdb0ec10	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	7488ce86-5522-45d1-bf90-c8d8604ca3ca	t	GREAT	GREAT	f
b7268110-50c7-4e46-a377-df7f1b2b50a1	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	POOR	POOR	f
454a692c-f2bd-4618-b619-d26f17abb588	789e18c3-638d-4651-be65-ec0a1661539f	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	FAIR	POOR	f
a9404b9f-1ba4-45b0-b66c-b35c96dc2e59	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	FAIR	POOR	f
1b43be82-8723-4562-b52a-78aa0f6b147d	4454d03a-54da-4c2c-b931-b4b96ac0d81a	\N	c06cfc5e-69ab-4094-9271-424e0b4da95a	t	GOOD	GOOD	f
6c1d227b-0fa2-438b-88db-e6ac3a7c0beb	4c658b14-0fce-4ca3-ac9a-42558969e0e2	\N	c06cfc5e-69ab-4094-9271-424e0b4da95a	t	GREAT	FAIR	f
89ca5ee5-08b6-459e-b897-c30b84d2b0ef	7131bcea-6594-4433-be62-2dca8ffad861	\N	c06cfc5e-69ab-4094-9271-424e0b4da95a	t	FAIR	GREAT	f
a55f4895-089b-428f-8e75-8fe8ffccf93e	7c159017-8908-4a89-bc0b-dadcb58a2d03	\N	c06cfc5e-69ab-4094-9271-424e0b4da95a	t	EXCELLENT	EXCELLENT	f
04a9512a-44ef-49ab-a429-91da0591ce4c	a639981f-4bf0-4871-b264-00ad02a9a286	Toimit tänään ohjeiden vastaisesti ja karkasit sovitulta hiihtoalueelta. Keskity tulevaisuudessa siihen, ettei samanlainen käytös toistu.	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	GOOD	POOR	f
c192f80a-588e-442f-aec4-bfe12961d77c	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	GREAT	EXCELLENT	f
c9ba27bc-5af3-499c-8ded-428bca3c1a30	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	d555f364-a43b-4cd7-b441-36eba1399393	t	FAIR	GOOD	f
d84e314c-4ce7-4bd1-a2a0-cba42ebc5047	24007058-ca39-4c69-9004-c3d29b441fb3	Opettajan apuna. Omaan tasoon nähden hienoa työskentelyä!	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	\N	GREAT	f
42b65866-aff8-41a2-a066-c5ef481952a7	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	d555f364-a43b-4cd7-b441-36eba1399393	t	GOOD	GOOD	f
daf46f16-cd4a-478f-8a89-1133ce85984c	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	d555f364-a43b-4cd7-b441-36eba1399393	t	GREAT	FAIR	f
7517562c-1ef3-4de6-b5cd-abd14725f5fa	404347be-f571-4254-b055-a06e9a9962f9	\N	8bba79e9-bfce-472d-8985-8d06407b4558	f	\N	\N	f
2d905a7d-6d25-41dc-9c63-dd2baebc1470	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	8bba79e9-bfce-472d-8985-8d06407b4558	f	\N	\N	f
fcc9ed90-c26d-4ab4-a8a4-948702e84c96	799b59e5-c962-4f19-9f9d-01518c57a550	\N	8bba79e9-bfce-472d-8985-8d06407b4558	f	\N	\N	f
183a6b0a-8fc3-4a57-be6c-5c55aff30e43	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	8bba79e9-bfce-472d-8985-8d06407b4558	f	\N	\N	f
abdd5f27-4258-4c0a-92ec-6243c76a456b	74e88236-472e-41ea-9475-73c94489ae2e	\N	8bba79e9-bfce-472d-8985-8d06407b4558	f	\N	\N	f
bb166eaa-b824-4ab1-a899-c11c3eeb4cb0	2e03b196-3248-4f14-9f2d-4661e503665d	\N	8bba79e9-bfce-472d-8985-8d06407b4558	f	\N	\N	f
eaa9aa33-2a0d-41e4-841e-5f19aaf866b8	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	8bba79e9-bfce-472d-8985-8d06407b4558	f	\N	\N	f
9f244823-ca32-4e8c-851c-8e6d6d412140	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	8bba79e9-bfce-472d-8985-8d06407b4558	f	\N	\N	f
7a7971f8-626f-43d5-b7e7-c7be578e945f	b9266745-39ba-4be3-b1a1-421801b79832	\N	8bba79e9-bfce-472d-8985-8d06407b4558	f	\N	\N	f
a9e2cc6b-e3f0-4b3f-8249-7e1965d79003	686241e9-7a4e-4eb6-bc99-26699999001b	\N	8bba79e9-bfce-472d-8985-8d06407b4558	f	\N	\N	f
b0089641-0e47-41da-9440-8f33d4d579fd	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	8bba79e9-bfce-472d-8985-8d06407b4558	f	\N	\N	f
3936adae-b4ed-4bd0-a2ec-eb15a181083e	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	8bba79e9-bfce-472d-8985-8d06407b4558	f	\N	\N	f
7408e78a-fb1e-40cb-859c-715716c0ad12	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	8bba79e9-bfce-472d-8985-8d06407b4558	f	\N	\N	f
633151df-7348-4859-970d-4c57f0d8a796	e9969c0d-58a3-4bcd-b301-5690b7290aa5	Tosi hyvää työskentelyä	8bba79e9-bfce-472d-8985-8d06407b4558	t	GREAT	EXCELLENT	f
b3f4f5e8-5e16-4913-b80f-59a0c4adf418	42a4fefd-c72e-4707-b0d6-14fd9bd80379	Keskeyttämistä ja päälle puhumista. Ei kaikessa mukana.	8bba79e9-bfce-472d-8985-8d06407b4558	t	FAIR	FAIR	f
35fee292-56a3-43c3-a9cf-49aea892bd84	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	8bba79e9-bfce-472d-8985-8d06407b4558	t	GREAT	GREAT	f
c5bc16f5-e3ec-48d8-b2fd-1fceab4f1307	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	8bba79e9-bfce-472d-8985-8d06407b4558	t	GOOD	GREAT	f
140a89d1-2eff-4197-96da-cef6862d0467	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	8bba79e9-bfce-472d-8985-8d06407b4558	t	GREAT	EXCELLENT	f
a7c43461-cee4-46a3-93ec-e28344e9ddc2	350594d5-5cd4-4033-9294-6b50102afe7d	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	f	\N	\N	f
4a6ebf34-9554-4dbf-aab5-3c5c110fb54f	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	f	\N	\N	f
9af768c9-4e44-48fb-8956-0a4972c444ce	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	f	\N	\N	f
5571ec2c-dd78-4944-a040-8b4f922372e6	b05b035e-4867-40c1-965e-f60630bfa457	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	f	\N	\N	f
22646c8c-3991-4110-a7e4-081e383254ba	720863b3-15b5-4928-b516-5a8ec0cee764	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	f	\N	\N	f
34548fda-6a9f-496d-b6bc-f61dd156c4ae	e2c637e8-f394-4a5a-926f-1f9888a7dc98	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	GOOD	FAIR	f
2f4d933e-c6aa-4677-9e45-66e378ceaaba	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	GREAT	GREAT	f
6ec04cd0-d1c3-4b48-baf2-d7c5994e7e93	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	GREAT	GREAT	f
74361cf9-30e6-4cf8-ac91-2526c3d58ada	67c02902-d7e2-47e1-abef-9d1ae14a3da5	Välillä vähempää osallistumista	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	GOOD	GOOD	f
807bea42-fafe-4209-8a52-275cd3a7b8b5	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	GREAT	GREAT	f
13a169ae-81b6-4d57-be8d-0352e863ff81	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	GREAT	GOOD	f
7b95e0f6-9c1d-4c6d-a42e-6d031cb0223e	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	GREAT	GREAT	f
a24e939c-27ae-4804-9303-2cb01d937ffe	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	GREAT	GOOD	f
3bac5dca-a5e7-46f6-9253-8ce01446a6ee	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	GREAT	GOOD	f
2465a7f7-7591-4f5d-83f0-d8fb087c4e9e	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	FAIR	FAIR	f
08910cc5-5e5e-403b-a068-94948654b8b7	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	FAIR	FAIR	f
baaf4b8d-012c-43e9-b48f-3e6764fc8d1c	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	GOOD	POOR	f
1c368776-906b-4c06-8532-d322fb6d0bd9	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	333de8c8-9cd3-4827-ab4b-3e3c169b8ecd	t	GOOD	GREAT	f
8f18694b-518b-4a1d-98c1-15d0acfbdbc9	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	333de8c8-9cd3-4827-ab4b-3e3c169b8ecd	t	GOOD	GOOD	f
e15669a5-695b-4d28-8f09-307f261dfb9c	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	EXCELLENT	f
cf17fa28-69d1-43b8-b6a7-5d7dfac8bf53	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Moim	333de8c8-9cd3-4827-ab4b-3e3c169b8ecd	t	FAIR	GOOD	f
fdba1ea9-e07e-4ed5-ac19-73f32966c008	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	EXCELLENT	f
e4f74650-07bc-40e3-bcbf-fc11a1385f85	350594d5-5cd4-4033-9294-6b50102afe7d	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	GREAT	f
8b50825e-ee2c-4e52-8335-63cc3339caee	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	EXCELLENT	f
b7b08c3a-ea08-4697-87f9-b727c97af6b4	24007058-ca39-4c69-9004-c3d29b441fb3	Kielenkäyttö ja kommentointi yhteisessä työskentelyssä.	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	GOOD	f
f680fd43-ebad-4403-b9e4-b954d3a0c2d3	4cdb20f7-d8a7-480c-9379-bbe14d95d933	\N	f92aeb42-9586-4da3-8818-eed3150f288b	f	\N	\N	f
89334fb6-f7ca-43a1-9fcd-a30e673c10b0	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	GREAT	GOOD	f
fb7da3c6-ad21-476b-a452-61cccf97b3aa	16149225-d420-4254-88de-36f235415650	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	GOOD	GOOD	f
217a62f7-531a-4f9f-a9eb-3bddf7f6e53f	7af2670e-d622-44de-9458-0e3490224f19	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	GREAT	GOOD	f
932f89c1-56b6-49d5-a5f7-81c8018c3012	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	GOOD	GOOD	f
2bd086b0-1f5d-4f6b-8d27-94b629ba9896	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	GOOD	GREAT	f
a8cee365-9df1-4968-8e67-814d40188c2c	eb96e883-bf2d-4482-b8c9-6d272ee35354	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	GREAT	GOOD	f
449781e8-6fe1-441d-937e-5568850ae907	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	GOOD	GREAT	f
0fc1ebba-80e9-49f3-96be-68881e4c83d2	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	GREAT	GREAT	f
e6e17e4e-8a0d-4f3b-bfbc-95ca82f3d268	898eaa06-334f-4446-98b3-2368ad2b6cef	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	GOOD	GREAT	f
660dba40-539e-4624-ab2f-d392684d8d23	052654dc-bfba-4092-85d4-6894c908f9b1	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	GREAT	GOOD	f
d6daa5c8-a930-4b8e-afab-965212b8f9f3	a9823635-cc6a-4026-ad85-423287d7ec49	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	GREAT	GREAT	f
52e4fccb-62bc-4c6b-85db-b1463e65d403	b015f02b-0e21-4f21-93d4-8497311b6490	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	GREAT	GREAT	f
e434f288-b4e4-449a-8074-3069936fe498	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	GOOD	GREAT	f
84468a7a-a549-48be-8948-13a22b38a84e	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	GREAT	GREAT	f
27247149-932a-4ac1-a293-89eecb0b8544	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	f	\N	\N	f
24c32bfd-a73d-4623-9200-3ba12f38c78f	e2c637e8-f394-4a5a-926f-1f9888a7dc98	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	GOOD	GOOD	f
eed8b3b3-c18f-4394-ad2d-162dd87db9e3	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	GOOD	GOOD	f
f40e588b-a9b1-4c54-b5e5-d6bc59cac322	b05b035e-4867-40c1-965e-f60630bfa457	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	FAIR	GOOD	f
42826b37-37f1-437c-a7ae-ea4cf99c5a56	24007058-ca39-4c69-9004-c3d29b441fb3	Alussa vaikeuksia, loppua kohden tsemppaus	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	GOOD	FAIR	f
f429765c-3d4e-423b-b8cf-7dcaaebe68db	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	GREAT	GOOD	f
be243867-4bf6-4c74-b4b8-82d9b813e42d	b43981e9-6f50-4908-b225-1f5d5a70c68e	Paljon kiroilua	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	GREAT	GOOD	f
715fc691-0a0e-423e-8b63-dc010dfd79a5	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	GREAT	GOOD	f
5391beb9-baa4-45de-ad9d-af0c1bbcd0ec	350594d5-5cd4-4033-9294-6b50102afe7d	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	GOOD	GOOD	f
46266ac6-9d2e-4b05-b63b-b149c5e37733	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	GREAT	GREAT	f
90140eec-7c61-4420-98fc-2b9d2a8584d9	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	GREAT	GOOD	f
fadc0a7d-2325-44ea-8409-d99d394568ae	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	GOOD	GOOD	f
5be8a4d8-54ea-4bec-b4af-4da5c42c09e5	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	GOOD	GOOD	f
f224002b-ecde-4aa2-9024-c5830433e1b2	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	GOOD	GREAT	f
31042050-414c-4be8-aa4a-551a64564a27	720863b3-15b5-4928-b516-5a8ec0cee764	Tunnollista tekemistä!	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	GREAT	GREAT	f
b2578f88-8998-4395-8a31-86151501667c	af758be6-0adc-4e32-8543-f65f6c48fd2b	Ei tiennyt missä piti olla	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	\N	\N	f
eb0d25fa-9e68-46b1-b8c3-490e5bdd62a3	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	Alun peleissä jättäyti pois	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	GOOD	GOOD	f
6e0078bd-04e6-43b7-b062-6174bb085425	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	0c53145f-5fd0-441d-b345-a189164a3301	f	\N	\N	f
3d9f24c4-ae50-44b5-9711-fb8bbf234a32	e9969c0d-58a3-4bcd-b301-5690b7290aa5	Kävelyllä. Rankka päivä ollut.	0c53145f-5fd0-441d-b345-a189164a3301	t	\N	\N	f
ba35000c-47c7-48c5-8887-9fefce5e45a6	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	GREAT	GREAT	f
a41bc3cc-81ac-4f76-b04e-0ba56ef3ccfc	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	GOOD	GREAT	f
cc4b8389-699d-4427-bedc-391ffaea5133	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	GOOD	GREAT	f
f3d2a893-78d1-4033-8a88-1c7eb2a67868	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	GREAT	GREAT	f
0cf1dd92-cb8b-4377-b3b9-77a2ba389e12	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	GOOD	GREAT	f
de62497e-950e-4595-9468-27ab3a9f56ab	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	GOOD	GOOD	f
2af07d90-00fc-43ad-bf84-f3f4876d9ac2	8fa5f694-d7a7-49c2-98a2-e1aecdc80d3e	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
c8cc8ef3-1934-4411-b863-d1d46982b297	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	f	\N	\N	f
5e97fe59-2115-4794-8ce3-37558fcb27ae	00179acc-3d3c-496f-98db-fb88756116f4	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
cab7327f-e7db-49d6-ada0-b5f4a3391cce	45cedf94-714b-404a-8ad5-db42f55919eb	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
9615791e-0b53-4a42-8db6-6d831ecafbe1	1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
6752b391-2a9a-489e-a51a-a8fad80d1f93	abd4148b-b530-4440-b643-34d08a4bb811	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
c4547130-f8d3-4752-a1a6-4983ebff5d7c	e47d29de-6a02-4e63-a52a-964fc17b744e	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	GREAT	GOOD	f
bf96ff00-77b9-4680-aefc-fb892f36cfc3	f9c6b20c-e57c-4e70-9f32-dedd975aab01	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	GREAT	GREAT	f
01ca35e0-a3c0-49e5-9993-18336203277b	69fec935-4bcd-43ab-9737-a524627dbe1e	Salilla ok, pelailu ei kiinnostanut	48198bbc-377e-4f03-bf33-307f2edeb01d	t	FAIR	GOOD	f
8dab645b-5af7-4b9b-99a0-9667a554b89f	404347be-f571-4254-b055-a06e9a9962f9	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	GOOD	GOOD	f
0631e069-f585-464a-bf69-b59d1403c88e	686241e9-7a4e-4eb6-bc99-26699999001b	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	GOOD	GOOD	f
9dd69885-fe94-473d-8d84-5f169b5e55d3	2e03b196-3248-4f14-9f2d-4661e503665d	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	GOOD	FAIR	f
3d1c0387-40c1-4a41-bbd9-30523f753dad	b9266745-39ba-4be3-b1a1-421801b79832	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	GOOD	GOOD	f
394e909d-6cb4-4890-a917-c7bbd0a7fcc4	799b59e5-c962-4f19-9f9d-01518c57a550	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	GREAT	GREAT	f
299bb8e4-e338-4868-92a5-7f0b04eceec9	74e88236-472e-41ea-9475-73c94489ae2e	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	GOOD	GOOD	f
4c4f08da-51f5-45d9-9899-256cc209bcf6	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	GOOD	FAIR	f
8483985c-2b3f-4f16-84c2-527fbaf216ee	2209c4b3-b0d6-4858-9fa0-74c9b589442c	Parempi työskentely viime tuntiin verrattuna	0c53145f-5fd0-441d-b345-a189164a3301	t	GOOD	GOOD	f
0e57839b-3d7b-4822-8de2-40e0b81c6995	4943ad21-7f08-4b45-8d6c-7cccbfb05562	Kävelyllä.	0c53145f-5fd0-441d-b345-a189164a3301	t	\N	\N	f
8d8ac0e0-7d68-4c82-bcd3-320201ee47ad	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	GREAT	GREAT	f
4a44d269-fb3a-4a73-b48a-790aa4e28be8	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	GREAT	GOOD	f
b7d6d17b-e519-4d42-a325-8b33244f9575	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	EXCELLENT	GREAT	f
9a286e4d-2a45-43ee-9f1a-bf61f3d049aa	74e88236-472e-41ea-9475-73c94489ae2e	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	\N	\N	f
96babfbf-943a-4078-9e74-a7a10e035a78	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	Huippu hyvä tunti.	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	EXCELLENT	EXCELLENT	f
77d00bad-1f3c-4785-b5a6-e373bc3a5f0e	e2c637e8-f394-4a5a-926f-1f9888a7dc98	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	f	\N	\N	f
04b2d917-e797-47fc-8661-4d31d6e2dd3c	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	f	\N	\N	f
4c3bd6e8-f6c9-4430-a76b-146a106ab764	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	f	\N	\N	f
ac500315-5f86-4134-8790-c044cea0d5e5	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	GREAT	f
719ff4d3-09f3-4dff-a6a4-b5cfeb61370f	d07f9606-ddee-4f35-8d35-b8358dc9fc75	Kepeillä mukana seuraamassa ja ohjaamassa	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	GREAT	f
6313f20b-01f2-459f-8daf-fa141042bbb2	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	EXCELLENT	f
679eb129-ac95-4d9d-8118-80a129812567	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	EXCELLENT	f
5a690a3e-3235-4353-9efd-1a0afb06df1e	b05b035e-4867-40c1-965e-f60630bfa457	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	GREAT	f
6a877b96-21bc-4b6b-843f-b9750b996ec4	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	GREAT	f
1ca8e60b-ef1a-412b-b057-f889ffe38637	af758be6-0adc-4e32-8543-f65f6c48fd2b	Lähimmän puun taakse piiloon. Paljon kännykällä olemista.	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	GOOD	f
03f039d3-1116-4154-835a-5f2ed79b6d85	720863b3-15b5-4928-b516-5a8ec0cee764	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	EXCELLENT	f
a488a4f4-b3c4-4d99-8af0-9e27d95456cd	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	GREAT	f
dc8ca885-e02c-4e34-ac66-4f2a5a3f1001	799b59e5-c962-4f19-9f9d-01518c57a550	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	EXCELLENT	f
398abafb-54ae-40c9-afe1-fb50e5780f90	74e88236-472e-41ea-9475-73c94489ae2e	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	GREAT	f
0fd8a187-6219-45fa-8239-df5a2bac5ce2	4a3f375e-f8ce-46f9-8b9a-4587d069d036	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
dc4f2b1a-9d48-4892-9bb7-1a4f323b96a6	0e963947-3dcf-4f30-b316-ac9d07d81b0b	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
5208a9d8-28e5-4f52-986d-8333cf7b3c9c	8fa5f694-d7a7-49c2-98a2-e1aecdc80d3e	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
51d1909f-3f26-4145-a0c9-f8ede538cb56	63f57cea-4036-4e38-9d84-3c36f99124ef	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
a90fa10a-eb6a-4ee1-9a36-44dfd77cfb4c	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
540b4825-aa4c-48f5-946b-a0ae14ba121a	1461587b-fedd-4cb1-a122-58dd9ddc3fd9	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
a1ffab58-3ab4-47c1-970e-41a72e3d1e36	00179acc-3d3c-496f-98db-fb88756116f4	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
879a26a5-d3c1-486c-a829-7ed625b57e05	fb78d640-ca97-407e-9d2b-6390b8a2c77d	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
963389f8-47fb-4dc7-8caa-869a57a1be26	1f770536-fee1-4ca2-9622-ed816628c9b7	Mukana pelaamisessa koko tunnin. Rauhallista työskentelyä.	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	GREAT	EXCELLENT	f
1040c4f4-6c6c-4e16-81f5-5c55c4e88f5a	f9c6b20c-e57c-4e70-9f32-dedd975aab01	Aktiivista työskentelyä ja hyvää joukkuepelaamista.	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	EXCELLENT	EXCELLENT	f
dcde8dfa-93f0-4812-a57d-2b5c4e9b7d8d	91a00bae-00db-464f-8376-591e16a5a811	Aktiivista työskentelyä ja hyvää joukkuepelaamista.	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	GREAT	EXCELLENT	f
63ecda7f-0492-4269-8928-25a4c71d70cb	b1ef84a7-2238-4946-bd2d-97aae138bbad	Taitavaa asettumista kentälle. Hyviä syöttöjä ja pelin rauhoittamista.	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	EXCELLENT	EXCELLENT	f
7b42d58c-06af-4bb7-8478-8512edf3f0a2	1556394a-6336-4838-8943-19088ecdf5e0	Mukana pelaamisessa koko tunnin. Rauhallista työskentelyä.	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	GREAT	EXCELLENT	f
70742332-c9e2-44bc-b383-0b2f7089e318	3e62f535-90a9-4a75-9748-27ea0d491a54	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	GOOD	EXCELLENT	f
9350de6b-d50e-4329-b349-03d90ed2b44e	84c79ed7-b6e3-488d-93e7-0462a6e51139	\N	cbfca445-6768-4260-a592-d182c295da43	t	\N	\N	f
f311e00d-4672-4895-84d8-a67e8512ff39	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	cbfca445-6768-4260-a592-d182c295da43	t	\N	\N	f
00799473-9865-4661-a08b-c4fc0cdfeaa3	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti pelasi tennistä hyvällä asenteella ja nautti ulkokentällä pelaamisesta. Hän auttoi muita pelaajia ja piti hauskaa.	48b97ca2-cc28-4f63-a14b-26fb8422ff2f	t	\N	\N	f
427dc4ec-d201-4ba7-b301-7ba1c58cd09f	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa teki kuntoiluharjoituksia puistossa, mutta keskittyminen herpaantui ajoittain. Hän suoritti liikkeet oikein, mutta olisi voinut olla tarkkaavaisempi.	a8c5e1fb-bb1a-4811-9b48-6faa29f4f619	t	GOOD	FAIR	t
8e09b832-d52b-4767-a3a1-5abb098a97a3	de28725b-ccaf-45e6-b808-aeeba3fa151e	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
9573773e-8b7b-4ae5-8db3-d562f525a9a5	4a3f375e-f8ce-46f9-8b9a-4587d069d036	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
50a25293-c6ce-4262-9d78-a7aac30001df	3723e655-2484-4055-8570-13ee693d5a1a	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
5521e187-ae9f-4f1b-9b66-f775b20841c2	ad671202-0d1b-4b31-a2fc-9fa9032f3b33	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
a6dc5008-c573-4074-82f4-a19d64fbc364	fb78d640-ca97-407e-9d2b-6390b8a2c77d	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	GOOD	GREAT	f
3e665651-a160-4c06-b1ae-c803383818b6	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	GREAT	GOOD	f
e98518c9-7ded-4604-8467-6afc97eec3d0	91a00bae-00db-464f-8376-591e16a5a811	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	GREAT	GOOD	f
1cab9e0b-d4d6-45a4-bc6a-526e14a07182	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	GREAT	GREAT	f
f0e9a05f-8d8b-42c9-a9a8-b615356840f5	1556394a-6336-4838-8943-19088ecdf5e0	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	GOOD	GREAT	f
05a63977-5acd-419a-9d6e-e44a1285c95e	0e963947-3dcf-4f30-b316-ac9d07d81b0b	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	GREAT	GREAT	f
5a256359-a3a1-4d94-b3d2-f4b81cbec476	b1ef84a7-2238-4946-bd2d-97aae138bbad	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	GREAT	GREAT	f
30529f7d-12ea-431e-9e4c-030531d8fa80	f4eb73ad-9a1f-4b7b-8899-b2a07ff4db2d	Salilla ok, pelailu ei kiinnostanut	48198bbc-377e-4f03-bf33-307f2edeb01d	t	FAIR	GOOD	f
94891d84-57bc-4e1f-88a2-e509ceaf8496	1461587b-fedd-4cb1-a122-58dd9ddc3fd9	Ei paikalla	48198bbc-377e-4f03-bf33-307f2edeb01d	t	\N	\N	f
9e0c19e1-ef94-48f6-8c70-1ec42b25e006	1f770536-fee1-4ca2-9622-ed816628c9b7	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	GOOD	GREAT	f
86f52dbb-cd20-4d6c-9fa5-1b283aff4c81	63f57cea-4036-4e38-9d84-3c36f99124ef	Salilla ok, pelailu ei kiinnostanut	48198bbc-377e-4f03-bf33-307f2edeb01d	t	FAIR	GOOD	f
7ccf33be-e85f-4b4d-b95c-67425a897482	3e62f535-90a9-4a75-9748-27ea0d491a54	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	GOOD	GOOD	f
642b50d2-4423-486e-9961-fa43ad185e5e	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	Passiivista pelaamista, salilla ok.	48198bbc-377e-4f03-bf33-307f2edeb01d	t	GOOD	GOOD	f
752ea82a-2aed-4e34-b793-54c811eb3d65	aa420673-c8ba-41da-9ee4-061022bb4a51	Taitavaa pelaamista.	48198bbc-377e-4f03-bf33-307f2edeb01d	t	GREAT	GOOD	f
fff4b4b6-7daf-46c0-8c4b-231ff59dba87	81f9f274-c50a-4b30-b0f5-15c1479b942c	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
38914dd1-a07e-4c9e-a816-e043bae02893	dc43f223-8b76-457a-b035-8b186320bdea	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
a18ca901-0bec-4437-8b1e-16af35b64dad	2487435b-5598-4a44-bc31-f93ed8a2ec43	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
650872c7-0682-4201-8a37-17ef1724a4ee	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
cf5cb9ce-c66e-455b-a312-cbbd23afe6ca	49c4aeec-3a4e-4761-b3cf-2546381857f7	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
fadb223f-679f-41f9-b744-279a4785bee2	b8bc48bb-2b86-415c-837f-dbad58dd3e2d	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
f31a2249-6c2d-44c2-8bba-424aade00079	f826618b-cee5-4d6c-bcde-27e7a74a0b63	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
9d51ee1a-81c6-47f3-8b36-ea4dc90fc37f	a2a3736c-4cbd-43f4-b8e4-8041a2b9d8f5	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
d0cf930e-1e4f-46d8-91fa-b37b65649988	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
e77d2ee2-b3aa-49b6-8e8a-4b24d0ac1438	7c413b7f-9005-43a9-9b44-1984a23ae65f	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
dcaf1263-5f9c-47e0-8fa8-4b6b1d2c7f6b	f96609c4-4c21-4b74-8523-f2c3b78d4c49	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
a8971e5a-6f92-44dd-8b66-deea4a702fbf	c7a9dddd-29a9-4698-991f-ecab63cf6fd0	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
9e5ddd5f-1196-44b8-9691-ad5ee6d2fd19	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
4651cc81-1edc-42d2-ad32-b9f743f40d7f	7b55eeb0-4468-4696-b2fd-a50a7e058ec5	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
33ba9590-43dc-45c0-8ac5-46bdc55ccc28	25ba77b8-721c-4c32-b5c6-97ea194d2958	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
61998171-f887-4800-97be-99f7c50a7531	d04c2d81-ce92-4221-990a-64c5e1142ee9	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
f0f6b3db-be3f-4b5a-8d5a-bc0449893bb9	74c83e0a-3e21-4c01-b18a-a81f7e089d64	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
b84d1195-f73f-4ed0-9172-4efcd4a21a4b	9f830199-bde9-43a4-84e9-986992a1e3d3	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
c8e55f94-1e43-44fa-b871-901d3c25728a	750d8c1e-30f2-49fc-a445-7acdb4bff78e	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
1bc8834e-9628-4cf5-8a5e-ff1ef71ea166	c4365db1-b405-4aac-ad56-4f21780797c0	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
c6a72e86-955a-492b-990c-3f0526269a26	081d3462-484c-45f4-b7df-9eef1712d829	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	t	EXCELLENT	EXCELLENT	f
af97234c-ebcb-4b59-a736-7132ffcf3867	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	t	GREAT	EXCELLENT	f
376ee629-5154-4ae6-b57d-9b3fea13fbaf	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	t	GOOD	FAIR	f
d442856d-6fc8-4d4e-aa17-af25a575c9c4	213addc7-6d5d-4a39-95bf-ded6afa510a6	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	t	\N	EXCELLENT	f
b7f613ac-5163-4f7f-b886-850d588fd65e	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	EXCELLENT	EXCELLENT	f
35d8f975-058f-4b11-bdc3-1016e3b7dcb1	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	GREAT	GREAT	f
8a9362c8-ce01-4adf-aec6-39ebf731937a	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	GREAT	GREAT	f
d8f8f6a1-73d2-4c90-8fcb-e6d7c0ae9bc9	404347be-f571-4254-b055-a06e9a9962f9	Työskentelyssä parannettavaa. Paljon seisoskelua ja keskustelemista kavereiden kanssa.	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	GOOD	GOOD	f
c71a6d15-855a-4241-a2dd-e0661472b9b7	686241e9-7a4e-4eb6-bc99-26699999001b	Työskentely oli todella hyvää. 	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	GOOD	GREAT	f
ef271caa-d836-42d1-bfc5-1e5a559d51d7	b9266745-39ba-4be3-b1a1-421801b79832	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	GREAT	GOOD	f
02823ef1-7419-4fc6-9604-3ce2fa05dd66	eac386e1-ca07-42b6-9817-50f1d1081903	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
54823b77-f208-442e-a603-72469f419454	0d39a916-dd79-4bc8-b493-771b456ed8ce	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
1b8720bc-35e6-4496-a946-a7e6fbea7026	e25eac4b-ed6a-433b-b311-c27ea3f1faa4	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
4fee605e-efb4-43c4-8fd1-5854cbd1f259	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
90f5eb91-bed1-4979-806d-e8880ac9ca47	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
9160b8a4-a3fb-4500-bf37-c915fced5b7e	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
188873e6-c3b0-4f0d-92c1-8ea0a85716fd	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	b1c2442f-23fc-4571-9701-2c795143537d	t	GOOD	GOOD	f
dddaa05c-4c91-47d3-b207-9b13878308bf	84c79ed7-b6e3-488d-93e7-0462a6e51139	\N	b1c2442f-23fc-4571-9701-2c795143537d	t	GREAT	GREAT	f
465e0ede-e908-46e2-b7e2-30dde332541a	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	10c08368-0fd8-4687-8ed7-a7a4f34d7776	t	\N	\N	f
16aa6358-8c59-4175-8e21-d5745ba09fe4	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Joo mestari kettu kyllä se ihan toimii mutta joo on se sitten vähän myös jännä joo	10c08368-0fd8-4687-8ed7-a7a4f34d7776	t	GOOD	GREAT	f
5265cb05-d2a2-4700-b7ad-4bf3c67942f9	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	10c08368-0fd8-4687-8ed7-a7a4f34d7776	t	\N	\N	f
81bab849-c1f2-4fb0-ab8f-e76b99ecae2e	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	e24d79d5-8e15-46b5-951d-f811b7670023	f	\N	\N	f
4742e0c2-16a0-4bfe-a340-470298e9f061	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	e24d79d5-8e15-46b5-951d-f811b7670023	t	\N	\N	f
2fbb5289-3fa3-42a2-a1b0-b27c776ec32b	f925429c-08cc-4cba-b5d4-d63ccf818c49	tässä mikaelille vähän huomioita	e24d79d5-8e15-46b5-951d-f811b7670023	t	GOOD	GREAT	f
48d339ba-bfea-47eb-a3be-32554521d434	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	6ac64022-5671-4409-80a3-99a1dd020cfa	f	\N	\N	f
517f3c42-817a-4994-a18f-393e33785ff1	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	tässä taas mestari ketulle vähän huomioita	6ac64022-5671-4409-80a3-99a1dd020cfa	t	FAIR	GOOD	f
94807fa1-6257-4fdf-877f-15e1a1c85d66	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	6ac64022-5671-4409-80a3-99a1dd020cfa	t	\N	\N	f
df7fa6cf-a079-4a66-aa84-4f304f5fcc01	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Moi	1e597269-f460-4a88-9702-2d4f420c0f00	t	FAIR	GOOD	f
9d373b42-4474-43c5-9f49-85412a4326cf	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	1e597269-f460-4a88-9702-2d4f420c0f00	t	FAIR	GOOD	f
2639c769-c1a9-4e64-b0a9-cf7ba9d798f4	2eceab39-5d0a-4201-a275-17a1bed011a6	Huomioitajoo	1e597269-f460-4a88-9702-2d4f420c0f00	t	FAIR	GOOD	f
641a00bf-9617-46a3-8908-3a8ea841c36d	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	10ba2787-61e0-4785-8dee-4a8a99414520	t	\N	\N	f
eecae85d-212a-4d88-a1df-d6768def2f61	f925429c-08cc-4cba-b5d4-d63ccf818c49	Moi Moi tässä mikaelille huomioita	10ba2787-61e0-4785-8dee-4a8a99414520	t	FAIR	GOOD	f
6ddb445b-a144-4104-9194-bd93a791410b	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	10ba2787-61e0-4785-8dee-4a8a99414520	t	\N	\N	f
95a194d0-6a94-4566-b1aa-76fcae36e3b1	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Moimoi	49f4d3a8-22b6-4f9f-bb7b-17d5d7b4c422	t	GOOD	GOOD	f
6aa9f912-e1a1-4a36-bac8-22ee6b256189	f925429c-08cc-4cba-b5d4-d63ccf818c49	Jeejee	49f4d3a8-22b6-4f9f-bb7b-17d5d7b4c422	t	FAIR	GOOD	f
f85f2755-3c1d-4f19-8881-7e14f3119b55	2eceab39-5d0a-4201-a275-17a1bed011a6	Terve	49f4d3a8-22b6-4f9f-bb7b-17d5d7b4c422	t	FAIR	GOOD	f
564212a2-7e92-48b8-8b16-6e854d013143	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	abe03f46-f878-4284-84e4-de5857f87209	t	FAIR	GOOD	f
a4f52405-448d-4d5a-aebb-dce79e549662	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	abe03f46-f878-4284-84e4-de5857f87209	t	GOOD	GREAT	f
8ac9d213-7d77-482f-aea9-75d612e04f50	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	abe03f46-f878-4284-84e4-de5857f87209	t	FAIR	GOOD	f
f96b6bec-ab7b-41ec-95d9-2e2c29ed7d32	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	16ebda74-3df2-4ee7-82e2-87d7ece3ac1e	t	\N	\N	f
a4efded8-a43e-4c3f-b1e3-e99c19194489	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	16ebda74-3df2-4ee7-82e2-87d7ece3ac1e	t	\N	\N	f
163d61e8-71f0-4af2-ac65-f8b0e6721760	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	16ebda74-3df2-4ee7-82e2-87d7ece3ac1e	t	\N	\N	f
ce52c5d9-e253-40ab-8d31-13ba90b9f558	84c79ed7-b6e3-488d-93e7-0462a6e51139	\N	f3a6d9a9-1c87-4706-9cd3-47eb2c994fb4	t	\N	\N	f
9dd3934e-3c8f-4028-9489-1cfc4b145634	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	f3a6d9a9-1c87-4706-9cd3-47eb2c994fb4	t	\N	\N	f
3f0534f3-32f4-4c96-abb0-3d1871ff3689	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	a5bc849c-03ec-40d3-9abd-4b68b93bcc7b	t	\N	\N	f
12396dbd-0f8d-4b4e-b2be-225827f9a655	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	a5bc849c-03ec-40d3-9abd-4b68b93bcc7b	t	\N	\N	f
0de6eb77-604c-400d-837b-716569e5dd45	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	a5bc849c-03ec-40d3-9abd-4b68b93bcc7b	t	\N	\N	f
31976e37-c3ce-4013-9b5e-4339195d5dab	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	6d4d0b46-d8e4-434c-b242-675b378da3fb	t	FAIR	GOOD	f
b3356358-78d8-4626-824f-63eb56235769	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	6d4d0b46-d8e4-434c-b242-675b378da3fb	t	GOOD	GREAT	f
23e325d7-06b7-4036-82ad-4202d257c86b	f925429c-08cc-4cba-b5d4-d63ccf818c49	Mikael pelasi tänään hienosti!	6d4d0b46-d8e4-434c-b242-675b378da3fb	t	GOOD	FAIR	f
b44b65e9-c901-45ee-adf7-c1b0afb51283	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	f	\N	\N	f
e7f3587d-3b7f-4507-8ecf-387e6752de51	789e18c3-638d-4651-be65-ec0a1661539f	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
ef1c24b8-7ea7-42b6-af22-e6d1b808294a	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
c93ac144-5043-46da-b73b-75c5c63b5984	4fa0db05-161f-4165-b00c-52528866490c	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	EXCELLENT	GOOD	f
08d0507a-8849-45bd-8ea7-9c12c51afe33	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	GREAT	GREAT	f
617dd586-52d2-4ef5-8bab-e27886ba05c5	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	f	\N	\N	f
33e5b5ab-2b03-4fd6-8a7a-1ce69429e07e	2209c4b3-b0d6-4858-9fa0-74c9b589442c	Vaikeuksia ottaa osaa täysillä peliin	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	GOOD	GOOD	f
7d762143-7928-4395-89f5-823ad6783e00	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	f	\N	\N	f
f08b8d71-2174-4feb-81c2-be0073949b1f	8cc39180-992f-41be-88d7-d798fc88abe0	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	f	\N	\N	f
203b9a71-e681-4e1c-99ab-1fb173975a2e	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	f	\N	\N	f
7fa26c28-ecdd-4cb8-b0af-073c646dc511	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	EXCELLENT	GREAT	f
422e9738-387f-4c97-b37a-fe3e1a8b16fc	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
0b40f8c8-e80b-438e-9305-4916c5273fd5	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
29886415-1a2e-4c91-96fb-eabd1156b0da	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
fae99c8c-0952-4f44-a4d5-475f376bb850	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
8b81c056-eac5-4eee-94a1-708bf5785d40	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
6b983fc8-64ac-4d11-901b-045484c38cd3	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
bb069fb8-c407-4db4-a4b8-d4182af5e837	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
9f545cf8-4884-4eb2-8709-eccf6967deb0	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
259610f1-f1c9-47bc-a6df-df0b7a753032	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	GOOD	GREAT	f
aaff965d-628e-44fd-8d12-df94a78c223c	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
40d39d4e-6bd5-45b7-853b-69654827ce48	a6eb654d-12a2-4350-a687-128314062791	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
0a2b6151-6645-4449-83b2-5fce6d222fe9	545958d4-a061-46c0-a58b-e814f2864886	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	f	\N	\N	f
6cff06aa-b8fa-42a5-9878-7d3e9022d0d5	671ee4af-e36d-437d-b3ec-bee0179c96c4	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	f	\N	\N	f
55d258dc-75c1-4739-9624-982d1c23cab4	f2cd6a55-4291-4848-a66e-36d096f181c4	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	f	\N	\N	f
6ee321c0-e33c-444a-9725-921c00aca788	d9dd649b-f9bf-4670-84ea-a102fc16cfcc	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	f	\N	\N	f
1e7b0b53-bd73-4c4f-abc6-1e93ba35484b	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	GREAT	EXCELLENT	f
5165a8d4-9933-47b3-b99f-7fcbe9df7632	2e03b196-3248-4f14-9f2d-4661e503665d	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	GREAT	GOOD	f
60f7a12c-de58-4f08-afac-a71890cf8be1	b05b035e-4867-40c1-965e-f60630bfa457	\N	619a1d3f-2b7d-4283-9a93-16c2562b6cea	f	\N	\N	f
6806cefb-76be-4863-9f6f-4a660c520fa3	24007058-ca39-4c69-9004-c3d29b441fb3	\N	619a1d3f-2b7d-4283-9a93-16c2562b6cea	f	\N	\N	f
e07f3bc9-7c51-4aaa-96ba-030e2574cde9	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Työskentely normaalia parempaa!	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	GOOD	GOOD	f
68c73c8d-9876-4230-b2fc-47265883b555	67c02902-d7e2-47e1-abef-9d1ae14a3da5	Hienoa työskentelyä ja tekemistä!	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	GREAT	GREAT	f
cb446e5f-640f-433b-b1ba-5edaa23fb394	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	GREAT	GOOD	f
8b13572a-c5cf-4d89-b675-bb927360a8c7	b43981e9-6f50-4908-b225-1f5d5a70c68e	Alussa vaikeuksia saada työskentelyä käyntiin	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	GREAT	GOOD	f
2effea97-327a-4025-a27c-e049df14d1f0	799b59e5-c962-4f19-9f9d-01518c57a550	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	EXCELLENT	GREAT	f
d1d7ec18-6b18-42be-b68a-fd045ec6bea4	4943ad21-7f08-4b45-8d6c-7cccbfb05562	Väsyneenä tunnilla. Ei osallistunut pelaamiseen.	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	FAIR	FAIR	f
541b5dda-ebaa-4cfb-b5d8-8529c528acc1	d6b3db8b-50e7-4a6c-8ed2-2247a659a3a9	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	GREAT	GOOD	f
d9aecc7a-634e-4afe-898d-830e0785bae5	42a4fefd-c72e-4707-b0d6-14fd9bd80379	Sinnikästä työskentelyä, vaikka joutui olemaan hippana.	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	GREAT	f
5337e64f-a20c-4b10-b0a8-b87942d2121d	046a3d24-b93f-44d1-ae1b-aa628e141bae	Paljon turhautumista, mutta mukana työskentelyssä.	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	GREAT	f
0676d630-7f70-44f4-a1d1-7f5137c62999	2e03b196-3248-4f14-9f2d-4661e503665d	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	GREAT	f
9ff20165-ef7f-46c5-bfaa-0e7d31c4c59d	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	619a1d3f-2b7d-4283-9a93-16c2562b6cea	f	\N	\N	f
1b0bdfa3-6c16-497b-9b27-014716d7f7d9	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	619a1d3f-2b7d-4283-9a93-16c2562b6cea	f	\N	\N	f
d78d863d-3fb5-485b-b6f5-0617ae1dd423	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	619a1d3f-2b7d-4283-9a93-16c2562b6cea	f	\N	\N	f
4a2e9f6a-001f-496a-8de3-ae5bf947552b	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	Hyvä tunti!	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	GREAT	GOOD	f
5fcdd419-dd72-470b-abb0-9cae08df04f5	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	Hienosti mukana	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	GREAT	GREAT	f
606aeb13-9543-4321-909e-b026e4efa8e1	350594d5-5cd4-4033-9294-6b50102afe7d	Tänään oivallista työskentelyä!	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	GOOD	GREAT	f
0668dd6b-66a2-4760-bba2-7a5e4a8af3c4	9bdfa82d-13bd-40be-9a9b-a57c2a072351	Alussa vaikeuksia saada työskentelyä käyntiin.	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	GREAT	GOOD	f
952e1dd7-7132-48cb-8094-3abb21aaed4c	c0011bcd-6952-4d60-a01b-3b455c7eea4c		619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	GOOD	GOOD	f
35de4bd6-1e18-4f19-86e0-7ed0fb7c7df6	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	Tänään vähän väsymystä. Alussa vaikeuksia saada työskentelyä käyntiin. Hienosti sanoitettu päivän kunto.	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	GREAT	GOOD	f
5b6d90f6-4b34-46e9-b7dd-7293087d94f4	5fd1effd-1670-4a40-bfaf-75a2a048fc91	Jälleen kerran tunnollista työskentelyä!	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	GREAT	GREAT	f
ecb1c5a5-ff14-4955-af68-d8fea64ae7ed	720863b3-15b5-4928-b516-5a8ec0cee764	\N	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	GREAT	GREAT	f
afe5fb42-aab0-421d-a45b-4abd80bd1dd8	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	1eda1df4-9725-42f3-9b25-555230def13e	f	\N	\N	f
9a3a67b6-fd25-4aa1-9499-fcf44a3b912d	a9823635-cc6a-4026-ad85-423287d7ec49	\N	1eda1df4-9725-42f3-9b25-555230def13e	f	\N	\N	f
53748025-7a2b-4c5f-8ef8-a55b3c3ab18d	4cdb20f7-d8a7-480c-9379-bbe14d95d933	\N	1eda1df4-9725-42f3-9b25-555230def13e	f	\N	\N	f
ce6e35dc-6c8c-4f96-83ef-a2a792fb0dee	16149225-d420-4254-88de-36f235415650	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	GOOD	EXCELLENT	f
72ff62d7-3c67-46fd-b4ee-a5e27aa281e4	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	GREAT	GREAT	f
e96e3ba8-b88c-4ed7-bee6-7a8e78604a86	7af2670e-d622-44de-9458-0e3490224f19	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	GREAT	GREAT	f
2494f1a9-8879-4940-a23e-0dc1be1444e2	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	GREAT	EXCELLENT	f
6afb2e90-bbfe-40d1-ae8a-4272579e94ed	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	GOOD	EXCELLENT	f
36e5b1a8-3d8c-4126-95c0-d1b6b1c2ca83	eb96e883-bf2d-4482-b8c9-6d272ee35354	Loistavaa!	1eda1df4-9725-42f3-9b25-555230def13e	t	GREAT	EXCELLENT	f
798055ae-f5da-4404-9667-a15f20b02519	5f2d8cba-c89d-4dee-b204-911a7f658599	Auttoi opea ja ryhmää tunnilla!	1eda1df4-9725-42f3-9b25-555230def13e	t	GREAT	EXCELLENT	f
4ac1d33e-7e62-4151-9d17-d8ee916ac09c	898eaa06-334f-4446-98b3-2368ad2b6cef	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	GOOD	EXCELLENT	f
a9630a95-7171-4082-be32-e3b610d66c7a	052654dc-bfba-4092-85d4-6894c908f9b1	Hienosti pelasi ei-parhaiden kamujen kanssa!	1eda1df4-9725-42f3-9b25-555230def13e	t	GREAT	EXCELLENT	f
39352be0-648d-4514-ad88-a6c587d69208	b015f02b-0e21-4f21-93d4-8497311b6490	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	GREAT	GREAT	f
c36c87be-3a2e-4e64-afa7-06101da9fd31	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	GOOD	EXCELLENT	f
2c6c585c-5ce9-4683-9d3b-f5c5eb185454	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	GOOD	EXCELLENT	f
e20d3549-1aa6-4ee8-9ce3-5479cda8c130	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	f	\N	\N	f
72705a15-a0fa-41ea-8cad-a016706cac4b	b05b035e-4867-40c1-965e-f60630bfa457	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GOOD	GOOD	f
c2dec119-a89a-4a74-b7d0-566e0407078a	e2c637e8-f394-4a5a-926f-1f9888a7dc98	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GOOD	GOOD	f
2e2f291d-ca04-48d5-a63e-b5a2f10ba8e6	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GREAT	GREAT	f
5b2438ef-58a5-48fa-ba48-15abcc46cf78	24007058-ca39-4c69-9004-c3d29b441fb3	Vaikeuksia tehdä kaikkien kanssa hommia.	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GOOD	GOOD	f
d724ddb2-e09b-4076-a594-fbe7460c4ea4	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GREAT	GREAT	f
5eaa4171-b4bd-4c40-9e2a-89bea238e9cf	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GREAT	GOOD	f
e5d0569a-6dc4-4674-8f65-0c2bd1e6ccc7	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GREAT	GREAT	f
8701cae4-e7bd-4153-ac9d-3a2565384f2a	350594d5-5cd4-4033-9294-6b50102afe7d	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GOOD	GREAT	f
42869649-94d3-40d7-94c7-a81a83d0dd27	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GREAT	GOOD	f
b9895d9f-2f34-4027-b9a8-3c7abc4afa47	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GOOD	GOOD	f
bbbc5bf8-ba12-4ec7-a0ff-194b048d3d65	c0011bcd-6952-4d60-a01b-3b455c7eea4c	Vaikeuksia tehdä kaikkien kanssa hommia.	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GOOD	GOOD	f
1b8e75b4-0d21-48cc-9320-6034cd096c9f	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GREAT	GOOD	f
9375ea3a-d567-4b90-b21d-1fd563a31d6f	5fd1effd-1670-4a40-bfaf-75a2a048fc91	Loistavaa työskentelyä.	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GREAT	EXCELLENT	f
6ce703ba-1b88-4849-8344-f2e7deee1369	720863b3-15b5-4928-b516-5a8ec0cee764	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GREAT	GREAT	f
054b7c8d-da06-4a22-a2ef-186f4582eae8	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GOOD	GREAT	f
4787b660-37bd-4a1f-b760-796cbe864ef3	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	GOOD	GOOD	f
bc25fc38-1e7c-4f97-97ef-e53be25ee870	344890ff-a10d-4801-992d-36bcbcc43663	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
869c5df5-a12c-4783-a365-119d129f60cf	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	f	\N	\N	f
b5bf484b-14ed-49a1-8b03-d5b61dc95731	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	GREAT	GREAT	f
9a660d49-a55a-485f-9fbc-717503ccdc1f	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	GREAT	EXCELLENT	f
deca533c-beb3-4fb3-b014-bf7de655e4bb	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	t	EXCELLENT	EXCELLENT	f
861adbac-6eab-4a4d-9b19-0a629c54bae2	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	f	\N	\N	f
64db3cac-53f2-4f45-a349-2d8e3f254a4c	799b59e5-c962-4f19-9f9d-01518c57a550	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	f	\N	\N	f
13ab6c0d-c3b9-43e5-8d1d-9db85a8ea61e	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	GREAT	EXCELLENT	f
bbdba804-a660-4c26-8d83-ce9887711f37	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	EXCELLENT	GREAT	f
1e745969-5f4b-4d00-a8a5-77c6f6fcd6f1	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	EXCELLENT	EXCELLENT	f
84e71396-9f88-4072-b9a3-4dd1ee3295f4	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	GREAT	GREAT	f
e0272a1b-9c8b-4301-b841-20fc0b23ec61	404347be-f571-4254-b055-a06e9a9962f9	Tosi hyvää työskentelyä läpi tunnin	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	GREAT	EXCELLENT	f
af0e067b-e272-405f-9e16-5f87812f9421	686241e9-7a4e-4eb6-bc99-26699999001b	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	GOOD	GREAT	f
904a6436-206c-499c-ab75-e1063e220802	2e03b196-3248-4f14-9f2d-4661e503665d	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	GOOD	GREAT	f
63b17ed4-d66c-4e52-bac4-f0eac82f1c67	b9266745-39ba-4be3-b1a1-421801b79832	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	GREAT	GREAT	f
bbcb37fa-b702-4f10-8064-063ebf88820b	74e88236-472e-41ea-9475-73c94489ae2e	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	GREAT	GREAT	f
91711c35-d1fc-4437-89e8-010909ea59a8	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	GOOD	GREAT	f
c1f9de25-cb9a-418c-a274-bbef7407ba5a	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	GREAT	GOOD	f
e857ef54-e915-49c6-8e36-090c97951c88	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	FAIR	GOOD	f
e0b53700-9003-4b3b-af53-a2f739f3c99d	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	GREAT	EXCELLENT	f
fb42faf0-95a5-41e2-9f50-e8f01464dc17	fb78d640-ca97-407e-9d2b-6390b8a2c77d	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
740dff01-92d0-47d4-8bc4-e64625828169	8fa5f694-d7a7-49c2-98a2-e1aecdc80d3e	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
3d098a69-8a15-41b9-ad40-d953782d44af	00179acc-3d3c-496f-98db-fb88756116f4	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
172de809-688b-4b90-bf2b-857816acfa4e	45cedf94-714b-404a-8ad5-db42f55919eb	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
37d6cbf4-dfd5-4c7b-88f1-011d7f4e84e5	1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
ce8d1edc-201d-4660-86b2-47ec45424b44	69fec935-4bcd-43ab-9737-a524627dbe1e	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
282536f7-0e1e-4703-95ac-4140817ad1b3	f9c6b20c-e57c-4e70-9f32-dedd975aab01	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
73f02156-bc8a-4325-b0c7-c580e1ccee4a	abd4148b-b530-4440-b643-34d08a4bb811	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
bb6935fe-07d4-49e4-b070-a3a4270303cc	1556394a-6336-4838-8943-19088ecdf5e0	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
b322aaa2-9f58-4985-8bb3-75745b8cda5a	0e963947-3dcf-4f30-b316-ac9d07d81b0b	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
e59ed907-1f8a-44c0-a343-eb89755c7ddb	de28725b-ccaf-45e6-b808-aeeba3fa151e	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
53c302b4-7d69-427f-af8c-6d4c8be03b05	f4eb73ad-9a1f-4b7b-8899-b2a07ff4db2d	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
20e68dcc-cbfb-479e-8862-7cc408300861	4a3f375e-f8ce-46f9-8b9a-4587d069d036	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
7f02fb9d-e3e8-4579-99e7-670aa169cf1f	1461587b-fedd-4cb1-a122-58dd9ddc3fd9	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
2091dac2-35c7-4562-af41-c440b3a02dcb	1f770536-fee1-4ca2-9622-ed816628c9b7	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
481c68e2-3627-4504-8c1b-db6af477a237	63f57cea-4036-4e38-9d84-3c36f99124ef	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
3dae17be-008a-49dd-acfc-bd9121053fc4	3723e655-2484-4055-8570-13ee693d5a1a	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
ffcebfc8-cbfd-4be5-8da3-4ff1babf8700	3e62f535-90a9-4a75-9748-27ea0d491a54	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
5fd56967-4fbe-4301-b250-f8520930772e	ad671202-0d1b-4b31-a2fc-9fa9032f3b33	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
5387f238-64cc-4df2-bb45-4322370e0212	aa420673-c8ba-41da-9ee4-061022bb4a51	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	f	\N	\N	f
82230487-9df9-4f0b-9d90-9682ddd19248	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	t	GREAT	GREAT	f
6d087ab5-db75-4a97-a9c3-497422415bf7	91a00bae-00db-464f-8376-591e16a5a811	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	t	GREAT	GREAT	f
d56a9bc9-d231-4f38-8945-f355093400e1	e47d29de-6a02-4e63-a52a-964fc17b744e	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	t	EXCELLENT	GREAT	f
5a2d1e67-af0b-4098-a43b-081b2aeb2b37	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	t	EXCELLENT	GREAT	f
f234d50a-047e-49b2-a3f2-8f5962af2855	b1ef84a7-2238-4946-bd2d-97aae138bbad	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	t	EXCELLENT	GREAT	f
d293bcda-b7bf-4413-8e76-639045ae8c2f	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	t	GOOD	GREAT	f
9a348eed-4ee3-459a-a9f6-dc18d74cc3c9	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	f	\N	\N	f
11fed867-0857-43a7-84a9-2afd89ba9344	789e18c3-638d-4651-be65-ec0a1661539f	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	EXCELLENT	GREAT	f
35c08728-659d-4c70-a256-bdaeff4775ef	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	GREAT	EXCELLENT	f
4b267db9-a3f2-4f2b-bda9-16f93a31fd0a	4fa0db05-161f-4165-b00c-52528866490c	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	EXCELLENT	GREAT	f
3aa66c42-ef33-444e-8e50-9af00b2de3ae	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	EXCELLENT	EXCELLENT	f
b606fce5-fe22-4a48-b5c0-7a8940951267	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	GREAT	GOOD	f
d31b3e1d-1e07-415a-8b23-ea3c9e9315e7	a71c4a77-39cd-4672-a59a-0394bec62fcf	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
b426dc18-6744-4336-b20c-b02ffecd84bd	f179052b-20ed-4b30-92df-04ae478b0f06	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
9a46b7bf-9127-43b5-ace7-67fadf55c507	74ff2516-b259-4f3d-b68b-dbc5c29d6daa	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
858d751e-b125-41cf-b521-e57de793f862	350594d5-5cd4-4033-9294-6b50102afe7d	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	f	\N	\N	f
77a0768e-740e-4400-858b-4664cf4c3341	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Ei paikalla.	117ab460-e5a7-4e15-a674-aed050c43bf5	f	\N	\N	f
206ad316-c280-495b-b573-ff98f488ce3f	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	f	\N	\N	f
69d1ffda-1532-44dd-92cc-be2f6bdb638f	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	f	\N	\N	f
0854e59a-4488-479d-8e01-e73e78d8f67e	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	GOOD	GOOD	f
507ed3ba-dde2-4ee3-8a1c-14e12ca8141f	8cc39180-992f-41be-88d7-d798fc88abe0	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	GREAT	FAIR	f
93710f88-e993-42fe-bfe6-a04639f7a3b3	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	FAIR	GREAT	f
b3384a1d-4c1e-43f7-ba01-7567581d2ebe	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	EXCELLENT	GREAT	f
815bfe5c-670d-4c5f-b1b4-ed2c9b48909f	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	Työskentelit tänään hienosti kaikkien kanssa!	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	FAIR	GREAT	f
92078c80-9563-460a-b8e9-24d3c8f57da4	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	EXCELLENT	GOOD	f
42be7b02-4e01-4a48-9fc5-887828728044	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	FAIR	FAIR	f
db7f83a5-148a-4318-b917-97e5784c54f0	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	FAIR	GOOD	f
4b4a3830-3c8e-4c29-a6f9-ca440eb817c4	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	GREAT	GREAT	f
c989f89d-a51d-420e-926d-c13a57bdc8bf	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	GOOD	GOOD	f
09a41016-0804-44d5-b042-2b14e69041fb	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	POOR	GOOD	f
10b52536-66e3-4c76-9446-8f3499c37acc	a6eb654d-12a2-4350-a687-128314062791	Kiinnitä tulevaisuudessa huomiota tuntityöskentelyyn. Koita välttää puhumasta muiden päälle	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	EXCELLENT	GOOD	f
b6bc9500-e633-4d12-95fa-90e4ea1b1ffa	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	EXCELLENT	f
663e887d-cb50-406d-a111-e791a2100f23	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	EXCELLENT	f
f2b88294-d13a-4011-be98-fb68bb06d4cd	b9266745-39ba-4be3-b1a1-421801b79832	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	EXCELLENT	f
2a6d7c2d-8831-4dc1-91ce-9a45b9bec0bf	686241e9-7a4e-4eb6-bc99-26699999001b	Puhelimen käyttöä tunnilla.	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	GREAT	f
3534e049-0d67-459f-a81a-da39ca6bab27	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	EXCELLENT	f
9c836ac3-ca15-4444-aa48-9fb1788659dc	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	EXCELLENT	f
f1cd5a3c-55b5-45ac-b67e-7b9c7c0313de	24007058-ca39-4c69-9004-c3d29b441fb3	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	t	GREAT	GREAT	f
68bcf71d-ba95-428c-8d7e-ce5b71f6188d	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	f	\N	\N	f
c6790b82-660a-4768-aa48-1811463aaba5	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	t	GREAT	EXCELLENT	f
8860d981-5e0f-406c-b8a4-36cc15f39636	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	f	\N	\N	f
62e1a3d4-58a6-455b-a8ca-af19aa5ea34c	5fd1effd-1670-4a40-bfaf-75a2a048fc91	Hyvää puolustamista omassa joukkueessa.	117ab460-e5a7-4e15-a674-aed050c43bf5	t	GREAT	EXCELLENT	f
417302b5-58fa-48f3-921a-3889b3e58ec9	b05b035e-4867-40c1-965e-f60630bfa457	Passiivista osallistumista.	117ab460-e5a7-4e15-a674-aed050c43bf5	t	FAIR	FAIR	f
5ebe5d25-78c1-44c0-81a3-28f4079586e4	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	t	EXCELLENT	GREAT	f
a6dd63e4-229c-4117-ba5b-ac774f178567	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	f	\N	\N	f
74f88033-a927-42d3-883f-a6d0bc7bca77	720863b3-15b5-4928-b516-5a8ec0cee764	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	t	GREAT	EXCELLENT	f
0e860d3e-961d-4c44-8f88-2f31765d373d	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	t	GREAT	EXCELLENT	f
917be8e3-102e-43cb-80d7-c10641417d59	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	f	\N	\N	f
f2ad2d0c-da35-4bfc-8294-8f5645dbaf81	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	f	\N	\N	f
eb6bbd7c-e6f4-476e-9d15-93b019f5056a	4943ad21-7f08-4b45-8d6c-7cccbfb05562	Paljon opettajien kanssa seisomassa.	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	GOOD	f
4abdcbc3-1f43-4adb-832e-43f85a16ff91	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	EXCELLENT	f
3bd837eb-7d77-4bf1-ac29-1af008ac9bf7	1b5d1532-f11c-4b7a-bb15-8754ae38223f	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
10d98aae-f929-4308-86b6-daaafffca265	0d410afb-beb1-4ac1-883c-f4d19f5f858f	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
d9bcfbdb-0929-433d-8310-e03c5584e9e8	88c69065-37d1-45f2-a48a-a7b12a0694cf	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
75f23919-a2de-4ed7-a41f-a966cac1bb29	92d51cc4-7e8c-4bcf-84b8-b3f4cad005cc	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
d6e316ed-74fe-4095-88d7-19b90bbc20da	12acc9ab-19a4-404d-b072-4760f41732dd	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
94fccde1-ea84-4f69-af92-e4f033d5b928	d6bae43b-c9c1-42c3-bd74-736d3be6e4f2	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
4e869d77-d181-4e7c-afc6-ef2dad5cfd7c	8a993418-3f13-49b4-bb21-93368d8f7a50	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
8a2cc5f9-010b-48b5-95b4-62c10346a2f0	60c35aef-6137-44dc-b5d6-b796f1443148	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
e30915b4-297a-45e0-9853-0f3fda3256a8	7e57c1d9-b037-4ae6-a0c9-2b409b90f748	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
83c6ae3e-bfc1-42c6-a45d-60a20338d9f3	86ad5e56-2605-4fd5-a0a2-3004e6136a7c	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
cd7d349c-5510-408d-9673-da46cd336a1c	3c489011-57bc-41fa-a0b1-2166fd23bac5	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
50c3f8eb-6b90-4e9a-80e9-ff7507e214cf	39826f74-cf4a-41b7-a295-5cb63ec3a196	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
67e084ba-41de-4ed6-9d54-fcc31b214047	954c2876-5f2b-4618-a2c0-8f86ff5b3da5	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
3de864b4-4ad3-4d9e-8bdf-4491d4e950d1	3d55963e-6744-4828-b25d-c02aaa7ccc4c	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
8ba13ec3-e43a-4ae2-94c2-8504490e5a5e	1efd1671-ff54-4332-9da1-474aa3f3ec04	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
888fd7b9-6ba0-41af-bcc9-3010183260ef	24c494db-a428-4430-ae3a-c321d5e765f7	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
d4d74fb5-40fc-4f69-ba87-85188e5cf990	b4766346-0c81-4d98-a489-654ca9b3c6db	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
3c549fb2-78d9-48db-b817-3775454fbdbc	36c47c4b-1f5b-43d8-843a-6f74ab4e86b9	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
99496342-95e2-41a8-9832-668f5aa527f0	aff989da-421b-4128-968e-5f54d59ca7a0	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GREAT	GREAT	f
b1825e3c-a95a-4266-b8b3-ac16b0e6f59f	95ef1789-275a-42de-bfc3-c9c006432782	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GREAT	GREAT	f
6bffbf4d-c546-428f-95dc-27b28384fad6	6c629051-3712-43f1-8f21-c357442fc591	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	GREAT	GREAT	f
bb0e6b07-814b-4309-8cc6-c6c6ceaea666	d6b3db8b-50e7-4a6c-8ed2-2247a659a3a9	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
8b05b468-0196-4eab-9e14-6c4285de4c84	a17ec781-f403-45b7-b1a2-2ad88dc2038e	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
3a53fa7c-26ff-44da-a3fa-8bcdaf7fdd98	9ffd35f9-d869-4406-aa8c-cf60cbc47830	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
0cb4fc07-f26b-405e-987e-1c136e7ec9b6	545958d4-a061-46c0-a58b-e814f2864886	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
f6b1feed-304c-4215-925f-2fc75942ebc6	f37fb196-de25-4ea8-a1ff-280491ef3865	\N	1e80e956-c012-4d76-a01a-0d32007da1db	f	\N	\N	f
abcfb747-d1f4-4059-95e2-c29216e31b2e	7b45664d-caff-4e11-a717-7c3e2e1ed7f7	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
b94f9623-fd3a-40e0-9b58-be62abd9c400	803c9cfd-c665-452f-9cf4-1315a875fa0e	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
93cd97b6-f7a5-4199-bab1-f4b49a648cdb	34f18910-a0db-4e48-8129-8416b575d22b	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
3de75b6f-85a9-4c61-8dec-5b519c8090e5	e5570e54-941f-4e8b-b7de-f2dd3d7662e2	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
11d13e7c-6447-4c8d-b867-f4d7d4f7d960	7f64f516-bdbd-490a-9d83-6625c9834929	\N	1e80e956-c012-4d76-a01a-0d32007da1db	f	\N	\N	f
3a26bf1e-cd23-45d4-b8fc-0e987dda375f	671ee4af-e36d-437d-b3ec-bee0179c96c4	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
af4965c4-4b43-413a-8013-1a670fca801c	165e6b48-6ffc-498b-a9c4-aac0d7a14fe2	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
97853523-b79e-47f8-b838-6b50c44b9fc1	bcdcfdce-bc43-43af-88b2-ce2f79d40da0	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
9e9efcc5-603e-4cbb-8791-ccc30e918925	d21c58bf-a09d-4a2e-ab5f-131a3233f6ba	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
cbc296ad-b5f7-4356-a95a-e3a12e96b119	3a817706-c52d-4a77-8f87-68ef4514aef9	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
d64ac8bd-e0af-4ef0-9b84-7d0c10475c68	f2cd6a55-4291-4848-a66e-36d096f181c4	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
c6c27cc3-e477-4b64-8684-c64bdedec228	7c3affe4-d2a3-4620-907f-abc411bd5534	\N	1e80e956-c012-4d76-a01a-0d32007da1db	f	\N	\N	f
4b50e899-d9e6-4e56-9947-a9180f612a66	8597552c-2527-4294-8a08-56d47b563b33	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
4b7751d5-e0e7-46c3-a5da-674aff78fa17	d9dd649b-f9bf-4670-84ea-a102fc16cfcc	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
ae9335a8-ea6e-4650-baea-c6253e0e1a4f	dc2469d2-1c1d-499c-bb3c-ff061b70307d	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
da8252d1-14d2-400e-b1a0-7d8c336e7fea	98160f96-0d06-40e7-9e12-1c1ad90442fd	\N	1e80e956-c012-4d76-a01a-0d32007da1db	f	\N	\N	f
3c17f60e-3727-499a-9c88-49d95913daf0	f71a7e38-187d-4dfb-823d-f959158a971f	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
f25e761b-4793-4da3-b083-605c9766b2e0	6bc63090-ea58-4189-b5d1-cba135d9da2b	\N	1e80e956-c012-4d76-a01a-0d32007da1db	t	\N	\N	f
4103fe37-249d-4e33-8f91-5dba4210ed66	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	b38a9a41-599f-4d1a-86df-12346e38a933	f	\N	\N	f
33be215c-5d72-45eb-b175-7769d72c4538	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	b38a9a41-599f-4d1a-86df-12346e38a933	f	\N	\N	f
40a4fbbe-058c-4c1c-8f63-12b5d1fbdb06	789e18c3-638d-4651-be65-ec0a1661539f	\N	b38a9a41-599f-4d1a-86df-12346e38a933	f	\N	\N	f
e410c9d4-55dc-44fd-891e-5ade48f5c4c9	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	b38a9a41-599f-4d1a-86df-12346e38a933	f	\N	\N	f
1799269e-e4a8-4f9b-b5a5-574e6f3f56a0	4fa0db05-161f-4165-b00c-52528866490c	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	EXCELLENT	EXCELLENT	f
0ee23c51-3743-4498-b7ee-787f342290f3	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	GREAT	GOOD	f
755d208b-6a70-424c-b9fc-7bffb0c88814	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	GOOD	GOOD	f
3a5b61d5-5027-4525-9fd9-6619acd46d3c	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	GREAT	FAIR	f
23dc6614-401a-4232-a4f7-247a586ed533	a6eb654d-12a2-4350-a687-128314062791	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	EXCELLENT	GOOD	f
70ffd48e-f5bc-412e-9d2e-b520edca0368	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	FAIR	GREAT	f
e79d3f7a-168b-480d-ab30-10efd85c9e48	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	FAIR	FAIR	f
6319074c-8b12-4119-a1d1-2e705caacd9f	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	GOOD	GOOD	f
66e853ce-16ae-4cdf-88d8-6a7453fbd714	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	EXCELLENT	GREAT	f
2b61c667-1e5f-4d17-a11e-8ad60f8f0924	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	GREAT	GREAT	f
c75f35d1-0fb8-48a1-8e78-9ab2eae457ee	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	GOOD	GREAT	f
4bcb9109-db0f-4457-9c66-53319709a6be	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	FAIR	GOOD	f
821659e8-4112-4612-b34c-0fd4835087d2	8cc39180-992f-41be-88d7-d798fc88abe0	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	EXCELLENT	GREAT	f
519c14fd-523e-4d1a-8e77-faa1df4af1d6	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	GREAT	GOOD	f
4aee6abb-c774-4207-a56b-1d09d51e29d9	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	FAIR	GOOD	f
7ecbcd24-2f5c-4ced-b621-b69b57593c50	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	FAIR	POOR	f
5f6bff30-c784-40b3-915d-8ffe88302dee	d6b3db8b-50e7-4a6c-8ed2-2247a659a3a9	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
b5606720-632f-47b1-af6b-0afedce34d58	a17ec781-f403-45b7-b1a2-2ad88dc2038e	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
7a885017-16ec-4cb2-b93a-d2172ba13970	9ffd35f9-d869-4406-aa8c-cf60cbc47830	\N	00dcbe25-4f69-4724-b33b-9d857f012479	f	\N	\N	f
43782dd0-96bd-47aa-8c92-0390b68644d6	545958d4-a061-46c0-a58b-e814f2864886	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
db4a730e-f3ad-4bdb-a5fa-abb413c20dcc	f37fb196-de25-4ea8-a1ff-280491ef3865	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
969f2e62-548e-447d-8a22-c5b2aa6a2706	7b45664d-caff-4e11-a717-7c3e2e1ed7f7	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
17f8f897-22d7-4a05-aaa0-43747e8df7d0	803c9cfd-c665-452f-9cf4-1315a875fa0e	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
8acc9d93-311b-4634-80f7-0442ef4ea354	34f18910-a0db-4e48-8129-8416b575d22b	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
093b18ad-2ff6-4a8a-80ca-90b6f314a72d	e5570e54-941f-4e8b-b7de-f2dd3d7662e2	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
7aff0e02-1f46-4259-a274-148ab2f76ca4	7f64f516-bdbd-490a-9d83-6625c9834929	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
60197628-02aa-4096-8375-a12a4e97c35a	671ee4af-e36d-437d-b3ec-bee0179c96c4	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
6c8daa93-809a-4088-83e5-456d320a8d3d	165e6b48-6ffc-498b-a9c4-aac0d7a14fe2	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
4eba50fe-044c-461f-9e9d-2b1385f0e330	bcdcfdce-bc43-43af-88b2-ce2f79d40da0	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
e841163f-020b-40d8-8982-576ba970b61b	d21c58bf-a09d-4a2e-ab5f-131a3233f6ba	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
d9a67e64-8a27-4bd6-87fc-3ee3bf70ef70	3a817706-c52d-4a77-8f87-68ef4514aef9	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
97bf2370-d416-4233-8d7a-aa22086f6eb8	f2cd6a55-4291-4848-a66e-36d096f181c4	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
f368efad-9f09-41f6-bd27-2e0703bed880	7c3affe4-d2a3-4620-907f-abc411bd5534	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
7cf1b06f-c2fa-47a5-89e4-f493de96ddd1	8597552c-2527-4294-8a08-56d47b563b33	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
a6886209-e405-401a-b3bf-e52ea30660a1	d9dd649b-f9bf-4670-84ea-a102fc16cfcc	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
f28d404b-bbd5-49d6-9d2a-4fd7fa6b06eb	dc2469d2-1c1d-499c-bb3c-ff061b70307d	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
ed2bc144-3ecd-45c6-8445-af4b8de3fdc4	98160f96-0d06-40e7-9e12-1c1ad90442fd	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
4ebfe593-f61b-477c-8e5e-edb3b5ce9efd	f71a7e38-187d-4dfb-823d-f959158a971f	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
0770487d-8dc6-408c-9016-2ffa4b2ae41a	6bc63090-ea58-4189-b5d1-cba135d9da2b	\N	00dcbe25-4f69-4724-b33b-9d857f012479	t	\N	\N	f
861c04d4-13d6-4848-bd10-8cc59f49aad8	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	15cf1b92-14da-40cf-a53f-34d44b71a6a8	f	\N	\N	f
d6f008fd-441f-4f68-80c3-f2c82ea34619	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	15cf1b92-14da-40cf-a53f-34d44b71a6a8	f	\N	\N	f
3f20f820-4fe4-4733-8735-e8914cddacef	404347be-f571-4254-b055-a06e9a9962f9	Varmoja nostoja hihalyönnillä.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GREAT	GREAT	f
d32d09e4-7211-41b8-9390-052dab7ac0fe	799b59e5-c962-4f19-9f9d-01518c57a550	Hienoa taitojen soveltamista lentopallossa esimerkiksi yhdellä kädellä kurkotukset. 	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GREAT	GREAT	f
48f54192-ef28-439f-8e64-555f7814854d	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	Mukana toiminnassa. Hienoa heittäytymistä koripallossa, vaikka ei itselle tutuin laji.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GOOD	GREAT	f
2b3f1c86-2106-4041-9368-ec22ed7c8b75	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GOOD	GOOD	f
0aa0319b-51a0-4f21-b36c-c41e447fdcd6	046a3d24-b93f-44d1-ae1b-aa628e141bae	Työskentely hieman oikukasta tänään. Käteen sattui, mikä taisi näkyä turhautumisena. Hyvä muistaa että tunneilla joutuu kokeilemaan erilaisia juttuja!	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GOOD	GOOD	f
f841692b-73c0-42fe-8ca6-be488dbfd4c2	74e88236-472e-41ea-9475-73c94489ae2e	Mukana verkkojen laitossa ja toiminnassa. Edesauttoi oppimista.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GREAT	GREAT	f
e9bfed18-d99b-49d5-95fc-61d49b6b3cc8	2e03b196-3248-4f14-9f2d-4661e503665d	Taitavaa pelailua. Hyviä nostoja sekä passeja hihalyönnillä ja sormilyönnillä.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GREAT	GREAT	f
37d95d35-52fa-4d85-8e34-3b1ef881de3b	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	Mukana verkkojen laitossa ja toiminnassa. Edesauttoi oppimista.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GREAT	GREAT	f
2a0c6b47-0edb-4ec8-8feb-44cf6d8667d7	dadb6322-e514-4a92-b22b-ab9357a4ac32	Tänään aktiivista osallistumista tunnille, vaikka virtaa riitti kaikkeen muuhunkin epäolennaiseen.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GOOD	GREAT	f
7152156f-294c-4510-8f94-76e497f103a0	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	Palloilutausta mahdollisti taitojen soveltamisen tässäkin ympäristössä. Hyvää työskentelyä!	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GREAT	GREAT	f
f33ebc58-975d-4918-8b1b-0b44e0b1bfec	b9266745-39ba-4be3-b1a1-421801b79832	Kivaa työskentelyä tunnilla. Taitavaa itsereflektiota tunnin jälkeen omasta työskentelystä!	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GREAT	GREAT	f
6dd0b3ef-a2a7-4adb-85cc-16324a74c52c	686241e9-7a4e-4eb6-bc99-26699999001b	\N	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GOOD	GREAT	f
355a46f5-b3da-486a-8834-c376cd5eb295	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GREAT	GREAT	f
8da85666-1e17-4f86-9e04-5c9432b3afeb	1e2db5dd-c171-460e-bf48-4bc55f04f49e	Levotonta työskentelyä. Ei lentopallomaisia lyöntejä ja ratkaisuja paljon.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GOOD	GOOD	f
395080d2-703a-4911-ab93-5fbaa190c859	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	Työskentely on aina kiitettävällä tasolla. Se mahdollistaa asioiden oppimisen!	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GOOD	GREAT	f
8d2d68e9-d994-4904-9377-8a6f344d2763	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	Heittäytyy toimintaan mukaan. Taitava liikkumista. Välillä tunnilla tunteiden kuumentamana saattaa vaikuttaa joukkueen henkeen epäedullisesti.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	GREAT	GOOD	f
09021ce5-87ec-4dd3-8989-e2a4a5614b8c	45adabcd-6682-4ff7-abee-9f8061af9a3b	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
0aaa0331-3946-4200-8df4-801c43ef8d81	4bb3b891-7462-4e8d-ae54-e2df607d1478	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
21768729-1c99-4275-84df-58f5cd6f56e5	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	f	\N	\N	f
66d1df21-4b61-4260-898e-bf6bb6fc9c66	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	GOOD	GREAT	f
064071d6-7613-476a-855c-1b710a294c04	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	FAIR	GOOD	f
4f970490-cf6b-4246-842a-3d0b3c0d081b	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	EXCELLENT	EXCELLENT	f
4a282401-34e8-4aa8-9479-86fe17018343	a6eb654d-12a2-4350-a687-128314062791	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	GREAT	GREAT	f
4dd413de-926b-4d23-9353-c6a9d22c2b53	98d2b651-d44d-4a40-ab28-da3fa61df960	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
60986cfe-acc3-489b-aafe-6a1fce2aee93	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	f	\N	\N	f
edfd0017-5d05-4269-8807-68abcf049217	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	f	\N	\N	f
e88bcee2-3abf-422f-a7d3-fa0f2db0ec86	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	f	\N	\N	f
9047aea9-004a-4756-9dcd-735e0b34bd18	4fa0db05-161f-4165-b00c-52528866490c	Toimit uintitunnilla vastuullisesti ja pidit yllä turvallista toimintamallia	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	GOOD	EXCELLENT	f
418cfe20-c4dc-4239-8073-57fd93c55e59	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	GOOD	GOOD	f
e8a0b259-fa67-496a-b8bf-3f18eb6fdec3	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	GOOD	GREAT	f
a26f8ea5-336b-438e-9208-b697586aca45	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	FAIR	GOOD	f
889a3142-1829-4b1f-855e-6830edf79e78	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	EXCELLENT	EXCELLENT	f
afb90723-f17d-4288-8176-32a80b59a6ad	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	GREAT	EXCELLENT	f
80eabe0b-75d2-4fa0-9d36-61c7defe1419	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	EXCELLENT	GOOD	f
ad46fe67-47a9-4aa5-a8b7-ca657340106f	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	FAIR	GOOD	f
968a5a71-e90b-42de-b17d-9c0982a77dd9	8cc39180-992f-41be-88d7-d798fc88abe0	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	FAIR	GREAT	f
d08c5a78-cee7-4996-b2d5-fd40f4ecde1d	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	EXCELLENT	GOOD	f
0b24b34f-dddd-48d8-bab2-f35e521ba7ff	789e18c3-638d-4651-be65-ec0a1661539f	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	GREAT	GOOD	f
d43d48de-e02c-4de7-ad32-18b38ce71a79	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	GREAT	GREAT	f
075e7d11-0271-4b29-aebb-a6c63df24ca5	b8a8e21b-2e09-4855-a354-0c48800913c9	\N	1edc3524-678e-4c03-9a19-001c89aa9f58	f	\N	\N	f
0231fe43-546a-45ee-9f1c-fec5e48c3a86	28426aca-f675-46f7-bafc-dc5f7eb649c5	Hienoa heittäytymistä musiikkiliikunnassa.	1edc3524-678e-4c03-9a19-001c89aa9f58	t	EXCELLENT	EXCELLENT	f
1f029c59-c616-43bf-ada0-69c1ab660724	251b27c1-5684-424b-b17b-7257a311bd33	Huippua työskentelyä tänään!	1edc3524-678e-4c03-9a19-001c89aa9f58	t	GREAT	EXCELLENT	f
684537e4-8747-4724-a6cb-8d66ea65f0bd	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	Mukana työskentelyssä. Hyvä asenne, hieman laiskaa tekemistä alussa.	1edc3524-678e-4c03-9a19-001c89aa9f58	t	GREAT	GREAT	f
611375ec-d356-466a-8dc5-8a833a1c6390	f6705543-53b3-419c-9a54-c23cd0c8525b	Hienosti mukana, vaikka jalka kipeänä. 	1edc3524-678e-4c03-9a19-001c89aa9f58	t	GREAT	EXCELLENT	f
dae5cfa2-2ad3-436d-93ef-fefeb0e1d510	9c66fa7f-c08f-4905-9c54-5da739156493	\N	1edc3524-678e-4c03-9a19-001c89aa9f58	t	GREAT	EXCELLENT	f
57214351-2d6a-464d-ac14-76fafaa18b4d	04629d10-42df-4873-bb8e-a38230d93b8a	Tunnollista työskentelyä tunnilla. 	1edc3524-678e-4c03-9a19-001c89aa9f58	t	GREAT	GREAT	f
a75bd64b-60d7-4e67-a60f-b01cbb7187bc	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	f	\N	\N	f
8d0c090a-0929-49e5-b9f4-91d97184b7ab	b43981e9-6f50-4908-b225-1f5d5a70c68e	Vaikeuksia toimia muiden kanssa ja mennä annettujen ohjeiden mukaan.	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	GOOD	FAIR	f
bb448c18-0bfd-443a-9058-beec22be965a	350594d5-5cd4-4033-9294-6b50102afe7d	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	GOOD	GREAT	f
01a0dec4-9030-4f41-ad14-d8e2cb5a87b0	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	Huippuhyvää työskentelyä. Taitavaa pelaamista.	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	EXCELLENT	EXCELLENT	f
5b48c67a-b67f-4f5d-acb8-77d2a46aa7a5	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	GOOD	GREAT	f
88d900c8-4439-4015-b741-383a5764a00f	24007058-ca39-4c69-9004-c3d29b441fb3	Vaikeuksia toimia muiden kanssa ja mennä annettujen ohjeiden mukaan. Puhelimen käyttöä. Tunnin lopussa otti osaa pelaamiseen.	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	GOOD	FAIR	f
81911320-fc69-481f-82c3-189839556ea2	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Vaikeuksia toimia muiden kanssa ja mennä annettujen ohjeiden mukaan. Häiritsi muiden työskentelyä kehoituksista huolimatta.	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	\N	\N	f
f2a6f319-8762-4215-998b-daef06f6551d	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	EXCELLENT	EXCELLENT	f
3dd9a5b4-88cb-4c45-b590-585294c5d182	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	GOOD	GOOD	f
2737e427-2252-4c1d-86b7-e5a9a03796a6	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	GOOD	GREAT	f
108bcd42-93ab-4d17-9349-148ae0b5c436	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	GOOD	EXCELLENT	f
667f60a9-dc2a-49d6-9c48-b4edb9d4ebcd	b05b035e-4867-40c1-965e-f60630bfa457	Ei aivan täysillä mukana, mutta kunnollisesti ja muita kunnioittaen.	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	GOOD	GOOD	f
c6d40ff9-7049-43ec-9fbe-5e0faa54461b	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	Vaikeuksia toimia muiden kanssa ja mennä annettujen ohjeiden mukaan.	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	GOOD	FAIR	f
844c29cb-77ce-4e1f-8620-fdd3b410b39c	dc61c65a-cfe6-4743-a80b-98c54491a42c	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
a812dac4-8c80-4436-a9f5-2f6b9299efd5	1ba24224-da11-4745-be85-ed1ce7bb2669	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
b8ee9004-895e-49af-aa9e-c29b12dc4332	8faa9bc9-fbb9-4c0c-ac24-99c987bd412f	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
697cd222-d559-4218-9a7a-9230d97913fc	24c494db-a428-4430-ae3a-c321d5e765f7	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
fdeddb93-63b1-4305-9648-6a6ccf643940	aff989da-421b-4128-968e-5f54d59ca7a0	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
f5fbea05-5b08-42ae-8f04-9e4487adc118	95ef1789-275a-42de-bfc3-c9c006432782	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
d2e2a2b6-3529-4274-9d03-bad16b74e7ba	6c629051-3712-43f1-8f21-c357442fc591	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
c3f08294-01e0-456e-8fc2-109e712cb37c	b4766346-0c81-4d98-a489-654ca9b3c6db	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
c0998937-25ae-44e6-bb75-30ee6e0937d1	36c47c4b-1f5b-43d8-843a-6f74ab4e86b9	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
999c491e-9e09-4f39-8520-ea9edcb4fdd1	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti osallistui aktiivisesti beach tennikseen, vaikka hänellä oli hieman vaikeuksia pelin sääntöjen ymmärtämisessä.	c0076c27-405b-4dcc-a944-323b279d0986	t	\N	GOOD	f
d57357e4-68e0-445c-a1b6-d8d3943a8093	720863b3-15b5-4928-b516-5a8ec0cee764	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	f	\N	\N	f
0af2f3fa-5095-4ee1-8a6d-df78da3594d9	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	GOOD	GOOD	f
e1c4094b-0b2b-495c-8f5c-1cc63ad004db	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	Vaikeuksia toimia muiden kanssa ja mennä annettujen ohjeiden mukaan.	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	GOOD	FAIR	f
f1dae913-a5f4-4a31-85ab-7f4cc58bdaaf	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	GOOD	GOOD	f
c7748ef7-4a88-48c1-a019-15c45b04bc67	28426aca-f675-46f7-bafc-dc5f7eb649c5	\N	568d601e-2dff-47f1-96a4-bd823b8aadae	t	EXCELLENT	EXCELLENT	f
231c7d98-7325-4d2d-aa08-9bbf86c91ac8	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	568d601e-2dff-47f1-96a4-bd823b8aadae	t	EXCELLENT	EXCELLENT	f
3d4a3147-562d-430f-a6b3-434dfa0690e7	251b27c1-5684-424b-b17b-7257a311bd33	\N	568d601e-2dff-47f1-96a4-bd823b8aadae	t	EXCELLENT	EXCELLENT	f
31e420f4-b0d8-4082-af63-2f4e916f50ff	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	568d601e-2dff-47f1-96a4-bd823b8aadae	t	EXCELLENT	EXCELLENT	f
e5c954fb-b58d-441c-8efc-cfdd74eab464	9c66fa7f-c08f-4905-9c54-5da739156493	\N	568d601e-2dff-47f1-96a4-bd823b8aadae	t	EXCELLENT	EXCELLENT	f
331172ba-1dc7-4638-bf78-c7e770dd23db	04629d10-42df-4873-bb8e-a38230d93b8a	\N	568d601e-2dff-47f1-96a4-bd823b8aadae	t	EXCELLENT	EXCELLENT	f
fc878873-4bba-4b87-9487-0712133f3fa4	b8a8e21b-2e09-4855-a354-0c48800913c9	Turvallista ja toisia huomioivaa pelaamista!	568d601e-2dff-47f1-96a4-bd823b8aadae	t	EXCELLENT	EXCELLENT	f
d9c565f5-8215-4e58-adc8-d11c0bc0cc74	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	68af71a8-0626-451c-a0ba-597e762fd9dd	f	\N	\N	f
7fa7875c-4402-444d-89d2-6391f716fdfe	7af2670e-d622-44de-9458-0e3490224f19	\N	68af71a8-0626-451c-a0ba-597e762fd9dd	f	\N	\N	f
1fa5df8c-eb1f-4913-a0c9-6f2ae2d572e3	052654dc-bfba-4092-85d4-6894c908f9b1	\N	68af71a8-0626-451c-a0ba-597e762fd9dd	f	\N	\N	f
920e2325-c445-455b-8a1c-e53d9cf97e35	a9823635-cc6a-4026-ad85-423287d7ec49	Oivallista työskentelyä. Mukana kaikessa ja muita kunnioittaen.	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	EXCELLENT	f
11b59555-17bb-4e7e-b24c-3d4262c5eba0	16149225-d420-4254-88de-36f235415650	Poissa	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	\N	f
443f5522-638b-479b-b2ac-4824376d5f41	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	Pientä naureskelua muita kohtaan pelissä. Aktiivista osallistumista silti koko tunnille.	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	GREAT	f
df3633af-4993-4424-ab78-ac8ae4767cae	b015f02b-0e21-4f21-93d4-8497311b6490	Oivallista työskentelyä. Mukana kaikessa ja muita kunnioittaen.	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	EXCELLENT	f
d0a97dfa-705d-448e-85de-8da4c2fe5e7f	4cdb20f7-d8a7-480c-9379-bbe14d95d933	Poissa	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	\N	f
6e079b13-ea60-446c-9b96-93ff482829c6	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	Työskentely kiitettävää. Mukana suunnittelemassa ja muiden aktiviteeteissa.	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	EXCELLENT	f
0f2ff805-5ebb-47f7-93d9-2d68b97b8cd8	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	EXCELLENT	f
0e2823b2-93dc-48ce-b394-1e349c134bf3	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	EXCELLENT	f
d76be387-6fb9-4b39-bb1b-52fa3013ec88	898eaa06-334f-4446-98b3-2368ad2b6cef	Kaikessa erinomaisesti mukana, vaikka kertoi päivän olleen huono. Hienoja tunnetaitoja.	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	EXCELLENT	f
0b0d10a8-df34-4be4-8393-dc72e1b2f273	13e55cbe-ac55-47e1-b4d0-cc80073762e4	Suunnitteli ja otti osaa aktiivisesti ryhmän työskentelyyn.	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	EXCELLENT	f
2054dad4-76f5-47a9-948e-223954f8bbd2	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	EXCELLENT	f
1688d8d9-3bfe-45a4-8d9f-5cdd889b211c	eb96e883-bf2d-4482-b8c9-6d272ee35354	\N	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	EXCELLENT	f
f98fa9c5-93b3-42dd-9b06-abe80d99391f	404347be-f571-4254-b055-a06e9a9962f9	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GOOD	GREAT	f
e8e18318-052e-4da8-aaa4-5271daa75cac	799b59e5-c962-4f19-9f9d-01518c57a550	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	EXCELLENT	EXCELLENT	f
9a128be1-1425-4d4c-bee6-9b94d1e6d0ca	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GREAT	EXCELLENT	f
cab244c8-3657-4d3b-9471-e06a5772d179	74e88236-472e-41ea-9475-73c94489ae2e	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GOOD	GREAT	f
eb79cfe2-2fb2-4149-9d70-19b51ffa5268	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GOOD	GOOD	f
52493fbc-5bb6-4010-bfdb-a971ffdfba7d	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GREAT	GREAT	f
23c660dd-aa5c-465a-b724-907b96350528	2e03b196-3248-4f14-9f2d-4661e503665d	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GREAT	GREAT	f
6863c0f1-ab1a-485f-b460-011199517985	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GOOD	GREAT	f
e738fedd-36a3-482d-8841-40b6478a28ac	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GREAT	GREAT	f
7b38f72c-7018-4ba2-8487-78f552863b0e	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	EXCELLENT	EXCELLENT	f
2e640cea-d1b3-46a4-99f0-f97fe1974495	b9266745-39ba-4be3-b1a1-421801b79832	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GOOD	GREAT	f
924c46fa-e613-4e93-8b10-a1579ae69016	686241e9-7a4e-4eb6-bc99-26699999001b	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GREAT	GREAT	f
815bf37a-caf5-433e-8203-346cd6f9115d	4943ad21-7f08-4b45-8d6c-7cccbfb05562	Ei osallistunu tunnille. Ollut kipeänä.	c00a27a4-7ce1-45c0-8696-703841932620	t	\N	\N	f
ae077ef7-0920-4436-91ca-7387e5277a13	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GOOD	GREAT	f
a9a96840-b9d4-406a-8dc5-5925ae16e82e	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GOOD	GREAT	f
f5bb717d-385b-4757-8cfb-49a948985ce4	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GREAT	GREAT	f
0a61ec94-31f2-4d2d-bdf8-8b17420403ff	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GOOD	GREAT	f
742b8923-e5ab-4a78-b981-39a1bdd0f897	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	GOOD	GREAT	f
e169b3a2-5943-4ca4-bc70-1776fbd1452e	4a3f375e-f8ce-46f9-8b9a-4587d069d036	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
cc486309-0ebf-418e-b666-e4e68ea54106	1f770536-fee1-4ca2-9622-ed816628c9b7	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	GREAT	GREAT	f
f1a2ab02-7159-4de8-803f-fc1e921d39c8	f9c6b20c-e57c-4e70-9f32-dedd975aab01	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
d0a4c273-e79c-4be4-8989-b96fd330cf81	8fa5f694-d7a7-49c2-98a2-e1aecdc80d3e	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
fde9c6e8-060a-42c2-a1ae-643da8d9fbbd	63f57cea-4036-4e38-9d84-3c36f99124ef	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
deff9d52-11f1-4746-a1a8-15ac7ae94e2d	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
16666d2c-9d1f-4cc9-8d36-8a548a086ca8	1461587b-fedd-4cb1-a122-58dd9ddc3fd9	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
6f137990-1acb-4600-8935-bc25943ce275	00179acc-3d3c-496f-98db-fb88756116f4	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
c5544a56-13e8-482b-9f21-e7f1e2179562	1556394a-6336-4838-8943-19088ecdf5e0	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
f5af006f-2470-44e6-a32f-8d5c696d34b9	3e62f535-90a9-4a75-9748-27ea0d491a54	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
79f5c23c-49f2-47bc-814c-b951945900b5	fb78d640-ca97-407e-9d2b-6390b8a2c77d	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
0296433f-9989-46c3-a641-c25be09b1ebf	69fec935-4bcd-43ab-9737-a524627dbe1e	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
a8f04a72-e6b3-4485-bc1a-692085cff0e4	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
a17caf7e-7e65-4ecb-86ce-91d75a78d404	f4eb73ad-9a1f-4b7b-8899-b2a07ff4db2d	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
281e329c-7424-445a-8d06-282d0341369c	de28725b-ccaf-45e6-b808-aeeba3fa151e	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
4684ed0f-bbfc-4c52-8c59-a8942951d021	0e963947-3dcf-4f30-b316-ac9d07d81b0b	Työskentely ja taidot kiitettäviä. Mukana kaikessa hyvällä asenteella!	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	GREAT	GREAT	f
e09d784a-3565-4887-b1d9-bb5d5a0aa07f	91a00bae-00db-464f-8376-591e16a5a811	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	EXCELLENT	GREAT	f
d33c8070-e7b4-4ea3-90a0-1ef457e8a805	b1ef84a7-2238-4946-bd2d-97aae138bbad	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	EXCELLENT	GREAT	f
a664fc00-ab84-465a-8efe-94c3f25786af	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	GOOD	GREAT	f
587c3770-40fa-47ae-b3a4-aabaeae93614	45cedf94-714b-404a-8ad5-db42f55919eb	Ilolla mukana kaikessa.	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	GREAT	EXCELLENT	f
ae41d397-9921-4c78-b0d1-2e4846da9988	1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	GREAT	GREAT	f
a0e85fae-3790-4f59-8b14-563da8d30076	abd4148b-b530-4440-b643-34d08a4bb811	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	GREAT	GREAT	f
3438db68-53d6-47bb-a709-7c02af96106a	ad671202-0d1b-4b31-a2fc-9fa9032f3b33	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	GREAT	EXCELLENT	f
0fb287bc-f24c-441a-9324-439e61072ecb	3723e655-2484-4055-8570-13ee693d5a1a	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	GREAT	GREAT	f
1116c0b1-d903-4e6b-a7d5-2a3f9e53a1f4	e47d29de-6a02-4e63-a52a-964fc17b744e	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	GREAT	GREAT	f
9dfebedf-5fea-4a66-ae28-2dd286ee1c27	aa420673-c8ba-41da-9ee4-061022bb4a51	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	EXCELLENT	GREAT	f
b9f4aca7-42db-428b-b1ec-1f030b7df41d	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	f	\N	\N	f
6f867826-5e4f-47e6-b408-4941b2968a06	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	f	\N	\N	f
089d58aa-ec46-42bd-ae39-de885524808d	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	f	\N	\N	f
b798f820-c5b8-4912-a0cc-b5545394bc7c	720863b3-15b5-4928-b516-5a8ec0cee764	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	f	\N	\N	f
e84875c8-18fc-482e-a24f-6145957bff35	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	EXCELLENT	EXCELLENT	f
4ab98f33-1492-4161-a1d9-6ac0dadc27e6	350594d5-5cd4-4033-9294-6b50102afe7d	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	GOOD	GREAT	f
fd4ff0d1-56da-49f2-82af-7637dbd3f3d8	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	GOOD	GREAT	f
d02accc4-9a73-4490-9e58-e0dc977a77e4	24007058-ca39-4c69-9004-c3d29b441fb3	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	GREAT	GOOD	f
33be0dae-9a92-4bd2-86a3-5267e678c315	e2c637e8-f394-4a5a-926f-1f9888a7dc98	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	GOOD	GREAT	f
8f4ab2b3-0db7-46c9-921f-ef34095060bb	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	GOOD	GREAT	f
3ee78f5c-fa81-4bd6-86e8-89ebb8443f0d	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	EXCELLENT	EXCELLENT	f
4e7dd7cc-4677-43cb-b21c-09324887614f	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	GOOD	GREAT	f
4929bcb6-89e4-4599-987b-ce35e95489f0	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	GOOD	EXCELLENT	f
b87fa953-f71b-406c-af95-131a34cdca72	b05b035e-4867-40c1-965e-f60630bfa457	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	FAIR	GOOD	f
7c442b13-d925-4fc2-a700-d30b0cbfdd91	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	GOOD	GOOD	f
10413b96-f0fd-45c3-b500-f93a214bd9e2	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	GREAT	GREAT	f
dbfd3e0f-b18f-46d2-ae2e-c86274fb18b9	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	GOOD	GREAT	f
bfe06145-0a6f-4581-a0db-8c8f1782f6a2	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
d5ba26ac-c8f9-4745-a193-95b3308e104e	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
14c49914-522f-47e5-9f5f-32a1f4b18f37	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
cfec4176-a870-4e49-9898-d277fa022183	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
e1e11e83-0872-4ea2-b509-acefab9ef43c	a6eb654d-12a2-4350-a687-128314062791	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
ef12528f-1894-48e0-9de5-440709207d23	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
ca3bd143-ecf3-4f53-9685-277973224c00	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
38ec404f-2a32-4bfa-909a-1d9ae2dcf1cf	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	GOOD	GOOD	f
9150ffb8-bd12-406a-815b-8c9729782b99	f7aff351-6b9f-4caf-8717-5a611192f6d9	\N	4dde4440-0413-45ca-a645-8f0adf8d2622	t	GREAT	GREAT	f
5e061419-5cee-46c7-8d81-fa2ed3a96e05	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
baf2b2e1-cc43-4491-9eaa-0e5f7d42be0a	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
eb353ce6-ea63-4266-b99c-54c496aa2d09	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
c04c53e9-ee19-4558-a260-dd05b1208e0c	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
20c8b0eb-07a0-415f-8a07-5a4689895d16	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
31ddf99c-3415-464b-92e8-5cecfad1bb7a	8cc39180-992f-41be-88d7-d798fc88abe0	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
c9166b69-1d4b-4ee4-bda2-d970aa61e383	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
b951dd27-f6d6-4bba-becb-cac5e4bae214	789e18c3-638d-4651-be65-ec0a1661539f	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
f49fa313-16f0-4b47-9e2d-bccbb198c68d	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
d116c871-1e03-4eaa-bf74-e07f62adcd29	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
6d4cf930-dd75-4603-a697-074d8ca206a1	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
ec8753ce-61f6-4708-84ec-d783d71dbd59	25ba77b8-721c-4c32-b5c6-97ea194d2958	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
49b3a35c-34dc-493f-be4a-97dc7445446c	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
06af9275-23f5-4c89-8a05-c57afaba68a1	81f9f274-c50a-4b30-b0f5-15c1479b942c	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
fa7a9137-7e27-410f-bee1-cf72221b4946	eac386e1-ca07-42b6-9817-50f1d1081903	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
4016d787-be5a-4a68-89ac-aff7dbfd7941	b8bc48bb-2b86-415c-837f-dbad58dd3e2d	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
10fbca6d-24bc-4626-8d30-9861e05f50c6	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
b5b73490-ef32-4e89-98a8-a4188680edcb	49c4aeec-3a4e-4761-b3cf-2546381857f7	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
5a5a560b-0c84-4a45-a220-335f5afaba91	f96609c4-4c21-4b74-8523-f2c3b78d4c49	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
91dd9fd7-6fe4-46af-97c7-4f43407e3eaf	7b55eeb0-4468-4696-b2fd-a50a7e058ec5	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
b4ec5795-770f-418e-819b-fb7f16bc96f0	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
5525019e-221c-4b94-a034-bef519724a2e	c7a9dddd-29a9-4698-991f-ecab63cf6fd0	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
619dbdd2-6b16-4c81-8909-9d81dfa6de10	d04c2d81-ce92-4221-990a-64c5e1142ee9	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
5b19302f-f9db-438f-b6d9-83880341cef0	7c413b7f-9005-43a9-9b44-1984a23ae65f	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
841146f1-2fbd-4a47-b2f4-b29612b3ee1c	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
bd10327f-1baa-4935-8d47-e4bd79ef325b	f826618b-cee5-4d6c-bcde-27e7a74a0b63	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
03c5a2bd-b5ab-4251-964e-922e9da0d631	0d39a916-dd79-4bc8-b493-771b456ed8ce	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
dbbad924-b29a-4db9-860f-2c096ac2bdab	a2a3736c-4cbd-43f4-b8e4-8041a2b9d8f5	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
46d551c1-206d-4030-b585-576886c4198c	e25eac4b-ed6a-433b-b311-c27ea3f1faa4	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	f	\N	\N	f
e3b25a5c-cb10-4af9-8061-cfdae4204624	750d8c1e-30f2-49fc-a445-7acdb4bff78e	100% mukana	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	GREAT	f
b74d1cd4-0474-4fc3-86f5-a07f5c3df0ae	081d3462-484c-45f4-b7df-9eef1712d829	Hyvää maalivahdin työskentelyä!	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	EXCELLENT	f
4ebe021f-2a39-45a8-9a0c-631ddade4407	dc43f223-8b76-457a-b035-8b186320bdea	Mukana tänään tunnilla hienosti! Myös ryhmässä!	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	GREAT	f
fda04ffd-3f68-448d-b79b-62f74e95db34	213addc7-6d5d-4a39-95bf-ded6afa510a6	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	EXCELLENT	f
519f3e33-830b-40a0-86d0-0a3ac3dd2816	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	GREAT	f
58fc1047-3812-4229-87b1-09c3813260f1	74c83e0a-3e21-4c01-b18a-a81f7e089d64	100% mukana	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	EXCELLENT	f
860b4e5a-dbef-4540-8e14-cf931c779321	9f830199-bde9-43a4-84e9-986992a1e3d3	Tunnollista työskentelyä!	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	GREAT	f
6b74557c-1e03-45d3-8d63-cdf95589659c	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	Mahtavaa työskentelyä maalivahtina!	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	EXCELLENT	f
3a5db041-3ef6-49cd-aa64-881884f69dc7	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	Huippu osallistumista ja työskentelyä tunnilla! Kivaa käyttäytymistä muita kohtaan.	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	EXCELLENT	f
8e14d859-7b06-47aa-97fa-67b17dbb3232	2487435b-5598-4a44-bc31-f93ed8a2ec43	100% mukana! Myös puolustamassa ja sopimassa joukkueen asioita.	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	EXCELLENT	f
86f9c9ad-195f-4b40-abbf-67b6b3d5bc98	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	100% mukana! Tuo mukavaa rentoutta ryhmään omalla toiminnallaan.	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	EXCELLENT	f
e33a0e26-eeab-4744-b863-eca7cc0b2946	c4365db1-b405-4aac-ad56-4f21780797c0	Iloisesti mukana ryhmätoiminnassa.	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	EXCELLENT	f
6d2b6d01-8269-4242-84f8-36afbbe4f7e1	4454d03a-54da-4c2c-b931-b4b96ac0d81a	Osasi uida. 	8e8599bd-97ff-4679-839f-4d0a618177ea	t	GOOD	GREAT	f
dccec9f2-6865-4fdb-a8ba-19298880d197	7c159017-8908-4a89-bc0b-dadcb58a2d03	\N	8e8599bd-97ff-4679-839f-4d0a618177ea	t	FAIR	GOOD	f
d314e7c6-b51e-4715-b963-b413364fa7d0	7131bcea-6594-4433-be62-2dca8ffad861	Kroolasi	8e8599bd-97ff-4679-839f-4d0a618177ea	t	EXCELLENT	EXCELLENT	f
6ed4b00c-c76a-4eda-b2e7-826f9f3a1c88	4c658b14-0fce-4ca3-ac9a-42558969e0e2	Osasi uida selkäuintia	8e8599bd-97ff-4679-839f-4d0a618177ea	t	GREAT	GREAT	f
6c1f4f55-40ce-4b2a-85f3-2a4d48e0bd4b	d6b3db8b-50e7-4a6c-8ed2-2247a659a3a9	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
0bfcdf65-d3c4-498c-8b51-44a7832cbaf6	a17ec781-f403-45b7-b1a2-2ad88dc2038e	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
d5ba2287-c640-4eb1-a4bb-e292cea0730c	9ffd35f9-d869-4406-aa8c-cf60cbc47830	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
c8b712b7-cd47-4bb8-80ee-86a5891bda03	545958d4-a061-46c0-a58b-e814f2864886	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
d8ed6427-3ffb-4177-a833-ae90ca859516	f37fb196-de25-4ea8-a1ff-280491ef3865	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
4f659550-a4e5-4465-8fa2-0caa519efad6	7b45664d-caff-4e11-a717-7c3e2e1ed7f7	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	f	\N	\N	f
1db4d814-3cf2-4b9f-9f6a-76c5cfe0ee2d	803c9cfd-c665-452f-9cf4-1315a875fa0e	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
93c1636e-f585-4115-865b-d57c53ee4c42	34f18910-a0db-4e48-8129-8416b575d22b	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
0f30b4e9-553c-4cc5-b6d2-4a0ab8a2402d	e5570e54-941f-4e8b-b7de-f2dd3d7662e2	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
b500af98-8774-43ff-b3e8-9f17aab5defc	7f64f516-bdbd-490a-9d83-6625c9834929	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
4747e18d-7186-4c92-b2e0-f477e4bdc5d3	671ee4af-e36d-437d-b3ec-bee0179c96c4	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	f	\N	\N	f
e4a8a550-6e31-49ec-a7e9-73b6eab96619	165e6b48-6ffc-498b-a9c4-aac0d7a14fe2	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
bf6a5b66-4cd8-40fa-9cca-795d8daf3a25	bcdcfdce-bc43-43af-88b2-ce2f79d40da0	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
9c40a8ae-00a5-4ef9-839a-79e919717aa1	d21c58bf-a09d-4a2e-ab5f-131a3233f6ba	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
e0d7ff2f-b79f-4feb-b47c-8fcf0ef7c797	3a817706-c52d-4a77-8f87-68ef4514aef9	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
d46a3af2-4258-4e2d-8b39-e53f52ff6601	f2cd6a55-4291-4848-a66e-36d096f181c4	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	f	\N	\N	f
1f762e3d-cc56-4e28-866b-e4723510bdcd	7c3affe4-d2a3-4620-907f-abc411bd5534	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
0ddc5be6-ae49-4907-bcd9-0a73cbe2278a	8597552c-2527-4294-8a08-56d47b563b33	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
a0d4cff0-03f2-4aed-9064-d66de31e7ff0	d9dd649b-f9bf-4670-84ea-a102fc16cfcc	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
d2fa41d7-f39d-4060-811e-65f08e28fd8d	dc2469d2-1c1d-499c-bb3c-ff061b70307d	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
5a24b46a-1a5f-46e0-9a9b-77948b6f88f5	98160f96-0d06-40e7-9e12-1c1ad90442fd	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
23b43afd-e921-4567-bf57-fb10f46b73ff	f71a7e38-187d-4dfb-823d-f959158a971f	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
479e577b-b144-4e3e-acae-fe06b340d767	6bc63090-ea58-4189-b5d1-cba135d9da2b	\N	5ed7980d-fc19-430b-a7f1-985d0ac1eaac	t	\N	\N	f
f26d4727-ea77-486d-b80e-9374a2258e65	350594d5-5cd4-4033-9294-6b50102afe7d	\N	d3f9b80b-0d2f-4545-adeb-9483c6e86873	f	\N	\N	f
ba972788-4326-4901-9994-22bdadc02cd4	24007058-ca39-4c69-9004-c3d29b441fb3	\N	d3f9b80b-0d2f-4545-adeb-9483c6e86873	f	\N	\N	f
294649c4-c1e4-4e2a-9035-d45dad44f3f9	720863b3-15b5-4928-b516-5a8ec0cee764	\N	d3f9b80b-0d2f-4545-adeb-9483c6e86873	f	\N	\N	f
3c69f5f5-1b2b-49f2-86fe-8ae94cd16c78	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	d3f9b80b-0d2f-4545-adeb-9483c6e86873	f	\N	\N	f
0cbca064-f3f3-4f96-94bb-4b2741551355	b43981e9-6f50-4908-b225-1f5d5a70c68e	Levotonta osallistumista. Ei osallistu kaikkeen työskentelyyn aina, vaan jää taka-alalle vapaamatkustajaksi.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	EXCELLENT	GOOD	f
585b9c92-003c-467d-93ce-aab124eaf371	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	GOOD	GOOD	f
1755fe2a-c8a7-483c-9fb1-c57997956350	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	Hieno työskentelyä ja osallistumista toimintaan.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	EXCELLENT	GREAT	f
ce8446a5-aa71-4abd-9116-2b6d5fe56612	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Tänään oli työskentely parempaa kuin monena muuna kertana!	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	GOOD	GOOD	f
4c53eebd-d855-41fa-8319-59a0cd9ce6a9	67c02902-d7e2-47e1-abef-9d1ae14a3da5	Ei mukana alun jalkapallossa. Kavereiden kanssa seisoskelua. Puhelimen käyttöä tunnin aikana.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	GOOD	GOOD	f
37e1515d-0eac-4b3f-ac3d-c810f1fe8c9f	2dd7377d-323a-4e73-9a14-5962ec2b8a58	Taitavaa palloilua molemmissa peleissä. Mukana toiminnassa turvallisesti.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	GREAT	GREAT	f
84a00aae-93f4-4a75-ab68-b380e5d4db8a	d07f9606-ddee-4f35-8d35-b8358dc9fc75	Hieno työskentelyä. Rohkeasti mukana palloilussa ja yrittämässä maaleja.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	GOOD	GREAT	f
60e69c22-5c6c-4751-b8fc-2709b006b2fb	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	GREAT	GREAT	f
15154515-eeed-4ab0-89a6-2141d4b30620	5fd1effd-1670-4a40-bfaf-75a2a048fc91	Taitavaa tunteiden sanoittamista. "Huono päivä" mutta silti kaikessa mukana kunnolla.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	GREAT	EXCELLENT	f
dd7ca5dc-302b-4d9b-a657-52c6743d7a95	b05b035e-4867-40c1-965e-f60630bfa457	\N	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	GOOD	GOOD	f
032a12f7-2b75-45cf-a522-b9c570e2d296	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	Työskentelyssä parannettavaa. Omia joukkuelaisia mukaan peliin.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	EXCELLENT	GOOD	f
3b7de4fe-6e47-4a10-992b-2d86b2689d2a	af758be6-0adc-4e32-8543-f65f6c48fd2b	Omissa oloissa. Vaikeuksia kuunnella ohjeita ja työskennellä muiden kanssa.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	GOOD	GOOD	f
e427f908-fc5d-411a-ad9f-ff28a7b5fe80	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	Omissa oloissa. Vaikeuksia kuunnella ohjeita ja työskennellä muiden kanssa.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	GOOD	GOOD	f
3bad72e2-eda5-44a9-a524-4011fa14214b	9c66fa7f-c08f-4905-9c54-5da739156493	\N	c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	f	\N	\N	f
25184522-5585-4960-8a62-a058937608c7	28426aca-f675-46f7-bafc-dc5f7eb649c5	\N	c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	t	EXCELLENT	EXCELLENT	t
d2cf5557-aaac-41cf-a827-6a3f3219b061	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	t	EXCELLENT	GREAT	f
7566285e-15f4-4c37-aa48-8a0d2e81c732	251b27c1-5684-424b-b17b-7257a311bd33	\N	c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	t	GREAT	EXCELLENT	f
a139ad54-a5c7-43a7-b78d-24aaf3508ef5	f6705543-53b3-419c-9a54-c23cd0c8525b	Tunnollistaja hyvää työskentelyä opettajana.	c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	t	EXCELLENT	EXCELLENT	f
71994ea3-46fb-47be-adc6-cb414bfe0ef8	b8a8e21b-2e09-4855-a354-0c48800913c9	Tunnollistaja hyvää työskentelyä opettajana.	c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	t	GREAT	EXCELLENT	f
15c60c3c-d7c5-43d9-b42b-e859a7304ec1	04629d10-42df-4873-bb8e-a38230d93b8a	\N	c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	t	EXCELLENT	EXCELLENT	f
7e894113-7b87-4cc6-84ee-c3b5fd62d9ca	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	eb6afa70-0356-4ff7-8f48-b8ce7abc8ae1	t	GOOD	GREAT	t
7b0b3cc2-37a5-4aa0-af8c-aab690efd562	b25c03f9-3bec-48f9-a045-c78745703bf7	\N	4dde4440-0413-45ca-a645-8f0adf8d2622	t	FAIR	GOOD	f
226406d3-e9f3-46d1-b44f-af153084efbf	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	eb6afa70-0356-4ff7-8f48-b8ce7abc8ae1	t	GOOD	FAIR	f
970d999a-9d69-4cf4-8ebd-d4b9fe86124f	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	6e21af79-6985-460d-852a-9efda75bcd5f	t	FAIR	GOOD	f
ed7f376a-f0a1-4bc7-8b48-3bef0eaff1e3	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	6e21af79-6985-460d-852a-9efda75bcd5f	t	GREAT	GREAT	t
2450e868-6285-4786-a430-2b8aa0812361	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	6e21af79-6985-460d-852a-9efda75bcd5f	t	FAIR	FAIR	f
2fc91c1f-ac47-457b-abb4-b19426508c89	7cb540a6-c01f-42c7-a0e2-099d290c0b6a	\N	4dde4440-0413-45ca-a645-8f0adf8d2622	t	EXCELLENT	EXCELLENT	f
8a256f12-ca1f-45ba-beeb-7fbdc9ca61e9	d989226b-aa7a-4dd9-a34c-6bf06ae4a429	\N	4dde4440-0413-45ca-a645-8f0adf8d2622	t	GOOD	FAIR	f
4f841396-3860-40de-b531-c59869640f41	a17ec781-f403-45b7-b1a2-2ad88dc2038e	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	GOOD	FAIR	f
ad0de238-7aba-4d05-8a5d-967823eaec05	9ffd35f9-d869-4406-aa8c-cf60cbc47830	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	GOOD	GREAT	f
452fc0fe-826e-4c12-95f4-736cb501d41d	f37fb196-de25-4ea8-a1ff-280491ef3865	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
3d58044d-2323-489d-bedc-ecc53b621667	7b45664d-caff-4e11-a717-7c3e2e1ed7f7	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
e33ec7b4-aa7d-4e71-bb88-f41104410ddd	803c9cfd-c665-452f-9cf4-1315a875fa0e	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
fed3efbf-058f-45c2-8d4f-817c4d5f1ebb	34f18910-a0db-4e48-8129-8416b575d22b	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
fa64442d-23e8-42d2-85b2-3e6115207ac1	e5570e54-941f-4e8b-b7de-f2dd3d7662e2	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
c98e528a-44fc-45a4-985a-3b6b6440f4a3	7f64f516-bdbd-490a-9d83-6625c9834929	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
fc853459-5b50-494e-9bf2-0383cfe1e31f	165e6b48-6ffc-498b-a9c4-aac0d7a14fe2	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
d0fa3c84-e796-4dda-bff2-299c27ad2239	bcdcfdce-bc43-43af-88b2-ce2f79d40da0	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
de89d274-a7ae-4200-bbf5-e12d7c7d96f8	d21c58bf-a09d-4a2e-ab5f-131a3233f6ba	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
4ebe6f26-0491-48a9-a370-09e6cc8c5f92	3a817706-c52d-4a77-8f87-68ef4514aef9	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
e9abca0d-2f59-43c5-8dfe-7e2b131ec3a1	7c3affe4-d2a3-4620-907f-abc411bd5534	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
3cdb1123-8e29-452c-bfe3-ee49021fcc7b	8597552c-2527-4294-8a08-56d47b563b33	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
6eb1bf8e-237e-4468-a8e3-772891f63e7d	dc2469d2-1c1d-499c-bb3c-ff061b70307d	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
a8bf4211-3916-49a3-ade5-7ff0092e8cc0	98160f96-0d06-40e7-9e12-1c1ad90442fd	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
b73efdea-204d-414d-8277-0e740bac584a	f71a7e38-187d-4dfb-823d-f959158a971f	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
f2f890b8-b8d7-491b-aaca-ff1a39dc61e6	6bc63090-ea58-4189-b5d1-cba135d9da2b	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	\N	\N	f
97746bc7-e524-4419-b27b-e99e2ac7393f	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti osallistui luontojoogaan aktiivisesti ja nautti rannan tunnelmasta. Hän auttoi muita osallistujia tarvittaessa ja piti hyvää ilmapiiriä yllä.	0928afc3-d50e-4222-9adc-71d1c8dc4593	t	GOOD	EXCELLENT	f
bbab1ff7-f132-4198-8b00-d71ebb8fc525	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa nautti retkeilystä metsässä ja käveli reippaasti koko 10 kilometrin lenkin. Hän ihasteli luontoa ja otti valokuvia matkan varrella.	7301039b-e03e-4faf-a594-45c33f925021	t	GREAT	GREAT	t
56a1cab9-72d1-4a0c-8d07-fc3f1bc82bc0	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo harjoitteli kuntoilua puistossa. Hän teki erilaisia lihaskunto- ja venyttelyliikkeitä puiston penkeillä ja portailla, mutta tarvitsi vielä harjoitusta tietyissä liikkeissä.	a8c5e1fb-bb1a-4811-9b48-6faa29f4f619	t	FAIR	GOOD	f
bc64da23-8c7e-4b7d-a0d3-e1b9dfc22d3c	7131bcea-6594-4433-be62-2dca8ffad861	\N	ca0b4bb1-c094-42a5-b45f-2a1c02c4fe65	f	\N	\N	f
56b4c52c-dd32-4771-a7a8-3d2f9c8cea8e	4454d03a-54da-4c2c-b931-b4b96ac0d81a	\N	ca0b4bb1-c094-42a5-b45f-2a1c02c4fe65	t	GOOD	GREAT	f
401cb205-9a76-43be-8449-b94c20c4c715	4c658b14-0fce-4ca3-ac9a-42558969e0e2	\N	ca0b4bb1-c094-42a5-b45f-2a1c02c4fe65	t	GOOD	EXCELLENT	f
410786ab-f9cd-41de-a850-ed1cbdf2a942	7c159017-8908-4a89-bc0b-dadcb58a2d03	\N	ca0b4bb1-c094-42a5-b45f-2a1c02c4fe65	t	GREAT	GOOD	f
60f57c2d-19c3-4ae8-ae47-2908ced6fedb	350594d5-5cd4-4033-9294-6b50102afe7d	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	f	\N	\N	f
31d03346-3ae1-47f7-b06d-b96a76c353b4	24007058-ca39-4c69-9004-c3d29b441fb3	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	f	\N	\N	f
bd00ae05-2c99-4f78-92bf-61fe10c903f3	720863b3-15b5-4928-b516-5a8ec0cee764	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	f	\N	\N	f
218ada56-0f09-4d2b-9964-c2812d77dbc7	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	GREAT	GREAT	f
f33110b0-6505-4ff4-8fa8-371c399c43c9	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	GREAT	GOOD	f
a32d2a4e-2db7-4309-8ee9-c63455cd8053	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	GREAT	GREAT	f
d8e41a25-8c46-4f69-b4e9-3b1c336ec762	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Taas hienoa työskentelyä ja mukana olemista!	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	GOOD	GREAT	f
0c1b7fab-6693-474e-b8df-310c40ef1c87	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	GREAT	GREAT	f
326d1f17-145a-4736-a7e8-1e7ef327fafd	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	GREAT	GREAT	f
8cfe1ad7-da89-4f5a-b875-97a827584920	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	GOOD	GREAT	f
a0d9bf10-3579-4d60-bb94-c6287c3d2cec	9bdfa82d-13bd-40be-9a9b-a57c2a072351	Mahdollisuus ottaa isompaakin roolia tunnilla.	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	GREAT	GREAT	f
faa0c3c9-8ef1-4d36-90c2-5f1a1c8f995d	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	GREAT	GREAT	f
cfa6b527-29af-498d-8dcb-4603f540eb33	b05b035e-4867-40c1-965e-f60630bfa457	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	GOOD	GOOD	f
d0e2dbfb-6868-4393-b299-d9870c816687	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	GREAT	GREAT	f
bc50fd4e-1ac1-4c15-80ae-b395f2e19983	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	FAIR	GOOD	f
876a071b-b976-43d0-a653-1e486be9c00f	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	GREAT	GREAT	f
fcbd79b6-e694-43f0-ad0d-dd6406d60c1b	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	GOOD	GOOD	f
0dfd6579-5d9c-4021-9257-9eb050baef7a	f198a966-c599-4457-ab33-bc075adefadf	\N	4dde4440-0413-45ca-a645-8f0adf8d2622	t	GREAT	GOOD	f
654ffd48-d96f-4f37-994b-c7072f1f64bc	74e88236-472e-41ea-9475-73c94489ae2e	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	f	\N	\N	f
7d8b19e1-cf97-4fb3-9843-c6995a8cb24f	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	f	\N	\N	f
d4cee8aa-96ba-4517-a6ca-4c8ef2a6b621	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	f	\N	\N	f
d313b3e2-a13c-4036-b278-a5b0bf71c4d5	404347be-f571-4254-b055-a06e9a9962f9	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	EXCELLENT	EXCELLENT	f
2fd4e83f-0291-4b86-a7b7-5dc9bddfe442	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	EXCELLENT	EXCELLENT	f
ea9f9ae4-139c-4f9d-9b75-9464407d0927	799b59e5-c962-4f19-9f9d-01518c57a550	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	EXCELLENT	GREAT	f
6bcd24be-811e-4fde-bac5-42b1c1829540	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	GOOD	GOOD	f
e3568877-36b7-46ac-8330-fbeb4b251adf	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	GREAT	GREAT	f
320df30c-36c5-442a-8c79-7b15856aa8d2	2e03b196-3248-4f14-9f2d-4661e503665d	Poissa	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	\N	\N	f
db696199-e1a6-4951-8267-85f18511bc6f	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	GREAT	GREAT	f
3d9958a6-58c0-4c03-b1f9-009574846039	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	GREAT	GREAT	f
09a024e0-b87b-4b7b-8dfc-0a55f4950ec5	b9266745-39ba-4be3-b1a1-421801b79832	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	GREAT	GREAT	f
fa6da169-14ab-49bf-ae05-114db345112f	686241e9-7a4e-4eb6-bc99-26699999001b	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	GREAT	GREAT	f
3a8381f3-337c-4270-8d3f-f5bfe44c31bc	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	GREAT	GREAT	f
c672a56f-0747-479e-9ac7-d82a74153e14	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	GREAT	GREAT	f
c73fc367-dffb-4562-8c95-aa5d3d8eb848	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	GOOD	GREAT	f
f4e49098-5dab-4c81-98f0-2bed180fd89b	1e2db5dd-c171-460e-bf48-4bc55f04f49e	Jonkun verran päälle puhumista ja härväämistä.	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	GREAT	GOOD	f
331f9ad4-8ed2-46a7-8021-d90b3639266e	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	GREAT	GREAT	f
1ae62aac-4b34-4b48-a8ec-adf883b2a6c9	6743208b-a2b7-4951-9d65-602313f52be8	\N	4dde4440-0413-45ca-a645-8f0adf8d2622	t	\N	\N	f
f46cf7e8-7eca-4f3c-af5e-17ea4e77bd2a	2a397255-ca16-43dc-b47e-a977a917f032	\N	4dde4440-0413-45ca-a645-8f0adf8d2622	t	EXCELLENT	EXCELLENT	f
bb5e9630-dec5-4419-8e11-d209e764fac5	5387fbeb-b1bf-44b0-b87f-6bfba4e12996	oli aika levoton	448295e4-1d25-49ac-80fe-8d2a6a4eab5b	t	GREAT	EXCELLENT	f
9b63fba2-d078-46db-b15b-7627718f403c	82b08073-2503-4e40-b381-9f4c0987aa37	hyvä	448295e4-1d25-49ac-80fe-8d2a6a4eab5b	t	GOOD	EXCELLENT	f
1450cddb-d555-43e9-8cea-e832ecb1b90a	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti ui hyvin ja jaksoi treenata koko harjoituksen ajan. Hän piti tauot sopivissa väleissä ja oli ystävällinen muille uimareille.	3b32ba2c-8635-438b-a1b3-015d980e0846	t	GOOD	GOOD	f
b7db3a94-6d36-46e0-9925-0a780bab0f3a	4c047cf3-edbb-4aa0-b879-cd84077a8257	\N	897dbbdb-d0ed-4270-8ce4-8c34c3d21c8e	f	\N	\N	f
f77a61ec-9029-492e-aee2-40c2b9fc383b	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo harjoitteli voimistelua ja kokeili erilaisia akrobaattisia liikkeitä. Hän ei onnistunut kaikissa liikkeissä heti, mutta oli sisukas ja yritti uudelleen kunnes onnistui.	48b97ca2-cc28-4f63-a14b-26fb8422ff2f	t	GOOD	GREAT	f
16769f99-9306-4173-b196-64d7a3acbc9f	b7b0fe22-b844-4a04-a292-3f2489f62118	\N	448295e4-1d25-49ac-80fe-8d2a6a4eab5b	f	\N	\N	f
f80f5d1b-9fbe-4714-822f-6d8eaec2ce6e	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	f	\N	\N	f
9a171c5f-1391-47d1-b651-c5c9c7cfd928	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	f	\N	\N	f
53e9e37e-9d7a-4ceb-a541-2db55eb5b868	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	f	\N	\N	f
9fae15bf-e9ca-482b-8235-11b4eafb3ba8	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	GOOD	GOOD	f
29f8b58a-b5c9-4075-8bfa-5b4cec96bd59	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	EXCELLENT	GREAT	f
9460c858-88ed-47ff-b3de-245284bf7f9c	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	GOOD	FAIR	f
6e11390b-86a3-42ce-bf86-0efb9aea84de	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	GOOD	GOOD	f
4f2f1fbf-10da-4b80-9daa-206fef13c87e	a6eb654d-12a2-4350-a687-128314062791	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	GREAT	GOOD	f
420ecae3-1eed-4c88-9a61-f18414a33871	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	GREAT	FAIR	f
b3101e31-5f91-4f07-ae44-b2af76e5a60a	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	EXCELLENT	GREAT	f
59f5e68c-a1ae-418c-a734-ea55f22c738d	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	GREAT	GOOD	f
c03aebc8-5f87-4349-ad63-2dac0aaf29ae	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	\N	GOOD	f
cb384dce-d3bd-4f55-a68a-67c3846f7f62	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	GOOD	GREAT	f
f93d115c-613e-426c-9c63-253a6c3419d0	8cc39180-992f-41be-88d7-d798fc88abe0	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	FAIR	GOOD	f
dea63bfb-29d8-43c2-946b-91b47eae9f05	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	GOOD	GREAT	f
82984ba1-6911-4a34-8d42-837e42a32556	789e18c3-638d-4651-be65-ec0a1661539f	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	GOOD	FAIR	f
a32a5b0a-f953-4520-8202-bab496d92ca6	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	GREAT	FAIR	f
c82db5c7-d513-4411-8174-1b6d084dbe7c	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	GOOD	GREAT	f
85a693b1-36ec-48dd-a458-30b3e1d24855	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	GOOD	GREAT	f
26678c3e-0cb4-4784-9706-03ba3b2c22a7	686241e9-7a4e-4eb6-bc99-26699999001b	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	f	\N	\N	f
2a989ab8-20ab-4a02-a6fa-ad75a4ae0bbc	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	f	\N	\N	f
3f381db7-d81a-4d4b-9bec-b649310cf35e	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	f	\N	\N	f
82d32c5a-1ed8-4263-96d9-a6018e0bb6ca	404347be-f571-4254-b055-a06e9a9962f9	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	GREAT	f
6dcfa1b5-c8c7-4d5e-96f9-463d27dcb08d	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	GREAT	f
4c4e2e8e-7805-4cb3-ab22-c074b1b15530	799b59e5-c962-4f19-9f9d-01518c57a550	Löi palloa kovaa ja yläkautta. Vaikeutti pallottelua ryhmässä.	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	GOOD	f
de3dacf8-0f0d-4e0e-ae13-45adca6016ec	046a3d24-b93f-44d1-ae1b-aa628e141bae	Kiukuttelua. Tennis oli kuulemma perseestä.	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	FAIR	f
5582326e-076c-411c-943c-efbc2f8e7497	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	GOOD	f
2a462a92-593c-4d7a-bfc5-7e915f811721	2e03b196-3248-4f14-9f2d-4661e503665d	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	GOOD	f
3270168a-6326-4222-a7d6-e3f778c36ce0	74e88236-472e-41ea-9475-73c94489ae2e	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	GREAT	f
9077d3bc-6f36-4794-ad31-c176fb84a80e	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	GOOD	f
83814989-febd-4b89-8685-70bf16f0a535	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	GREAT	f
ea21cdcf-bc0d-4a25-9be5-49d5ddfc4d0f	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	GREAT	f
2ed2d92a-853b-4e2b-a75a-08fe8d6f96b0	b9266745-39ba-4be3-b1a1-421801b79832	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	GREAT	f
a7e64133-b44f-4d08-a4e0-ad74a50e8b82	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	GREAT	f
1986d9aa-9c67-431c-8b05-0f559a25c252	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	GOOD	f
ee47a48e-704b-4d17-8ce0-b9599d11d4fd	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	GOOD	f
0f1038c3-9f5a-4263-b944-d45a742965fa	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	Kiroilua ja ikävää kielenkäyttöä	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	GOOD	f
a0893e68-b5c5-4df6-9a9e-f7162ce3a8bd	4fa0db05-161f-4165-b00c-52528866490c	Loit omalla toiminnallasi positiivisen ilmapiiril tanssitunneilla	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	GOOD	EXCELLENT	t
cb123c29-abf6-498e-bae3-349839d7414e	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	f	\N	\N	f
0915d157-feb8-4321-9557-fa3e5e73275a	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	f	\N	\N	f
6ccbef70-1a81-402e-964c-138c9314ff2d	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	f	\N	\N	f
dd1e912d-4ada-4ec7-8968-635686a35236	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	Työskentelit voimistelussa hienosti eri välineillä	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	GOOD	GREAT	f
9c3e23ea-fe88-4cbb-bc27-67047c58cd3d	4fa0db05-161f-4165-b00c-52528866490c	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	GREAT	GREAT	f
9938ca3e-5a27-4688-95fe-ab15eb25115f	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	GOOD	GREAT	f
c89771d3-9eaa-416d-a9c7-f48879b18204	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	GREAT	GREAT	f
385db013-ecda-40b8-a080-e7574e32314a	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	GOOD	GREAT	f
50e8dff6-4012-4bce-8ecc-b66248be5df7	a6eb654d-12a2-4350-a687-128314062791	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	FAIR	GOOD	f
e4783357-2c33-4e94-a34d-0e8ee5ed228b	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	GOOD	FAIR	f
d8aa06ee-7294-4cd7-ab3b-010f8933ac68	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	GOOD	GREAT	f
7583b463-14b5-4807-b4e6-18c91f0b1f1f	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	EXCELLENT	EXCELLENT	t
62937940-fd4e-42e4-aeb7-88c256324141	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	EXCELLENT	GOOD	f
4e141645-1a57-44f2-acce-0311c9a687dc	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	GREAT	GOOD	f
ba6134d5-734f-47aa-be90-1dc0d4a42f4e	8cc39180-992f-41be-88d7-d798fc88abe0	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	GOOD	GREAT	f
e594c9ac-118d-44d9-8074-ce0f6f563b6d	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	FAIR	FAIR	f
4c48d399-e793-438e-a740-48477d3123ae	789e18c3-638d-4651-be65-ec0a1661539f	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	FAIR	FAIR	f
27e5b8de-3e91-442f-a213-6b5d0f7dc25f	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	FAIR	GREAT	f
c0f48c02-ad3b-4fef-bb97-a7895f891dec	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	EXCELLENT	GOOD	f
e7b462d2-2f2e-404e-812b-5f3ec3d13f84	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	FAIR	POOR	f
829003c7-db00-4bbb-acca-1ec2d5a0218e	28426aca-f675-46f7-bafc-dc5f7eb649c5	\N	0f675408-4e6d-4d94-b2be-4b1861874f24	t	EXCELLENT	EXCELLENT	f
f1f4aabd-5c34-4b0c-8c10-07acce19d73a	251b27c1-5684-424b-b17b-7257a311bd33	\N	0f675408-4e6d-4d94-b2be-4b1861874f24	t	GOOD	EXCELLENT	f
35fc71ec-e8a0-4d9e-bae5-959f9c3d833b	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	0f675408-4e6d-4d94-b2be-4b1861874f24	t	GREAT	EXCELLENT	f
d529e7d6-91fc-4e05-b395-0c4953fcdd2d	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	0f675408-4e6d-4d94-b2be-4b1861874f24	t	GOOD	EXCELLENT	f
ad763ade-e682-4b93-b274-1021d67aba2b	9c66fa7f-c08f-4905-9c54-5da739156493	\N	0f675408-4e6d-4d94-b2be-4b1861874f24	t	GREAT	EXCELLENT	f
f93ca2bb-255b-434e-a8d4-40e677068cef	04629d10-42df-4873-bb8e-a38230d93b8a	\N	0f675408-4e6d-4d94-b2be-4b1861874f24	t	EXCELLENT	EXCELLENT	f
fcca9c17-ea47-4faf-b921-0c830d32750c	b8a8e21b-2e09-4855-a354-0c48800913c9	\N	0f675408-4e6d-4d94-b2be-4b1861874f24	t	GREAT	EXCELLENT	f
307f7c68-2142-410b-831b-1fe86480506c	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	f	\N	\N	f
9e222d75-ce8c-434e-8448-034acc422899	a6eb654d-12a2-4350-a687-128314062791	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	f	\N	\N	f
7d6b0c68-8cf6-4062-9518-10aadbf67781	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	f	\N	\N	f
f3526e16-7c51-4125-9f4e-a84a20c3b0b6	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	f	\N	\N	f
817b6eee-702a-405a-85f0-a98ba5443995	4fa0db05-161f-4165-b00c-52528866490c	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	EXCELLENT	GOOD	f
4f23649d-e9f9-4549-8a47-fac4a0b903c9	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	FAIR	GOOD	f
4b20ff7e-ca29-4a43-a4a6-1358a3018999	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	FAIR	FAIR	f
38e9ab39-45c6-480e-81b3-c6aaff3cb9ec	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	GREAT	GOOD	f
513af6ab-6751-4883-8855-999522b80569	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	EXCELLENT	GOOD	f
2dcbc300-af30-4b5c-b88e-737c79964f19	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	EXCELLENT	EXCELLENT	t
0d13f824-f9f6-4e69-a789-61bd1c7eec68	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	GOOD	GREAT	f
199203a4-c880-4a04-b480-1fd786e9a062	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	FAIR	GOOD	f
e87fa2c6-d90b-4857-803f-80775a809fa4	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	GREAT	GOOD	f
55504e23-ee5f-4667-8f19-9c99af6c54e0	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	GOOD	GREAT	f
6b45952d-132e-4499-b8aa-f8cf509ecc47	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	EXCELLENT	EXCELLENT	f
e4881005-9cbe-4aaa-a9bc-ab2f517d611d	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	GOOD	GREAT	f
a9423bef-311b-4329-8775-883df3ee7e07	8cc39180-992f-41be-88d7-d798fc88abe0	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	GOOD	GREAT	f
a84722cd-3bab-4b3a-9157-3b862ad0b37a	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	GREAT	GOOD	f
293a5ac7-fc8e-4e46-a7ba-b49597652b0e	789e18c3-638d-4651-be65-ec0a1661539f	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	FAIR	GOOD	f
4d00807d-a7ca-45ce-9513-c063f49ab1ba	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	GOOD	GOOD	f
7b5d4203-099e-462c-9ff1-9fc02066ed68	4fa0db05-161f-4165-b00c-52528866490c	Vahvuutesi pääsee esiin palloilu tunnilla	80f640f0-d041-41f1-9817-6c18f415a068	t	EXCELLENT	GREAT	f
5d93fe13-309a-444a-bc26-f8f1becf6b1a	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matilla meni tosi hyvin tänään. Maila pysyi kädessä ja tekniikka oli kunnossa. Matti kannusti myös toisia mukaan pelaamaan	87721bf9-2237-4429-9e23-587ae97d05c1	t	GOOD	GREAT	f
fae60611-97db-409b-8672-03937db269ef	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa treenasi perusvoimistelutreeniä ahkerasti, mutta tarvitsi apua muutamissa liikkeissä. Hän kuunteli ohjeita ja pyrki parantamaan suoritustaan.	b1876b9c-23cd-46d2-aa93-b7980fbca7a2	t	FAIR	GOOD	t
67cabdd3-f315-48fd-9232-ebbd2520e576	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo harjoitteli perusvoimistelua voimistelusalilla. Hän teki erilaisia liikkeitä ja hyppyjä, mutta tarvitsi vielä harjoitusta tasapainonsa säilyttämisessä. Hän yritti parhaansa ja kuunteli ohjaajan neuvoja.	b1876b9c-23cd-46d2-aa93-b7980fbca7a2	t	FAIR	GOOD	f
f0d42430-86f6-49b3-acf1-ab817034c524	4c047cf3-edbb-4aa0-b879-cd84077a8257	\N	4e2afd6f-5320-419c-bd50-314fcddaee44	t	\N	\N	f
cc1c86c6-ff39-4682-aef2-789a39892ea2	75bba92f-9f9c-47c0-a89a-2add75007cf6	\N	4e2afd6f-5320-419c-bd50-314fcddaee44	t	\N	\N	f
985f1805-244d-484e-b217-c5faac038b13	a520a370-e1ec-4742-bcf8-1a34a4434485	\N	4e2afd6f-5320-419c-bd50-314fcddaee44	t	\N	\N	f
40d00d17-4449-4e24-9cbe-187d7cfcd6cd	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
4c811929-b619-48a9-a9e3-c315f4cda34e	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
921405d3-5000-43b7-b494-527d2b1be4d1	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
91ebf3d6-29a8-4465-acd0-0ffc8cbebccd	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
3057724d-23a5-4701-a408-880bfd818afe	a6eb654d-12a2-4350-a687-128314062791	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
d9ee8007-8061-43db-b096-a42fe9d75ab9	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
83e69d95-62a1-4bb2-b249-55419b530cba	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
72ecf289-a1eb-4ac4-b62d-4e4f8614a1b5	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
b871a0c3-8105-4254-bb1f-d09360eabc18	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
8adde8c1-2aa5-4a96-be81-501a27128649	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
d60cb0bd-aa07-4db5-aa77-0a85f6162bf7	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
5cb472ec-2db8-4ce7-ba81-f7c6d47e1be9	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
ad9f4386-6ed8-4054-ae1f-1fb965e59770	8cc39180-992f-41be-88d7-d798fc88abe0	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
bfbfa2b8-fa99-45a0-9666-2443602193d3	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
c06842a5-1ede-49fb-bce7-f3905b328ea5	789e18c3-638d-4651-be65-ec0a1661539f	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
ec159717-1f22-4fca-b0b5-7389f2728592	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
5e4e70c8-caca-4f74-ab90-0b3ba9ffa6bb	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
104ed9f4-0d0b-4ce3-9969-1d7a551a7654	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	\N	\N	f
29be1446-9a9f-4962-9291-0f220e10bb1c	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	GREAT	FAIR	f
2df23eef-ed67-4b0d-a780-4608e5e5796c	4fa0db05-161f-4165-b00c-52528866490c	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	GREAT	EXCELLENT	f
1fd339cf-b754-4ccf-b3c1-e18043272221	4fa0db05-161f-4165-b00c-52528866490c	Oli ilo nähdä miten kannustit ja tsemppasit muita	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GREAT	EXCELLENT	f
181f5af1-3eb4-4175-ae06-775799e6db73	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GREAT	GREAT	f
6ee42969-23e1-4a56-805c-420c3d13a858	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GREAT	GOOD	f
c8d0404c-ba9a-44aa-b859-2c5798aaa89d	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GREAT	GOOD	f
16c313b0-3df4-45c6-870c-e9ae48e42b1d	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GREAT	EXCELLENT	f
1a6d8c3b-0177-4990-90c8-3e556e0771ad	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	EXCELLENT	GREAT	f
60515f8a-cbb1-43fa-be73-d36b6cb16946	a6eb654d-12a2-4350-a687-128314062791	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GREAT	EXCELLENT	f
3199eb4c-ff35-4afc-8300-25c23bf5656a	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GOOD	GREAT	f
95b8a2dc-e90e-47b5-adbe-4626f78aa716	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GOOD	FAIR	f
84994046-b2a5-473d-8c6e-eeef9c73fa16	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	EXCELLENT	GOOD	f
dca89a9e-6bfb-43a7-9737-2eb19a9d2389	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GREAT	GREAT	f
177d6522-0c93-48cd-b458-96363ad92a91	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GOOD	EXCELLENT	f
15f58eb0-cbc7-4475-b66c-1a1751db7fbb	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GOOD	GREAT	f
313e260d-ef83-4c3c-801f-d8051a9138a4	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	EXCELLENT	GOOD	f
f811ac82-7e0d-469e-ba5d-ae099d1b96fd	8cc39180-992f-41be-88d7-d798fc88abe0	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GREAT	GOOD	f
1130536d-414c-445a-be9d-77d19a0cf147	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	FAIR	GOOD	f
b9d679fb-e09b-4bf4-a6f7-348f8b996b08	789e18c3-638d-4651-be65-ec0a1661539f	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GOOD	GOOD	f
190f2581-69bc-44b3-b7a3-6c8d7ab3a984	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GREAT	GOOD	f
15332c53-64af-4472-ab03-7eb686a542fd	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	FAIR	GOOD	f
3b1257a9-1fb5-4d7c-91b3-b2e8bdf34670	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	GREAT	GOOD	f
6dd34792-8f45-4318-8e90-a49338d5c053	404347be-f571-4254-b055-a06e9a9962f9	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	GREAT	f
7d329c7d-393b-40de-9db3-be0df66263d6	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	Hyvä tsemppaus taidon harjoittelussa. Jaksoi yrittää ja kuunnella ohjeit.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	GREAT	t
8a53aff9-c341-4137-8466-8c20c1d0f8d3	799b59e5-c962-4f19-9f9d-01518c57a550	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	EXCELLENT	f
12433dd2-2c34-4895-b6c5-20a175a24e5c	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	Hienosti mukana frisbeegolffin pelaamisessa. Turvallista toimintaa tunnilla.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	GREAT	f
ef391480-5101-40af-ad08-9d3d25ed832b	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	Aktiivista osallistumista tunnilla.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	GREAT	f
88d8ae4f-947a-4745-bff8-6b59a20acebb	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti osallistui vesijumppaan innokkaasti, mutta hänellä oli vaikeuksia joissakin liikkeissä. Hän ei kuitenkaan lannistunut ja yritti parhaansa.	9e17426f-5a97-4d62-bca8-25a9312e1367	t	FAIR	GOOD	f
069441fa-044d-4361-87d5-cc9f698b9a11	4c047cf3-edbb-4aa0-b879-cd84077a8257	Uintitreeni ei sujunut parhaalla mahdollisella tavalla. Liisa ei ollut kovin motivoitunut ja hänen tekniikkansa kaipasi parannusta.	3b32ba2c-8635-438b-a1b3-015d980e0846	t	POOR	FAIR	f
a9bec995-c326-41b9-8ac5-de637ab4b727	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo pelasi pallopeliä hiekkakentällä ja kokeili beach tennistä. Vaikka laji oli uusi hänelle, hän oppi nopeasti ja kannusti muita pelaajia. Tunnelma oli innostunut ja hauska.	c0076c27-405b-4dcc-a944-323b279d0986	t	GOOD	EXCELLENT	f
6c5a0f9d-141f-4e9b-9806-6054f1fc798c	404347be-f571-4254-b055-a06e9a9962f9	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
a3321da9-b510-463e-9ab8-dc079decd2b1	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
02222f2a-248f-4634-b263-cb642ce5c531	799b59e5-c962-4f19-9f9d-01518c57a550	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
4b358baa-6e00-4f31-a4c0-13d364456fe8	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
b6841abc-cc3d-42dc-9f8b-5fddb125f49e	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
8afbf777-b998-4671-ad3a-46251a58db50	74e88236-472e-41ea-9475-73c94489ae2e	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	f	\N	\N	f
a49de4aa-b1f6-44b9-a777-7c16f34b27b8	2e03b196-3248-4f14-9f2d-4661e503665d	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
70570323-da1f-4912-a94c-9002f6501645	2e03b196-3248-4f14-9f2d-4661e503665d	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	GREAT	f
41f64529-c798-4e32-8e1c-f6feba989851	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	GREAT	f
cfc37520-8138-4fc7-99bb-c268ca33f077	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	EXCELLENT	f
b76b336e-9068-4962-8b27-0eaf04b86a96	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	Erinomaista työskentelyä itseohjautuvasti.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	EXCELLENT	f
c8bd30da-2490-49a7-bb6a-04a3436a043f	b9266745-39ba-4be3-b1a1-421801b79832	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	GREAT	f
c78eef6c-26f9-4ce7-b49c-018b647e30ae	686241e9-7a4e-4eb6-bc99-26699999001b	Pieni väsähtäminen loppu puolella. Lukuunottamatta sitä, aktiivista työskentelyä.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	GREAT	f
2a33b878-81b7-479f-8d59-b2fa32da1edc	e9969c0d-58a3-4bcd-b301-5690b7290aa5	Itseohjautuvaa ja turvallista työskentelyä tunnilla.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	EXCELLENT	f
3b0849bb-65ef-4528-aae5-6b59c4d1b552	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	\N	f
18fea79a-caf0-48db-bb6f-9042d2608d6e	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	GREAT	f
e60292f2-6f6b-488e-a5c6-6fb0b5ff4706	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	GREAT	f
9832e9c4-aa91-4ab6-bfa2-d2f58fe1dcbc	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
45f26a84-3cdd-4922-a9cb-c3b228be318a	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
c60fe698-34ed-420f-aa7a-e2441214d8da	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
c72c43f6-a73e-4f6d-92f1-428022aaf483	b9266745-39ba-4be3-b1a1-421801b79832	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
56bd9844-b723-448f-abb4-41235adffd4a	686241e9-7a4e-4eb6-bc99-26699999001b	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	f	\N	\N	f
a9661d15-c79e-403a-ab9e-3f5ff39feb73	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
85ad2784-281f-46f3-abf5-1d46dd3c3e4b	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
8f2f9f1a-9eaa-4d64-8bb9-2dbc79d76d7a	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
a318e792-253b-4a0b-a265-4de5b5f0e183	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	f	\N	\N	f
ef9b688a-80b6-41fa-be27-0e9dcfe3861f	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
139fd7f3-7752-4a2f-bcbe-1439a51eba13	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
a707554c-3cb3-4575-8be2-34fcd2f019f6	42a4fefd-c72e-4707-b0d6-14fd9bd80379	Hyvällä asenteella heittämistä. Työskentely tuollaisella tasolla mahdollistaa oppimisen.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	GREAT	f
1a9d7061-85a6-4089-a66a-2dd5d8ecb63b	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	EXCELLENT	f
2d6579d0-2f38-4b02-94b1-c12e83f40ff0	74e88236-472e-41ea-9475-73c94489ae2e	Pieni väsähtäminen loppu puolella. Lukuunottamatta sitä, aktiivista työskentelyä.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	GREAT	f
e553f32d-e1a2-43b7-b2ea-4d2794ebb464	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti juoksi hyvin ja jaksoi koko lenkin ajan. Hän kannusti muita juoksijoita ja piti hyvää tahtia yllä.	1852c993-c666-42e9-8862-e2b9bd8f8a8d	t	GREAT	GOOD	f
2dcdf7eb-f80d-4974-8c9e-34796b2e68f6	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa juoksi peruskestävyystreenin aikana, mutta hänellä oli vaikeuksia mäkien kanssa. Hän pysyi kuitenkin positiivisena ja jatkoi yrittämistä.	1852c993-c666-42e9-8862-e2b9bd8f8a8d	t	FAIR	GOOD	f
1e8365f7-aab3-4fee-9b08-6771c2f38807	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui luontojoogaan ulkona puistossa. Hän teki joogaliikkeitä rauhallisesti ja keskittyneesti, nauttien samalla raikkaasta ulkoilmasta. Hän auttoi muita osallistujia tarvittaessa.	d54b8c42-67e5-49a5-85f3-f163230de4a7	t	GOOD	GREAT	f
c304fa48-57bb-4645-bfee-f0b54a52bd48	84c79ed7-b6e3-488d-93e7-0462a6e51139	terve tässä jotain sanallista palautetta äänellä	7da6191b-7f47-44e2-a246-68effa8168dc	t	GREAT	GOOD	f
0fe73e3d-23c5-4e56-84ad-a5020273c4f7	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	7da6191b-7f47-44e2-a246-68effa8168dc	t	GOOD	GREAT	f
9ba1eb11-868d-4819-a494-1be615fff538	28426aca-f675-46f7-bafc-dc5f7eb649c5	\N	4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	t	GREAT	EXCELLENT	f
8ead84e9-d6d9-4468-9bff-b6a8946a8eae	251b27c1-5684-424b-b17b-7257a311bd33	\N	4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	t	GOOD	EXCELLENT	f
5a3bb634-5db2-4ca3-aae2-e90b451253b3	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	t	GREAT	EXCELLENT	f
135e8102-b719-4e4a-9858-cc568e26c340	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	t	GREAT	EXCELLENT	f
6349dc8b-b1e6-4ba5-86ce-917ebcbfa424	9c66fa7f-c08f-4905-9c54-5da739156493	\N	4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	t	GREAT	EXCELLENT	f
d77838ac-503c-48cf-9b97-8a6927c47932	04629d10-42df-4873-bb8e-a38230d93b8a	\N	4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	t	GREAT	EXCELLENT	f
d6a3b7af-9bba-4e87-9b0d-db9881b726ce	b8a8e21b-2e09-4855-a354-0c48800913c9	\N	4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	t	GREAT	\N	f
6ee42293-2bf6-4b21-be8c-a733260619ea	d6b3db8b-50e7-4a6c-8ed2-2247a659a3a9	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
f4284296-dc73-47ab-ac36-0f12f9cfacad	a17ec781-f403-45b7-b1a2-2ad88dc2038e	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
505b8731-335a-4389-a4cd-10c8d5dc555e	9ffd35f9-d869-4406-aa8c-cf60cbc47830	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
adc7e2e6-c2a3-4572-9660-440618f959d0	545958d4-a061-46c0-a58b-e814f2864886	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
ce8a8fcd-0a22-4a40-84d5-aaa57dc19dcb	f37fb196-de25-4ea8-a1ff-280491ef3865	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
47b132e5-17bb-42a8-9e93-fc07eb7ed74b	7b45664d-caff-4e11-a717-7c3e2e1ed7f7	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
1065ad3d-8393-4004-820f-1a0d588f543e	803c9cfd-c665-452f-9cf4-1315a875fa0e	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
28b223b2-ea14-4557-ba28-cf028f436f0c	34f18910-a0db-4e48-8129-8416b575d22b	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
4f790c5e-d000-476a-be75-c69d88e5d252	e5570e54-941f-4e8b-b7de-f2dd3d7662e2	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
e1b5245e-86ac-4783-bd33-c7c7093bf308	7f64f516-bdbd-490a-9d83-6625c9834929	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
939ab2d9-b0b3-4400-b0f1-0e1b078d70b9	671ee4af-e36d-437d-b3ec-bee0179c96c4	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
672bb7bc-502b-4dfe-b336-02f039bad00f	165e6b48-6ffc-498b-a9c4-aac0d7a14fe2	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
60dfa8f8-0520-4f1f-8761-61c4ec6a131a	bcdcfdce-bc43-43af-88b2-ce2f79d40da0	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
a84cf575-101e-4947-8f0d-bd7a0df314c9	d21c58bf-a09d-4a2e-ab5f-131a3233f6ba	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
c8f4ea5b-f0f6-4b68-8b29-3d9aaf9a792f	3a817706-c52d-4a77-8f87-68ef4514aef9	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
01636576-c016-4aa4-8222-1df5c423731f	f2cd6a55-4291-4848-a66e-36d096f181c4	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
0f475d08-4751-4a2b-8471-d8b3d91d1001	7c3affe4-d2a3-4620-907f-abc411bd5534	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
8fd99800-d61f-4483-9ea7-53e13e160864	8597552c-2527-4294-8a08-56d47b563b33	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
e327b53d-bb16-40bc-9f78-d5bb1d024784	d9dd649b-f9bf-4670-84ea-a102fc16cfcc	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
6ab0b17a-50b2-4931-8413-1492dc1dc198	dc2469d2-1c1d-499c-bb3c-ff061b70307d	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
1070624f-7566-4861-846e-f471ada50a92	98160f96-0d06-40e7-9e12-1c1ad90442fd	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
2947dc43-8c11-4d90-9067-1f86aa849ce7	f71a7e38-187d-4dfb-823d-f959158a971f	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
de5f8af8-d6c8-4e0a-92d9-9c2c8d79e688	6bc63090-ea58-4189-b5d1-cba135d9da2b	\N	a75cd675-489c-4e09-8c33-ac8afd3063a0	t	\N	\N	f
a3c5da14-9f86-45f5-a43b-2eaea4922d37	75bba92f-9f9c-47c0-a89a-2add75007cf6	\N	b1876b9c-23cd-46d2-aa93-b7980fbca7a2	f	\N	\N	f
109f5a84-f0df-45ce-a30e-22b122359f7c	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa harjoitteli latinalaistansseja tanssitunnilla ja oppi nopeasti uudet askeleet. Hän auttoi muita oppimaan ja piti tunnelman kevyenä.	beee4734-91f2-424a-b01d-70bb610bfcbc	t	EXCELLENT	GREAT	t
6258b7c3-dc4c-449f-8a62-a20e66704946	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui uintiharjoituksiin ja näytti erinomaisia taitojaan eri uintitekniikoissa. Hän ui nopeasti ja kehitti tekniikkaansa jatkuvasti. Hän myös auttoi ja kannusti muita uimareita.	ffcf41a8-c5c9-406d-8062-a9f9f40bf827	t	EXCELLENT	EXCELLENT	f
26f23f78-75bf-4a89-84de-52eecb22c2ae	df05106e-6e95-4a82-af93-c5f6f8a58047	\N	566dc2b8-667a-428f-bf64-2947669dae99	t	EXCELLENT	EXCELLENT	f
8a6472be-f0f3-4dc8-802a-78da2aa43ee1	24bd87c1-454d-412e-a843-595ffdc4892b	\N	566dc2b8-667a-428f-bf64-2947669dae99	t	GREAT	GOOD	t
90e84a0c-4deb-450b-99ff-3fe306da10bf	e459564c-d6aa-4fec-8790-508218a41435	\N	566dc2b8-667a-428f-bf64-2947669dae99	t	GREAT	EXCELLENT	f
50fa6540-b3dc-4018-a522-8f6afc79de8a	c99cbc5a-d88b-4022-bc5a-aae33f51e30b	\N	566dc2b8-667a-428f-bf64-2947669dae99	t	EXCELLENT	EXCELLENT	t
664bdf7f-ea3d-4d50-b37b-de76718f8976	4fa0db05-161f-4165-b00c-52528866490c	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
836b5be2-9f68-40bc-b1c6-a5e81222aad3	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
57545676-a122-4ed6-98a3-dbbf55624780	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
7730c42f-e2c4-423e-b047-e0df81e82145	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
ffa408f9-d3d7-4791-831f-a9fb13b1caf6	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
a074412c-81d3-41fc-bc96-ef60096c62cf	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
4a629ab8-71a8-4755-8727-c2528e7de0aa	a6eb654d-12a2-4350-a687-128314062791	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
65b02b45-bbaf-4760-a8a0-cfd1c13936b9	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
ad5e365d-ae63-4506-89d2-3518eab92412	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
7bee149e-68e5-4c9a-8eb0-b416258042f2	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
0968e2f4-a16a-4919-94de-4e6f07f78fb4	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
c9c3e938-fc36-4496-9bf4-2e6ebce30ea0	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
e2810cdf-f33b-4c8f-b493-e4b78cc3da6f	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
7e8899bb-3c46-4c38-ba96-a378b896b3b1	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
9774ff5b-4321-4567-93a8-31a5a35cf105	8cc39180-992f-41be-88d7-d798fc88abe0	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
f570d97a-40d8-4d07-b153-71fd6e422680	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
3540cf48-7a64-42ba-b13c-068a41549e4b	789e18c3-638d-4651-be65-ec0a1661539f	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
134f4669-a5f2-48be-980c-44e081173d52	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
5ba5375e-d21e-4d89-9efc-2aa6a15ab02d	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
6273bbf9-2bdb-46be-9f80-a10099f739d3	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	4c015819-9b68-4634-83d1-ee1114c9be59	t	\N	\N	f
7e5bf21c-7997-406b-b36b-87dc62b0d179	28426aca-f675-46f7-bafc-dc5f7eb649c5	Taitavaa voimantuottoa koko keholla eri välineiden heitossa. Nopeita katkoja soikkiksen pelaamisessa. Aktiivista osallistumista työskentelyyn läpi tunnin.	02c4cd17-9f85-4047-9db1-4b13bc0da999	t	EXCELLENT	EXCELLENT	f
ecf445c3-0d4a-497e-9129-7d8845e31652	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	Erinomaista työskentelyä. Pystyy toimimaan kaikkien kanssa tunnilla ja on aktiivisesti mukana työskentelyssä. Heittäminen luonnistuu eri välineillä oikein hyvin.	02c4cd17-9f85-4047-9db1-4b13bc0da999	t	GREAT	EXCELLENT	f
2ce4cac0-f834-48eb-8e45-2f87ba3ffe00	251b27c1-5684-424b-b17b-7257a311bd33	Erinomaista työskentelyä. Pystyy toimimaan kaikkien kanssa tunnilla ja on aktiivisesti mukana työskentelyssä. Peleissä antaa kaikkensa joukkueelle. Hienoja syöksyjä ja heittäytymisiä. Heittäminen luonnistuu eri välineillä oikein hyvin. Työskentelyssä näkyy halu oppia uutta.	02c4cd17-9f85-4047-9db1-4b13bc0da999	t	GREAT	EXCELLENT	f
c0ec6174-3b6c-4d80-a358-7b9cd6c95749	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	02c4cd17-9f85-4047-9db1-4b13bc0da999	t	GREAT	EXCELLENT	f
fa7cb005-1cbd-49e5-bab1-ca4f5a500f66	9c66fa7f-c08f-4905-9c54-5da739156493	Työskentelyssä näkyy halu oppia uusia asioita.	02c4cd17-9f85-4047-9db1-4b13bc0da999	t	GREAT	EXCELLENT	f
9d9f6378-bd5d-499a-b1b9-b2b7249e833b	04629d10-42df-4873-bb8e-a38230d93b8a	Taitavaa pelaamista ja pelin kulun hahmottamista. Nopeita liikkeitä ja hämäyksiä! 	02c4cd17-9f85-4047-9db1-4b13bc0da999	t	EXCELLENT	EXCELLENT	f
ce815f42-4a0e-48e1-9d3b-ae14dc98a901	b8a8e21b-2e09-4855-a354-0c48800913c9	Keihäs lähtee todella sulavasti liikkelle kädestä koko kropan voimaa hyödyntäen. Tunnollista työskentelyä.	02c4cd17-9f85-4047-9db1-4b13bc0da999	t	GREAT	EXCELLENT	f
6467ebe5-586a-409e-b8ab-7a5d694cacfb	75bba92f-9f9c-47c0-a89a-2add75007cf6	Vaikka Matti ei ollut aivan parhaimmillaan latinalaistansseissa, hän osallistui tunnille positiivisella asenteella ja kannusti muita.	beee4734-91f2-424a-b01d-70bb610bfcbc	t	FAIR	GREAT	f
e0d0ac7a-0a0e-427b-8dab-9c726f47c493	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa osallistui vesijumppaan aktiivisesti ja suoritti liikkeitä hyvällä asenteella. Hän auttoi muita osallistujia ja kannusti heitä yrittämään parhaansa.	9e17426f-5a97-4d62-bca8-25a9312e1367	t	GOOD	EXCELLENT	f
719d059c-d01f-4dc0-af85-c256f999653d	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui peruskestävyystreeniin juoksuradalla. Hän juoksi noin 5 kilometrin lenkin, mutta hengästyi muutamissa mäissä. Hän kannusti itseään ja jatkoi juoksua.	1852c993-c666-42e9-8862-e2b9bd8f8a8d	t	FAIR	GOOD	f
68a6ddc8-94bf-45e9-8f34-a0df7d43ebcd	df05106e-6e95-4a82-af93-c5f6f8a58047	\N	3ca2f6e3-1bcc-4ab3-ba64-1440cdaf8019	t	\N	\N	f
a4bcadee-fe8e-4012-899b-85c5adfd7a02	24bd87c1-454d-412e-a843-595ffdc4892b	\N	3ca2f6e3-1bcc-4ab3-ba64-1440cdaf8019	t	\N	\N	f
ad192493-5fcc-428e-bb21-f5ee5f0dcc2b	e459564c-d6aa-4fec-8790-508218a41435	\N	3ca2f6e3-1bcc-4ab3-ba64-1440cdaf8019	t	\N	\N	f
c79125aa-1d2b-4b1e-ad52-e9ed236dd8fe	c99cbc5a-d88b-4022-bc5a-aae33f51e30b	\N	3ca2f6e3-1bcc-4ab3-ba64-1440cdaf8019	t	\N	\N	f
495ca730-17f1-4d48-9812-508ba5050235	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	FAIR	GOOD	f
5bbb5b8a-0c92-4971-9fa2-63610a735bc8	e2c637e8-f394-4a5a-926f-1f9888a7dc98	\N	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	f	\N	\N	f
f1d831b5-a66b-47bf-96e0-dca32eceb138	d07f9606-ddee-4f35-8d35-b8358dc9fc75	Hyvää työskentelyä omassa porukassa. Aktiivista työskentelyä.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	EXCELLENT	f
a8774b36-56c6-498b-bfad-8b344bff64ea	9bdfa82d-13bd-40be-9a9b-a57c2a072351	Kavereiden kanssa istuskelua syrjässä. Vähän frisbeegolffin pelaamista tunnilla.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	FAIR	f
5b923c44-5376-4089-822c-1ba943554813	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	GREAT	f
c5087ea0-0b78-4e3f-97d8-89fa4c161cf1	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	GOOD	FAIR	f
eb849d17-d58d-4e11-85cf-676a03b7d62f	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	Ei paikalla	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	f	\N	\N	f
f37029ec-6468-4947-885f-9b439bda4910	24007058-ca39-4c69-9004-c3d29b441fb3	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	f	\N	\N	f
000ae700-f2b9-414a-b457-c7e20871ca2e	350594d5-5cd4-4033-9294-6b50102afe7d	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	GOOD	GOOD	f
59ce83ba-b499-47d6-8cff-890e4850e0d0	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	f	\N	\N	f
a5109c7a-bc63-4643-a301-9997faa6b890	e2c637e8-f394-4a5a-926f-1f9888a7dc98	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	FAIR	FAIR	f
c11c46e4-fd5e-48cc-b758-4d3f05af4c80	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	GOOD	GREAT	f
4df3d123-bc17-4666-a378-30ef85c80b58	2dd7377d-323a-4e73-9a14-5962ec2b8a58	Ei paikalla	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	f	\N	\N	f
40c17154-dbcc-43d8-b9cf-6280c0574c27	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	GOOD	GREAT	f
37c08e9b-c458-4838-8e15-eed5857691f1	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	GOOD	FAIR	f
e6d08098-12fd-442e-b590-b9d21736ed07	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	f	\N	\N	f
76927450-cd6e-440b-b4b5-02f167ab8610	b05b035e-4867-40c1-965e-f60630bfa457	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	f	\N	\N	f
78723431-79e0-407f-a409-062ed73354ac	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	GOOD	FAIR	f
9585ba70-1edb-4c82-8f79-5af40c6e2b05	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	FAIR	GOOD	f
8bf31ca5-7ba9-4f43-8e4a-a9fa1d6ed42b	720863b3-15b5-4928-b516-5a8ec0cee764	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	GOOD	GREAT	f
71750806-0a46-4ddf-8030-f9f8cf8f51b2	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	GOOD	FAIR	f
055cb6b0-a0fb-477c-8b5e-6106c4183830	b43981e9-6f50-4908-b225-1f5d5a70c68e	Kavereiden kanssa istuskelua syrjässä. Vähän frisbeegolffin pelaamista tunnilla.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	FAIR	f
a65e8cbb-d0c2-4771-b56b-09780998a6bc	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	GREAT	f
c5b43710-e03b-4241-affb-e97ad5da586e	350594d5-5cd4-4033-9294-6b50102afe7d	Hyvää työskentelyä omassa porukassa. Aktiivista työskentelyä.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	EXCELLENT	f
91e8d9b3-f163-49f1-b8a5-a1e33a6acd3b	c0011bcd-6952-4d60-a01b-3b455c7eea4c	Hyvää työskentelyä omassa porukassa. Aktiivista työskentelyä.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	EXCELLENT	f
0d064c4b-47d4-4029-9754-1ec409249225	24007058-ca39-4c69-9004-c3d29b441fb3	\N	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	GOOD	f
4f7785e4-ac9d-464b-8e00-ba622bea266d	67c02902-d7e2-47e1-abef-9d1ae14a3da5	Hyvää työskentelyä omassa porukassa. Aktiivista työskentelyä.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	EXCELLENT	f
04d2fc66-8de6-49b9-af2f-d9d83fcd4101	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	GREAT	f
7655381e-cf8e-4fdd-9c91-eb1efba07658	b05b035e-4867-40c1-965e-f60630bfa457	Hyvää työskentelyä omassa porukassa. Aktiivista työskentelyä.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	EXCELLENT	f
5c5f30cd-6ae8-4f2b-9bff-adf47eab270e	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	Kavereiden kanssa istuskelua syrjässä. Vähän frisbeegolffin pelaamista tunnilla.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	FAIR	f
2dee1d80-15f8-4881-a9ac-2a1d57a72ff1	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	GOOD	f
7cff870f-4f72-46ee-99bc-5da9d3d8fa81	75bba92f-9f9c-47c0-a89a-2add75007cf6	\N	8dbcba3f-35e0-4e19-83a3-e480a5ad4c39	f	\N	\N	f
7a9a2f72-e72d-40d9-95a4-8efd91b41c4b	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa osallistui luontojoogaan rannalla ja harjoitteli liikkeitä keskittyneesti. Hän nautti auringonlaskun tunnelmasta ja auttoi muita osallistujia.	0928afc3-d50e-4222-9adc-71d1c8dc4593	t	GREAT	EXCELLENT	f
df39c335-98bd-40ce-8d1c-5f3369e2c596	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui koripalloharjoituksiin ja näytti erinomaisia taitojaan. Hän teki useita koreja ja antoi hyviä syöttöjä. Hän myös kannusti ja auttoi joukkuetovereitaan.	f5a560c0-2dc6-4f39-8158-9c222339bb04	t	EXCELLENT	EXCELLENT	f
5687aac3-8905-4ddf-9cab-a79b407e128e	84c79ed7-b6e3-488d-93e7-0462a6e51139	\N	64295e4a-7641-439d-8a7f-8e967149dde6	t	\N	\N	f
7f232c6b-cd57-4936-9ce4-2a58d14d09a2	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	64295e4a-7641-439d-8a7f-8e967149dde6	t	\N	\N	f
60dada6a-a326-4de1-94b5-dcd3e01ddc84	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	f	\N	\N	f
0077fa29-8871-412e-ab4b-0f29c66d6882	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	f	\N	\N	f
df82add9-56b5-448e-a897-e3f697fbc406	898eaa06-334f-4446-98b3-2368ad2b6cef	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	f	\N	\N	f
bca3df23-b922-4cc9-b237-b53fb6782269	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	f	\N	\N	f
bd06f1c0-0502-43d1-955f-5f914238e523	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	f	\N	\N	f
37ae9d74-791c-45c7-acd6-7bf5e233c05d	a9823635-cc6a-4026-ad85-423287d7ec49	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	GREAT	f
ea2eb40e-57ce-4c92-80c9-7f834e1def02	41403fd8-289f-42b0-8d4f-4f8f2d47898d	Aktiivista tuntityöskentelyä.	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	EXCELLENT	f
0d86b2b4-9e07-4dc8-9895-30a122364669	16149225-d420-4254-88de-36f235415650	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	GREAT	f
66d9a724-b9c6-474a-a635-03bff463be4a	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	GREAT	f
bd97e9f8-c594-4f4f-a814-3ab4c4909254	7af2670e-d622-44de-9458-0e3490224f19	Hyvällä asenteella tunnilla.	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	GREAT	f
11ec3927-7611-4b56-a076-64e8ec58f79b	b015f02b-0e21-4f21-93d4-8497311b6490	Haisi röökille? 	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	GREAT	f
78e875d0-30f6-42b4-b398-713a6e96ab7b	4cdb20f7-d8a7-480c-9379-bbe14d95d933	Ei paikalla	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	\N	f
64f2570e-f14e-44cc-b7cb-868deec34b40	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	GREAT	f
7aaf482c-8254-4c8b-b161-73d21c375909	052654dc-bfba-4092-85d4-6894c908f9b1	Aktiivista tuntityöskentelyä.	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	EXCELLENT	f
ecb83267-8fd2-43f5-a07c-c88bba68d0d5	eb96e883-bf2d-4482-b8c9-6d272ee35354	Hyvällä asenteella mukana!	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	GREAT	f
fcfbc435-d328-4751-bd0c-d4d98f167bee	720863b3-15b5-4928-b516-5a8ec0cee764	Kivaa ja aktiivista pelailua lähes koko tunnin ajan.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	GREAT	f
cccfc7ff-43a3-4c28-ac76-d0bbcba3c12c	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	Kavereiden kanssa istuskelua syrjässä. Vähän frisbeegolffin pelaamista tunnilla.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	FAIR	f
bec1a5cf-e71f-48c0-b3f9-9c3aeb1fb900	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	Hyvää yrittämistä lähes koko tunnin ajan.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	GOOD	f
9a187aa0-d1b5-492d-8b46-30089aeb6809	9c66fa7f-c08f-4905-9c54-5da739156493	\N	2a49b22f-e902-43cc-9785-493949f36824	f	\N	\N	f
ff952b2f-ba2d-4ffd-9f04-092958ecb23f	28426aca-f675-46f7-bafc-dc5f7eb649c5	\N	2a49b22f-e902-43cc-9785-493949f36824	t	EXCELLENT	EXCELLENT	f
279da558-780d-431b-828f-d008980f4908	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	2a49b22f-e902-43cc-9785-493949f36824	t	GREAT	GREAT	f
8eff5168-8c27-47fb-b046-36ee5b7bac2a	251b27c1-5684-424b-b17b-7257a311bd33	\N	2a49b22f-e902-43cc-9785-493949f36824	t	GREAT	EXCELLENT	f
e3e5552c-c05c-4837-a003-17a44ff99cdf	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	2a49b22f-e902-43cc-9785-493949f36824	t	GREAT	EXCELLENT	f
3e91209e-09d7-4e04-b026-b5aeb42e32b7	04629d10-42df-4873-bb8e-a38230d93b8a	\N	2a49b22f-e902-43cc-9785-493949f36824	t	GREAT	GREAT	f
07e6fc58-ec76-491e-8713-ccb7842c68a7	b8a8e21b-2e09-4855-a354-0c48800913c9	\N	2a49b22f-e902-43cc-9785-493949f36824	t	EXCELLENT	EXCELLENT	f
33c45ca7-3515-4c5e-96f5-85b78e54f3ca	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti treenasi kuntosalia tehokkaasti ja keskittyi ylävartalon lihaksiin. Hän kuitenkin keskusteli välillä liikaa muiden kanssa, mikä häiritsi hieman treeniä.	c04c12d5-e621-4254-9751-63ebe4dcd439	t	GREAT	GOOD	f
c38ce1bf-a197-435f-86c5-3b3c75e760b1	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa harjoitteli voimistelutreeniä salilla ja teki hyviä hyppyjä ja liikkeitä. Hän tarvitsi apua tasapainossa, mutta oli motivoitunut ja kuunteli ohjeita.	78187248-1c3a-4f9d-80c5-a7d1a3ccafb8	t	GOOD	GOOD	t
81d85082-5cad-43d6-bcd4-7f7bcf9f36b8	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo pelasi sählyä salissa ja osallistui tiukkaan otteluun. Hän teki yhden maalin ja auttoi joukkuettaan puolustuksessa. Hän myös kannusti muita pelaajia.	8dbcba3f-35e0-4e19-83a3-e480a5ad4c39	t	GOOD	GREAT	f
c0f878ab-5b4d-40c0-8cf1-171228c5adc6	2e03b196-3248-4f14-9f2d-4661e503665d	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	f	\N	\N	f
b7f0d7a6-ba41-432d-a607-8bfa711b43e5	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	f	\N	\N	f
e2aa395f-ddb8-4b9a-957d-d1e0dd9251a6	404347be-f571-4254-b055-a06e9a9962f9	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	GOOD	GREAT	f
575306f8-3feb-4b1b-a762-ff8779f3b177	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	EXCELLENT	GREAT	f
da9bb2bf-7206-4604-add1-ca46a0652333	799b59e5-c962-4f19-9f9d-01518c57a550	Tänään oli hyvä boogie. Syöttelyä paljon.	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	EXCELLENT	GREAT	f
2e491a39-6656-47fc-96e2-87ccc3639b24	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	GOOD	GOOD	f
a3b48a81-8525-448f-8a35-bd4e0611bcaa	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	GREAT	GREAT	f
54fedda5-f7a2-4f6c-929f-3c35f49691e7	74e88236-472e-41ea-9475-73c94489ae2e	Taitavaa hyppynaruilua!	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	GREAT	GREAT	f
5abef222-62fb-404b-992f-f784e3186986	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	Ei paikalla	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	\N	\N	f
b8cb2fa6-e428-400d-b87f-6723ab0de5b3	dadb6322-e514-4a92-b22b-ab9357a4ac32	Hyvällä asenteella kaikessa mukana.	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	GREAT	GREAT	f
991e74d0-2555-48f8-acbf-31ecf2e2b011	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	Huippuhyvää työskentelyä ja muiden huomioimista	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	EXCELLENT	EXCELLENT	f
62854327-8044-4686-abad-ef7c4594d5fd	b9266745-39ba-4be3-b1a1-421801b79832	Loistava tunti. Mukana kaikessa ja hyvällä asenteella.	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	GREAT	GREAT	f
2630e6a6-ecfc-4aeb-9d16-03bc82066aef	686241e9-7a4e-4eb6-bc99-26699999001b	Ei paikalla	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	\N	\N	f
78436238-a52d-4881-8a75-83155d13665b	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	GREAT	GREAT	f
4438ea78-6cfb-41ce-a91b-d22ee1295138	2209c4b3-b0d6-4858-9fa0-74c9b589442c	Ei paikalla	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	\N	\N	f
365ee758-bc5e-4cbd-bce4-14ec5121480a	4943ad21-7f08-4b45-8d6c-7cccbfb05562	Kokeili myös korista. Pyysi saada syötön!	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	FAIR	GOOD	f
d6f227a8-75a2-42d7-b2ba-25595d551b5c	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	GREAT	GREAT	f
0c119873-0879-42dc-b3ba-c58e81451f64	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	GOOD	GREAT	f
82b4d02c-e840-44de-a985-a8a5813c4beb	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti nautti retkeilystä metsässä ja piti huolta, että ryhmä pysyi koossa. Hän myös auttoi muita retkeläisiä tarvittaessa.	7301039b-e03e-4faf-a594-45c33f925021	t	GREAT	\N	f
835c7f85-0a4c-4aac-b2da-93697c8e426e	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa pelasi sählyä salissa ja yritti parhaansa, vaikka hänen mailankäsittelynsä ei ollut vahvinta. Hän kannusti joukkuettaan ja auttoi heitä.	8dbcba3f-35e0-4e19-83a3-e480a5ad4c39	t	FAIR	GOOD	f
8235801c-5dfa-45cd-b5fa-e0a20e286a9c	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui retkeilyyn metsässä. Hän käveli 10 kilometrin lenkin metsäpolkuja pitkin, mutta väsyi hieman loppua kohti. Hän ihasteli kaunista luontoa ja jaksoi silti hymyillä.	7301039b-e03e-4faf-a594-45c33f925021	t	FAIR	GREAT	f
1c42203d-424d-4e40-87b2-5f67c8035e52	4a3f375e-f8ce-46f9-8b9a-4587d069d036	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
3614b2ba-0ac5-4681-ae56-36a4d68d2487	8fa5f694-d7a7-49c2-98a2-e1aecdc80d3e	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
9b9500bd-7fd0-46ef-bbd1-f5f52a8178ac	63f57cea-4036-4e38-9d84-3c36f99124ef	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
d882af04-db1f-465a-8a0c-fa0afbc95a5b	1461587b-fedd-4cb1-a122-58dd9ddc3fd9	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
715e87c2-1635-4f07-b3ef-47d22ebebf23	00179acc-3d3c-496f-98db-fb88756116f4	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
376dc920-d09e-4453-9613-ae1d9347e319	fb78d640-ca97-407e-9d2b-6390b8a2c77d	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
e527f896-99d1-4a0a-b433-c911ccd74d4b	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
7e81545c-a992-4005-8278-54da2b3924bf	45cedf94-714b-404a-8ad5-db42f55919eb	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
f6815554-1192-4f3b-8643-0a9983097526	69fec935-4bcd-43ab-9737-a524627dbe1e	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
81e36505-0eee-44d6-86e8-c76a35a26a9e	1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
53d8128b-e3fa-4f31-98b9-2bb5dd307c93	abd4148b-b530-4440-b643-34d08a4bb811	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
e40ff25c-54c1-4742-aa4f-b2b3c1ff3a32	ad671202-0d1b-4b31-a2fc-9fa9032f3b33	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
0e34d5db-865f-4115-9e59-238e3d1ad0b9	3723e655-2484-4055-8570-13ee693d5a1a	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
9aaf413d-3c34-4d05-b87f-0dbf298f871b	f4eb73ad-9a1f-4b7b-8899-b2a07ff4db2d	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
55ab1669-a89e-4670-8244-1c9ca388b9a0	de28725b-ccaf-45e6-b808-aeeba3fa151e	\N	4aba8224-f510-48f7-912e-048ec687325f	f	\N	\N	f
49756344-68e0-4270-81c5-f135db7c07d5	0e963947-3dcf-4f30-b316-ac9d07d81b0b	\N	4aba8224-f510-48f7-912e-048ec687325f	t	GREAT	GREAT	f
b39d02ee-f25b-494f-b432-cce9cec6f20c	f9c6b20c-e57c-4e70-9f32-dedd975aab01	\N	4aba8224-f510-48f7-912e-048ec687325f	t	EXCELLENT	EXCELLENT	f
d4998008-c4d5-4dfa-98e5-3fd74ffb21ff	1f770536-fee1-4ca2-9622-ed816628c9b7	\N	4aba8224-f510-48f7-912e-048ec687325f	t	GOOD	GREAT	f
8175d203-9dfc-4a07-986a-24a2c57293a7	91a00bae-00db-464f-8376-591e16a5a811	\N	4aba8224-f510-48f7-912e-048ec687325f	t	EXCELLENT	GREAT	f
e5a39668-72c7-4e84-9fa6-297b8eda6404	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	\N	4aba8224-f510-48f7-912e-048ec687325f	t	GREAT	GREAT	f
c7043da9-6a91-4a09-87ec-8e3ba1d83102	b1ef84a7-2238-4946-bd2d-97aae138bbad	\N	4aba8224-f510-48f7-912e-048ec687325f	t	EXCELLENT	EXCELLENT	f
de8a8b62-0c05-4cff-a53a-df4c2a158e80	1556394a-6336-4838-8943-19088ecdf5e0	\N	4aba8224-f510-48f7-912e-048ec687325f	t	GREAT	GREAT	f
86868be2-3909-458b-b5e6-92fdd93b5bb5	3e62f535-90a9-4a75-9748-27ea0d491a54	\N	4aba8224-f510-48f7-912e-048ec687325f	t	GOOD	GREAT	f
bd584062-858b-4e83-88e3-c157000e1366	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	4aba8224-f510-48f7-912e-048ec687325f	t	EXCELLENT	GREAT	f
75a85555-8614-4579-97d5-7d60a54532dc	e47d29de-6a02-4e63-a52a-964fc17b744e	\N	4aba8224-f510-48f7-912e-048ec687325f	t	EXCELLENT	GREAT	f
b855e55e-47ae-4ac2-8598-864e928b52e5	aa420673-c8ba-41da-9ee4-061022bb4a51	\N	4aba8224-f510-48f7-912e-048ec687325f	t	EXCELLENT	GREAT	f
ee04abec-bd3b-4718-93d2-c7786cbb1ade	a9823635-cc6a-4026-ad85-423287d7ec49	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	GOOD	GREAT	f
b473b281-2da2-4618-92a1-f5715b37b541	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	GREAT	EXCELLENT	f
72534751-5333-4abe-989b-89353b93955e	16149225-d420-4254-88de-36f235415650	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	GREAT	EXCELLENT	f
6e96ae64-88f7-44be-9cc4-a915559ef341	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	EXCELLENT	EXCELLENT	f
2539e2ae-b683-4f9b-a144-0d9927a26c45	7af2670e-d622-44de-9458-0e3490224f19	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	GREAT	EXCELLENT	f
1c57afc7-5e83-44be-8ec3-96eac1a98b77	b015f02b-0e21-4f21-93d4-8497311b6490	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	EXCELLENT	EXCELLENT	f
9b53b8d4-8909-4a2e-8428-464927b40f72	4cdb20f7-d8a7-480c-9379-bbe14d95d933	Poissa	1bf527f9-144d-408d-8340-9aa5d93ec871	t	\N	\N	f
50812e13-1637-483c-a15f-d8d532758a14	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	GREAT	EXCELLENT	f
f20e8f3f-eac1-4934-ae2b-c1710b88066f	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	GOOD	EXCELLENT	f
ad7074ad-6811-4412-90f8-a4d0286bfda6	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	GOOD	EXCELLENT	f
6b683cfa-acd8-416f-a09f-282b066f9d1e	898eaa06-334f-4446-98b3-2368ad2b6cef	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	GOOD	EXCELLENT	f
3103f238-f102-4242-9851-12bc858fc4d6	25ba77b8-721c-4c32-b5c6-97ea194d2958	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
0ef81ad8-c998-4b30-9538-1a833f4be2f3	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
74b5b016-a35d-4924-9ca7-b523f6129247	81f9f274-c50a-4b30-b0f5-15c1479b942c	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
4fa660e2-b791-400e-82ca-1c0eb4dea351	eac386e1-ca07-42b6-9817-50f1d1081903	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
14b39987-3c40-4383-b3cf-f15dfdb2fca9	b8bc48bb-2b86-415c-837f-dbad58dd3e2d	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
5ca3fa6b-28cd-4393-8c73-e92ae07d712d	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
87f95634-e1ef-44fa-95d6-039d23ac6a9c	081d3462-484c-45f4-b7df-9eef1712d829	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
2a3ee9a4-26d6-41da-87cb-6bccb6fa2fbc	49c4aeec-3a4e-4761-b3cf-2546381857f7	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
13e2dfa8-0d95-4144-b6bb-3626cbe3eead	f96609c4-4c21-4b74-8523-f2c3b78d4c49	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
f97207c9-5890-48fd-b02a-0a32eca9c63d	7b55eeb0-4468-4696-b2fd-a50a7e058ec5	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
18a26571-093a-447c-a45e-38e6c4be2bbc	c7a9dddd-29a9-4698-991f-ecab63cf6fd0	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
bf1b0c45-6cef-45e1-81c5-2db11506545a	74c83e0a-3e21-4c01-b18a-a81f7e089d64	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
90f8a8d8-61f2-4d31-92a9-c867abcf643c	d04c2d81-ce92-4221-990a-64c5e1142ee9	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
576dd168-a930-444f-91b4-aaf62b89dc3d	7c413b7f-9005-43a9-9b44-1984a23ae65f	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
5e8c5fae-281c-4132-8dee-3131b286a06a	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
e5d828ed-dc31-4aee-937f-c2ce52cde936	0d39a916-dd79-4bc8-b493-771b456ed8ce	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
d31f1832-4af4-4688-bb89-aac59dc78f74	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
8a77736b-f55b-4055-9323-a59f7874a8a3	a2a3736c-4cbd-43f4-b8e4-8041a2b9d8f5	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
e876ffb6-5486-44a4-a8d7-4fd41d587b31	e25eac4b-ed6a-433b-b311-c27ea3f1faa4	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	f	\N	\N	f
033330b1-f293-46cf-b6f6-c659d3dbafc7	750d8c1e-30f2-49fc-a445-7acdb4bff78e	Poissa	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	\N	\N	f
fc7464cf-6d6f-406d-b7b3-c49c243c6968	213addc7-6d5d-4a39-95bf-ded6afa510a6	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	GREAT	EXCELLENT	f
a0cb96b2-9ff5-4727-a075-b4fd93138e4f	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	GREAT	GREAT	f
f0eafc83-ae33-4c62-9b94-fb88fe3d725a	dc43f223-8b76-457a-b035-8b186320bdea	Tenniksessä suostuttelun kautta mukaan. Fudiksessa hienosti remmissä.	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	GOOD	FAIR	f
9dfb4aa6-ea49-4a8e-a29f-18a7bfa32f7b	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	Mukana työskentelyssä hyvällä asenteella.	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	GOOD	GOOD	f
a73b511f-4c68-4079-bdab-7bf750415d98	f826618b-cee5-4d6c-bcde-27e7a74a0b63	Tänään jaksamisen kanssa vaikeuksia. 	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	GREAT	GOOD	f
bf250651-86ad-435a-bc3a-038db54de391	9f830199-bde9-43a4-84e9-986992a1e3d3	Aktiivista osallistumista tunnin aktiviteetteihin!	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	GOOD	GREAT	f
ccc0ecf0-4f84-49c7-b06d-663f8443b4f9	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	Aktiivista osallistumista tunnin aktiviteetteihin!	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	GREAT	GREAT	f
ed7c7c24-b480-499d-99c6-bab177b6f5fa	2487435b-5598-4a44-bc31-f93ed8a2ec43	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	GREAT	GREAT	f
7a56e8a3-bb61-44a4-bff2-fd314d1b31c2	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	Aktiivista osallistumista tunnin aktiviteetteihin!	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	GREAT	GREAT	f
d77c01a2-35e5-4fd7-8580-9e3ea2f7bc08	c4365db1-b405-4aac-ad56-4f21780797c0	Aktiivista osallistumista tunnin aktiviteetteihin! 	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	GREAT	GREAT	f
fa732a0c-aa9d-45f2-9988-b71fff6a6a5e	052654dc-bfba-4092-85d4-6894c908f9b1	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	GREAT	EXCELLENT	f
94d7db95-9cd1-48d3-bd0a-0ae89894b804	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	GREAT	EXCELLENT	f
9abba24e-08f6-4a19-bec3-a534dd31ee42	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	GREAT	EXCELLENT	f
81e054a5-4c5c-4658-b9fa-42b1beabffc2	eb96e883-bf2d-4482-b8c9-6d272ee35354	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	GREAT	EXCELLENT	f
8a5be3e7-2322-4fe7-81ee-0977ef8e45e1	75bba92f-9f9c-47c0-a89a-2add75007cf6	Tanssi ei sujunut tänään kovin hyvin. Matti ei pysynyt rytmissä ja tanssi liian nopeasti.	f9bbb84d-acab-4b52-a890-43dc7709963f	t	POOR	\N	f
fe0a27dd-2e6b-48cb-9085-0ea4d32fccb4	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa juoksi kestävyystreenin aikana, mutta hänellä oli haasteita pidempien mäkien kanssa. Hän ei kuitenkaan luovuttanut ja kannusti muita osallistujia.	ffcf41a8-c5c9-406d-8062-a9f9f40bf827	t	FAIR	GOOD	f
79912122-c306-4796-b55c-8e35091de022	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui kiipeilytunnille kiipeilyseinällä. Hän osoitti erinomaista kehonhallintaa ja voimaa, ja kiipesi nopeasti ylös seinää. Hän myös tuki muita osallistujia ja opasti heitä tarvittaessa.	3b32ba2c-8635-438b-a1b3-015d980e0846	t	EXCELLENT	GREAT	f
ff4de696-7bf7-42a0-ac55-76a4fe34957b	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	\N	\N	f
699b1df8-1c2b-4740-b92d-1ab9ff3a85bb	148a28ac-012b-44c4-b684-87a00ace9c72	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	\N	\N	f
a7a6aeda-1be5-4fc8-8d0e-de64593f8e40	a639981f-4bf0-4871-b264-00ad02a9a286	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	\N	\N	f
271a9de4-3e9e-4710-98a5-9b2550a5357d	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	f	\N	\N	f
fbdea6b2-646a-4876-b700-dd135377c708	bde08c48-5140-47eb-b28b-ce5c86ea8f46	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	\N	\N	f
90fffd79-4b68-40eb-8c53-17799324df36	e71cd959-78a0-4843-af83-1e8e741e7edf	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	\N	\N	f
bcb61ffc-eb5b-4bd3-ae63-d4f7039008c9	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	f	\N	\N	f
ffd921ca-6a20-43b6-b33b-ec954dfe8566	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	f	\N	\N	f
1ce2fa1f-c774-400a-a37e-cc8c8791f45e	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	\N	\N	f
526c49aa-2915-41f4-b3f7-0866cbc496a2	f03779c1-9d87-439c-8d95-14e384c7d2c0	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	\N	\N	f
74176ed7-a4a2-41ed-ac9e-61a1281cee88	5bbc08f9-01e0-4911-9a6a-38790219ce2a	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	\N	\N	f
afeb42e3-1881-4f61-9bea-085cbd56aa9b	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	f	\N	\N	f
fb07c74d-2cde-41e4-9d55-6e67f3669447	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	\N	\N	f
2d2da756-ed7b-4bea-b7fd-36a431bc1979	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	f	\N	\N	f
dede7439-62d5-4017-8435-3122dfa30fc6	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	\N	\N	f
112f4d08-9468-4183-9f6f-82573e03b82e	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	\N	\N	f
e5c103d4-1591-412c-bcf9-a849a625f9b6	63f57cea-4036-4e38-9d84-3c36f99124ef	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	f	\N	\N	f
403189de-ed8c-478a-95ed-4179b5e89811	45cedf94-714b-404a-8ad5-db42f55919eb	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	f	\N	\N	f
115e0966-c761-402b-a079-3f234b5ccb79	abd4148b-b530-4440-b643-34d08a4bb811	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	f	\N	\N	f
38da42ad-5bf9-431e-a375-ef1a58e03118	3723e655-2484-4055-8570-13ee693d5a1a	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	f	\N	\N	f
106e7e09-fbfd-4c55-90ce-b8024e703f2b	de28725b-ccaf-45e6-b808-aeeba3fa151e	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	f	\N	\N	f
993f4fec-c3d8-4366-aa36-6fb2faddf895	4a3f375e-f8ce-46f9-8b9a-4587d069d036	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
015ef43a-1551-4d43-bbb6-d8c894f4b969	0e963947-3dcf-4f30-b316-ac9d07d81b0b	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	GREAT	f
8aaf3fa3-45b8-45f6-a18c-607f03e2e50c	1f770536-fee1-4ca2-9622-ed816628c9b7	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	GREAT	f
59603638-b4d8-472c-a8ce-1b10b8fa9341	f9c6b20c-e57c-4e70-9f32-dedd975aab01	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	EXCELLENT	f
acf4821a-3ec6-4d94-bbfa-05272bd2d885	8fa5f694-d7a7-49c2-98a2-e1aecdc80d3e	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
08eede06-3651-4778-9174-39426283ad8e	91a00bae-00db-464f-8376-591e16a5a811	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	EXCELLENT	f
c75f2472-6d5f-4c37-af0f-c15d86841cec	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	GREAT	f
97b6075f-ca02-4170-937e-6213b72aadcd	b1ef84a7-2238-4946-bd2d-97aae138bbad	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	EXCELLENT	f
ba0fba82-1c14-42ea-9064-36a1fa198d0c	1461587b-fedd-4cb1-a122-58dd9ddc3fd9	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
7d2b1d32-3c03-46f1-8d9b-90b1fffe23ab	00179acc-3d3c-496f-98db-fb88756116f4	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	GREAT	f
5f0178a2-3760-4b22-a094-d3903ed2c82c	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti ui avovesialtaassa hyväntuulisena, vaikka vesi oli kylmää. Hän jaksoi treenata koko harjoituksen ajan ja kannusti muita uimareita.	f5a560c0-2dc6-4f39-8158-9c222339bb04	t	\N	GREAT	f
b1a3b70e-b894-4e2c-857b-ae7c204ad8f2	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa osallistui uintitreeniin ja yritti parantaa tekniikkaansa. Vaikka hän ei ollut nopein uimari, hän pysyi positiivisena ja kannusti muita osallistujia.	f5a560c0-2dc6-4f39-8158-9c222339bb04	t	FAIR	GREAT	t
70c81f4b-556a-4e50-b01e-20d4448adf8c	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui tanssitunnille ja harjoitteli latinalaistansseja, kuten salsaa ja cha chaa. Hän ei ollut aivan rytmissä koko ajan, mutta nautti tanssista ja oppi nopeasti.	beee4734-91f2-424a-b01d-70bb610bfcbc	t	GOOD	GREAT	f
e1c1f966-74cd-4491-9b77-68a3e564d6e1	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	3d125050-5d36-48e1-b651-e899e9461f2f	t	GREAT	GOOD	f
34b78791-d2a6-4394-865b-0d6e8c57cd8e	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	3d125050-5d36-48e1-b651-e899e9461f2f	t	FAIR	GOOD	f
b3d9166a-1c95-4a34-b42f-69eb00d79ac5	14c62b14-21d5-468c-b04f-89d60b2efc76	Huono suoritus	3d125050-5d36-48e1-b651-e899e9461f2f	t	POOR	GREAT	f
4bc165b1-c0d2-4d5e-b632-d59efb65f706	1556394a-6336-4838-8943-19088ecdf5e0	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
fb38d2d4-fddd-4497-ad74-87473f00a0e3	3e62f535-90a9-4a75-9748-27ea0d491a54	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	GREAT	f
96372459-c54c-4ddd-85f3-a81bca9cef6e	fb78d640-ca97-407e-9d2b-6390b8a2c77d	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	GREAT	f
43436bca-2154-446d-97e1-10a1908ee347	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	GREAT	f
0f5a7a62-3a9a-47a4-8b27-6f976bf1ccec	69fec935-4bcd-43ab-9737-a524627dbe1e	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
833395ba-0197-4e50-abe1-0215cf87f891	1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	EXCELLENT	f
8c8d7b3e-01b2-4c94-9be4-2670a0e78e97	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	EXCELLENT	f
b13e8184-b5ab-42e4-8cc5-82388a7321d0	ad671202-0d1b-4b31-a2fc-9fa9032f3b33	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	EXCELLENT	f
87eca96b-7a33-41e0-802a-9e7c6e6ff8db	f4eb73ad-9a1f-4b7b-8899-b2a07ff4db2d	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
c34db0d7-0550-4852-9537-3b383984964a	e47d29de-6a02-4e63-a52a-964fc17b744e	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	EXCELLENT	f
3aeec542-e4e6-4ea4-aae6-e3f491df5c4f	aa420673-c8ba-41da-9ee4-061022bb4a51	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	EXCELLENT	f
0beca8e4-3094-4a32-ac54-1b432647d7c2	75bba92f-9f9c-47c0-a89a-2add75007cf6	\N	897dbbdb-d0ed-4270-8ce4-8c34c3d21c8e	f	\N	\N	f
875b913e-8a11-48d5-8b68-e7c778ab421f	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa osallistui vesijumppaan ja teki liikkeitä energisesti. Hän auttoi muita osallistujia ja oli positiivinen koko tunnin ajan.	48b97ca2-cc28-4f63-a14b-26fb8422ff2f	t	GOOD	EXCELLENT	f
3f02c3bf-1804-4c44-a31c-41e2b856f2ab	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui vesijumppaan uimahallissa. Hän treenasi erilaisia liikkeitä vedessä ja keskittyi kunnon kohottamiseen. Hän auttoi myös muita ja oli innokas oppimaan.	9e17426f-5a97-4d62-bca8-25a9312e1367	t	GOOD	EXCELLENT	f
4240fd09-2763-4592-b118-4f0ccf6d0706	84c79ed7-b6e3-488d-93e7-0462a6e51139	\N	7c46e884-cea8-4a7b-9e12-15b555eaa4d7	t	GREAT	POOR	f
934ccb48-4064-467c-a759-91025f033aaf	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	7c46e884-cea8-4a7b-9e12-15b555eaa4d7	t	GOOD	FAIR	f
8c471d15-b8f4-48c7-95af-8403ce1889da	404347be-f571-4254-b055-a06e9a9962f9	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	GREAT	GREAT	f
898933aa-e3b0-4a8f-a095-6f26a1fb7db1	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	GREAT	GREAT	f
de03bc7a-444f-40d2-8fad-1b753d9d2ffe	799b59e5-c962-4f19-9f9d-01518c57a550	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	EXCELLENT	EXCELLENT	f
62cf930f-d971-4e3a-9438-9afb7b1c81ea	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	GOOD	GREAT	f
d475ccc7-f2d9-4c74-87ea-12b9a959e007	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	EXCELLENT	EXCELLENT	f
bfcd5b46-6262-4dcf-ae1e-f828587b4938	74e88236-472e-41ea-9475-73c94489ae2e	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	GREAT	GREAT	f
9a1df874-58b7-414f-bd3a-29fc23340f3c	2e03b196-3248-4f14-9f2d-4661e503665d	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	GREAT	GREAT	f
b9c4107f-2669-443f-9acb-a7e6264ee708	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	GREAT	GREAT	f
8f725226-7e39-428f-91e5-dcc256d11932	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	GREAT	GREAT	f
9dc83403-d9a7-4190-8b20-c3cd9262870d	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	EXCELLENT	EXCELLENT	f
46d0a6ae-5e0f-44a8-8816-0ee56322845f	b9266745-39ba-4be3-b1a1-421801b79832	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	GREAT	GREAT	f
fcad02d2-7c3a-44cd-9354-f0e82344e20a	686241e9-7a4e-4eb6-bc99-26699999001b	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	GREAT	GOOD	f
a1f4ef04-b4b4-4630-b633-15ea1a60cd07	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	GREAT	EXCELLENT	f
8e409e1f-80f3-4121-8aa3-7fb669f13ead	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	GREAT	GOOD	f
cfd47f03-20e2-4a55-a77b-fb4319237e2f	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	GOOD	GOOD	f
e98f7cd5-2690-490c-8e8d-32df88b4bf0f	1e2db5dd-c171-460e-bf48-4bc55f04f49e	Poissa	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	\N	\N	f
48bb1997-4836-404f-a964-70a74a1e2a19	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	GREAT	GREAT	f
c303b380-d051-4d36-974e-1cf0b1fa1313	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	GREAT	GREAT	f
b14d2209-152f-4769-841b-26cfa73d8e69	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GOOD	GOOD	f
0f17a0a4-b1c7-48cc-885a-e5c707bcd701	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	EXCELLENT	GREAT	f
974292e2-2136-4b5e-9383-b045b4953b39	350594d5-5cd4-4033-9294-6b50102afe7d	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GOOD	GOOD	f
c4999d7f-59cc-40b8-93c1-d466ce93ffce	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GREAT	GOOD	f
7147e481-7e2e-4d21-a34d-df7f44634389	24007058-ca39-4c69-9004-c3d29b441fb3	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GOOD	FAIR	f
25f4050a-7067-442f-a542-4ffb35acf651	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Poissa	53ede09d-132a-4e8b-9ceb-c2247582a256	t	\N	\N	f
09c9a628-6471-49ac-8351-1b8f08422bfc	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GREAT	GOOD	f
46b5f105-4a7d-40fa-9e09-33cfeb38698b	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GREAT	GREAT	f
de2a56b8-d616-4a6a-ba16-06cf03eb23cd	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GREAT	GREAT	f
3f048181-b4fe-47e9-b043-0ab5152587eb	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GOOD	GOOD	f
c673b681-fe6d-4091-abdc-41e4f1865661	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GOOD	GREAT	f
b525f068-232a-4bca-8001-c863a95e7660	df05106e-6e95-4a82-af93-c5f6f8a58047	\N	5653b8aa-7777-4a3d-a704-73a5dbaf52ff	t	\N	\N	f
031f03e7-4d5b-4716-9b7f-334a9a6368bc	24bd87c1-454d-412e-a843-595ffdc4892b	\N	5653b8aa-7777-4a3d-a704-73a5dbaf52ff	t	\N	\N	f
3cb3ae2e-8fee-4b92-81c8-0777f90eb415	e459564c-d6aa-4fec-8790-508218a41435	\N	5653b8aa-7777-4a3d-a704-73a5dbaf52ff	t	\N	\N	f
4201dace-4e48-4fde-b89b-209891b5e038	c99cbc5a-d88b-4022-bc5a-aae33f51e30b	\N	5653b8aa-7777-4a3d-a704-73a5dbaf52ff	t	\N	\N	f
f99e7982-1c53-4592-80a5-9a5eb529b0b3	b05b035e-4867-40c1-965e-f60630bfa457	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GOOD	GOOD	f
91086a34-2f08-4a45-91c7-afaf3da6a35c	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GREAT	GOOD	f
afa0e409-3968-4bb3-9e2b-25dbdf8aa5b5	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GOOD	GOOD	f
094035fc-071b-4327-ad82-583ae5853284	720863b3-15b5-4928-b516-5a8ec0cee764	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GREAT	GREAT	f
4b26b006-415e-4eb6-822a-81ac6262f28b	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GREAT	FAIR	f
a380826c-3913-4665-8d38-0128b2dc7b0f	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	GOOD	GOOD	f
4dbeda2c-5fe7-4bce-9f9c-d194fe0184c2	75bba92f-9f9c-47c0-a89a-2add75007cf6	Vaikka Matilla oli vaikeuksia voimisteluliikkeiden kanssa, hän osallistui harjoitukseen hyvällä asenteella ja yritti parhaansa.	78187248-1c3a-4f9d-80c5-a7d1a3ccafb8	t	POOR	\N	f
fec405b7-f671-46f7-b551-3f3075174038	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa nautti retkeilystä järvellä ja teki tasaisen vauhdin koko 8 kilometrin lenkin. Hän otti kuvia ja nautti luonnon kauneudesta ympärillään.	c04c12d5-e621-4254-9751-63ebe4dcd439	t	GREAT	GREAT	f
e311d630-1d60-4f19-a68c-cf04f2a4592b	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo pelasi jalkapalloa koulun pihalla kavereiden kanssa. Hän osoitti hyviä taitoja ja teki pari maalia. Hän kannusti joukkuetovereitaan ja nautti pelistä.	897dbbdb-d0ed-4270-8ce4-8c34c3d21c8e	t	GOOD	GREAT	f
37b84358-ffdd-4b80-836f-2ff8cdb70e35	e459564c-d6aa-4fec-8790-508218a41435	\N	3010d047-8156-4014-89a2-b25dd01d0e9c	t	EXCELLENT	GREAT	f
0fd312ba-4192-440e-8534-e95c541350ec	df05106e-6e95-4a82-af93-c5f6f8a58047	\N	3010d047-8156-4014-89a2-b25dd01d0e9c	t	EXCELLENT	EXCELLENT	f
a00a73b5-b399-4b2c-ac85-3129578dbe64	24bd87c1-454d-412e-a843-595ffdc4892b	\N	3010d047-8156-4014-89a2-b25dd01d0e9c	t	EXCELLENT	GOOD	f
00d46b39-e47a-4dec-b6fc-e80d1431c17e	c99cbc5a-d88b-4022-bc5a-aae33f51e30b	hirmu hyvin meni	3010d047-8156-4014-89a2-b25dd01d0e9c	t	EXCELLENT	EXCELLENT	f
c37f495d-f5dc-4b74-81fa-c2ae42700be1	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa osallistui luontojoogaan aktiivisesti ja keskittyi hyvin harjoitukseen. Hän auttoi muita osallistujia tarvittaessa ja nautti ulkoilmasta.	d54b8c42-67e5-49a5-85f3-f163230de4a7	t	GREAT	EXCELLENT	f
6fc45ea2-a099-4ecb-aea6-95c81b6baa03	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo nautti luonnonkauniilla polulla lenkkeilystä. Hän piti hyvää vauhtia yllä ja auttoi muita osallistujia vaikeissa kohdissa. Maisemat olivat upeat ja Teppo jakoi iloaan muiden kanssa.	726ca314-dc27-480f-923d-10f9c840d1a0	t	GOOD	GREAT	f
816d3163-30fd-42e5-a06d-cd14b26c8aa0	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	eb6afa70-0356-4ff7-8f48-b8ce7abc8ae1	t	GREAT	GREAT	f
3fd7f296-cade-4744-9509-3c73489b0fca	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti nautti kansallispuiston retkestä ja jakoi mielenkiintoisia tietoja maisemista ja luonnosta muiden kanssa. Hän auttoi muita tarvittaessa ja piti ryhmän yhtenäisenä.	ffcf41a8-c5c9-406d-8062-a9f9f40bf827	t	GREAT	EXCELLENT	f
19dbf977-f373-452e-b2c0-60094f59a985	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa pelasi sählyä innokkaasti, vaikka pallon käsittely ei ollut vielä täydellistä. Hän kannusti joukkuettaan ja oli positiivinen.	87721bf9-2237-4429-9e23-587ae97d05c1	t	FAIR	GREAT	f
232493f8-c7e8-442b-9151-521366e2f70c	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa nautti lenkkeilystä luonnonkauniilla polulla ja jakoi mielenkiintoisia havaintojaan maisemista muiden kanssa. Hän oli hyvässä kunnossa koko lenkin ajan.	726ca314-dc27-480f-923d-10f9c840d1a0	t	GOOD	EXCELLENT	t
fc477da0-188e-44d7-bb04-36241bca2e3e	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui tanssitunnille ja yritti oppia uutta koreografiaa. Hänellä oli vaikeuksia muutamien liikkeiden kanssa, mutta hän ei luovuttanut ja jatkoi yrittämistä.	f9bbb84d-acab-4b52-a890-43dc7709963f	t	FAIR	GOOD	f
6447e58a-c247-4900-aaf6-b3bb03384865	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui hiihtoretkelle ja hiihti noin 8 kilometrin lenkin. Hän kaatui muutaman kerran, mutta päätti jatkaa ja paransi tekniikkaansa matkan varrella.	c04c12d5-e621-4254-9751-63ebe4dcd439	t	FAIR	GOOD	f
6731f3c3-de21-45db-a0e9-433c40dffc4d	344890ff-a10d-4801-992d-36bcbcc43663	Ei paikalla	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
76a66d45-24ad-4d3f-950f-13d9047b5412	a71c4a77-39cd-4672-a59a-0394bec62fcf	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
cd5e12b7-ba03-449b-8a12-e864bab370e0	f179052b-20ed-4b30-92df-04ae478b0f06	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
25945954-4214-4349-960f-4f4e453c130d	74ff2516-b259-4f3d-b68b-dbc5c29d6daa	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
4f561cdb-daea-45b2-b782-c5f4a44da58f	1b5d1532-f11c-4b7a-bb15-8754ae38223f	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
6ca3f069-0a68-4cb7-b786-30e94e08656a	0d410afb-beb1-4ac1-883c-f4d19f5f858f	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
7c0b003f-f89a-478e-8465-7066d02d1d51	88c69065-37d1-45f2-a48a-a7b12a0694cf	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
46992e53-eb68-44cd-bc09-eb4bac9def01	92d51cc4-7e8c-4bcf-84b8-b3f4cad005cc	Ei paikalla	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
5d9168ca-ec02-4b63-9d02-21ffc0d33302	12acc9ab-19a4-404d-b072-4760f41732dd	Loistavaa työskentelyä. Mukana kaikessa. Kokeili ja otti osaa.	4d3fddca-2214-40dd-aa09-3f4031174783	t	GOOD	GREAT	f
4d85fd7d-1ddb-4b24-825d-68667775f652	d6bae43b-c9c1-42c3-bd74-736d3be6e4f2	Taitavaa pelaamista, erinomaista työskentelyä.	4d3fddca-2214-40dd-aa09-3f4031174783	t	EXCELLENT	EXCELLENT	f
a5df7baa-97da-4307-a391-80485f95815b	8a993418-3f13-49b4-bb21-93368d8f7a50	Mahtavaa työskentelyä. Huippuhyviä lyöntejä!	4d3fddca-2214-40dd-aa09-3f4031174783	t	GREAT	GREAT	f
52dcb52a-570e-45ca-9751-52075134e822	60c35aef-6137-44dc-b5d6-b796f1443148	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
95b470e1-2292-4831-93a3-685d490d1f4a	7e57c1d9-b037-4ae6-a0c9-2b409b90f748	Vältteli osallistumista koko alkutunnin. Tsemppasi loppua kohden pelatessa.	4d3fddca-2214-40dd-aa09-3f4031174783	t	FAIR	FAIR	f
\.


--
-- Data for Name: EvaluationCollection; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EvaluationCollection" (id, date, type, description, "environmentCode", "classYearId", "learningObjectiveCodes") FROM stdin;
46baaad5-0f6b-4af5-b454-2895ec00965c	2023-05-05 00:00:00		Pesäpalloa (heitto-kiinniotto) / tytöt	LI_PALLO	72d704a8-e209-4255-a595-40d96c4d42ad	{T2,T8}
7b28f9fd-4ecb-4da4-80d8-827355d10caf	2023-04-21 00:00:00		Jalkapallo ja soikkis /tytöt	LI_PALLO	72d704a8-e209-4255-a595-40d96c4d42ad	\N
b38a9a41-599f-4d1a-86df-12346e38a933	2023-04-22 00:00:00		\N	LI_LUONTO	230317b4-fb83-4092-8da4-e641aadb600b	{T3,T7}
15cf1b92-14da-40cf-a53f-34d44b71a6a8	2023-04-24 00:00:00		\N	LI_PALLO	7088e255-6c73-4fa3-8699-3ecf9dbe5964	{T3,T1}
2dd473a1-eeec-4ead-8ff5-4f3a799e027f	2023-04-25 00:00:00		Lentopallo	LI_PALLO	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	{T3,T1}
c00a27a4-7ce1-45c0-8696-703841932620	2023-04-26 00:00:00		\N	LI_PALLO	7088e255-6c73-4fa3-8699-3ecf9dbe5964	{}
ecb94bbf-9d0c-4296-87ff-4b86b43c05da	2023-04-26 00:00:00		Jalkapallo	LI_PALLO	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	{}
250881ed-bf2f-46e4-bc10-f45afabad6e9	2023-04-27 00:00:00		Selviytyjät salissa (tytöt)	LI_MUU	ac83bfa3-9f44-4aea-aac0-98e793367206	{}
d3f9b80b-0d2f-4545-adeb-9483c6e86873	2023-05-02 00:00:00		\N	LI_PALLO	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	{T2,T7}
798f36d8-d78e-4297-a3ff-9955098ddb1c	2023-04-13 00:00:00		Tytöt: Aerobic ja sulkapallo	LI_PALLO	ac83bfa3-9f44-4aea-aac0-98e793367206	\N
2adfd36f-10bd-428b-9dfa-03225457702a	2023-04-14 00:00:00		Kuntonyrkkeily (peili, reaktiopeli)	LI_KUNTO	72d704a8-e209-4255-a595-40d96c4d42ad	\N
462597ed-4611-43cc-8934-bb00e8fe2a6c	2023-05-03 00:00:00		\N	LI_PERUS	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	{T8,T3}
d08a4fbb-2ac9-4703-aa59-fc4ca3052473	2023-05-03 00:00:00		Selviytyjät	LI_PERUS	7088e255-6c73-4fa3-8699-3ecf9dbe5964	{T3,T8}
4a59ecd5-3ab8-4006-b897-c5daa1641016	2023-05-03 00:00:00		\N	LI_KUNTO	230317b4-fb83-4092-8da4-e641aadb600b	{T3,T1,T10}
14ffde4f-95ab-4cc3-8694-b92f686159f1	2023-05-10 00:00:00		Plogging	LI_PERUS	6d55867f-186d-4f87-8317-17cb8d0fd463	{}
efe31604-e6fc-418e-ba94-4cc9b5955ef8	2023-03-17 00:00:00	Pariakrobatia	\N	LI_VOIM	1e492cde-5525-44dc-b82f-6a34dd7eb995	{T3,T1,T8}
3d125050-5d36-48e1-b651-e899e9461f2f	2023-05-11 00:00:00		\N	LI_LUONTO	ba4535ec-16b4-4070-8a70-83cbe8b51340	{T2,T1}
30371d14-fe98-4817-a945-0f0c5bad3b84	2023-05-15 00:00:00		Frisbeegolf	LI_LUONTO	7088e255-6c73-4fa3-8699-3ecf9dbe5964	{T4,T6}
726ca314-dc27-480f-923d-10f9c840d1a0	2023-04-10 14:00:00		Luonnonkauniilla polulla lenkkeilyä. Polku oli mäkinen, mutta maisemat olivat upeat. Lenkin kesto oli noin 45 minuuttia.	LI_LUONTO	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1,T2,T3,T4,T5,T6,T7,T8}
48b97ca2-cc28-4f63-a14b-26fb8422ff2f	2023-03-23 10:30:00		Pallopeliä ulkokentällä. Pelasimme tennistä kavereiden kanssa. Peli oli tasainen ja lopulta päättyi 6-4.	LI_PALLO	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T3,T4,T5,T6,T7}
f9bbb84d-acab-4b52-a890-43dc7709963f	2023-04-09 09:00:00		Tanssitunti tanssikoululla. Harjoittelimme uutta koreografiaa ja se oli haastavaa, mutta myös hauskaa. Tunnin kesto oli 60 minuuttia.	LI_TANSSI	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T2,T6}
b1876b9c-23cd-46d2-aa93-b7980fbca7a2	2023-04-05 15:00:00		Perusvoimistelutreeniä voimistelusalilla. Treenasimme erilaisia liikkeitä ja hyppyjä. Treenin kesto oli 90 minuuttia.	LI_PERUS	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1,T2,T3,T4,T5,T6,T7,T8}
beee4734-91f2-424a-b01d-70bb610bfcbc	2023-03-30 15:30:00		Tanssitunti tanssikoululla. Tällä kertaa harjoittelimme latinalaistansseja, kuten salsaa ja cha chaa. Tunnin kesto oli 60 minuuttia.	LI_TANSSI	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1,T3,T4,T5,T7}
4f42caa2-bcc4-47e8-bab9-1ef88e9382c2	2023-05-19 00:00:00		\N	LI_VOIM	1cc91b32-fe7b-4efe-8b2e-d9cc852d7600	{T2,T1}
4e2afd6f-5320-419c-bd50-314fcddaee44	2023-06-01 00:00:00		\N	LI_PERUS	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1}
7da6191b-7f47-44e2-a246-68effa8168dc	2023-06-21 00:00:00		\N	LI_VESI	89d861be-d5e9-41a3-8672-d977b0895d54	{T1,T7}
3ca2f6e3-1bcc-4ab3-ba64-1440cdaf8019	2023-07-29 00:00:00		\N	LI_VOIM	1cc91b32-fe7b-4efe-8b2e-d9cc852d7600	{T3}
1e80e956-c012-4d76-a01a-0d32007da1db	2023-04-21 00:00:00		\N	LI_MUU	0497a2a4-6124-40dc-92d6-8fe3b708331e	\N
5ce16688-56df-465d-bfb4-04d94f86a484	2023-03-21 00:00:00	Pesäpallo		LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
7488ce86-5522-45d1-bf90-c8d8604ca3ca	2023-04-01 00:00:00	Baletti	\N	LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
b54b2774-53ec-4efe-9957-926827ff6edb	2023-03-27 00:00:00	Koripallo		LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
dd81081e-3ed6-4807-99e9-988af80153fc	2023-03-19 00:00:00	Sähly		LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
abe03f46-f878-4284-84e4-de5857f87209	2023-04-10 00:00:00		\N	LI_VESI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
49f4d3a8-22b6-4f9f-bb7b-17d5d7b4c422	2023-04-10 00:00:00		Moimpi	LI_LUONTO	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
d2ff8b16-ae97-456c-89a1-4a42be951b3c	2023-03-31 00:00:00	Baletti	\N	LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
de687f93-05ec-4f40-b524-15aefde3eeb2	2023-03-27 00:00:00	Sähly		LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
bca98182-4fea-4c2b-b829-6745f99e0321	2023-03-23 00:00:00	Sähly		LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
16ebda74-3df2-4ee7-82e2-87d7ece3ac1e	2023-04-10 00:00:00		\N	LI_VOIM	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
a6253c81-d539-4022-8bf3-45c7eee9cc2d	2023-04-19 00:00:00		\N	LI_VOIM	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
10c08368-0fd8-4687-8ed7-a7a4f34d7776	2023-04-10 00:00:00		Tanssi!	LI_TANSSI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
1e597269-f460-4a88-9702-2d4f420c0f00	2023-04-10 00:00:00		Moimoi	LI_LUONTO	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
4112bf6a-81c2-4200-a662-ee7fa06787c4	2023-04-24 00:00:00		\N	LI_VESI	230317b4-fb83-4092-8da4-e641aadb600b	{T6,T7}
568d601e-2dff-47f1-96a4-bd823b8aadae	2023-04-25 00:00:00		Huispaus ja reaktiopelejä	LI_PERUS	797914c3-3e04-4caa-8468-830bcc09659b	{T1,T2}
9a7635bd-a52c-475a-b16c-35786e52a5a8	2023-04-26 00:00:00		Jalkapallo, soikkis, rekkitemppuilu, tervapata	LI_PALLO	de31e354-3f10-499e-b9b8-7c17616175c8	{}
8e8599bd-97ff-4679-839f-4d0a618177ea	2023-04-27 00:00:00		\N	LI_VESI	decdfebc-8865-4884-85e2-532e1324b324	{T5}
c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	2023-05-02 00:00:00		Viivi, Ilari ja Taimi opettajina	LI_MUU	797914c3-3e04-4caa-8468-830bcc09659b	{}
74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	2023-05-03 00:00:00		\N	LI_TANSSI	230317b4-fb83-4092-8da4-e641aadb600b	{T3,T8}
2f72c229-ca83-4d7d-8620-11e6e77a5897	2023-05-03 00:00:00		\N	LI_TALVI	230317b4-fb83-4092-8da4-e641aadb600b	{T3,T8,T10}
1a72ed87-cce4-4240-83f7-6111c6ccf364	2023-05-04 00:00:00		\N	LI_PALLO	ac83bfa3-9f44-4aea-aac0-98e793367206	{T8,T3}
4dde4440-0413-45ca-a645-8f0adf8d2622	2023-05-08 00:00:00		\N	LI_PALLO	b83c3bfe-9b2c-417b-a955-5d725e54f94e	{T1,T3,T8}
8e4f3eb4-215f-44ff-bc5d-8284be416d0d	2023-05-10 00:00:00		Koripallo/ropeskipping	LI_PALLO	7088e255-6c73-4fa3-8699-3ecf9dbe5964	{}
7c46e884-cea8-4a7b-9e12-15b555eaa4d7	2023-05-11 00:00:00		\N	LI_TANSSI	89d861be-d5e9-41a3-8672-d977b0895d54	{T1,T5}
02b88abf-86b9-4ce1-82e8-418cefa02b40	2023-05-09 00:00:00		Oli todella haastava suunnistuskeli, älytön sumu ja sade.	LI_LUONTO	230317b4-fb83-4092-8da4-e641aadb600b	{T2,T5,T10}
a75cd675-489c-4e09-8c33-ac8afd3063a0	2023-05-15 00:00:00		\N	LI_PERUS	0497a2a4-6124-40dc-92d6-8fe3b708331e	{}
1bf527f9-144d-408d-8340-9aa5d93ec871	2023-05-17 00:00:00		Pesäpallo	LI_PALLO	6d55867f-186d-4f87-8317-17cb8d0fd463	{T4,T1}
87721bf9-2237-4429-9e23-587ae97d05c1	2023-04-11 00:00:00		Sählyn pelailua sisällä salissa. Ensin harjoiteltiin pallon käsittelyä ja sitten pelattiin peliä. Peli oli 3 vs 3 ja pelattiin 2 x 10 minuuttia	LI_PALLO	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1,T3,T6,T8}
3b32ba2c-8635-438b-a1b3-015d980e0846	2023-04-04 19:00:00		Uintitreeniä uimahallissa.	LI_VESI	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1,T2,T3,T4,T5,T6,T7,T8}
d54b8c42-67e5-49a5-85f3-f163230de4a7	2023-04-06 18:00:00		Luontojooga ulkona puistossa. Jooga oli rentouttavaa ja samalla nautimme raikkaasta ulkoilmasta. Joogan kesto oli 60 minuuttia.	LI_LUONTO	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1,T2,T3,T4,T5,T6,T7,T8}
f5a560c0-2dc6-4f39-8158-9c222339bb04	2023-03-25 16:30:00		Uintitreeniä avovesialtaassa. Uinti oli hieman haastavaa, sillä vesi oli vielä melko kylmää, mutta keli oli kaunis ja aurinkoinen.	LI_VESI	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T4,T8}
a8c5e1fb-bb1a-4811-9b48-6faa29f4f619	2023-03-29 09:30:00		Kuntoilua puistossa. Teimme erilaisia lihaskunto- ja venyttelyliikkeitä puiston penkeillä ja portailla.	LI_KUNTO	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T2,T4,T7,T8}
ca0b4bb1-c094-42a5-b45f-2a1c02c4fe65	2023-05-23 00:00:00		\N	LI_VESI	decdfebc-8865-4884-85e2-532e1324b324	{T2,T4}
e21cd4c8-20e1-40ac-9a7e-cafc322dac96	2023-06-10 00:00:00		\N	LI_KUNTO	7088e255-6c73-4fa3-8699-3ecf9dbe5964	{T4,T7}
566dc2b8-667a-428f-bf64-2947669dae99	2023-07-08 00:00:00		\N	LI_TALVI	1cc91b32-fe7b-4efe-8b2e-d9cc852d7600	{T2}
64295e4a-7641-439d-8a7f-8e967149dde6	2023-07-29 00:00:00		\N	LI_VOIM	89d861be-d5e9-41a3-8672-d977b0895d54	{}
516e883e-2f2d-4cc6-be32-7ae7c52d31a5	2023-05-08 00:00:00		Tennistä ulkona	LI_PALLO	7088e255-6c73-4fa3-8699-3ecf9dbe5964	{T1}
117ab460-e5a7-4e15-a674-aed050c43bf5	2023-04-18 00:00:00		Sählypeliä.	LI_PALLO	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	\N
eae42717-f8ef-4cc4-bdbe-a7599e7bd261	2023-04-19 00:00:00		Koris (vanne, keppi -rinki)	LI_PALLO	6d55867f-186d-4f87-8317-17cb8d0fd463	\N
4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	2023-05-09 00:00:00		Tennis	LI_PALLO	797914c3-3e04-4caa-8468-830bcc09659b	{T3,T1}
efb25bc7-cd6d-4714-a6a9-14aaa5e31923	2023-04-19 00:00:00		Purkkis ja puuhippa	LI_LUONTO	7088e255-6c73-4fa3-8699-3ecf9dbe5964	\N
d92db901-9823-4102-b351-5d20f3c69b1f	2023-04-19 00:00:00		\N	LI_VOIM	f586e1b6-5297-4de1-8c7f-b7d76902ffc1	\N
94a4cc72-3f10-44c0-821c-382909222c00	2023-04-20 00:00:00		Kuntosali/jaffapallo -tytöt	LI_KUNTO	ac83bfa3-9f44-4aea-aac0-98e793367206	\N
fab75884-b991-40c8-a22f-b9366be377ca	2023-04-20 00:00:00		Soikkis, jaffa	LI_PALLO	797914c3-3e04-4caa-8468-830bcc09659b	\N
43d83271-76a1-453b-b117-72d4a3741fa6	2023-03-05 00:00:00	Sähly		LI_TALVI	ffe74adb-ab34-42bd-b305-eff26e32b6ba	\N
024a5d62-d90f-4f73-b293-3286175ca586	2023-03-05 00:00:00	Koripallo		LI_TALVI	ffe74adb-ab34-42bd-b305-eff26e32b6ba	\N
4aba8224-f510-48f7-912e-048ec687325f	2023-05-10 00:00:00		Jalkapallosovelluksia & soikkis	LI_PALLO	de31e354-3f10-499e-b9b8-7c17616175c8	{}
5653b8aa-7777-4a3d-a704-73a5dbaf52ff	2023-05-11 00:00:00		\N	LI_VESI	1cc91b32-fe7b-4efe-8b2e-d9cc852d7600	{T4,T8}
c3a67d69-4acc-4673-984e-1905a7b3833d	2023-03-11 00:00:00	Baletti		LI_TALVI	564ee2b5-5c55-4667-8732-f9f45d9ecd5a	\N
556446ed-89a7-43e4-b9b5-00abe95eceba	2023-03-11 00:00:00	Baletti		LI_TALVI	564ee2b5-5c55-4667-8732-f9f45d9ecd5a	\N
6f022179-e8e8-427f-b8fa-fb290acc84f4	2023-03-06 00:00:00	Kuviokellunta		LI_TALVI	564ee2b5-5c55-4667-8732-f9f45d9ecd5a	\N
cbfca445-6768-4260-a592-d182c295da43	2023-05-12 00:00:00		\N	LI_VOIM	89d861be-d5e9-41a3-8672-d977b0895d54	{T4,T5}
d0c10212-08a6-44f8-ad34-cc0edb65b78f	2023-03-16 00:00:00	Sisäpalloilu		LI_TALVI	ac83bfa3-9f44-4aea-aac0-98e793367206	\N
2859c556-656e-4367-a4b3-eeb0efa6bd86	2023-03-16 00:00:00	Sisäpalloilu		LI_TALVI	ac83bfa3-9f44-4aea-aac0-98e793367206	\N
a9f2c498-9fa5-4af6-897d-fdb395002668	2023-03-17 00:00:00	Sähly		LI_TALVI	ba4535ec-16b4-4070-8a70-83cbe8b51340	\N
02c4cd17-9f85-4047-9db1-4b13bc0da999	2023-05-16 00:00:00		Heittäminen, soikkis	LI_PERUS	797914c3-3e04-4caa-8468-830bcc09659b	{T2,T7}
fb2ac5a0-bd74-48ee-982a-f9f0a8fe8c75	2023-03-19 00:00:00	Koripallo		LI_TALVI	ba4535ec-16b4-4070-8a70-83cbe8b51340	\N
77b749a1-1322-4918-a8a3-75e5907d24c8	2023-03-14 00:00:00	Baletti		LI_TALVI	ba4535ec-16b4-4070-8a70-83cbe8b51340	\N
63411c6e-87fc-4c5c-bb5a-737114a53c2a	2023-05-17 00:00:00		Frisbeegolf	LI_LUONTO	de31e354-3f10-499e-b9b8-7c17616175c8	{}
39716719-b0c7-4f70-87eb-221191db0e11	2023-03-20 00:00:00	Koripallo		LI_TALVI	ba4535ec-16b4-4070-8a70-83cbe8b51340	\N
bcaee1c8-84d7-442a-8080-f8cd3b64d5c9	2023-03-20 00:00:00	Uinti/pojat		LI_TALVI	7088e255-6c73-4fa3-8699-3ecf9dbe5964	\N
d9f552e0-8d39-43a7-9274-dfb573e5dc72	2023-03-20 00:00:00	Sähly		LI_TALVI	ba4535ec-16b4-4070-8a70-83cbe8b51340	\N
7301039b-e03e-4faf-a594-45c33f925021	2023-04-02 10:00:00		Retkeilyä metsässä. Kävelimme noin 10 kilometrin lenkin metsäpolkuja pitkin ja ihastelimme kaunista luontoa.	LI_LUONTO	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1,T2,T3,T4,T5,T6,T7,T8}
9e17426f-5a97-4d62-bca8-25a9312e1367	2023-04-01 16:00:00		Vesijumppaa uimahallissa. Tunnin aikana treenasimme erilaisia liikkeitä vedessä, jotka oli suunniteltu erityisesti kunnon kohottamiseen.	LI_VESI	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T2,T3,T4,T5,T6,T7}
dda6bf2e-e54b-4d84-b5f4-991ebe0e3c89	2023-03-22 00:00:00	Sähly		LI_TALVI	ba4535ec-16b4-4070-8a70-83cbe8b51340	\N
1966f8dd-9773-4d94-a99b-f078a09f06f9	2023-03-22 00:00:00	Baletti		LI_TALVI	ba4535ec-16b4-4070-8a70-83cbe8b51340	\N
61dae344-c6b1-465d-890c-d542dcd25a4b	2023-03-22 00:00:00	Sähly		LI_TALVI	89d861be-d5e9-41a3-8672-d977b0895d54	\N
0b6aeb65-5d32-46cb-9c00-bb7579506258	2023-03-22 00:00:00	Koripallo		LI_TALVI	10c06372-82ec-47ed-962c-77553126f3ae	\N
79820907-8332-42aa-9f52-a85b12399a81	2023-03-22 00:00:00	Norsupalloa/koris/lenis		LI_TALVI	6d55867f-186d-4f87-8317-17cb8d0fd463	\N
f4a7e9cf-9517-4298-8105-bd53e48e58cf	2023-03-22 00:00:00	Norsupallo/lentopallo/koris		LI_TALVI	6d55867f-186d-4f87-8317-17cb8d0fd463	\N
4029717a-ba95-4c26-abfe-453df2616d81	2023-03-22 00:00:00	Ryhmäytymispelejä/käsijalista		LI_TALVI	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	\N
a5fa9792-b348-44fd-8ee8-e57e10c8955c	2023-03-22 00:00:00	Ryhmäytymisharjoitteita/käsijalista		LI_TALVI	7088e255-6c73-4fa3-8699-3ecf9dbe5964	\N
0eaa72d6-b26f-4e88-83f6-ea5067da86fa	2023-03-22 00:00:00	Kuntosali ja alkulämppä liikkasalissa (osa tytöistä uimassa)		LI_TALVI	de31e354-3f10-499e-b9b8-7c17616175c8	\N
598aa503-e92b-44e2-9eda-b8dd22dff167	2023-03-23 00:00:00	Baletti		LI_TALVI	7088e255-6c73-4fa3-8699-3ecf9dbe5964	\N
51983e05-c043-4a3e-8998-9f4c032cdf86	2023-03-23 00:00:00	Akrobatia/kehonhuolto		LI_TALVI	0497a2a4-6124-40dc-92d6-8fe3b708331e	\N
b1b09203-60c2-421a-a59c-9dbc126eb44a	2023-03-08 00:00:00	Hiihto		LI_TALVI	1e492cde-5525-44dc-b82f-6a34dd7eb995	\N
fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	2023-03-12 00:00:00	Hiihto		LI_TALVI	1e492cde-5525-44dc-b82f-6a34dd7eb995	\N
8c1fb18f-3e3f-4dd5-915e-91232a2d6845	2023-03-22 00:00:00	Välinevoimistelu	\N	LI_VOIM	1e492cde-5525-44dc-b82f-6a34dd7eb995	{T4,T7}
cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	2023-03-16 00:00:00	Tasapaino ja kamppailu	\N	LI_KUNTO	1e492cde-5525-44dc-b82f-6a34dd7eb995	{}
333de8c8-9cd3-4827-ab4b-3e3c169b8ecd	2023-04-05 00:00:00	Pesäpallo	\N	LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
0f675408-4e6d-4d94-b2be-4b1861874f24	2023-05-08 00:00:00		Eljas & Timi demo	LI_PALLO	797914c3-3e04-4caa-8468-830bcc09659b	{}
4c015819-9b68-4634-83d1-ee1114c9be59	2023-05-09 00:00:00		\N	LI_VOIM	230317b4-fb83-4092-8da4-e641aadb600b	{T4,T10}
6c860b01-a2bf-49dd-a838-e6dd8094c760	2023-05-11 00:00:00		Tenni/futis	LI_PALLO	ac83bfa3-9f44-4aea-aac0-98e793367206	{}
3010d047-8156-4014-89a2-b25dd01d0e9c	2023-05-11 00:00:00		\N	LI_PALLO	1cc91b32-fe7b-4efe-8b2e-d9cc852d7600	{T2}
d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	2023-03-27 00:00:00	Polttopallo/patjaralli/koris		LI_TALVI	7088e255-6c73-4fa3-8699-3ecf9dbe5964	\N
81b4100e-2f09-4436-87ef-a1f1de0f77ab	2023-05-12 00:00:00		\N	LI_VESI	0497a2a4-6124-40dc-92d6-8fe3b708331e	{T3,T1}
8bb3dae0-3796-4f58-a3f0-be09fae5ab11	2023-05-16 00:00:00		Frisbeegolf	LI_LUONTO	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	{T4,T6}
ca38d48b-f9f3-4528-a4cb-dd823869ce72	2023-04-13 00:00:00		Kehonhallinta	LI_VOIM	797914c3-3e04-4caa-8468-830bcc09659b	\N
937afab0-904e-4b0d-9c33-bf69db8b4e78	2023-04-17 00:00:00		Salibandy	LI_PALLO	7088e255-6c73-4fa3-8699-3ecf9dbe5964	\N
1ffb9b24-9a6c-4397-8870-e33932c269d7	2023-05-17 00:00:00		Ultimate & leikit	LI_PERUS	7088e255-6c73-4fa3-8699-3ecf9dbe5964	{}
66d2d829-a0e3-4d31-accc-ec37f5bc90c1	2023-04-18 00:00:00		Maalipallo & lentopallo.	LI_PALLO	797914c3-3e04-4caa-8468-830bcc09659b	\N
1b994224-f869-4001-9336-6c5d07fe8e39	2023-03-27 00:00:00	Hankipelit/sali/puntti		LI_TALVI	0497a2a4-6124-40dc-92d6-8fe3b708331e	\N
f204db7e-8c50-4205-8253-2c4295f4cc23	2023-03-28 00:00:00	Sähly		LI_TALVI	ba4535ec-16b4-4070-8a70-83cbe8b51340	\N
9ccac28e-da82-42b1-b5d1-d632e88c9009	2023-03-28 00:00:00	Sali/palloilu		LI_TALVI	0497a2a4-6124-40dc-92d6-8fe3b708331e	\N
e3c72671-2c10-4d64-95e1-107809ee55f2	2023-03-29 00:00:00	Koripallo		LI_TALVI	ba4535ec-16b4-4070-8a70-83cbe8b51340	\N
53ede09d-132a-4e8b-9ceb-c2247582a256	2023-05-17 00:00:00		Ultimate & leikit	LI_PERUS	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	{}
c04c12d5-e621-4254-9751-63ebe4dcd439	2023-03-24 19:00:00		Kuntosali treeniä. Treenasimme erityisesti ylävartalon lihaksia ja käytimme painoja ja kuntopyöriä.	LI_KUNTO	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1,T3,T5,T7,T8}
37cc680b-7525-48d5-8e86-2a2d35081c8b	2023-04-19 00:00:00		Purkkis	LI_LUONTO	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	\N
f4860d37-f4ca-4ba4-8970-6bb133f22cd3	2023-03-29 00:00:00	Sähly		LI_TALVI	89d861be-d5e9-41a3-8672-d977b0895d54	\N
c0076c27-405b-4dcc-a944-323b279d0986	2023-04-07 11:00:00		Pallopeliä hiekkakentällä. Pelasimme beach volleyn sijaan beach tennistä, joka oli hieman erilaista ja haastavaa. Peliaika oli 2 x 15 minuuttia.	LI_PALLO	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1,T3,T4,T8}
fb37655d-6494-4657-9055-5e6a24b61e2a	2023-03-29 00:00:00	Talviliikunta		LI_TALVI	decdfebc-8865-4884-85e2-532e1324b324	\N
556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	2023-04-19 00:00:00		Salibandy (pojat) kuntosali (tytöt)	LI_PALLO	de31e354-3f10-499e-b9b8-7c17616175c8	\N
cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	2023-03-30 00:00:00	Pehmopesis, sähly/lenis		LI_TALVI	6d55867f-186d-4f87-8317-17cb8d0fd463	\N
7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	2023-03-30 00:00:00	Pehmopesis / koris /Jaffa		LI_TALVI	7088e255-6c73-4fa3-8699-3ecf9dbe5964	\N
e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	2023-03-30 00:00:00	Pehmopesis/sulis/sähly		LI_TALVI	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	\N
c222d9c2-e979-47cd-b545-1803e2849a9e	2023-03-30 00:00:00	Uinti pojat		LI_TALVI	de31e354-3f10-499e-b9b8-7c17616175c8	\N
897dbbdb-d0ed-4270-8ce4-8c34c3d21c8e	2023-04-03 13:30:00		Pallopeliä koulun pihalla. Pelasimme jalkapalloa kavereiden kanssa. Peli oli tasainen ja lopulta päättyi 2-2.	LI_PALLO	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1,T3,T5,T7,T8}
1852c993-c666-42e9-8862-e2b9bd8f8a8d	2023-03-31 11:00:00		Peruskestävyystreeniä juoksuradalla. Juoksimme noin 5 kilometrin lenkin, joka sisälsi myös muutamia mäkiä.	LI_PERUS	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T3,T5,T7,T8}
0928afc3-d50e-4222-9adc-71d1c8dc4593	2023-03-27 17:00:00		Luontojoogaa rannalla. Joogasimme rannalla auringonlaskun aikaan ja tunnelma oli upea. Joogan kesto oli 60 minuuttia.	LI_LUONTO	ec5578dd-ad95-4279-be72-e0326b8cfd41	{}
321aacd4-f6e1-40f9-b5ab-ed36d65f0323	2023-03-30 00:00:00	Uinti pojat		LI_TALVI	ac83bfa3-9f44-4aea-aac0-98e793367206	\N
448295e4-1d25-49ac-80fe-8d2a6a4eab5b	2023-06-01 00:00:00		huihai	BI_KASVI	b369b11f-64ed-4278-83d7-588c59886416	{T1}
f68f104b-19b9-4dc8-8564-9b27d16cac5d	2023-04-01 00:00:00	Baletti	\N	LI_TALVI	7088e255-6c73-4fa3-8699-3ecf9dbe5964	\N
8bba79e9-bfce-472d-8985-8d06407b4558	2023-04-03 00:00:00	Uinti pojat	Topias ja Eelis tyttöjen kanssa	LI_TALVI	7088e255-6c73-4fa3-8699-3ecf9dbe5964	\N
b29e68a9-5dc8-436d-9d1c-e2dd279b8128	2023-04-04 00:00:00	Reaktiohippa+leikit, Keilapallo	\N	LI_TALVI	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	\N
f92aeb42-9586-4da3-8818-eed3150f288b	2023-04-05 00:00:00	Ulkona soikkista/fudista	\N	LI_TALVI	6d55867f-186d-4f87-8317-17cb8d0fd463	\N
0fc921ea-f723-4134-8f6d-6fdae9d7be79	2023-04-05 00:00:00	Ulkopelit (futis, ryhmäytyminen)	\N	LI_TALVI	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	\N
0c53145f-5fd0-441d-b345-a189164a3301	2023-04-05 00:00:00	Ulkoliikunta (fudis, kirkkis)	\N	LI_TALVI	7088e255-6c73-4fa3-8699-3ecf9dbe5964	\N
48198bbc-377e-4f03-bf33-307f2edeb01d	2023-04-05 00:00:00	Ulkofudis ja -ultimate sekä sali (pojat)	\N	LI_TALVI	de31e354-3f10-499e-b9b8-7c17616175c8	\N
c06cfc5e-69ab-4094-9271-424e0b4da95a	2023-03-31 00:00:00	Talviliikunta	\N	LI_TALVI	decdfebc-8865-4884-85e2-532e1324b324	{T7,T8}
788ded55-48ae-4d16-8db3-ff89f8b3b16d	2023-03-27 00:00:00	Välinevoimistelu	\N	LI_VOIM	1e492cde-5525-44dc-b82f-6a34dd7eb995	{T4,T1,T9}
b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	2023-03-29 00:00:00	Lentopallo	\N	LI_PALLO	1e492cde-5525-44dc-b82f-6a34dd7eb995	{T4,T2,T9}
7b64a526-c49e-409e-9df0-af1f507313b5	2023-03-31 00:00:00	Palloilu	\N	LI_PALLO	1e492cde-5525-44dc-b82f-6a34dd7eb995	{T2,T8}
c1740f10-c2df-470a-a4b0-547fb0ce7ae4	2023-04-06 00:00:00	Uinti (tytöt)	\N	LI_TALVI	ac83bfa3-9f44-4aea-aac0-98e793367206	\N
b1c2442f-23fc-4571-9701-2c795143537d	2023-04-07 00:00:00	Koripallo	\N	LI_TALVI	89d861be-d5e9-41a3-8672-d977b0895d54	\N
264c294a-1b7a-403a-8d88-eada1ec58baf	2023-05-09 00:00:00		\N	LI_PERUS	230317b4-fb83-4092-8da4-e641aadb600b	{T3,T1,T5}
0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	2023-05-10 00:00:00		Tennis	LI_PALLO	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	{T1,T2}
71a91b99-d2d2-4328-8d09-b34be35f4bc4	2023-05-11 00:00:00		\N	LI_LUONTO	1e492cde-5525-44dc-b82f-6a34dd7eb995	{T5,T8}
4d3fddca-2214-40dd-aa09-3f4031174783	2023-05-12 00:00:00		\N	LI_PALLO	72d704a8-e209-4255-a595-40d96c4d42ad	{T1,T3}
f3a6d9a9-1c87-4706-9cd3-47eb2c994fb4	2023-04-10 00:00:00		\N	LI_VOIM	89d861be-d5e9-41a3-8672-d977b0895d54	\N
619a1d3f-2b7d-4283-9a93-16c2562b6cea	2023-04-11 00:00:00		Palloilua korttipakalla. Alussa ryhmäytymistä.	LI_PALLO	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	\N
1eda1df4-9725-42f3-9b25-555230def13e	2023-04-12 00:00:00		Sulkapallo	LI_PALLO	6d55867f-186d-4f87-8317-17cb8d0fd463	\N
3b5e4736-250b-4785-b51e-1d40b0c2d7fc	2023-04-12 00:00:00		Olkahippa, käsihippa, otakiinnijaffa, sähly, keikapallo	LI_PALLO	37c6af4b-8b10-40a5-8ae3-1b01af624dc5	\N
a9f2c321-49f2-48ec-955f-ea21a6d78053	2023-04-12 00:00:00		Olka- ja käsihippa. Jaffapallo	LI_PALLO	7088e255-6c73-4fa3-8699-3ecf9dbe5964	\N
893df305-ade6-4f72-89c2-6c8bc016c25e	2023-04-12 00:00:00		Uinti (pojat)	LI_VESI	de31e354-3f10-499e-b9b8-7c17616175c8	\N
6ac64022-5671-4409-80a3-99a1dd020cfa	2023-04-10 00:00:00		\N	LI_VOIM	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
d555f364-a43b-4cd7-b441-36eba1399393	2023-04-02 00:00:00	Deporte X	Nos hicimos weones y volvimos	LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
e5229c63-bab4-43aa-b959-523054e27f69	2023-03-30 00:00:00	Sähly		LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
6d4d0b46-d8e4-434c-b242-675b378da3fb	2023-04-10 00:00:00		\N	LI_VOIM	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
6216742f-6ee1-4b07-bb6c-8ce031ede1dd	2023-03-23 00:00:00	Koripallo		LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
2a49b22f-e902-43cc-9785-493949f36824	2023-05-16 00:00:00		Ultimate & mölkky	LI_PERUS	797914c3-3e04-4caa-8468-830bcc09659b	{}
7a43853a-3729-48b6-83ff-bd9f21a4a9c9	2023-03-23 00:00:00	Pesäpallo		LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
abb65c1c-fb0f-44e8-84c8-c542fe24ef96	2023-04-08 16:30:00		Kuntosali treeniä. Treenasimme erityisesti keskivartalon lihaksia ja käytimme myös kuntopyöriä. Treenin kesto oli noin 90 minuuttia.	LI_KUNTO	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1,T2,T3,T5,T8}
3740b2c7-10fd-434a-b025-354507eb0597	2023-03-31 00:00:00	Koripallo	\N	LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
f4ed3757-8623-42a2-a683-4d550a9b6f65	2023-03-27 00:00:00	Sähly		LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
ffcf41a8-c5c9-406d-8062-a9f9f40bf827	2023-03-22 13:00:00		Retkeilyä kansallispuistossa. Kävelimme noin 15 kilometrin lenkin ja ihastelimme upeita maisemia.	LI_LUONTO	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1,T2,T5,T8}
78187248-1c3a-4f9d-80c5-a7d1a3ccafb8	2023-03-26 12:00:00		Voimistelutreeniä salilla. Treenasimme erilaisia hyppyjä ja liikkeitä, jotka vaativat hyvää tasapainoa.	LI_VOIM	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1,T2,T4,T6,T7}
8dbcba3f-35e0-4e19-83a3-e480a5ad4c39	2023-03-28 14:00:00		Pallopeliä salissa. Pelasimme sählyä ja ottelu oli tiukka. Peli päättyi lopulta 4-3.	LI_PALLO	ec5578dd-ad95-4279-be72-e0326b8cfd41	{T1,T4,T5,T8}
0e16a08a-76d4-4cc9-9f50-1903a928125c	2023-03-30 00:00:00	Koripallo		LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
2cae7ff5-26ca-4423-99c3-f46f8f454ea0	2023-05-19 00:00:00		\N	LI_VOIM	0dbc9116-4412-40d5-8271-5e949d4f20a6	{T4}
a25e0294-c261-4524-bdce-1038cfe49910	2023-04-19 00:00:00		\N	LI_PALLO	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
a5bc849c-03ec-40d3-9abd-4b68b93bcc7b	2023-04-10 00:00:00		\N	LI_LUONTO	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
20e39e40-87d9-4273-aaee-44fe27eb45a9	2023-04-10 00:00:00		\N	LI_VOIM	230317b4-fb83-4092-8da4-e641aadb600b	\N
5f8abc0c-3d0b-4a19-baf5-810c7144f275	2023-04-12 00:00:00		\N	LI_LUONTO	230317b4-fb83-4092-8da4-e641aadb600b	\N
539a7959-1d07-42ef-8fc4-a7d7dd4da344	2023-05-19 00:00:00		\N	LI_LUONTO	f586e1b6-5297-4de1-8c7f-b7d76902ffc1	{T3,T5}
d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	2023-05-03 00:00:00		\N	LI_VESI	230317b4-fb83-4092-8da4-e641aadb600b	{T6,T7}
f60cf3aa-428c-42ac-984e-6f4e8ebdef25	2023-03-29 00:00:00	Sähly		LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
c854e589-492b-4b38-97fe-1c8717aa68ac	2023-03-23 00:00:00	Sähly		LI_TALVI	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
10ba2787-61e0-4785-8dee-4a8a99414520	2023-04-10 00:00:00		Jojo	LI_LUONTO	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
e24d79d5-8e15-46b5-951d-f811b7670023	2023-04-10 00:00:00		\N	LI_VOIM	d492f954-cd06-4c86-8ce1-fff58bc72e38	\N
00dcbe25-4f69-4724-b33b-9d857f012479	2023-04-22 00:00:00		\N	LI_VOIM	0497a2a4-6124-40dc-92d6-8fe3b708331e	{T7,T2}
1edc3524-678e-4c03-9a19-001c89aa9f58	2023-04-24 00:00:00		Musiikkiliikuntaa / lenis	LI_TANSSI	797914c3-3e04-4caa-8468-830bcc09659b	{T1}
68af71a8-0626-451c-a0ba-597e762fd9dd	2023-04-26 00:00:00		Ryhmän keksimiä pelejä ja leikkejä:)	LI_PERUS	6d55867f-186d-4f87-8317-17cb8d0fd463	{T3,T8}
80f640f0-d041-41f1-9817-6c18f415a068	2023-04-27 00:00:00		\N	LI_PALLO	230317b4-fb83-4092-8da4-e641aadb600b	{T3,T8,T4,T9}
5ed7980d-fc19-430b-a7f1-985d0ac1eaac	2023-04-29 00:00:00		\N	LI_PALLO	0497a2a4-6124-40dc-92d6-8fe3b708331e	{T3}
eb6afa70-0356-4ff7-8f48-b8ce7abc8ae1	2023-05-02 00:00:00		\N	LI_VOIM	d492f954-cd06-4c86-8ce1-fff58bc72e38	{T2,T4}
6e21af79-6985-460d-852a-9efda75bcd5f	2023-05-01 00:00:00		\N	LI_KUNTO	d492f954-cd06-4c86-8ce1-fff58bc72e38	{T5,T4}
d473d712-cbe8-4568-bf44-e606e8ddee0d	2023-05-03 00:00:00		\N	LI_VOIM	230317b4-fb83-4092-8da4-e641aadb600b	{T4,T10}
\.


--
-- Data for Name: Group; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Group" (id, name, "teacherId", "updatedAt", "subjectCode", "currentYearCode") FROM stdin;
293d7530-587a-4b1a-b216-585601c65f30	Uusi luokka	a44319a9-1556-4e03-b825-48b8648a4699	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
7ceb709a-05c1-408b-912c-f8196c3b8694	Toinen luokka	a44319a9-1556-4e03-b825-48b8648a4699	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
176d8452-d61a-4115-9c3e-cfeb2c990daa	Kolmas luokka	a44319a9-1556-4e03-b825-48b8648a4699	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
a5e350b6-8d0e-40da-a480-a9146a6eb556	Neljäs luokka	a44319a9-1556-4e03-b825-48b8648a4699	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
8c596bfe-60ff-4649-a27e-bddc4c81aa7e	Uusi luokka	5b637712-3af1-46a2-aeb0-a4a016b134bc	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
f3bf4d11-99a7-4ec9-a8a5-cc5743424a92	Toinen luokka	5b637712-3af1-46a2-aeb0-a4a016b134bc	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
1dc7d4c5-27c3-49c4-80de-9afdd54d69a1	Testi luokka	5b637712-3af1-46a2-aeb0-a4a016b134bc	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
2701efce-305c-4914-b604-dcea230c2689	Herran huone	483e736f-00a6-46d1-a1c3-3099eb626012	2023-04-19 16:57:12.014	LI	PRIMARY_FIRST
0af98668-1b27-481f-a1c1-54b3d775ee51	Li 8a/8b	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-04-20 11:15:51.865	LI	PRIMARY_FIRST
69f26527-bdb1-4e38-b999-9f2481fd62f6	Testi luokka	5b637712-3af1-46a2-aeb0-a4a016b134bc	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
54fac98f-4253-487e-9e4e-e0ef4ae2443a	Testi luokka	8548a9c5-dfdb-48e6-936d-f221845157b4	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
b5e709c0-8913-42b6-82b0-04d702347380	Joku luokka	8548a9c5-dfdb-48e6-936d-f221845157b4	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
c3f1e3d5-7abc-44bb-bfa5-12a0fd2c6769	LI03	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-04-20 13:04:36.448	LI	PRIMARY_FIRST
aff9ac1f-ab9d-4d21-a161-408240f222d6	7B	1112c6f9-bfbf-4207-83cd-910ffe0582f2	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
eab532a9-07cc-4c9d-b11a-2d4ddb84996d	9A	1112c6f9-bfbf-4207-83cd-910ffe0582f2	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
54d739bd-6c9f-48df-850c-78a43ed48a61	13b	1112c6f9-bfbf-4207-83cd-910ffe0582f2	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
8eda8460-b4f6-4ed0-b43a-253608ef0298	Valinnainen LI 8a/8b	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-04-14 08:48:29.463	LI	PRIMARY_FIRST
c42525f7-172d-4d1f-9bf1-96bbed39414f	Nooran ryhmä	96549af2-ad08-4066-b742-cb1048b3876d	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
1811d42e-eb46-4b97-a067-8d91a4c60bd1	LI01	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
d2dd3387-7d32-4ab0-bafb-a04aa89621d6	VLI 9a/9b	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-04-19 07:07:11.778	LI	PRIMARY_FIRST
1dffd2ea-91a3-4f2f-a001-ca61df2631b8	Eka ryhmä	185a9cc2-8497-493f-94da-65abda04a320	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
9c0fff82-1597-4447-84d2-28051ef96223	LI 7b	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-04-19 14:28:01.278	LI	PRIMARY_FIRST
1d45a2c2-1ae0-4068-adf4-d09fb4d6f31d	6B	483e736f-00a6-46d1-a1c3-3099eb626012	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
e61dbeae-376b-4fac-bd5b-7441b0533ee9	LI 7a/a	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-04-19 14:32:33.021	LI	PRIMARY_FIRST
110c9dff-5530-4184-baf5-bb6bb05bb40f	LI 9a/9b	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-04-19 14:38:27.521	LI	PRIMARY_FIRST
88e7273d-605d-483a-ae82-2c548472a6ec	Tapitus	483e736f-00a6-46d1-a1c3-3099eb626012	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
2556b6a9-4cab-4b65-99fe-94f5cf5d9123	A	45f62aaf-431d-478a-96b2-629928472f0f	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
11f9a50c-6d6d-405e-882d-dd0d828980c5	B	45f62aaf-431d-478a-96b2-629928472f0f	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST
fde7c856-7b1b-4ca8-a624-67809c32bd65	Testiryhmä	e31f2fbf-4637-46e9-94c2-93f00a138edf	2023-05-19 11:44:05.791	LI	PRIMARY_FIRST
c65eb9ef-7f0b-48ec-8e07-29b20f9cfeb0	Jsjskdjsj	8548a9c5-dfdb-48e6-936d-f221845157b4	2023-05-19 13:25:26.995	LI	PRIMARY_THIRD
57d7802e-5dd9-44d2-a652-4185942f2b97	testiryhmä	6bcb2e61-7d1e-4697-9e41-93a8f62a3cd6	2023-06-01 10:17:04.501	BI	PRIMARY_SECOND
723f1c8d-8a79-4484-b31b-d2e4f7f50efd	toinen ryhmä	6bcb2e61-7d1e-4697-9e41-93a8f62a3cd6	2023-06-01 10:20:17.176	LI	PRIMARY_SECOND
23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f	4AC	4f38a727-897b-40d0-a974-cf8a7d2efda1	2023-04-22 12:40:09.521	LI	PRIMARY_FOURTH
0df0a9e8-d7d4-4a24-a2ad-e5f263696a27	Testi iso ryhmä	4f38a727-897b-40d0-a974-cf8a7d2efda1	2023-04-22 12:41:08.836	LI	PRIMARY_NINTH
556d49fe-2a7d-4818-8a64-3ecc6a59009c	Name	483e736f-00a6-46d1-a1c3-3099eb626012	2023-06-21 12:56:04.927	LI	PRIMARY_FOURTH
909b50c8-56c4-4618-bb55-e1a1feb7f1a9	Kettujen kerho	483e736f-00a6-46d1-a1c3-3099eb626012	2023-04-22 12:43:54.406	LI	PRIMARY_THIRD
f118eb20-2ff4-4bec-a6b7-458e97ef062d	Nelkut	94f0b047-8048-49a1-8578-889686e3127a	2023-05-03 19:49:12.607	LI	PRIMARY_FOURTH
562cb013-14e0-4d29-ae33-5ba1813dfec6	Testi pieni ryhmä	4f38a727-897b-40d0-a974-cf8a7d2efda1	2023-05-08 08:49:04.946	LI	PRIMARY_NINTH
668d593b-2679-480d-9c37-6a7f5d4fb257	Name	483e736f-00a6-46d1-a1c3-3099eb626012	2023-06-21 12:56:07.627	LI	PRIMARY_FOURTH
41f9142b-c05f-41c7-baea-7afafeabb8c7	8a	dc1c8071-ac93-4952-8c66-85fb342f98ea	2023-05-11 18:07:57.554	LI	PRIMARY_EIGHTH
018cd027-6fa7-468f-b53a-cee9bbf557cf	9A	483e736f-00a6-46d1-a1c3-3099eb626012	2023-07-28 14:54:31.966	LI	PRIMARY_FIRST
\.


--
-- Data for Name: Student; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Student" (id, name, "groupId") FROM stdin;
81f9f274-c50a-4b30-b0f5-15c1479b942c	Daniel	0af98668-1b27-481f-a1c1-54b3d775ee51
213addc7-6d5d-4a39-95bf-ded6afa510a6	Elli	0af98668-1b27-481f-a1c1-54b3d775ee51
dc43f223-8b76-457a-b035-8b186320bdea	Enni	0af98668-1b27-481f-a1c1-54b3d775ee51
2487435b-5598-4a44-bc31-f93ed8a2ec43	Pinja	0af98668-1b27-481f-a1c1-54b3d775ee51
8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	Aku	0af98668-1b27-481f-a1c1-54b3d775ee51
49c4aeec-3a4e-4761-b3cf-2546381857f7	Heidi	0af98668-1b27-481f-a1c1-54b3d775ee51
e533765b-6b86-4f98-b4e7-c8ed54669c04	Pettero	69f26527-bdb1-4e38-b999-9f2481fd62f6
fd8edc31-0986-455a-8ede-7e5f52bab3d8	Marjatta	69f26527-bdb1-4e38-b999-9f2481fd62f6
cbaa595d-ff23-4c6a-b537-62adcb859b43	Arvo	69f26527-bdb1-4e38-b999-9f2481fd62f6
b8bc48bb-2b86-415c-837f-dbad58dd3e2d	Eemeli	0af98668-1b27-481f-a1c1-54b3d775ee51
f826618b-cee5-4d6c-bcde-27e7a74a0b63	Liana	0af98668-1b27-481f-a1c1-54b3d775ee51
a2a3736c-4cbd-43f4-b8e4-8041a2b9d8f5	Vili	0af98668-1b27-481f-a1c1-54b3d775ee51
cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	Eetu-Viljo	0af98668-1b27-481f-a1c1-54b3d775ee51
7c413b7f-9005-43a9-9b44-1984a23ae65f	Konsta	0af98668-1b27-481f-a1c1-54b3d775ee51
f96609c4-4c21-4b74-8523-f2c3b78d4c49	Helmi	0af98668-1b27-481f-a1c1-54b3d775ee51
c7a9dddd-29a9-4698-991f-ecab63cf6fd0	Jermu	0af98668-1b27-481f-a1c1-54b3d775ee51
60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	Reetta	0af98668-1b27-481f-a1c1-54b3d775ee51
7b55eeb0-4468-4696-b2fd-a50a7e058ec5	Henry	0af98668-1b27-481f-a1c1-54b3d775ee51
25ba77b8-721c-4c32-b5c6-97ea194d2958	Aapeli	0af98668-1b27-481f-a1c1-54b3d775ee51
081d3462-484c-45f4-b7df-9eef1712d829	Eeva	0af98668-1b27-481f-a1c1-54b3d775ee51
d04c2d81-ce92-4221-990a-64c5e1142ee9	Kaspian	0af98668-1b27-481f-a1c1-54b3d775ee51
74c83e0a-3e21-4c01-b18a-a81f7e089d64	Juuli	0af98668-1b27-481f-a1c1-54b3d775ee51
9f830199-bde9-43a4-84e9-986992a1e3d3	Linnea	0af98668-1b27-481f-a1c1-54b3d775ee51
750d8c1e-30f2-49fc-a445-7acdb4bff78e	Aada	0af98668-1b27-481f-a1c1-54b3d775ee51
ad497eb6-6b41-4f04-97ac-cfff98b8cbae	Ilona	0af98668-1b27-481f-a1c1-54b3d775ee51
c4365db1-b405-4aac-ad56-4f21780797c0	Stella	0af98668-1b27-481f-a1c1-54b3d775ee51
5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	Maija	0af98668-1b27-481f-a1c1-54b3d775ee51
eac386e1-ca07-42b6-9817-50f1d1081903	Eedla	0af98668-1b27-481f-a1c1-54b3d775ee51
0d39a916-dd79-4bc8-b493-771b456ed8ce	Martti	0af98668-1b27-481f-a1c1-54b3d775ee51
e25eac4b-ed6a-433b-b311-c27ea3f1faa4	Väinö	0af98668-1b27-481f-a1c1-54b3d775ee51
4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	Kristian	0af98668-1b27-481f-a1c1-54b3d775ee51
423ad9ea-e868-49c8-a31d-1dbb6e0c4422	Ella	0af98668-1b27-481f-a1c1-54b3d775ee51
d37acd3c-5742-4ca1-b728-ac07ef43baad	Ekku	aff9ac1f-ab9d-4d21-a161-408240f222d6
7c5e53dc-057f-4e9f-adce-211491e0de78	Leevi	aff9ac1f-ab9d-4d21-a161-408240f222d6
5b490aa5-5292-4542-9b98-dfece57314f5	Leevi	eab532a9-07cc-4c9d-b11a-2d4ddb84996d
5b16baaa-2cae-425b-a704-7d93b3ee20b3	Eetu	eab532a9-07cc-4c9d-b11a-2d4ddb84996d
6f81f297-6909-4522-a0f2-9729833a2f97	Ekku	eab532a9-07cc-4c9d-b11a-2d4ddb84996d
a94818ef-1b6d-4489-8c0b-f1667cb7cb82	Mona	0af98668-1b27-481f-a1c1-54b3d775ee51
84c79ed7-b6e3-488d-93e7-0462a6e51139	Oppilas	018cd027-6fa7-468f-b53a-cee9bbf557cf
2c42a7d7-10ee-46d8-b057-103c9d3773d9	Toinen	018cd027-6fa7-468f-b53a-cee9bbf557cf
ffcd87aa-e63f-4a34-a82b-ec98c80ff979	Leevi	54d739bd-6c9f-48df-850c-78a43ed48a61
b9f75da6-4587-44ca-b3f3-a5bdbaa9fd90	Ekku	54d739bd-6c9f-48df-850c-78a43ed48a61
16c2d264-2e7c-452d-980a-114909d369f3	Eetu	54d739bd-6c9f-48df-850c-78a43ed48a61
789e18c3-638d-4651-be65-ec0a1661539f	Sakke M	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	Netta K	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
a722bd23-2313-44d9-a0c6-82a5270900a8	Leevi H	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
4fa0db05-161f-4165-b00c-52528866490c	Eetu K	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
d77c55c5-670a-4bc5-bf46-5ff9662077f6	Ekku S	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	Irmeli R	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
17a303e2-58b9-434a-b0e3-a3227ba197dc	Jalmari S	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	Sakari L	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
8cc39180-992f-41be-88d7-d798fc88abe0	Pietu F	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
45d76ed8-35ff-473d-b70c-92c0762d7a89	Perttu H	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
5a07f60b-4776-4160-947b-fe207b5d64e5	Merja K	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
55d97917-9df6-48ee-9afe-cbbfa0fe1796	Timi S	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
cac00e26-1bd0-47c3-b2a8-4eb754562d6d	Jaakko K	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
08d712ee-e2bc-4ca6-9660-fa986c4c4158	Jaska J	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
5e8a31cb-3ca8-4d0d-9489-dc20d318827b	Jonne K	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
d4a4ffc6-fd8b-45ae-82a2-f49d61729300	Sami M	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	Kalle V	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	Frans S	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
9a8e559f-1792-4dbf-b515-2bff3261aaf6	Severi X	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
14c62b14-21d5-468c-b04f-89d60b2efc76	Topi	1d45a2c2-1ae0-4068-adf4-d09fb4d6f31d
fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Mestarikettu	909b50c8-56c4-4618-bb55-e1a1feb7f1a9
c942743a-d10b-4460-bc99-44ea941f6f8f	Alina Ahola	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
f03779c1-9d87-439c-8d95-14e384c7d2c0	Olavi Hakaniemi	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	Saara Ikkala	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
e71cd959-78a0-4843-af83-1e8e741e7edf	Joosua Jaakonaho	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
05c4f013-bc9a-4155-925b-6f8485bb5378	Julius Jussinmäki	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
5bbc08f9-01e0-4911-9a6a-38790219ce2a	Ossi Järvinen	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
e1efe28e-64c5-402b-a692-0f795a6293c8	Lotta Kaistinen	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
148a28ac-012b-44c4-b684-87a00ace9c72	Anette Karhu	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	Fanny Lamminmäki	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
f4fc8254-27a5-4a0d-aca1-03b85e4020ab	Lauri Marjonkorpi	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	Sofia Melnikova	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
a639981f-4bf0-4871-b264-00ad02a9a286	Caius Montonen	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
c67dd576-d4c0-4d3d-82ec-9e20e69c629e	Taimi Pirttiniemi	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
36920386-dc0f-4b52-aacc-ca4b36d3ac9b	Reino Tuomi	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
bde08c48-5140-47eb-b28b-ce5c86ea8f46	Hilma Lipponen	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
932b4426-7f6d-46ff-a9c4-a9fc697ddc23	Stella Danska	23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f
983a1efb-e761-4777-8d54-2914bff556af	Moimoi	88e7273d-605d-483a-ae82-2c548472a6ec
5c6ab41c-30dc-4f02-9c31-4d691b5469e8	Noora	c42525f7-172d-4d1f-9bf1-96bbed39414f
c8e4a140-1c7a-4b6b-b04b-86711a322f58	Ekku	c42525f7-172d-4d1f-9bf1-96bbed39414f
fd559fc1-965a-485c-a34d-1a1d26b8a655	Miksu	c42525f7-172d-4d1f-9bf1-96bbed39414f
d8749772-8bf9-4840-a843-8c117837ade6	Leevi	c42525f7-172d-4d1f-9bf1-96bbed39414f
e9969c0d-58a3-4bcd-b301-5690b7290aa5	Onni	e61dbeae-376b-4fac-bd5b-7441b0533ee9
42a4fefd-c72e-4707-b0d6-14fd9bd80379	Eemeli	e61dbeae-376b-4fac-bd5b-7441b0533ee9
dadb6322-e514-4a92-b22b-ab9357a4ac32	Jussi	e61dbeae-376b-4fac-bd5b-7441b0533ee9
a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	Topi	e61dbeae-376b-4fac-bd5b-7441b0533ee9
5323b55b-5fa9-4285-b48a-dbf0a19c3bef	Topias	e61dbeae-376b-4fac-bd5b-7441b0533ee9
26d1e5d6-23ea-4577-b7d1-7a54e5e29900	Kalle	e61dbeae-376b-4fac-bd5b-7441b0533ee9
1e2db5dd-c171-460e-bf48-4bc55f04f49e	Taavi	e61dbeae-376b-4fac-bd5b-7441b0533ee9
046a3d24-b93f-44d1-ae1b-aa628e141bae	Elias	e61dbeae-376b-4fac-bd5b-7441b0533ee9
a37dd7ab-82b3-41ed-b2a4-8213902dd004	Robertti	1d45a2c2-1ae0-4068-adf4-d09fb4d6f31d
44af4d28-bf42-438d-aa9b-9bf9de75b9a2	Leevi jee	1d45a2c2-1ae0-4068-adf4-d09fb4d6f31d
bf05969b-0fcf-4617-a8ea-340ae3a7d9ca	Eka	1dffd2ea-91a3-4f2f-a001-ca61df2631b8
f925429c-08cc-4cba-b5d4-d63ccf818c49	Mikael Ruotsalainen	909b50c8-56c4-4618-bb55-e1a1feb7f1a9
c2ae2a6b-93f6-4dc5-bcb9-1f90a26c11d8	Toka	1dffd2ea-91a3-4f2f-a001-ca61df2631b8
5b0a3d1b-efdc-4ec5-a0f5-50e84e66966e	Kolmas	1dffd2ea-91a3-4f2f-a001-ca61df2631b8
16149225-d420-4254-88de-36f235415650	Isla	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
7af2670e-d622-44de-9458-0e3490224f19	Jonni	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
d19cd645-fa1d-4e74-a7c8-ec4b4b612983	Jonne	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
143f673e-f9e3-4c24-a7b2-6f7c9ee22499	Julia-(karoliina)	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
1da042e5-4175-4c5e-b1e1-044b2c67c3af	Nuppu	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
eb96e883-bf2d-4482-b8c9-6d272ee35354	Tuukka	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
5f2d8cba-c89d-4dee-b204-911a7f658599	Raisa	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
41403fd8-289f-42b0-8d4f-4f8f2d47898d	Ilari	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
898eaa06-334f-4446-98b3-2368ad2b6cef	Riina	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
052654dc-bfba-4092-85d4-6894c908f9b1	Santeri	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
a9823635-cc6a-4026-ad85-423287d7ec49	Henri	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
b015f02b-0e21-4f21-93d4-8497311b6490	Joona	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
4cdb20f7-d8a7-480c-9379-bbe14d95d933	Joonatan	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
82907cc5-83bb-4c40-ac86-66a67bc9f5eb	Teresa	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
13e55cbe-ac55-47e1-b4d0-cc80073762e4	Selma	d2dd3387-7d32-4ab0-bafb-a04aa89621d6
404347be-f571-4254-b055-a06e9a9962f9	Adelie	e61dbeae-376b-4fac-bd5b-7441b0533ee9
686241e9-7a4e-4eb6-bc99-26699999001b	Milla	e61dbeae-376b-4fac-bd5b-7441b0533ee9
2e03b196-3248-4f14-9f2d-4661e503665d	Iida	e61dbeae-376b-4fac-bd5b-7441b0533ee9
b9266745-39ba-4be3-b1a1-421801b79832	Mandi	e61dbeae-376b-4fac-bd5b-7441b0533ee9
799b59e5-c962-4f19-9f9d-01518c57a550	Eelis	e61dbeae-376b-4fac-bd5b-7441b0533ee9
74e88236-472e-41ea-9475-73c94489ae2e	Helmi	e61dbeae-376b-4fac-bd5b-7441b0533ee9
6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	Iita	e61dbeae-376b-4fac-bd5b-7441b0533ee9
2209c4b3-b0d6-4858-9fa0-74c9b589442c	Outi	e61dbeae-376b-4fac-bd5b-7441b0533ee9
4943ad21-7f08-4b45-8d6c-7cccbfb05562	Riikka	e61dbeae-376b-4fac-bd5b-7441b0533ee9
0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	Camilla	e61dbeae-376b-4fac-bd5b-7441b0533ee9
e2c637e8-f394-4a5a-926f-1f9888a7dc98	Jouni	9c0fff82-1597-4447-84d2-28051ef96223
67c02902-d7e2-47e1-abef-9d1ae14a3da5	Melinda	9c0fff82-1597-4447-84d2-28051ef96223
b05b035e-4867-40c1-965e-f60630bfa457	Sani	9c0fff82-1597-4447-84d2-28051ef96223
24007058-ca39-4c69-9004-c3d29b441fb3	Jiri	9c0fff82-1597-4447-84d2-28051ef96223
2dd7377d-323a-4e73-9a14-5962ec2b8a58	Oskari	9c0fff82-1597-4447-84d2-28051ef96223
b43981e9-6f50-4908-b225-1f5d5a70c68e	Albert	9c0fff82-1597-4447-84d2-28051ef96223
1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	Severi	9c0fff82-1597-4447-84d2-28051ef96223
350594d5-5cd4-4033-9294-6b50102afe7d	Hilda	9c0fff82-1597-4447-84d2-28051ef96223
7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	Aleksi	9c0fff82-1597-4447-84d2-28051ef96223
9bdfa82d-13bd-40be-9a9b-a57c2a072351	Reetu	9c0fff82-1597-4447-84d2-28051ef96223
d07f9606-ddee-4f35-8d35-b8358dc9fc75	Paula	9c0fff82-1597-4447-84d2-28051ef96223
c0011bcd-6952-4d60-a01b-3b455c7eea4c	Inari	9c0fff82-1597-4447-84d2-28051ef96223
a6b19b1f-e185-41df-b32a-145f3d8ba2ae	Vihtori	9c0fff82-1597-4447-84d2-28051ef96223
5fd1effd-1670-4a40-bfaf-75a2a048fc91	Romeo	9c0fff82-1597-4447-84d2-28051ef96223
720863b3-15b5-4928-b516-5a8ec0cee764	Veikka	9c0fff82-1597-4447-84d2-28051ef96223
af758be6-0adc-4e32-8543-f65f6c48fd2b	Timur	9c0fff82-1597-4447-84d2-28051ef96223
eb6258aa-1619-49ae-be18-11cd0b0d7e1b	Viljo	9c0fff82-1597-4447-84d2-28051ef96223
803c9cfd-c665-452f-9cf4-1315a875fa0e	Hilma	1811d42e-eb46-4b97-a067-8d91a4c60bd1
bcdcfdce-bc43-43af-88b2-ce2f79d40da0	Miina	1811d42e-eb46-4b97-a067-8d91a4c60bd1
545958d4-a061-46c0-a58b-e814f2864886	Elina	1811d42e-eb46-4b97-a067-8d91a4c60bd1
e5570e54-941f-4e8b-b7de-f2dd3d7662e2	Kasperi	1811d42e-eb46-4b97-a067-8d91a4c60bd1
7c3affe4-d2a3-4620-907f-abc411bd5534	Oona	1811d42e-eb46-4b97-a067-8d91a4c60bd1
f37fb196-de25-4ea8-a1ff-280491ef3865	Eljas	1811d42e-eb46-4b97-a067-8d91a4c60bd1
7f64f516-bdbd-490a-9d83-6625c9834929	Kerttu	1811d42e-eb46-4b97-a067-8d91a4c60bd1
3a817706-c52d-4a77-8f87-68ef4514aef9	Miro	1811d42e-eb46-4b97-a067-8d91a4c60bd1
d9dd649b-f9bf-4670-84ea-a102fc16cfcc	Pinja	1811d42e-eb46-4b97-a067-8d91a4c60bd1
8597552c-2527-4294-8a08-56d47b563b33	Peppi	1811d42e-eb46-4b97-a067-8d91a4c60bd1
34f18910-a0db-4e48-8129-8416b575d22b	Ilari	1811d42e-eb46-4b97-a067-8d91a4c60bd1
6bc63090-ea58-4189-b5d1-cba135d9da2b	Tilda	1811d42e-eb46-4b97-a067-8d91a4c60bd1
671ee4af-e36d-437d-b3ec-bee0179c96c4	Kerttu M	1811d42e-eb46-4b97-a067-8d91a4c60bd1
98160f96-0d06-40e7-9e12-1c1ad90442fd	Siiri	1811d42e-eb46-4b97-a067-8d91a4c60bd1
7b45664d-caff-4e11-a717-7c3e2e1ed7f7	Emmi	1811d42e-eb46-4b97-a067-8d91a4c60bd1
dc2469d2-1c1d-499c-bb3c-ff061b70307d	Sanni	1811d42e-eb46-4b97-a067-8d91a4c60bd1
d21c58bf-a09d-4a2e-ab5f-131a3233f6ba	Milla	1811d42e-eb46-4b97-a067-8d91a4c60bd1
f2cd6a55-4291-4848-a66e-36d096f181c4	Moona	1811d42e-eb46-4b97-a067-8d91a4c60bd1
d6b3db8b-50e7-4a6c-8ed2-2247a659a3a9	Adessa	1811d42e-eb46-4b97-a067-8d91a4c60bd1
a17ec781-f403-45b7-b1a2-2ad88dc2038e	Aino	1811d42e-eb46-4b97-a067-8d91a4c60bd1
9ffd35f9-d869-4406-aa8c-cf60cbc47830	Annu	1811d42e-eb46-4b97-a067-8d91a4c60bd1
f71a7e38-187d-4dfb-823d-f959158a971f	Sofia	1811d42e-eb46-4b97-a067-8d91a4c60bd1
165e6b48-6ffc-498b-a9c4-aac0d7a14fe2	Laura	1811d42e-eb46-4b97-a067-8d91a4c60bd1
fb78d640-ca97-407e-9d2b-6390b8a2c77d	Mark	110c9dff-5530-4184-baf5-bb6bb05bb40f
8fa5f694-d7a7-49c2-98a2-e1aecdc80d3e	Isla	110c9dff-5530-4184-baf5-bb6bb05bb40f
2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	Jonni	110c9dff-5530-4184-baf5-bb6bb05bb40f
91a00bae-00db-464f-8376-591e16a5a811	Jonne	110c9dff-5530-4184-baf5-bb6bb05bb40f
00179acc-3d3c-496f-98db-fb88756116f4	Julia-karoliina	110c9dff-5530-4184-baf5-bb6bb05bb40f
45cedf94-714b-404a-8ad5-db42f55919eb	Nuppu	110c9dff-5530-4184-baf5-bb6bb05bb40f
e47d29de-6a02-4e63-a52a-964fc17b744e	Tuukka	110c9dff-5530-4184-baf5-bb6bb05bb40f
1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0	Raisa	110c9dff-5530-4184-baf5-bb6bb05bb40f
69fec935-4bcd-43ab-9737-a524627dbe1e	Oona	110c9dff-5530-4184-baf5-bb6bb05bb40f
f9c6b20c-e57c-4e70-9f32-dedd975aab01	Ilari	110c9dff-5530-4184-baf5-bb6bb05bb40f
abd4148b-b530-4440-b643-34d08a4bb811	Riina	110c9dff-5530-4184-baf5-bb6bb05bb40f
71eae4f2-10b4-477e-a21f-0ef25ba08d1b	Santeri	110c9dff-5530-4184-baf5-bb6bb05bb40f
1556394a-6336-4838-8943-19088ecdf5e0	Jussi	110c9dff-5530-4184-baf5-bb6bb05bb40f
0e963947-3dcf-4f30-b316-ac9d07d81b0b	Henri	110c9dff-5530-4184-baf5-bb6bb05bb40f
b1ef84a7-2238-4946-bd2d-97aae138bbad	Joona	110c9dff-5530-4184-baf5-bb6bb05bb40f
de28725b-ccaf-45e6-b808-aeeba3fa151e	Vilma	110c9dff-5530-4184-baf5-bb6bb05bb40f
f4eb73ad-9a1f-4b7b-8899-b2a07ff4db2d	Tiia	110c9dff-5530-4184-baf5-bb6bb05bb40f
4a3f375e-f8ce-46f9-8b9a-4587d069d036	Helmi	110c9dff-5530-4184-baf5-bb6bb05bb40f
1461587b-fedd-4cb1-a122-58dd9ddc3fd9	Joonatan	110c9dff-5530-4184-baf5-bb6bb05bb40f
1f770536-fee1-4ca2-9622-ed816628c9b7	Iiro	110c9dff-5530-4184-baf5-bb6bb05bb40f
63f57cea-4036-4e38-9d84-3c36f99124ef	Jasmin	110c9dff-5530-4184-baf5-bb6bb05bb40f
3723e655-2484-4055-8570-13ee693d5a1a	Teresa	110c9dff-5530-4184-baf5-bb6bb05bb40f
3e62f535-90a9-4a75-9748-27ea0d491a54	Kenneth	110c9dff-5530-4184-baf5-bb6bb05bb40f
ad671202-0d1b-4b31-a2fc-9fa9032f3b33	Selma	110c9dff-5530-4184-baf5-bb6bb05bb40f
f7ede4ab-b52d-4f8e-9bb3-56addd842fab	Matti	110c9dff-5530-4184-baf5-bb6bb05bb40f
74ff2516-b259-4f3d-b68b-dbc5c29d6daa	Daniel	8eda8460-b4f6-4ed0-b43a-253608ef0298
d6bae43b-c9c1-42c3-bd74-736d3be6e4f2	Elli	8eda8460-b4f6-4ed0-b43a-253608ef0298
8a993418-3f13-49b4-bb21-93368d8f7a50	Enni	8eda8460-b4f6-4ed0-b43a-253608ef0298
aff989da-421b-4128-968e-5f54d59ca7a0	Pinja	8eda8460-b4f6-4ed0-b43a-253608ef0298
f179052b-20ed-4b30-92df-04ae478b0f06	Aku	8eda8460-b4f6-4ed0-b43a-253608ef0298
60c35aef-6137-44dc-b5d6-b796f1443148	Heidi	8eda8460-b4f6-4ed0-b43a-253608ef0298
0d410afb-beb1-4ac1-883c-f4d19f5f858f	Eemeli	8eda8460-b4f6-4ed0-b43a-253608ef0298
4bb3b891-7462-4e8d-ae54-e2df607d1478	Liana	8eda8460-b4f6-4ed0-b43a-253608ef0298
b4766346-0c81-4d98-a489-654ca9b3c6db	Vili	8eda8460-b4f6-4ed0-b43a-253608ef0298
88c69065-37d1-45f2-a48a-a7b12a0694cf	Eetu-Viljo	8eda8460-b4f6-4ed0-b43a-253608ef0298
1efd1671-ff54-4332-9da1-474aa3f3ec04	Konsta	8eda8460-b4f6-4ed0-b43a-253608ef0298
8faa9bc9-fbb9-4c0c-ac24-99c987bd412f	Mona	8eda8460-b4f6-4ed0-b43a-253608ef0298
24c494db-a428-4430-ae3a-c321d5e765f7	Peetu	8eda8460-b4f6-4ed0-b43a-253608ef0298
7e57c1d9-b037-4ae6-a0c9-2b409b90f748	Helmi	8eda8460-b4f6-4ed0-b43a-253608ef0298
39826f74-cf4a-41b7-a295-5cb63ec3a196	Jermu	8eda8460-b4f6-4ed0-b43a-253608ef0298
95ef1789-275a-42de-bfc3-c9c006432782	Reetta	8eda8460-b4f6-4ed0-b43a-253608ef0298
86ad5e56-2605-4fd5-a0a2-3004e6136a7c	Henry	8eda8460-b4f6-4ed0-b43a-253608ef0298
a71c4a77-39cd-4672-a59a-0394bec62fcf	Aapeli	8eda8460-b4f6-4ed0-b43a-253608ef0298
92d51cc4-7e8c-4bcf-84b8-b3f4cad005cc	Eeva	8eda8460-b4f6-4ed0-b43a-253608ef0298
3d55963e-6744-4828-b25d-c02aaa7ccc4c	Kaspian	8eda8460-b4f6-4ed0-b43a-253608ef0298
954c2876-5f2b-4618-a2c0-8f86ff5b3da5	Juuli	8eda8460-b4f6-4ed0-b43a-253608ef0298
98d2b651-d44d-4a40-ab28-da3fa61df960	Linnea	8eda8460-b4f6-4ed0-b43a-253608ef0298
344890ff-a10d-4801-992d-36bcbcc43663	Aada	8eda8460-b4f6-4ed0-b43a-253608ef0298
3c489011-57bc-41fa-a0b1-2166fd23bac5	Ilona	8eda8460-b4f6-4ed0-b43a-253608ef0298
6c629051-3712-43f1-8f21-c357442fc591	Stella	8eda8460-b4f6-4ed0-b43a-253608ef0298
dc61c65a-cfe6-4743-a80b-98c54491a42c	Maija	8eda8460-b4f6-4ed0-b43a-253608ef0298
1b5d1532-f11c-4b7a-bb15-8754ae38223f	Eedla	8eda8460-b4f6-4ed0-b43a-253608ef0298
1ba24224-da11-4745-be85-ed1ce7bb2669	Martti	8eda8460-b4f6-4ed0-b43a-253608ef0298
36c47c4b-1f5b-43d8-843a-6f74ab4e86b9	Väinö	8eda8460-b4f6-4ed0-b43a-253608ef0298
45adabcd-6682-4ff7-abee-9f8061af9a3b	Kristian	8eda8460-b4f6-4ed0-b43a-253608ef0298
12acc9ab-19a4-404d-b072-4760f41732dd	Ella	8eda8460-b4f6-4ed0-b43a-253608ef0298
2eceab39-5d0a-4201-a275-17a1bed011a6	Kettu Reponen	909b50c8-56c4-4618-bb55-e1a1feb7f1a9
4454d03a-54da-4c2c-b931-b4b96ac0d81a	Jari	2556b6a9-4cab-4b65-99fe-94f5cf5d9123
7131bcea-6594-4433-be62-2dca8ffad861	Kimmo	2556b6a9-4cab-4b65-99fe-94f5cf5d9123
7c159017-8908-4a89-bc0b-dadcb58a2d03	Liisa	2556b6a9-4cab-4b65-99fe-94f5cf5d9123
4c658b14-0fce-4ca3-ac9a-42558969e0e2	Kaisa	2556b6a9-4cab-4b65-99fe-94f5cf5d9123
2aa93e0a-d4d5-4e78-b45f-881c22c34243	Jari	11f9a50c-6d6d-405e-882d-dd0d828980c5
4814d2b4-b6c1-496b-b95d-4be1e4030936	Liisa	11f9a50c-6d6d-405e-882d-dd0d828980c5
e2ef08a8-ad14-4f88-b60c-29b24d63bb5f	Kaisa	11f9a50c-6d6d-405e-882d-dd0d828980c5
fba15ad0-c99f-4a23-a814-e3e30612dfd0	Kimmo	11f9a50c-6d6d-405e-882d-dd0d828980c5
aa420673-c8ba-41da-9ee4-061022bb4a51	Valtteri	110c9dff-5530-4184-baf5-bb6bb05bb40f
a6eb654d-12a2-4350-a687-128314062791	Jaska j	0df0a9e8-d7d4-4a24-a2ad-e5f263696a27
f6705543-53b3-419c-9a54-c23cd0c8525b	Taimi	c3f1e3d5-7abc-44bb-bfa5-12a0fd2c6769
04629d10-42df-4873-bb8e-a38230d93b8a	Veeti	c3f1e3d5-7abc-44bb-bfa5-12a0fd2c6769
9c66fa7f-c08f-4905-9c54-5da739156493	Timi	c3f1e3d5-7abc-44bb-bfa5-12a0fd2c6769
28426aca-f675-46f7-bafc-dc5f7eb649c5	Eljas	c3f1e3d5-7abc-44bb-bfa5-12a0fd2c6769
251b27c1-5684-424b-b17b-7257a311bd33	Lenni	c3f1e3d5-7abc-44bb-bfa5-12a0fd2c6769
b8a8e21b-2e09-4855-a354-0c48800913c9	Viivi	c3f1e3d5-7abc-44bb-bfa5-12a0fd2c6769
ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	Ilari	c3f1e3d5-7abc-44bb-bfa5-12a0fd2c6769
e5cd5e34-6c87-4ccb-81c7-f70bae71ffee	Tuomas	2701efce-305c-4914-b604-dcea230c2689
8f4df76a-3d26-432b-882f-4790ba82a24a	Tiitu	2701efce-305c-4914-b604-dcea230c2689
e06b8ddd-84b2-4101-abe1-ecea8ecb8afa	S-K	2701efce-305c-4914-b604-dcea230c2689
79b56475-a385-4716-b6a2-73fcb1db0112	E	f118eb20-2ff4-4bec-a6b7-458e97ef062d
b25c03f9-3bec-48f9-a045-c78745703bf7	pete	562cb013-14e0-4d29-ae33-5ba1813dfec6
f7aff351-6b9f-4caf-8717-5a611192f6d9	jarkko	562cb013-14e0-4d29-ae33-5ba1813dfec6
d989226b-aa7a-4dd9-a34c-6bf06ae4a429	sirpa	562cb013-14e0-4d29-ae33-5ba1813dfec6
6743208b-a2b7-4951-9d65-602313f52be8	ekkuli	562cb013-14e0-4d29-ae33-5ba1813dfec6
7cb540a6-c01f-42c7-a0e2-099d290c0b6a	leeveli	562cb013-14e0-4d29-ae33-5ba1813dfec6
2a397255-ca16-43dc-b47e-a977a917f032	nettuli	562cb013-14e0-4d29-ae33-5ba1813dfec6
f198a966-c599-4457-ab33-bc075adefadf	Eetupekka	562cb013-14e0-4d29-ae33-5ba1813dfec6
df05106e-6e95-4a82-af93-c5f6f8a58047	Alma	41f9142b-c05f-41c7-baea-7afafeabb8c7
c99cbc5a-d88b-4022-bc5a-aae33f51e30b	Tiia	41f9142b-c05f-41c7-baea-7afafeabb8c7
24bd87c1-454d-412e-a843-595ffdc4892b	Ekku	41f9142b-c05f-41c7-baea-7afafeabb8c7
e459564c-d6aa-4fec-8790-508218a41435	Mika	41f9142b-c05f-41c7-baea-7afafeabb8c7
a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo Tavallinen	fde7c856-7b1b-4ca8-a624-67809c32bd65
4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa Lahtinen	fde7c856-7b1b-4ca8-a624-67809c32bd65
75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti Meikäläinen	fde7c856-7b1b-4ca8-a624-67809c32bd65
82b08073-2503-4e40-b381-9f4c0987aa37	foobar	57d7802e-5dd9-44d2-a652-4185942f2b97
5387fbeb-b1bf-44b0-b87f-6bfba4e12996	bar	57d7802e-5dd9-44d2-a652-4185942f2b97
b7b0fe22-b844-4a04-a292-3f2489f62118	foo	57d7802e-5dd9-44d2-a652-4185942f2b97
c25bff45-7223-4c61-b116-5b2d8b077a7a	testi2	723f1c8d-8a79-4484-b31b-d2e4f7f50efd
52911273-2826-4629-b539-5cee29431c55	testi1	723f1c8d-8a79-4484-b31b-d2e4f7f50efd
d836e806-1927-4cab-b779-167cd873ce79	Kalle Kehveli	fde7c856-7b1b-4ca8-a624-67809c32bd65
c75c442f-9ccb-4adb-8055-9b152d183771	Ekku	556d49fe-2a7d-4818-8a64-3ecc6a59009c
cafc3c2b-7729-495b-a57c-bad901ec57fb	Lou	556d49fe-2a7d-4818-8a64-3ecc6a59009c
a856ea03-665e-4c29-9821-89b1954c87ac	Ekku	668d593b-2679-480d-9c37-6a7f5d4fb257
6be85033-9f0a-4671-a1e4-43ef98bb9e8e	Lou	668d593b-2679-480d-9c37-6a7f5d4fb257
\.


--
-- Data for Name: Teacher; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Teacher" (id, email, "passwordHash") FROM stdin;
5b637712-3af1-46a2-aeb0-a4a016b134bc	teppo@email.com	$2b$12$DYwh85NnshcxsIdSzopZZu3k4nIfiLWIW6VGYn6jrPkUWeJhcONWW
a44319a9-1556-4e03-b825-48b8648a4699	testi@email.com	$2b$12$UhTSCiXyQJC8K0tlQPu1zuUu3/WnS0HA4OainPlIvQ1sP.3VDmhNy
483e736f-00a6-46d1-a1c3-3099eb626012	eke@email.com	$2b$12$.c1f5H3Q0JVFOmpK5KMBC.3zcjmUKzfI3Rnb6Z9Utxuf.mXYD4pdi
45a2b311-8e95-418f-8819-11f2cfe6ec2e	uusi@email.com	$2b$12$.O8CXzpJBAecbGPhzn8n/.RYUR8BKY4MVzOkyxP2c3gv.ZIla01pO
8548a9c5-dfdb-48e6-936d-f221845157b4	test@email.com	$2b$12$0jxCEtLNdauoHMyUo3Bc8.xI7nr1VAygoe05n5YIloEfH4PYdt3Cq
7f74e390-db85-42c0-901f-c0ece081f7a2	testaus@email.com	$2a$12$WCr2xQBXm4sBV54fiysKcOcNtzw7dUfAuKt6gdCJlbbmxkNn.E94W
4f38a727-897b-40d0-a974-cf8a7d2efda1	eetu.kalapudas@gmail.com	$2a$12$qslAErZA30FPSWMVpPg/beza9uUJW7a1xi.LolV7o.xYag2S2nUHm
c71a57e7-5fb0-452d-88b0-f96072f8be2d	leevelihuuskonen@gmail.com	$2a$12$44OJR0FPCSz4vqZ6u5uB4umkMPtg5h73UPmTWn/RNqSZ6tc9ODY52
9fc108eb-271f-4e67-89d9-f78f72568ae2	testaaja@email.com	$2a$12$S/QWFBXDwLbn1vFn8HGWcO.GCvNtcZzDhZYRkdS5TiL1a7lNLGSO6
1112c6f9-bfbf-4207-83cd-910ffe0582f2	ekku@email.com	$2a$12$AfsHBoD8EcW6y6QzQ.WhAe2NgWODcbIHke1f5heGvoHsyRiB1ZHx6
d5907523-b2ab-4064-960b-e043ed17f9b8	test-user@email.com	$2a$12$xqpknl4KEEQas.LYO9FDaexaKzQ1BbeMgldA0QvuzBah.QUqxN0FS
96549af2-ad08-4066-b742-cb1048b3876d	nortsi@email.com	$2a$12$jYnnKVOi/uNHpE3qIQYNHuf6Jv9aey1yKN3gzV91Q3nXIP8l1WpOu
185a9cc2-8497-493f-94da-65abda04a320	artte@email.com	$2a$12$Wx8QwJg84eT9d47WxfD16.YTMePUAFEN0SsmbsrGHijJztJcE1gpi
45f62aaf-431d-478a-96b2-629928472f0f	Artte.jalkanen@gmail.com	$2a$12$eTUUenUFFG/9YumLjPyreOw8FU70jml5ajR65VubnKWkdQTrq1sui
df4df12f-c686-4f62-a276-e42e8162c218	ilmariaarela@gmail.com	$2a$12$VuXJB1NAHZF8D0xU52PUpOJd7Pdr7j5G0gOwg4XoOegE8jd3lsqgy
94f0b047-8048-49a1-8578-889686e3127a	eaalayt@student.jyu.fi	$2a$12$HxXnq92owbp5mssYgb2QoOFgNgfjR3szgTrDlacGT0jDmdiR3JTHe
dc1c8071-ac93-4952-8c66-85fb342f98ea	mikasip11@gmail.com	$2a$12$.qDj3BjqwGDvLQkehQlT4OHnmk9zqjqpFVbe.e.ECAhXIKfaO90Ke
e31f2fbf-4637-46e9-94c2-93f00a138edf	testi-kayttaja@email.com	$2a$12$ZP5xqy/TpJa0veh2JJyBteNykUpMFJtT0m2PKy3CPe2cWN8FuqYPG
6bcb2e61-7d1e-4697-9e41-93a8f62a3cd6	tommi.j.lahtonen@jyu.fi	$2a$12$1KQVmC01P8Ro7RRujQmXRu33gAeIqzcP6nK7N/u4s4b9vssmF/d/O
\.


--
-- Data for Name: _ClassYearToStudent; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."_ClassYearToStudent" ("A", "B") FROM stdin;
ac83bfa3-9f44-4aea-aac0-98e793367206	81f9f274-c50a-4b30-b0f5-15c1479b942c
ac83bfa3-9f44-4aea-aac0-98e793367206	213addc7-6d5d-4a39-95bf-ded6afa510a6
ac83bfa3-9f44-4aea-aac0-98e793367206	dc43f223-8b76-457a-b035-8b186320bdea
ac83bfa3-9f44-4aea-aac0-98e793367206	2487435b-5598-4a44-bc31-f93ed8a2ec43
ac83bfa3-9f44-4aea-aac0-98e793367206	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb
ac83bfa3-9f44-4aea-aac0-98e793367206	49c4aeec-3a4e-4761-b3cf-2546381857f7
e55d4173-4aa1-4e65-8574-c99710578fdc	e533765b-6b86-4f98-b4e7-c8ed54669c04
e55d4173-4aa1-4e65-8574-c99710578fdc	fd8edc31-0986-455a-8ede-7e5f52bab3d8
e55d4173-4aa1-4e65-8574-c99710578fdc	cbaa595d-ff23-4c6a-b537-62adcb859b43
ac83bfa3-9f44-4aea-aac0-98e793367206	b8bc48bb-2b86-415c-837f-dbad58dd3e2d
ac83bfa3-9f44-4aea-aac0-98e793367206	f826618b-cee5-4d6c-bcde-27e7a74a0b63
ac83bfa3-9f44-4aea-aac0-98e793367206	a2a3736c-4cbd-43f4-b8e4-8041a2b9d8f5
ac83bfa3-9f44-4aea-aac0-98e793367206	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0
ac83bfa3-9f44-4aea-aac0-98e793367206	7c413b7f-9005-43a9-9b44-1984a23ae65f
ac83bfa3-9f44-4aea-aac0-98e793367206	f96609c4-4c21-4b74-8523-f2c3b78d4c49
ac83bfa3-9f44-4aea-aac0-98e793367206	c7a9dddd-29a9-4698-991f-ecab63cf6fd0
ac83bfa3-9f44-4aea-aac0-98e793367206	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a
ac83bfa3-9f44-4aea-aac0-98e793367206	7b55eeb0-4468-4696-b2fd-a50a7e058ec5
ac83bfa3-9f44-4aea-aac0-98e793367206	25ba77b8-721c-4c32-b5c6-97ea194d2958
ac83bfa3-9f44-4aea-aac0-98e793367206	081d3462-484c-45f4-b7df-9eef1712d829
ac83bfa3-9f44-4aea-aac0-98e793367206	d04c2d81-ce92-4221-990a-64c5e1142ee9
ac83bfa3-9f44-4aea-aac0-98e793367206	74c83e0a-3e21-4c01-b18a-a81f7e089d64
ac83bfa3-9f44-4aea-aac0-98e793367206	9f830199-bde9-43a4-84e9-986992a1e3d3
ac83bfa3-9f44-4aea-aac0-98e793367206	750d8c1e-30f2-49fc-a445-7acdb4bff78e
ac83bfa3-9f44-4aea-aac0-98e793367206	ad497eb6-6b41-4f04-97ac-cfff98b8cbae
ac83bfa3-9f44-4aea-aac0-98e793367206	c4365db1-b405-4aac-ad56-4f21780797c0
ac83bfa3-9f44-4aea-aac0-98e793367206	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2
ac83bfa3-9f44-4aea-aac0-98e793367206	eac386e1-ca07-42b6-9817-50f1d1081903
ac83bfa3-9f44-4aea-aac0-98e793367206	0d39a916-dd79-4bc8-b493-771b456ed8ce
ac83bfa3-9f44-4aea-aac0-98e793367206	e25eac4b-ed6a-433b-b311-c27ea3f1faa4
ac83bfa3-9f44-4aea-aac0-98e793367206	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894
ac83bfa3-9f44-4aea-aac0-98e793367206	423ad9ea-e868-49c8-a31d-1dbb6e0c4422
d0839b30-1412-448d-8856-5041b20701ec	d37acd3c-5742-4ca1-b728-ac07ef43baad
d0839b30-1412-448d-8856-5041b20701ec	7c5e53dc-057f-4e9f-adce-211491e0de78
b8bf80db-46cf-4b75-a204-a842cc010e3e	5b490aa5-5292-4542-9b98-dfece57314f5
b8bf80db-46cf-4b75-a204-a842cc010e3e	5b16baaa-2cae-425b-a704-7d93b3ee20b3
b8bf80db-46cf-4b75-a204-a842cc010e3e	6f81f297-6909-4522-a0f2-9729833a2f97
ac83bfa3-9f44-4aea-aac0-98e793367206	a94818ef-1b6d-4489-8c0b-f1667cb7cb82
89d861be-d5e9-41a3-8672-d977b0895d54	84c79ed7-b6e3-488d-93e7-0462a6e51139
89d861be-d5e9-41a3-8672-d977b0895d54	2c42a7d7-10ee-46d8-b057-103c9d3773d9
ffe74adb-ab34-42bd-b305-eff26e32b6ba	ffcd87aa-e63f-4a34-a82b-ec98c80ff979
ffe74adb-ab34-42bd-b305-eff26e32b6ba	b9f75da6-4587-44ca-b3f3-a5bdbaa9fd90
ffe74adb-ab34-42bd-b305-eff26e32b6ba	16c2d264-2e7c-452d-980a-114909d369f3
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	789e18c3-638d-4651-be65-ec0a1661539f
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	a722bd23-2313-44d9-a0c6-82a5270900a8
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	4fa0db05-161f-4165-b00c-52528866490c
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	d77c55c5-670a-4bc5-bf46-5ff9662077f6
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	17a303e2-58b9-434a-b0e3-a3227ba197dc
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	8cc39180-992f-41be-88d7-d798fc88abe0
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	45d76ed8-35ff-473d-b70c-92c0762d7a89
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	5a07f60b-4776-4160-947b-fe207b5d64e5
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	55d97917-9df6-48ee-9afe-cbbfa0fe1796
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	cac00e26-1bd0-47c3-b2a8-4eb754562d6d
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	08d712ee-e2bc-4ca6-9660-fa986c4c4158
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	5e8a31cb-3ca8-4d0d-9489-dc20d318827b
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	d4a4ffc6-fd8b-45ae-82a2-f49d61729300
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	9a8e559f-1792-4dbf-b515-2bff3261aaf6
ba4535ec-16b4-4070-8a70-83cbe8b51340	14c62b14-21d5-468c-b04f-89d60b2efc76
0664b09a-09b6-4ef6-81b3-1e9dc549c446	fa6f162f-c93d-497c-b27b-9a6450a4a6ad
fc783adf-450b-45d5-b189-14ab3c6f7979	c942743a-d10b-4460-bc99-44ea941f6f8f
fc783adf-450b-45d5-b189-14ab3c6f7979	f03779c1-9d87-439c-8d95-14e384c7d2c0
fc783adf-450b-45d5-b189-14ab3c6f7979	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86
fc783adf-450b-45d5-b189-14ab3c6f7979	e71cd959-78a0-4843-af83-1e8e741e7edf
fc783adf-450b-45d5-b189-14ab3c6f7979	05c4f013-bc9a-4155-925b-6f8485bb5378
fc783adf-450b-45d5-b189-14ab3c6f7979	5bbc08f9-01e0-4911-9a6a-38790219ce2a
fc783adf-450b-45d5-b189-14ab3c6f7979	e1efe28e-64c5-402b-a692-0f795a6293c8
fc783adf-450b-45d5-b189-14ab3c6f7979	148a28ac-012b-44c4-b684-87a00ace9c72
fc783adf-450b-45d5-b189-14ab3c6f7979	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e
fc783adf-450b-45d5-b189-14ab3c6f7979	f4fc8254-27a5-4a0d-aca1-03b85e4020ab
fc783adf-450b-45d5-b189-14ab3c6f7979	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f
fc783adf-450b-45d5-b189-14ab3c6f7979	a639981f-4bf0-4871-b264-00ad02a9a286
fc783adf-450b-45d5-b189-14ab3c6f7979	c67dd576-d4c0-4d3d-82ec-9e20e69c629e
fc783adf-450b-45d5-b189-14ab3c6f7979	36920386-dc0f-4b52-aacc-ca4b36d3ac9b
fc783adf-450b-45d5-b189-14ab3c6f7979	bde08c48-5140-47eb-b28b-ce5c86ea8f46
fc783adf-450b-45d5-b189-14ab3c6f7979	932b4426-7f6d-46ff-a9c4-a9fc697ddc23
439d550e-a5ef-4f51-a9fc-81fa9a0aed52	983a1efb-e761-4777-8d54-2914bff556af
564ee2b5-5c55-4667-8732-f9f45d9ecd5a	5c6ab41c-30dc-4f02-9c31-4d691b5469e8
564ee2b5-5c55-4667-8732-f9f45d9ecd5a	c8e4a140-1c7a-4b6b-b04b-86711a322f58
564ee2b5-5c55-4667-8732-f9f45d9ecd5a	fd559fc1-965a-485c-a34d-1a1d26b8a655
564ee2b5-5c55-4667-8732-f9f45d9ecd5a	d8749772-8bf9-4840-a843-8c117837ade6
7088e255-6c73-4fa3-8699-3ecf9dbe5964	e9969c0d-58a3-4bcd-b301-5690b7290aa5
7088e255-6c73-4fa3-8699-3ecf9dbe5964	42a4fefd-c72e-4707-b0d6-14fd9bd80379
7088e255-6c73-4fa3-8699-3ecf9dbe5964	dadb6322-e514-4a92-b22b-ab9357a4ac32
7088e255-6c73-4fa3-8699-3ecf9dbe5964	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a
7088e255-6c73-4fa3-8699-3ecf9dbe5964	5323b55b-5fa9-4285-b48a-dbf0a19c3bef
7088e255-6c73-4fa3-8699-3ecf9dbe5964	26d1e5d6-23ea-4577-b7d1-7a54e5e29900
7088e255-6c73-4fa3-8699-3ecf9dbe5964	1e2db5dd-c171-460e-bf48-4bc55f04f49e
7088e255-6c73-4fa3-8699-3ecf9dbe5964	046a3d24-b93f-44d1-ae1b-aa628e141bae
ba4535ec-16b4-4070-8a70-83cbe8b51340	a37dd7ab-82b3-41ed-b2a4-8213902dd004
ba4535ec-16b4-4070-8a70-83cbe8b51340	44af4d28-bf42-438d-aa9b-9bf9de75b9a2
10c06372-82ec-47ed-962c-77553126f3ae	bf05969b-0fcf-4617-a8ea-340ae3a7d9ca
0664b09a-09b6-4ef6-81b3-1e9dc549c446	f925429c-08cc-4cba-b5d4-d63ccf818c49
10c06372-82ec-47ed-962c-77553126f3ae	c2ae2a6b-93f6-4dc5-bcb9-1f90a26c11d8
10c06372-82ec-47ed-962c-77553126f3ae	5b0a3d1b-efdc-4ec5-a0f5-50e84e66966e
6d55867f-186d-4f87-8317-17cb8d0fd463	16149225-d420-4254-88de-36f235415650
6d55867f-186d-4f87-8317-17cb8d0fd463	7af2670e-d622-44de-9458-0e3490224f19
6d55867f-186d-4f87-8317-17cb8d0fd463	d19cd645-fa1d-4e74-a7c8-ec4b4b612983
6d55867f-186d-4f87-8317-17cb8d0fd463	143f673e-f9e3-4c24-a7b2-6f7c9ee22499
6d55867f-186d-4f87-8317-17cb8d0fd463	1da042e5-4175-4c5e-b1e1-044b2c67c3af
6d55867f-186d-4f87-8317-17cb8d0fd463	eb96e883-bf2d-4482-b8c9-6d272ee35354
6d55867f-186d-4f87-8317-17cb8d0fd463	5f2d8cba-c89d-4dee-b204-911a7f658599
6d55867f-186d-4f87-8317-17cb8d0fd463	41403fd8-289f-42b0-8d4f-4f8f2d47898d
6d55867f-186d-4f87-8317-17cb8d0fd463	898eaa06-334f-4446-98b3-2368ad2b6cef
6d55867f-186d-4f87-8317-17cb8d0fd463	052654dc-bfba-4092-85d4-6894c908f9b1
6d55867f-186d-4f87-8317-17cb8d0fd463	a9823635-cc6a-4026-ad85-423287d7ec49
6d55867f-186d-4f87-8317-17cb8d0fd463	b015f02b-0e21-4f21-93d4-8497311b6490
6d55867f-186d-4f87-8317-17cb8d0fd463	4cdb20f7-d8a7-480c-9379-bbe14d95d933
6d55867f-186d-4f87-8317-17cb8d0fd463	82907cc5-83bb-4c40-ac86-66a67bc9f5eb
6d55867f-186d-4f87-8317-17cb8d0fd463	13e55cbe-ac55-47e1-b4d0-cc80073762e4
7088e255-6c73-4fa3-8699-3ecf9dbe5964	404347be-f571-4254-b055-a06e9a9962f9
7088e255-6c73-4fa3-8699-3ecf9dbe5964	686241e9-7a4e-4eb6-bc99-26699999001b
7088e255-6c73-4fa3-8699-3ecf9dbe5964	2e03b196-3248-4f14-9f2d-4661e503665d
7088e255-6c73-4fa3-8699-3ecf9dbe5964	b9266745-39ba-4be3-b1a1-421801b79832
7088e255-6c73-4fa3-8699-3ecf9dbe5964	799b59e5-c962-4f19-9f9d-01518c57a550
7088e255-6c73-4fa3-8699-3ecf9dbe5964	74e88236-472e-41ea-9475-73c94489ae2e
7088e255-6c73-4fa3-8699-3ecf9dbe5964	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859
7088e255-6c73-4fa3-8699-3ecf9dbe5964	2209c4b3-b0d6-4858-9fa0-74c9b589442c
7088e255-6c73-4fa3-8699-3ecf9dbe5964	4943ad21-7f08-4b45-8d6c-7cccbfb05562
7088e255-6c73-4fa3-8699-3ecf9dbe5964	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	e2c637e8-f394-4a5a-926f-1f9888a7dc98
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	67c02902-d7e2-47e1-abef-9d1ae14a3da5
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	b05b035e-4867-40c1-965e-f60630bfa457
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	24007058-ca39-4c69-9004-c3d29b441fb3
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	2dd7377d-323a-4e73-9a14-5962ec2b8a58
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	b43981e9-6f50-4908-b225-1f5d5a70c68e
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	350594d5-5cd4-4033-9294-6b50102afe7d
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	9bdfa82d-13bd-40be-9a9b-a57c2a072351
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	d07f9606-ddee-4f35-8d35-b8358dc9fc75
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	c0011bcd-6952-4d60-a01b-3b455c7eea4c
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	a6b19b1f-e185-41df-b32a-145f3d8ba2ae
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	5fd1effd-1670-4a40-bfaf-75a2a048fc91
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	720863b3-15b5-4928-b516-5a8ec0cee764
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	af758be6-0adc-4e32-8543-f65f6c48fd2b
37c6af4b-8b10-40a5-8ae3-1b01af624dc5	eb6258aa-1619-49ae-be18-11cd0b0d7e1b
0497a2a4-6124-40dc-92d6-8fe3b708331e	803c9cfd-c665-452f-9cf4-1315a875fa0e
0497a2a4-6124-40dc-92d6-8fe3b708331e	bcdcfdce-bc43-43af-88b2-ce2f79d40da0
0497a2a4-6124-40dc-92d6-8fe3b708331e	545958d4-a061-46c0-a58b-e814f2864886
0497a2a4-6124-40dc-92d6-8fe3b708331e	e5570e54-941f-4e8b-b7de-f2dd3d7662e2
0497a2a4-6124-40dc-92d6-8fe3b708331e	7c3affe4-d2a3-4620-907f-abc411bd5534
0497a2a4-6124-40dc-92d6-8fe3b708331e	f37fb196-de25-4ea8-a1ff-280491ef3865
0497a2a4-6124-40dc-92d6-8fe3b708331e	7f64f516-bdbd-490a-9d83-6625c9834929
0497a2a4-6124-40dc-92d6-8fe3b708331e	3a817706-c52d-4a77-8f87-68ef4514aef9
0497a2a4-6124-40dc-92d6-8fe3b708331e	d9dd649b-f9bf-4670-84ea-a102fc16cfcc
0497a2a4-6124-40dc-92d6-8fe3b708331e	8597552c-2527-4294-8a08-56d47b563b33
0497a2a4-6124-40dc-92d6-8fe3b708331e	34f18910-a0db-4e48-8129-8416b575d22b
0497a2a4-6124-40dc-92d6-8fe3b708331e	6bc63090-ea58-4189-b5d1-cba135d9da2b
0497a2a4-6124-40dc-92d6-8fe3b708331e	671ee4af-e36d-437d-b3ec-bee0179c96c4
0497a2a4-6124-40dc-92d6-8fe3b708331e	98160f96-0d06-40e7-9e12-1c1ad90442fd
0497a2a4-6124-40dc-92d6-8fe3b708331e	7b45664d-caff-4e11-a717-7c3e2e1ed7f7
0497a2a4-6124-40dc-92d6-8fe3b708331e	dc2469d2-1c1d-499c-bb3c-ff061b70307d
0497a2a4-6124-40dc-92d6-8fe3b708331e	d21c58bf-a09d-4a2e-ab5f-131a3233f6ba
0497a2a4-6124-40dc-92d6-8fe3b708331e	f2cd6a55-4291-4848-a66e-36d096f181c4
0497a2a4-6124-40dc-92d6-8fe3b708331e	d6b3db8b-50e7-4a6c-8ed2-2247a659a3a9
0497a2a4-6124-40dc-92d6-8fe3b708331e	a17ec781-f403-45b7-b1a2-2ad88dc2038e
0497a2a4-6124-40dc-92d6-8fe3b708331e	9ffd35f9-d869-4406-aa8c-cf60cbc47830
0497a2a4-6124-40dc-92d6-8fe3b708331e	f71a7e38-187d-4dfb-823d-f959158a971f
0497a2a4-6124-40dc-92d6-8fe3b708331e	165e6b48-6ffc-498b-a9c4-aac0d7a14fe2
de31e354-3f10-499e-b9b8-7c17616175c8	fb78d640-ca97-407e-9d2b-6390b8a2c77d
de31e354-3f10-499e-b9b8-7c17616175c8	8fa5f694-d7a7-49c2-98a2-e1aecdc80d3e
de31e354-3f10-499e-b9b8-7c17616175c8	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20
de31e354-3f10-499e-b9b8-7c17616175c8	91a00bae-00db-464f-8376-591e16a5a811
de31e354-3f10-499e-b9b8-7c17616175c8	00179acc-3d3c-496f-98db-fb88756116f4
de31e354-3f10-499e-b9b8-7c17616175c8	45cedf94-714b-404a-8ad5-db42f55919eb
de31e354-3f10-499e-b9b8-7c17616175c8	e47d29de-6a02-4e63-a52a-964fc17b744e
de31e354-3f10-499e-b9b8-7c17616175c8	1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0
de31e354-3f10-499e-b9b8-7c17616175c8	69fec935-4bcd-43ab-9737-a524627dbe1e
de31e354-3f10-499e-b9b8-7c17616175c8	f9c6b20c-e57c-4e70-9f32-dedd975aab01
de31e354-3f10-499e-b9b8-7c17616175c8	abd4148b-b530-4440-b643-34d08a4bb811
de31e354-3f10-499e-b9b8-7c17616175c8	71eae4f2-10b4-477e-a21f-0ef25ba08d1b
de31e354-3f10-499e-b9b8-7c17616175c8	1556394a-6336-4838-8943-19088ecdf5e0
de31e354-3f10-499e-b9b8-7c17616175c8	0e963947-3dcf-4f30-b316-ac9d07d81b0b
de31e354-3f10-499e-b9b8-7c17616175c8	b1ef84a7-2238-4946-bd2d-97aae138bbad
de31e354-3f10-499e-b9b8-7c17616175c8	de28725b-ccaf-45e6-b808-aeeba3fa151e
de31e354-3f10-499e-b9b8-7c17616175c8	f4eb73ad-9a1f-4b7b-8899-b2a07ff4db2d
de31e354-3f10-499e-b9b8-7c17616175c8	4a3f375e-f8ce-46f9-8b9a-4587d069d036
de31e354-3f10-499e-b9b8-7c17616175c8	1461587b-fedd-4cb1-a122-58dd9ddc3fd9
de31e354-3f10-499e-b9b8-7c17616175c8	1f770536-fee1-4ca2-9622-ed816628c9b7
de31e354-3f10-499e-b9b8-7c17616175c8	63f57cea-4036-4e38-9d84-3c36f99124ef
de31e354-3f10-499e-b9b8-7c17616175c8	3723e655-2484-4055-8570-13ee693d5a1a
de31e354-3f10-499e-b9b8-7c17616175c8	3e62f535-90a9-4a75-9748-27ea0d491a54
de31e354-3f10-499e-b9b8-7c17616175c8	ad671202-0d1b-4b31-a2fc-9fa9032f3b33
de31e354-3f10-499e-b9b8-7c17616175c8	f7ede4ab-b52d-4f8e-9bb3-56addd842fab
72d704a8-e209-4255-a595-40d96c4d42ad	74ff2516-b259-4f3d-b68b-dbc5c29d6daa
72d704a8-e209-4255-a595-40d96c4d42ad	d6bae43b-c9c1-42c3-bd74-736d3be6e4f2
72d704a8-e209-4255-a595-40d96c4d42ad	8a993418-3f13-49b4-bb21-93368d8f7a50
72d704a8-e209-4255-a595-40d96c4d42ad	aff989da-421b-4128-968e-5f54d59ca7a0
72d704a8-e209-4255-a595-40d96c4d42ad	f179052b-20ed-4b30-92df-04ae478b0f06
72d704a8-e209-4255-a595-40d96c4d42ad	60c35aef-6137-44dc-b5d6-b796f1443148
72d704a8-e209-4255-a595-40d96c4d42ad	0d410afb-beb1-4ac1-883c-f4d19f5f858f
72d704a8-e209-4255-a595-40d96c4d42ad	4bb3b891-7462-4e8d-ae54-e2df607d1478
72d704a8-e209-4255-a595-40d96c4d42ad	b4766346-0c81-4d98-a489-654ca9b3c6db
72d704a8-e209-4255-a595-40d96c4d42ad	88c69065-37d1-45f2-a48a-a7b12a0694cf
72d704a8-e209-4255-a595-40d96c4d42ad	1efd1671-ff54-4332-9da1-474aa3f3ec04
72d704a8-e209-4255-a595-40d96c4d42ad	8faa9bc9-fbb9-4c0c-ac24-99c987bd412f
72d704a8-e209-4255-a595-40d96c4d42ad	24c494db-a428-4430-ae3a-c321d5e765f7
72d704a8-e209-4255-a595-40d96c4d42ad	7e57c1d9-b037-4ae6-a0c9-2b409b90f748
72d704a8-e209-4255-a595-40d96c4d42ad	39826f74-cf4a-41b7-a295-5cb63ec3a196
72d704a8-e209-4255-a595-40d96c4d42ad	95ef1789-275a-42de-bfc3-c9c006432782
72d704a8-e209-4255-a595-40d96c4d42ad	86ad5e56-2605-4fd5-a0a2-3004e6136a7c
72d704a8-e209-4255-a595-40d96c4d42ad	a71c4a77-39cd-4672-a59a-0394bec62fcf
72d704a8-e209-4255-a595-40d96c4d42ad	92d51cc4-7e8c-4bcf-84b8-b3f4cad005cc
72d704a8-e209-4255-a595-40d96c4d42ad	3d55963e-6744-4828-b25d-c02aaa7ccc4c
72d704a8-e209-4255-a595-40d96c4d42ad	954c2876-5f2b-4618-a2c0-8f86ff5b3da5
72d704a8-e209-4255-a595-40d96c4d42ad	98d2b651-d44d-4a40-ab28-da3fa61df960
72d704a8-e209-4255-a595-40d96c4d42ad	344890ff-a10d-4801-992d-36bcbcc43663
72d704a8-e209-4255-a595-40d96c4d42ad	3c489011-57bc-41fa-a0b1-2166fd23bac5
72d704a8-e209-4255-a595-40d96c4d42ad	6c629051-3712-43f1-8f21-c357442fc591
72d704a8-e209-4255-a595-40d96c4d42ad	dc61c65a-cfe6-4743-a80b-98c54491a42c
72d704a8-e209-4255-a595-40d96c4d42ad	1b5d1532-f11c-4b7a-bb15-8754ae38223f
72d704a8-e209-4255-a595-40d96c4d42ad	1ba24224-da11-4745-be85-ed1ce7bb2669
72d704a8-e209-4255-a595-40d96c4d42ad	36c47c4b-1f5b-43d8-843a-6f74ab4e86b9
72d704a8-e209-4255-a595-40d96c4d42ad	45adabcd-6682-4ff7-abee-9f8061af9a3b
72d704a8-e209-4255-a595-40d96c4d42ad	12acc9ab-19a4-404d-b072-4760f41732dd
0664b09a-09b6-4ef6-81b3-1e9dc549c446	2eceab39-5d0a-4201-a275-17a1bed011a6
decdfebc-8865-4884-85e2-532e1324b324	4454d03a-54da-4c2c-b931-b4b96ac0d81a
decdfebc-8865-4884-85e2-532e1324b324	7131bcea-6594-4433-be62-2dca8ffad861
decdfebc-8865-4884-85e2-532e1324b324	7c159017-8908-4a89-bc0b-dadcb58a2d03
decdfebc-8865-4884-85e2-532e1324b324	4c658b14-0fce-4ca3-ac9a-42558969e0e2
4c789d28-06db-4d59-bfcd-17c846cea94c	2aa93e0a-d4d5-4e78-b45f-881c22c34243
4c789d28-06db-4d59-bfcd-17c846cea94c	4814d2b4-b6c1-496b-b95d-4be1e4030936
4c789d28-06db-4d59-bfcd-17c846cea94c	e2ef08a8-ad14-4f88-b60c-29b24d63bb5f
4c789d28-06db-4d59-bfcd-17c846cea94c	fba15ad0-c99f-4a23-a814-e3e30612dfd0
de31e354-3f10-499e-b9b8-7c17616175c8	aa420673-c8ba-41da-9ee4-061022bb4a51
3bfa598b-fbf0-4ec2-98a0-48828f0df61e	a6eb654d-12a2-4350-a687-128314062791
797914c3-3e04-4caa-8468-830bcc09659b	f6705543-53b3-419c-9a54-c23cd0c8525b
797914c3-3e04-4caa-8468-830bcc09659b	04629d10-42df-4873-bb8e-a38230d93b8a
797914c3-3e04-4caa-8468-830bcc09659b	9c66fa7f-c08f-4905-9c54-5da739156493
797914c3-3e04-4caa-8468-830bcc09659b	28426aca-f675-46f7-bafc-dc5f7eb649c5
797914c3-3e04-4caa-8468-830bcc09659b	251b27c1-5684-424b-b17b-7257a311bd33
797914c3-3e04-4caa-8468-830bcc09659b	b8a8e21b-2e09-4855-a354-0c48800913c9
797914c3-3e04-4caa-8468-830bcc09659b	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a
f586e1b6-5297-4de1-8c7f-b7d76902ffc1	e5cd5e34-6c87-4ccb-81c7-f70bae71ffee
f586e1b6-5297-4de1-8c7f-b7d76902ffc1	8f4df76a-3d26-432b-882f-4790ba82a24a
f586e1b6-5297-4de1-8c7f-b7d76902ffc1	e06b8ddd-84b2-4101-abe1-ecea8ecb8afa
d492f954-cd06-4c86-8ce1-fff58bc72e38	fa6f162f-c93d-497c-b27b-9a6450a4a6ad
d492f954-cd06-4c86-8ce1-fff58bc72e38	f925429c-08cc-4cba-b5d4-d63ccf818c49
d492f954-cd06-4c86-8ce1-fff58bc72e38	2eceab39-5d0a-4201-a275-17a1bed011a6
1e492cde-5525-44dc-b82f-6a34dd7eb995	c942743a-d10b-4460-bc99-44ea941f6f8f
1e492cde-5525-44dc-b82f-6a34dd7eb995	f03779c1-9d87-439c-8d95-14e384c7d2c0
1e492cde-5525-44dc-b82f-6a34dd7eb995	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86
1e492cde-5525-44dc-b82f-6a34dd7eb995	e71cd959-78a0-4843-af83-1e8e741e7edf
1e492cde-5525-44dc-b82f-6a34dd7eb995	05c4f013-bc9a-4155-925b-6f8485bb5378
1e492cde-5525-44dc-b82f-6a34dd7eb995	5bbc08f9-01e0-4911-9a6a-38790219ce2a
1e492cde-5525-44dc-b82f-6a34dd7eb995	e1efe28e-64c5-402b-a692-0f795a6293c8
1e492cde-5525-44dc-b82f-6a34dd7eb995	148a28ac-012b-44c4-b684-87a00ace9c72
1e492cde-5525-44dc-b82f-6a34dd7eb995	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e
1e492cde-5525-44dc-b82f-6a34dd7eb995	f4fc8254-27a5-4a0d-aca1-03b85e4020ab
1e492cde-5525-44dc-b82f-6a34dd7eb995	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f
1e492cde-5525-44dc-b82f-6a34dd7eb995	a639981f-4bf0-4871-b264-00ad02a9a286
1e492cde-5525-44dc-b82f-6a34dd7eb995	c67dd576-d4c0-4d3d-82ec-9e20e69c629e
1e492cde-5525-44dc-b82f-6a34dd7eb995	36920386-dc0f-4b52-aacc-ca4b36d3ac9b
1e492cde-5525-44dc-b82f-6a34dd7eb995	bde08c48-5140-47eb-b28b-ce5c86ea8f46
1e492cde-5525-44dc-b82f-6a34dd7eb995	932b4426-7f6d-46ff-a9c4-a9fc697ddc23
230317b4-fb83-4092-8da4-e641aadb600b	789e18c3-638d-4651-be65-ec0a1661539f
230317b4-fb83-4092-8da4-e641aadb600b	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70
230317b4-fb83-4092-8da4-e641aadb600b	a722bd23-2313-44d9-a0c6-82a5270900a8
230317b4-fb83-4092-8da4-e641aadb600b	4fa0db05-161f-4165-b00c-52528866490c
230317b4-fb83-4092-8da4-e641aadb600b	d77c55c5-670a-4bc5-bf46-5ff9662077f6
230317b4-fb83-4092-8da4-e641aadb600b	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b
230317b4-fb83-4092-8da4-e641aadb600b	17a303e2-58b9-434a-b0e3-a3227ba197dc
230317b4-fb83-4092-8da4-e641aadb600b	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509
230317b4-fb83-4092-8da4-e641aadb600b	8cc39180-992f-41be-88d7-d798fc88abe0
230317b4-fb83-4092-8da4-e641aadb600b	45d76ed8-35ff-473d-b70c-92c0762d7a89
230317b4-fb83-4092-8da4-e641aadb600b	5a07f60b-4776-4160-947b-fe207b5d64e5
230317b4-fb83-4092-8da4-e641aadb600b	55d97917-9df6-48ee-9afe-cbbfa0fe1796
230317b4-fb83-4092-8da4-e641aadb600b	cac00e26-1bd0-47c3-b2a8-4eb754562d6d
230317b4-fb83-4092-8da4-e641aadb600b	08d712ee-e2bc-4ca6-9660-fa986c4c4158
230317b4-fb83-4092-8da4-e641aadb600b	5e8a31cb-3ca8-4d0d-9489-dc20d318827b
230317b4-fb83-4092-8da4-e641aadb600b	d4a4ffc6-fd8b-45ae-82a2-f49d61729300
230317b4-fb83-4092-8da4-e641aadb600b	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e
230317b4-fb83-4092-8da4-e641aadb600b	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff
230317b4-fb83-4092-8da4-e641aadb600b	9a8e559f-1792-4dbf-b515-2bff3261aaf6
230317b4-fb83-4092-8da4-e641aadb600b	a6eb654d-12a2-4350-a687-128314062791
639595a0-0bb4-4c21-b41d-c1c81d2c29f3	fa6f162f-c93d-497c-b27b-9a6450a4a6ad
639595a0-0bb4-4c21-b41d-c1c81d2c29f3	f925429c-08cc-4cba-b5d4-d63ccf818c49
639595a0-0bb4-4c21-b41d-c1c81d2c29f3	2eceab39-5d0a-4201-a275-17a1bed011a6
435da3c4-87f7-4597-a447-7a3e6f4b15c4	79b56475-a385-4716-b6a2-73fcb1db0112
f86f29a9-cce9-4060-a07d-b8d899013b9f	b25c03f9-3bec-48f9-a045-c78745703bf7
f86f29a9-cce9-4060-a07d-b8d899013b9f	f7aff351-6b9f-4caf-8717-5a611192f6d9
f86f29a9-cce9-4060-a07d-b8d899013b9f	d989226b-aa7a-4dd9-a34c-6bf06ae4a429
f86f29a9-cce9-4060-a07d-b8d899013b9f	6743208b-a2b7-4951-9d65-602313f52be8
f86f29a9-cce9-4060-a07d-b8d899013b9f	7cb540a6-c01f-42c7-a0e2-099d290c0b6a
f86f29a9-cce9-4060-a07d-b8d899013b9f	2a397255-ca16-43dc-b47e-a977a917f032
f86f29a9-cce9-4060-a07d-b8d899013b9f	f198a966-c599-4457-ab33-bc075adefadf
b83c3bfe-9b2c-417b-a955-5d725e54f94e	b25c03f9-3bec-48f9-a045-c78745703bf7
b83c3bfe-9b2c-417b-a955-5d725e54f94e	f7aff351-6b9f-4caf-8717-5a611192f6d9
b83c3bfe-9b2c-417b-a955-5d725e54f94e	d989226b-aa7a-4dd9-a34c-6bf06ae4a429
b83c3bfe-9b2c-417b-a955-5d725e54f94e	6743208b-a2b7-4951-9d65-602313f52be8
b83c3bfe-9b2c-417b-a955-5d725e54f94e	7cb540a6-c01f-42c7-a0e2-099d290c0b6a
b83c3bfe-9b2c-417b-a955-5d725e54f94e	2a397255-ca16-43dc-b47e-a977a917f032
b83c3bfe-9b2c-417b-a955-5d725e54f94e	f198a966-c599-4457-ab33-bc075adefadf
1cc91b32-fe7b-4efe-8b2e-d9cc852d7600	df05106e-6e95-4a82-af93-c5f6f8a58047
1cc91b32-fe7b-4efe-8b2e-d9cc852d7600	c99cbc5a-d88b-4022-bc5a-aae33f51e30b
1cc91b32-fe7b-4efe-8b2e-d9cc852d7600	24bd87c1-454d-412e-a843-595ffdc4892b
1cc91b32-fe7b-4efe-8b2e-d9cc852d7600	e459564c-d6aa-4fec-8790-508218a41435
ec5578dd-ad95-4279-be72-e0326b8cfd41	a520a370-e1ec-4742-bcf8-1a34a4434485
ec5578dd-ad95-4279-be72-e0326b8cfd41	75bba92f-9f9c-47c0-a89a-2add75007cf6
ec5578dd-ad95-4279-be72-e0326b8cfd41	4c047cf3-edbb-4aa0-b879-cd84077a8257
b369b11f-64ed-4278-83d7-588c59886416	82b08073-2503-4e40-b381-9f4c0987aa37
b369b11f-64ed-4278-83d7-588c59886416	5387fbeb-b1bf-44b0-b87f-6bfba4e12996
b369b11f-64ed-4278-83d7-588c59886416	b7b0fe22-b844-4a04-a292-3f2489f62118
c8b9bfe7-5d92-434c-97f3-97eb52714267	c25bff45-7223-4c61-b116-5b2d8b077a7a
c8b9bfe7-5d92-434c-97f3-97eb52714267	52911273-2826-4629-b539-5cee29431c55
ec5578dd-ad95-4279-be72-e0326b8cfd41	d836e806-1927-4cab-b779-167cd873ce79
38d0ac99-a402-410a-bf49-523a30d11f83	c75c442f-9ccb-4adb-8055-9b152d183771
38d0ac99-a402-410a-bf49-523a30d11f83	cafc3c2b-7729-495b-a57c-bad901ec57fb
512b3326-704d-4ffc-b566-618cb291d69f	a856ea03-665e-4c29-9821-89b1954c87ac
512b3326-704d-4ffc-b566-618cb291d69f	6be85033-9f0a-4671-a1e4-43ef98bb9e8e
efb5a121-cf07-45c5-9c50-72f7be1fb9ff	84c79ed7-b6e3-488d-93e7-0462a6e51139
efb5a121-cf07-45c5-9c50-72f7be1fb9ff	2c42a7d7-10ee-46d8-b057-103c9d3773d9
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e80f5b1d-a1d9-4d27-9a40-c9b76e99b41a	b379deefa4a67298b58446847420bf02ba0226020e98e6b4a9c00b375607695e	2023-02-25 14:13:50.965737+00	20230223160957_init	\N	\N	2023-02-25 14:13:50.742657+00	1
845998f6-bc3d-44a0-a733-db92a90beeee	f303ec8e8ee8e4f1aa58dc62041cf0f7a9c57febb74c30f8b781eb46b565801e	2023-04-27 08:26:39.99208+00	20230427082257_add_test_field	\N	\N	2023-04-27 08:26:39.487444+00	1
221d6c92-8140-4327-9ace-9f5a7733c09d	fa370045669a4054a9e149925c28622620a919bd08890c3ba8ea1f0c4a04013f	2023-02-25 14:13:51.447031+00	20230223161150_description_and_notes_optional	\N	\N	2023-02-25 14:13:51.103403+00	1
2324d25d-fbeb-48fe-aabb-56c7c7de3507	f7485e40c39b9e0f40cd56b18442ee8cc75a2e810a5df0c0cf9c763b9dcace0e	2023-04-20 16:40:14.455763+00	20230419112352_add_class_year	\N	\N	2023-04-20 16:40:13.751143+00	1
32c9e4dd-d8e3-4092-8bc3-31557b028a03	df9edb7f62c2956fe0145a4c64b97406dc37963ddc83a621bb9c17a58fcd5589	2023-02-25 14:13:51.753459+00	20230224201012_make_ratings_voluntary	\N	\N	2023-02-25 14:13:51.518425+00	1
88fcbc5b-e7c8-44a3-b631-ffb5adce8fd3	5824d8b8ef722b39ebe6f424437133c7b19ffdcdb7fc7685622fe65baf087c1c	2023-02-25 14:13:52.021915+00	20230225084447_add_password_hash	\N	\N	2023-02-25 14:13:51.821963+00	1
edb0f756-79ee-458c-893f-a785cea26a70	1c1cc8d4615292758155c01c061621566a575e6419f46d7e6889c93a6c98eeb6	2023-03-04 11:33:27.509566+00	20230304073408_add_cascade_deletes	\N	\N	2023-03-04 11:33:27.010393+00	1
013df0e8-d7cd-4270-a781-fe99b7f284a5	0c922af221ad21eb6bfdfacf425d3f273f986bdf0ca465cdb57412fd33dffec2	2023-04-20 16:40:15.164798+00	20230420083910_fix_add_class_year_conflicts	\N	\N	2023-04-20 16:40:14.657523+00	1
8d98cc49-ea1b-475d-8535-e8ee3a7dc418	0b75b4a387d5460641f545e5842fa4bc854b45eaf0351575ad2b8e9ae669718e	2023-03-04 11:33:28.17641+00	20230304085742_add_was_present_field	\N	\N	2023-03-04 11:33:27.699795+00	1
57d0fd29-1375-434c-a4d9-3209ea4ef323	a78677f335a0106da3ffaa51c476a53bdb0815d25f5597b848b145e5a151caa9	2023-03-05 10:16:12.953643+00	20230305084352_rating_enum	\N	\N	2023-03-05 10:16:12.695131+00	1
c61e3acd-3f4a-48b5-9eb1-9a2b6bca853b	8bbbb46544a7fc9e118d5a89e7904b9bbf0ab68754419f304124f37b2b264025	2023-03-05 19:17:44.520704+00	20230305175639_add_great_rating	\N	\N	2023-03-05 19:17:44.277976+00	1
83882fa7-3f5f-4b33-a65e-87e2a4d0827a	9c6a796341388e90bd33795338158836c5daaddf87c4b37d9b571b857befecf8	2023-04-20 16:40:15.886072+00	20230420091646_fix_eight_class_code	\N	\N	2023-04-20 16:40:15.366789+00	1
0bfeabcf-e113-4dd4-9ee0-3a40e113e4aa	bcfcf4daff679c29e232ad994388150180ef0bc13cb5a92057e13358a0a84ab2	2023-03-07 21:19:36.995822+00	20230307152132_rename_class_to_group	\N	\N	2023-03-07 21:19:36.459982+00	1
8d3a81c2-130e-4984-b7cb-639e631236e0	e4c5a98596ef886aaa9f8240ee974ca9668d312151eddfd24cc5efa1b572f3b4	2023-03-12 15:43:10.552896+00	20230312151119_cascade_student_delete_to_evaluationt	\N	\N	2023-03-12 15:43:10.027519+00	1
b06da283-d7a9-4c8d-be77-c69d80df2135	d29707be0e0e6b828b17257c460264ca8c80c93e237fc9ad4f913ed5ee83624c	2023-04-27 08:43:10.354801+00	20230427083950_remove_test_fields	\N	\N	2023-04-27 08:43:09.826025+00	1
02c45c2f-4693-4319-8422-fde7cf4ff559	e98b093364209042095842e5a7af79c98a7370a55fdbc99e364f1c87e017f678	2023-03-30 18:34:09.520671+00	20230330144633_add_updated_at_to_group	\N	\N	2023-03-30 18:34:08.988331+00	1
03ef5bc3-5cc8-4c37-95a3-25ee756c6820	07ac29988ecc2be12ee40c61aa0baeadcf8ca7ccb16c3ff0287da7c1abb795d8	2023-04-20 16:40:16.593511+00	20230420101930_remove_group_collection_relation	\N	\N	2023-04-20 16:40:16.087592+00	1
caad31ba-cd1d-4fde-bc63-f4b0a782593d	ac52be372ee64c1433dd367b4a69d2950c982b8443386f140e938cc9dab46f77	2023-04-09 11:55:01.888795+00	20230409081404_add_subject_and_environment_fields	\N	\N	2023-04-09 11:55:01.391664+00	1
837b7d7a-58f7-437f-9c28-1aa157edaf27	6435ed345fe6ed5fabfe828d42083e5375ed570fdde861115d69fba4c2b1ce70	2023-04-09 11:55:02.576199+00	20230409081844_	\N	\N	2023-04-09 11:55:02.084009+00	1
fb085804-1183-4d0e-934c-a69d79399a5e	1e1a2d27c8976ca8460364775753729052b7bfd6279ee25030a23458485b35a3	2023-04-22 12:23:52.35229+00	20230422075622_add_learning_objectives	\N	\N	2023-04-22 12:23:51.827547+00	1
627cdbac-e941-4d66-9a07-2fdb66ba0f7b	bf42af5126eec814dae41af5fcfae095f3c3e200f7cb59cd20f148657fed43a5	2023-05-02 11:49:00.682245+00	20230428104824_add_is_stellar_field	\N	\N	2023-05-02 11:49:00.509007+00	1
882f1812-ad1e-4428-adcf-7cb031f45096	94dbceb98bb21acaf0e516288ae74c2345b07676397612e76167f72dfb692398	2023-04-26 11:30:31.085353+00	20230426112053_add_star	\N	\N	2023-04-26 11:30:30.57664+00	1
5c52fcaf-48c2-47d7-aded-d5410259231f	5912a098235fbd2048f7e170150df03fbbd5b8daacf5e483d1addb0cef48c476	2023-04-27 08:50:00.975398+00	20230427084811_add_test_field	\N	\N	2023-04-27 08:50:00.460676+00	1
95fcca05-1e7c-43e7-b76a-c4d3a3bd5a7d	0deb7a65a95a3676efbdbd7944c05a18c9516cef1a46c7033e4a0178da24a754	2023-04-26 11:45:41.8665+00	20230426113947_remove_star	\N	\N	2023-04-26 11:45:41.347276+00	1
510b42c2-eb3b-4135-9680-77798a66d6f3	94dbceb98bb21acaf0e516288ae74c2345b07676397612e76167f72dfb692398	2023-04-27 08:26:39.286132+00	20230426114808_add_star	\N	\N	2023-04-27 08:26:38.777215+00	1
258a3897-4d69-4032-87e8-144953b2de0d	6b7cbf721b055709c56dc637c0c5a2ece79992a1223b46c5db56df1f57b9d054	2023-04-27 08:57:56.067251+00	20230427085526_remove_test_field	\N	\N	2023-04-27 08:57:55.550378+00	1
7439170f-3aa0-4d00-973a-77a4101e40a7	5912a098235fbd2048f7e170150df03fbbd5b8daacf5e483d1addb0cef48c476	2023-04-27 09:01:47.635856+00	20230427090000_add_test_field	\N	\N	2023-04-27 09:01:47.110439+00	1
d198d750-dcc1-4c68-b712-a6675fd83852	6b7cbf721b055709c56dc637c0c5a2ece79992a1223b46c5db56df1f57b9d054	2023-04-27 09:22:09.581958+00	20230427090653_remove_test_field	\N	\N	2023-04-27 09:22:09.174543+00	1
\.


--
-- Name: ClassYear ClassYear_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ClassYear"
    ADD CONSTRAINT "ClassYear_pkey" PRIMARY KEY (id);


--
-- Name: EvaluationCollection EvaluationCollection_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EvaluationCollection"
    ADD CONSTRAINT "EvaluationCollection_pkey" PRIMARY KEY (id);


--
-- Name: Evaluation Evaluation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_pkey" PRIMARY KEY (id);


--
-- Name: Group Group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_pkey" PRIMARY KEY (id);


--
-- Name: Student Student_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY (id);


--
-- Name: Teacher Teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Teacher_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Teacher_email_key" ON public."Teacher" USING btree (email);


--
-- Name: _ClassYearToStudent_AB_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "_ClassYearToStudent_AB_unique" ON public."_ClassYearToStudent" USING btree ("A", "B");


--
-- Name: _ClassYearToStudent_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_ClassYearToStudent_B_index" ON public."_ClassYearToStudent" USING btree ("B");


--
-- Name: ClassYear ClassYear_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ClassYear"
    ADD CONSTRAINT "ClassYear_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."Group"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EvaluationCollection EvaluationCollection_classYearId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EvaluationCollection"
    ADD CONSTRAINT "EvaluationCollection_classYearId_fkey" FOREIGN KEY ("classYearId") REFERENCES public."ClassYear"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Evaluation Evaluation_evaluationCollectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_evaluationCollectionId_fkey" FOREIGN KEY ("evaluationCollectionId") REFERENCES public."EvaluationCollection"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Evaluation Evaluation_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Group Group_teacherId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES public."Teacher"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Student Student_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."Group"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ClassYearToStudent _ClassYearToStudent_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ClassYearToStudent"
    ADD CONSTRAINT "_ClassYearToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES public."ClassYear"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ClassYearToStudent _ClassYearToStudent_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ClassYearToStudent"
    ADD CONSTRAINT "_ClassYearToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

