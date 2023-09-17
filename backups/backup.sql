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
    'HIGH_SCHOOL_FOURTH',
    'HIGH_SCHOOL_FIFTH',
    'HIGH_SCHOOL_OTHER',
    'VOCATIONAL_OBLIGATORY',
    'VOCATIONAL_VOLUNTARY'
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
    "skillsRating" integer,
    "behaviourRating" integer,
    "isStellar" boolean DEFAULT false NOT NULL,
    CONSTRAINT "behaviourRating_between_4-10_constraint" CHECK ((("behaviourRating" >= 4) AND ("behaviourRating" <= 10))),
    CONSTRAINT "skillsRating_between_4-10_constraint" CHECK ((("skillsRating" >= 4) AND ("skillsRating" <= 10)))
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
    "currentYearCode" public."ClassYearCode" NOT NULL,
    archived boolean DEFAULT false NOT NULL
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
ad630fab-59d6-4f95-85f3-fe78b14da668	PRIMARY_SEVENTH	558998de-3364-412a-908a-70b27920ea42
0edef857-3f65-4e82-aba3-02c69e0191a8	PRIMARY_SEVENTH	b03b85ef-19a9-47ab-9903-b0a2b82bb1de
fd028225-16dd-4d8e-8c86-a81a9d9243e5	PRIMARY_NINTH	5d674efc-3549-4837-b221-44c4d622eb09
640e87de-8063-4c00-9087-c17709e34059	PRIMARY_EIGHTH	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
b84acf3b-29a2-48a0-899c-8ea75f7920f2	PRIMARY_FIRST	9d124d20-5f11-4647-9256-b1c43740dd81
a6a42248-8033-4254-8b5d-ba325479414d	PRIMARY_NINTH	bde28363-5c62-493c-afee-04d21e9eecde
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	PRIMARY_SEVENTH	4c36484b-3244-47a9-a5e3-235c9474383e
999be80c-ff15-4515-ba2d-3f330319b986	PRIMARY_EIGHTH	5922e468-ecb6-481e-bfdb-c4e2386cb070
11455bcc-2381-45d9-aeac-ad4bb321eab9	PRIMARY_FIRST	53bbc105-6e07-4841-a795-c75f806bea01
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	PRIMARY_SEVENTH	e768794b-c688-4dce-9445-23e8d4c3c986
cf7246cc-5760-499a-9252-c3d1bbcc79e8	PRIMARY_SEVENTH	8eba147b-a52c-4bb7-b42c-7525324113f4
7bfd943e-c11d-458c-a010-48c84b8a6a43	PRIMARY_FIRST	e6299525-7a48-4030-a523-cf249433d62a
f6160571-beff-4c21-b3af-399f376429ae	PRIMARY_SEVENTH	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
61dc37a4-b86f-4563-8fca-37aad69a1f05	PRIMARY_NINTH	e5fde4bf-6630-4459-9d8e-31740b307c02
45982a54-e42c-4e48-8b84-32689d592abd	PRIMARY_EIGHTH	36b2f528-25fa-4ce2-8d35-6d487a5078d9
b6a7dc4a-0717-4b80-a18e-39651d41c5a4	PRIMARY_SIXTH	a0cd3827-7fc0-4b11-944f-cd459880a439
9b7eb5b0-ddfe-4af4-94d5-53bb36f98117	PRIMARY_SIXTH	da15b065-9c67-4003-8ec0-7e1e2eee111f
c27efea4-643a-4cdc-9c40-e58525a49720	PRIMARY_FOURTH	92ce53f7-53e2-46a0-ac39-ecdefa3dfef7
8ffe45c2-e5a4-4702-89d4-2df665869687	PRIMARY_EIGHTH	c9fc597a-3fe4-4035-8773-b858579c2f3c
e3aba1ba-865b-4174-b776-b5936ab840d3	PRIMARY_FIFTH	e3b855ae-8277-4c8f-b9e2-5f8b66351bcb
bb17b295-c660-46a1-bfa1-7c299d3b0a57	PRIMARY_FIFTH	d7eb105b-f258-443d-8ed8-c69546ac564c
598d6e30-40ac-4570-84f0-b670bdbf285b	PRIMARY_SIXTH	a03847bf-8bef-44b1-922d-1626e7837406
3d9e5620-5258-4bb0-b561-5942790e6f0d	HIGH_SCHOOL_SECOND	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	PRIMARY_SEVENTH	a421b5e1-eb01-462e-899b-adb1b57e3b0d
a40b3250-b715-4475-8802-b8cee2336933	HIGH_SCHOOL_FIRST	5068fa59-55a9-48cf-9bb2-38a2a7b9ae0e
7fe00095-698d-4a5b-9fc8-0112800d0b89	PRIMARY_NINTH	9ebcb35c-02e8-4b5d-ad9c-3dae255bdab9
36347506-9fe3-4cc1-bd70-3f56675ba66c	PRIMARY_SECOND	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
6f377d70-cfec-45c3-aabb-c41bdedaa327	VOCATIONAL_OBLIGATORY	c96447b3-d0d3-4985-878c-02536cf49e7f
0736c55e-a30f-468d-ac92-011155f63782	PRIMARY_NINTH	d0ef07c9-3848-4ec9-9d15-57168b896cf6
9b8adc7f-39c7-4925-847a-818b9389c18b	PRIMARY_EIGHTH	f5010fc6-0d96-433f-aa33-9eda0587072e
eddf7eba-893e-44b5-9955-27b93b03a8ea	PRIMARY_EIGHTH	f963a69e-577f-45ee-bdf1-f3ade1a8fac4
7c6e7596-e58a-417d-873d-71e3a97a5cf9	HIGH_SCHOOL_SECOND	b811f8b1-7d1c-447a-8cda-853f44e55fb6
07ad7d5a-6bde-4c10-b4af-70932def7817	HIGH_SCHOOL_FIRST	4fe72bd5-8f67-4212-a715-4a0ca602e632
fc400672-2a2e-44b1-966b-d887bb7d1f40	HIGH_SCHOOL_FIRST	fddc0331-595a-4010-bada-fb28a1214d56
69713ee3-036c-4395-9000-83c65184921e	PRIMARY_FIFTH	9e608b2c-cf73-43cb-af7f-0c86315d9184
a153dc01-0752-4f56-9501-8fc52ba97f0b	PRIMARY_EIGHTH	b509833f-510c-48b3-ac2f-f3a224f7689b
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	PRIMARY_FIFTH	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
96cb2e41-a16d-4ee5-9a1e-353c1ceaa5dc	VOCATIONAL_OBLIGATORY	d457226c-cff9-41c7-aebf-44a439e626c4
0e33bb0f-b6ba-4005-9106-3ecef0171499	HIGH_SCHOOL_FIRST	4117be07-2cdb-4d17-a14d-f6b970f78821
d872e1e1-07ed-4fe7-b285-f11e407754c7	PRIMARY_NINTH	bf327012-7775-405f-b937-3a7c1508eda3
f3845ff7-d477-4acd-b451-31db79a8c7b1	PRIMARY_EIGHTH	93ecb125-ab82-4d66-99dc-ed689a177ba0
49f0263b-9be4-44f2-be54-8f95a1942dae	PRIMARY_NINTH	ccd44372-5947-4b45-acc4-585c5f15c338
d77b1c6d-e41d-420f-8f22-e8494af72bcf	PRIMARY_FIFTH	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
60ba446f-c350-4d72-8722-cde0c39c9a63	PRIMARY_FIFTH	f963a69e-577f-45ee-bdf1-f3ade1a8fac4
04402773-b275-48b2-83f5-0758c257167b	PRIMARY_NINTH	328073c3-0870-4171-93de-3d88100d6acc
587a6af4-afdd-4bf5-90a9-04bcadbb4807	PRIMARY_EIGHTH	872249e8-3e3c-47f4-8237-b25a13afce6f
94673584-2806-4e30-9a43-1fd7c50320d8	PRIMARY_EIGHTH	4f76d4a5-d7bd-45b0-8041-357685155fd6
ebeeb773-3d06-4722-b7bd-feae8c78ef4b	PRIMARY_SEVENTH	f375a966-3fef-43db-9afc-3ff484bf14c7
d3f5eb51-9cac-441e-91ac-bad14e134b9d	HIGH_SCHOOL_FIRST	2cba9a0f-2452-495a-9fbc-0180ea49411e
78e46daf-61ca-4997-bf43-5c5277ff6f4c	PRIMARY_FIFTH	bffeb915-f568-4167-aee3-a59ad70d0ac6
fd2e1441-8e35-4b56-bcff-0ba580e2b583	HIGH_SCHOOL_FIRST	43ce3dc0-4659-4c6c-969e-65c92e3b24db
d96c1f14-518f-46dd-a672-241f18ade35f	HIGH_SCHOOL_SECOND	43ce3dc0-4659-4c6c-969e-65c92e3b24db
585c3f5d-302c-46c6-95d2-ef7e1a1ce04b	HIGH_SCHOOL_FIRST	bb364b38-c286-46d4-9bd4-fbf13531a884
bf4c8f93-5596-4bb4-8505-2d4fcbd5cf8a	HIGH_SCHOOL_FIRST	cd74808e-451c-4d1d-93a2-47c46f8385e3
d427be8a-0aba-47fb-8960-a447826b0343	PRIMARY_SEVENTH	a7f2d79a-709e-4edf-bb8c-cf50567f926e
8b14c644-c872-44fa-9f1c-52f86c74bdc7	PRIMARY_SEVENTH	1eae19b4-6de5-45d6-9f05-2039e90f8df9
7f091af6-1c43-4020-9360-e05a6563e18a	PRIMARY_EIGHTH	e8fd1190-3395-4370-af51-9d9884a145b4
63f2c632-042f-45d8-864e-8ecf96d21f70	PRIMARY_SEVENTH	20952378-342a-4b6e-9cd2-040bcee46e69
513dfcd2-a39c-41ae-b3a2-23dd05d315ef	HIGH_SCHOOL_FIRST	5c1dbf22-8f21-42df-a878-43f0d7446bde
d934236a-8a21-4500-8408-d8aee2cb6b27	PRIMARY_SEVENTH	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
8497021a-61fa-49ee-ac25-5f321fc52fde	PRIMARY_EIGHTH	3e75cd57-f337-4778-acf3-7df420b17374
f5f01d31-e035-4996-b260-dc63d21906db	PRIMARY_FOURTH	d49cfd99-fa09-4729-8fcd-1d1b66102c89
a6290fba-9996-4d99-9ba6-d6f68cf8463b	HIGH_SCHOOL_FIRST	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
64b534f4-7461-422c-bf3b-8d5bde2e36f7	HIGH_SCHOOL_FIRST	0fb115d6-0135-4a01-aa83-019cbdd01cc3
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	PRIMARY_NINTH	05921118-fee3-4527-ae43-518e2b92b04c
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	PRIMARY_EIGHTH	a7449b51-02e7-4f28-a799-bbc7f7f1496d
fba7b151-8a02-40bb-9dbc-62c14c786c4d	HIGH_SCHOOL_FOURTH	ef819731-2f4e-4980-9534-bec0630fee53
25247b17-635d-4a64-a9a4-1462133e7d50	HIGH_SCHOOL_FIRST	2fddc898-f1d1-4f7d-8406-be7c3a7e261b
\.


--
-- Data for Name: Evaluation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Evaluation" (id, "studentId", notes, "evaluationCollectionId", "wasPresent", "skillsRating", "behaviourRating", "isStellar") FROM stdin;
d3e17332-f892-4c43-84dd-191f725cab6e	a639981f-4bf0-4871-b264-00ad02a9a286	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	8	8	f
6db90de4-3daf-41a4-9327-d43b49a4cced	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	9	\N	f
2c5cf9d7-bdd2-42de-aad0-47ca98bae8a7	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	9	9	f
75486885-f53c-4b3b-91b2-32fd69d52a2e	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	8	\N	f
358c1382-e84d-4004-9f7e-7019500ce3b3	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	8	8	f
c4d09c63-5cba-4507-841d-f0e5b1d21c9c	e71cd959-78a0-4843-af83-1e8e741e7edf	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	9	8	f
0bec5a10-f69e-4bc7-98c5-1d459547f144	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	8	8	f
dfcb3c04-b3d4-4d4c-9420-aacbe85daeb1	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	8	9	f
5d875f8d-ed40-4fa5-8138-868ce1123c5d	f03779c1-9d87-439c-8d95-14e384c7d2c0	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	9	9	f
178f910b-7546-4153-9bb7-096b220313eb	c942743a-d10b-4460-bc99-44ea941f6f8f	Hienoa työskentelyä pariakrobatiassa	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	\N	f
0ef53625-a314-41f6-a691-1f539195a3dd	5bbc08f9-01e0-4911-9a6a-38790219ce2a	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	f	\N	\N	f
6d3f38c3-78c6-4a87-a521-8f14226b8721	148a28ac-012b-44c4-b684-87a00ace9c72	Työskentelit hienosti parisi kanssa!!	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	\N	f
7ddc395b-4525-49b2-b24c-fba07b241a46	e71cd959-78a0-4843-af83-1e8e741e7edf	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	\N	f
90e61cab-6e87-4562-b6e8-e4baaa8736c9	5bbc08f9-01e0-4911-9a6a-38790219ce2a	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	8	f
e861b589-6b77-4d67-a2e5-3282d6d78ae6	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	8	f
67508c44-38e0-490e-8d29-5fc0995b542a	f03779c1-9d87-439c-8d95-14e384c7d2c0	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	8	f
6dfeefc2-da1a-4e4d-9a5b-41c91d64f47e	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	9	9	f
0f987059-3361-410c-a4d7-3662e6bdea4e	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	9	f
5aa1f256-ead1-427e-9589-f6ddf3726ce8	148a28ac-012b-44c4-b684-87a00ace9c72	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	9	\N	f
5a9d1c39-2148-40ac-8ab8-ee1d950a2a42	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	9	f
1b5c59f1-a5a1-46a8-97c6-431e35f2dd18	f198a966-c599-4457-ab33-bc075adefadf	\N	8d478ae5-8238-4ee2-9731-b04edb5026c6	t	10	10	f
a87fbc47-31fa-492b-adbd-9353beb64c66	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	61dae344-c6b1-465d-890c-d542dcd25a4b	t	8	9	f
9a1f0588-d101-465e-ab4d-cab6e93212db	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	\N	9	f
af1483da-d7a1-45b8-8c8d-3e8af1c4fe08	350594d5-5cd4-4033-9294-6b50102afe7d	Paljon juttelua	4029717a-ba95-4c26-abfe-453df2616d81	t	8	8	f
9acdf63c-981e-48d6-b61c-66d6613a39d8	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	9	9	f
a3ed28b3-d106-41e8-8d3f-4f376c518bba	91a00bae-00db-464f-8376-591e16a5a811	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	9	8	f
1ae8beab-580e-41b4-bc24-0cdde7559b30	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	f	\N	\N	f
ff8e5a44-b1a0-4778-bc07-b308e91e2354	81f9f274-c50a-4b30-b0f5-15c1479b942c	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
dc858ea5-f1c5-410a-a734-2bc7c6707899	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	8	8	f
e1ff49cd-aa9c-4cf7-b232-33150eed4d46	17a303e2-58b9-434a-b0e3-a3227ba197dc	Olet taitava uimaan usealla eri uintityylillä	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	\N	8	f
46dd36f5-4cff-4955-bdbc-cb601c72a234	a6eb654d-12a2-4350-a687-128314062791	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	8	9	f
0ae73025-7705-4e69-84cb-38f1c1f886c5	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	8	9	f
08a7fffe-d7a2-47c3-b72e-c98e5fb3fbbd	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	9	9	f
bb6c82b7-8c12-4e86-8e5c-e6847a75dec6	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	8	8	f
de671f6d-a296-4490-8a75-6f2630f6626f	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
471b6bc0-a013-43c5-8806-85709f4d2bdf	49c4aeec-3a4e-4761-b3cf-2546381857f7	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
c8da7618-1c1a-4b77-8f3b-7862e862b0ed	b8bc48bb-2b86-415c-837f-dbad58dd3e2d	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
5ddc9cb4-d683-4b07-8078-a009075a5341	a2a3736c-4cbd-43f4-b8e4-8041a2b9d8f5	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
d8fcc24e-5e1b-40dd-bbf1-e361ffb8dc45	7c413b7f-9005-43a9-9b44-1984a23ae65f	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
9c6558ad-b449-485d-89ea-227d05172154	f96609c4-4c21-4b74-8523-f2c3b78d4c49	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
7e25e499-01bc-49ff-9081-53235dbe2b1f	c7a9dddd-29a9-4698-991f-ecab63cf6fd0	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
09c29031-e45f-43a9-b6e3-e88c68c63626	7b55eeb0-4468-4696-b2fd-a50a7e058ec5	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
fef7e675-bcfa-4ef0-9f1b-1ac7d25a7e6c	25ba77b8-721c-4c32-b5c6-97ea194d2958	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
b6038e1a-b52c-4199-bfe0-9cdca28de633	f826618b-cee5-4d6c-bcde-27e7a74a0b63	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	9	\N	f
129c084f-ffd8-4d2e-87ec-2cb6835d93eb	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	8	8	f
023a2aed-1664-44c3-8f6a-6e113f019cb7	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	7	8	f
ebfa93d1-6b9e-4ab5-a216-9c3b09e8ba65	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	f	\N	\N	f
0fff3852-2b56-47cf-90cb-b958946fc5fa	ffcd87aa-e63f-4a34-a82b-ec98c80ff979	Leevi oli vähän tuhmana...	43d83271-76a1-453b-b117-72d4a3741fa6	t	9	7	f
90ee5ccd-ed6d-4f6d-b57b-a1b406fb72c7	b9f75da6-4587-44ca-b3f3-a5bdbaa9fd90	Pelkkää posia!!	43d83271-76a1-453b-b117-72d4a3741fa6	t	\N	\N	f
5e9ce401-635e-41e5-ace1-56740b27cc4c	6743208b-a2b7-4951-9d65-602313f52be8	\N	8d478ae5-8238-4ee2-9731-b04edb5026c6	t	9	7	f
9d447fe0-5859-41b6-849c-fda3dc71961b	16c2d264-2e7c-452d-980a-114909d369f3	Eetu ihan ok, vähän lähti Leevin temppuihin mukaan	43d83271-76a1-453b-b117-72d4a3741fa6	t	9	8	f
62c8d1d5-75a0-433d-8716-c1c4cffcb576	ffcd87aa-e63f-4a34-a82b-ec98c80ff979	\N	024a5d62-d90f-4f73-b293-3286175ca586	t	\N	\N	f
4741188e-56cf-4578-a314-53076f1cdaff	b9f75da6-4587-44ca-b3f3-a5bdbaa9fd90	\N	024a5d62-d90f-4f73-b293-3286175ca586	t	\N	\N	f
816490aa-e214-442c-b7a5-e89ff100e920	16c2d264-2e7c-452d-980a-114909d369f3	\N	024a5d62-d90f-4f73-b293-3286175ca586	t	\N	\N	f
4c51fd46-536d-4f40-acea-00d57653ddc9	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	f	\N	\N	f
5b646f41-7f66-4714-9cee-f27701b8ebab	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	8	9	f
2319da22-22c2-49a3-98c0-773905c574d2	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	9	9	f
6e8886bf-11bf-4e4e-be74-0c8cb856cb37	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	8	7	f
34eff05b-d843-4c5d-bda1-13ccb106981c	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	8	9	f
86b9fa0d-9cbb-4a8f-8467-5cfe4bff6b19	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	8	9	f
bdeb30be-2f84-4781-a864-16dcedacad21	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	Toimintaasi on oli seurata vesiliikunta ympäristössä	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	\N	\N	f
215a6f0b-dec2-4bad-9d66-929817547468	8cc39180-992f-41be-88d7-d798fc88abe0	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	8	8	f
9e0e1a19-5385-432b-b3af-70e8eddaf89b	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	9	8	f
cc0566d7-4e3f-4d6e-89a1-510373e8f394	789e18c3-638d-4651-be65-ec0a1661539f	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	7	7	f
bb60538b-ad6b-41ef-b38c-9580f8e897fb	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	8	7	f
6b7c3223-0f65-4804-acd9-507e1e1f9b47	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	8	9	f
14117cbe-fe0a-4253-b0e3-9e197000cf65	d04c2d81-ce92-4221-990a-64c5e1142ee9	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
bb6dbb55-08e1-49fd-a3e2-a5a105e8d8ec	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	9	f
4bf1a76a-15ad-47cb-870e-21c95cd275c7	86ad5e56-2605-4fd5-a0a2-3004e6136a7c	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
595809a4-fe39-4fb4-bffc-62f453691878	3c489011-57bc-41fa-a0b1-2166fd23bac5	\N	4d3fddca-2214-40dd-aa09-3f4031174783	t	8	8	f
d61d3f11-f3a1-448f-b876-34e3252da7d0	39826f74-cf4a-41b7-a295-5cb63ec3a196	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
1725345e-2045-4087-b903-1f25271b8b4f	954c2876-5f2b-4618-a2c0-8f86ff5b3da5	Kiinniottaminen onnistui ja kehittyi tunnilla. 	4d3fddca-2214-40dd-aa09-3f4031174783	t	8	9	f
b4bd3983-2650-4b42-864a-131cfbeb117a	3d55963e-6744-4828-b25d-c02aaa7ccc4c	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
46e3fd73-f439-4dec-8d3d-94e6f0244676	c2ae2a6b-93f6-4dc5-bcb9-1f90a26c11d8	\N	0b6aeb65-5d32-46cb-9c00-bb7579506258	f	\N	\N	f
9409f479-cccd-4050-bc81-a5dc6f8f0f81	9f830199-bde9-43a4-84e9-986992a1e3d3	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
3f067b52-ad95-4cd4-8f61-c2be39172095	7af2670e-d622-44de-9458-0e3490224f19	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	9	\N	f
834176a4-72f6-4c7f-a912-616d1676ebcc	081d3462-484c-45f4-b7df-9eef1712d829	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	9	\N	f
03fcfa62-c65e-4344-87c4-d2951535e00c	74c83e0a-3e21-4c01-b18a-a81f7e089d64	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	9	\N	f
1294103d-cd0e-41e2-8819-b3edd582a13d	1efd1671-ff54-4332-9da1-474aa3f3ec04	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
bae41fd8-522e-434f-b8be-f68da9854888	45adabcd-6682-4ff7-abee-9f8061af9a3b	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
51d4ec61-4977-4214-8221-d61a724bf834	750d8c1e-30f2-49fc-a445-7acdb4bff78e	Kiroilua ja salista poistumista. Vaikea päivä työskentelyn osalta.	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	9	7	f
bf6d0618-658b-40f8-9874-ea2c6ebf15dd	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	8	8	f
728d69ee-a86d-481a-8885-f771a28c164b	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	Kiroilua ja vaikeuksia työskentelyssä. 	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	8	8	f
f8ab12d8-2675-4517-85e5-fae59a6b1fe5	c4365db1-b405-4aac-ad56-4f21780797c0	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	8	7	f
152ebd69-4200-498e-a8fa-35a37c6ac865	eac386e1-ca07-42b6-9817-50f1d1081903	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	8	9	f
b8e5abb3-e3c6-4e61-8680-5c7a7ccb4cbc	0d39a916-dd79-4bc8-b493-771b456ed8ce	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
9ac970dc-622b-487a-83af-57464b065d51	e25eac4b-ed6a-433b-b311-c27ea3f1faa4	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
7ab154f5-7322-4e02-8b74-d83b2f85f915	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	f	\N	\N	f
4ea90939-ce56-4bed-861c-1321bf2b6be4	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	Poistui tilasta omin lupineen. Vaikea päivä. Osallistui viirin ryöstöön tsemppauksen jälkeen.	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	8	7	f
5406d550-0509-494d-af2d-4dca473a0ceb	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	8	8	f
e46fb98b-23a6-4e37-b2d0-cd120e4349a5	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	t	9	\N	f
450e11df-53b6-463e-9e90-2046fb22cb81	c0011bcd-6952-4d60-a01b-3b455c7eea4c	Passiivista osallistumista.	117ab460-e5a7-4e15-a674-aed050c43bf5	t	7	7	f
315e796a-3bc7-455e-9fb8-daa4576b042c	67c02902-d7e2-47e1-abef-9d1ae14a3da5	Passiivista osallistumista.	117ab460-e5a7-4e15-a674-aed050c43bf5	t	8	7	f
55d34e7c-e29c-4435-b8a9-5a7aeed4fbd6	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	\N	f
5f0afe16-d975-4768-95ca-b2ff7d38444a	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	\N	f
3c692436-bc41-4e2a-a71f-46a09d65c13c	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	\N	f
9abbe2eb-feb2-41e7-bfcd-e49f0fcc6304	7b55eeb0-4468-4696-b2fd-a50a7e058ec5	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
d07cadb4-e25c-4e49-b3ea-0a2f90d8bdb2	c7a9dddd-29a9-4698-991f-ecab63cf6fd0	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
4e9cf351-5de3-4f8e-8bfb-b06e4796dc19	d04c2d81-ce92-4221-990a-64c5e1142ee9	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
86c9e338-06fd-4113-ba0e-1dbc33bf7744	7c413b7f-9005-43a9-9b44-1984a23ae65f	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
150e9334-cdbd-43d4-bb4e-9e2eb51b060e	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
8879cd7c-4d83-4f37-a88e-796685033cff	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	8	9	f
6c8f7edd-5a6f-4c86-a29c-5905c211a6f5	74c83e0a-3e21-4c01-b18a-a81f7e089d64	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	\N	\N	f
cdcf9bc5-70c4-4dc1-bfe2-4a4183c83c43	4fa0db05-161f-4165-b00c-52528866490c	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	9	\N	f
e868e01b-d4b8-4a8d-95ff-5c5a95e3d21b	4bb3b891-7462-4e8d-ae54-e2df607d1478	Osallistuminen vaihtelevaa. Etenkin alkutunti meni muiden asioiden kun liikunnan parissa.	4d3fddca-2214-40dd-aa09-3f4031174783	t	8	8	f
9970a9b5-cd67-4198-9fff-957c6b7d6bc7	98d2b651-d44d-4a40-ab28-da3fa61df960	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
29fc69f7-2288-4175-8bf3-1137a8f575b4	dc61c65a-cfe6-4743-a80b-98c54491a42c	Loistavaa työskentelyä. Mukana kaikessa. Kokeili ja otti osaa.	4d3fddca-2214-40dd-aa09-3f4031174783	t	8	9	f
47ff899d-a233-4a45-a06a-87a6966dd0a5	1ba24224-da11-4745-be85-ed1ce7bb2669	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
9823bf05-fa4e-4684-9077-edc3063f9a77	8faa9bc9-fbb9-4c0c-ac24-99c987bd412f	Pää kipeä. Oli silti mukana tunnilla ja osallistui myös pelissä!	4d3fddca-2214-40dd-aa09-3f4031174783	t	8	8	f
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
45603ef5-c981-4326-a94f-5847ab418113	2487435b-5598-4a44-bc31-f93ed8a2ec43	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	9	8	f
ef32d413-132a-4233-bf3a-2e2493467677	28426aca-f675-46f7-bafc-dc5f7eb649c5	\N	66d2d829-a0e3-4d31-accc-ec37f5bc90c1	t	\N	\N	f
ed9e0099-b5f1-41a5-bf0e-f45003177695	251b27c1-5684-424b-b17b-7257a311bd33	\N	66d2d829-a0e3-4d31-accc-ec37f5bc90c1	t	9	\N	f
64fbe531-806f-4cd4-8f7f-88820f500009	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	66d2d829-a0e3-4d31-accc-ec37f5bc90c1	t	9	\N	f
334bc20b-bdfd-463c-897d-72b49ef74111	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	66d2d829-a0e3-4d31-accc-ec37f5bc90c1	t	9	\N	f
6e090fd5-ffb7-4c22-8f29-eb2929965bef	9c66fa7f-c08f-4905-9c54-5da739156493	\N	66d2d829-a0e3-4d31-accc-ec37f5bc90c1	t	\N	\N	f
08e3bf4c-3e8c-4a4b-b495-fb1f84e40069	04629d10-42df-4873-bb8e-a38230d93b8a	\N	66d2d829-a0e3-4d31-accc-ec37f5bc90c1	t	9	\N	f
5affd774-e847-468a-8c5f-96e975a0e462	b8a8e21b-2e09-4855-a354-0c48800913c9	\N	66d2d829-a0e3-4d31-accc-ec37f5bc90c1	t	9	\N	f
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
f15fddbe-cb59-49be-b14b-024177ba0a27	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	d83204d9-d54e-4d7d-80c3-c28d96b0e0ef	t	9	9	f
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
6aa4f103-d61f-43e6-95c3-156e69bc6cf4	404347be-f571-4254-b055-a06e9a9962f9	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	9	f
9c6fa923-7d22-4074-962b-6944581abbc0	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	8	8	f
ff826293-45d1-4927-9888-84a60866e76f	49c4aeec-3a4e-4761-b3cf-2546381857f7	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	f	\N	\N	f
d4434c4c-e57a-4b8e-83d9-47ed9c40ac55	0d39a916-dd79-4bc8-b493-771b456ed8ce	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
abb47f73-f8a2-43e7-93f4-d3302d54c27c	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	4029717a-ba95-4c26-abfe-453df2616d81	f	\N	\N	f
87e693f9-2acf-4749-9add-d9bafb5ba6ac	a2a3736c-4cbd-43f4-b8e4-8041a2b9d8f5	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
59e8f5ba-58c5-4c69-a24b-2f7e00b8d0b6	213addc7-6d5d-4a39-95bf-ded6afa510a6	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	\N	9	f
4c1d12c2-90cc-4d8c-8046-ce2c394f6c61	b05b035e-4867-40c1-965e-f60630bfa457	Ei osallistunut alkuun, jalka kipeä tms.	4029717a-ba95-4c26-abfe-453df2616d81	t	8	8	f
b830b3c4-92b1-44a0-980c-abcff69c1a41	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	9	9	f
9978668a-b487-4f14-afda-1d49df54d0af	e25eac4b-ed6a-433b-b311-c27ea3f1faa4	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
a787ced0-7168-4cca-9678-a8ecada4b216	f826618b-cee5-4d6c-bcde-27e7a74a0b63	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	\N	\N	f
2f52f172-e781-4057-a297-a04e57743649	9f830199-bde9-43a4-84e9-986992a1e3d3	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	9	9	f
10e3f9b6-8058-4ed0-b7f3-bc7a39dc0358	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	9	\N	f
95ff2d6a-5362-491d-980f-319b5a2d8fdd	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	9	9	f
617902db-4ca8-417b-832e-df060b9387fd	2487435b-5598-4a44-bc31-f93ed8a2ec43	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	\N	\N	f
69743706-6852-4145-b375-fdb95b0de288	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	9	\N	f
0104cfed-37c2-4a13-ad9e-c1e4247707f3	c4365db1-b405-4aac-ad56-4f21780797c0	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	9	9	f
1fd9a9bd-ac5f-418c-8585-ce2eed6c7b28	a71c4a77-39cd-4672-a59a-0394bec62fcf	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
1c8c05cd-a916-4a0b-997b-12566c9334fa	f179052b-20ed-4b30-92df-04ae478b0f06	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
3fe48ae3-84ca-408e-831e-cb8f144834c8	74ff2516-b259-4f3d-b68b-dbc5c29d6daa	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
196946f7-8fea-43d6-af55-f0167c3f2336	0d410afb-beb1-4ac1-883c-f4d19f5f858f	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
c267a63a-7984-4db4-b4ca-b328b51e58b9	344890ff-a10d-4801-992d-36bcbcc43663	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	9	9	f
6e4d39b2-4f43-4d22-a912-b76c15c30fb8	1b5d1532-f11c-4b7a-bb15-8754ae38223f	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	9	\N	f
eba7d2a3-34c2-421b-afaa-78d2596be8dc	5b0a3d1b-efdc-4ec5-a0f5-50e84e66966e	Terve terve jotain huomioita	0b6aeb65-5d32-46cb-9c00-bb7579506258	t	\N	\N	f
f82db680-f1c5-4eb6-9931-433aae87f59d	213addc7-6d5d-4a39-95bf-ded6afa510a6	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	9	\N	f
52efa44b-18eb-495d-b121-0cee47b6a19e	a9823635-cc6a-4026-ad85-423287d7ec49	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	f	\N	\N	f
064b9e5b-3b61-4d92-b519-9a58e93f810a	e25eac4b-ed6a-433b-b311-c27ea3f1faa4	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	f	\N	\N	f
a763d868-cb93-4fab-9240-70afade0e277	7b55eeb0-4468-4696-b2fd-a50a7e058ec5	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
e6d6c4b0-ba59-46f7-bc72-4a521a59eacd	25ba77b8-721c-4c32-b5c6-97ea194d2958	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
09893d88-3da5-4c16-b6fd-175f3d3db336	081d3462-484c-45f4-b7df-9eef1712d829	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
e8946e72-6fa4-4ac4-845d-3ac32f39543b	d04c2d81-ce92-4221-990a-64c5e1142ee9	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	9	8	f
3e813896-cf02-4f93-a48f-8fd7d32890ec	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matilla selvästi kunto on hyvä ja saa salilla tehtyä hyviä liikkeitä. Keskittyminen poikkesi kuitenkin useasti ja Matti häiritsi hieman tunnin kulkua.	abb65c1c-fb0f-44e8-84c8-c542fe24ef96	t	\N	7	f
23030189-bfab-490b-aecb-7dabcc178a56	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa harjoitteli tanssin koreografiaa erittäin hyvin ja osasi seurata rytmiä. Hän auttoi muita oppimaan haastavat liikkeet ja piti tunnelman kevyenä.	f9bbb84d-acab-4b52-a890-43dc7709963f	t	\N	9	t
0a442d00-c1e2-494a-8bd7-787e46c5b41f	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui sählynpeluuseen sisällä salissa. Hänellä oli vaikeuksia pallon käsittelyssä aluksi, mutta paransi otettaan pelin edetessä. Hän kannusti joukkuetovereitaan ja pelasi reilusti.	87721bf9-2237-4429-9e23-587ae97d05c1	t	7	8	f
83bd22b5-d44d-48eb-bb5e-e1145aca2fb1	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	dd81081e-3ed6-4807-99e9-988af80153fc	t	\N	\N	f
2512c53a-2004-404c-b2e1-5c297ef1752d	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	dd81081e-3ed6-4807-99e9-988af80153fc	t	\N	\N	f
ef741674-c2dc-4c5e-bdee-bee3ca0409ae	a639981f-4bf0-4871-b264-00ad02a9a286	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	9	f
78b1f954-1ff1-4300-aa2d-b4bbbc50a824	bde08c48-5140-47eb-b28b-ce5c86ea8f46	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	f	\N	\N	f
d4e9884d-5080-495e-a9c8-46ebfd05047a	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	\N	f
6dfeef35-dc88-42c5-829b-f2811bee4213	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui joogatunnille ja harjoitteli erilaisia asentoja ja hengitystekniikoita. Hän keskittyi hyvin ja auttoi muita osallistujia, kun he tarvitsivat apua.	0928afc3-d50e-4222-9adc-71d1c8dc4593	t	8	\N	f
60829fcb-1bb7-4876-9100-768c203a08a2	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	9	\N	f
0803da03-b10a-4150-ac0d-baa6bfbf129c	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	Hienoa työskentelyä pariakrobatiassa	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	\N	f
5285b2fe-13fd-47f6-9625-d38a81181d29	24c494db-a428-4430-ae3a-c321d5e765f7	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
c981e6ce-8d73-4cfd-8c15-8787982603d4	aff989da-421b-4128-968e-5f54d59ca7a0	Hieman levotonta työskentelyä. Mukana hienosti lopputunnilla.	4d3fddca-2214-40dd-aa09-3f4031174783	t	9	8	f
0e06737d-015e-4de1-8fd6-ce0253d45376	95ef1789-275a-42de-bfc3-c9c006432782	\N	4d3fddca-2214-40dd-aa09-3f4031174783	t	8	9	t
62a333fb-e7f6-43c7-b5ef-3cd281c9b4e4	6c629051-3712-43f1-8f21-c357442fc591	Loistavaa työskentelyä. Mukana kaikessa. Kokeili ja otti osaa. Taitavaa pelaamista ulkokentällä.	4d3fddca-2214-40dd-aa09-3f4031174783	t	8	9	f
0bb8d0d4-1d1a-4838-b80c-7e529e1deff5	b4766346-0c81-4d98-a489-654ca9b3c6db	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
9b7c70f7-808b-4f19-99ca-9d202351e231	36c47c4b-1f5b-43d8-843a-6f74ab4e86b9	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
7ed54959-d71c-42cf-b5f9-2ea1e933a2e0	1aa8b618-de8a-4a56-b1ef-33ea240f027b	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	8	9	f
f43b75dd-a3f9-49d0-b350-2043385a28e3	a2216f2c-6ade-4f5a-a8c5-515f09bd4b08	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	9	8	f
086d19cc-cd76-492f-ac9f-06e7961559e3	14c62b14-21d5-468c-b04f-89d60b2efc76	\N	d9f552e0-8d39-43a7-9274-dfb573e5dc72	t	\N	\N	f
04256c8c-1987-4b9f-b8e6-b2490c471c88	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	d9f552e0-8d39-43a7-9274-dfb573e5dc72	t	\N	\N	f
5da3eb88-0b43-473f-abc7-5c000992016b	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	d9f552e0-8d39-43a7-9274-dfb573e5dc72	t	\N	\N	f
9b4e3f0d-cff9-4724-8f28-5f65a7d5aca6	db6b1a3f-e485-4b8f-8a25-0a8e518a2026	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	7	8	f
1ecc244e-00ed-488d-a8ae-6f81f98928dd	7ebec83f-f17b-4770-a9af-ea290f26e168	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	8	9	f
bbc8f2bf-da75-4839-9c38-9f13cafba03c	436f9966-c204-4794-89fa-e5e1a30b6247	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	9	8	f
186bc553-7897-40b4-9649-1fe7cab30ac5	ec51a182-bf8d-436e-8704-b2d5cd897604	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	8	8	f
0e81f7d2-9f19-46a8-96d2-99de36fa562a	a8df8354-0125-404f-a1d8-5584462a5b82	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	f	\N	\N	f
707f17a3-e117-4880-a3b6-146c17284d2d	03397f36-f253-476a-a333-556ae179dbda	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	8	8	f
3872d2c1-88c4-4ad0-b424-1a6a75bb4541	e0c8876f-57f1-43dc-9950-3851d82380fe	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	8	9	f
d8b17624-a7cb-4906-bdc5-9998a605ca97	4e00db97-fd93-416f-a349-655a240056ae	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	8	8	f
130b8da9-9f55-40d8-ac3b-2a344922f8e7	28e533c4-faf3-4e9f-ac97-ea948c1b019a	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	9	9	f
f2be46d1-313e-4c5e-b022-dcf9147fd1ba	775a7c76-dc4a-4849-baf1-d7f9080eaf89	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	7	8	f
df2943fc-eaa7-4baf-aef5-30a2bf0cffd3	02ea3a66-aa4a-420a-9334-f2b0941c564b	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	9	8	f
9c40bbf1-e001-4305-808f-b17c2de3e00d	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	5ce16688-56df-465d-bfb4-04d94f86a484	f	9	\N	f
9a99c887-c252-4094-946b-6a7b0b920303	dc43f223-8b76-457a-b035-8b186320bdea	\N	798f36d8-d78e-4297-a3ff-9955098ddb1c	t	7	7	f
ce511306-f1ce-4378-ac23-6b4f36e2ea03	25ba77b8-721c-4c32-b5c6-97ea194d2958	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
6aa5982f-aa68-405e-98b4-d24d45d62ef1	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
9bf829d9-327f-47b9-a4b2-640afd803d2c	81f9f274-c50a-4b30-b0f5-15c1479b942c	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
b26d0e77-7d31-4763-851c-42b6fb7399bf	b8bc48bb-2b86-415c-837f-dbad58dd3e2d	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
846f29aa-f955-4f47-a358-7edec77fb609	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
11f77e84-ba4c-49a4-8ad7-6297054d088a	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	8	9	f
223b8c46-8f6d-4b45-aa30-209487817a96	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	\N	f
199f98f7-f1d8-45ce-926c-203840bc9fff	148a28ac-012b-44c4-b684-87a00ace9c72	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	f	\N	\N	f
36514e99-77bd-4fb9-9a88-849e054e3602	bde08c48-5140-47eb-b28b-ce5c86ea8f46	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	f	\N	\N	f
f3dd9d8a-d20a-4c8e-8056-82600a36fd46	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	8	\N	f
b4b3e13e-65c3-4bcc-9243-51f64695be7b	e71cd959-78a0-4843-af83-1e8e741e7edf	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	8	9	f
e9688da9-3f77-4c8d-9545-72fba3950f32	f03779c1-9d87-439c-8d95-14e384c7d2c0	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	\N	\N	f
13181a3d-c9b2-4ad4-9314-b95c9db1b55d	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	8	8	f
3284a007-4a38-4491-add1-094d434b35f4	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	7	9	f
e657bc83-239a-4a6c-9ba4-e39a948c156f	5bbc08f9-01e0-4911-9a6a-38790219ce2a	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	7	7	f
09460a30-04df-43c1-bb45-1c802795937a	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	7	9	f
53eb5d70-1d13-42f9-99ca-6f330b595f09	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	8	8	f
bd4c0b2b-f120-4ea7-8c19-e8bb3c4f0826	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	8	7	f
e1f03edd-8b18-492c-b035-f9d58e8f7abe	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	8	\N	f
66f15946-dbf2-48cd-aaa5-77a5e1cbddd2	a639981f-4bf0-4871-b264-00ad02a9a286	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	8	9	f
8cc6b441-e675-4a03-a441-d861521da8da	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	8	8	f
21e7e7c8-ccbb-45c1-93ab-7041a73cf242	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	8	\N	f
3edb7de6-59f7-4bcb-ac9d-666dd852200f	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	\N	b1b09203-60c2-421a-a59c-9dbc126eb44a	t	\N	9	f
7cfc61b9-40e9-47a8-95b4-c5b36de6a8ce	7af2670e-d622-44de-9458-0e3490224f19	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	f	\N	\N	f
ab9ef57a-c9c8-49b9-ac98-864fcc475a77	4cdb20f7-d8a7-480c-9379-bbe14d95d933	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	f	\N	\N	f
8ceafa4b-0a1f-4042-99e0-524efaf61de6	81f9f274-c50a-4b30-b0f5-15c1479b942c	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	9	9	f
0a9b3402-0628-4f0c-9c56-6c09bc54d2cb	2487435b-5598-4a44-bc31-f93ed8a2ec43	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
e250b909-c09c-40bc-8c20-428ced811d79	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	9	9	f
86960ba6-e719-45f1-ac31-3f6cd4a54aa2	b8bc48bb-2b86-415c-837f-dbad58dd3e2d	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	9	9	f
2ba4d022-ab40-4042-8ca0-917873740b4f	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	9	f
e2e7539e-60d2-4632-9a42-c3dacff53ed0	f96609c4-4c21-4b74-8523-f2c3b78d4c49	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
a5871d61-8d96-4908-ad83-5791250519b3	750d8c1e-30f2-49fc-a445-7acdb4bff78e	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
60a3ff25-177d-4abf-a301-4a7bbb3e2ff0	eac386e1-ca07-42b6-9817-50f1d1081903	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
92f44426-cdf8-4c88-a7bf-c80ea39f03a0	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
83f2f921-64be-497e-b560-fda790dee6e1	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	9	9	f
51a729db-a2b8-4c76-a8bb-d97bcbd3e5a9	14c62b14-21d5-468c-b04f-89d60b2efc76	\N	39716719-b0c7-4f70-87eb-221191db0e11	f	\N	\N	f
c11848f7-2ada-45ac-92e9-550a7b8b8b37	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	39716719-b0c7-4f70-87eb-221191db0e11	t	\N	\N	f
816a730c-dab0-40c1-a904-511bc3bc1ca0	b015f02b-0e21-4f21-93d4-8497311b6490	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	\N	\N	f
8e25ecee-8215-4526-8da3-309f9db807eb	898eaa06-334f-4446-98b3-2368ad2b6cef	\N	79820907-8332-42aa-9f52-a85b12399a81	f	\N	\N	f
92411207-e9c3-4705-ba2d-cd426218cb9a	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	79820907-8332-42aa-9f52-a85b12399a81	t	\N	9	f
caa5e796-d379-4dd1-ac30-395feed64cc1	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	\N	79820907-8332-42aa-9f52-a85b12399a81	t	8	9	f
dfba8321-15ba-4ccb-9e06-86251384db25	eb96e883-bf2d-4482-b8c9-6d272ee35354	\N	79820907-8332-42aa-9f52-a85b12399a81	t	9	8	f
a3349e50-3034-4509-83f3-98bb3d83c802	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	79820907-8332-42aa-9f52-a85b12399a81	t	8	9	f
e0f3190e-2d00-4acd-ab1d-3a945e4c149a	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	79820907-8332-42aa-9f52-a85b12399a81	t	\N	9	f
1b2647cb-ce39-4fdb-86ce-a14f5daade32	052654dc-bfba-4092-85d4-6894c908f9b1	\N	79820907-8332-42aa-9f52-a85b12399a81	t	\N	9	f
3252f1e6-5a52-453a-9641-786610226720	a9823635-cc6a-4026-ad85-423287d7ec49	\N	79820907-8332-42aa-9f52-a85b12399a81	t	9	9	f
12ce1170-c9a9-45d0-ad97-ee3402ff00fc	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	9	\N	f
4538f708-e9b5-4b23-9356-4f7ba0c03d73	4cdb20f7-d8a7-480c-9379-bbe14d95d933	\N	79820907-8332-42aa-9f52-a85b12399a81	f	\N	\N	f
348e4df5-2eee-4439-a423-bb9297b06dbd	16149225-d420-4254-88de-36f235415650	\N	79820907-8332-42aa-9f52-a85b12399a81	t	9	\N	f
f4858449-0ea6-4f82-a49e-dd3c995d2105	b015f02b-0e21-4f21-93d4-8497311b6490	\N	79820907-8332-42aa-9f52-a85b12399a81	t	8	9	f
36314e9d-48ed-4b68-b2a7-e8a34ec700da	c8e4a140-1c7a-4b6b-b04b-86711a322f58	\N	c3a67d69-4acc-4673-984e-1905a7b3833d	f	\N	\N	f
f7e9fdb6-1a4e-49cd-8b1d-a841cb675682	5c6ab41c-30dc-4f02-9c31-4d691b5469e8	Oli kyllä paras tunti ikinä!!	c3a67d69-4acc-4673-984e-1905a7b3833d	t	9	\N	f
8ab79ded-bb01-4816-81fa-e7008ec50d9f	fd559fc1-965a-485c-a34d-1a1d26b8a655	Miksumaista toiminta... Niin kuin aina	c3a67d69-4acc-4673-984e-1905a7b3833d	t	9	7	f
d8f4999c-d94b-4219-a464-757c2ae704f8	d8749772-8bf9-4840-a843-8c117837ade6	\N	c3a67d69-4acc-4673-984e-1905a7b3833d	t	8	8	f
58980a7e-e09a-4879-94ef-85bee2ac52ba	fd559fc1-965a-485c-a34d-1a1d26b8a655	\N	556446ed-89a7-43e4-b9b5-00abe95eceba	f	\N	\N	f
084b41ba-9b90-4816-a647-036f061ba3d3	5c6ab41c-30dc-4f02-9c31-4d691b5469e8	\N	556446ed-89a7-43e4-b9b5-00abe95eceba	t	8	9	f
92dbd97e-2eea-4409-a7fc-3dd618dc70f9	c8e4a140-1c7a-4b6b-b04b-86711a322f58	\N	556446ed-89a7-43e4-b9b5-00abe95eceba	t	\N	\N	f
a9075e8f-9839-48c8-9489-09a750edccde	d8749772-8bf9-4840-a843-8c117837ade6	\N	556446ed-89a7-43e4-b9b5-00abe95eceba	t	9	\N	f
c324e104-7058-42fa-83d5-41cfbff9d4c3	5c6ab41c-30dc-4f02-9c31-4d691b5469e8	\N	6f022179-e8e8-427f-b8fa-fb290acc84f4	f	\N	\N	f
8e5ef312-6716-440d-9e38-f69565c61111	c8e4a140-1c7a-4b6b-b04b-86711a322f58	Ihan paskaa tekemistä, riehu vaan menemään ja koitti hukuttaa muita	6f022179-e8e8-427f-b8fa-fb290acc84f4	t	6	6	f
25767a44-2e6d-45bc-b303-1116e76dbc2e	fd559fc1-965a-485c-a34d-1a1d26b8a655	Mallioppilas	6f022179-e8e8-427f-b8fa-fb290acc84f4	t	\N	\N	f
021d30b3-7c1c-4b8b-b5ec-15f7a8a2eea2	d8749772-8bf9-4840-a843-8c117837ade6	Hyvää yrittämistä	6f022179-e8e8-427f-b8fa-fb290acc84f4	t	7	\N	f
41c85425-3f1d-4835-b4bc-eabf9bf95714	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	79820907-8332-42aa-9f52-a85b12399a81	t	9	9	f
cb1e1dc2-795e-4bc3-96be-c568af20d5f8	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	79820907-8332-42aa-9f52-a85b12399a81	t	9	\N	f
c5d09455-15bb-4409-a245-403e132a94e1	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	4029717a-ba95-4c26-abfe-453df2616d81	f	\N	\N	f
1c400fe3-9be6-4bf8-b33d-e1bfbf1c36f1	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	8	9	f
ea4c008a-7d1d-46d8-930c-7e86f4d522d2	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	9	8	f
51847c50-dd48-430c-aeb0-9f39b73f630c	5fd1effd-1670-4a40-bfaf-75a2a048fc91	Hienosti vastuuta tekemisestä	4029717a-ba95-4c26-abfe-453df2616d81	t	8	\N	f
775b839f-2057-405b-9dad-f93a466c617e	720863b3-15b5-4928-b516-5a8ec0cee764	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	9	8	f
a84c7531-a896-4f13-8248-7d8cfb1449dd	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	Ahkeraa työskentelyä!	4029717a-ba95-4c26-abfe-453df2616d81	t	8	\N	f
a30b2c0c-0bc8-452d-9091-cbd69798e327	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	8	9	f
4cb3d493-09c0-4acc-a8f5-733e24525115	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	9	\N	f
377a2350-20de-41d9-93ea-42f9fa453716	f03779c1-9d87-439c-8d95-14e384c7d2c0	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	\N	\N	f
258c4a16-b29c-4b1c-be07-ce0612a7a87c	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	8	9	f
3e760bf5-1130-45f9-9e5b-d07982db0733	5bbc08f9-01e0-4911-9a6a-38790219ce2a	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	\N	7	f
e31ef1d9-459f-41ce-afdf-de16aad44183	e71cd959-78a0-4843-af83-1e8e741e7edf	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	\N	\N	f
8b8c110f-c31e-459f-8e3f-a89bfde4a5c6	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	8	8	f
be11e8b3-b202-49ec-a220-c0941cea22e8	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	9	7	f
bdeec8e2-f339-487b-b35e-9cae9157dcb9	148a28ac-012b-44c4-b684-87a00ace9c72	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	\N	\N	f
3d698470-d2df-49d0-ac04-cc3843bd81eb	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	8	\N	f
71426393-1438-4f66-ab93-58b9f7a08b4b	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	8	7	f
94539d77-f445-47f8-b113-495f65ac70c0	dc43f223-8b76-457a-b035-8b186320bdea	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
9309c1be-69b3-4ec0-9fea-45880c37b18d	f826618b-cee5-4d6c-bcde-27e7a74a0b63	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
8d443dcd-f5d4-4182-9529-47b421a6962a	7c413b7f-9005-43a9-9b44-1984a23ae65f	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
c98385b4-d8b1-49f6-8b86-a7c00ce5f8b7	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
0354f491-069e-48a7-a40f-5f4435ad5014	9f830199-bde9-43a4-84e9-986992a1e3d3	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
a99de5da-885d-4d8e-8dda-29dedeea0099	c4365db1-b405-4aac-ad56-4f21780797c0	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
904d0ade-7355-4cfe-98da-ea67635b52bd	0d39a916-dd79-4bc8-b493-771b456ed8ce	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
f3ea4a27-3b27-4108-b166-9c3c7e85b71b	8fa5f694-d7a7-49c2-98a2-e1aecdc80d3e	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
28a77b94-85b9-49e8-97f8-74d1b4ea8b36	00179acc-3d3c-496f-98db-fb88756116f4	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
93a2ed98-96b6-46f1-a06a-2b465707ffa8	fb78d640-ca97-407e-9d2b-6390b8a2c77d	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	9	\N	f
e11e9bb9-28dd-463b-8719-693acb9e41d9	45cedf94-714b-404a-8ad5-db42f55919eb	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	9	8	f
c3acb750-988f-4d85-9224-6736fa235d67	e47d29de-6a02-4e63-a52a-964fc17b744e	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	8	8	f
2d43b2d6-6864-42cd-8c0d-a81102db03a1	9c66fa7f-c08f-4905-9c54-5da739156493	\N	ca38d48b-f9f3-4528-a4cb-dd823869ce72	t	9	\N	f
becd3704-d78b-41d7-a317-179b51cefb8b	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	efe31604-e6fc-418e-ba94-4cc9b5955ef8	t	\N	9	f
d8846dd6-cd10-4eb6-92d7-74995a94975a	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	8	\N	f
d0c5ca6a-2c9d-4601-aa86-2bff8625f8c3	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	8	8	f
b1870d5e-e904-48e8-baaf-fedad84d4da2	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	8	9	f
13c6e26e-f66c-4142-be78-bcbeab5dc8b0	bde08c48-5140-47eb-b28b-ce5c86ea8f46	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	\N	\N	f
6f447a0c-5b66-42d0-9d62-d91d9d0d8ee3	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	\N	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	\N	8	f
d36acd1b-7d72-4c85-9e72-e529677b3ec5	a2a3736c-4cbd-43f4-b8e4-8041a2b9d8f5	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
113817d5-2a93-46d4-b979-31ad9a448944	c7a9dddd-29a9-4698-991f-ecab63cf6fd0	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	\N	8	f
109ea5bf-b533-41fb-ad2e-b8b80867b466	74c83e0a-3e21-4c01-b18a-a81f7e089d64	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
ffd18cb5-b981-4aac-bf3a-545bf1474c5a	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	9	f
4edcc16b-dbcb-4cc0-9b37-dfdc7b5cfbf9	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
92dbbcc6-9d38-481b-8b06-fa07e277ffd6	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	2859c556-656e-4367-a4b3-eeb0efa6bd86	t	8	8	f
42119a90-6e84-409d-bbe2-630a77a52c51	7af2670e-d622-44de-9458-0e3490224f19	\N	79820907-8332-42aa-9f52-a85b12399a81	t	9	9	f
41060aa1-db71-4790-86db-1caf79bad196	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	79820907-8332-42aa-9f52-a85b12399a81	t	\N	9	f
d62cfe94-f530-4df1-b7da-8910445a2d10	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Haistatteli opettajalle. Tämän jälkeen toimi ihan ok	4029717a-ba95-4c26-abfe-453df2616d81	t	7	7	f
5dd5195b-224e-492f-bafb-b6842e51de68	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	fb2ac5a0-bd74-48ee-982a-f9f0a8fe8c75	t	\N	8	f
bf56406d-fff1-4f0b-9716-3ffa08a7b838	24007058-ca39-4c69-9004-c3d29b441fb3	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	9	7	f
e677786d-9282-4569-9a76-f44c7f358baf	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	fb2ac5a0-bd74-48ee-982a-f9f0a8fe8c75	t	\N	7	f
52859310-45b5-4d91-b308-4686cae4d7bd	14c62b14-21d5-468c-b04f-89d60b2efc76	Jotain huomioita Topin tunnista...	fb2ac5a0-bd74-48ee-982a-f9f0a8fe8c75	t	\N	\N	f
fcca3181-7fb1-4470-b1e3-4935c31494ea	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	Tunnilla vain 15min koska vanhempainkeskustelu	4029717a-ba95-4c26-abfe-453df2616d81	t	9	8	f
16073099-6e63-4972-bcfd-f539558ac6ab	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	8	8	f
51ce0da3-72eb-435f-91aa-50bfd2b5f3b0	abd4148b-b530-4440-b643-34d08a4bb811	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
be87b81a-ee88-4b9a-bdb0-c6220de1fbf9	de28725b-ccaf-45e6-b808-aeeba3fa151e	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
d615da21-6a7b-404d-822b-95bf0d2886d7	f4eb73ad-9a1f-4b7b-8899-b2a07ff4db2d	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
90beb0d6-a972-4c3a-ae96-8e570692e49f	4a3f375e-f8ce-46f9-8b9a-4587d069d036	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
67cdda15-b4c8-4ad1-a257-1ba058e8b72f	1461587b-fedd-4cb1-a122-58dd9ddc3fd9	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
18c58fc0-768b-4c56-886c-5ef9dbf6ff4d	3723e655-2484-4055-8570-13ee693d5a1a	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
6764418d-d718-4ca2-975d-360546158647	3e62f535-90a9-4a75-9748-27ea0d491a54	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
767c41b8-60ed-4405-b567-42c0941d44f5	ad671202-0d1b-4b31-a2fc-9fa9032f3b33	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	f	\N	\N	f
f7648376-271e-4670-be17-b709cff81697	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	9	9	f
a7ab3448-1225-414a-aed3-e1569c2ec19d	69fec935-4bcd-43ab-9737-a524627dbe1e	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	8	8	f
72e531a2-391b-4826-811d-f154e8c3b715	1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	8	8	f
269f151b-a344-4a60-9cde-93f08ffa5c54	f9c6b20c-e57c-4e70-9f32-dedd975aab01	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	9	8	f
045b7c5d-154f-46b6-86ab-e72e0b661485	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	9	8	f
54da02a3-c3bc-4aad-a4ef-d3157a9bc2af	1556394a-6336-4838-8943-19088ecdf5e0	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	8	8	f
c74a5aba-a19c-4cfb-ba79-82c66d33efb2	0e963947-3dcf-4f30-b316-ac9d07d81b0b	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	9	9	f
dc63518d-2661-4140-80be-cb4b7001cff3	b1ef84a7-2238-4946-bd2d-97aae138bbad	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	9	8	f
e8e75962-e96a-4ab8-bd63-7a03417b351f	1f770536-fee1-4ca2-9622-ed816628c9b7	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	9	\N	f
8e250a16-9b82-4fd5-a1b0-065479a61130	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	39716719-b0c7-4f70-87eb-221191db0e11	t	\N	\N	f
a60e7648-c74c-4082-95d8-e743ea408f2f	49c4aeec-3a4e-4761-b3cf-2546381857f7	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
cfbca5a9-8724-4f16-ba05-bf11fe30d718	63f57cea-4036-4e38-9d84-3c36f99124ef	\N	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	8	9	f
e6e37871-5ced-4de3-a633-27bdd4e8fce1	f96609c4-4c21-4b74-8523-f2c3b78d4c49	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
cee65e07-34cb-495d-a771-3b2f585ee150	7b55eeb0-4468-4696-b2fd-a50a7e058ec5	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
fd0bb15e-71d0-479d-a2b2-b7bf3fe75380	c7a9dddd-29a9-4698-991f-ecab63cf6fd0	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
56e09bc2-73bd-436d-8c5f-ae420bfcc5d7	74c83e0a-3e21-4c01-b18a-a81f7e089d64	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
72f9e84b-fe10-4863-9ce3-bd2e15a84af8	d04c2d81-ce92-4221-990a-64c5e1142ee9	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
6665eb7c-ce7f-48b6-b4aa-64d49b96c37a	7c413b7f-9005-43a9-9b44-1984a23ae65f	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
4f5fd389-1f97-41b2-93c4-c794ead4bfa4	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
66ff972d-fe17-4d8b-9252-94134f33d1b6	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	Hyvää rintalihaspumppailua!	0eaa72d6-b26f-4e88-83f6-ea5067da86fa	t	8	9	f
8a327336-ea60-4a30-91ab-f9dd876a7ded	f826618b-cee5-4d6c-bcde-27e7a74a0b63	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	f	\N	\N	f
be4bbeec-242e-40a4-9160-845eb5af2049	16149225-d420-4254-88de-36f235415650	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	9	\N	f
da88d9d2-79ed-41b6-b1d5-791b3cfd4953	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	ca38d48b-f9f3-4528-a4cb-dd823869ce72	t	\N	\N	f
ad495ddd-5e5d-4714-a177-76a1be6a0610	28426aca-f675-46f7-bafc-dc5f7eb649c5	\N	ca38d48b-f9f3-4528-a4cb-dd823869ce72	t	8	\N	f
c91422bb-f998-45ee-aabc-2c8d91281bc9	b8a8e21b-2e09-4855-a354-0c48800913c9	\N	ca38d48b-f9f3-4528-a4cb-dd823869ce72	t	\N	\N	f
6beb90c1-4bdf-4780-bcf2-68c6a61ad9a6	14c62b14-21d5-468c-b04f-89d60b2efc76	Terve terve Toimiiko tämä	a9f2c498-9fa5-4af6-897d-fdb395002668	t	\N	\N	f
023f11d8-4efa-4c33-ae96-7d3be3af1a11	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	ca38d48b-f9f3-4528-a4cb-dd823869ce72	t	9	\N	f
c0094014-c170-4aea-80ec-9febc63db701	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	a9f2c498-9fa5-4af6-897d-fdb395002668	t	\N	8	f
91d9f474-4f29-4090-b53c-f5b6d6ee5984	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	a9f2c498-9fa5-4af6-897d-fdb395002668	t	\N	\N	f
68554b2c-a45d-4c40-a7ce-2e2b549397b9	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	77b749a1-1322-4918-a8a3-75e5907d24c8	f	\N	\N	f
c7259abc-77b0-463b-87d2-4c82dc6199c9	14c62b14-21d5-468c-b04f-89d60b2efc76	\N	77b749a1-1322-4918-a8a3-75e5907d24c8	t	\N	\N	f
15d89a43-2c70-42da-ad8c-49819fdf27ec	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	77b749a1-1322-4918-a8a3-75e5907d24c8	t	\N	9	f
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
89bd40c3-6e46-43fd-924e-c9900fd05a3b	750d8c1e-30f2-49fc-a445-7acdb4bff78e	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	8	\N	f
aceeca68-6d83-460a-9bca-ece4f0b9a476	213addc7-6d5d-4a39-95bf-ded6afa510a6	Hienoa toimintaa. Joka tunnilla täysillä mukana työskentelyssä. Sytyttää muut pelaamiseen.	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	\N	\N	f
470dcd77-f18d-488b-b7a7-7d1ae49c6cc1	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	f	\N	\N	f
e283f590-bf87-4e57-8367-11acad5cc110	9f830199-bde9-43a4-84e9-986992a1e3d3	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	8	9	f
edb02df9-7930-4d2d-b818-4623df3fd641	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	9	9	f
44996eba-775d-4ae5-aab0-af7c3c696112	c4365db1-b405-4aac-ad56-4f21780797c0	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	8	9	f
3fda7df8-e6fa-4261-ad53-576371883796	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	9	9	f
13288374-b9de-4d47-9f4d-3054e092b11c	148a28ac-012b-44c4-b684-87a00ace9c72	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	9	\N	f
627ded6d-fcce-4b5d-b3a9-922dcaf45f7a	a639981f-4bf0-4871-b264-00ad02a9a286	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	\N	7	f
0114aa9c-5d99-4ee9-897a-2744989255c6	bde08c48-5140-47eb-b28b-ce5c86ea8f46	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	\N	9	f
fbaa36a9-02d7-4a00-8041-a8e2b9e19a82	e71cd959-78a0-4843-af83-1e8e741e7edf	Työskentelit muita kunnioittavasti	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	8	\N	f
f0449e8b-a81f-43ad-9993-589aa68450b4	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	7	8	f
d83fca3b-be2a-43d4-a5a4-3cb7ba71cbbe	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	7	8	f
10ee5716-1c23-4bb9-9b34-b8644cf6b9a9	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	8	8	f
1a39769a-3c56-4b43-99f4-4e703cd60549	5bbc08f9-01e0-4911-9a6a-38790219ce2a	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	8	7	f
db54fa3d-7165-4c4e-815b-5c7fb51ac714	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	Työskentelit muita kunnioittavasti	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	9	\N	f
d85a77b8-cffb-47f8-b77c-d234d60b4bca	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	8	8	f
d378be3b-9f97-47bb-b46b-14f9d763a924	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	9	9	f
e9568f0a-31d1-4d9e-ac7c-6cc2605b1361	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	\N	\N	f
69ef1d54-f507-40e4-9785-7b7c2d35dae1	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	Huippuhyvää työskentelyä!	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	9	\N	f
0a7f3322-ffa8-4ef0-b62e-c577005658b6	eb96e883-bf2d-4482-b8c9-6d272ee35354	Myöhässä. Hienosti mukana.	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	9	9	f
400a2fc4-56e9-4d67-9571-e8a4a700087d	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	5ce16688-56df-465d-bfb4-04d94f86a484	t	8	9	f
a70ba233-838d-4f62-b8d1-2be61f4bc04e	14c62b14-21d5-468c-b04f-89d60b2efc76	\N	dda6bf2e-e54b-4d84-b5f4-991ebe0e3c89	t	8	9	f
9722fcae-979c-4099-8205-97c6ada8230e	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	dda6bf2e-e54b-4d84-b5f4-991ebe0e3c89	t	8	9	f
15ab15ee-d668-4f74-9eea-ee481c8cac2b	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	dda6bf2e-e54b-4d84-b5f4-991ebe0e3c89	t	7	8	f
3a06715b-cd98-4c4f-98b9-fb37873dd884	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	1966f8dd-9773-4d94-a99b-f078a09f06f9	f	\N	\N	f
0762742d-3c60-4493-b7ca-897c99267bf9	14c62b14-21d5-468c-b04f-89d60b2efc76	Terve	1966f8dd-9773-4d94-a99b-f078a09f06f9	t	7	8	f
55b73435-8f7b-43d6-8ac7-98de1f120787	a37dd7ab-82b3-41ed-b2a4-8213902dd004	Moimoi	1966f8dd-9773-4d94-a99b-f078a09f06f9	t	8	9	f
2593ebba-ba49-4ea3-a2d7-90b6d59aee4d	4cdb20f7-d8a7-480c-9379-bbe14d95d933	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	f	\N	\N	f
a7f71f7e-9531-44c6-9316-35c6300ed75d	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	8	8	f
f8c8e418-059f-42c9-a3bd-e831fcd03a98	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	9	\N	f
1d6bd721-055a-4fe1-8fa0-30d77583d53f	eb96e883-bf2d-4482-b8c9-6d272ee35354	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	9	9	f
4f0833a0-4d51-4d31-a29c-482507f5ea0b	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	8	9	f
3b121ad1-13f9-4d6c-8cc7-b61e2cc46c7a	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	\N	9	f
be9472a2-2c45-407a-a685-100ad2d64422	898eaa06-334f-4446-98b3-2368ad2b6cef	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	8	8	f
98cd0a8f-7ef8-4f15-a8f6-aa8d973ef855	052654dc-bfba-4092-85d4-6894c908f9b1	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	\N	9	f
75aa57bd-eb9e-4e4f-a066-1522e095c1d4	a9823635-cc6a-4026-ad85-423287d7ec49	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	9	9	f
a92dcf95-74e4-4556-83f6-418089ea8b98	b015f02b-0e21-4f21-93d4-8497311b6490	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	8	9	f
e5e609a8-b7eb-4f11-8fe2-ec08362b9ce5	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	8	\N	f
860c8d07-9341-4fae-be8c-022bb7f2d770	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	f4a7e9cf-9517-4298-8105-bd53e48e58cf	t	9	\N	f
b028d562-16a0-4106-a949-15ba057f4c1d	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	4029717a-ba95-4c26-abfe-453df2616d81	t	8	9	f
efc403c9-6cfb-4e3d-8817-029e5619c500	9bdfa82d-13bd-40be-9a9b-a57c2a072351	Härväilyä välillä	4029717a-ba95-4c26-abfe-453df2616d81	t	9	8	f
67dfe342-daa0-4498-a7e2-3873da69c6ce	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	\N	\N	f
3665328e-b93c-4119-a51e-8b6fe746a9ca	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	8	9	f
8ed27396-8b6f-4e4a-853b-6ad729b30612	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	9	9	f
ae2296ab-e95f-4a27-8ece-cfdb667f65f4	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	9	9	f
e15699b8-1f0b-47a3-be30-d53812bde9f9	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	9	9	f
e91f3106-b1e4-46ce-8f45-2afc8a4378c4	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	\N	9	f
13ba203e-fb96-41e3-85bc-419d4a074065	1e2db5dd-c171-460e-bf48-4bc55f04f49e	Vähän härväilyä	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	8	9	f
afc8f302-ba94-4625-a513-b256fac67b61	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	9	8	f
2c27d290-b510-4de0-b22b-ec8a5b0dda28	404347be-f571-4254-b055-a06e9a9962f9	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	8	9	f
fb1c4fa8-d48e-4906-97e0-85863eec6efc	686241e9-7a4e-4eb6-bc99-26699999001b	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	8	8	f
d82e9ada-3b53-4156-a86f-ddd24f77f603	2e03b196-3248-4f14-9f2d-4661e503665d	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	8	8	f
9ecdddee-5c0e-4e3f-86cd-66b7dd622ce2	b9266745-39ba-4be3-b1a1-421801b79832	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	9	9	f
e61d9757-cfa5-49b0-8318-8b51bafe94a7	799b59e5-c962-4f19-9f9d-01518c57a550	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	9	9	f
d63d9341-3197-44dd-8ea3-d9b398002125	74e88236-472e-41ea-9475-73c94489ae2e	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	8	9	f
ab24c379-ce57-4ec1-a748-7333cf81052f	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	8	9	f
ef53f1e7-0c46-403f-8da4-2d68a04489bc	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	9	9	f
f51b3c8b-7984-49ab-bfbb-ad9f158e1382	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	a5fa9792-b348-44fd-8ee8-e57e10c8955c	t	8	9	f
3c086364-9cc1-42e4-a4b5-999bc2a860c9	04629d10-42df-4873-bb8e-a38230d93b8a	\N	ca38d48b-f9f3-4528-a4cb-dd823869ce72	t	9	\N	f
53b5e770-a6ec-4e31-9505-e4545aaeb74f	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	9	\N	f
93ff7f18-628c-4c2b-be49-1c126d311821	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	9	\N	f
758497cd-8df7-43bf-83b6-6d397d717669	f03779c1-9d87-439c-8d95-14e384c7d2c0	Työskentelit hienosti, etkä antanut muiden huonon työskentelyn vaikuttaa omaasi	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	8	9	f
6fb1a665-36cf-44c9-84bd-da1ace931922	45cedf94-714b-404a-8ad5-db42f55919eb	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
7d3f6a75-9625-48e4-9b03-a3b568a44026	69fec935-4bcd-43ab-9737-a524627dbe1e	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
45a40c55-2b56-4fdc-9948-e412c3fd3f47	1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
4644e3e0-b3f7-477e-bdb3-f7c8063077ff	abd4148b-b530-4440-b643-34d08a4bb811	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
963be803-40e1-4f35-b6c4-05b3cfd918b3	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	\N	\N	f
b8f901fc-366f-42aa-99ab-49560898d897	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	8	9	f
9783020d-4b73-4f8e-bd61-53cf791abb11	081d3462-484c-45f4-b7df-9eef1712d829	Hyvää johtamista pelissä. Yritti ohjata pelaajia kentällä ja antaa neuvoja.	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	9	\N	f
b8663715-48e5-4e9a-b0c5-5c59d50e9804	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	9	\N	f
fe704d65-56b0-47c7-be35-0b4f8ad60d33	251b27c1-5684-424b-b17b-7257a311bd33	\N	ca38d48b-f9f3-4528-a4cb-dd823869ce72	t	9	9	f
2d916d04-6ee7-4867-a9ee-f7e7c0a74c55	16149225-d420-4254-88de-36f235415650	Päätöksenteko välillä haastavaa ja aikaa vievää. Havainnointia paljon kentällä👍	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	8	9	f
ce8619fe-9f66-4bfd-9f36-e5ca180ac90a	e0562708-15b5-478a-8f5a-1863c55a6f38	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	f	\N	\N	f
f78772a4-01c8-4cd8-b196-a66994a1b3dd	9c95ce1a-b395-4179-9558-10abb9105fd0	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	8	9	f
e5c1f907-117c-43d8-96b0-df7b1af03ae8	e17db94c-c058-4163-b1df-3824f2f732b8	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	7	8	f
685539dc-f4ca-4fb8-8845-7febca3378f0	4d9888c7-3be7-4fec-a5d7-07759cdff766	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	8	9	f
222c34c3-bf29-4f66-9651-a17601fc7a9d	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti teki lihaskuntoliikkeet ja venyttelyt huolellisesti. Hän auttoi myös muita osallistujia ja jakoi vinkkejä parhaiden tekniikoiden suhteen.	a8c5e1fb-bb1a-4811-9b48-6faa29f4f619	t	8	\N	f
194e0653-620e-48fb-8835-a2f12a5dacc2	4c047cf3-edbb-4aa0-b879-cd84077a8257	\N	abb65c1c-fb0f-44e8-84c8-c542fe24ef96	f	\N	\N	f
70a1a9e3-5000-409e-88b9-371b177ad1d8	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui pyöräilyretkelle ja ajoi noin 15 kilometrin lenkin. Hänellä oli alussa vaikeuksia pysyä muiden mukana, mutta päätti kuitenkin jatkaa ja saavutti lopulta muut.	78187248-1c3a-4f9d-80c5-a7d1a3ccafb8	t	7	8	f
2c9e6d2d-164a-427a-aa4d-f3c456bbb0cd	052654dc-bfba-4092-85d4-6894c908f9b1	\N	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	9	\N	f
df455035-9b24-42e0-bbe9-22139279bfae	ad671202-0d1b-4b31-a2fc-9fa9032f3b33	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
e7c36417-97be-4964-bb54-b8552f5f3ee6	e06b8ddd-84b2-4101-abe1-ecea8ecb8afa	\N	539a7959-1d07-42ef-8fc4-a7d7dd4da344	t	7	8	f
2091038f-46a7-4539-a82d-bbc53735a2e9	8f4df76a-3d26-432b-882f-4790ba82a24a	\N	539a7959-1d07-42ef-8fc4-a7d7dd4da344	t	8	8	t
22b07277-7950-4ee1-bfd7-dd7647bda60e	e5cd5e34-6c87-4ccb-81c7-f70bae71ffee	Terve terve	539a7959-1d07-42ef-8fc4-a7d7dd4da344	t	7	8	f
6873dbc6-7b1e-42fe-845e-2caf4fc1e8d1	de0b5abf-b8c5-4046-aaf7-f9bffc544ca4	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	8	9	f
fc6bf4eb-1887-4bbd-a956-399412b9c6e4	b0aa13eb-dd72-4d41-9158-63ed22b2f65b	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	\N	8	f
9a2ebacf-5e42-44cd-ab0e-377c748951d0	436f9966-c204-4794-89fa-e5e1a30b6247	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	\N	9	f
63b7e943-57ce-4eb3-9608-b8ace467d1b7	5c10a0b2-145a-4701-a64c-80a9369890a3	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	8	8	f
1bd2e3b7-0930-45ca-934a-1ba11ddb5e9f	8c057200-e725-4e08-b93c-88bd891fe862	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	8	9	f
d00f4252-650f-4781-b8d2-b0f98f805c29	ad4248b3-989a-4794-844e-af4cb598a1e7	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	9	9	f
1c113ca1-9d59-4464-8c8b-ffb8d2cb00e0	61780abd-03a9-4ce4-89cc-059b5a2f5177	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	f	\N	\N	f
8b08acc8-d07a-48e4-bfeb-6f86b987d7a8	92eecb4d-b8c2-43ce-ac29-eb7a46566311	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	9	\N	f
9ad1c788-ca3f-46fd-81fc-2a4bc703be4e	e17db94c-c058-4163-b1df-3824f2f732b8	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	8	9	f
d428316b-8ff7-4889-805a-8b401f7b75f1	139ee728-7bd5-4ed5-b88e-65e455770b9f	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	9	9	f
3a12c3b8-d573-4b32-b8d4-9ab638d94db6	28bf177a-d273-4b22-963c-4206fcffa9cf	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	9	\N	f
7520d91d-16a9-4aac-9878-f8add586afd4	48f6a291-18c4-4349-8578-e9d40a016f99	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	8	9	f
62a1e351-0928-4fc4-8041-d47a1f414aa6	3723e655-2484-4055-8570-13ee693d5a1a	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
612ed10c-c83a-460e-a780-9d031a8e27e2	d1c1ad1a-62d0-4d6b-bf48-2dead02ed1f6	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	9	9	f
2e6bfedf-2dc9-4183-b020-4df204a7fcaa	e6537a2f-233d-4b11-8f1b-5a0814a675c0	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	8	9	f
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
354ddd7c-71ca-478c-aaa4-6d9500d5e1b8	e47d29de-6a02-4e63-a52a-964fc17b744e	Kova vauhti päällä, mutta ei huonolla tavalla.	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	\N	\N	f
b7dfcfa6-0216-424f-95ea-5a33efb4b24b	aa420673-c8ba-41da-9ee4-061022bb4a51	Taitavaa asettumista kentälle. Hyviä syöttöjä ja pelin rauhoittamista.	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	\N	\N	f
138d1cfb-4a8f-4b29-a718-8098b9221d62	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	fab75884-b991-40c8-a22f-b9366be377ca	t	9	\N	f
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
d5947cee-4762-4494-a941-d840d518da9a	803c9cfd-c665-452f-9cf4-1315a875fa0e	Puolikuntoisena. Teki mindfullnesia ja venytteli mukana.	51983e05-c043-4a3e-8998-9f4c032cdf86	t	8	9	f
1ca5362e-d911-4047-8630-4a0adcb653f4	545958d4-a061-46c0-a58b-e814f2864886	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	9	9	f
3a177b8a-d234-45cd-916c-9162ac4d146e	e5570e54-941f-4e8b-b7de-f2dd3d7662e2	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	9	9	f
3b19a51f-aa4e-44cb-8ea4-d04d8a29fbd6	f37fb196-de25-4ea8-a1ff-280491ef3865	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	8	\N	f
c7381146-567d-40e4-b032-c4da0c71a616	7f64f516-bdbd-490a-9d83-6625c9834929	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	9	\N	f
6796ca44-6c52-452d-a1b3-1aefcc06324d	3a817706-c52d-4a77-8f87-68ef4514aef9	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	8	9	f
bc058bb2-e867-4ded-9dbb-fbb7ae60d560	d9dd649b-f9bf-4670-84ea-a102fc16cfcc	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	8	9	f
6925dba9-ab22-4963-b595-60c41e8722d4	8597552c-2527-4294-8a08-56d47b563b33	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	8	8	f
198965ae-b5ee-448e-863a-93a61291d629	34f18910-a0db-4e48-8129-8416b575d22b	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	8	9	f
50c1ad69-cf76-4253-9525-929a5775015e	671ee4af-e36d-437d-b3ec-bee0179c96c4	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	8	9	f
4155cb37-085c-4460-b4fa-c50ad052ff79	98160f96-0d06-40e7-9e12-1c1ad90442fd	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	8	8	f
7ec04326-b8a1-4b43-b296-27994c8428b7	7b45664d-caff-4e11-a717-7c3e2e1ed7f7	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	8	8	f
23532260-247f-4914-bb0a-1ca22c539afc	dc2469d2-1c1d-499c-bb3c-ff061b70307d	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	9	\N	f
089ef49f-0cc9-4424-bc3e-92aba268941a	f2cd6a55-4291-4848-a66e-36d096f181c4	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	8	8	f
6f132ebe-7675-4569-8641-dec720a8f6a0	9ffd35f9-d869-4406-aa8c-cf60cbc47830	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	9	9	f
13bbc52a-5a68-4cff-9b07-25ce1d5d49c4	d6b3db8b-50e7-4a6c-8ed2-2247a659a3a9	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	9	9	f
2b86c8dd-f2a6-4385-8e97-d19666b78cc6	a17ec781-f403-45b7-b1a2-2ad88dc2038e	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	9	9	f
286a9d4e-60dc-4247-814b-a7e72492cac9	f71a7e38-187d-4dfb-823d-f959158a971f	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	8	9	f
0734127e-0def-435b-b484-d296bfeb9427	165e6b48-6ffc-498b-a9c4-aac0d7a14fe2	\N	51983e05-c043-4a3e-8998-9f4c032cdf86	t	9	9	f
a8ec1648-5cef-4866-b75b-4c72be63590b	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Mahtavaa työskentelyä. Avitti muitakin oppilaita keillä pallo ei pysynyt niin hyvin hallinnassa ja yleisesti levitti hyvää ilmapiiriä tunnilla	bca98182-4fea-4c2b-b829-6745f99e0321	t	9	9	f
a1a26c99-a421-4aa1-ab27-7849367eb5e2	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	7a43853a-3729-48b6-83ff-bd9f21a4a9c9	t	8	8	f
02e1a29a-2b79-45ed-9b72-32f8196e026c	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Hieman levoton tunti, lähti mukaan muiden pelleilyihin ja ei oikein keskittynyt tuntiin.\n\n	6216742f-6ee1-4b07-bb6c-8ce031ede1dd	t	8	7	f
b708fc38-99aa-40a2-8c82-02ead8be4bf5	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	6216742f-6ee1-4b07-bb6c-8ce031ede1dd	t	8	8	f
1d4ac376-d0e6-4fb3-b916-1e69d6c39b2d	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Keskittyminen ei mallikkainta, mutta taidot sujuivat oikein hyvin.	c854e589-492b-4b38-97fe-1c8717aa68ac	t	9	7	f
0740ee4f-ccd3-4824-a5d1-d0c28ae11d1b	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	c854e589-492b-4b38-97fe-1c8717aa68ac	t	\N	\N	f
11b5ea8a-47b7-4f28-a42f-88a2588e443d	74ff2516-b259-4f3d-b68b-dbc5c29d6daa	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
d5d634d4-2066-484f-b232-e221f284b6a9	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	bca98182-4fea-4c2b-b829-6745f99e0321	t	9	9	f
799804b5-e434-4334-8724-de0c446cd1b2	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
6b4083a5-7d9d-46d9-83b7-8dfce7b12a67	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
16221ded-e297-4bd4-bf3f-ca4bac170fca	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
cbd5228e-071b-4cf1-81ae-954ce4aeaa68	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
0ed137f4-7c63-4544-a109-24d7b5d42af7	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
0513b2c5-d151-4323-8ecd-1b3136093314	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
d9df3e92-d6c6-44fa-955c-cc4fef1afc90	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
3e95a54e-3e0b-4ac1-b4e3-992a9b1dc152	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
1a8f3053-a4a3-4430-b4b4-6b8e92219b17	404347be-f571-4254-b055-a06e9a9962f9	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	f	\N	\N	f
91e63dd6-6f99-40b0-b938-e6d9e78cc96e	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Hyvä tunti, ok työskentelyä ja pallon heitto sujui melko hyvin	7a43853a-3729-48b6-83ff-bd9f21a4a9c9	t	7	9	f
af3c60d2-713c-468a-8e85-0577a4085910	eac386e1-ca07-42b6-9817-50f1d1081903	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	9	\N	f
07c36c33-d55c-4159-a373-cdb576f7fb88	686241e9-7a4e-4eb6-bc99-26699999001b	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
dd245098-5b4d-48b6-9d5f-add192f8df24	2e03b196-3248-4f14-9f2d-4661e503665d	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	f	\N	\N	f
90ec30f4-52d2-4ed7-8321-421930586fed	b9266745-39ba-4be3-b1a1-421801b79832	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	f	\N	\N	f
2435704d-f9f6-4c7a-bd82-67cdb0dde505	799b59e5-c962-4f19-9f9d-01518c57a550	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
5664961f-572e-41c0-8fde-e0e5da2e6372	74e88236-472e-41ea-9475-73c94489ae2e	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
91b4fe7c-c1ed-4245-a008-be47c26f1d5a	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	f	\N	\N	f
0f7d620d-ec05-41d5-9487-a60e55248bc5	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	t	\N	\N	f
56ac12fe-d1cc-4363-923f-f256bbfa89cf	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	f	\N	\N	f
405f08ea-372d-4c59-ad5a-6f1b3d6e6a09	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	d9b24ed1-04ba-4bbf-96f6-cc0db42ae882	f	\N	\N	f
aa401431-f968-4dfe-9b6e-a5ff349e7f40	148a28ac-012b-44c4-b684-87a00ace9c72	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	9	\N	f
53e47dbe-adb0-43f4-8c25-8e5040805dc2	5bbc08f9-01e0-4911-9a6a-38790219ce2a	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	9	7	f
5f55f8e6-d3c5-4885-9474-6a2065209f80	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	8	9	f
85612b6c-c711-4c68-8c4f-0b0389dce68e	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	8	9	f
5ab7119b-a92d-4041-abe9-6d61091c71ba	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	f	\N	\N	f
1fa0c4d1-eeaf-44bc-a123-efe1faa1bb0c	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	Olet taitava välineenkäsittelijä	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	9	8	f
5feb7372-677a-481d-a33a-6b6ff5ed76b4	bde08c48-5140-47eb-b28b-ce5c86ea8f46	Lopetit työskentelyn, kun ope ei suostunut ottamaan leikkiä tunnin loppuun	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	9	7	f
7aa20023-1579-4ddb-a963-f3da3b5e2fae	e71cd959-78a0-4843-af83-1e8e741e7edf	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	8	8	f
acdf85f8-88a0-44c3-9074-f1082d3e4811	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	Haastoit omia taitojasi hienosti vanteiden avulla	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	9	\N	f
9d342419-4a5a-45d8-99d4-c59d7a15f61d	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	8	9	f
f1541b5b-f366-4fa0-acdc-a68b8c40cb0a	f03779c1-9d87-439c-8d95-14e384c7d2c0	Työskentelit sinnikkäästi ja lopulta opit uuden taidon	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	8	9	f
81826e45-99b9-4f50-a064-a73aa2fffa01	dc43f223-8b76-457a-b035-8b186320bdea	Vatsa kipeänä. Ei osallistunut suureen osaan sisällöissä. Hienosti kuitenkin kertoi tämän päivän tuntemuksistaan ja oli mukana reaktioviestissä, mikä oli hieno juttu.	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	7	7	f
681fedde-8d4a-4425-8996-07d3cf10eb57	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	f4ed3757-8623-42a2-a683-4d550a9b6f65	t	8	9	f
7a83354b-110e-4d2b-8a0f-27541f4a9686	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	b54b2774-53ec-4efe-9957-926827ff6edb	t	7	8	f
697ee5bb-901f-47fb-8d4b-5ff2e4b3f08d	f925429c-08cc-4cba-b5d4-d63ccf818c49	Moimoi	b54b2774-53ec-4efe-9957-926827ff6edb	t	8	9	f
5ff8d1dd-d125-4f75-ab0e-d68bf65f1e46	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	\N	1a72ed87-cce4-4240-83f7-6111c6ccf364	t	9	\N	f
28e15912-9ae8-4cc8-92fd-65545d8572e9	f179052b-20ed-4b30-92df-04ae478b0f06	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
ecf94d89-1254-4d88-855f-ee6b461a15cd	60c35aef-6137-44dc-b5d6-b796f1443148	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
e624adc9-bc6c-4b88-8b7a-867c0eb77139	0d410afb-beb1-4ac1-883c-f4d19f5f858f	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
f47f3dcd-4880-40a8-86e9-475b1439dc84	b4766346-0c81-4d98-a489-654ca9b3c6db	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
560ad48d-75dc-4bda-ace7-b57669f6716e	88c69065-37d1-45f2-a48a-a7b12a0694cf	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
19156985-387f-430c-9613-e6a9b1e164d9	1efd1671-ff54-4332-9da1-474aa3f3ec04	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
fc32f726-7155-4489-96c0-b6be7eae5149	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	9	9	f
42109ed1-3dbd-4280-9480-30fed95a8fe5	24c494db-a428-4430-ae3a-c321d5e765f7	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
1b610f16-71d3-42c1-be3a-e76f4053346f	39826f74-cf4a-41b7-a295-5cb63ec3a196	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
ba81145f-5aac-46f8-a4c5-4c5c1c52562d	86ad5e56-2605-4fd5-a0a2-3004e6136a7c	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
f81511b9-d17c-46bf-86f0-3f5fb0d870a8	a71c4a77-39cd-4672-a59a-0394bec62fcf	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
88966ba7-a5c6-4706-a801-e4ee578c22f9	3d55963e-6744-4828-b25d-c02aaa7ccc4c	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
00005d4b-7f05-4f07-9f4c-aeccf0522451	4bb3b891-7462-4e8d-ae54-e2df607d1478	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	\N	\N	f
d2c26161-405e-48e6-a41c-7506ec3389bc	95ef1789-275a-42de-bfc3-c9c006432782	Välillä meni pelleilyksi työskentely	2adfd36f-10bd-428b-9dfa-03225457702a	t	9	8	f
db3755b0-6862-48d8-ae9f-b077fc1a63a0	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Moimoi	de687f93-05ec-4f40-b524-15aefde3eeb2	t	7	7	f
18246b7e-9b50-475e-a03e-5a4a60163500	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	de687f93-05ec-4f40-b524-15aefde3eeb2	t	8	8	f
9726ca3b-39a7-4591-938a-73c3242f2728	92d51cc4-7e8c-4bcf-84b8-b3f4cad005cc	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	\N	\N	f
788f717f-76cf-4f2e-a103-5dfc75959c1f	954c2876-5f2b-4618-a2c0-8f86ff5b3da5	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	\N	\N	f
e1ba5c99-653f-4782-a3d4-a31dc12b19b4	bcdcfdce-bc43-43af-88b2-ce2f79d40da0	Omatoiminen jooga! 	1b994224-f869-4001-9336-6c5d07fe8e39	t	8	8	f
9992af2d-3bcc-4cf1-b20b-a9436fb6db80	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Toinen huomioi	f4ed3757-8623-42a2-a683-4d550a9b6f65	t	9	9	f
305e6c26-9a9c-4c5c-89d7-c56f0284a5f5	98160f96-0d06-40e7-9e12-1c1ad90442fd	\N	1b994224-f869-4001-9336-6c5d07fe8e39	f	\N	\N	f
64988bec-a018-4dd4-8f7c-d22bb92bd68d	d6b3db8b-50e7-4a6c-8ed2-2247a659a3a9	\N	1b994224-f869-4001-9336-6c5d07fe8e39	f	\N	\N	f
f5437440-65d9-41d5-aee5-404c60393e47	803c9cfd-c665-452f-9cf4-1315a875fa0e	\N	1b994224-f869-4001-9336-6c5d07fe8e39	t	\N	8	f
8cf149b6-16c0-4386-9508-b28896c160a8	545958d4-a061-46c0-a58b-e814f2864886	Omatoiminen jooga!	1b994224-f869-4001-9336-6c5d07fe8e39	t	8	8	f
0133d296-77c9-4050-850b-ec80c7ffc5e5	e5570e54-941f-4e8b-b7de-f2dd3d7662e2	Laiska osallistuminen, salilla ei käytännössä työskentelyä.	1b994224-f869-4001-9336-6c5d07fe8e39	t	8	8	f
fbf846d7-7003-4669-8ab8-8cc2055178f6	7c3affe4-d2a3-4620-907f-abc411bd5534	Vaihteleva osallistuminen. Lopussa salilla mukana.	1b994224-f869-4001-9336-6c5d07fe8e39	t	8	8	f
6f6e4157-a228-4eb2-b18e-b175e3ce338e	f37fb196-de25-4ea8-a1ff-280491ef3865	Mukana tekemisessä. Hienoa työskentelyä. Itseohjautuvaa!	1b994224-f869-4001-9336-6c5d07fe8e39	t	9	\N	f
18fb3460-f96b-4060-b8bd-241a92feae6d	7f64f516-bdbd-490a-9d83-6625c9834929	Tosi hyvää työskentelemistä tunnilla. Innostaa muita.	1b994224-f869-4001-9336-6c5d07fe8e39	t	9	9	f
e449dd50-8396-40af-a01e-f041e547ce4f	3a817706-c52d-4a77-8f87-68ef4514aef9	Kävelylenkillä. Ei varusteita mukana.	1b994224-f869-4001-9336-6c5d07fe8e39	t	\N	\N	f
ef64d323-1d84-4dce-8011-25fab4b2ad20	d9dd649b-f9bf-4670-84ea-a102fc16cfcc	Mukana työskentelyssä. Lopussa myös nyrkkeilyssä!	1b994224-f869-4001-9336-6c5d07fe8e39	t	8	9	f
7da5f695-3fc8-4e4f-a424-4f64af427caa	8597552c-2527-4294-8a08-56d47b563b33	Tällä tunnilla selkeästi aktiivisemmin mukana. Omatoiminen jooga, nyrkkeily yms.	1b994224-f869-4001-9336-6c5d07fe8e39	t	8	9	f
b15f8683-9451-4595-838b-edb5e4630b9e	34f18910-a0db-4e48-8129-8416b575d22b	Vähän puolivillaista osallistumista. Kuitenkin mukana kaikessa!	1b994224-f869-4001-9336-6c5d07fe8e39	t	8	8	f
44617c2d-9176-45a8-8edb-cf40429c2d3d	6bc63090-ea58-4189-b5d1-cba135d9da2b	Kävelyllä. Puolikuntoinen.	1b994224-f869-4001-9336-6c5d07fe8e39	t	\N	\N	f
77d56ff4-1d1b-45ce-a56c-c023555378d5	7b45664d-caff-4e11-a717-7c3e2e1ed7f7	Tänään ei työskentelyssä mukana aktiivisesti. Ei jaksanut.	1b994224-f869-4001-9336-6c5d07fe8e39	t	8	7	f
ffb3cd05-7f4e-4f26-9e1b-2793ad7df202	671ee4af-e36d-437d-b3ec-bee0179c96c4	Vaihtelevaa osallistumista. Puolikuntoisena kuitenkin mukana.	1b994224-f869-4001-9336-6c5d07fe8e39	t	9	8	f
75a1810d-9dbe-4873-9a1d-af7938bd6986	dc2469d2-1c1d-499c-bb3c-ff061b70307d	Osallistuminen tunnille kiitettävää. Innokas ja aktiivinen työskentely.	1b994224-f869-4001-9336-6c5d07fe8e39	t	9	9	f
4d55640d-b6fc-41a0-8a71-cf4205db767c	d21c58bf-a09d-4a2e-ab5f-131a3233f6ba	Omatoiminen jooga! Nyrkkeilyssä mukana.	1b994224-f869-4001-9336-6c5d07fe8e39	t	8	8	f
86d407ec-120d-4f08-b18c-ec49c8615975	f2cd6a55-4291-4848-a66e-36d096f181c4	\N	1b994224-f869-4001-9336-6c5d07fe8e39	t	8	8	f
eb2d4b0a-7885-494d-8bfa-46d11b79ecf7	a17ec781-f403-45b7-b1a2-2ad88dc2038e	Vaihtelevaa työskentelyä tunnilla.	1b994224-f869-4001-9336-6c5d07fe8e39	t	8	8	f
5aa0b0ef-7d7f-489e-ac66-e6b05dea5653	9ffd35f9-d869-4406-aa8c-cf60cbc47830	Omatoiminen Ylläksellä	1b994224-f869-4001-9336-6c5d07fe8e39	t	\N	\N	f
60c68bdb-56bc-4e18-a33f-ab751230cc99	f71a7e38-187d-4dfb-823d-f959158a971f	\N	1b994224-f869-4001-9336-6c5d07fe8e39	t	8	9	f
c9beea5d-ebe4-4946-a76c-70e1b6fd2b7a	165e6b48-6ffc-498b-a9c4-aac0d7a14fe2	\N	1b994224-f869-4001-9336-6c5d07fe8e39	t	8	9	f
1ade653e-2fca-466d-8a07-f1d0b0684c70	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	f204db7e-8c50-4205-8253-2c4295f4cc23	t	8	8	f
b55f1bce-1e7b-4074-864e-5449485eae93	14c62b14-21d5-468c-b04f-89d60b2efc76	\N	f204db7e-8c50-4205-8253-2c4295f4cc23	t	7	7	f
231183cb-9860-4903-bc79-f61ad3814db1	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	Moimoi	f204db7e-8c50-4205-8253-2c4295f4cc23	t	9	9	f
39a63438-3a6b-4ca0-a80a-22410b19cf80	98d2b651-d44d-4a40-ab28-da3fa61df960	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
671940a8-7f11-4a7f-9713-6ad3295cf6e0	98160f96-0d06-40e7-9e12-1c1ad90442fd	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	f	\N	\N	f
b37762d7-37ac-4325-b4e4-a918540593c5	dc2469d2-1c1d-499c-bb3c-ff061b70307d	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	f	\N	\N	f
d61c414f-1ff9-4111-98b9-1b90520a7487	d6b3db8b-50e7-4a6c-8ed2-2247a659a3a9	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	f	\N	\N	f
40e388c5-1c43-4869-aa4f-03d670e9f205	803c9cfd-c665-452f-9cf4-1315a875fa0e	Vähemmän omaa työskentelyä mutta muiden tsemppausta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	\N	8	f
3cafd45c-5108-435e-8407-8fed9ed9065a	e5570e54-941f-4e8b-b7de-f2dd3d7662e2	Hyvä tekemisen meininki!	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	\N	9	f
a611bcda-1994-4ee4-82e5-a8c14843ab25	545958d4-a061-46c0-a58b-e814f2864886	Lentopallossa hieno itseohjautuvuutta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	8	9	f
21906a22-268d-431f-b85f-2c5d11217853	7c3affe4-d2a3-4620-907f-abc411bd5534	Innokasta osallistumista.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	9	9	f
8b195d7d-bd5d-4da6-952a-761a591698f6	f37fb196-de25-4ea8-a1ff-280491ef3865	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	9	\N	f
a5b113a8-7787-451a-a659-d233d2101734	f7aff351-6b9f-4caf-8717-5a611192f6d9	\N	8d478ae5-8238-4ee2-9731-b04edb5026c6	t	8	8	f
6e4c2d47-a98f-45f5-9ba5-4f0ad90f3f36	7f64f516-bdbd-490a-9d83-6625c9834929	Auttoi Ainoa salilla. Kokeili uusia juttuja!	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	9	\N	f
de2db57c-6000-4605-9886-eb05c7e3da28	8597552c-2527-4294-8a08-56d47b563b33	Lentopallossa hieno itseohjautuvuutta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	8	9	f
cbab7b31-f469-4a53-b86a-1dc81fae679b	d9dd649b-f9bf-4670-84ea-a102fc16cfcc	Lentopallossa hieno itseohjautuvuutta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	8	9	f
7505a97d-5ddc-468a-839b-925eb5f5268f	6bc63090-ea58-4189-b5d1-cba135d9da2b	Lentopallossa hieno itseohjautuvuutta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	8	9	f
86fc9bf0-2394-446c-b0bc-2488d9621e92	671ee4af-e36d-437d-b3ec-bee0179c96c4	Lentopallossa hienoa itseohjautuvuutta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	9	\N	f
de0ff127-63ec-4b8f-b7a0-42b259b24061	7b45664d-caff-4e11-a717-7c3e2e1ed7f7	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	9	\N	f
0238b222-9ec6-4022-a30c-712383d3d407	f2cd6a55-4291-4848-a66e-36d096f181c4	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	8	9	f
2785c423-c8c2-4948-8b89-1de256c5d279	d21c58bf-a09d-4a2e-ab5f-131a3233f6ba	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	8	9	f
49c63a8b-0eaa-40bd-afee-e5b7d9c22112	9ffd35f9-d869-4406-aa8c-cf60cbc47830	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	f	\N	\N	f
45ce8007-5393-4e46-99f0-a93a94e01fa6	bcdcfdce-bc43-43af-88b2-ce2f79d40da0	Lentopallossa hieno itseohjautuvuutta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	8	9	f
8a215e13-6012-4920-a941-6e815de35397	3a817706-c52d-4a77-8f87-68ef4514aef9	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	9	\N	f
6a092fea-d9de-45cb-bcff-2f9aecd44787	34f18910-a0db-4e48-8129-8416b575d22b	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	9	9	f
64de6426-a0f0-4b76-9edd-2064946cf3d4	a17ec781-f403-45b7-b1a2-2ad88dc2038e	Ei oikein napannut mikään. Mukana työskentelyssä mutta ei fyysisesti.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	8	8	f
83b4467a-9e3c-4f19-91d4-0a8cadee78b6	f71a7e38-187d-4dfb-823d-f959158a971f	\N	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	9	9	f
43eed070-d385-4a5c-8fdf-94e088786f96	165e6b48-6ffc-498b-a9c4-aac0d7a14fe2	Lentopallossa hieno itseohjautuvuutta.	9ccac28e-da82-42b1-b5d1-d632e88c9009	t	8	9	f
7f9676e2-08ba-40ef-875b-d81f40f720cd	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	Kannustit muita ja yhteistyötaitosi olivat erinomaisia	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	9	\N	f
543f9415-c6cd-4c17-8ae8-5b85ae0ce95c	05c4f013-bc9a-4155-925b-6f8485bb5378	Työskentelit lentopallo tunnilla erityisen hyvin	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	9	9	f
cacbaf5d-6fed-47df-924c-523dd8999d8a	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	8	8	f
487bf771-2567-4286-b108-4b24e1b701a2	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	8	9	f
b2fc6b4f-3a69-40d0-972a-35c03742bc94	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	\N	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	\N	9	f
b63920aa-1203-458e-8249-635e7a87e856	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	9	\N	f
e056c388-a14c-4952-a0e9-dd3f1269c2be	5bbc08f9-01e0-4911-9a6a-38790219ce2a	Olit taitava välineenkäsittelijä lentopallo tunnilla	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	9	8	f
85dd5b8d-d39b-49f6-919e-ea1090a94f24	f4fc8254-27a5-4a0d-aca1-03b85e4020ab		b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	8	8	f
d2e4db76-1535-47cd-a694-1ef772be8855	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	8	9	f
07c3a758-1bf3-4db8-a022-6fdfc0c56d4f	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	9	9	f
ec0f157f-d3f1-4717-bcaf-5527379004da	f03779c1-9d87-439c-8d95-14e384c7d2c0	\N	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	9	8	f
5ca85d72-eee4-4a61-aa27-8cfb601f0709	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	8	7	f
7bef522c-e8b0-467f-841e-33ef67772728	a6eb654d-12a2-4350-a687-128314062791	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	7	8	f
d8c83801-951b-433c-bf51-494363643cd7	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	9	8	f
503fa064-ab60-48dd-895b-b2938f35efd3	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	8	8	f
51d87cac-36a1-4fc3-a874-c1e83ea44098	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	e3c72671-2c10-4d64-95e1-107809ee55f2	t	8	9	f
e7673ba6-3d9c-4543-9e07-5bcb4d02a16d	14c62b14-21d5-468c-b04f-89d60b2efc76	\N	e3c72671-2c10-4d64-95e1-107809ee55f2	t	8	9	f
617924eb-83b9-4f81-9ea2-1b942d96baa7	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	e3c72671-2c10-4d64-95e1-107809ee55f2	t	7	7	f
c18c83f6-cfad-4e20-8272-0aef83224068	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	9	9	f
ab42f91c-d02a-4d74-8c98-84ec11f1bf99	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	9	9	f
e90049a0-8edb-4fbd-aeca-2b120afbfd7b	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	8	9	f
6796449c-3701-4fcd-9597-dd85ccdd7470	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	t	7	8	f
33c7c284-5bd7-4d9f-ab73-8a5fa63be03f	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	9	9	f
33db6f8b-9fd5-4406-80ee-b1c91221e9a5	148a28ac-012b-44c4-b684-87a00ace9c72	Teit hyvää yhteistyötä muiden kanssa	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	8	\N	f
8e4a2b51-7016-450a-8e62-c8820b65bd65	a639981f-4bf0-4871-b264-00ad02a9a286	Vahvuutesi pääsee esiin palloilu ympäristössä	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	\N	9	f
63c0b326-1454-4ee7-9a38-e0098c0ba8c0	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	Erotuit positiivisella toiminnalla lentopallo tunnilla. Teit hienosti yhteistyötä muiden kanssa	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	9	\N	f
a211a144-acbb-458d-8fb4-8ac6fd5e888b	bde08c48-5140-47eb-b28b-ce5c86ea8f46	Kannustan sinua kiinnittämään huomiota työskentelyysi. Toivon enemmän yhteistyötä muiden kanssa	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	8	7	f
23e493c9-a010-4768-8c04-d13ed5c46906	e71cd959-78a0-4843-af83-1e8e741e7edf	Työskentelit kiitettävästi vaikka fiiliksesi ei ollut parhain	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	8	9	f
3acdfbba-fe06-4cbe-9603-f5401f246c54	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	\N	b2141604-d8a2-4f1f-afe5-c6ea3875d0cd	t	8	\N	f
57efbc0e-04f3-48d3-823d-a2749ee1621e	1ba24224-da11-4745-be85-ed1ce7bb2669	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
96a31aab-fbeb-43e4-a117-f844dcf9c7db	dc61c65a-cfe6-4743-a80b-98c54491a42c	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	8	9	f
ddd588ff-c9a9-4af6-ae4a-4b0887706387	1b5d1532-f11c-4b7a-bb15-8754ae38223f	Hyvä tsemppaus nyrkkeilyssä	2adfd36f-10bd-428b-9dfa-03225457702a	t	8	8	f
4e109d23-ad72-4d49-a1fe-2d167cc22b84	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	Käsittelit välineitä hienosti, mutta keskity tulevaisuudessa paremmin työskentelyyn, vaikka tunnin aihe ei ole kiinnostavin	8c1fb18f-3e3f-4dd5-915e-91232a2d6845	t	\N	8	f
490f3e50-3551-435f-bf65-0272655a879b	36c47c4b-1f5b-43d8-843a-6f74ab4e86b9	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
73f5cd5a-171d-496f-bd23-c2ec2bda6824	45adabcd-6682-4ff7-abee-9f8061af9a3b	\N	2adfd36f-10bd-428b-9dfa-03225457702a	f	\N	\N	f
7a0c355d-aaf9-4d19-b427-0582d054375f	8a993418-3f13-49b4-bb21-93368d8f7a50	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	8	8	f
6d6823ea-e3e0-4e57-a4f0-fc2c0e993a4d	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	f	\N	\N	f
76da08f7-5fc6-4758-8e8d-900594e5c85b	8faa9bc9-fbb9-4c0c-ac24-99c987bd412f	Huonovointinen	2adfd36f-10bd-428b-9dfa-03225457702a	t	8	8	f
aa8e1773-a036-43e4-98b7-36f4b78ca592	6c629051-3712-43f1-8f21-c357442fc591	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	8	9	f
5c3bdfc6-8bb5-4820-afb4-6b25b15b531b	12acc9ab-19a4-404d-b072-4760f41732dd	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	9	9	f
8cbff5f6-a157-4343-89b2-3c5a17f4206f	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	Huippuhyvää työskentelyä!	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	9	9	f
39a16924-d287-43a8-8d92-741c29d34d1f	7cb540a6-c01f-42c7-a0e2-099d290c0b6a	\N	8d478ae5-8238-4ee2-9731-b04edb5026c6	t	9	9	f
8b76a7d2-726e-4e76-b69b-bd326bafdb1c	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	f4860d37-f4ca-4ba4-8970-6bb133f22cd3	t	8	7	f
69b6d6a9-e0b3-4307-ad8e-33c54cf79c92	898eaa06-334f-4446-98b3-2368ad2b6cef	Ottaa vastuuta yhteisistä oppimistilanteista!	eae42717-f8ef-4cc4-bdbe-a7599e7bd261	t	9	\N	f
e2046ecb-b911-4088-ab5b-932a8ba48b4d	f925429c-08cc-4cba-b5d4-d63ccf818c49	Moi	f60cf3aa-428c-42ac-984e-6f4e8ebdef25	t	8	9	f
90cb7510-69fa-41c3-a01c-6d85d243eec0	4454d03a-54da-4c2c-b931-b4b96ac0d81a	\N	fb37655d-6494-4657-9055-5e6a24b61e2a	t	8	8	f
c9b692e6-bb37-4e70-a983-4d7c3815d86e	4c658b14-0fce-4ca3-ac9a-42558969e0e2	\N	fb37655d-6494-4657-9055-5e6a24b61e2a	t	8	8	f
a9d320fb-10c9-4365-9893-7199c0c23f2a	7c159017-8908-4a89-bc0b-dadcb58a2d03	\N	fb37655d-6494-4657-9055-5e6a24b61e2a	t	9	7	f
c428d13d-7daf-4860-9dc0-5f0137bae897	7131bcea-6594-4433-be62-2dca8ffad861	\N	fb37655d-6494-4657-9055-5e6a24b61e2a	t	7	9	f
261146c0-9494-4b86-aaa6-b21d57cfc05f	f925429c-08cc-4cba-b5d4-d63ccf818c49	Tässäpä testiksi vähän huomiota terve	a25e0294-c261-4524-bdce-1038cfe49910	t	9	9	f
07580433-1a21-4326-b5f1-5b0f58743e6a	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	a25e0294-c261-4524-bdce-1038cfe49910	t	8	9	f
e22ae63c-a7d9-4952-8a27-13a58b2a6b85	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	a25e0294-c261-4524-bdce-1038cfe49910	t	7	8	f
5e2a9cfa-3b67-4e17-ab9b-32d6064b2b71	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	fab75884-b991-40c8-a22f-b9366be377ca	t	9	\N	f
0fb074d3-d7c8-49ca-9392-41a74701c1ed	251b27c1-5684-424b-b17b-7257a311bd33	\N	fab75884-b991-40c8-a22f-b9366be377ca	t	9	\N	f
3f445131-1c4a-4191-9aef-58c4e0b354cb	9c66fa7f-c08f-4905-9c54-5da739156493	Hyviä suunnanmuutoksia maalialueella	fab75884-b991-40c8-a22f-b9366be377ca	t	\N	\N	f
1a7bbe7d-0b43-4195-8a47-721ef2f35222	04629d10-42df-4873-bb8e-a38230d93b8a	\N	fab75884-b991-40c8-a22f-b9366be377ca	t	\N	\N	f
5152c8c3-b8f4-470c-976e-0eaddbba958e	b8a8e21b-2e09-4855-a354-0c48800913c9	\N	fab75884-b991-40c8-a22f-b9366be377ca	t	9	\N	f
23ec0152-360d-440f-a897-525cd76026e7	88c69065-37d1-45f2-a48a-a7b12a0694cf	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
f7e7a949-171d-4f21-8375-cb9bd1d905ce	60c35aef-6137-44dc-b5d6-b796f1443148	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
38589380-ede7-4dd6-b5df-280e609e3496	86ad5e56-2605-4fd5-a0a2-3004e6136a7c	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
de765420-0fc7-4508-869e-f341584f4de8	2eceab39-5d0a-4201-a275-17a1bed011a6	Huomioita	f60cf3aa-428c-42ac-984e-6f4e8ebdef25	t	8	9	f
0feac072-d570-4250-9d36-937712aa7ac6	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Jotain muuta	f60cf3aa-428c-42ac-984e-6f4e8ebdef25	t	8	\N	f
87ab6033-fc5e-4c08-a39d-df1ef448f8dd	39826f74-cf4a-41b7-a295-5cb63ec3a196	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
2dc5b165-0914-409d-b73d-69fbedd70aad	3d55963e-6744-4828-b25d-c02aaa7ccc4c	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
4a84da83-aee6-4c07-b636-410f1554f69a	1efd1671-ff54-4332-9da1-474aa3f3ec04	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	f	\N	\N	f
1cd7ba2a-0314-4bc1-a0a7-8a07ba314ef5	92d51cc4-7e8c-4bcf-84b8-b3f4cad005cc	Hyvää maalivahdin pelaamista	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	9	\N	f
ddc626b9-edd8-479f-b30e-2011113ebbea	12acc9ab-19a4-404d-b072-4760f41732dd	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	8	9	f
a54cae62-fac1-41ba-95ae-1dcf9f72579b	d6bae43b-c9c1-42c3-bd74-736d3be6e4f2	Kovalla vauhdilla!	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	9	\N	f
e5ef3566-780b-4b1b-86a4-686bb683d386	8a993418-3f13-49b4-bb21-93368d8f7a50	Maalivahtina koko pelin!	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	8	8	f
fee88ba9-490c-43a0-98a5-33ee8fedd77e	7e57c1d9-b037-4ae6-a0c9-2b409b90f748	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	8	9	f
09c6bcfc-488d-4fbf-ab81-5483ce227b63	3c489011-57bc-41fa-a0b1-2166fd23bac5	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	8	9	f
b7ff003e-b0c5-414d-80e6-b93bef186677	954c2876-5f2b-4618-a2c0-8f86ff5b3da5	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	9	\N	f
051eeb77-dd53-4610-81af-0f1925be6f24	8cc39180-992f-41be-88d7-d798fc88abe0	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	f	\N	\N	f
47dbd556-477f-4397-ab83-598a03b014b9	d6bae43b-c9c1-42c3-bd74-736d3be6e4f2	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	\N	\N	f
a9d75cfd-aff5-4005-8687-cf390c146011	344890ff-a10d-4801-992d-36bcbcc43663	\N	2adfd36f-10bd-428b-9dfa-03225457702a	t	8	8	f
b849be50-e56a-4b8f-9ea1-269785a276a1	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	f	\N	\N	f
66a2b4ed-cf7d-42c5-b842-568d0cc0411c	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	f	\N	\N	f
fc1bded5-f0dc-4fcb-aa70-71d3aef5f5e5	16149225-d420-4254-88de-36f235415650	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	8	9	f
6e5f9f40-0f7f-407e-a44c-f4438c5108f5	7af2670e-d622-44de-9458-0e3490224f19	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	9	9	f
c6eb1c42-8af1-42e1-8003-9bcced11e64b	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	9	9	f
5fe9fc8d-e9e3-4055-b9f9-a51623a22906	eb96e883-bf2d-4482-b8c9-6d272ee35354	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	\N	9	f
358f1ac1-101f-4d62-af09-c02b351bf893	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	9	9	f
d1c8ea15-9d50-4a0d-b21b-18f8b8558449	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	9	9	f
71ca963d-41d1-42e8-8d9f-3a5721aa26e9	898eaa06-334f-4446-98b3-2368ad2b6cef	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	9	9	f
7c7c20d4-3239-4b3b-9f0e-9c30a69d28c2	052654dc-bfba-4092-85d4-6894c908f9b1	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	9	9	f
084d998b-a257-403c-9ad0-d0785af603e6	a9823635-cc6a-4026-ad85-423287d7ec49	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	9	9	f
4bed0d32-7aa6-4648-a45e-611437754c5c	b015f02b-0e21-4f21-93d4-8497311b6490	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	\N	9	f
0150fb97-8892-421f-8280-b651221054a0	4cdb20f7-d8a7-480c-9379-bbe14d95d933	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	\N	\N	f
87a246c0-f236-4799-a482-b0bb808dea1c	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	8	9	f
21f9b1eb-8c33-453b-afbe-9fd884dcfa48	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	cad9f7d4-a5c1-4ff2-9b94-edcb84b13a47	t	9	\N	f
c2e7b9cf-bc5f-4cdc-aaa4-76cfad08f3f8	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	f	\N	\N	f
41e8eda6-0944-4d38-9628-e6f048a62ffd	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	f	\N	\N	f
6656dac8-fc77-43fe-8876-88128aa36b05	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	f	\N	\N	f
e85962e3-c32a-4f52-97da-6f3d25cf4465	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	9	\N	f
5d15db5a-9c2d-41c9-ac6b-4cc14dec428b	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	9	9	f
0be36c28-e8d4-4b59-84ca-510a3f67741e	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	8	8	f
86dca618-c24c-4d1a-91f3-555e61436770	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	9	9	f
bddd3177-bc44-46eb-86ba-101ddf5d651e	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	\N	9	f
bd16b4c5-0269-430a-9dad-08168486ff12	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	9	9	f
4cac8929-e8c4-4163-a66d-e5eb44b0886a	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	8	9	f
5b4d58dd-74a4-4807-9add-ffb5aea577b5	404347be-f571-4254-b055-a06e9a9962f9	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	8	9	f
0ceb5162-b0a7-490a-8d0e-36b77a4817c0	686241e9-7a4e-4eb6-bc99-26699999001b	Puhelimen käyttö	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	8	8	f
528b2b84-fdb7-4b33-8c75-4b69b0e0c017	2e03b196-3248-4f14-9f2d-4661e503665d	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	8	9	f
c8c9267d-903e-40e5-8f19-96dc9159f666	b9266745-39ba-4be3-b1a1-421801b79832	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	8	9	f
c3540ae1-54f4-41bd-b820-7930a0727bff	799b59e5-c962-4f19-9f9d-01518c57a550	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	\N	9	f
b889a48f-5be7-4bad-bfde-902f779c60c8	74e88236-472e-41ea-9475-73c94489ae2e	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	8	9	f
fee0f3b9-a0c2-4525-aba3-9763c8a2b2e7	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	8	9	f
631030fb-43b2-44f5-8364-8c2984d640e5	4943ad21-7f08-4b45-8d6c-7cccbfb05562	Jättäytyi pois osasta toiminnasta	7a90bdaa-e683-4a3d-8d4f-78c56fab3e13	t	8	8	f
7c89f2b2-e949-4209-a069-1283f266707a	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	f	\N	\N	f
d368c281-6ca9-442c-be91-19d184dd2aed	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	f	\N	\N	f
34d1b9f9-231c-4695-8caf-6f0e42aedf55	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	f	\N	\N	f
bea7130c-7046-4668-bc79-1fc282e51989	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Pesiksessä ei kunnollista osallistumista	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	8	8	f
2fec38c8-d33c-4a0e-85c6-d213c7fc3cd7	b05b035e-4867-40c1-965e-f60630bfa457	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	8	8	f
72481adc-c5f2-4d2b-8a27-aa93ca028ff3	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	9	9	f
f784032e-5774-47a4-8478-b64b24d7c406	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	\N	9	f
a6a11a43-d27a-4ef0-b03a-57e2fcd00b6b	350594d5-5cd4-4033-9294-6b50102afe7d	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	8	9	f
143480bc-e6ad-4815-a77f-48f831c4131d	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	9	9	f
2299721c-693c-47dd-8c91-11b5a82dd0a7	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	8	\N	f
d7baee49-7cd8-4fb1-a6d8-5ea378f7c2bc	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	9	9	f
340df978-2711-497a-9ae3-70e3db6f22b4	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	9	9	f
4f49d81a-4604-41ee-8c19-ac238e703efe	720863b3-15b5-4928-b516-5a8ec0cee764	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	9	9	f
18d56539-19ad-4c9c-bdba-00b4951cfe9a	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	8	9	f
023dea80-106a-4d75-9897-b43e28c2f817	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	8	9	f
6037968c-366e-4d75-b134-257675584810	24007058-ca39-4c69-9004-c3d29b441fb3	Nukkui pommiin	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	\N	\N	f
cab23c51-ca25-4088-a734-2b7225e05c7c	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	e9ca0e55-45fd-4c1a-b588-c07ae30bfaea	t	8	\N	f
6f848f7d-ad94-4a47-958c-1da8d46ae587	aff989da-421b-4128-968e-5f54d59ca7a0	Välillä meni pelleilyksi työskentely	2adfd36f-10bd-428b-9dfa-03225457702a	t	9	8	f
929082a3-667d-4eaf-be46-bc973e68ed75	7e57c1d9-b037-4ae6-a0c9-2b409b90f748	Puolikuntoinen, paikat kipeänä	2adfd36f-10bd-428b-9dfa-03225457702a	t	8	9	f
e6877cb9-b853-4865-9abc-56eebb9411cc	3c489011-57bc-41fa-a0b1-2166fd23bac5	Motivaatio hukassa	2adfd36f-10bd-428b-9dfa-03225457702a	t	7	7	f
557f7ecd-7748-415b-9790-e9aefc5077cf	e06b8ddd-84b2-4101-abe1-ecea8ecb8afa	\N	d92db901-9823-4102-b351-5d20f3c69b1f	t	\N	\N	f
e835b514-64de-41bd-9b51-7f5f844df617	8f4df76a-3d26-432b-882f-4790ba82a24a	\N	d92db901-9823-4102-b351-5d20f3c69b1f	t	\N	\N	f
3da3dee7-50c6-43d2-b21c-393cc2dd92f4	e5cd5e34-6c87-4ccb-81c7-f70bae71ffee	\N	d92db901-9823-4102-b351-5d20f3c69b1f	t	\N	\N	f
240c6dfa-b192-490d-8dfb-3a7da6185b7d	28426aca-f675-46f7-bafc-dc5f7eb649c5	Taitavia katkoja, hyviä ajoituksia	fab75884-b991-40c8-a22f-b9366be377ca	t	\N	\N	f
216a50df-373c-4804-9711-49dcabb5da96	fb78d640-ca97-407e-9d2b-6390b8a2c77d	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	t	7	9	f
0e23e7ad-9928-42cb-80fa-630c9286cd53	91a00bae-00db-464f-8376-591e16a5a811	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	t	9	9	f
b1e60827-8759-4fc1-8ca3-83ba3ee85551	f9c6b20c-e57c-4e70-9f32-dedd975aab01	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	t	\N	9	f
569ec425-ed4a-408b-ab17-c071d5fc344f	e47d29de-6a02-4e63-a52a-964fc17b744e	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	t	\N	9	f
d6066a8e-74c7-4455-bd36-0978f6f9a139	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	t	\N	9	f
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
a21fbe76-29d0-432b-b4df-f4fc06ed1b48	4bb3b891-7462-4e8d-ae54-e2df607d1478	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	9	\N	f
8465c29a-b30b-4e4d-8831-02a64ae76261	98d2b651-d44d-4a40-ab28-da3fa61df960	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	9	9	f
9ef70222-87c7-412e-a6d7-06988ed3b836	dc61c65a-cfe6-4743-a80b-98c54491a42c	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	9	9	f
1573c148-c219-4d15-8abd-2c2ed6e5fee6	8faa9bc9-fbb9-4c0c-ac24-99c987bd412f	Tänään oli huippuhyvää työskentelyä	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	9	\N	f
c3b45eca-5ed0-44db-970c-6785db89cd17	a639981f-4bf0-4871-b264-00ad02a9a286	\N	788ded55-48ae-4d16-8db3-ff89f8b3b16d	f	\N	\N	f
1b66095b-20e2-4789-a029-376127929ab4	bde08c48-5140-47eb-b28b-ce5c86ea8f46	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	8	8	f
8711b51c-04b6-46c1-92f3-5effec003682	63f57cea-4036-4e38-9d84-3c36f99124ef	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
df8b4c39-c7e3-4bd0-b8e5-0fe4c03296ea	3723e655-2484-4055-8570-13ee693d5a1a	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
620de552-4342-4035-b87a-46654604d0cd	3e62f535-90a9-4a75-9748-27ea0d491a54	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
ce8034fb-2421-4265-b9fe-54df01db5700	ad671202-0d1b-4b31-a2fc-9fa9032f3b33	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	f	\N	\N	f
7bf66106-77d3-466f-bdfc-108956cdc486	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	t	8	9	f
5fb8264c-b380-455c-92b1-0470a195d5fc	aa420673-c8ba-41da-9ee4-061022bb4a51	\N	c222d9c2-e979-47cd-b545-1803e2849a9e	t	9	9	f
50eadc10-dc90-4723-b0d7-d426d0768307	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	cc062cb4-8bad-4b3c-89fe-f5196d97b7a3	t	8	8	f
bf58a222-7740-4f0d-a1f5-c0f8b2dd280c	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	8	8	f
eb1bdafc-15d8-41b7-a610-e5bd169fc9cf	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti osallistui joogaan keskittyneesti ja rauhallisesti. Hän auttoi muita osallistujia ja piti positiivista ilmapiiriä yllä.	d54b8c42-67e5-49a5-85f3-f163230de4a7	t	9	\N	f
d528b938-26cd-438a-b65a-bfc55b5d663c	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa kokeili beach tennisä ensimmäistä kertaa ja sopeutui nopeasti sääntöihin. Hän ei aina osunut palloon, mutta pysyi positiivisena ja kannustavana.	c0076c27-405b-4dcc-a944-323b279d0986	t	8	8	f
60a4db35-64e2-4f4a-88ef-324bcf7afb1a	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui kuntosalitreeniin ja keskittyi erityisesti keskivartalon lihaksiin. Hän teki liikkeitä hyvällä tekniikalla ja auttoi muita osallistujia tarvittaessa. Treeni sujui hyvin.	abb65c1c-fb0f-44e8-84c8-c542fe24ef96	t	9	9	f
d53dc749-3673-44de-aeb2-ec56e0036a02	24bd87c1-454d-412e-a843-595ffdc4892b	\N	4f42caa2-bcc4-47e8-bab9-1ef88e9382c2	f	\N	\N	f
e72b1d09-13ab-42fc-ab88-af3b81a8eccd	df05106e-6e95-4a82-af93-c5f6f8a58047	\N	4f42caa2-bcc4-47e8-bab9-1ef88e9382c2	t	9	\N	f
17807db0-917f-4800-bd87-4bfcb5431500	e459564c-d6aa-4fec-8790-508218a41435	\N	4f42caa2-bcc4-47e8-bab9-1ef88e9382c2	t	8	7	f
62163ea9-4c90-4af8-927d-c8c03a9a50fd	c99cbc5a-d88b-4022-bc5a-aae33f51e30b	\N	4f42caa2-bcc4-47e8-bab9-1ef88e9382c2	t	7	6	f
9aa3ffcb-978f-48f3-af9d-3631ce815512	b03cc979-7da3-4d75-b187-943264397b04	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	f	\N	\N	f
6e80a5a0-3f13-449a-afcf-397338c6acbc	db8905a7-084f-4d92-af60-cf29824dabe7	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	8	7	f
fb463eb1-90b1-445f-94dc-e6db6b8de64c	971b8500-6c50-4f89-ab1e-f5219ccdef93	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	9	7	f
74936fde-5ea8-456a-be6e-768fecc0930d	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	0e16a08a-76d4-4cc9-9f50-1903a928125c	t	8	9	f
8e78b326-4a35-44a1-9135-2ee8d0868346	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	0e16a08a-76d4-4cc9-9f50-1903a928125c	t	7	7	f
16f5da69-43e5-44f7-863c-eb7d40a9cc07	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	\N	9	f
de948912-a946-4ca4-8142-07d5f6f8ce3b	750d8c1e-30f2-49fc-a445-7acdb4bff78e	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
17f12f79-c32b-4f80-b54b-ebaa96baf62c	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Jokin huomio	e5229c63-bab4-43aa-b959-523054e27f69	t	7	7	f
fcb5173c-c228-4e84-85ed-538a08a72532	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	e5229c63-bab4-43aa-b959-523054e27f69	t	\N	\N	f
e7681958-c8f9-4824-8284-c4b1c108118c	2eceab39-5d0a-4201-a275-17a1bed011a6	Terve terve	e5229c63-bab4-43aa-b959-523054e27f69	t	7	8	f
3d2ddd77-c84b-4bc5-8f0c-2788eba965cb	2eceab39-5d0a-4201-a275-17a1bed011a6	Huomioita jotain	0e16a08a-76d4-4cc9-9f50-1903a928125c	t	8	9	f
47bdd278-4ad4-4422-99d2-0537f440b990	81f9f274-c50a-4b30-b0f5-15c1479b942c	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
81fc2be6-d2c1-40b9-bf74-bbae9dead21e	eac386e1-ca07-42b6-9817-50f1d1081903	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
d5cba415-e655-43ee-a390-397f81e92f58	6edb9c7d-338c-42b3-8bed-95c037398e1d	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	f	\N	\N	f
de3b865c-7ac9-4d83-8dff-9c2a8686cae0	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
c7ab2f8f-e64a-46dd-a437-e27faefcd105	081d3462-484c-45f4-b7df-9eef1712d829	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
f518644d-f0fa-4c90-ae30-c965e76fdd09	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	f	\N	\N	f
6491c19c-e734-41fe-889f-b4a339c11956	25ba77b8-721c-4c32-b5c6-97ea194d2958	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	9	\N	f
9717b3fe-515a-43fb-95cc-aa3626d4c94b	8c057200-e725-4e08-b93c-88bd891fe862	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	8	8	f
d94d64e9-6da8-4774-9f61-ac18998992c1	6f8a2928-32c2-4e60-9c99-b8073fcd9d35	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	8	8	f
a525b2be-1216-4726-a5b8-76e7b5fe51cb	1a420969-4c65-4a34-bdc2-80e13ed51f0b	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	8	8	f
e6466578-87db-4331-9c5a-d4b239c57250	6e24ea61-532f-452b-865d-b67df86c48c4	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	f	\N	\N	f
96b027db-d130-4380-978b-05b1b979e7f6	c08c69f9-ef26-4f6a-95ee-455d176dfa61	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	f	\N	\N	f
f22153b1-f37f-460d-8efe-29e7f88deed8	3b6d04be-cd10-4e54-b5aa-28a67e8e2186	\N	ce15d4d7-9363-4b93-97af-afd713c97a0e	t	9	8	f
9f19b97a-0602-478b-b25a-3a2b6683e5c4	1dd2a92e-8754-4265-884f-db0a12b6a4c8	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	9	\N	f
cec15897-3dfe-4183-824d-106bd013207e	5e5f9c60-1c5e-43f6-97ff-6e6144ecf55f	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	7	7	f
3e361132-8974-4984-a710-ee8f51597438	b03cc979-7da3-4d75-b187-943264397b04	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	9	9	f
b62edaaf-0b14-4b31-9423-e9211ce1d4c2	db1510ed-3bb6-4856-8ea9-5012eeb68192	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	7	9	f
6cb8a456-21d5-4042-8be2-e17f1d2c51f6	cfea9e73-0c9f-433f-909a-a088c3931b8f	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	8	9	f
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
61f4398c-e59f-4c6d-b73d-12e1eee54595	b8bc48bb-2b86-415c-837f-dbad58dd3e2d	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	\N	9	f
a8b74168-e253-486a-88ce-4003fd477613	7b55eeb0-4468-4696-b2fd-a50a7e058ec5	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	8	8	f
55497031-8423-451c-954f-1ddaf165a321	d04c2d81-ce92-4221-990a-64c5e1142ee9	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	\N	9	f
d4580ce1-ec95-4060-8ead-509297c48aaf	7c413b7f-9005-43a9-9b44-1984a23ae65f	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	9	9	f
c72a0d8a-ed81-4784-8995-e7cc398f4bc4	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	8	\N	f
8c519028-2f97-4200-a578-72c309ee19da	e25eac4b-ed6a-433b-b311-c27ea3f1faa4	\N	321aacd4-f6e1-40f9-b5ab-ed36d65f0323	t	9	9	f
2dd0f322-656d-472b-938f-9c855a4831df	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	9	\N	f
0f3a0410-3964-4495-b17e-cd329182a492	148a28ac-012b-44c4-b684-87a00ace9c72	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	9	\N	f
c316c4e3-71bf-4f08-8486-ef92aaac2c59	a639981f-4bf0-4871-b264-00ad02a9a286	Olet todella taitava palloilussa!	7b64a526-c49e-409e-9df0-af1f507313b5	t	\N	\N	f
0b701cfc-aad8-44c6-8009-1ed469d860fb	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	9	\N	f
21ecbab8-eebd-464a-96eb-e577e460a40a	bde08c48-5140-47eb-b28b-ce5c86ea8f46	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	8	7	f
117ac122-e4ad-475e-8d06-5a6fbf7c5431	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	9	8	f
5751cd03-092f-4acf-a080-251e11df13f0	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	7b64a526-c49e-409e-9df0-af1f507313b5	f	\N	\N	f
5b32fc64-743e-4732-9815-4c72b039673a	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	7b64a526-c49e-409e-9df0-af1f507313b5	f	\N	\N	f
01e95d7f-623a-4577-b339-0d8b3148a979	f03779c1-9d87-439c-8d95-14e384c7d2c0	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	9	8	f
87458690-c751-4c84-91ce-c7cf214d532e	5bbc08f9-01e0-4911-9a6a-38790219ce2a	Kiinnitä huomiosi omaan toimintaa ohjeiden aikana. Taidoiltasi olet taitava.	7b64a526-c49e-409e-9df0-af1f507313b5	t	\N	8	f
23165d52-163d-4f0d-b343-94439a2cae79	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	a6253c81-d539-4022-8bf3-45c7eee9cc2d	t	8	9	f
3eba6599-82b2-4f55-acb6-5c0cf576c91a	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	a6253c81-d539-4022-8bf3-45c7eee9cc2d	t	8	9	f
427f9894-ae72-473a-9344-0487e1be3779	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	a6253c81-d539-4022-8bf3-45c7eee9cc2d	t	8	7	f
5e8de9a7-508e-4040-b24b-4e1f8510a1d9	25ba77b8-721c-4c32-b5c6-97ea194d2958	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
bc848b43-9e93-4763-8582-60f53eef1211	8769cf20-6d36-42a5-ac40-bb9f4c9c09bb	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
9267ad2d-e86a-4eb5-bd1c-00bf43fec803	81f9f274-c50a-4b30-b0f5-15c1479b942c	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
8b9c7db7-5d1b-4e1f-8b9e-b1f5e32ddd34	b8bc48bb-2b86-415c-837f-dbad58dd3e2d	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
62c0698f-bbaf-4a4b-afbc-334c2f3266c2	cc64e9d2-eb80-4755-93f7-3711fe3d2dd0	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
3cd3e77a-c18c-4665-a049-00fd427a6205	49c4aeec-3a4e-4761-b3cf-2546381857f7	\N	94a4cc72-3f10-44c0-821c-382909222c00	f	\N	\N	f
1a4bc460-6b55-4f43-96dd-1aea8ac0a959	750d8c1e-30f2-49fc-a445-7acdb4bff78e	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	9	9	f
b4b40768-b2ec-402d-8d76-6aecdc6549b5	eac386e1-ca07-42b6-9817-50f1d1081903	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	9	\N	f
a0696576-8695-4587-af76-7d7572425017	081d3462-484c-45f4-b7df-9eef1712d829	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	\N	\N	f
fdf3a360-f10d-4961-bd52-918fadd65587	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	8	9	f
2c3011bb-e9f8-4474-84a8-a9ee2af7e23c	213addc7-6d5d-4a39-95bf-ded6afa510a6	\N	94a4cc72-3f10-44c0-821c-382909222c00	t	\N	\N	f
9c7c2a7a-501a-4857-be8a-4d2595682416	dc43f223-8b76-457a-b035-8b186320bdea	Ei tehnyt kuntosalilla tehtäviä	94a4cc72-3f10-44c0-821c-382909222c00	t	8	8	f
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
802b69fa-5c6b-4853-b1c6-11e54c294aad	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	8	\N	f
3b062605-465f-46c3-bdac-6ac953d507a4	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	8	9	f
3131c83e-959d-4ab4-8fc4-cedc7660b58a	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	9	9	f
3a79d24b-edfe-4a2d-8a67-7b666dff18a3	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	\N	\N	f
e2fbf90d-cd69-4c39-af8d-9d849e4d5ce0	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	7b64a526-c49e-409e-9df0-af1f507313b5	t	9	\N	f
b01f4f6d-c635-4da2-98f7-34ec21ea8b10	4fa0db05-161f-4165-b00c-52528866490c	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	9	7	f
0cab6a10-e4b3-4659-a626-54a3a5c7a6a8	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	8	9	f
4a3acf9b-106c-4a00-a162-c747d3b6f3ad	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	9	8	f
a8f9bba4-6933-4b6e-80ce-02b28cfcbc7b	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	9	7	f
374f2a54-2179-4e1d-905e-e9ff66fc66b5	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	7	8	f
d66ce4d9-e88f-4630-a6e5-ffbe1dbaff16	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	8	8	f
723f0cc4-7a12-4a89-96fa-f5368016d93c	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	d2ff8b16-ae97-456c-89a1-4a42be951b3c	t	8	9	f
7493f00b-d29a-41f5-94c4-9c239f5efe10	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	7488ce86-5522-45d1-bf90-c8d8604ca3ca	t	8	8	f
8dccd96f-2fcf-48c0-b7fc-80f0c767d2a5	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	9	8	f
e8f92767-ad16-4b9f-8b19-0aaebdb0ec10	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	7488ce86-5522-45d1-bf90-c8d8604ca3ca	t	9	9	f
b7268110-50c7-4e46-a377-df7f1b2b50a1	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	6	6	f
454a692c-f2bd-4618-b619-d26f17abb588	789e18c3-638d-4651-be65-ec0a1661539f	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	7	6	f
a9404b9f-1ba4-45b0-b66c-b35c96dc2e59	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	7	6	f
1b43be82-8723-4562-b52a-78aa0f6b147d	4454d03a-54da-4c2c-b931-b4b96ac0d81a	\N	c06cfc5e-69ab-4094-9271-424e0b4da95a	t	8	8	f
6c1d227b-0fa2-438b-88db-e6ac3a7c0beb	4c658b14-0fce-4ca3-ac9a-42558969e0e2	\N	c06cfc5e-69ab-4094-9271-424e0b4da95a	t	9	7	f
89ca5ee5-08b6-459e-b897-c30b84d2b0ef	7131bcea-6594-4433-be62-2dca8ffad861	\N	c06cfc5e-69ab-4094-9271-424e0b4da95a	t	7	9	f
a55f4895-089b-428f-8e75-8fe8ffccf93e	7c159017-8908-4a89-bc0b-dadcb58a2d03	\N	c06cfc5e-69ab-4094-9271-424e0b4da95a	t	\N	\N	f
04a9512a-44ef-49ab-a429-91da0591ce4c	a639981f-4bf0-4871-b264-00ad02a9a286	Toimit tänään ohjeiden vastaisesti ja karkasit sovitulta hiihtoalueelta. Keskity tulevaisuudessa siihen, ettei samanlainen käytös toistu.	fd4d4437-ad2e-42f8-bff9-7ce1b0bb819d	t	8	6	f
c192f80a-588e-442f-aec4-bfe12961d77c	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	9	\N	f
c9ba27bc-5af3-499c-8ded-428bca3c1a30	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	d555f364-a43b-4cd7-b441-36eba1399393	t	7	8	f
d84e314c-4ce7-4bd1-a2a0-cba42ebc5047	24007058-ca39-4c69-9004-c3d29b441fb3	Opettajan apuna. Omaan tasoon nähden hienoa työskentelyä!	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	\N	9	f
42b65866-aff8-41a2-a066-c5ef481952a7	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	d555f364-a43b-4cd7-b441-36eba1399393	t	8	8	f
daf46f16-cd4a-478f-8a89-1133ce85984c	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	d555f364-a43b-4cd7-b441-36eba1399393	t	9	7	f
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
633151df-7348-4859-970d-4c57f0d8a796	e9969c0d-58a3-4bcd-b301-5690b7290aa5	Tosi hyvää työskentelyä	8bba79e9-bfce-472d-8985-8d06407b4558	t	9	\N	f
b3f4f5e8-5e16-4913-b80f-59a0c4adf418	42a4fefd-c72e-4707-b0d6-14fd9bd80379	Keskeyttämistä ja päälle puhumista. Ei kaikessa mukana.	8bba79e9-bfce-472d-8985-8d06407b4558	t	7	7	f
35fee292-56a3-43c3-a9cf-49aea892bd84	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	8bba79e9-bfce-472d-8985-8d06407b4558	t	9	9	f
c5bc16f5-e3ec-48d8-b2fd-1fceab4f1307	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	8bba79e9-bfce-472d-8985-8d06407b4558	t	8	9	f
140a89d1-2eff-4197-96da-cef6862d0467	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	8bba79e9-bfce-472d-8985-8d06407b4558	t	9	\N	f
a7c43461-cee4-46a3-93ec-e28344e9ddc2	350594d5-5cd4-4033-9294-6b50102afe7d	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	f	\N	\N	f
4a6ebf34-9554-4dbf-aab5-3c5c110fb54f	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	f	\N	\N	f
9af768c9-4e44-48fb-8956-0a4972c444ce	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	f	\N	\N	f
5571ec2c-dd78-4944-a040-8b4f922372e6	b05b035e-4867-40c1-965e-f60630bfa457	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	f	\N	\N	f
22646c8c-3991-4110-a7e4-081e383254ba	720863b3-15b5-4928-b516-5a8ec0cee764	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	f	\N	\N	f
34548fda-6a9f-496d-b6bc-f61dd156c4ae	e2c637e8-f394-4a5a-926f-1f9888a7dc98	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	8	7	f
2f4d933e-c6aa-4677-9e45-66e378ceaaba	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	9	9	f
6ec04cd0-d1c3-4b48-baf2-d7c5994e7e93	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	9	9	f
74361cf9-30e6-4cf8-ac91-2526c3d58ada	67c02902-d7e2-47e1-abef-9d1ae14a3da5	Välillä vähempää osallistumista	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	8	8	f
807bea42-fafe-4209-8a52-275cd3a7b8b5	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	9	9	f
13a169ae-81b6-4d57-be8d-0352e863ff81	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	9	8	f
7b95e0f6-9c1d-4c6d-a42e-6d031cb0223e	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	9	9	f
a24e939c-27ae-4804-9303-2cb01d937ffe	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	9	8	f
3bac5dca-a5e7-46f6-9253-8ce01446a6ee	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	9	8	f
2465a7f7-7591-4f5d-83f0-d8fb087c4e9e	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	7	7	f
08910cc5-5e5e-403b-a068-94948654b8b7	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	b29e68a9-5dc8-436d-9d1c-e2dd279b8128	t	7	7	f
baaf4b8d-012c-43e9-b48f-3e6764fc8d1c	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	02b88abf-86b9-4ce1-82e8-418cefa02b40	t	8	6	f
1c368776-906b-4c06-8532-d322fb6d0bd9	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	333de8c8-9cd3-4827-ab4b-3e3c169b8ecd	t	8	9	f
8f18694b-518b-4a1d-98c1-15d0acfbdbc9	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	333de8c8-9cd3-4827-ab4b-3e3c169b8ecd	t	8	8	f
e15669a5-695b-4d28-8f09-307f261dfb9c	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	\N	f
cf17fa28-69d1-43b8-b6a7-5d7dfac8bf53	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Moim	333de8c8-9cd3-4827-ab4b-3e3c169b8ecd	t	7	8	f
fdba1ea9-e07e-4ed5-ac19-73f32966c008	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	\N	f
e4f74650-07bc-40e3-bcbf-fc11a1385f85	350594d5-5cd4-4033-9294-6b50102afe7d	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	9	f
8b50825e-ee2c-4e52-8335-63cc3339caee	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	\N	f
b7b08c3a-ea08-4697-87f9-b727c97af6b4	24007058-ca39-4c69-9004-c3d29b441fb3	Kielenkäyttö ja kommentointi yhteisessä työskentelyssä.	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	8	f
f680fd43-ebad-4403-b9e4-b954d3a0c2d3	4cdb20f7-d8a7-480c-9379-bbe14d95d933	\N	f92aeb42-9586-4da3-8818-eed3150f288b	f	\N	\N	f
89334fb6-f7ca-43a1-9fcd-a30e673c10b0	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	9	8	f
fb7da3c6-ad21-476b-a452-61cccf97b3aa	16149225-d420-4254-88de-36f235415650	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	8	8	f
217a62f7-531a-4f9f-a9eb-3bddf7f6e53f	7af2670e-d622-44de-9458-0e3490224f19	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	9	8	f
932f89c1-56b6-49d5-a5f7-81c8018c3012	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	8	8	f
2bd086b0-1f5d-4f6b-8d27-94b629ba9896	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	8	9	f
a8cee365-9df1-4968-8e67-814d40188c2c	eb96e883-bf2d-4482-b8c9-6d272ee35354	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	9	8	f
449781e8-6fe1-441d-937e-5568850ae907	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	8	9	f
0fc1ebba-80e9-49f3-96be-68881e4c83d2	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	9	9	f
e6e17e4e-8a0d-4f3b-bfbc-95ca82f3d268	898eaa06-334f-4446-98b3-2368ad2b6cef	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	8	9	f
660dba40-539e-4624-ab2f-d392684d8d23	052654dc-bfba-4092-85d4-6894c908f9b1	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	9	8	f
d6daa5c8-a930-4b8e-afab-965212b8f9f3	a9823635-cc6a-4026-ad85-423287d7ec49	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	9	9	f
52e4fccb-62bc-4c6b-85db-b1463e65d403	b015f02b-0e21-4f21-93d4-8497311b6490	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	9	9	f
e434f288-b4e4-449a-8074-3069936fe498	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	8	9	f
84468a7a-a549-48be-8948-13a22b38a84e	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	f92aeb42-9586-4da3-8818-eed3150f288b	t	9	9	f
27247149-932a-4ac1-a293-89eecb0b8544	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	f	\N	\N	f
24c32bfd-a73d-4623-9200-3ba12f38c78f	e2c637e8-f394-4a5a-926f-1f9888a7dc98	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	8	8	f
eed8b3b3-c18f-4394-ad2d-162dd87db9e3	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	8	8	f
f40e588b-a9b1-4c54-b5e5-d6bc59cac322	b05b035e-4867-40c1-965e-f60630bfa457	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	7	8	f
42826b37-37f1-437c-a7ae-ea4cf99c5a56	24007058-ca39-4c69-9004-c3d29b441fb3	Alussa vaikeuksia, loppua kohden tsemppaus	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	8	7	f
f429765c-3d4e-423b-b8cf-7dcaaebe68db	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	9	8	f
be243867-4bf6-4c74-b4b8-82d9b813e42d	b43981e9-6f50-4908-b225-1f5d5a70c68e	Paljon kiroilua	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	9	8	f
715fc691-0a0e-423e-8b63-dc010dfd79a5	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	9	8	f
5391beb9-baa4-45de-ad9d-af0c1bbcd0ec	350594d5-5cd4-4033-9294-6b50102afe7d	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	8	8	f
46266ac6-9d2e-4b05-b63b-b149c5e37733	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	9	9	f
90140eec-7c61-4420-98fc-2b9d2a8584d9	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	9	8	f
fadc0a7d-2325-44ea-8409-d99d394568ae	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	8	8	f
5be8a4d8-54ea-4bec-b4af-4da5c42c09e5	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	8	8	f
f224002b-ecde-4aa2-9024-c5830433e1b2	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	8	9	f
31042050-414c-4be8-aa4a-551a64564a27	720863b3-15b5-4928-b516-5a8ec0cee764	Tunnollista tekemistä!	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	9	9	f
b2578f88-8998-4395-8a31-86151501667c	af758be6-0adc-4e32-8543-f65f6c48fd2b	Ei tiennyt missä piti olla	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	\N	\N	f
eb0d25fa-9e68-46b1-b8c3-490e5bdd62a3	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	Alun peleissä jättäyti pois	0fc921ea-f723-4134-8f6d-6fdae9d7be79	t	8	8	f
6e0078bd-04e6-43b7-b062-6174bb085425	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	0c53145f-5fd0-441d-b345-a189164a3301	f	\N	\N	f
3d9f24c4-ae50-44b5-9711-fb8bbf234a32	e9969c0d-58a3-4bcd-b301-5690b7290aa5	Kävelyllä. Rankka päivä ollut.	0c53145f-5fd0-441d-b345-a189164a3301	t	\N	\N	f
ba35000c-47c7-48c5-8887-9fefce5e45a6	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	9	9	f
a41bc3cc-81ac-4f76-b04e-0ba56ef3ccfc	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	8	9	f
cc4b8389-699d-4427-bedc-391ffaea5133	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	8	9	f
f3d2a893-78d1-4033-8a88-1c7eb2a67868	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	9	9	f
0cf1dd92-cb8b-4377-b3b9-77a2ba389e12	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	8	9	f
de62497e-950e-4595-9468-27ab3a9f56ab	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	8	8	f
2af07d90-00fc-43ad-bf84-f3f4876d9ac2	8fa5f694-d7a7-49c2-98a2-e1aecdc80d3e	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
c8cc8ef3-1934-4411-b863-d1d46982b297	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	f	\N	\N	f
5e97fe59-2115-4794-8ce3-37558fcb27ae	00179acc-3d3c-496f-98db-fb88756116f4	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
cab7327f-e7db-49d6-ada0-b5f4a3391cce	45cedf94-714b-404a-8ad5-db42f55919eb	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
9615791e-0b53-4a42-8db6-6d831ecafbe1	1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
6752b391-2a9a-489e-a51a-a8fad80d1f93	abd4148b-b530-4440-b643-34d08a4bb811	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
c4547130-f8d3-4752-a1a6-4983ebff5d7c	e47d29de-6a02-4e63-a52a-964fc17b744e	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	9	8	f
bf96ff00-77b9-4680-aefc-fb892f36cfc3	f9c6b20c-e57c-4e70-9f32-dedd975aab01	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	9	9	f
01ca35e0-a3c0-49e5-9993-18336203277b	69fec935-4bcd-43ab-9737-a524627dbe1e	Salilla ok, pelailu ei kiinnostanut	48198bbc-377e-4f03-bf33-307f2edeb01d	t	7	8	f
8dab645b-5af7-4b9b-99a0-9667a554b89f	404347be-f571-4254-b055-a06e9a9962f9	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	8	8	f
0631e069-f585-464a-bf69-b59d1403c88e	686241e9-7a4e-4eb6-bc99-26699999001b	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	8	8	f
9dd69885-fe94-473d-8d84-5f169b5e55d3	2e03b196-3248-4f14-9f2d-4661e503665d	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	8	7	f
3d1c0387-40c1-4a41-bbd9-30523f753dad	b9266745-39ba-4be3-b1a1-421801b79832	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	8	8	f
394e909d-6cb4-4890-a917-c7bbd0a7fcc4	799b59e5-c962-4f19-9f9d-01518c57a550	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	9	9	f
299bb8e4-e338-4868-92a5-7f0b04eceec9	74e88236-472e-41ea-9475-73c94489ae2e	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	8	8	f
4c4f08da-51f5-45d9-9899-256cc209bcf6	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	8	7	f
8483985c-2b3f-4f16-84c2-527fbaf216ee	2209c4b3-b0d6-4858-9fa0-74c9b589442c	Parempi työskentely viime tuntiin verrattuna	0c53145f-5fd0-441d-b345-a189164a3301	t	8	8	f
0e57839b-3d7b-4822-8de2-40e0b81c6995	4943ad21-7f08-4b45-8d6c-7cccbfb05562	Kävelyllä.	0c53145f-5fd0-441d-b345-a189164a3301	t	\N	\N	f
8d8ac0e0-7d68-4c82-bcd3-320201ee47ad	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	0c53145f-5fd0-441d-b345-a189164a3301	t	9	9	f
4a44d269-fb3a-4a73-b48a-790aa4e28be8	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	9	8	f
b7d6d17b-e519-4d42-a325-8b33244f9575	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	\N	9	f
9a286e4d-2a45-43ee-9f1a-bf61f3d049aa	74e88236-472e-41ea-9475-73c94489ae2e	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	\N	\N	f
96babfbf-943a-4078-9e74-a7a10e035a78	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	Huippu hyvä tunti.	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	\N	\N	f
77d00bad-1f3c-4785-b5a6-e373bc3a5f0e	e2c637e8-f394-4a5a-926f-1f9888a7dc98	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	f	\N	\N	f
04b2d917-e797-47fc-8661-4d31d6e2dd3c	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	f	\N	\N	f
4c3bd6e8-f6c9-4430-a76b-146a106ab764	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	f	\N	\N	f
ac500315-5f86-4134-8790-c044cea0d5e5	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	9	f
719ff4d3-09f3-4dff-a6a4-b5cfeb61370f	d07f9606-ddee-4f35-8d35-b8358dc9fc75	Kepeillä mukana seuraamassa ja ohjaamassa	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	9	f
6313f20b-01f2-459f-8daf-fa141042bbb2	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	\N	f
679eb129-ac95-4d9d-8118-80a129812567	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	\N	f
5a690a3e-3235-4353-9efd-1a0afb06df1e	b05b035e-4867-40c1-965e-f60630bfa457	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	9	f
6a877b96-21bc-4b6b-843f-b9750b996ec4	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	9	f
40884d95-4e41-411f-b8ac-09f046aa6d02	2a397255-ca16-43dc-b47e-a977a917f032	\N	8d478ae5-8238-4ee2-9731-b04edb5026c6	t	10	10	f
1ca8e60b-ef1a-412b-b057-f889ffe38637	af758be6-0adc-4e32-8543-f65f6c48fd2b	Lähimmän puun taakse piiloon. Paljon kännykällä olemista.	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	8	f
03f039d3-1116-4154-835a-5f2ed79b6d85	720863b3-15b5-4928-b516-5a8ec0cee764	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	\N	f
a488a4f4-b3c4-4d99-8af0-9e27d95456cd	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	37cc680b-7525-48d5-8e86-2a2d35081c8b	t	\N	9	f
dc8ca885-e02c-4e34-ac66-4f2a5a3f1001	799b59e5-c962-4f19-9f9d-01518c57a550	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	\N	f
398abafb-54ae-40c9-afe1-fb50e5780f90	74e88236-472e-41ea-9475-73c94489ae2e	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	9	f
0fd8a187-6219-45fa-8239-df5a2bac5ce2	4a3f375e-f8ce-46f9-8b9a-4587d069d036	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
dc4f2b1a-9d48-4892-9bb7-1a4f323b96a6	0e963947-3dcf-4f30-b316-ac9d07d81b0b	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
5208a9d8-28e5-4f52-986d-8333cf7b3c9c	8fa5f694-d7a7-49c2-98a2-e1aecdc80d3e	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
51d1909f-3f26-4145-a0c9-f8ede538cb56	63f57cea-4036-4e38-9d84-3c36f99124ef	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
a90fa10a-eb6a-4ee1-9a36-44dfd77cfb4c	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
540b4825-aa4c-48f5-946b-a0ae14ba121a	1461587b-fedd-4cb1-a122-58dd9ddc3fd9	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
a1ffab58-3ab4-47c1-970e-41a72e3d1e36	00179acc-3d3c-496f-98db-fb88756116f4	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
879a26a5-d3c1-486c-a829-7ed625b57e05	fb78d640-ca97-407e-9d2b-6390b8a2c77d	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	f	\N	\N	f
963389f8-47fb-4dc7-8caa-869a57a1be26	1f770536-fee1-4ca2-9622-ed816628c9b7	Mukana pelaamisessa koko tunnin. Rauhallista työskentelyä.	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	9	\N	f
1040c4f4-6c6c-4e16-81f5-5c55c4e88f5a	f9c6b20c-e57c-4e70-9f32-dedd975aab01	Aktiivista työskentelyä ja hyvää joukkuepelaamista.	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	\N	\N	f
dcde8dfa-93f0-4812-a57d-2b5c4e9b7d8d	91a00bae-00db-464f-8376-591e16a5a811	Aktiivista työskentelyä ja hyvää joukkuepelaamista.	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	9	\N	f
63ecda7f-0492-4269-8928-25a4c71d70cb	b1ef84a7-2238-4946-bd2d-97aae138bbad	Taitavaa asettumista kentälle. Hyviä syöttöjä ja pelin rauhoittamista.	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	\N	\N	f
7b42d58c-06af-4bb7-8478-8512edf3f0a2	1556394a-6336-4838-8943-19088ecdf5e0	Mukana pelaamisessa koko tunnin. Rauhallista työskentelyä.	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	9	\N	f
70742332-c9e2-44bc-b383-0b2f7089e318	3e62f535-90a9-4a75-9748-27ea0d491a54	\N	556550db-3be0-49ed-b3b3-f4f0dfcf8ba2	t	8	\N	f
949b4929-8dd6-4f75-ab82-a09726b48a92	b25c03f9-3bec-48f9-a045-c78745703bf7	\N	8d478ae5-8238-4ee2-9731-b04edb5026c6	t	7	7	f
f311e00d-4672-4895-84d8-a67e8512ff39	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	cbfca445-6768-4260-a592-d182c295da43	t	\N	\N	f
00799473-9865-4661-a08b-c4fc0cdfeaa3	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti pelasi tennistä hyvällä asenteella ja nautti ulkokentällä pelaamisesta. Hän auttoi muita pelaajia ja piti hauskaa.	48b97ca2-cc28-4f63-a14b-26fb8422ff2f	t	\N	\N	f
427dc4ec-d201-4ba7-b301-7ba1c58cd09f	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa teki kuntoiluharjoituksia puistossa, mutta keskittyminen herpaantui ajoittain. Hän suoritti liikkeet oikein, mutta olisi voinut olla tarkkaavaisempi.	a8c5e1fb-bb1a-4811-9b48-6faa29f4f619	t	8	7	t
8e09b832-d52b-4767-a3a1-5abb098a97a3	de28725b-ccaf-45e6-b808-aeeba3fa151e	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
9573773e-8b7b-4ae5-8db3-d562f525a9a5	4a3f375e-f8ce-46f9-8b9a-4587d069d036	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
50a25293-c6ce-4262-9d78-a7aac30001df	3723e655-2484-4055-8570-13ee693d5a1a	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
5521e187-ae9f-4f1b-9b66-f775b20841c2	ad671202-0d1b-4b31-a2fc-9fa9032f3b33	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	f	\N	\N	f
a6dc5008-c573-4074-82f4-a19d64fbc364	fb78d640-ca97-407e-9d2b-6390b8a2c77d	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	8	9	f
3e665651-a160-4c06-b1ae-c803383818b6	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	9	8	f
e98518c9-7ded-4604-8467-6afc97eec3d0	91a00bae-00db-464f-8376-591e16a5a811	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	9	8	f
1cab9e0b-d4d6-45a4-bc6a-526e14a07182	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	9	9	f
f0e9a05f-8d8b-42c9-a9a8-b615356840f5	1556394a-6336-4838-8943-19088ecdf5e0	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	8	9	f
05a63977-5acd-419a-9d6e-e44a1285c95e	0e963947-3dcf-4f30-b316-ac9d07d81b0b	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	9	9	f
5a256359-a3a1-4d94-b3d2-f4b81cbec476	b1ef84a7-2238-4946-bd2d-97aae138bbad	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	9	9	f
30529f7d-12ea-431e-9e4c-030531d8fa80	f4eb73ad-9a1f-4b7b-8899-b2a07ff4db2d	Salilla ok, pelailu ei kiinnostanut	48198bbc-377e-4f03-bf33-307f2edeb01d	t	7	8	f
94891d84-57bc-4e1f-88a2-e509ceaf8496	1461587b-fedd-4cb1-a122-58dd9ddc3fd9	Ei paikalla	48198bbc-377e-4f03-bf33-307f2edeb01d	t	\N	\N	f
9e0c19e1-ef94-48f6-8c70-1ec42b25e006	1f770536-fee1-4ca2-9622-ed816628c9b7	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	8	9	f
86f52dbb-cd20-4d6c-9fa5-1b283aff4c81	63f57cea-4036-4e38-9d84-3c36f99124ef	Salilla ok, pelailu ei kiinnostanut	48198bbc-377e-4f03-bf33-307f2edeb01d	t	7	8	f
7ccf33be-e85f-4b4d-b95c-67425a897482	3e62f535-90a9-4a75-9748-27ea0d491a54	\N	48198bbc-377e-4f03-bf33-307f2edeb01d	t	8	8	f
642b50d2-4423-486e-9961-fa43ad185e5e	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	Passiivista pelaamista, salilla ok.	48198bbc-377e-4f03-bf33-307f2edeb01d	t	8	8	f
752ea82a-2aed-4e34-b793-54c811eb3d65	aa420673-c8ba-41da-9ee4-061022bb4a51	Taitavaa pelaamista.	48198bbc-377e-4f03-bf33-307f2edeb01d	t	9	8	f
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
c6a72e86-955a-492b-990c-3f0526269a26	081d3462-484c-45f4-b7df-9eef1712d829	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	t	\N	\N	f
af97234c-ebcb-4b59-a736-7132ffcf3867	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	t	9	\N	f
376ee629-5154-4ae6-b57d-9b3fea13fbaf	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	t	8	7	f
d442856d-6fc8-4d4e-aa17-af25a575c9c4	213addc7-6d5d-4a39-95bf-ded6afa510a6	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	t	\N	\N	f
b7f613ac-5163-4f7f-b886-850d588fd65e	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	\N	\N	f
35d8f975-058f-4b11-bdc3-1016e3b7dcb1	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	9	9	f
8a9362c8-ce01-4adf-aec6-39ebf731937a	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	9	9	f
d8f8f6a1-73d2-4c90-8fcb-e6d7c0ae9bc9	404347be-f571-4254-b055-a06e9a9962f9	Työskentelyssä parannettavaa. Paljon seisoskelua ja keskustelemista kavereiden kanssa.	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	8	8	f
c71a6d15-855a-4241-a2dd-e0661472b9b7	686241e9-7a4e-4eb6-bc99-26699999001b	Työskentely oli todella hyvää. 	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	8	9	f
ef271caa-d836-42d1-bfc5-1e5a559d51d7	b9266745-39ba-4be3-b1a1-421801b79832	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	9	8	f
02823ef1-7419-4fc6-9604-3ce2fa05dd66	eac386e1-ca07-42b6-9817-50f1d1081903	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
54823b77-f208-442e-a603-72469f419454	0d39a916-dd79-4bc8-b493-771b456ed8ce	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
1b8720bc-35e6-4496-a946-a7e6fbea7026	e25eac4b-ed6a-433b-b311-c27ea3f1faa4	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
4fee605e-efb4-43c4-8fd1-5854cbd1f259	4b6cfdbe-4ea5-4ff4-b187-77b13c55f894	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
90f5eb91-bed1-4979-806d-e8880ac9ca47	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
9160b8a4-a3fb-4500-bf37-c915fced5b7e	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	\N	c1740f10-c2df-470a-a4b0-547fb0ce7ae4	f	\N	\N	f
188873e6-c3b0-4f0d-92c1-8ea0a85716fd	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	b1c2442f-23fc-4571-9701-2c795143537d	t	8	8	f
4987fbaf-3b79-48d5-918a-80f17822dd33	d989226b-aa7a-4dd9-a34c-6bf06ae4a429	\N	8d478ae5-8238-4ee2-9731-b04edb5026c6	t	6	8	f
465e0ede-e908-46e2-b7e2-30dde332541a	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	10c08368-0fd8-4687-8ed7-a7a4f34d7776	t	\N	\N	f
16aa6358-8c59-4175-8e21-d5745ba09fe4	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Joo mestari kettu kyllä se ihan toimii mutta joo on se sitten vähän myös jännä joo	10c08368-0fd8-4687-8ed7-a7a4f34d7776	t	8	9	f
5265cb05-d2a2-4700-b7ad-4bf3c67942f9	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	10c08368-0fd8-4687-8ed7-a7a4f34d7776	t	\N	\N	f
81bab849-c1f2-4fb0-ab8f-e76b99ecae2e	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	e24d79d5-8e15-46b5-951d-f811b7670023	f	\N	\N	f
4742e0c2-16a0-4bfe-a340-470298e9f061	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	e24d79d5-8e15-46b5-951d-f811b7670023	t	\N	\N	f
2fbb5289-3fa3-42a2-a1b0-b27c776ec32b	f925429c-08cc-4cba-b5d4-d63ccf818c49	tässä mikaelille vähän huomioita	e24d79d5-8e15-46b5-951d-f811b7670023	t	8	9	f
48d339ba-bfea-47eb-a3be-32554521d434	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	6ac64022-5671-4409-80a3-99a1dd020cfa	f	\N	\N	f
517f3c42-817a-4994-a18f-393e33785ff1	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	tässä taas mestari ketulle vähän huomioita	6ac64022-5671-4409-80a3-99a1dd020cfa	t	7	8	f
94807fa1-6257-4fdf-877f-15e1a1c85d66	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	6ac64022-5671-4409-80a3-99a1dd020cfa	t	\N	\N	f
df7fa6cf-a079-4a66-aa84-4f304f5fcc01	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Moi	1e597269-f460-4a88-9702-2d4f420c0f00	t	7	8	f
9d373b42-4474-43c5-9f49-85412a4326cf	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	1e597269-f460-4a88-9702-2d4f420c0f00	t	7	8	f
2639c769-c1a9-4e64-b0a9-cf7ba9d798f4	2eceab39-5d0a-4201-a275-17a1bed011a6	Huomioitajoo	1e597269-f460-4a88-9702-2d4f420c0f00	t	7	8	f
641a00bf-9617-46a3-8908-3a8ea841c36d	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	10ba2787-61e0-4785-8dee-4a8a99414520	t	\N	\N	f
eecae85d-212a-4d88-a1df-d6768def2f61	f925429c-08cc-4cba-b5d4-d63ccf818c49	Moi Moi tässä mikaelille huomioita	10ba2787-61e0-4785-8dee-4a8a99414520	t	7	8	f
6ddb445b-a144-4104-9194-bd93a791410b	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	10ba2787-61e0-4785-8dee-4a8a99414520	t	\N	\N	f
95a194d0-6a94-4566-b1aa-76fcae36e3b1	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	Moimoi	49f4d3a8-22b6-4f9f-bb7b-17d5d7b4c422	t	8	8	f
6aa9f912-e1a1-4a36-bac8-22ee6b256189	f925429c-08cc-4cba-b5d4-d63ccf818c49	Jeejee	49f4d3a8-22b6-4f9f-bb7b-17d5d7b4c422	t	7	8	f
f85f2755-3c1d-4f19-8881-7e14f3119b55	2eceab39-5d0a-4201-a275-17a1bed011a6	Terve	49f4d3a8-22b6-4f9f-bb7b-17d5d7b4c422	t	7	8	f
564212a2-7e92-48b8-8b16-6e854d013143	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	abe03f46-f878-4284-84e4-de5857f87209	t	7	8	f
a4f52405-448d-4d5a-aebb-dce79e549662	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	abe03f46-f878-4284-84e4-de5857f87209	t	8	9	f
8ac9d213-7d77-482f-aea9-75d612e04f50	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	abe03f46-f878-4284-84e4-de5857f87209	t	7	8	f
f96b6bec-ab7b-41ec-95d9-2e2c29ed7d32	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	16ebda74-3df2-4ee7-82e2-87d7ece3ac1e	t	\N	\N	f
a4efded8-a43e-4c3f-b1e3-e99c19194489	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	16ebda74-3df2-4ee7-82e2-87d7ece3ac1e	t	\N	\N	f
163d61e8-71f0-4af2-ac65-f8b0e6721760	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	16ebda74-3df2-4ee7-82e2-87d7ece3ac1e	t	\N	\N	f
d5cea77d-d4e7-4bbb-80ea-330a3689162b	9f715b18-4cd7-48ac-b927-f43f7c166538	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	8	8	f
9dd3934e-3c8f-4028-9489-1cfc4b145634	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	f3a6d9a9-1c87-4706-9cd3-47eb2c994fb4	t	\N	\N	f
3f0534f3-32f4-4c96-abb0-3d1871ff3689	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	a5bc849c-03ec-40d3-9abd-4b68b93bcc7b	t	\N	\N	f
12396dbd-0f8d-4b4e-b2be-225827f9a655	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	a5bc849c-03ec-40d3-9abd-4b68b93bcc7b	t	\N	\N	f
0de6eb77-604c-400d-837b-716569e5dd45	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	a5bc849c-03ec-40d3-9abd-4b68b93bcc7b	t	\N	\N	f
31976e37-c3ce-4013-9b5e-4339195d5dab	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	6d4d0b46-d8e4-434c-b242-675b378da3fb	t	7	8	f
b3356358-78d8-4626-824f-63eb56235769	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	6d4d0b46-d8e4-434c-b242-675b378da3fb	t	8	9	f
23e325d7-06b7-4036-82ad-4202d257c86b	f925429c-08cc-4cba-b5d4-d63ccf818c49	Mikael pelasi tänään hienosti!	6d4d0b46-d8e4-434c-b242-675b378da3fb	t	8	7	f
b44b65e9-c901-45ee-adf7-c1b0afb51283	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	f	\N	\N	f
e7f3587d-3b7f-4507-8ecf-387e6752de51	789e18c3-638d-4651-be65-ec0a1661539f	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
ef1c24b8-7ea7-42b6-af22-e6d1b808294a	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
c93ac144-5043-46da-b73b-75c5c63b5984	4fa0db05-161f-4165-b00c-52528866490c	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	8	f
08d0507a-8849-45bd-8ea7-9c12c51afe33	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	9	9	f
617dd586-52d2-4ef5-8bab-e27886ba05c5	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	f	\N	\N	f
33e5b5ab-2b03-4fd6-8a7a-1ce69429e07e	2209c4b3-b0d6-4858-9fa0-74c9b589442c	Vaikeuksia ottaa osaa täysillä peliin	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	8	8	f
7d762143-7928-4395-89f5-823ad6783e00	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	f	\N	\N	f
f08b8d71-2174-4feb-81c2-be0073949b1f	8cc39180-992f-41be-88d7-d798fc88abe0	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	f	\N	\N	f
203b9a71-e681-4e1c-99ab-1fb173975a2e	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	f	\N	\N	f
7fa26c28-ecdd-4cb8-b0af-073c646dc511	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	9	f
422e9738-387f-4c97-b37a-fe3e1a8b16fc	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
0b40f8c8-e80b-438e-9305-4916c5273fd5	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
29886415-1a2e-4c91-96fb-eabd1156b0da	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
fae99c8c-0952-4f44-a4d5-475f376bb850	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
8b81c056-eac5-4eee-94a1-708bf5785d40	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
6b983fc8-64ac-4d11-901b-045484c38cd3	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
bb069fb8-c407-4db4-a4b8-d4182af5e837	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
9f545cf8-4884-4eb2-8709-eccf6967deb0	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
259610f1-f1c9-47bc-a6df-df0b7a753032	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	8	9	f
aaff965d-628e-44fd-8d12-df94a78c223c	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
40d39d4e-6bd5-45b7-853b-69654827ce48	a6eb654d-12a2-4350-a687-128314062791	\N	20e39e40-87d9-4273-aaee-44fe27eb45a9	t	\N	\N	f
0a2b6151-6645-4449-83b2-5fce6d222fe9	545958d4-a061-46c0-a58b-e814f2864886	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	f	\N	\N	f
6cff06aa-b8fa-42a5-9878-7d3e9022d0d5	671ee4af-e36d-437d-b3ec-bee0179c96c4	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	f	\N	\N	f
55d258dc-75c1-4739-9624-982d1c23cab4	f2cd6a55-4291-4848-a66e-36d096f181c4	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	f	\N	\N	f
6ee321c0-e33c-444a-9725-921c00aca788	d9dd649b-f9bf-4670-84ea-a102fc16cfcc	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	f	\N	\N	f
1e7b0b53-bd73-4c4f-abc6-1e93ba35484b	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	9	\N	f
5165a8d4-9933-47b3-b99f-7fcbe9df7632	2e03b196-3248-4f14-9f2d-4661e503665d	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	9	8	f
60f7a12c-de58-4f08-afac-a71890cf8be1	b05b035e-4867-40c1-965e-f60630bfa457	\N	619a1d3f-2b7d-4283-9a93-16c2562b6cea	f	\N	\N	f
6806cefb-76be-4863-9f6f-4a660c520fa3	24007058-ca39-4c69-9004-c3d29b441fb3	\N	619a1d3f-2b7d-4283-9a93-16c2562b6cea	f	\N	\N	f
e07f3bc9-7c51-4aaa-96ba-030e2574cde9	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Työskentely normaalia parempaa!	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	8	8	f
68c73c8d-9876-4230-b2fc-47265883b555	67c02902-d7e2-47e1-abef-9d1ae14a3da5	Hienoa työskentelyä ja tekemistä!	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	9	9	f
cb446e5f-640f-433b-b1ba-5edaa23fb394	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	9	8	f
8b13572a-c5cf-4d89-b675-bb927360a8c7	b43981e9-6f50-4908-b225-1f5d5a70c68e	Alussa vaikeuksia saada työskentelyä käyntiin	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	9	8	f
2effea97-327a-4025-a27c-e049df14d1f0	799b59e5-c962-4f19-9f9d-01518c57a550	\N	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	\N	9	f
d1d7ec18-6b18-42be-b68a-fd045ec6bea4	4943ad21-7f08-4b45-8d6c-7cccbfb05562	Väsyneenä tunnilla. Ei osallistunut pelaamiseen.	937afab0-904e-4b0d-9c33-bf69db8b4e78	t	7	7	f
541b5dda-ebaa-4cfb-b5d8-8529c528acc1	d6b3db8b-50e7-4a6c-8ed2-2247a659a3a9	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	9	8	f
d9aecc7a-634e-4afe-898d-830e0785bae5	42a4fefd-c72e-4707-b0d6-14fd9bd80379	Sinnikästä työskentelyä, vaikka joutui olemaan hippana.	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	9	f
5337e64f-a20c-4b10-b0a8-b87942d2121d	046a3d24-b93f-44d1-ae1b-aa628e141bae	Paljon turhautumista, mutta mukana työskentelyssä.	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	9	f
0676d630-7f70-44f4-a1d1-7f5137c62999	2e03b196-3248-4f14-9f2d-4661e503665d	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	9	f
9ff20165-ef7f-46c5-bfaa-0e7d31c4c59d	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	619a1d3f-2b7d-4283-9a93-16c2562b6cea	f	\N	\N	f
1b0bdfa3-6c16-497b-9b27-014716d7f7d9	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	619a1d3f-2b7d-4283-9a93-16c2562b6cea	f	\N	\N	f
d78d863d-3fb5-485b-b6f5-0617ae1dd423	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	619a1d3f-2b7d-4283-9a93-16c2562b6cea	f	\N	\N	f
4a2e9f6a-001f-496a-8de3-ae5bf947552b	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	Hyvä tunti!	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	9	8	f
5fcdd419-dd72-470b-abb0-9cae08df04f5	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	Hienosti mukana	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	9	9	f
606aeb13-9543-4321-909e-b026e4efa8e1	350594d5-5cd4-4033-9294-6b50102afe7d	Tänään oivallista työskentelyä!	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	8	9	f
0668dd6b-66a2-4760-bba2-7a5e4a8af3c4	9bdfa82d-13bd-40be-9a9b-a57c2a072351	Alussa vaikeuksia saada työskentelyä käyntiin.	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	9	8	f
952e1dd7-7132-48cb-8094-3abb21aaed4c	c0011bcd-6952-4d60-a01b-3b455c7eea4c		619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	8	8	f
35de4bd6-1e18-4f19-86e0-7ed0fb7c7df6	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	Tänään vähän väsymystä. Alussa vaikeuksia saada työskentelyä käyntiin. Hienosti sanoitettu päivän kunto.	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	9	8	f
5b6d90f6-4b34-46e9-b7dd-7293087d94f4	5fd1effd-1670-4a40-bfaf-75a2a048fc91	Jälleen kerran tunnollista työskentelyä!	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	9	9	f
ecb1c5a5-ff14-4955-af68-d8fea64ae7ed	720863b3-15b5-4928-b516-5a8ec0cee764	\N	619a1d3f-2b7d-4283-9a93-16c2562b6cea	t	9	9	f
afe5fb42-aab0-421d-a45b-4abd80bd1dd8	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	1eda1df4-9725-42f3-9b25-555230def13e	f	\N	\N	f
9a3a67b6-fd25-4aa1-9499-fcf44a3b912d	a9823635-cc6a-4026-ad85-423287d7ec49	\N	1eda1df4-9725-42f3-9b25-555230def13e	f	\N	\N	f
53748025-7a2b-4c5f-8ef8-a55b3c3ab18d	4cdb20f7-d8a7-480c-9379-bbe14d95d933	\N	1eda1df4-9725-42f3-9b25-555230def13e	f	\N	\N	f
ce6e35dc-6c8c-4f96-83ef-a2a792fb0dee	16149225-d420-4254-88de-36f235415650	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	8	\N	f
72ff62d7-3c67-46fd-b4ee-a5e27aa281e4	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	9	9	f
e96e3ba8-b88c-4ed7-bee6-7a8e78604a86	7af2670e-d622-44de-9458-0e3490224f19	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	9	9	f
2494f1a9-8879-4940-a23e-0dc1be1444e2	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	9	\N	f
6afb2e90-bbfe-40d1-ae8a-4272579e94ed	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	8	\N	f
36e5b1a8-3d8c-4126-95c0-d1b6b1c2ca83	eb96e883-bf2d-4482-b8c9-6d272ee35354	Loistavaa!	1eda1df4-9725-42f3-9b25-555230def13e	t	9	\N	f
798055ae-f5da-4404-9667-a15f20b02519	5f2d8cba-c89d-4dee-b204-911a7f658599	Auttoi opea ja ryhmää tunnilla!	1eda1df4-9725-42f3-9b25-555230def13e	t	9	\N	f
4ac1d33e-7e62-4151-9d17-d8ee916ac09c	898eaa06-334f-4446-98b3-2368ad2b6cef	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	8	\N	f
a9630a95-7171-4082-be32-e3b610d66c7a	052654dc-bfba-4092-85d4-6894c908f9b1	Hienosti pelasi ei-parhaiden kamujen kanssa!	1eda1df4-9725-42f3-9b25-555230def13e	t	9	\N	f
39352be0-648d-4514-ad88-a6c587d69208	b015f02b-0e21-4f21-93d4-8497311b6490	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	9	9	f
c36c87be-3a2e-4e64-afa7-06101da9fd31	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	8	\N	f
2c6c585c-5ce9-4683-9d3b-f5c5eb185454	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	1eda1df4-9725-42f3-9b25-555230def13e	t	8	\N	f
e20d3549-1aa6-4ee8-9ce3-5479cda8c130	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	f	\N	\N	f
72705a15-a0fa-41ea-8cad-a016706cac4b	b05b035e-4867-40c1-965e-f60630bfa457	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	8	8	f
c2dec119-a89a-4a74-b7d0-566e0407078a	e2c637e8-f394-4a5a-926f-1f9888a7dc98	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	8	8	f
2e2f291d-ca04-48d5-a63e-b5a2f10ba8e6	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	9	9	f
5b2438ef-58a5-48fa-ba48-15abcc46cf78	24007058-ca39-4c69-9004-c3d29b441fb3	Vaikeuksia tehdä kaikkien kanssa hommia.	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	8	8	f
d724ddb2-e09b-4076-a594-fbe7460c4ea4	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	9	9	f
5eaa4171-b4bd-4c40-9e2a-89bea238e9cf	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	9	8	f
e5d0569a-6dc4-4674-8f65-0c2bd1e6ccc7	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	9	9	f
8701cae4-e7bd-4153-ac9d-3a2565384f2a	350594d5-5cd4-4033-9294-6b50102afe7d	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	8	9	f
42869649-94d3-40d7-94c7-a81a83d0dd27	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	9	8	f
b9895d9f-2f34-4027-b9a8-3c7abc4afa47	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	8	8	f
bbbc5bf8-ba12-4ec7-a0ff-194b048d3d65	c0011bcd-6952-4d60-a01b-3b455c7eea4c	Vaikeuksia tehdä kaikkien kanssa hommia.	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	8	8	f
1b8e75b4-0d21-48cc-9320-6034cd096c9f	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	9	8	f
9375ea3a-d567-4b90-b21d-1fd563a31d6f	5fd1effd-1670-4a40-bfaf-75a2a048fc91	Loistavaa työskentelyä.	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	9	\N	f
6ce703ba-1b88-4849-8344-f2e7deee1369	720863b3-15b5-4928-b516-5a8ec0cee764	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	9	9	f
054b7c8d-da06-4a22-a2ef-186f4582eae8	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	8	9	f
4787b660-37bd-4a1f-b760-796cbe864ef3	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	3b5e4736-250b-4785-b51e-1d40b0c2d7fc	t	8	8	f
bc25fc38-1e7c-4f97-97ef-e53be25ee870	344890ff-a10d-4801-992d-36bcbcc43663	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
869c5df5-a12c-4783-a365-119d129f60cf	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	f	\N	\N	f
b5bf484b-14ed-49a1-8b03-d5b61dc95731	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	9	9	f
9a660d49-a55a-485f-9fbc-717503ccdc1f	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	9	\N	f
deca533c-beb3-4fb3-b014-bf7de655e4bb	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	t	\N	\N	f
861adbac-6eab-4a4d-9b19-0a629c54bae2	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	f	\N	\N	f
64db3cac-53f2-4f45-a349-2d8e3f254a4c	799b59e5-c962-4f19-9f9d-01518c57a550	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	f	\N	\N	f
13ab6c0d-c3b9-43e5-8d1d-9db85a8ea61e	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	9	\N	f
bbdba804-a660-4c26-8d83-ce9887711f37	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	\N	9	f
1e745969-5f4b-4d00-a8a5-77c6f6fcd6f1	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	\N	\N	f
84e71396-9f88-4072-b9a3-4dd1ee3295f4	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	9	9	f
e0272a1b-9c8b-4301-b841-20fc0b23ec61	404347be-f571-4254-b055-a06e9a9962f9	Tosi hyvää työskentelyä läpi tunnin	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	9	\N	f
af0e067b-e272-405f-9e16-5f87812f9421	686241e9-7a4e-4eb6-bc99-26699999001b	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	8	9	f
904a6436-206c-499c-ab75-e1063e220802	2e03b196-3248-4f14-9f2d-4661e503665d	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	8	9	f
63b17ed4-d66c-4e52-bac4-f0eac82f1c67	b9266745-39ba-4be3-b1a1-421801b79832	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	9	9	f
bbcb37fa-b702-4f10-8064-063ebf88820b	74e88236-472e-41ea-9475-73c94489ae2e	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	9	9	f
91711c35-d1fc-4437-89e8-010909ea59a8	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	8	9	f
c1f9de25-cb9a-418c-a274-bbef7407ba5a	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	9	8	f
e857ef54-e915-49c6-8e36-090c97951c88	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	7	8	f
e0b53700-9003-4b3b-af53-a2f739f3c99d	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	a9f2c321-49f2-48ec-955f-ea21a6d78053	t	9	\N	f
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
82230487-9df9-4f0b-9d90-9682ddd19248	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	t	9	9	f
6d087ab5-db75-4a97-a9c3-497422415bf7	91a00bae-00db-464f-8376-591e16a5a811	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	t	9	9	f
d56a9bc9-d231-4f38-8945-f355093400e1	e47d29de-6a02-4e63-a52a-964fc17b744e	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	t	\N	9	f
5a2d1e67-af0b-4098-a43b-081b2aeb2b37	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	t	\N	9	f
f234d50a-047e-49b2-a3f2-8f5962af2855	b1ef84a7-2238-4946-bd2d-97aae138bbad	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	t	\N	9	f
d293bcda-b7bf-4413-8e76-639045ae8c2f	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	\N	893df305-ade6-4f72-89c2-6c8bc016c25e	t	8	9	f
9a348eed-4ee3-459a-a9f6-dc18d74cc3c9	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	f	\N	\N	f
11fed867-0857-43a7-84a9-2afd89ba9344	789e18c3-638d-4651-be65-ec0a1661539f	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	\N	9	f
35c08728-659d-4c70-a256-bdaeff4775ef	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	9	\N	f
4b267db9-a3f2-4f2b-bda9-16f93a31fd0a	4fa0db05-161f-4165-b00c-52528866490c	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	\N	9	f
3aa66c42-ef33-444e-8e50-9af00b2de3ae	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	\N	\N	f
b606fce5-fe22-4a48-b5c0-7a8940951267	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	9	8	f
d31b3e1d-1e07-415a-8b23-ea3c9e9315e7	a71c4a77-39cd-4672-a59a-0394bec62fcf	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
b426dc18-6744-4336-b20c-b02ffecd84bd	f179052b-20ed-4b30-92df-04ae478b0f06	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
9a46b7bf-9127-43b5-ace7-67fadf55c507	74ff2516-b259-4f3d-b68b-dbc5c29d6daa	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
858d751e-b125-41cf-b521-e57de793f862	350594d5-5cd4-4033-9294-6b50102afe7d	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	f	\N	\N	f
77a0768e-740e-4400-858b-4664cf4c3341	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Ei paikalla.	117ab460-e5a7-4e15-a674-aed050c43bf5	f	\N	\N	f
206ad316-c280-495b-b573-ff98f488ce3f	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	f	\N	\N	f
69d1ffda-1532-44dd-92cc-be2f6bdb638f	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	f	\N	\N	f
0854e59a-4488-479d-8e01-e73e78d8f67e	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	8	8	f
507ed3ba-dde2-4ee3-8a1c-14e12ca8141f	8cc39180-992f-41be-88d7-d798fc88abe0	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	9	7	f
93710f88-e993-42fe-bfe6-a04639f7a3b3	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	7	9	f
b3384a1d-4c1e-43f7-ba01-7567581d2ebe	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	\N	9	f
815bfe5c-670d-4c5f-b1b4-ed2c9b48909f	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	Työskentelit tänään hienosti kaikkien kanssa!	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	7	9	f
92078c80-9563-460a-b8e9-24d3c8f57da4	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	\N	8	f
42be7b02-4e01-4a48-9fc5-887828728044	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	7	7	f
db7f83a5-148a-4318-b917-97e5784c54f0	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	7	8	f
4b4a3830-3c8e-4c29-a6f9-ca440eb817c4	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	9	9	f
c989f89d-a51d-420e-926d-c13a57bdc8bf	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	8	8	f
09a41016-0804-44d5-b042-2b14e69041fb	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	6	8	f
10b52536-66e3-4c76-9446-8f3499c37acc	a6eb654d-12a2-4350-a687-128314062791	Kiinnitä tulevaisuudessa huomiota tuntityöskentelyyn. Koita välttää puhumasta muiden päälle	5f8abc0c-3d0b-4a19-baf5-810c7144f275	t	\N	8	f
b6bc9500-e633-4d12-95fa-90e4ea1b1ffa	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	\N	f
663e887d-cb50-406d-a111-e791a2100f23	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	\N	f
f2b88294-d13a-4011-be98-fb68bb06d4cd	b9266745-39ba-4be3-b1a1-421801b79832	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	\N	f
2a6d7c2d-8831-4dc1-91ce-9a45b9bec0bf	686241e9-7a4e-4eb6-bc99-26699999001b	Puhelimen käyttöä tunnilla.	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	9	f
3534e049-0d67-459f-a81a-da39ca6bab27	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	\N	f
9c836ac3-ca15-4444-aa48-9fb1788659dc	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	\N	f
f1cd5a3c-55b5-45ac-b67e-7b9c7c0313de	24007058-ca39-4c69-9004-c3d29b441fb3	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	t	9	9	f
68bcf71d-ba95-428c-8d7e-ce5b71f6188d	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	f	\N	\N	f
c6790b82-660a-4768-aa48-1811463aaba5	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	t	9	\N	f
8860d981-5e0f-406c-b8a4-36cc15f39636	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	f	\N	\N	f
62e1a3d4-58a6-455b-a8ca-af19aa5ea34c	5fd1effd-1670-4a40-bfaf-75a2a048fc91	Hyvää puolustamista omassa joukkueessa.	117ab460-e5a7-4e15-a674-aed050c43bf5	t	9	\N	f
417302b5-58fa-48f3-921a-3889b3e58ec9	b05b035e-4867-40c1-965e-f60630bfa457	Passiivista osallistumista.	117ab460-e5a7-4e15-a674-aed050c43bf5	t	7	7	f
5ebe5d25-78c1-44c0-81a3-28f4079586e4	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	t	\N	9	f
a6dd63e4-229c-4117-ba5b-ac774f178567	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	f	\N	\N	f
74f88033-a927-42d3-883f-a6d0bc7bca77	720863b3-15b5-4928-b516-5a8ec0cee764	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	t	9	\N	f
0e860d3e-961d-4c44-8f88-2f31765d373d	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	t	9	\N	f
917be8e3-102e-43cb-80d7-c10641417d59	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	117ab460-e5a7-4e15-a674-aed050c43bf5	f	\N	\N	f
f2ad2d0c-da35-4bfc-8294-8f5645dbaf81	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	f	\N	\N	f
eb6bbd7c-e6f4-476e-9d15-93b019f5056a	4943ad21-7f08-4b45-8d6c-7cccbfb05562	Paljon opettajien kanssa seisomassa.	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	8	f
4abdcbc3-1f43-4adb-832e-43f85a16ff91	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	efb25bc7-cd6d-4714-a6a9-14aaa5e31923	t	\N	\N	f
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
99496342-95e2-41a8-9832-668f5aa527f0	aff989da-421b-4128-968e-5f54d59ca7a0	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	9	9	f
b1825e3c-a95a-4266-b8b3-ac16b0e6f59f	95ef1789-275a-42de-bfc3-c9c006432782	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	9	9	f
6bffbf4d-c546-428f-95dc-27b28384fad6	6c629051-3712-43f1-8f21-c357442fc591	\N	7b28f9fd-4ecb-4da4-80d8-827355d10caf	t	9	9	f
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
1799269e-e4a8-4f9b-b5a5-574e6f3f56a0	4fa0db05-161f-4165-b00c-52528866490c	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	\N	\N	f
0ee23c51-3743-4498-b7ee-787f342290f3	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	9	8	f
755d208b-6a70-424c-b9fc-7bffb0c88814	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	8	8	f
3a5b61d5-5027-4525-9fd9-6619acd46d3c	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	9	7	f
23dc6614-401a-4232-a4f7-247a586ed533	a6eb654d-12a2-4350-a687-128314062791	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	\N	8	f
70ffd48e-f5bc-412e-9d2e-b520edca0368	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	7	9	f
e79d3f7a-168b-480d-ab30-10efd85c9e48	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	7	7	f
6319074c-8b12-4119-a1d1-2e705caacd9f	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	8	8	f
66e853ce-16ae-4cdf-88d8-6a7453fbd714	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	\N	9	f
2b61c667-1e5f-4d17-a11e-8ad60f8f0924	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	9	9	f
c75f35d1-0fb8-48a1-8e78-9ab2eae457ee	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	8	9	f
4bcb9109-db0f-4457-9c66-53319709a6be	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	7	8	f
821659e8-4112-4612-b34c-0fd4835087d2	8cc39180-992f-41be-88d7-d798fc88abe0	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	\N	9	f
519c14fd-523e-4d1a-8e77-faa1df4af1d6	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	9	8	f
4aee6abb-c774-4207-a56b-1d09d51e29d9	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	7	8	f
7ecbcd24-2f5c-4ced-b621-b69b57593c50	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	b38a9a41-599f-4d1a-86df-12346e38a933	t	7	6	f
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
3f20f820-4fe4-4733-8735-e8914cddacef	404347be-f571-4254-b055-a06e9a9962f9	Varmoja nostoja hihalyönnillä.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	9	9	f
d32d09e4-7211-41b8-9390-052dab7ac0fe	799b59e5-c962-4f19-9f9d-01518c57a550	Hienoa taitojen soveltamista lentopallossa esimerkiksi yhdellä kädellä kurkotukset. 	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	9	9	f
48f54192-ef28-439f-8e64-555f7814854d	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	Mukana toiminnassa. Hienoa heittäytymistä koripallossa, vaikka ei itselle tutuin laji.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	8	9	f
2b3f1c86-2106-4041-9368-ec22ed7c8b75	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	8	8	f
0aa0319b-51a0-4f21-b36c-c41e447fdcd6	046a3d24-b93f-44d1-ae1b-aa628e141bae	Työskentely hieman oikukasta tänään. Käteen sattui, mikä taisi näkyä turhautumisena. Hyvä muistaa että tunneilla joutuu kokeilemaan erilaisia juttuja!	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	8	8	f
f841692b-73c0-42fe-8ca6-be488dbfd4c2	74e88236-472e-41ea-9475-73c94489ae2e	Mukana verkkojen laitossa ja toiminnassa. Edesauttoi oppimista.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	9	9	f
e9bfed18-d99b-49d5-95fc-61d49b6b3cc8	2e03b196-3248-4f14-9f2d-4661e503665d	Taitavaa pelailua. Hyviä nostoja sekä passeja hihalyönnillä ja sormilyönnillä.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	9	9	f
37d95d35-52fa-4d85-8e34-3b1ef881de3b	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	Mukana verkkojen laitossa ja toiminnassa. Edesauttoi oppimista.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	9	9	f
2a0c6b47-0edb-4ec8-8feb-44cf6d8667d7	dadb6322-e514-4a92-b22b-ab9357a4ac32	Tänään aktiivista osallistumista tunnille, vaikka virtaa riitti kaikkeen muuhunkin epäolennaiseen.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	8	9	f
7152156f-294c-4510-8f94-76e497f103a0	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	Palloilutausta mahdollisti taitojen soveltamisen tässäkin ympäristössä. Hyvää työskentelyä!	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	9	9	f
f33ebc58-975d-4918-8b1b-0b44e0b1bfec	b9266745-39ba-4be3-b1a1-421801b79832	Kivaa työskentelyä tunnilla. Taitavaa itsereflektiota tunnin jälkeen omasta työskentelystä!	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	9	9	f
6dd0b3ef-a2a7-4adb-85cc-16324a74c52c	686241e9-7a4e-4eb6-bc99-26699999001b	\N	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	8	9	f
355a46f5-b3da-486a-8834-c376cd5eb295	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	9	9	f
8da85666-1e17-4f86-9e04-5c9432b3afeb	1e2db5dd-c171-460e-bf48-4bc55f04f49e	Levotonta työskentelyä. Ei lentopallomaisia lyöntejä ja ratkaisuja paljon.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	8	8	f
395080d2-703a-4911-ab93-5fbaa190c859	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	Työskentely on aina kiitettävällä tasolla. Se mahdollistaa asioiden oppimisen!	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	8	9	f
8d2d68e9-d994-4904-9377-8a6f344d2763	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	Heittäytyy toimintaan mukaan. Taitava liikkumista. Välillä tunnilla tunteiden kuumentamana saattaa vaikuttaa joukkueen henkeen epäedullisesti.	15cf1b92-14da-40cf-a53f-34d44b71a6a8	t	9	8	f
09021ce5-87ec-4dd3-8989-e2a4a5614b8c	45adabcd-6682-4ff7-abee-9f8061af9a3b	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
0aaa0331-3946-4200-8df4-801c43ef8d81	4bb3b891-7462-4e8d-ae54-e2df607d1478	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
21768729-1c99-4275-84df-58f5cd6f56e5	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	f	\N	\N	f
66d1df21-4b61-4260-898e-bf6bb6fc9c66	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	8	9	f
064071d6-7613-476a-855c-1b710a294c04	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	7	8	f
4f970490-cf6b-4246-842a-3d0b3c0d081b	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	\N	\N	f
4a282401-34e8-4aa8-9479-86fe17018343	a6eb654d-12a2-4350-a687-128314062791	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	9	9	f
4dd413de-926b-4d23-9353-c6a9d22c2b53	98d2b651-d44d-4a40-ab28-da3fa61df960	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
60986cfe-acc3-489b-aafe-6a1fce2aee93	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	f	\N	\N	f
edfd0017-5d05-4269-8807-68abcf049217	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	f	\N	\N	f
e88bcee2-3abf-422f-a7d3-fa0f2db0ec86	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	f	\N	\N	f
9047aea9-004a-4756-9dcd-735e0b34bd18	4fa0db05-161f-4165-b00c-52528866490c	Toimit uintitunnilla vastuullisesti ja pidit yllä turvallista toimintamallia	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	8	\N	f
418cfe20-c4dc-4239-8073-57fd93c55e59	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	8	8	f
e8a0b259-fa67-496a-b8bf-3f18eb6fdec3	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	8	9	f
a26f8ea5-336b-438e-9208-b697586aca45	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	7	8	f
889a3142-1829-4b1f-855e-6830edf79e78	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	\N	\N	f
afb90723-f17d-4288-8176-32a80b59a6ad	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	9	\N	f
80eabe0b-75d2-4fa0-9d36-61c7defe1419	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	\N	8	f
ad46fe67-47a9-4aa5-a8b7-ca657340106f	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	7	8	f
968a5a71-e90b-42de-b17d-9c0982a77dd9	8cc39180-992f-41be-88d7-d798fc88abe0	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	7	9	f
d08c5a78-cee7-4996-b2d5-fd40f4ecde1d	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	\N	8	f
0b24b34f-dddd-48d8-bab2-f35e521ba7ff	789e18c3-638d-4651-be65-ec0a1661539f	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	9	8	f
d43d48de-e02c-4de7-ad32-18b38ce71a79	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	4112bf6a-81c2-4200-a662-ee7fa06787c4	t	9	9	f
075e7d11-0271-4b29-aebb-a6c63df24ca5	b8a8e21b-2e09-4855-a354-0c48800913c9	\N	1edc3524-678e-4c03-9a19-001c89aa9f58	f	\N	\N	f
0231fe43-546a-45ee-9f1c-fec5e48c3a86	28426aca-f675-46f7-bafc-dc5f7eb649c5	Hienoa heittäytymistä musiikkiliikunnassa.	1edc3524-678e-4c03-9a19-001c89aa9f58	t	\N	\N	f
1f029c59-c616-43bf-ada0-69c1ab660724	251b27c1-5684-424b-b17b-7257a311bd33	Huippua työskentelyä tänään!	1edc3524-678e-4c03-9a19-001c89aa9f58	t	9	\N	f
684537e4-8747-4724-a6cb-8d66ea65f0bd	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	Mukana työskentelyssä. Hyvä asenne, hieman laiskaa tekemistä alussa.	1edc3524-678e-4c03-9a19-001c89aa9f58	t	9	9	f
611375ec-d356-466a-8dc5-8a833a1c6390	f6705543-53b3-419c-9a54-c23cd0c8525b	Hienosti mukana, vaikka jalka kipeänä. 	1edc3524-678e-4c03-9a19-001c89aa9f58	t	9	\N	f
dae5cfa2-2ad3-436d-93ef-fefeb0e1d510	9c66fa7f-c08f-4905-9c54-5da739156493	\N	1edc3524-678e-4c03-9a19-001c89aa9f58	t	9	\N	f
57214351-2d6a-464d-ac14-76fafaa18b4d	04629d10-42df-4873-bb8e-a38230d93b8a	Tunnollista työskentelyä tunnilla. 	1edc3524-678e-4c03-9a19-001c89aa9f58	t	9	9	f
a75bd64b-60d7-4e67-a60f-b01cbb7187bc	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	f	\N	\N	f
8d0c090a-0929-49e5-b9f4-91d97184b7ab	b43981e9-6f50-4908-b225-1f5d5a70c68e	Vaikeuksia toimia muiden kanssa ja mennä annettujen ohjeiden mukaan.	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	8	7	f
bb448c18-0bfd-443a-9058-beec22be965a	350594d5-5cd4-4033-9294-6b50102afe7d	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	8	9	f
01a0dec4-9030-4f41-ad14-d8e2cb5a87b0	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	Huippuhyvää työskentelyä. Taitavaa pelaamista.	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	\N	\N	f
5b48c67a-b67f-4f5d-acb8-77d2a46aa7a5	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	8	9	f
88d900c8-4439-4015-b741-383a5764a00f	24007058-ca39-4c69-9004-c3d29b441fb3	Vaikeuksia toimia muiden kanssa ja mennä annettujen ohjeiden mukaan. Puhelimen käyttöä. Tunnin lopussa otti osaa pelaamiseen.	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	8	7	f
81911320-fc69-481f-82c3-189839556ea2	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Vaikeuksia toimia muiden kanssa ja mennä annettujen ohjeiden mukaan. Häiritsi muiden työskentelyä kehoituksista huolimatta.	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	\N	\N	f
f2a6f319-8762-4215-998b-daef06f6551d	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	\N	\N	f
3dd9a5b4-88cb-4c45-b590-585294c5d182	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	8	8	f
2737e427-2252-4c1d-86b7-e5a9a03796a6	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	8	9	f
108bcd42-93ab-4d17-9349-148ae0b5c436	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	8	\N	f
667f60a9-dc2a-49d6-9c48-b4edb9d4ebcd	b05b035e-4867-40c1-965e-f60630bfa457	Ei aivan täysillä mukana, mutta kunnollisesti ja muita kunnioittaen.	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	8	8	f
c6d40ff9-7049-43ec-9fbe-5e0faa54461b	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	Vaikeuksia toimia muiden kanssa ja mennä annettujen ohjeiden mukaan.	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	8	7	f
844c29cb-77ce-4e1f-8620-fdd3b410b39c	dc61c65a-cfe6-4743-a80b-98c54491a42c	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
a812dac4-8c80-4436-a9f5-2f6b9299efd5	1ba24224-da11-4745-be85-ed1ce7bb2669	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
b8ee9004-895e-49af-aa9e-c29b12dc4332	8faa9bc9-fbb9-4c0c-ac24-99c987bd412f	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
697cd222-d559-4218-9a7a-9230d97913fc	24c494db-a428-4430-ae3a-c321d5e765f7	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
fdeddb93-63b1-4305-9648-6a6ccf643940	aff989da-421b-4128-968e-5f54d59ca7a0	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
f5fbea05-5b08-42ae-8f04-9e4487adc118	95ef1789-275a-42de-bfc3-c9c006432782	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
d2e2a2b6-3529-4274-9d03-bad16b74e7ba	6c629051-3712-43f1-8f21-c357442fc591	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	t	\N	\N	f
c3f08294-01e0-456e-8fc2-109e712cb37c	b4766346-0c81-4d98-a489-654ca9b3c6db	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
c0998937-25ae-44e6-bb75-30ee6e0937d1	36c47c4b-1f5b-43d8-843a-6f74ab4e86b9	\N	46baaad5-0f6b-4af5-b454-2895ec00965c	f	\N	\N	f
999c491e-9e09-4f39-8520-ea9edcb4fdd1	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti osallistui aktiivisesti beach tennikseen, vaikka hänellä oli hieman vaikeuksia pelin sääntöjen ymmärtämisessä.	c0076c27-405b-4dcc-a944-323b279d0986	t	\N	8	f
d57357e4-68e0-445c-a1b6-d8d3943a8093	720863b3-15b5-4928-b516-5a8ec0cee764	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	f	\N	\N	f
0af2f3fa-5095-4ee1-8a6d-df78da3594d9	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	8	8	f
e1c4094b-0b2b-495c-8f5c-1cc63ad004db	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	Vaikeuksia toimia muiden kanssa ja mennä annettujen ohjeiden mukaan.	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	8	7	f
f1dae913-a5f4-4a31-85ab-7f4cc58bdaaf	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	2dd473a1-eeec-4ead-8ff5-4f3a799e027f	t	8	8	f
c7748ef7-4a88-48c1-a019-15c45b04bc67	28426aca-f675-46f7-bafc-dc5f7eb649c5	\N	568d601e-2dff-47f1-96a4-bd823b8aadae	t	\N	\N	f
231c7d98-7325-4d2d-aa08-9bbf86c91ac8	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	568d601e-2dff-47f1-96a4-bd823b8aadae	t	\N	\N	f
3d4a3147-562d-430f-a6b3-434dfa0690e7	251b27c1-5684-424b-b17b-7257a311bd33	\N	568d601e-2dff-47f1-96a4-bd823b8aadae	t	\N	\N	f
31e420f4-b0d8-4082-af63-2f4e916f50ff	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	568d601e-2dff-47f1-96a4-bd823b8aadae	t	\N	\N	f
e5c954fb-b58d-441c-8efc-cfdd74eab464	9c66fa7f-c08f-4905-9c54-5da739156493	\N	568d601e-2dff-47f1-96a4-bd823b8aadae	t	\N	\N	f
331172ba-1dc7-4638-bf78-c7e770dd23db	04629d10-42df-4873-bb8e-a38230d93b8a	\N	568d601e-2dff-47f1-96a4-bd823b8aadae	t	\N	\N	f
fc878873-4bba-4b87-9487-0712133f3fa4	b8a8e21b-2e09-4855-a354-0c48800913c9	Turvallista ja toisia huomioivaa pelaamista!	568d601e-2dff-47f1-96a4-bd823b8aadae	t	\N	\N	f
d9c565f5-8215-4e58-adc8-d11c0bc0cc74	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	68af71a8-0626-451c-a0ba-597e762fd9dd	f	\N	\N	f
7fa7875c-4402-444d-89d2-6391f716fdfe	7af2670e-d622-44de-9458-0e3490224f19	\N	68af71a8-0626-451c-a0ba-597e762fd9dd	f	\N	\N	f
1fa5df8c-eb1f-4913-a0c9-6f2ae2d572e3	052654dc-bfba-4092-85d4-6894c908f9b1	\N	68af71a8-0626-451c-a0ba-597e762fd9dd	f	\N	\N	f
920e2325-c445-455b-8a1c-e53d9cf97e35	a9823635-cc6a-4026-ad85-423287d7ec49	Oivallista työskentelyä. Mukana kaikessa ja muita kunnioittaen.	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	\N	f
11b59555-17bb-4e7e-b24c-3d4262c5eba0	16149225-d420-4254-88de-36f235415650	Poissa	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	\N	f
443f5522-638b-479b-b2ac-4824376d5f41	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	Pientä naureskelua muita kohtaan pelissä. Aktiivista osallistumista silti koko tunnille.	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	9	f
df3633af-4993-4424-ab78-ac8ae4767cae	b015f02b-0e21-4f21-93d4-8497311b6490	Oivallista työskentelyä. Mukana kaikessa ja muita kunnioittaen.	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	\N	f
d0a97dfa-705d-448e-85de-8da4c2fe5e7f	4cdb20f7-d8a7-480c-9379-bbe14d95d933	Poissa	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	\N	f
6e079b13-ea60-446c-9b96-93ff482829c6	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	Työskentely kiitettävää. Mukana suunnittelemassa ja muiden aktiviteeteissa.	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	\N	f
0f2ff805-5ebb-47f7-93d9-2d68b97b8cd8	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	\N	f
0e2823b2-93dc-48ce-b394-1e349c134bf3	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	\N	f
d76be387-6fb9-4b39-bb1b-52fa3013ec88	898eaa06-334f-4446-98b3-2368ad2b6cef	Kaikessa erinomaisesti mukana, vaikka kertoi päivän olleen huono. Hienoja tunnetaitoja.	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	\N	f
0b0d10a8-df34-4be4-8393-dc72e1b2f273	13e55cbe-ac55-47e1-b4d0-cc80073762e4	Suunnitteli ja otti osaa aktiivisesti ryhmän työskentelyyn.	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	\N	f
2054dad4-76f5-47a9-948e-223954f8bbd2	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	\N	f
1688d8d9-3bfe-45a4-8d9f-5cdd889b211c	eb96e883-bf2d-4482-b8c9-6d272ee35354	\N	68af71a8-0626-451c-a0ba-597e762fd9dd	t	\N	\N	f
f98fa9c5-93b3-42dd-9b06-abe80d99391f	404347be-f571-4254-b055-a06e9a9962f9	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	8	9	f
e8e18318-052e-4da8-aaa4-5271daa75cac	799b59e5-c962-4f19-9f9d-01518c57a550	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	\N	\N	f
9a128be1-1425-4d4c-bee6-9b94d1e6d0ca	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	9	\N	f
cab244c8-3657-4d3b-9471-e06a5772d179	74e88236-472e-41ea-9475-73c94489ae2e	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	8	9	f
eb79cfe2-2fb2-4149-9d70-19b51ffa5268	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	8	8	f
52493fbc-5bb6-4010-bfdb-a971ffdfba7d	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	9	9	f
23c660dd-aa5c-465a-b724-907b96350528	2e03b196-3248-4f14-9f2d-4661e503665d	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	9	9	f
6863c0f1-ab1a-485f-b460-011199517985	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	8	9	f
e738fedd-36a3-482d-8841-40b6478a28ac	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	9	9	f
7b38f72c-7018-4ba2-8487-78f552863b0e	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	\N	\N	f
2e640cea-d1b3-46a4-99f0-f97fe1974495	b9266745-39ba-4be3-b1a1-421801b79832	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	8	9	f
924c46fa-e613-4e93-8b10-a1579ae69016	686241e9-7a4e-4eb6-bc99-26699999001b	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	9	9	f
815bf37a-caf5-433e-8203-346cd6f9115d	4943ad21-7f08-4b45-8d6c-7cccbfb05562	Ei osallistunu tunnille. Ollut kipeänä.	c00a27a4-7ce1-45c0-8696-703841932620	t	\N	\N	f
ae077ef7-0920-4436-91ca-7387e5277a13	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	8	9	f
a9a96840-b9d4-406a-8dc5-5925ae16e82e	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	8	9	f
f5bb717d-385b-4757-8cfb-49a948985ce4	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	9	9	f
0a61ec94-31f2-4d2d-bdf8-8b17420403ff	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	8	9	f
742b8923-e5ab-4a78-b981-39a1bdd0f897	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	c00a27a4-7ce1-45c0-8696-703841932620	t	8	9	f
e169b3a2-5943-4ca4-bc70-1776fbd1452e	4a3f375e-f8ce-46f9-8b9a-4587d069d036	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	f	\N	\N	f
cc486309-0ebf-418e-b666-e4e68ea54106	1f770536-fee1-4ca2-9622-ed816628c9b7	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	9	9	f
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
4684ed0f-bbfc-4c52-8c59-a8942951d021	0e963947-3dcf-4f30-b316-ac9d07d81b0b	Työskentely ja taidot kiitettäviä. Mukana kaikessa hyvällä asenteella!	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	9	9	f
e09d784a-3565-4887-b1d9-bb5d5a0aa07f	91a00bae-00db-464f-8376-591e16a5a811	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	\N	9	f
d33c8070-e7b4-4ea3-90a0-1ef457e8a805	b1ef84a7-2238-4946-bd2d-97aae138bbad	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	\N	9	f
a664fc00-ab84-465a-8efe-94c3f25786af	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	8	9	f
587c3770-40fa-47ae-b3a4-aabaeae93614	45cedf94-714b-404a-8ad5-db42f55919eb	Ilolla mukana kaikessa.	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	9	\N	f
ae41d397-9921-4c78-b0d1-2e4846da9988	1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	9	9	f
a0e85fae-3790-4f59-8b14-563da8d30076	abd4148b-b530-4440-b643-34d08a4bb811	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	9	9	f
3438db68-53d6-47bb-a709-7c02af96106a	ad671202-0d1b-4b31-a2fc-9fa9032f3b33	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	9	\N	f
0fb287bc-f24c-441a-9324-439e61072ecb	3723e655-2484-4055-8570-13ee693d5a1a	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	9	9	f
1116c0b1-d903-4e6b-a7d5-2a3f9e53a1f4	e47d29de-6a02-4e63-a52a-964fc17b744e	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	9	9	f
9dfebedf-5fea-4a66-ae28-2dd286ee1c27	aa420673-c8ba-41da-9ee4-061022bb4a51	\N	9a7635bd-a52c-475a-b16c-35786e52a5a8	t	\N	9	f
b9f4aca7-42db-428b-b1ec-1f030b7df41d	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	f	\N	\N	f
6f867826-5e4f-47e6-b408-4941b2968a06	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	f	\N	\N	f
089d58aa-ec46-42bd-ae39-de885524808d	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	f	\N	\N	f
b798f820-c5b8-4912-a0cc-b5545394bc7c	720863b3-15b5-4928-b516-5a8ec0cee764	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	f	\N	\N	f
e84875c8-18fc-482e-a24f-6145957bff35	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	\N	\N	f
4ab98f33-1492-4161-a1d9-6ac0dadc27e6	350594d5-5cd4-4033-9294-6b50102afe7d	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	8	9	f
fd4ff0d1-56da-49f2-82af-7637dbd3f3d8	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	8	9	f
d02accc4-9a73-4490-9e58-e0dc977a77e4	24007058-ca39-4c69-9004-c3d29b441fb3	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	9	8	f
33be0dae-9a92-4bd2-86a3-5267e678c315	e2c637e8-f394-4a5a-926f-1f9888a7dc98	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	8	9	f
8f4ab2b3-0db7-46c9-921f-ef34095060bb	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	8	9	f
3ee78f5c-fa81-4bd6-86e8-89ebb8443f0d	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	\N	\N	f
4e7dd7cc-4677-43cb-b21c-09324887614f	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	8	9	f
4929bcb6-89e4-4599-987b-ce35e95489f0	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	8	\N	f
b87fa953-f71b-406c-af95-131a34cdca72	b05b035e-4867-40c1-965e-f60630bfa457	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	7	8	f
7c442b13-d925-4fc2-a700-d30b0cbfdd91	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	8	8	f
10413b96-f0fd-45c3-b500-f93a214bd9e2	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	9	9	f
dbfd3e0f-b18f-46d2-ae2e-c86274fb18b9	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	ecb94bbf-9d0c-4296-87ff-4b86b43c05da	t	8	9	f
bfe06145-0a6f-4581-a0db-8c8f1782f6a2	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
d5ba26ac-c8f9-4745-a193-95b3308e104e	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
14c49914-522f-47e5-9f5f-32a1f4b18f37	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
cfec4176-a870-4e49-9898-d277fa022183	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
e1e11e83-0872-4ea2-b509-acefab9ef43c	a6eb654d-12a2-4350-a687-128314062791	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
ef12528f-1894-48e0-9de5-440709207d23	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
ca3bd143-ecf3-4f53-9685-277973224c00	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	\N	f
38ec404f-2a32-4bfa-909a-1d9ae2dcf1cf	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	80f640f0-d041-41f1-9817-6c18f415a068	t	8	8	f
9150ffb8-bd12-406a-815b-8c9729782b99	f7aff351-6b9f-4caf-8717-5a611192f6d9	\N	4dde4440-0413-45ca-a645-8f0adf8d2622	t	9	9	f
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
e3b25a5c-cb10-4af9-8061-cfdae4204624	750d8c1e-30f2-49fc-a445-7acdb4bff78e	100% mukana	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	9	f
b74d1cd4-0474-4fc3-86f5-a07f5c3df0ae	081d3462-484c-45f4-b7df-9eef1712d829	Hyvää maalivahdin työskentelyä!	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	\N	f
4ebe021f-2a39-45a8-9a0c-631ddade4407	dc43f223-8b76-457a-b035-8b186320bdea	Mukana tänään tunnilla hienosti! Myös ryhmässä!	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	9	f
fda04ffd-3f68-448d-b79b-62f74e95db34	213addc7-6d5d-4a39-95bf-ded6afa510a6	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	\N	f
519f3e33-830b-40a0-86d0-0a3ac3dd2816	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	9	f
58fc1047-3812-4229-87b1-09c3813260f1	74c83e0a-3e21-4c01-b18a-a81f7e089d64	100% mukana	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	\N	f
860b4e5a-dbef-4540-8e14-cf931c779321	9f830199-bde9-43a4-84e9-986992a1e3d3	Tunnollista työskentelyä!	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	9	f
6b74557c-1e03-45d3-8d63-cdf95589659c	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	Mahtavaa työskentelyä maalivahtina!	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	\N	f
3a5db041-3ef6-49cd-aa64-881884f69dc7	a94818ef-1b6d-4489-8c0b-f1667cb7cb82	Huippu osallistumista ja työskentelyä tunnilla! Kivaa käyttäytymistä muita kohtaan.	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	\N	f
8e14d859-7b06-47aa-97fa-67b17dbb3232	2487435b-5598-4a44-bc31-f93ed8a2ec43	100% mukana! Myös puolustamassa ja sopimassa joukkueen asioita.	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	\N	f
86f9c9ad-195f-4b40-abbf-67b6b3d5bc98	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	100% mukana! Tuo mukavaa rentoutta ryhmään omalla toiminnallaan.	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	\N	f
e33a0e26-eeab-4744-b863-eca7cc0b2946	c4365db1-b405-4aac-ad56-4f21780797c0	Iloisesti mukana ryhmätoiminnassa.	250881ed-bf2f-46e4-bc10-f45afabad6e9	t	\N	\N	f
6d2b6d01-8269-4242-84f8-36afbbe4f7e1	4454d03a-54da-4c2c-b931-b4b96ac0d81a	Osasi uida. 	8e8599bd-97ff-4679-839f-4d0a618177ea	t	8	9	f
dccec9f2-6865-4fdb-a8ba-19298880d197	7c159017-8908-4a89-bc0b-dadcb58a2d03	\N	8e8599bd-97ff-4679-839f-4d0a618177ea	t	7	8	f
d314e7c6-b51e-4715-b963-b413364fa7d0	7131bcea-6594-4433-be62-2dca8ffad861	Kroolasi	8e8599bd-97ff-4679-839f-4d0a618177ea	t	\N	\N	f
6ed4b00c-c76a-4eda-b2e7-826f9f3a1c88	4c658b14-0fce-4ca3-ac9a-42558969e0e2	Osasi uida selkäuintia	8e8599bd-97ff-4679-839f-4d0a618177ea	t	9	9	f
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
0cbca064-f3f3-4f96-94bb-4b2741551355	b43981e9-6f50-4908-b225-1f5d5a70c68e	Levotonta osallistumista. Ei osallistu kaikkeen työskentelyyn aina, vaan jää taka-alalle vapaamatkustajaksi.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	\N	8	f
585b9c92-003c-467d-93ce-aab124eaf371	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	8	8	f
1755fe2a-c8a7-483c-9fb1-c57997956350	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	Hieno työskentelyä ja osallistumista toimintaan.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	\N	9	f
ce8446a5-aa71-4abd-9116-2b6d5fe56612	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Tänään oli työskentely parempaa kuin monena muuna kertana!	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	8	8	f
4c53eebd-d855-41fa-8319-59a0cd9ce6a9	67c02902-d7e2-47e1-abef-9d1ae14a3da5	Ei mukana alun jalkapallossa. Kavereiden kanssa seisoskelua. Puhelimen käyttöä tunnin aikana.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	8	8	f
37e1515d-0eac-4b3f-ac3d-c810f1fe8c9f	2dd7377d-323a-4e73-9a14-5962ec2b8a58	Taitavaa palloilua molemmissa peleissä. Mukana toiminnassa turvallisesti.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	9	9	f
84a00aae-93f4-4a75-ab68-b380e5d4db8a	d07f9606-ddee-4f35-8d35-b8358dc9fc75	Hieno työskentelyä. Rohkeasti mukana palloilussa ja yrittämässä maaleja.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	8	9	f
60e69c22-5c6c-4751-b8fc-2709b006b2fb	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	9	9	f
15154515-eeed-4ab0-89a6-2141d4b30620	5fd1effd-1670-4a40-bfaf-75a2a048fc91	Taitavaa tunteiden sanoittamista. "Huono päivä" mutta silti kaikessa mukana kunnolla.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	9	\N	f
dd7ca5dc-302b-4d9b-a657-52c6743d7a95	b05b035e-4867-40c1-965e-f60630bfa457	\N	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	8	8	f
032a12f7-2b75-45cf-a522-b9c570e2d296	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	Työskentelyssä parannettavaa. Omia joukkuelaisia mukaan peliin.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	\N	8	f
1dfec932-454e-4392-86a8-4add233e0e8f	d2bb5704-bed1-47cc-8879-681b17da4686	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	10	7	f
3b7de4fe-6e47-4a10-992b-2d86b2689d2a	af758be6-0adc-4e32-8543-f65f6c48fd2b	Omissa oloissa. Vaikeuksia kuunnella ohjeita ja työskennellä muiden kanssa.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	8	8	f
e427f908-fc5d-411a-ad9f-ff28a7b5fe80	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	Omissa oloissa. Vaikeuksia kuunnella ohjeita ja työskennellä muiden kanssa.	d3f9b80b-0d2f-4545-adeb-9483c6e86873	t	8	8	f
3bad72e2-eda5-44a9-a524-4011fa14214b	9c66fa7f-c08f-4905-9c54-5da739156493	\N	c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	f	\N	\N	f
25184522-5585-4960-8a62-a058937608c7	28426aca-f675-46f7-bafc-dc5f7eb649c5	\N	c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	t	\N	\N	t
d2cf5557-aaac-41cf-a827-6a3f3219b061	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	t	\N	9	f
7566285e-15f4-4c37-aa48-8a0d2e81c732	251b27c1-5684-424b-b17b-7257a311bd33	\N	c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	t	9	\N	f
a139ad54-a5c7-43a7-b78d-24aaf3508ef5	f6705543-53b3-419c-9a54-c23cd0c8525b	Tunnollistaja hyvää työskentelyä opettajana.	c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	t	\N	\N	f
71994ea3-46fb-47be-adc6-cb414bfe0ef8	b8a8e21b-2e09-4855-a354-0c48800913c9	Tunnollistaja hyvää työskentelyä opettajana.	c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	t	9	\N	f
15c60c3c-d7c5-43d9-b42b-e859a7304ec1	04629d10-42df-4873-bb8e-a38230d93b8a	\N	c07c8afc-8f1b-4dac-a4a8-929a0e9059e6	t	\N	\N	f
7e894113-7b87-4cc6-84ee-c3b5fd62d9ca	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	eb6afa70-0356-4ff7-8f48-b8ce7abc8ae1	t	8	9	t
7b0b3cc2-37a5-4aa0-af8c-aab690efd562	b25c03f9-3bec-48f9-a045-c78745703bf7	\N	4dde4440-0413-45ca-a645-8f0adf8d2622	t	7	8	f
226406d3-e9f3-46d1-b44f-af153084efbf	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	eb6afa70-0356-4ff7-8f48-b8ce7abc8ae1	t	8	7	f
970d999a-9d69-4cf4-8ebd-d4b9fe86124f	2eceab39-5d0a-4201-a275-17a1bed011a6	\N	6e21af79-6985-460d-852a-9efda75bcd5f	t	7	8	f
ed7f376a-f0a1-4bc7-8b48-3bef0eaff1e3	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	6e21af79-6985-460d-852a-9efda75bcd5f	t	9	9	t
2450e868-6285-4786-a430-2b8aa0812361	f925429c-08cc-4cba-b5d4-d63ccf818c49	\N	6e21af79-6985-460d-852a-9efda75bcd5f	t	7	7	f
2fc91c1f-ac47-457b-abb4-b19426508c89	7cb540a6-c01f-42c7-a0e2-099d290c0b6a	\N	4dde4440-0413-45ca-a645-8f0adf8d2622	t	\N	\N	f
8a256f12-ca1f-45ba-beeb-7fbdc9ca61e9	d989226b-aa7a-4dd9-a34c-6bf06ae4a429	\N	4dde4440-0413-45ca-a645-8f0adf8d2622	t	8	7	f
4f841396-3860-40de-b531-c59869640f41	a17ec781-f403-45b7-b1a2-2ad88dc2038e	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	8	7	f
ad0de238-7aba-4d05-8a5d-967823eaec05	9ffd35f9-d869-4406-aa8c-cf60cbc47830	\N	81b4100e-2f09-4436-87ef-a1f1de0f77ab	t	8	9	f
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
97746bc7-e524-4419-b27b-e99e2ac7393f	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti osallistui luontojoogaan aktiivisesti ja nautti rannan tunnelmasta. Hän auttoi muita osallistujia tarvittaessa ja piti hyvää ilmapiiriä yllä.	0928afc3-d50e-4222-9adc-71d1c8dc4593	t	8	\N	f
bbab1ff7-f132-4198-8b00-d71ebb8fc525	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa nautti retkeilystä metsässä ja käveli reippaasti koko 10 kilometrin lenkin. Hän ihasteli luontoa ja otti valokuvia matkan varrella.	7301039b-e03e-4faf-a594-45c33f925021	t	9	9	t
56a1cab9-72d1-4a0c-8d07-fc3f1bc82bc0	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo harjoitteli kuntoilua puistossa. Hän teki erilaisia lihaskunto- ja venyttelyliikkeitä puiston penkeillä ja portailla, mutta tarvitsi vielä harjoitusta tietyissä liikkeissä.	a8c5e1fb-bb1a-4811-9b48-6faa29f4f619	t	7	8	f
bc64da23-8c7e-4b7d-a0d3-e1b9dfc22d3c	7131bcea-6594-4433-be62-2dca8ffad861	\N	ca0b4bb1-c094-42a5-b45f-2a1c02c4fe65	f	\N	\N	f
56b4c52c-dd32-4771-a7a8-3d2f9c8cea8e	4454d03a-54da-4c2c-b931-b4b96ac0d81a	\N	ca0b4bb1-c094-42a5-b45f-2a1c02c4fe65	t	8	9	f
401cb205-9a76-43be-8449-b94c20c4c715	4c658b14-0fce-4ca3-ac9a-42558969e0e2	\N	ca0b4bb1-c094-42a5-b45f-2a1c02c4fe65	t	8	\N	f
410786ab-f9cd-41de-a850-ed1cbdf2a942	7c159017-8908-4a89-bc0b-dadcb58a2d03	\N	ca0b4bb1-c094-42a5-b45f-2a1c02c4fe65	t	9	8	f
18f6a38d-70f2-4827-b9f6-f653e68039d0	03397f36-f253-476a-a333-556ae179dbda	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	9	9	f
65261044-209b-49ff-8319-841690cb8ad9	904493af-2f99-494c-8b42-5ebe4c1ae1b6	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	9	9	f
ae98edce-544a-4328-9452-abd31875cb74	c695adc1-a07a-4ebf-b99f-9714e4ab4bf7	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	f	\N	\N	f
6130f0f1-2570-4980-9fab-3393f50a4a4b	92214907-4fe9-442f-9f35-c7b59f78e08a	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	9	8	f
958f06d9-f6f7-4c4c-a9e8-d2ed2a22b864	92eecb4d-b8c2-43ce-ac29-eb7a46566311	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	9	8	f
770a9c63-2402-4fd5-aeec-db256cd0e8a8	df05106e-6e95-4a82-af93-c5f6f8a58047	\N	a5be85c5-7133-4454-8af9-694ac0d8e3f2	t	9	8	f
81a2151f-5346-47e0-8e43-6d86530493b9	24bd87c1-454d-412e-a843-595ffdc4892b	\N	a5be85c5-7133-4454-8af9-694ac0d8e3f2	t	9	9	f
5804350f-e02b-4ab9-acb0-ab0ca2909303	e459564c-d6aa-4fec-8790-508218a41435	\N	a5be85c5-7133-4454-8af9-694ac0d8e3f2	t	\N	9	f
0e857537-2239-4eee-b660-d937cae9ed16	c99cbc5a-d88b-4022-bc5a-aae33f51e30b	\N	a5be85c5-7133-4454-8af9-694ac0d8e3f2	t	9	\N	f
6b3b7db7-8487-4bca-99d8-4a994c7d627c	ffb872b2-2bb5-4267-8e92-0514977ba44b	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	9	8	f
53d1d0b5-da14-4a10-b5c0-1fb1f3545c7f	e34d25fc-b0e2-48f1-8d86-77ce7464822e	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	\N	9	f
a1af0012-71ac-4d95-8959-ba11765d3163	05795f8f-d6de-4ec8-88fc-0df98df77292	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	7	7	f
e27903fe-9122-4dc1-8bb0-556e0b52b44e	de0b5abf-b8c5-4046-aaf7-f9bffc544ca4	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	9	8	f
b5199989-fb54-4b47-9c68-72efb5b253e2	0eba0b59-1564-4d93-a65c-d5aa57c2ba93	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	8	8	f
41b1244e-71b4-4b0f-9d52-2a0766cbf850	1aa8b618-de8a-4a56-b1ef-33ea240f027b	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	\N	\N	f
60f57c2d-19c3-4ae8-ae47-2908ced6fedb	350594d5-5cd4-4033-9294-6b50102afe7d	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	f	\N	\N	f
31d03346-3ae1-47f7-b06d-b96a76c353b4	24007058-ca39-4c69-9004-c3d29b441fb3	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	f	\N	\N	f
bd00ae05-2c99-4f78-92bf-61fe10c903f3	720863b3-15b5-4928-b516-5a8ec0cee764	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	f	\N	\N	f
218ada56-0f09-4d2b-9964-c2812d77dbc7	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	9	9	f
f33110b0-6505-4ff4-8fa8-371c399c43c9	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	9	8	f
a32d2a4e-2db7-4309-8ee9-c63455cd8053	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	9	9	f
d8e41a25-8c46-4f69-b4e9-3b1c336ec762	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Taas hienoa työskentelyä ja mukana olemista!	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	8	9	f
0c1b7fab-6693-474e-b8df-310c40ef1c87	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	9	9	f
326d1f17-145a-4736-a7e8-1e7ef327fafd	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	9	9	f
8cfe1ad7-da89-4f5a-b875-97a827584920	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	8	9	f
a0d9bf10-3579-4d60-bb94-c6287c3d2cec	9bdfa82d-13bd-40be-9a9b-a57c2a072351	Mahdollisuus ottaa isompaakin roolia tunnilla.	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	9	9	f
faa0c3c9-8ef1-4d36-90c2-5f1a1c8f995d	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	9	9	f
cfa6b527-29af-498d-8dcb-4603f540eb33	b05b035e-4867-40c1-965e-f60630bfa457	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	8	8	f
d0e2dbfb-6868-4393-b299-d9870c816687	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	9	9	f
bc50fd4e-1ac1-4c15-80ae-b395f2e19983	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	7	8	f
876a071b-b976-43d0-a653-1e486be9c00f	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	9	9	f
fcbd79b6-e694-43f0-ad0d-dd6406d60c1b	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	462597ed-4611-43cc-8934-bb00e8fe2a6c	t	8	8	f
0dfd6579-5d9c-4021-9257-9eb050baef7a	f198a966-c599-4457-ab33-bc075adefadf	\N	4dde4440-0413-45ca-a645-8f0adf8d2622	t	9	8	f
654ffd48-d96f-4f37-994b-c7072f1f64bc	74e88236-472e-41ea-9475-73c94489ae2e	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	f	\N	\N	f
7d8b19e1-cf97-4fb3-9843-c6995a8cb24f	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	f	\N	\N	f
d4cee8aa-96ba-4517-a6ca-4c8ef2a6b621	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	f	\N	\N	f
d313b3e2-a13c-4036-b278-a5b0bf71c4d5	404347be-f571-4254-b055-a06e9a9962f9	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	\N	\N	f
2fd4e83f-0291-4b86-a7b7-5dc9bddfe442	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	\N	\N	f
ea9f9ae4-139c-4f9d-9b75-9464407d0927	799b59e5-c962-4f19-9f9d-01518c57a550	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	\N	9	f
6bcd24be-811e-4fde-bac5-42b1c1829540	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	8	8	f
e3568877-36b7-46ac-8330-fbeb4b251adf	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	9	9	f
320df30c-36c5-442a-8c79-7b15856aa8d2	2e03b196-3248-4f14-9f2d-4661e503665d	Poissa	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	\N	\N	f
db696199-e1a6-4951-8267-85f18511bc6f	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	9	9	f
3d9958a6-58c0-4c03-b1f9-009574846039	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	9	9	f
09a024e0-b87b-4b7b-8dfc-0a55f4950ec5	b9266745-39ba-4be3-b1a1-421801b79832	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	9	9	f
fa6da169-14ab-49bf-ae05-114db345112f	686241e9-7a4e-4eb6-bc99-26699999001b	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	9	9	f
3a8381f3-337c-4270-8d3f-f5bfe44c31bc	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	9	9	f
c672a56f-0747-479e-9ac7-d82a74153e14	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	9	9	f
c73fc367-dffb-4562-8c95-aa5d3d8eb848	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	8	9	f
f4e49098-5dab-4c81-98f0-2bed180fd89b	1e2db5dd-c171-460e-bf48-4bc55f04f49e	Jonkun verran päälle puhumista ja härväämistä.	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	9	8	f
331f9ad4-8ed2-46a7-8021-d90b3639266e	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	d08a4fbb-2ac9-4703-aa59-fc4ca3052473	t	9	9	f
1ae62aac-4b34-4b48-a8ec-adf883b2a6c9	6743208b-a2b7-4951-9d65-602313f52be8	\N	4dde4440-0413-45ca-a645-8f0adf8d2622	t	\N	\N	f
f46cf7e8-7eca-4f3c-af5e-17ea4e77bd2a	2a397255-ca16-43dc-b47e-a977a917f032	\N	4dde4440-0413-45ca-a645-8f0adf8d2622	t	\N	\N	f
bb5e9630-dec5-4419-8e11-d209e764fac5	5387fbeb-b1bf-44b0-b87f-6bfba4e12996	oli aika levoton	448295e4-1d25-49ac-80fe-8d2a6a4eab5b	t	9	\N	f
9b63fba2-d078-46db-b15b-7627718f403c	82b08073-2503-4e40-b381-9f4c0987aa37	hyvä	448295e4-1d25-49ac-80fe-8d2a6a4eab5b	t	8	\N	f
7d337acc-1be7-4794-bda4-1ecda5cf55c0	4e00db97-fd93-416f-a349-655a240056ae	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	8	9	f
5b21b6ed-6f1f-4417-847f-080b937bf6df	f034aa91-48ff-496e-b25b-9c81eaaaa3e3	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	8	7	f
1450cddb-d555-43e9-8cea-e832ecb1b90a	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti ui hyvin ja jaksoi treenata koko harjoituksen ajan. Hän piti tauot sopivissa väleissä ja oli ystävällinen muille uimareille.	3b32ba2c-8635-438b-a1b3-015d980e0846	t	8	8	f
b7db3a94-6d36-46e0-9925-0a780bab0f3a	4c047cf3-edbb-4aa0-b879-cd84077a8257	\N	897dbbdb-d0ed-4270-8ce4-8c34c3d21c8e	f	\N	\N	f
f77a61ec-9029-492e-aee2-40c2b9fc383b	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo harjoitteli voimistelua ja kokeili erilaisia akrobaattisia liikkeitä. Hän ei onnistunut kaikissa liikkeissä heti, mutta oli sisukas ja yritti uudelleen kunnes onnistui.	48b97ca2-cc28-4f63-a14b-26fb8422ff2f	t	8	9	f
16769f99-9306-4173-b196-64d7a3acbc9f	b7b0fe22-b844-4a04-a292-3f2489f62118	\N	448295e4-1d25-49ac-80fe-8d2a6a4eab5b	f	\N	\N	f
54faefe7-7a09-450d-b3b8-28d2d3aac0a0	f4df5072-2986-4859-a7cc-6d06a6fe21ad	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	9	7	f
d0d6d08a-f178-4f7a-9df0-c6bd5b51ebee	3cb1e21e-1338-4fac-8380-c69946fc26c6	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	7	6	f
9d588864-2a7e-416d-a023-300b133a2427	6f8a2928-32c2-4e60-9c99-b8073fcd9d35	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	8	8	f
525e66fb-ab4f-4f7b-bce9-049caa04a11b	959e8e48-e3dc-4672-b263-cb8fcb8f3057	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	9	f
2d528757-722d-4aa2-9b6b-6eb98b75de38	ac72adf3-79e8-4479-a81a-be13b2603b33	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	9	9	f
c6ae381c-eb2e-48d7-a32e-a02970858c53	403d2ef2-23cd-437b-9688-43756e24a287	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	9	f
b0358a63-707f-460d-b938-a16ba640667a	c71cbbc5-3ad5-4c1b-a751-616db7f95169	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	8	f
91e5a833-5006-4c76-8eca-85cc8c261bcf	8585f583-e996-4173-acc7-e61b2992a3c3	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	9	f
1e3db587-b0f1-4e9c-a1a1-cf4c3aa65e8e	ed8b008e-b272-4a8f-a28b-3e10943865d0	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	8	f
733b663b-220c-4047-9749-9ea090635232	b924bdca-75a4-4049-978c-22b6d57a75ed	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	8	f
f80f5d1b-9fbe-4714-822f-6d8eaec2ce6e	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	f	\N	\N	f
9a171c5f-1391-47d1-b651-c5c9c7cfd928	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	f	\N	\N	f
53e9e37e-9d7a-4ceb-a541-2db55eb5b868	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	f	\N	\N	f
9fae15bf-e9ca-482b-8235-11b4eafb3ba8	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	8	8	f
29f8b58a-b5c9-4075-8bfa-5b4cec96bd59	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	\N	9	f
9460c858-88ed-47ff-b3de-245284bf7f9c	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	8	7	f
6e11390b-86a3-42ce-bf86-0efb9aea84de	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	8	8	f
4f2f1fbf-10da-4b80-9daa-206fef13c87e	a6eb654d-12a2-4350-a687-128314062791	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	9	8	f
420ecae3-1eed-4c88-9a61-f18414a33871	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	9	7	f
b3101e31-5f91-4f07-ae44-b2af76e5a60a	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	\N	9	f
59f5e68c-a1ae-418c-a734-ea55f22c738d	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	9	8	f
c03aebc8-5f87-4349-ad63-2dac0aaf29ae	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	\N	8	f
cb384dce-d3bd-4f55-a68a-67c3846f7f62	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	8	9	f
f93d115c-613e-426c-9c63-253a6c3419d0	8cc39180-992f-41be-88d7-d798fc88abe0	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	7	8	f
dea63bfb-29d8-43c2-946b-91b47eae9f05	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	8	9	f
82984ba1-6911-4a34-8d42-837e42a32556	789e18c3-638d-4651-be65-ec0a1661539f	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	8	7	f
a32a5b0a-f953-4520-8202-bab496d92ca6	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	9	7	f
c82db5c7-d513-4411-8174-1b6d084dbe7c	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	8	9	f
85a693b1-36ec-48dd-a458-30b3e1d24855	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	8	9	f
26678c3e-0cb4-4784-9706-03ba3b2c22a7	686241e9-7a4e-4eb6-bc99-26699999001b	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	f	\N	\N	f
2a989ab8-20ab-4a02-a6fa-ad75a4ae0bbc	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	f	\N	\N	f
3f381db7-d81a-4d4b-9bec-b649310cf35e	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	f	\N	\N	f
82d32c5a-1ed8-4263-96d9-a6018e0bb6ca	404347be-f571-4254-b055-a06e9a9962f9	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	9	f
6dcfa1b5-c8c7-4d5e-96f9-463d27dcb08d	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	9	f
4c4e2e8e-7805-4cb3-ab22-c074b1b15530	799b59e5-c962-4f19-9f9d-01518c57a550	Löi palloa kovaa ja yläkautta. Vaikeutti pallottelua ryhmässä.	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	8	f
de3dacf8-0f0d-4e0e-ae13-45adca6016ec	046a3d24-b93f-44d1-ae1b-aa628e141bae	Kiukuttelua. Tennis oli kuulemma perseestä.	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	7	f
5582326e-076c-411c-943c-efbc2f8e7497	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	8	f
2a462a92-593c-4d7a-bfc5-7e915f811721	2e03b196-3248-4f14-9f2d-4661e503665d	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	8	f
3270168a-6326-4222-a7d6-e3f778c36ce0	74e88236-472e-41ea-9475-73c94489ae2e	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	9	f
9077d3bc-6f36-4794-ad31-c176fb84a80e	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	8	f
83814989-febd-4b89-8685-70bf16f0a535	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	9	f
ea21cdcf-bc0d-4a25-9be5-49d5ddfc4d0f	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	9	f
2ed2d92a-853b-4e2b-a75a-08fe8d6f96b0	b9266745-39ba-4be3-b1a1-421801b79832	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	9	f
a7e64133-b44f-4d08-a4e0-ad74a50e8b82	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	9	f
1986d9aa-9c67-431c-8b05-0f559a25c252	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	8	f
ee47a48e-704b-4d17-8ce0-b9599d11d4fd	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	8	f
0f1038c3-9f5a-4263-b944-d45a742965fa	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	Kiroilua ja ikävää kielenkäyttöä	516e883e-2f2d-4cc6-be32-7ae7c52d31a5	t	\N	8	f
a0893e68-b5c5-4df6-9a9e-f7162ce3a8bd	4fa0db05-161f-4165-b00c-52528866490c	Loit omalla toiminnallasi positiivisen ilmapiiril tanssitunneilla	74f84fb9-64dc-4c1e-a880-ad98d9cf6b92	t	8	\N	t
cb123c29-abf6-498e-bae3-349839d7414e	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	f	\N	\N	f
0915d157-feb8-4321-9557-fa3e5e73275a	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	f	\N	\N	f
6ccbef70-1a81-402e-964c-138c9314ff2d	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	f	\N	\N	f
dd1e912d-4ada-4ec7-8968-635686a35236	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	Työskentelit voimistelussa hienosti eri välineillä	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	8	9	f
9c3e23ea-fe88-4cbb-bc27-67047c58cd3d	4fa0db05-161f-4165-b00c-52528866490c	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	9	9	f
9938ca3e-5a27-4688-95fe-ab15eb25115f	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	8	9	f
c89771d3-9eaa-416d-a9c7-f48879b18204	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	9	9	f
385db013-ecda-40b8-a080-e7574e32314a	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	8	9	f
50e8dff6-4012-4bce-8ecc-b66248be5df7	a6eb654d-12a2-4350-a687-128314062791	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	7	8	f
e4783357-2c33-4e94-a34d-0e8ee5ed228b	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	8	7	f
d8aa06ee-7294-4cd7-ab3b-010f8933ac68	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	8	9	f
7583b463-14b5-4807-b4e6-18c91f0b1f1f	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	\N	\N	t
62937940-fd4e-42e4-aeb7-88c256324141	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	\N	8	f
4e141645-1a57-44f2-acce-0311c9a687dc	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	9	8	f
ba6134d5-734f-47aa-be90-1dc0d4a42f4e	8cc39180-992f-41be-88d7-d798fc88abe0	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	8	9	f
e594c9ac-118d-44d9-8074-ce0f6f563b6d	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	7	7	f
4c48d399-e793-438e-a740-48477d3123ae	789e18c3-638d-4651-be65-ec0a1661539f	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	7	7	f
27e5b8de-3e91-442f-a213-6b5d0f7dc25f	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	7	9	f
c0f48c02-ad3b-4fef-bb97-a7895f891dec	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	\N	8	f
e7b462d2-2f2e-404e-812b-5f3ec3d13f84	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	d473d712-cbe8-4568-bf44-e606e8ddee0d	t	7	6	f
829003c7-db00-4bbb-acca-1ec2d5a0218e	28426aca-f675-46f7-bafc-dc5f7eb649c5	\N	0f675408-4e6d-4d94-b2be-4b1861874f24	t	\N	\N	f
f1f4aabd-5c34-4b0c-8c10-07acce19d73a	251b27c1-5684-424b-b17b-7257a311bd33	\N	0f675408-4e6d-4d94-b2be-4b1861874f24	t	8	\N	f
35fc71ec-e8a0-4d9e-bae5-959f9c3d833b	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	0f675408-4e6d-4d94-b2be-4b1861874f24	t	9	\N	f
d529e7d6-91fc-4e05-b395-0c4953fcdd2d	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	0f675408-4e6d-4d94-b2be-4b1861874f24	t	8	\N	f
ad763ade-e682-4b93-b274-1021d67aba2b	9c66fa7f-c08f-4905-9c54-5da739156493	\N	0f675408-4e6d-4d94-b2be-4b1861874f24	t	9	\N	f
f93ca2bb-255b-434e-a8d4-40e677068cef	04629d10-42df-4873-bb8e-a38230d93b8a	\N	0f675408-4e6d-4d94-b2be-4b1861874f24	t	\N	\N	f
fcca9c17-ea47-4faf-b921-0c830d32750c	b8a8e21b-2e09-4855-a354-0c48800913c9	\N	0f675408-4e6d-4d94-b2be-4b1861874f24	t	9	\N	f
307f7c68-2142-410b-831b-1fe86480506c	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	f	\N	\N	f
9e222d75-ce8c-434e-8448-034acc422899	a6eb654d-12a2-4350-a687-128314062791	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	f	\N	\N	f
7d6b0c68-8cf6-4062-9518-10aadbf67781	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	f	\N	\N	f
f3526e16-7c51-4125-9f4e-a84a20c3b0b6	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	f	\N	\N	f
817b6eee-702a-405a-85f0-a98ba5443995	4fa0db05-161f-4165-b00c-52528866490c	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	\N	8	f
4f23649d-e9f9-4549-8a47-fac4a0b903c9	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	7	8	f
4b20ff7e-ca29-4a43-a4a6-1358a3018999	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	7	7	f
38e9ab39-45c6-480e-81b3-c6aaff3cb9ec	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	9	8	f
513af6ab-6751-4883-8855-999522b80569	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	\N	8	f
2dcbc300-af30-4b5c-b88e-737c79964f19	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	\N	\N	t
0d13f824-f9f6-4e69-a789-61bd1c7eec68	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	8	9	f
199203a4-c880-4a04-b480-1fd786e9a062	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	7	8	f
e87fa2c6-d90b-4857-803f-80775a809fa4	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	9	8	f
55504e23-ee5f-4667-8f19-9c99af6c54e0	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	8	9	f
6b45952d-132e-4499-b8aa-f8cf509ecc47	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	\N	\N	f
e4881005-9cbe-4aaa-a9bc-ab2f517d611d	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	8	9	f
a9423bef-311b-4329-8775-883df3ee7e07	8cc39180-992f-41be-88d7-d798fc88abe0	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	8	9	f
a84722cd-3bab-4b3a-9157-3b862ad0b37a	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	9	8	f
293a5ac7-fc8e-4e46-a7ba-b49597652b0e	789e18c3-638d-4651-be65-ec0a1661539f	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	7	8	f
4d00807d-a7ca-45ce-9513-c063f49ab1ba	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	4a59ecd5-3ab8-4006-b897-c5daa1641016	t	8	8	f
7b5d4203-099e-462c-9ff1-9fc02066ed68	4fa0db05-161f-4165-b00c-52528866490c	Vahvuutesi pääsee esiin palloilu tunnilla	80f640f0-d041-41f1-9817-6c18f415a068	t	\N	9	f
5d93fe13-309a-444a-bc26-f8f1becf6b1a	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matilla meni tosi hyvin tänään. Maila pysyi kädessä ja tekniikka oli kunnossa. Matti kannusti myös toisia mukaan pelaamaan	87721bf9-2237-4429-9e23-587ae97d05c1	t	8	9	f
fae60611-97db-409b-8672-03937db269ef	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa treenasi perusvoimistelutreeniä ahkerasti, mutta tarvitsi apua muutamissa liikkeissä. Hän kuunteli ohjeita ja pyrki parantamaan suoritustaan.	b1876b9c-23cd-46d2-aa93-b7980fbca7a2	t	7	8	t
67cabdd3-f315-48fd-9232-ebbd2520e576	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo harjoitteli perusvoimistelua voimistelusalilla. Hän teki erilaisia liikkeitä ja hyppyjä, mutta tarvitsi vielä harjoitusta tasapainonsa säilyttämisessä. Hän yritti parhaansa ja kuunteli ohjaajan neuvoja.	b1876b9c-23cd-46d2-aa93-b7980fbca7a2	t	7	8	f
f0d42430-86f6-49b3-acf1-ab817034c524	4c047cf3-edbb-4aa0-b879-cd84077a8257	\N	4e2afd6f-5320-419c-bd50-314fcddaee44	t	\N	\N	f
cc1c86c6-ff39-4682-aef2-789a39892ea2	75bba92f-9f9c-47c0-a89a-2add75007cf6	\N	4e2afd6f-5320-419c-bd50-314fcddaee44	t	\N	\N	f
985f1805-244d-484e-b217-c5faac038b13	a520a370-e1ec-4742-bcf8-1a34a4434485	\N	4e2afd6f-5320-419c-bd50-314fcddaee44	t	\N	\N	f
602a4c25-96b0-4670-9274-8036deab1eff	e0c8876f-57f1-43dc-9950-3851d82380fe	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	8	8	f
852424c4-33dd-46de-b7ea-cf480a886c97	fa71c8f8-45c8-4a24-b0fb-6a0ecd67af3c	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	7	7	f
cc483b48-6e81-4c32-9852-f88f00cacfdf	bdbdbd45-458b-41df-ba2f-ab5e4406bb26	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	7	8	f
3b825da3-c96e-4c75-9e27-bcd8bf71b803	e3e017a1-6c30-4320-8ccf-3b2b276e8128	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	8	9	f
cb314a1c-b8e5-40ac-896f-d21654c65b6b	139ee728-7bd5-4ed5-b88e-65e455770b9f	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	9	9	f
bd618027-a2bd-46b2-beb9-9a1bf565b303	05d139e2-1d0d-44d0-9d55-8640833f9067	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	9	f
abf92f4c-e7d7-4f82-8a6b-ef39753e6275	fe65a7a8-1054-4dce-a078-47e176bca0d3	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	9	8	f
e480788a-beda-45e2-91bd-09dd47250994	3ff48490-fb0c-4328-8b8e-010efa10de13	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	9	f
cc751cfe-f204-406a-adab-07255bc896eb	394795ec-5959-4d19-9ee5-362213b77dee	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	9	f
4e4289c1-0693-44a8-b02b-3f9b8b04da88	53394cde-fdca-44d6-bae2-9c928f2f23a0	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	9	f
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
29be1446-9a9f-4962-9291-0f220e10bb1c	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	9	7	f
2df23eef-ed67-4b0d-a780-4608e5e5796c	4fa0db05-161f-4165-b00c-52528866490c	\N	2f72c229-ca83-4d7d-8620-11e6e77a5897	t	9	\N	f
1fd339cf-b754-4ccf-b3c1-e18043272221	4fa0db05-161f-4165-b00c-52528866490c	Oli ilo nähdä miten kannustit ja tsemppasit muita	264c294a-1b7a-403a-8d88-eada1ec58baf	t	9	\N	f
181f5af1-3eb4-4175-ae06-775799e6db73	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	9	9	f
6ee42969-23e1-4a56-805c-420c3d13a858	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	9	8	f
c8d0404c-ba9a-44aa-b859-2c5798aaa89d	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	9	8	f
16c313b0-3df4-45c6-870c-e9ae48e42b1d	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	9	\N	f
1a6d8c3b-0177-4990-90c8-3e556e0771ad	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	\N	9	f
60515f8a-cbb1-43fa-be73-d36b6cb16946	a6eb654d-12a2-4350-a687-128314062791	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	9	\N	f
3199eb4c-ff35-4afc-8300-25c23bf5656a	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	8	9	f
95b8a2dc-e90e-47b5-adbe-4626f78aa716	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	8	7	f
84994046-b2a5-473d-8c6e-eeef9c73fa16	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	\N	8	f
dca89a9e-6bfb-43a7-9737-2eb19a9d2389	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	9	9	f
177d6522-0c93-48cd-b458-96363ad92a91	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	8	\N	f
15f58eb0-cbc7-4475-b66c-1a1751db7fbb	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	8	9	f
313e260d-ef83-4c3c-801f-d8051a9138a4	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	\N	8	f
f811ac82-7e0d-469e-ba5d-ae099d1b96fd	8cc39180-992f-41be-88d7-d798fc88abe0	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	9	8	f
1130536d-414c-445a-be9d-77d19a0cf147	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	7	8	f
b9d679fb-e09b-4bf4-a6f7-348f8b996b08	789e18c3-638d-4651-be65-ec0a1661539f	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	8	8	f
190f2581-69bc-44b3-b7a3-6c8d7ab3a984	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	9	8	f
15332c53-64af-4472-ab03-7eb686a542fd	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	7	8	f
3b1257a9-1fb5-4d7c-91b3-b2e8bdf34670	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	264c294a-1b7a-403a-8d88-eada1ec58baf	t	9	8	f
6dd34792-8f45-4318-8e90-a49338d5c053	404347be-f571-4254-b055-a06e9a9962f9	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	9	f
7d329c7d-393b-40de-9db3-be0df66263d6	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	Hyvä tsemppaus taidon harjoittelussa. Jaksoi yrittää ja kuunnella ohjeit.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	9	t
8a53aff9-c341-4137-8466-8c20c1d0f8d3	799b59e5-c962-4f19-9f9d-01518c57a550	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	\N	f
12433dd2-2c34-4895-b6c5-20a175a24e5c	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	Hienosti mukana frisbeegolffin pelaamisessa. Turvallista toimintaa tunnilla.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	9	f
ef391480-5101-40af-ad08-9d3d25ed832b	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	Aktiivista osallistumista tunnilla.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	9	f
88d8ae4f-947a-4745-bff8-6b59a20acebb	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti osallistui vesijumppaan innokkaasti, mutta hänellä oli vaikeuksia joissakin liikkeissä. Hän ei kuitenkaan lannistunut ja yritti parhaansa.	9e17426f-5a97-4d62-bca8-25a9312e1367	t	7	8	f
069441fa-044d-4361-87d5-cc9f698b9a11	4c047cf3-edbb-4aa0-b879-cd84077a8257	Uintitreeni ei sujunut parhaalla mahdollisella tavalla. Liisa ei ollut kovin motivoitunut ja hänen tekniikkansa kaipasi parannusta.	3b32ba2c-8635-438b-a1b3-015d980e0846	t	6	7	f
a9bec995-c326-41b9-8ac5-de637ab4b727	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo pelasi pallopeliä hiekkakentällä ja kokeili beach tennistä. Vaikka laji oli uusi hänelle, hän oppi nopeasti ja kannusti muita pelaajia. Tunnelma oli innostunut ja hauska.	c0076c27-405b-4dcc-a944-323b279d0986	t	8	\N	f
6c5a0f9d-141f-4e9b-9806-6054f1fc798c	404347be-f571-4254-b055-a06e9a9962f9	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
a3321da9-b510-463e-9ab8-dc079decd2b1	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
02222f2a-248f-4634-b263-cb642ce5c531	799b59e5-c962-4f19-9f9d-01518c57a550	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
4b358baa-6e00-4f31-a4c0-13d364456fe8	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
b6841abc-cc3d-42dc-9f8b-5fddb125f49e	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
8afbf777-b998-4671-ad3a-46251a58db50	74e88236-472e-41ea-9475-73c94489ae2e	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	f	\N	\N	f
a49de4aa-b1f6-44b9-a777-7c16f34b27b8	2e03b196-3248-4f14-9f2d-4661e503665d	\N	e21cd4c8-20e1-40ac-9a7e-cafc322dac96	t	\N	\N	f
70570323-da1f-4912-a94c-9002f6501645	2e03b196-3248-4f14-9f2d-4661e503665d	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	9	f
41f64529-c798-4e32-8e1c-f6feba989851	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	9	f
cfc37520-8138-4fc7-99bb-c268ca33f077	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	\N	f
b76b336e-9068-4962-8b27-0eaf04b86a96	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	Erinomaista työskentelyä itseohjautuvasti.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	\N	f
c8bd30da-2490-49a7-bb6a-04a3436a043f	b9266745-39ba-4be3-b1a1-421801b79832	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	9	f
c78eef6c-26f9-4ce7-b49c-018b647e30ae	686241e9-7a4e-4eb6-bc99-26699999001b	Pieni väsähtäminen loppu puolella. Lukuunottamatta sitä, aktiivista työskentelyä.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	9	f
2a33b878-81b7-479f-8d59-b2fa32da1edc	e9969c0d-58a3-4bcd-b301-5690b7290aa5	Itseohjautuvaa ja turvallista työskentelyä tunnilla.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	\N	f
3b0849bb-65ef-4528-aae5-6b59c4d1b552	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	\N	f
18fea79a-caf0-48db-bb6f-9042d2608d6e	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	9	f
e60292f2-6f6b-488e-a5c6-6fb0b5ff4706	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	9	f
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
8bf679eb-c7e8-4301-8072-6d8ea8b49422	dccdded4-f3c3-4949-937a-cfd65fae056d	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	f	\N	\N	f
1503807f-6d67-4f3d-a905-1ef56853f5f7	b580b35d-10c3-4ce3-9f87-37ce3a436eaf	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	8	8	f
26e27741-4663-4be8-9543-e88e9e0be5df	2abacf8c-b973-4678-9504-e30861fdcba5	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	7	8	f
2acc39e1-5897-41e2-846d-2bebee6848bd	e1ceb28e-8139-41aa-bf55-3ef379c568ab	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	7	7	f
054610f5-f586-426f-8319-2fad89c4eaa0	28bf177a-d273-4b22-963c-4206fcffa9cf	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	9	8	f
98aa5230-fa14-4281-bdfa-f00e27c802b4	476293ef-adda-4c53-9a52-f977cb79d14e	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	9	9	f
6e2b87ee-c935-477c-95d0-930e2b52c50a	89864582-b6ce-4434-97ee-14767b35e1d0	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	\N	9	f
37eb3f53-12bc-4633-b605-8fdb91feb7bf	b7be5ecd-cc80-443f-8a6a-8125c91da527	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	f	\N	\N	f
82d8d327-fabf-4da8-8b10-04dd0bc21acc	1199e08d-681c-4104-b883-89ebd887d53e	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	8	f
8785072b-f245-4f80-a244-d092bc03f3f2	fb382ba6-005a-42a0-9882-9735de457bc0	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	\N	9	f
4bb5a70e-4d7b-449d-a814-962d8fe5cb7a	1d0f2b30-e376-4890-86af-e2585b65ee33	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	8	f
a2e2e7d3-ffb8-47b4-98ea-ba7c979a8211	8fc516e0-c5ba-4181-a5cd-01f85629b4ac	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	8	f
23e2acba-dc95-4b1c-87bf-c1b996cb56a9	41dbd3de-0883-454d-baaf-7613476052f3	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	7	f
a707554c-3cb3-4575-8be2-34fcd2f019f6	42a4fefd-c72e-4707-b0d6-14fd9bd80379	Hyvällä asenteella heittämistä. Työskentely tuollaisella tasolla mahdollistaa oppimisen.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	9	f
1a9d7061-85a6-4089-a66a-2dd5d8ecb63b	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	\N	f
2d6579d0-2f38-4b02-94b1-c12e83f40ff0	74e88236-472e-41ea-9475-73c94489ae2e	Pieni väsähtäminen loppu puolella. Lukuunottamatta sitä, aktiivista työskentelyä.	30371d14-fe98-4817-a945-0f0c5bad3b84	t	\N	9	f
e553f32d-e1a2-43b7-b2ea-4d2794ebb464	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti juoksi hyvin ja jaksoi koko lenkin ajan. Hän kannusti muita juoksijoita ja piti hyvää tahtia yllä.	1852c993-c666-42e9-8862-e2b9bd8f8a8d	t	9	8	f
2dcdf7eb-f80d-4974-8c9e-34796b2e68f6	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa juoksi peruskestävyystreenin aikana, mutta hänellä oli vaikeuksia mäkien kanssa. Hän pysyi kuitenkin positiivisena ja jatkoi yrittämistä.	1852c993-c666-42e9-8862-e2b9bd8f8a8d	t	7	8	f
1e8365f7-aab3-4fee-9b08-6771c2f38807	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui luontojoogaan ulkona puistossa. Hän teki joogaliikkeitä rauhallisesti ja keskittyneesti, nauttien samalla raikkaasta ulkoilmasta. Hän auttoi muita osallistujia tarvittaessa.	d54b8c42-67e5-49a5-85f3-f163230de4a7	t	8	9	f
2b71be3a-c5a0-4787-86a4-5809ab5da974	31a2c199-fb37-4e7c-afb7-2619cc4f8260	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	10	7	f
0fe73e3d-23c5-4e56-84ad-a5020273c4f7	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	7da6191b-7f47-44e2-a246-68effa8168dc	t	8	9	f
a5d24192-ddd7-4c76-9865-fc84e9ec8f3b	e7eb8c8a-033d-416a-848a-6da0d65cbf8e	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	f	\N	\N	f
bd8e3d23-98f4-475e-a867-4ffca3964bd8	fcabdea5-1224-442b-8142-62be862508e3	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	\N	8	f
a383b2e8-73c7-414c-89cf-30bfaae52e20	0d894576-e308-4a66-a809-d8530eb5753e	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	8	9	f
6055e60d-1b6c-4749-af87-09eb430618e7	72a94026-88ad-4cbb-b1e4-e6aa917db696	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	7	8	f
30488455-5f13-4101-a325-986b52a152dc	d1c1ad1a-62d0-4d6b-bf48-2dead02ed1f6	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	9	8	f
c645acf3-e553-45da-a771-c59b708ac4bf	5092be97-7e39-4aa6-bd2a-a517b48ff540	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	f	\N	\N	f
302fb35a-8e4f-455c-9678-d7348253ca08	264fe413-3243-45aa-809a-0f752bce3b4a	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	8	f
dc0d8d99-fc94-4cca-b436-dd1884eca852	71f99d4c-e3e1-4c88-af9f-2641131f3422	\N	b7990e52-4204-4f2a-8e1f-aa9212420eba	t	8	9	f
aab0062f-7eca-4f25-8efa-9c67cb336c02	dccdded4-f3c3-4949-937a-cfd65fae056d	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	9	7	f
c5a7d4f3-8cd9-421f-b64f-15b11661e252	e7eb8c8a-033d-416a-848a-6da0d65cbf8e	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	\N	9	f
907468dd-93f4-4870-975b-adfe5b2aacc3	241042e2-7fa6-413a-a501-ab6c28dd86e7	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	9	8	f
8dd66802-72aa-4b43-b295-2758a187fbea	16530cbd-5612-4a8c-920c-9744e32be7bc	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	8	7	f
1a917ba2-0e21-460b-be54-7960bf2249e1	f18a8f1a-a17a-49da-8cc1-3603b4c21dc8	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	6	6	f
3eab2d0d-a4d8-4a20-bc28-5dd8e4d1ae0b	8cb49f42-d3d0-4a6a-9ac1-9569aed4991f	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	\N	8	f
6e9425c3-6954-41b9-bd62-16be75b63b84	8a429230-9011-476a-9f6f-15494ecf57f2	\N	be216fb7-97e2-45b0-aed5-40e935bf7707	t	8	9	f
87e6f0cb-2748-4bdb-8bfd-0eb27633b77e	4d9888c7-3be7-4fec-a5d7-07759cdff766	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	8	9	f
e930ec66-361f-4877-8e02-8021ee567297	436f9966-c204-4794-89fa-e5e1a30b6247	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	8	8	f
9ed0f5b2-4bee-4c11-9fd5-a6220dd60d9a	5c10a0b2-145a-4701-a64c-80a9369890a3	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	8	8	f
5f1705ca-a09f-4939-ba55-ac92529d125f	8c057200-e725-4e08-b93c-88bd891fe862	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	9	9	f
d4220810-4c4a-4b72-ba66-246d2cb7f8eb	ad4248b3-989a-4794-844e-af4cb598a1e7	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	8	8	f
58013876-d5cc-45f5-89c5-bc779a3e8f1c	61780abd-03a9-4ce4-89cc-059b5a2f5177	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	f	\N	\N	f
a1adc71a-db8c-4d84-b6f7-1b664fa74031	92eecb4d-b8c2-43ce-ac29-eb7a46566311	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	\N	7	f
fec7ef99-c4f9-43ae-a8aa-a951bf2abc52	e17db94c-c058-4163-b1df-3824f2f732b8	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	7	8	f
4af929f0-de7a-4984-9bb8-4b4fd3cda9ad	139ee728-7bd5-4ed5-b88e-65e455770b9f	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	9	8	f
b5076221-51d5-426f-9d36-46cf8dfd2321	28bf177a-d273-4b22-963c-4206fcffa9cf	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	8	8	f
9a1c5abd-dbd4-4075-9ea9-9bc88abb0054	48f6a291-18c4-4349-8578-e9d40a016f99	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	8	8	f
95cb20c7-4e44-4707-8de3-0a0769a719e0	a8df8354-0125-404f-a1d8-5584462a5b82	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	f	\N	\N	f
72a49d4e-eaed-4d11-8c4b-ab6cf17f8612	fa71c8f8-45c8-4a24-b0fb-6a0ecd67af3c	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	8	7	f
bfac8902-60fa-4b3c-b70a-8b50bd34df28	5f877b5d-eaeb-404c-b3cc-d51a467fa428	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	8	9	f
09db7059-1706-4468-ac97-80f8673fc66d	fcabdea5-1224-442b-8142-62be862508e3	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	9	7	f
e1ad0417-01ac-4f6b-8c22-574f33db0c85	b580b35d-10c3-4ce3-9f87-37ce3a436eaf	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	\N	\N	f
a5692294-4cbe-4153-bf1c-c334f7ae8658	f034aa91-48ff-496e-b25b-9c81eaaaa3e3	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	f	\N	\N	f
801b4d88-f01f-449e-9553-5484c7b2830f	bf09f310-3700-49db-b3f3-384cd041e6f2	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	9	9	f
73b792da-7f6e-4926-8a67-b7c4f5a359a5	eb6a2d6e-33a5-4ad2-95ea-a39741e9b905	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	9	9	f
33a9f879-e111-4284-af3e-8f3d12e8b209	7df2a50b-b064-49a7-a5d5-747b117f107c	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	f	\N	\N	f
5f58c1c0-7999-473f-83b2-b45a03bdce29	fe5ede8f-8290-4b69-b575-75aeaab46f2f	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	8	9	f
65162fb9-d938-4d5e-a80a-f6cd9c7efd37	50d7ab1f-3cf2-4e10-9286-36df63a6e81b	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	\N	8	f
9ba1eb11-868d-4819-a494-1be615fff538	28426aca-f675-46f7-bafc-dc5f7eb649c5	\N	4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	t	9	\N	f
8ead84e9-d6d9-4468-9bff-b6a8946a8eae	251b27c1-5684-424b-b17b-7257a311bd33	\N	4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	t	8	\N	f
5a3bb634-5db2-4ca3-aae2-e90b451253b3	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	t	9	\N	f
135e8102-b719-4e4a-9858-cc568e26c340	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	t	9	\N	f
6349dc8b-b1e6-4ba5-86ce-917ebcbfa424	9c66fa7f-c08f-4905-9c54-5da739156493	\N	4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	t	9	\N	f
d77838ac-503c-48cf-9b97-8a6927c47932	04629d10-42df-4873-bb8e-a38230d93b8a	\N	4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	t	9	\N	f
d6a3b7af-9bba-4e87-9b0d-db9881b726ce	b8a8e21b-2e09-4855-a354-0c48800913c9	\N	4cd87a2c-19d7-4c7c-ae7e-da90e70cd8fe	t	9	\N	f
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
109f5a84-f0df-45ce-a30e-22b122359f7c	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa harjoitteli latinalaistansseja tanssitunnilla ja oppi nopeasti uudet askeleet. Hän auttoi muita oppimaan ja piti tunnelman kevyenä.	beee4734-91f2-424a-b01d-70bb610bfcbc	t	\N	9	t
6258b7c3-dc4c-449f-8a62-a20e66704946	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui uintiharjoituksiin ja näytti erinomaisia taitojaan eri uintitekniikoissa. Hän ui nopeasti ja kehitti tekniikkaansa jatkuvasti. Hän myös auttoi ja kannusti muita uimareita.	ffcf41a8-c5c9-406d-8062-a9f9f40bf827	t	\N	\N	f
26f23f78-75bf-4a89-84de-52eecb22c2ae	df05106e-6e95-4a82-af93-c5f6f8a58047	\N	566dc2b8-667a-428f-bf64-2947669dae99	t	\N	\N	f
8a6472be-f0f3-4dc8-802a-78da2aa43ee1	24bd87c1-454d-412e-a843-595ffdc4892b	\N	566dc2b8-667a-428f-bf64-2947669dae99	t	9	8	t
90e84a0c-4deb-450b-99ff-3fe306da10bf	e459564c-d6aa-4fec-8790-508218a41435	\N	566dc2b8-667a-428f-bf64-2947669dae99	t	9	\N	f
50fa6540-b3dc-4018-a522-8f6afc79de8a	c99cbc5a-d88b-4022-bc5a-aae33f51e30b	\N	566dc2b8-667a-428f-bf64-2947669dae99	t	\N	\N	t
50e21780-1063-4af1-b3db-8d511c4ed236	05795f8f-d6de-4ec8-88fc-0df98df77292	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	7	6	f
dba51af8-788e-4e64-a5d7-c5fe4d50961b	fe5ede8f-8290-4b69-b575-75aeaab46f2f	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	f	\N	\N	f
0a7440e7-a965-45be-928d-2bbe2ab1c491	52c3b46f-5204-40ad-9150-17b0a7077eed	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	8	7	f
47c12c6d-6c71-47cb-8fa5-9a9c51802547	5de52dab-1765-4acf-8020-053b68336487	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	8	7	f
5757ef49-18d9-4eab-91f2-b2d055ada00f	48f6a291-18c4-4349-8578-e9d40a016f99	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	9	8	f
2003cbbd-ca5e-47af-a9b8-54fe603aa658	df5032e6-8740-4c54-a869-03e11dab715e	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	9	7	f
d99f0db9-57fd-46af-be46-bbd60c5c1f78	79171cdb-2833-4e72-bbf7-504cd4304ed1	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	8	7	f
8321f0f8-8080-4d3c-8c8a-d2cbaff3940c	9aaed25e-67f8-4d9d-ab09-96d4607a98a7	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	7	7	f
78a018b3-4074-4caf-b42a-0a154a1974b9	d63a461f-521c-4430-8e64-c4a05a9d6114	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	9	\N	f
9e0627b4-6f55-419e-a32d-e2a6d8bc2e49	75c425cd-2ba2-433d-a0b1-cfaca6290abd	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	8	8	f
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
7e5bf21c-7997-406b-b36b-87dc62b0d179	28426aca-f675-46f7-bafc-dc5f7eb649c5	Taitavaa voimantuottoa koko keholla eri välineiden heitossa. Nopeita katkoja soikkiksen pelaamisessa. Aktiivista osallistumista työskentelyyn läpi tunnin.	02c4cd17-9f85-4047-9db1-4b13bc0da999	t	\N	\N	f
ecf445c3-0d4a-497e-9129-7d8845e31652	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	Erinomaista työskentelyä. Pystyy toimimaan kaikkien kanssa tunnilla ja on aktiivisesti mukana työskentelyssä. Heittäminen luonnistuu eri välineillä oikein hyvin.	02c4cd17-9f85-4047-9db1-4b13bc0da999	t	9	\N	f
2ce4cac0-f834-48eb-8e45-2f87ba3ffe00	251b27c1-5684-424b-b17b-7257a311bd33	Erinomaista työskentelyä. Pystyy toimimaan kaikkien kanssa tunnilla ja on aktiivisesti mukana työskentelyssä. Peleissä antaa kaikkensa joukkueelle. Hienoja syöksyjä ja heittäytymisiä. Heittäminen luonnistuu eri välineillä oikein hyvin. Työskentelyssä näkyy halu oppia uutta.	02c4cd17-9f85-4047-9db1-4b13bc0da999	t	9	\N	f
c0ec6174-3b6c-4d80-a358-7b9cd6c95749	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	02c4cd17-9f85-4047-9db1-4b13bc0da999	t	9	\N	f
fa7cb005-1cbd-49e5-bab1-ca4f5a500f66	9c66fa7f-c08f-4905-9c54-5da739156493	Työskentelyssä näkyy halu oppia uusia asioita.	02c4cd17-9f85-4047-9db1-4b13bc0da999	t	9	\N	f
9d9f6378-bd5d-499a-b1b9-b2b7249e833b	04629d10-42df-4873-bb8e-a38230d93b8a	Taitavaa pelaamista ja pelin kulun hahmottamista. Nopeita liikkeitä ja hämäyksiä! 	02c4cd17-9f85-4047-9db1-4b13bc0da999	t	\N	\N	f
ce815f42-4a0e-48e1-9d3b-ae14dc98a901	b8a8e21b-2e09-4855-a354-0c48800913c9	Keihäs lähtee todella sulavasti liikkelle kädestä koko kropan voimaa hyödyntäen. Tunnollista työskentelyä.	02c4cd17-9f85-4047-9db1-4b13bc0da999	t	9	\N	f
6467ebe5-586a-409e-b8ab-7a5d694cacfb	75bba92f-9f9c-47c0-a89a-2add75007cf6	Vaikka Matti ei ollut aivan parhaimmillaan latinalaistansseissa, hän osallistui tunnille positiivisella asenteella ja kannusti muita.	beee4734-91f2-424a-b01d-70bb610bfcbc	t	7	9	f
01353b09-6f2a-4a86-b4c8-a34080192b83	36f9a75d-23d0-4a2c-b6c0-e04cee9b1e26	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	f	\N	\N	f
e0d0ac7a-0a0e-427b-8dab-9c726f47c493	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa osallistui vesijumppaan aktiivisesti ja suoritti liikkeitä hyvällä asenteella. Hän auttoi muita osallistujia ja kannusti heitä yrittämään parhaansa.	9e17426f-5a97-4d62-bca8-25a9312e1367	t	8	\N	f
719d059c-d01f-4dc0-af85-c256f999653d	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui peruskestävyystreeniin juoksuradalla. Hän juoksi noin 5 kilometrin lenkin, mutta hengästyi muutamissa mäissä. Hän kannusti itseään ja jatkoi juoksua.	1852c993-c666-42e9-8862-e2b9bd8f8a8d	t	7	8	f
68a6ddc8-94bf-45e9-8f34-a0df7d43ebcd	df05106e-6e95-4a82-af93-c5f6f8a58047	\N	3ca2f6e3-1bcc-4ab3-ba64-1440cdaf8019	t	\N	\N	f
a4bcadee-fe8e-4012-899b-85c5adfd7a02	24bd87c1-454d-412e-a843-595ffdc4892b	\N	3ca2f6e3-1bcc-4ab3-ba64-1440cdaf8019	t	\N	\N	f
ad192493-5fcc-428e-bb21-f5ee5f0dcc2b	e459564c-d6aa-4fec-8790-508218a41435	\N	3ca2f6e3-1bcc-4ab3-ba64-1440cdaf8019	t	\N	\N	f
c79125aa-1d2b-4b1e-ad52-e9ed236dd8fe	c99cbc5a-d88b-4022-bc5a-aae33f51e30b	\N	3ca2f6e3-1bcc-4ab3-ba64-1440cdaf8019	t	\N	\N	f
5597818f-7940-453e-a1de-728bbd1c7042	ffb872b2-2bb5-4267-8e92-0514977ba44b	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	9	9	f
6af71b31-56b1-4d87-94c9-7edde5812df8	5f877b5d-eaeb-404c-b3cc-d51a467fa428	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	8	9	f
a8b68856-75f3-4129-88eb-81a5c246bb3e	7ac64248-1e14-4e88-ab15-a9a552d3811c	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	9	8	f
1aa02c67-fbd6-47c8-ad49-2f17f406fb88	e2500f5c-1aea-4ffe-9f18-9b86022fce62	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	8	8	f
a58b5faf-df98-4397-bdf6-fb31ed2a5720	4d9888c7-3be7-4fec-a5d7-07759cdff766	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	8	8	f
afa0ec7b-d5e3-4bff-993c-d4e5c215b8a9	892e5773-39a1-4412-84cc-c219683ca4f9	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	8	8	f
65899427-2879-4661-a460-d3e7c2c536b7	b5e44718-3033-432f-83a9-81edc4a14d47	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	8	8	f
d7545555-17cc-4ecc-81b7-74546893be93	91a52f1d-e774-4925-8a10-9f5d7d7995fc	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	8	7	f
495ca730-17f1-4d48-9812-508ba5050235	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	7	8	f
5bbb5b8a-0c92-4971-9fa2-63610a735bc8	e2c637e8-f394-4a5a-926f-1f9888a7dc98	\N	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	f	\N	\N	f
f1d831b5-a66b-47bf-96e0-dca32eceb138	d07f9606-ddee-4f35-8d35-b8358dc9fc75	Hyvää työskentelyä omassa porukassa. Aktiivista työskentelyä.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	\N	f
a8774b36-56c6-498b-bfad-8b344bff64ea	9bdfa82d-13bd-40be-9a9b-a57c2a072351	Kavereiden kanssa istuskelua syrjässä. Vähän frisbeegolffin pelaamista tunnilla.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	7	f
5b923c44-5376-4089-822c-1ba943554813	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	9	f
c5087ea0-0b78-4e3f-97d8-89fa4c161cf1	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	8	7	f
eb849d17-d58d-4e11-85cf-676a03b7d62f	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	Ei paikalla	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	f	\N	\N	f
f37029ec-6468-4947-885f-9b439bda4910	24007058-ca39-4c69-9004-c3d29b441fb3	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	f	\N	\N	f
000ae700-f2b9-414a-b457-c7e20871ca2e	350594d5-5cd4-4033-9294-6b50102afe7d	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	8	8	f
59ce83ba-b499-47d6-8cff-890e4850e0d0	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	f	\N	\N	f
a5109c7a-bc63-4643-a301-9997faa6b890	e2c637e8-f394-4a5a-926f-1f9888a7dc98	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	7	7	f
c11c46e4-fd5e-48cc-b758-4d3f05af4c80	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	8	9	f
4df3d123-bc17-4666-a378-30ef85c80b58	2dd7377d-323a-4e73-9a14-5962ec2b8a58	Ei paikalla	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	f	\N	\N	f
40c17154-dbcc-43d8-b9cf-6280c0574c27	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	8	9	f
37c08e9b-c458-4838-8e15-eed5857691f1	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	8	7	f
e6d08098-12fd-442e-b590-b9d21736ed07	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	f	\N	\N	f
76927450-cd6e-440b-b4b5-02f167ab8610	b05b035e-4867-40c1-965e-f60630bfa457	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	f	\N	\N	f
78723431-79e0-407f-a409-062ed73354ac	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	8	7	f
9585ba70-1edb-4c82-8f79-5af40c6e2b05	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	7	8	f
8bf31ca5-7ba9-4f43-8e4a-a9fa1d6ed42b	720863b3-15b5-4928-b516-5a8ec0cee764	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	8	9	f
71750806-0a46-4ddf-8030-f9f8cf8f51b2	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	0b5da7a7-bedb-41aa-afe0-1195abd1b1e7	t	8	7	f
055cb6b0-a0fb-477c-8b5e-6106c4183830	b43981e9-6f50-4908-b225-1f5d5a70c68e	Kavereiden kanssa istuskelua syrjässä. Vähän frisbeegolffin pelaamista tunnilla.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	7	f
a65e8cbb-d0c2-4771-b56b-09780998a6bc	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	9	f
c5b43710-e03b-4241-affb-e97ad5da586e	350594d5-5cd4-4033-9294-6b50102afe7d	Hyvää työskentelyä omassa porukassa. Aktiivista työskentelyä.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	\N	f
91e8d9b3-f163-49f1-b8a5-a1e33a6acd3b	c0011bcd-6952-4d60-a01b-3b455c7eea4c	Hyvää työskentelyä omassa porukassa. Aktiivista työskentelyä.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	\N	f
0d064c4b-47d4-4029-9754-1ec409249225	24007058-ca39-4c69-9004-c3d29b441fb3	\N	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	8	f
4f7785e4-ac9d-464b-8e00-ba622bea266d	67c02902-d7e2-47e1-abef-9d1ae14a3da5	Hyvää työskentelyä omassa porukassa. Aktiivista työskentelyä.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	\N	f
04d2fc66-8de6-49b9-af2f-d9d83fcd4101	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	9	f
7655381e-cf8e-4fdd-9c91-eb1efba07658	b05b035e-4867-40c1-965e-f60630bfa457	Hyvää työskentelyä omassa porukassa. Aktiivista työskentelyä.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	\N	f
5c5f30cd-6ae8-4f2b-9bff-adf47eab270e	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	Kavereiden kanssa istuskelua syrjässä. Vähän frisbeegolffin pelaamista tunnilla.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	7	f
2dee1d80-15f8-4881-a9ac-2a1d57a72ff1	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	8	f
7cff870f-4f72-46ee-99bc-5da9d3d8fa81	75bba92f-9f9c-47c0-a89a-2add75007cf6	\N	8dbcba3f-35e0-4e19-83a3-e480a5ad4c39	f	\N	\N	f
7a9a2f72-e72d-40d9-95a4-8efd91b41c4b	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa osallistui luontojoogaan rannalla ja harjoitteli liikkeitä keskittyneesti. Hän nautti auringonlaskun tunnelmasta ja auttoi muita osallistujia.	0928afc3-d50e-4222-9adc-71d1c8dc4593	t	9	\N	f
df39c335-98bd-40ce-8d1c-5f3369e2c596	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui koripalloharjoituksiin ja näytti erinomaisia taitojaan. Hän teki useita koreja ja antoi hyviä syöttöjä. Hän myös kannusti ja auttoi joukkuetovereitaan.	f5a560c0-2dc6-4f39-8158-9c222339bb04	t	\N	\N	f
7f232c6b-cd57-4936-9ce4-2a58d14d09a2	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	64295e4a-7641-439d-8a7f-8e967149dde6	t	\N	\N	f
97301a58-b6de-42da-b95c-02dccdae7e0c	5e5f9c60-1c5e-43f6-97ff-6e6144ecf55f	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	7	7	f
63633bac-2a1b-4a4e-a91f-2cf2a8d66794	eb6a2d6e-33a5-4ad2-95ea-a39741e9b905	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	f	\N	\N	f
824e7b83-8d81-4b0f-8114-b6a67d50c0c4	e111c54d-9b2e-406b-aab4-e61fe921dbe2	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	7	8	f
22e604ea-8c63-4796-ae3c-7ed506775dc8	0b357c38-9cda-428a-8a3b-0254143564df	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	7	8	f
36dbed5b-c829-4d1f-ad69-5659f2ce8279	1a420969-4c65-4a34-bdc2-80e13ed51f0b	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	7	8	f
7b48314a-916c-4b06-99ee-89f771223466	ae1feef0-be68-422a-8522-98700c2bd931	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	\N	9	f
d2792d2b-3217-4cc2-b4da-d7ff3f91a0d1	a56a92a5-893f-4de0-af0a-e764be900502	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	8	8	f
f04c5c37-77fb-4224-bd18-b56e71db35cc	82cd71ff-8e57-44ab-829f-f296a2929585	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	8	8	f
60dada6a-a326-4de1-94b5-dcd3e01ddc84	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	f	\N	\N	f
0077fa29-8871-412e-ab4b-0f29c66d6882	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	f	\N	\N	f
df82add9-56b5-448e-a897-e3f697fbc406	898eaa06-334f-4446-98b3-2368ad2b6cef	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	f	\N	\N	f
bca3df23-b922-4cc9-b237-b53fb6782269	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	f	\N	\N	f
bd06f1c0-0502-43d1-955f-5f914238e523	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	f	\N	\N	f
37ae9d74-791c-45c7-acd6-7bf5e233c05d	a9823635-cc6a-4026-ad85-423287d7ec49	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	9	f
ea2eb40e-57ce-4c92-80c9-7f834e1def02	41403fd8-289f-42b0-8d4f-4f8f2d47898d	Aktiivista tuntityöskentelyä.	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	\N	f
0d86b2b4-9e07-4dc8-9895-30a122364669	16149225-d420-4254-88de-36f235415650	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	9	f
66d9a724-b9c6-474a-a635-03bff463be4a	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	9	f
bd97e9f8-c594-4f4f-a814-3ab4c4909254	7af2670e-d622-44de-9458-0e3490224f19	Hyvällä asenteella tunnilla.	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	9	f
11ec3927-7611-4b56-a076-64e8ec58f79b	b015f02b-0e21-4f21-93d4-8497311b6490	Haisi röökille? 	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	9	f
78e875d0-30f6-42b4-b398-713a6e96ab7b	4cdb20f7-d8a7-480c-9379-bbe14d95d933	Ei paikalla	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	\N	f
64f2570e-f14e-44cc-b7cb-868deec34b40	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	\N	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	9	f
7aaf482c-8254-4c8b-b161-73d21c375909	052654dc-bfba-4092-85d4-6894c908f9b1	Aktiivista tuntityöskentelyä.	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	\N	f
ecb83267-8fd2-43f5-a07c-c88bba68d0d5	eb96e883-bf2d-4482-b8c9-6d272ee35354	Hyvällä asenteella mukana!	14ffde4f-95ab-4cc3-8694-b92f686159f1	t	\N	9	f
fcfbc435-d328-4751-bd0c-d4d98f167bee	720863b3-15b5-4928-b516-5a8ec0cee764	Kivaa ja aktiivista pelailua lähes koko tunnin ajan.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	9	f
cccfc7ff-43a3-4c28-ac76-d0bbcba3c12c	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	Kavereiden kanssa istuskelua syrjässä. Vähän frisbeegolffin pelaamista tunnilla.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	7	f
bec1a5cf-e71f-48c0-b3f9-9c3aeb1fb900	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	Hyvää yrittämistä lähes koko tunnin ajan.	8bb3dae0-3796-4f58-a3f0-be09fae5ab11	t	\N	8	f
9a187aa0-d1b5-492d-8b46-30089aeb6809	9c66fa7f-c08f-4905-9c54-5da739156493	\N	2a49b22f-e902-43cc-9785-493949f36824	f	\N	\N	f
ff952b2f-ba2d-4ffd-9f04-092958ecb23f	28426aca-f675-46f7-bafc-dc5f7eb649c5	\N	2a49b22f-e902-43cc-9785-493949f36824	t	\N	\N	f
279da558-780d-431b-828f-d008980f4908	ea8d74ac-e372-4fb8-8dd7-f3591a09cd4a	\N	2a49b22f-e902-43cc-9785-493949f36824	t	9	9	f
8eff5168-8c27-47fb-b046-36ee5b7bac2a	251b27c1-5684-424b-b17b-7257a311bd33	\N	2a49b22f-e902-43cc-9785-493949f36824	t	9	\N	f
e3e5552c-c05c-4837-a003-17a44ff99cdf	f6705543-53b3-419c-9a54-c23cd0c8525b	\N	2a49b22f-e902-43cc-9785-493949f36824	t	9	\N	f
3e91209e-09d7-4e04-b026-b5aeb42e32b7	04629d10-42df-4873-bb8e-a38230d93b8a	\N	2a49b22f-e902-43cc-9785-493949f36824	t	9	9	f
07e6fc58-ec76-491e-8713-ccb7842c68a7	b8a8e21b-2e09-4855-a354-0c48800913c9	\N	2a49b22f-e902-43cc-9785-493949f36824	t	\N	\N	f
33c45ca7-3515-4c5e-96f5-85b78e54f3ca	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti treenasi kuntosalia tehokkaasti ja keskittyi ylävartalon lihaksiin. Hän kuitenkin keskusteli välillä liikaa muiden kanssa, mikä häiritsi hieman treeniä.	c04c12d5-e621-4254-9751-63ebe4dcd439	t	9	8	f
c38ce1bf-a197-435f-86c5-3b3c75e760b1	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa harjoitteli voimistelutreeniä salilla ja teki hyviä hyppyjä ja liikkeitä. Hän tarvitsi apua tasapainossa, mutta oli motivoitunut ja kuunteli ohjeita.	78187248-1c3a-4f9d-80c5-a7d1a3ccafb8	t	8	8	t
81d85082-5cad-43d6-bcd4-7f7bcf9f36b8	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo pelasi sählyä salissa ja osallistui tiukkaan otteluun. Hän teki yhden maalin ja auttoi joukkuettaan puolustuksessa. Hän myös kannusti muita pelaajia.	8dbcba3f-35e0-4e19-83a3-e480a5ad4c39	t	8	9	f
c0ac0c54-a35d-4203-9ff8-71bec634758f	775a7c76-dc4a-4849-baf1-d7f9080eaf89	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	7	8	f
4f75b5f2-24fd-46a7-b706-413b9ffc523f	241042e2-7fa6-413a-a501-ab6c28dd86e7	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	f	\N	\N	f
6cf81e66-1dd0-4597-91e2-ccfff630e1a5	f18a8f1a-a17a-49da-8cc1-3603b4c21dc8	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	6	6	f
672efaf6-f8f1-4fd4-b4ec-7eaa3a7a6a3f	7df2a50b-b064-49a7-a5d5-747b117f107c	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	\N	9	f
210bec63-2f2b-4b26-a0f3-6e51eb8e101f	50d7ab1f-3cf2-4e10-9286-36df63a6e81b	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	9	9	f
b410c387-7959-4d5f-9cbd-e220b90621a6	3cd7167d-e20f-4291-9e18-5241b854e116	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	8	8	f
6d437ecd-2532-4d92-86d7-0fb431b18e27	18ccbf25-0831-40e9-9145-602b9d17ed2c	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	7	8	f
1c925499-a2e7-4955-9372-51d18ecd27bb	6e24ea61-532f-452b-865d-b67df86c48c4	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	f	\N	\N	f
e1aaf7fb-a5a7-47f4-be8f-e97469222d29	c08c69f9-ef26-4f6a-95ee-455d176dfa61	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	8	8	f
2d74d66f-90cc-4a08-81a5-c0c89fa04b0a	189e5ac6-f54b-4b10-ae14-ff92e63c3e5f	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	9	9	f
57f05bfb-56dc-47ba-ac11-622f9b7c50f8	d08c6dc6-1dc2-4a86-af3c-22e920af695e	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	f	\N	\N	f
e5398d4b-ead0-4f47-9a51-424fc0ebdc01	b71238b6-1cfd-41c1-92dd-fae83e40bea6	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	8	8	f
91fa9c66-6dae-4b86-b882-68a363b53294	e5032b31-071d-4ac1-a61e-f341a7170084	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	8	8	f
13b2046e-ec62-4ff9-8504-26b5a0e10109	35c11fca-684d-4018-bbe6-ff17c59a80d2	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	8	8	f
b9cac6c7-bfbd-43fd-8311-97770cbdaca0	f5051172-84d5-4fbc-bca0-e4d808fa36f3	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	f	\N	\N	f
c0f878ab-5b4d-40c0-8cf1-171228c5adc6	2e03b196-3248-4f14-9f2d-4661e503665d	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	f	\N	\N	f
b7f0d7a6-ba41-432d-a607-8bfa711b43e5	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	f	\N	\N	f
e2aa395f-ddb8-4b9a-957d-d1e0dd9251a6	404347be-f571-4254-b055-a06e9a9962f9	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	8	9	f
575306f8-3feb-4b1b-a762-ff8779f3b177	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	\N	9	f
da9bb2bf-7206-4604-add1-ca46a0652333	799b59e5-c962-4f19-9f9d-01518c57a550	Tänään oli hyvä boogie. Syöttelyä paljon.	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	\N	9	f
2e491a39-6656-47fc-96e2-87ccc3639b24	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	8	8	f
a3b48a81-8525-448f-8a35-bd4e0611bcaa	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	9	9	f
54fedda5-f7a2-4f6c-929f-3c35f49691e7	74e88236-472e-41ea-9475-73c94489ae2e	Taitavaa hyppynaruilua!	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	9	9	f
5abef222-62fb-404b-992f-f784e3186986	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	Ei paikalla	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	\N	\N	f
b8cb2fa6-e428-400d-b87f-6723ab0de5b3	dadb6322-e514-4a92-b22b-ab9357a4ac32	Hyvällä asenteella kaikessa mukana.	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	9	9	f
991e74d0-2555-48f8-acbf-31ecf2e2b011	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	Huippuhyvää työskentelyä ja muiden huomioimista	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	\N	\N	f
62854327-8044-4686-abad-ef7c4594d5fd	b9266745-39ba-4be3-b1a1-421801b79832	Loistava tunti. Mukana kaikessa ja hyvällä asenteella.	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	9	9	f
2630e6a6-ecfc-4aeb-9d16-03bc82066aef	686241e9-7a4e-4eb6-bc99-26699999001b	Ei paikalla	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	\N	\N	f
78436238-a52d-4881-8a75-83155d13665b	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	9	9	f
4438ea78-6cfb-41ce-a91b-d22ee1295138	2209c4b3-b0d6-4858-9fa0-74c9b589442c	Ei paikalla	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	\N	\N	f
365ee758-bc5e-4cbd-bce4-14ec5121480a	4943ad21-7f08-4b45-8d6c-7cccbfb05562	Kokeili myös korista. Pyysi saada syötön!	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	7	8	f
d6f227a8-75a2-42d7-b2ba-25595d551b5c	1e2db5dd-c171-460e-bf48-4bc55f04f49e	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	9	9	f
0c119873-0879-42dc-b3ba-c58e81451f64	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	8e4f3eb4-215f-44ff-bc5d-8284be416d0d	t	8	9	f
82b4d02c-e840-44de-a985-a8a5813c4beb	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti nautti retkeilystä metsässä ja piti huolta, että ryhmä pysyi koossa. Hän myös auttoi muita retkeläisiä tarvittaessa.	7301039b-e03e-4faf-a594-45c33f925021	t	9	\N	f
835c7f85-0a4c-4aac-b2da-93697c8e426e	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa pelasi sählyä salissa ja yritti parhaansa, vaikka hänen mailankäsittelynsä ei ollut vahvinta. Hän kannusti joukkuettaan ja auttoi heitä.	8dbcba3f-35e0-4e19-83a3-e480a5ad4c39	t	7	8	f
8235801c-5dfa-45cd-b5fa-e0a20e286a9c	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui retkeilyyn metsässä. Hän käveli 10 kilometrin lenkin metsäpolkuja pitkin, mutta väsyi hieman loppua kohti. Hän ihasteli kaunista luontoa ja jaksoi silti hymyillä.	7301039b-e03e-4faf-a594-45c33f925021	t	7	9	f
cbcb4cd8-2057-409c-be88-f22c82b28e4d	28e533c4-faf3-4e9f-ac97-ea948c1b019a	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	9	9	f
e26f5541-ab7a-4497-a5f9-bd776a9bf6cb	8cb49f42-d3d0-4a6a-9ac1-9569aed4991f	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	9	9	f
b557321d-d88a-433d-b41a-ad292d22878a	16530cbd-5612-4a8c-920c-9744e32be7bc	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	f	\N	\N	f
319470d0-f21d-4536-8df9-5c1fa5ca6cc0	bf09f310-3700-49db-b3f3-384cd041e6f2	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	f	\N	\N	f
2247bd15-2786-4e95-8f61-c891957066b2	8730fbfe-4cab-41db-8b7d-a750e3448184	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	8	7	f
ff205714-a54c-4631-9efa-1d52c86a09e1	77793959-dc53-44d1-8cd5-ddbe3c4b25a4	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	9	8	f
a3003ee2-c707-4cac-be71-818db7caad49	33ce32f8-0ac8-47f6-a2a9-f5aa880442f4	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	9	7	f
8a52a6e3-8b56-4bbd-ac24-1e8ed66b719c	01ab146e-d9da-4562-a7dc-f3d151d4992b	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	\N	\N	f
5587bd33-df97-4309-ae67-6c68a462612c	e6537a2f-233d-4b11-8f1b-5a0814a675c0	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	8	8	f
550570f0-d9f0-4e49-93e4-78249ac86a32	498d994f-bb8a-4e31-8451-79c4519c6541	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	8	9	f
ec0f8152-6966-4f06-9da9-f4b52498be06	9549b80b-fa32-4340-98fb-f827e29982ee	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	\N	9	f
15409f5f-f0db-471c-976d-6a80aab9ae0e	20f182b2-d260-4286-a228-80f03a83d6d5	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	8	8	f
749e87f1-8421-4382-88a5-a00c2c97eb51	a678e014-275a-4fc3-96dd-0d356b8b84e3	\N	858a71a5-c43a-46fe-8f9c-52e26563fc88	t	7	7	f
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
49756344-68e0-4270-81c5-f135db7c07d5	0e963947-3dcf-4f30-b316-ac9d07d81b0b	\N	4aba8224-f510-48f7-912e-048ec687325f	t	9	9	f
b39d02ee-f25b-494f-b432-cce9cec6f20c	f9c6b20c-e57c-4e70-9f32-dedd975aab01	\N	4aba8224-f510-48f7-912e-048ec687325f	t	\N	\N	f
d4998008-c4d5-4dfa-98e5-3fd74ffb21ff	1f770536-fee1-4ca2-9622-ed816628c9b7	\N	4aba8224-f510-48f7-912e-048ec687325f	t	8	9	f
8175d203-9dfc-4a07-986a-24a2c57293a7	91a00bae-00db-464f-8376-591e16a5a811	\N	4aba8224-f510-48f7-912e-048ec687325f	t	\N	9	f
e5a39668-72c7-4e84-9fa6-297b8eda6404	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	\N	4aba8224-f510-48f7-912e-048ec687325f	t	9	9	f
c7043da9-6a91-4a09-87ec-8e3ba1d83102	b1ef84a7-2238-4946-bd2d-97aae138bbad	\N	4aba8224-f510-48f7-912e-048ec687325f	t	\N	\N	f
de8a8b62-0c05-4cff-a53a-df4c2a158e80	1556394a-6336-4838-8943-19088ecdf5e0	\N	4aba8224-f510-48f7-912e-048ec687325f	t	9	9	f
86868be2-3909-458b-b5e6-92fdd93b5bb5	3e62f535-90a9-4a75-9748-27ea0d491a54	\N	4aba8224-f510-48f7-912e-048ec687325f	t	8	9	f
bd584062-858b-4e83-88e3-c157000e1366	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	4aba8224-f510-48f7-912e-048ec687325f	t	\N	9	f
75a85555-8614-4579-97d5-7d60a54532dc	e47d29de-6a02-4e63-a52a-964fc17b744e	\N	4aba8224-f510-48f7-912e-048ec687325f	t	\N	9	f
b855e55e-47ae-4ac2-8598-864e928b52e5	aa420673-c8ba-41da-9ee4-061022bb4a51	\N	4aba8224-f510-48f7-912e-048ec687325f	t	\N	9	f
ee04abec-bd3b-4718-93d2-c7786cbb1ade	a9823635-cc6a-4026-ad85-423287d7ec49	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	8	9	f
b473b281-2da2-4618-92a1-f5715b37b541	41403fd8-289f-42b0-8d4f-4f8f2d47898d	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	9	\N	f
72534751-5333-4abe-989b-89353b93955e	16149225-d420-4254-88de-36f235415650	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	9	\N	f
6e96ae64-88f7-44be-9cc4-a915559ef341	d19cd645-fa1d-4e74-a7c8-ec4b4b612983	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	\N	\N	f
2539e2ae-b683-4f9b-a144-0d9927a26c45	7af2670e-d622-44de-9458-0e3490224f19	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	9	\N	f
1c57afc7-5e83-44be-8ec3-96eac1a98b77	b015f02b-0e21-4f21-93d4-8497311b6490	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	\N	\N	f
9b53b8d4-8909-4a2e-8428-464927b40f72	4cdb20f7-d8a7-480c-9379-bbe14d95d933	Poissa	1bf527f9-144d-408d-8340-9aa5d93ec871	t	\N	\N	f
50812e13-1637-483c-a15f-d8d532758a14	143f673e-f9e3-4c24-a7b2-6f7c9ee22499	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	9	\N	f
f20e8f3f-eac1-4934-ae2b-c1710b88066f	1da042e5-4175-4c5e-b1e1-044b2c67c3af	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	8	\N	f
ad7074ad-6811-4412-90f8-a4d0286bfda6	5f2d8cba-c89d-4dee-b204-911a7f658599	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	8	\N	f
6b683cfa-acd8-416f-a09f-282b066f9d1e	898eaa06-334f-4446-98b3-2368ad2b6cef	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	8	\N	f
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
fc7464cf-6d6f-406d-b7b3-c49c243c6968	213addc7-6d5d-4a39-95bf-ded6afa510a6	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	9	\N	f
a0cb96b2-9ff5-4727-a075-b4fd93138e4f	423ad9ea-e868-49c8-a31d-1dbb6e0c4422	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	9	9	f
f0eafc83-ae33-4c62-9b94-fb88fe3d725a	dc43f223-8b76-457a-b035-8b186320bdea	Tenniksessä suostuttelun kautta mukaan. Fudiksessa hienosti remmissä.	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	8	7	f
9dfb4aa6-ea49-4a8e-a29f-18a7bfa32f7b	ad497eb6-6b41-4f04-97ac-cfff98b8cbae	Mukana työskentelyssä hyvällä asenteella.	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	8	8	f
a73b511f-4c68-4079-bdab-7bf750415d98	f826618b-cee5-4d6c-bcde-27e7a74a0b63	Tänään jaksamisen kanssa vaikeuksia. 	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	9	8	f
bf250651-86ad-435a-bc3a-038db54de391	9f830199-bde9-43a4-84e9-986992a1e3d3	Aktiivista osallistumista tunnin aktiviteetteihin!	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	8	9	f
ccc0ecf0-4f84-49c7-b06d-663f8443b4f9	5ba55904-fc97-4cc9-a015-d32e7ab8c3d2	Aktiivista osallistumista tunnin aktiviteetteihin!	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	9	9	f
ed7c7c24-b480-499d-99c6-bab177b6f5fa	2487435b-5598-4a44-bc31-f93ed8a2ec43	\N	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	9	9	f
7a56e8a3-bb61-44a4-bff2-fd314d1b31c2	60d0dce2-79cf-4c2c-86ec-e1f5a19bc60a	Aktiivista osallistumista tunnin aktiviteetteihin!	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	9	9	f
d77c01a2-35e5-4fd7-8580-9e3ea2f7bc08	c4365db1-b405-4aac-ad56-4f21780797c0	Aktiivista osallistumista tunnin aktiviteetteihin! 	6c860b01-a2bf-49dd-a838-e6dd8094c760	t	9	9	f
fa732a0c-aa9d-45f2-9988-b71fff6a6a5e	052654dc-bfba-4092-85d4-6894c908f9b1	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	9	\N	f
94d7db95-9cd1-48d3-bd0a-0ae89894b804	13e55cbe-ac55-47e1-b4d0-cc80073762e4	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	9	\N	f
9abba24e-08f6-4a19-bec3-a534dd31ee42	82907cc5-83bb-4c40-ac86-66a67bc9f5eb	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	9	\N	f
81e054a5-4c5c-4658-b9fa-42b1beabffc2	eb96e883-bf2d-4482-b8c9-6d272ee35354	\N	1bf527f9-144d-408d-8340-9aa5d93ec871	t	9	\N	f
8a5be3e7-2322-4fe7-81ee-0977ef8e45e1	75bba92f-9f9c-47c0-a89a-2add75007cf6	Tanssi ei sujunut tänään kovin hyvin. Matti ei pysynyt rytmissä ja tanssi liian nopeasti.	f9bbb84d-acab-4b52-a890-43dc7709963f	t	6	\N	f
fe0a27dd-2e6b-48cb-9085-0ea4d32fccb4	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa juoksi kestävyystreenin aikana, mutta hänellä oli haasteita pidempien mäkien kanssa. Hän ei kuitenkaan luovuttanut ja kannusti muita osallistujia.	ffcf41a8-c5c9-406d-8062-a9f9f40bf827	t	7	8	f
79912122-c306-4796-b55c-8e35091de022	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui kiipeilytunnille kiipeilyseinällä. Hän osoitti erinomaista kehonhallintaa ja voimaa, ja kiipesi nopeasti ylös seinää. Hän myös tuki muita osallistujia ja opasti heitä tarvittaessa.	3b32ba2c-8635-438b-a1b3-015d980e0846	t	\N	9	f
78651505-c190-49e2-a924-fb7b284213e1	db1510ed-3bb6-4856-8ea9-5012eeb68192	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	7	8	f
1352be86-62af-4a91-9d2b-8a8b87be863d	8a429230-9011-476a-9f6f-15494ecf57f2	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	7	6	f
aee8b6bb-a081-4a6b-92c2-0ef0f6dc1547	c5a69235-e2da-483a-b4d4-898fe3bd4c75	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	f	\N	\N	f
5de32d0c-bb44-41dd-804d-001b76c68daf	5e4779f0-fad2-4f94-b350-e56b4c5f5471	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	9	8	f
94cc2fda-84ba-4c43-a811-a9d1e07a42ea	9fc6c35d-b42d-4594-a960-5836531c7282	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	7	9	f
46eef231-504d-49ad-aad7-ed7d1949397f	3b6d04be-cd10-4e54-b5aa-28a67e8e2186	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	8	8	f
7068c787-4804-4a9f-83c3-2929efe4975c	9f715b18-4cd7-48ac-b927-f43f7c166538	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	8	8	f
5c3b7359-1483-437a-a34e-f1bc4f5b6b3e	d2bb5704-bed1-47cc-8879-681b17da4686	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	8	7	f
e5c103d4-1591-412c-bcf9-a849a625f9b6	63f57cea-4036-4e38-9d84-3c36f99124ef	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	f	\N	\N	f
403189de-ed8c-478a-95ed-4179b5e89811	45cedf94-714b-404a-8ad5-db42f55919eb	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	f	\N	\N	f
115e0966-c761-402b-a079-3f234b5ccb79	abd4148b-b530-4440-b643-34d08a4bb811	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	f	\N	\N	f
38da42ad-5bf9-431e-a375-ef1a58e03118	3723e655-2484-4055-8570-13ee693d5a1a	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	f	\N	\N	f
106e7e09-fbfd-4c55-90ce-b8024e703f2b	de28725b-ccaf-45e6-b808-aeeba3fa151e	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	f	\N	\N	f
993f4fec-c3d8-4366-aa36-6fb2faddf895	4a3f375e-f8ce-46f9-8b9a-4587d069d036	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
015ef43a-1551-4d43-bbb6-d8c894f4b969	0e963947-3dcf-4f30-b316-ac9d07d81b0b	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	9	f
8aaf3fa3-45b8-45f6-a18c-607f03e2e50c	1f770536-fee1-4ca2-9622-ed816628c9b7	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	9	f
59603638-b4d8-472c-a8ce-1b10b8fa9341	f9c6b20c-e57c-4e70-9f32-dedd975aab01	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
acf4821a-3ec6-4d94-bbfa-05272bd2d885	8fa5f694-d7a7-49c2-98a2-e1aecdc80d3e	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
08eede06-3651-4778-9174-39426283ad8e	91a00bae-00db-464f-8376-591e16a5a811	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
c75f2472-6d5f-4c37-af0f-c15d86841cec	2ca2b55e-b4b7-4d05-b440-3fbccdfc3c20	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	9	f
97b6075f-ca02-4170-937e-6213b72aadcd	b1ef84a7-2238-4946-bd2d-97aae138bbad	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
ba0fba82-1c14-42ea-9064-36a1fa198d0c	1461587b-fedd-4cb1-a122-58dd9ddc3fd9	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
7d2b1d32-3c03-46f1-8d9b-90b1fffe23ab	00179acc-3d3c-496f-98db-fb88756116f4	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	9	f
5f0178a2-3760-4b22-a094-d3903ed2c82c	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti ui avovesialtaassa hyväntuulisena, vaikka vesi oli kylmää. Hän jaksoi treenata koko harjoituksen ajan ja kannusti muita uimareita.	f5a560c0-2dc6-4f39-8158-9c222339bb04	t	\N	9	f
b1a3b70e-b894-4e2c-857b-ae7c204ad8f2	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa osallistui uintitreeniin ja yritti parantaa tekniikkaansa. Vaikka hän ei ollut nopein uimari, hän pysyi positiivisena ja kannusti muita osallistujia.	f5a560c0-2dc6-4f39-8158-9c222339bb04	t	7	9	t
70c81f4b-556a-4e50-b01e-20d4448adf8c	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui tanssitunnille ja harjoitteli latinalaistansseja, kuten salsaa ja cha chaa. Hän ei ollut aivan rytmissä koko ajan, mutta nautti tanssista ja oppi nopeasti.	beee4734-91f2-424a-b01d-70bb610bfcbc	t	8	9	f
a4b45734-299c-4a4b-a12f-416b948ca384	1dd2a92e-8754-4265-884f-db0a12b6a4c8	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	8	9	f
ab8edaba-823d-4a91-9ef7-69f9f93bc3f5	c80a1da2-c657-4a2d-8ee3-55eaa6a3b1f9	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	7	8	f
d535fd23-6d31-4520-a899-a25570f8b863	7756327f-59aa-40f9-aa95-88889e4ea759	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	8	7	f
39fd659e-b4d5-4ab0-910b-67d489793568	1e7d2903-2e91-4fca-b77f-211821ad0b07	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	8	8	f
45e69e09-0e85-4964-a3e8-8dd345ce0e57	268e1a31-5cba-4861-8aae-7d38fb140f13	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	8	7	f
9619d268-b754-4e59-8aec-8fa0da4d7977	ec51a182-bf8d-436e-8704-b2d5cd897604	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	f	\N	\N	f
001aec9f-50a5-4d3c-8abf-ac145de9a95e	31a2c199-fb37-4e7c-afb7-2619cc4f8260	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	9	7	f
257c7dd0-6ddb-4007-9c14-90d16b82b5b7	36f9a75d-23d0-4a2c-b6c0-e04cee9b1e26	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	f	\N	\N	f
12a0175a-0dcd-4da7-9099-3773d3431913	25567d61-dd6a-4b36-a934-5f6894070674	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	8	8	f
3cdf975f-dcfc-4c14-900d-9317154a3138	f3d70376-e85f-44c5-ae21-9c138e6c1663	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	\N	9	f
5bbfd22b-423d-4503-a58d-02e456214095	de688b84-f770-47b6-9e15-3224c355d563	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	8	7	f
3a50662b-de1a-4ae3-9857-e9fed95aba52	c177824f-0392-45e8-a26b-95cd21f3bbdb	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	8	8	f
0401bdfb-d05e-4eff-b725-f9339f9793ef	aaf7140c-7da3-4882-b2a2-99b19054b43c	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	f	\N	\N	f
ff4de696-7bf7-42a0-ac55-76a4fe34957b	c942743a-d10b-4460-bc99-44ea941f6f8f	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	9	9	f
a7a6aeda-1be5-4fc8-8d0e-de64593f8e40	a639981f-4bf0-4871-b264-00ad02a9a286	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	9	8	f
271a9de4-3e9e-4710-98a5-9b2550a5357d	cbffcbc6-7d16-4e3b-845d-0f0397dcca9e	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	f	\N	\N	f
fbdea6b2-646a-4876-b700-dd135377c708	bde08c48-5140-47eb-b28b-ce5c86ea8f46	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	8	8	f
90fffd79-4b68-40eb-8c53-17799324df36	e71cd959-78a0-4843-af83-1e8e741e7edf	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	8	8	f
bcb61ffc-eb5b-4bd3-ae63-d4f7039008c9	05c4f013-bc9a-4155-925b-6f8485bb5378	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	f	\N	\N	f
ffd921ca-6a20-43b6-b33b-ec954dfe8566	f4fc8254-27a5-4a0d-aca1-03b85e4020ab	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	f	\N	\N	f
1ce2fa1f-c774-400a-a37e-cc8c8791f45e	e1efe28e-64c5-402b-a692-0f795a6293c8	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	8	8	f
526c49aa-2915-41f4-b3f7-0866cbc496a2	f03779c1-9d87-439c-8d95-14e384c7d2c0	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	\N	\N	f
74176ed7-a4a2-41ed-ac9e-61a1281cee88	5bbc08f9-01e0-4911-9a6a-38790219ce2a	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	9	7	f
afeb42e3-1881-4f61-9bea-085cbd56aa9b	36920386-dc0f-4b52-aacc-ca4b36d3ac9b	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	f	\N	\N	f
fb07c74d-2cde-41e4-9d55-6e67f3669447	9b14ff5e-b7da-446f-bf7b-601d7a7a5a86	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	9	9	f
2d2da756-ed7b-4bea-b7fd-36a431bc1979	af2c74f6-f7ed-4bf3-94cd-63b0d228dd6f	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	f	\N	\N	f
dede7439-62d5-4017-8435-3122dfa30fc6	932b4426-7f6d-46ff-a9c4-a9fc697ddc23	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	\N	9	f
112f4d08-9468-4183-9f6f-82573e03b82e	c67dd576-d4c0-4d3d-82ec-9e20e69c629e	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	8	8	f
e1c1f966-74cd-4491-9b77-68a3e564d6e1	44af4d28-bf42-438d-aa9b-9bf9de75b9a2	\N	3d125050-5d36-48e1-b651-e899e9461f2f	t	9	8	f
34b78791-d2a6-4394-865b-0d6e8c57cd8e	a37dd7ab-82b3-41ed-b2a4-8213902dd004	\N	3d125050-5d36-48e1-b651-e899e9461f2f	t	7	8	f
b3d9166a-1c95-4a34-b42f-69eb00d79ac5	14c62b14-21d5-468c-b04f-89d60b2efc76	Huono suoritus	3d125050-5d36-48e1-b651-e899e9461f2f	t	6	9	f
4bc165b1-c0d2-4d5e-b632-d59efb65f706	1556394a-6336-4838-8943-19088ecdf5e0	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
fb38d2d4-fddd-4497-ad74-87473f00a0e3	3e62f535-90a9-4a75-9748-27ea0d491a54	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	9	f
96372459-c54c-4ddd-85f3-a81bca9cef6e	fb78d640-ca97-407e-9d2b-6390b8a2c77d	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	9	f
43436bca-2154-446d-97e1-10a1908ee347	f7ede4ab-b52d-4f8e-9bb3-56addd842fab	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	9	f
0f5a7a62-3a9a-47a4-8b27-6f976bf1ccec	69fec935-4bcd-43ab-9737-a524627dbe1e	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
833395ba-0197-4e50-abe1-0215cf87f891	1b1a60a0-0dd3-4c97-a5b7-44d0f618a7f0	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
8c8d7b3e-01b2-4c94-9be4-2670a0e78e97	71eae4f2-10b4-477e-a21f-0ef25ba08d1b	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
b13e8184-b5ab-42e4-8cc5-82388a7321d0	ad671202-0d1b-4b31-a2fc-9fa9032f3b33	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
87eca96b-7a33-41e0-802a-9e7c6e6ff8db	f4eb73ad-9a1f-4b7b-8899-b2a07ff4db2d	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
c34db0d7-0550-4852-9537-3b383984964a	e47d29de-6a02-4e63-a52a-964fc17b744e	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
3aeec542-e4e6-4ea4-aae6-e3f491df5c4f	aa420673-c8ba-41da-9ee4-061022bb4a51	\N	63411c6e-87fc-4c5c-bb5a-737114a53c2a	t	\N	\N	f
0beca8e4-3094-4a32-ac54-1b432647d7c2	75bba92f-9f9c-47c0-a89a-2add75007cf6	\N	897dbbdb-d0ed-4270-8ce4-8c34c3d21c8e	f	\N	\N	f
875b913e-8a11-48d5-8b68-e7c778ab421f	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa osallistui vesijumppaan ja teki liikkeitä energisesti. Hän auttoi muita osallistujia ja oli positiivinen koko tunnin ajan.	48b97ca2-cc28-4f63-a14b-26fb8422ff2f	t	8	\N	f
3f02c3bf-1804-4c44-a31c-41e2b856f2ab	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui vesijumppaan uimahallissa. Hän treenasi erilaisia liikkeitä vedessä ja keskittyi kunnon kohottamiseen. Hän auttoi myös muita ja oli innokas oppimaan.	9e17426f-5a97-4d62-bca8-25a9312e1367	t	8	\N	f
53f65a64-e703-47e1-85d5-f2744ddd88ae	0eba0b59-1564-4d93-a65c-d5aa57c2ba93	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	8	9	f
e7030269-11fe-4175-9373-dd964ea4fa65	634c3f80-8b4f-4c38-ac4e-937418ec9e8d	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	f	\N	\N	f
59d873be-88b6-4419-9857-a2b5b5da567b	95db6c22-a14c-4f47-b6c3-5ddffdbd933f	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	9	7	f
109ca9dc-7de7-4200-939e-b0f248f3a29f	40a52df7-f50b-4105-b4d2-00e0b391156b	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	7	7	f
7e0a7077-ed99-4265-85a2-d898a42be813	5c10a0b2-145a-4701-a64c-80a9369890a3	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	7	7	f
e22a9998-9f63-455e-b5cc-e788148f7234	fa187771-3d5e-4cb5-81eb-342568b7e833	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	9	9	f
5afe7046-e744-49c3-89bf-b59279a40cd8	cd2ac37f-bba5-4131-8a91-20280bb9b26c	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	8	8	f
4c3ab8c3-4e28-4e5f-b709-e09314352e8b	a5fcc76a-56b1-4ed8-ba9d-5d62e20510d7	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	6	6	f
3c7f86f8-c971-4ace-a845-67ca7a97d479	cf94a62d-ef7c-448b-9f61-16a9c6b90911	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	8	8	f
f2dd1cfc-6eba-485e-b753-3ee1191bd846	e1ee0c51-198d-441c-a0e3-cce4c418d122	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	f	\N	\N	f
26aebc00-1056-47a9-af5a-60df2c7d28b0	69c689de-b305-43a9-a6e8-c65382e4e476	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	8	7	f
46afaec3-cf48-4143-b757-a30d1d34cc27	288da2c9-c807-4e5f-9f49-507f1cabc93e	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	8	7	f
5b00fa35-c66f-4f80-a6ed-b47b281ae102	918413c4-6838-4a64-b031-6d026f3ce183	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	8	7	f
5e8a4014-1189-4e27-9d74-5e5770e047b6	4ac1e1d2-cafe-4171-a02a-773ae38292c9	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	8	9	f
2786be87-6da1-4a94-b5f5-2d29b7de5f53	d2430900-d731-43d5-ae88-a0166a7cfdde	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	f	\N	\N	f
b7a1eba5-9c64-4b70-8c85-864b714add0b	1f768e05-8228-4b44-9288-7eae6b5b4686	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	f	\N	\N	f
8ca0bcd6-aee1-49ef-936a-6cbf23f3b240	d3433aa4-3325-4b9d-8d15-c4ebfdc7533b	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	8	8	f
5b4d884a-b142-497e-8d2d-caf414bb5aba	a29cc6ca-adec-4a7e-8b7b-3a6261a709be	\N	31deeadb-5e29-4f3b-93b7-ee2d17f51631	t	8	8	f
5e650701-bc7b-4ba0-9490-dbe82286c40b	d9ac630a-298d-422c-8d37-72fc3991857d	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	7	8	f
9230887e-580c-444c-a6bd-34ce70785ddb	1f12b19a-138f-4000-a576-c5dab30ec9e9	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	f	\N	\N	f
ac708054-3497-4fa2-8abc-5c33e8869450	c732359d-e9bd-44c3-aa2e-bd92bfb911c2	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	7	8	f
701b7c0a-db2c-424b-8c96-efe8ab82ebd1	7c8f19ba-b172-40e7-8e9b-da74d07eb54a	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	9	9	f
ccde68fd-0f6d-4591-a73c-0aa9f00e5c87	f031aca9-7acb-43fa-9884-72547dac5709	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	9	9	f
16e7bc2f-9ead-4328-8fbd-e97792622241	2113c63e-c4a7-4e49-90a6-626646c3d949	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	9	9	f
a2783ed2-12c0-485d-86ac-0d59da2690b8	3eb15f99-938b-40e3-b16f-bce35248b3b8	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	7	8	f
79ebb3d3-b0f3-4b06-97c1-99d04129e5b5	e0357050-7b2a-4b32-87cf-af5747b17208	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	\N	9	f
46cc6571-3363-4e48-b19e-45b6ac688889	a09eec89-d6b8-4a66-b95d-356d800aaa8f	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	8	8	f
dd8206cb-f7b3-4b25-9212-e5c48a7fb5aa	25567d61-dd6a-4b36-a934-5f6894070674	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	9	8	f
934ccb48-4064-467c-a759-91025f033aaf	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	7c46e884-cea8-4a7b-9e12-15b555eaa4d7	t	8	7	f
8c471d15-b8f4-48c7-95af-8403ce1889da	404347be-f571-4254-b055-a06e9a9962f9	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	9	9	f
898933aa-e3b0-4a8f-a095-6f26a1fb7db1	0819eeb9-9a87-40ba-8f9a-45cacf4a2d18	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	9	9	f
de03bc7a-444f-40d2-8fad-1b753d9d2ffe	799b59e5-c962-4f19-9f9d-01518c57a550	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	\N	\N	f
62cf930f-d971-4e3a-9438-9afb7b1c81ea	42a4fefd-c72e-4707-b0d6-14fd9bd80379	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	8	9	f
d475ccc7-f2d9-4c74-87ea-12b9a959e007	046a3d24-b93f-44d1-ae1b-aa628e141bae	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	\N	\N	f
bfcd5b46-6262-4dcf-ae1e-f828587b4938	74e88236-472e-41ea-9475-73c94489ae2e	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	9	9	f
9a1df874-58b7-414f-bd3a-29fc23340f3c	2e03b196-3248-4f14-9f2d-4661e503665d	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	9	9	f
b9c4107f-2669-443f-9acb-a7e6264ee708	6ebad098-c9d7-4dd2-8e64-6dd6d0d5d859	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	9	9	f
8f725226-7e39-428f-91e5-dcc256d11932	dadb6322-e514-4a92-b22b-ab9357a4ac32	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	9	9	f
9dc83403-d9a7-4190-8b20-c3cd9262870d	26d1e5d6-23ea-4577-b7d1-7a54e5e29900	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	\N	\N	f
46d0a6ae-5e0f-44a8-8816-0ee56322845f	b9266745-39ba-4be3-b1a1-421801b79832	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	9	9	f
fcad02d2-7c3a-44cd-9354-f0e82344e20a	686241e9-7a4e-4eb6-bc99-26699999001b	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	9	8	f
a1f4ef04-b4b4-4630-b633-15ea1a60cd07	e9969c0d-58a3-4bcd-b301-5690b7290aa5	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	9	\N	f
8e409e1f-80f3-4121-8aa3-7fb669f13ead	2209c4b3-b0d6-4858-9fa0-74c9b589442c	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	9	8	f
cfd47f03-20e2-4a55-a77b-fb4319237e2f	4943ad21-7f08-4b45-8d6c-7cccbfb05562	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	8	8	f
e98f7cd5-2690-490c-8e8d-32df88b4bf0f	1e2db5dd-c171-460e-bf48-4bc55f04f49e	Poissa	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	\N	\N	f
48bb1997-4836-404f-a964-70a74a1e2a19	a9fb1e6c-0ef3-4c54-99a9-3c81384b898a	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	9	9	f
c303b380-d051-4d36-974e-1cf0b1fa1313	5323b55b-5fa9-4285-b48a-dbf0a19c3bef	\N	1ffb9b24-9a6c-4397-8870-e33932c269d7	t	9	9	f
b14d2209-152f-4769-841b-26cfa73d8e69	b43981e9-6f50-4908-b225-1f5d5a70c68e	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	8	8	f
0f17a0a4-b1c7-48cc-885a-e5c707bcd701	7ad2e103-b7a1-4b0c-bbd2-5c1cba3d4a9b	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	\N	9	f
974292e2-2136-4b5e-9383-b045b4953b39	350594d5-5cd4-4033-9294-6b50102afe7d	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	8	8	f
c4999d7f-59cc-40b8-93c1-d466ce93ffce	c0011bcd-6952-4d60-a01b-3b455c7eea4c	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	9	8	f
7147e481-7e2e-4d21-a34d-df7f44634389	24007058-ca39-4c69-9004-c3d29b441fb3	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	8	7	f
25f4050a-7067-442f-a542-4ffb35acf651	e2c637e8-f394-4a5a-926f-1f9888a7dc98	Poissa	53ede09d-132a-4e8b-9ceb-c2247582a256	t	\N	\N	f
09c9a628-6471-49ac-8351-1b8f08422bfc	67c02902-d7e2-47e1-abef-9d1ae14a3da5	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	9	8	f
46b5f105-4a7d-40fa-9e09-33cfeb38698b	2dd7377d-323a-4e73-9a14-5962ec2b8a58	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	9	9	f
de2a56b8-d616-4a6a-ba16-06cf03eb23cd	d07f9606-ddee-4f35-8d35-b8358dc9fc75	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	9	9	f
3f048181-b4fe-47e9-b043-0ab5152587eb	9bdfa82d-13bd-40be-9a9b-a57c2a072351	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	8	8	f
c673b681-fe6d-4091-abdc-41e4f1865661	5fd1effd-1670-4a40-bfaf-75a2a048fc91	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	8	9	f
b525f068-232a-4bca-8001-c863a95e7660	df05106e-6e95-4a82-af93-c5f6f8a58047	\N	5653b8aa-7777-4a3d-a704-73a5dbaf52ff	t	\N	\N	f
031f03e7-4d5b-4716-9b7f-334a9a6368bc	24bd87c1-454d-412e-a843-595ffdc4892b	\N	5653b8aa-7777-4a3d-a704-73a5dbaf52ff	t	\N	\N	f
3cb3ae2e-8fee-4b92-81c8-0777f90eb415	e459564c-d6aa-4fec-8790-508218a41435	\N	5653b8aa-7777-4a3d-a704-73a5dbaf52ff	t	\N	\N	f
4201dace-4e48-4fde-b89b-209891b5e038	c99cbc5a-d88b-4022-bc5a-aae33f51e30b	\N	5653b8aa-7777-4a3d-a704-73a5dbaf52ff	t	\N	\N	f
f99e7982-1c53-4592-80a5-9a5eb529b0b3	b05b035e-4867-40c1-965e-f60630bfa457	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	8	8	f
91086a34-2f08-4a45-91c7-afaf3da6a35c	1d4f1fb5-3d14-4889-8aa5-1fb175c2be24	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	9	8	f
afa0e409-3968-4bb3-9e2b-25dbdf8aa5b5	af758be6-0adc-4e32-8543-f65f6c48fd2b	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	8	8	f
094035fc-071b-4327-ad82-583ae5853284	720863b3-15b5-4928-b516-5a8ec0cee764	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	9	9	f
4b26b006-415e-4eb6-822a-81ac6262f28b	a6b19b1f-e185-41df-b32a-145f3d8ba2ae	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	9	7	f
a380826c-3913-4665-8d38-0128b2dc7b0f	eb6258aa-1619-49ae-be18-11cd0b0d7e1b	\N	53ede09d-132a-4e8b-9ceb-c2247582a256	t	8	8	f
4dbeda2c-5fe7-4bce-9f9c-d194fe0184c2	75bba92f-9f9c-47c0-a89a-2add75007cf6	Vaikka Matilla oli vaikeuksia voimisteluliikkeiden kanssa, hän osallistui harjoitukseen hyvällä asenteella ja yritti parhaansa.	78187248-1c3a-4f9d-80c5-a7d1a3ccafb8	t	6	\N	f
fec405b7-f671-46f7-b551-3f3075174038	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa nautti retkeilystä järvellä ja teki tasaisen vauhdin koko 8 kilometrin lenkin. Hän otti kuvia ja nautti luonnon kauneudesta ympärillään.	c04c12d5-e621-4254-9751-63ebe4dcd439	t	9	9	f
e311d630-1d60-4f19-a68c-cf04f2a4592b	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo pelasi jalkapalloa koulun pihalla kavereiden kanssa. Hän osoitti hyviä taitoja ja teki pari maalia. Hän kannusti joukkuetovereitaan ja nautti pelistä.	897dbbdb-d0ed-4270-8ce4-8c34c3d21c8e	t	8	9	f
a4efd53a-4b12-4a32-aac6-04df8afc06c7	e34d25fc-b0e2-48f1-8d86-77ce7464822e	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	9	9	f
03dc4563-3a01-416c-b499-76b77e7b6086	5e0e74f1-308a-4c20-bf9a-5011dff427d1		032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	9	7	f
8aa783d2-948a-44aa-82b7-c80ddd5f8990	7e447ce6-5569-47f0-9000-20ae93a68bd3	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	8	\N	f
5cfc497d-f3dd-4785-833b-95ebfafb12fb	0de6a87e-13a1-4713-988d-655e950c9fea	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	7	8	f
e520bf21-55b7-4123-ba4c-9f26d20d8ac7	ad4248b3-989a-4794-844e-af4cb598a1e7	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	f	\N	\N	f
2c0e8ab3-b966-4954-8641-bb34f532832c	d9ac630a-298d-422c-8d37-72fc3991857d	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	f	\N	\N	f
d7eb9e89-182b-4b11-af9a-4091111463c5	1f12b19a-138f-4000-a576-c5dab30ec9e9	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	8	9	f
a5a27d29-5d81-4bb3-820d-b1777e7268ef	c732359d-e9bd-44c3-aa2e-bd92bfb911c2	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	f	\N	\N	f
f7193427-a36d-4ded-b21a-fbdbd48133e7	7c8f19ba-b172-40e7-8e9b-da74d07eb54a	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	8	8	f
35a88c9d-6914-49ac-8a67-f490986bde78	f031aca9-7acb-43fa-9884-72547dac5709	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	9	9	f
dc3cb245-7a99-484a-91e0-25294b69b231	2113c63e-c4a7-4e49-90a6-626646c3d949	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	8	8	f
5e822cb7-06e9-49d6-a7a1-dd61bbd24128	3eb15f99-938b-40e3-b16f-bce35248b3b8	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	8	8	f
d5836cc8-565e-430c-9abf-4fc608a6b34a	e0357050-7b2a-4b32-87cf-af5747b17208	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	9	9	f
7049697c-bdba-485e-8b54-d79269490d4e	a09eec89-d6b8-4a66-b95d-356d800aaa8f	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	8	9	f
438df243-c8c7-496d-a0c1-003f9dbd8afb	d202ea60-e678-49fd-8ecc-581cad6b508c	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	9	8	f
c44eebed-da36-4321-b13e-d0df71b4b56a	d4e6aa85-cd60-4901-bd59-413ee93a3314	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	8	8	f
d4d19edf-d6a7-4c9a-bd4d-a9f29285833f	7a3453eb-b303-4944-9bfa-f7bfdde76864	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	9	9	f
c8c61a56-d826-41cc-8a02-ca7100071214	13e7ba68-1fc6-4e4f-947a-0370f5aff61a	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	9	8	f
a2343f18-e761-45ca-8d13-2669d7f00865	0fe083de-7bae-4fc1-815e-b4ead74b6a69	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	8	7	f
76cdf42b-9da8-4a2c-bfc8-566e9715626b	9b2269f7-aba5-42f6-afab-ccfa7bc42585	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	9	8	f
819ef64d-df2f-4ad2-a0d7-2109cc98be81	23d41b74-018e-45f5-966c-c729188c1ca3	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	9	8	f
1cc9b660-7fab-4514-8882-10eb414ba80c	c0a2a247-d6f0-4e43-bfd7-79d01e4eb16c	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	9	8	f
985d5e3c-64cb-419e-8c69-f74d8d0613f1	848b881e-e506-4273-b778-61cd669267d2	\N	ce80c783-0a4b-4c58-90ad-ba79266f522c	t	9	8	f
04200850-afa0-409b-b73d-12c5cc563c5d	f30953fb-1f87-41c5-b6f1-b9dbc28825ed	\N	1577f95a-7961-4c4e-a2aa-74db477eb72b	t	8	9	f
25065b7e-8920-42f9-baef-bd9e46a6b23e	d8d038a9-73b4-4ae5-8a92-88ed3edde4fe	\N	1577f95a-7961-4c4e-a2aa-74db477eb72b	t	9	9	f
7f373bb3-9c7e-4a46-81cc-b5daf51f0225	789cb197-e7fc-43dc-b4bf-99fa339f92b4	\N	1577f95a-7961-4c4e-a2aa-74db477eb72b	t	\N	8	f
498cb903-31f2-477c-97e3-7fa0a7043f2f	eb053966-13fe-4afb-996f-d6646db325e4	\N	1577f95a-7961-4c4e-a2aa-74db477eb72b	t	\N	8	f
72834884-c6e6-473d-816b-e38e9744ddf4	1242a7b5-d53d-4cd5-ae38-f65402ecf98d	\N	1577f95a-7961-4c4e-a2aa-74db477eb72b	t	8	9	f
37b84358-ffdd-4b80-836f-2ff8cdb70e35	e459564c-d6aa-4fec-8790-508218a41435	\N	3010d047-8156-4014-89a2-b25dd01d0e9c	t	\N	9	f
0fd312ba-4192-440e-8534-e95c541350ec	df05106e-6e95-4a82-af93-c5f6f8a58047	\N	3010d047-8156-4014-89a2-b25dd01d0e9c	t	\N	\N	f
a00a73b5-b399-4b2c-ac85-3129578dbe64	24bd87c1-454d-412e-a843-595ffdc4892b	\N	3010d047-8156-4014-89a2-b25dd01d0e9c	t	\N	8	f
00d46b39-e47a-4dec-b6fc-e80d1431c17e	c99cbc5a-d88b-4022-bc5a-aae33f51e30b	hirmu hyvin meni	3010d047-8156-4014-89a2-b25dd01d0e9c	t	\N	\N	f
c37f495d-f5dc-4b74-81fa-c2ae42700be1	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa osallistui luontojoogaan aktiivisesti ja keskittyi hyvin harjoitukseen. Hän auttoi muita osallistujia tarvittaessa ja nautti ulkoilmasta.	d54b8c42-67e5-49a5-85f3-f163230de4a7	t	9	\N	f
6fc45ea2-a099-4ecb-aea6-95c81b6baa03	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo nautti luonnonkauniilla polulla lenkkeilystä. Hän piti hyvää vauhtia yllä ja auttoi muita osallistujia vaikeissa kohdissa. Maisemat olivat upeat ja Teppo jakoi iloaan muiden kanssa.	726ca314-dc27-480f-923d-10f9c840d1a0	t	8	9	f
536b318f-a01d-4825-9592-733404fc1bed	02ea3a66-aa4a-420a-9334-f2b0941c564b	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	9	9	f
7a1d7349-7c3a-4e05-8ce9-ca429e1d643e	5ce6b918-bcba-4712-98c1-d891eec91168	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	8	9	f
85d3970a-aa1f-488a-bb39-fbe0918421cc	0025a5a3-6947-4d23-b100-bcd5a58c6e09	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	8	7	f
4b93ce96-d3b2-4aea-88ee-11c85698be94	76d7ba34-af4d-41e0-934a-63461dc3aeac	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	9	9	f
5f2cbe78-5387-4a0f-b3de-ccb31542fb87	61780abd-03a9-4ce4-89cc-059b5a2f5177	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	9	8	f
933d267b-4200-4da2-8bb6-13ae8f56dd4d	e8b17234-4ce5-4c04-9507-ef785e100d73	\N	1577f95a-7961-4c4e-a2aa-74db477eb72b	t	\N	8	f
3d6f2d10-2234-4bdb-93ea-77c4b39f3e56	abb97912-4c5e-4cec-b3e7-d1d840be7e81	\N	1577f95a-7961-4c4e-a2aa-74db477eb72b	t	9	9	f
8b0890e2-35f5-4697-b750-80c0a4acb48e	9573f6aa-4bd6-4bf6-b320-1ee6b5ba8edb	\N	1577f95a-7961-4c4e-a2aa-74db477eb72b	t	8	8	f
cac6281b-b6ef-4047-9d2c-1de9881ff2cb	7993aaf7-401e-4bef-b8c2-185aefd95344	\N	1577f95a-7961-4c4e-a2aa-74db477eb72b	t	9	8	f
a44c06e5-1f15-4b80-a05d-94409028be22	0bd6f7ee-7d70-4a7b-9342-0e0d7b6548f7	\N	1577f95a-7961-4c4e-a2aa-74db477eb72b	t	9	8	f
69c0a02a-db14-4588-aa92-dd3b03a87cad	51954512-0767-4d9d-b15b-439329a27094	\N	1577f95a-7961-4c4e-a2aa-74db477eb72b	t	9	8	f
fb9288d0-697b-47fc-9823-e3e9b302c22b	f510b335-8874-49a7-b7a5-e0e1c68bf05c	\N	1577f95a-7961-4c4e-a2aa-74db477eb72b	t	\N	9	f
788e00d0-75db-4516-ab92-61add3945fa8	da006afb-aec4-4638-91e8-81bab1da0a69	\N	1577f95a-7961-4c4e-a2aa-74db477eb72b	f	\N	\N	f
3831feb0-e97e-40ce-8e93-ada2115814d1	deca6386-deb7-4ce1-a697-d43c08ebe017	\N	1577f95a-7961-4c4e-a2aa-74db477eb72b	t	\N	9	f
f5db47fa-11cf-481c-991b-aff60b14c693	d202ea60-e678-49fd-8ecc-581cad6b508c	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	\N	9	f
d7a8b627-677b-461a-b5fb-5fa9c2d24748	d4e6aa85-cd60-4901-bd59-413ee93a3314	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	\N	9	f
9639602a-7cdc-4288-a740-8187c623bfe9	7a3453eb-b303-4944-9bfa-f7bfdde76864	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	9	9	f
648b3ed9-e2ac-4f1c-883d-76c7f5a2af69	13e7ba68-1fc6-4e4f-947a-0370f5aff61a	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	9	9	f
eb4efc2d-4be4-4c43-8bbf-b1dd1dca60a2	0fe083de-7bae-4fc1-815e-b4ead74b6a69	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	9	8	f
bd47172c-45e3-4449-a452-910bd1793c2e	9b2269f7-aba5-42f6-afab-ccfa7bc42585	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	\N	9	f
95c6f570-b874-434b-8ccd-bee0ec8a5625	23d41b74-018e-45f5-966c-c729188c1ca3	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	\N	9	f
0547c0fc-6134-4f21-8a18-707db00f1650	c0a2a247-d6f0-4e43-bfd7-79d01e4eb16c	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	\N	\N	f
e4d73bdc-0797-4d5a-8e38-d682011154cb	848b881e-e506-4273-b778-61cd669267d2	\N	523a6273-c7bd-4d67-8b9b-48b16e66d4e5	t	9	9	f
f45e25bb-7fa6-48a7-b716-109f5ca5e53c	d1c1ad1a-62d0-4d6b-bf48-2dead02ed1f6	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	8	9	f
bc1747f3-98e3-469b-ae78-26da5123e9e3	e6537a2f-233d-4b11-8f1b-5a0814a675c0	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	8	8	f
b2af4ee7-3889-4526-b8af-23538900855f	6f8a2928-32c2-4e60-9c99-b8073fcd9d35	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	f	\N	\N	f
51b2c8b5-1138-4c7b-95f2-02cc58337cb1	1a420969-4c65-4a34-bdc2-80e13ed51f0b	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	8	8	f
003f4133-1d2b-43f7-88fc-83adbd1ecf86	6e24ea61-532f-452b-865d-b67df86c48c4	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	8	9	f
dc0a364b-c118-43ff-8d85-74452ce9ee2d	c08c69f9-ef26-4f6a-95ee-455d176dfa61	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	8	7	f
b51e78cc-349c-47aa-a000-3a66bd47cc22	3b6d04be-cd10-4e54-b5aa-28a67e8e2186	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	f	\N	\N	f
c1c59d24-6220-438a-ad66-1d19e16480ba	ec51a182-bf8d-436e-8704-b2d5cd897604	\N	e8502f11-5dcd-4889-bc35-0728a210d64b	t	8	9	f
734f6902-7604-47cd-9be6-d3c15e182af1	c80a1da2-c657-4a2d-8ee3-55eaa6a3b1f9	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	8	9	f
127aff7c-7106-4695-9455-55c287afa395	74744cbc-e78c-48df-b758-713f9a81751e	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	8	9	f
30b3179f-5cac-4cea-b4f6-e6036cd12575	634c3f80-8b4f-4c38-ac4e-937418ec9e8d	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	f	\N	\N	f
a5a73584-0254-4666-ac94-296d989a3709	5ce6b918-bcba-4712-98c1-d891eec91168	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	9	\N	f
f21f1e91-31c7-46bc-a6db-5bd561175e67	5e0e74f1-308a-4c20-bf9a-5011dff427d1	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	9	8	f
0d61bb84-eaf3-4472-bc9a-c0c35aed5b75	a2216f2c-6ade-4f5a-a8c5-515f09bd4b08	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	9	7	f
c84751c6-77dd-4a05-9a8a-e2d0bd1a099c	b0aa13eb-dd72-4d41-9158-63ed22b2f65b	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	f	\N	\N	f
c585cf50-00ab-4a66-82eb-e869bb1dc6af	904493af-2f99-494c-8b42-5ebe4c1ae1b6	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	\N	9	f
f502d0df-6521-4053-80f5-25180a76eac8	db8905a7-084f-4d92-af60-cf29824dabe7	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	9	7	f
816d3163-30fd-42e5-a06d-cd14b26c8aa0	fa6f162f-c93d-497c-b27b-9a6450a4a6ad	\N	eb6afa70-0356-4ff7-8f48-b8ce7abc8ae1	t	9	9	f
3fd7f296-cade-4744-9509-3c73489b0fca	75bba92f-9f9c-47c0-a89a-2add75007cf6	Matti nautti kansallispuiston retkestä ja jakoi mielenkiintoisia tietoja maisemista ja luonnosta muiden kanssa. Hän auttoi muita tarvittaessa ja piti ryhmän yhtenäisenä.	ffcf41a8-c5c9-406d-8062-a9f9f40bf827	t	9	\N	f
19dbf977-f373-452e-b2c0-60094f59a985	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa pelasi sählyä innokkaasti, vaikka pallon käsittely ei ollut vielä täydellistä. Hän kannusti joukkuettaan ja oli positiivinen.	87721bf9-2237-4429-9e23-587ae97d05c1	t	7	9	f
232493f8-c7e8-442b-9151-521366e2f70c	4c047cf3-edbb-4aa0-b879-cd84077a8257	Liisa nautti lenkkeilystä luonnonkauniilla polulla ja jakoi mielenkiintoisia havaintojaan maisemista muiden kanssa. Hän oli hyvässä kunnossa koko lenkin ajan.	726ca314-dc27-480f-923d-10f9c840d1a0	t	8	\N	t
fc477da0-188e-44d7-bb04-36241bca2e3e	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui tanssitunnille ja yritti oppia uutta koreografiaa. Hänellä oli vaikeuksia muutamien liikkeiden kanssa, mutta hän ei luovuttanut ja jatkoi yrittämistä.	f9bbb84d-acab-4b52-a890-43dc7709963f	t	7	8	f
6447e58a-c247-4900-aaf6-b3bb03384865	a520a370-e1ec-4742-bcf8-1a34a4434485	Teppo osallistui hiihtoretkelle ja hiihti noin 8 kilometrin lenkin. Hän kaatui muutaman kerran, mutta päätti jatkaa ja paransi tekniikkaansa matkan varrella.	c04c12d5-e621-4254-9751-63ebe4dcd439	t	7	8	f
53da01fa-ef8c-492c-b603-976265bc1eef	cfea9e73-0c9f-433f-909a-a088c3931b8f	\N	4a81ce87-bccf-4fb5-af09-51e8899bbed1	t	7	9	f
5468c70e-b6d4-434a-b206-b1f4d672d498	74744cbc-e78c-48df-b758-713f9a81751e	\N	032c110b-9a4c-47b8-914a-c07dc4a7f82d	t	8	8	f
d9e138bd-e974-4e59-840c-d94963d6c8b5	d0c101ca-4d6b-43c2-beb1-a4680f44dd5a	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	7	9	f
a9a2fbdd-2c89-4bb9-a28c-f787ae36b066	a3be9480-89da-4490-aad6-4507acd56e6c	\N	520adbc2-e093-40f1-8a8f-5b071f9c9c3f	t	8	8	f
a6997375-5cf4-4e33-b141-e90525e046bd	39e44baf-d5a4-4a7b-85ba-8d9ef3dd9567	\N	d6e498fa-92dc-4425-ba9a-6ea712d40f92	t	9	9	f
e1f2e224-f8d1-41b7-9374-b0ce7775c94c	a8df8354-0125-404f-a1d8-5584462a5b82	\N	bee802eb-1d02-4fec-9e4d-003a1361685e	t	9	8	f
6731f3c3-de21-45db-a0e9-433c40dffc4d	344890ff-a10d-4801-992d-36bcbcc43663	Ei paikalla	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
76a66d45-24ad-4d3f-950f-13d9047b5412	a71c4a77-39cd-4672-a59a-0394bec62fcf	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
cd5e12b7-ba03-449b-8a12-e864bab370e0	f179052b-20ed-4b30-92df-04ae478b0f06	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
25945954-4214-4349-960f-4f4e453c130d	74ff2516-b259-4f3d-b68b-dbc5c29d6daa	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
4f561cdb-daea-45b2-b782-c5f4a44da58f	1b5d1532-f11c-4b7a-bb15-8754ae38223f	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
6ca3f069-0a68-4cb7-b786-30e94e08656a	0d410afb-beb1-4ac1-883c-f4d19f5f858f	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
7c0b003f-f89a-478e-8465-7066d02d1d51	88c69065-37d1-45f2-a48a-a7b12a0694cf	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
46992e53-eb68-44cd-bc09-eb4bac9def01	92d51cc4-7e8c-4bcf-84b8-b3f4cad005cc	Ei paikalla	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
5d9168ca-ec02-4b63-9d02-21ffc0d33302	12acc9ab-19a4-404d-b072-4760f41732dd	Loistavaa työskentelyä. Mukana kaikessa. Kokeili ja otti osaa.	4d3fddca-2214-40dd-aa09-3f4031174783	t	8	9	f
4d85fd7d-1ddb-4b24-825d-68667775f652	d6bae43b-c9c1-42c3-bd74-736d3be6e4f2	Taitavaa pelaamista, erinomaista työskentelyä.	4d3fddca-2214-40dd-aa09-3f4031174783	t	\N	\N	f
a5df7baa-97da-4307-a391-80485f95815b	8a993418-3f13-49b4-bb21-93368d8f7a50	Mahtavaa työskentelyä. Huippuhyviä lyöntejä!	4d3fddca-2214-40dd-aa09-3f4031174783	t	9	9	f
52dcb52a-570e-45ca-9751-52075134e822	60c35aef-6137-44dc-b5d6-b796f1443148	\N	4d3fddca-2214-40dd-aa09-3f4031174783	f	\N	\N	f
95b470e1-2292-4831-93a3-685d490d1f4a	7e57c1d9-b037-4ae6-a0c9-2b409b90f748	Vältteli osallistumista koko alkutunnin. Tsemppasi loppua kohden pelatessa.	4d3fddca-2214-40dd-aa09-3f4031174783	t	7	7	f
d8a5725b-daf3-499a-9d2f-ccfc22fdff03	7756327f-59aa-40f9-aa95-88889e4ea759	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	8	7	f
1905b37e-c44e-4968-a3de-f89483745bb1	c5a69235-e2da-483a-b4d4-898fe3bd4c75	\N	7fb30ed7-affa-40dc-b83c-e1c024283074	t	9	7	f
57fe2e8a-ded5-4b45-8e51-85910c3a4ea7	d0c101ca-4d6b-43c2-beb1-a4680f44dd5a	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	8	9	f
85429c97-a2cf-4f96-8a83-50717003a301	db6b1a3f-e485-4b8f-8a25-0a8e518a2026	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	\N	9	f
98afef9b-c546-4d21-bed4-8c624dc36c41	7e447ce6-5569-47f0-9000-20ae93a68bd3	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	8	9	f
74cc3a8f-81bf-423a-ab80-83fe533761f3	95db6c22-a14c-4f47-b6c3-5ddffdbd933f	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	8	8	f
d0513207-d6b5-4949-ab69-86d6cd8ace4a	0025a5a3-6947-4d23-b100-bcd5a58c6e09	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	7	7	f
ad1af073-f980-4fd2-a8f8-48f70ad0a63e	971b8500-6c50-4f89-ab1e-f5219ccdef93	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	9	9	f
0f37c26c-9af1-4369-aa0b-95415470011f	a3be9480-89da-4490-aad6-4507acd56e6c	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	7	8	f
df1f38e9-aa43-4c24-9291-14c3bc4db28c	c695adc1-a07a-4ebf-b99f-9714e4ab4bf7	\N	9264da22-1da2-43d0-99ab-564dee2d8326	f	\N	\N	f
c1fe42f9-9374-4e34-8ed0-5562ffd352c1	2abacf8c-b973-4678-9504-e30861fdcba5	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	8	8	f
12796253-ad5e-4eb7-9b0d-c3da8f96bb9a	bdbdbd45-458b-41df-ba2f-ab5e4406bb26	\N	9264da22-1da2-43d0-99ab-564dee2d8326	f	\N	\N	f
17e8bea5-0c5f-46b1-87b5-8ca6777089db	e0562708-15b5-478a-8f5a-1863c55a6f38	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	8	8	f
35458c92-89fc-4441-ab47-5174d49be1f8	8730fbfe-4cab-41db-8b7d-a750e3448184	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	8	8	f
c306e9ef-4b9c-42fd-8cc2-defff9d2bacc	52c3b46f-5204-40ad-9150-17b0a7077eed	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	7	7	f
7abaf387-c250-43c0-a18f-4f80099d8ec5	0d894576-e308-4a66-a809-d8530eb5753e	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	9	8	f
8b658f38-c4b4-46a0-aa87-a878dc83d6b9	e111c54d-9b2e-406b-aab4-e61fe921dbe2	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	8	9	f
f70f017b-5b31-48d1-880a-23a0462dc3f3	7ac64248-1e14-4e88-ab15-a9a552d3811c	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	9	7	f
b94a745c-38d8-4319-abd3-2028b0d0f2cf	f4df5072-2986-4859-a7cc-6d06a6fe21ad	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	9	7	f
7bd87fd2-8e68-4bb9-9fc1-a9c463d5262a	3cd7167d-e20f-4291-9e18-5241b854e116	\N	9264da22-1da2-43d0-99ab-564dee2d8326	f	\N	\N	f
4ca3d82a-2832-4a4a-8f8d-47959fda308e	1e7d2903-2e91-4fca-b77f-211821ad0b07	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	8	8	f
e8322aca-fa51-4bd1-80c3-0fbe120a89ac	5e4779f0-fad2-4f94-b350-e56b4c5f5471	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	9	7	f
6c8730f6-3254-48c8-9eb9-bdcd74f3c4c3	77793959-dc53-44d1-8cd5-ddbe3c4b25a4	\N	9264da22-1da2-43d0-99ab-564dee2d8326	t	9	7	f
e5e40360-1a3e-4cd5-8ada-a7fa1e0baa6f	d9ac630a-298d-422c-8d37-72fc3991857d	\N	6dd0a225-308e-4284-b74f-539133806168	t	\N	\N	f
9fbd6111-66f3-4fbc-b4fa-56987424605e	1f12b19a-138f-4000-a576-c5dab30ec9e9	\N	6dd0a225-308e-4284-b74f-539133806168	t	9	9	f
82713e28-47b8-4503-abd8-a7069ff5801e	c732359d-e9bd-44c3-aa2e-bd92bfb911c2	\N	6dd0a225-308e-4284-b74f-539133806168	t	8	8	f
20081bfe-c0f7-4c4e-b225-f7f6f6a986e9	7c8f19ba-b172-40e7-8e9b-da74d07eb54a	\N	6dd0a225-308e-4284-b74f-539133806168	t	\N	\N	f
3f440386-b837-4591-ad9e-8d293a9bfef6	f031aca9-7acb-43fa-9884-72547dac5709	\N	6dd0a225-308e-4284-b74f-539133806168	t	\N	9	f
d027186d-705a-4b5f-b560-2d2ab039e679	2113c63e-c4a7-4e49-90a6-626646c3d949	\N	6dd0a225-308e-4284-b74f-539133806168	t	\N	9	f
75e3e140-13ce-446a-915a-a8677dea01ad	3eb15f99-938b-40e3-b16f-bce35248b3b8	\N	6dd0a225-308e-4284-b74f-539133806168	t	8	8	f
179196f7-c904-4ee1-8e29-0211832c4eab	e0357050-7b2a-4b32-87cf-af5747b17208	\N	6dd0a225-308e-4284-b74f-539133806168	t	9	9	f
c19877f0-3e3a-4fad-9e72-7458bbbd1010	a09eec89-d6b8-4a66-b95d-356d800aaa8f	\N	6dd0a225-308e-4284-b74f-539133806168	t	9	9	f
403049a9-d2f4-44ea-a5c7-de6b87b3a3e0	d202ea60-e678-49fd-8ecc-581cad6b508c	\N	6dd0a225-308e-4284-b74f-539133806168	t	9	9	f
19092494-b3ae-4eba-b54e-494d9a622a39	d4e6aa85-cd60-4901-bd59-413ee93a3314	\N	6dd0a225-308e-4284-b74f-539133806168	t	9	8	f
1964db03-b85a-4983-9352-7c6c17d18234	7a3453eb-b303-4944-9bfa-f7bfdde76864	\N	6dd0a225-308e-4284-b74f-539133806168	t	9	8	f
0cf6d95b-ad81-4dc2-9cce-303b465cba71	13e7ba68-1fc6-4e4f-947a-0370f5aff61a	\N	6dd0a225-308e-4284-b74f-539133806168	t	9	9	f
580c499a-b7b4-4906-98a0-cfb2fa2e0ec8	0fe083de-7bae-4fc1-815e-b4ead74b6a69	\N	6dd0a225-308e-4284-b74f-539133806168	t	8	9	f
bc9a278b-bd13-4e82-81cf-e2066641204d	9b2269f7-aba5-42f6-afab-ccfa7bc42585	\N	6dd0a225-308e-4284-b74f-539133806168	t	9	9	f
0e36c4c6-0e50-4cb3-922f-300166746bc0	23d41b74-018e-45f5-966c-c729188c1ca3	\N	6dd0a225-308e-4284-b74f-539133806168	t	9	9	f
0127f172-ade6-4097-a181-5031e9a76679	c0a2a247-d6f0-4e43-bfd7-79d01e4eb16c	\N	6dd0a225-308e-4284-b74f-539133806168	t	\N	8	f
5d7f74f6-89ba-4a31-b4d6-fc3ba7cdd67f	848b881e-e506-4273-b778-61cd669267d2	\N	6dd0a225-308e-4284-b74f-539133806168	t	9	9	f
c40d4f6e-a540-4224-8bd0-5cfb71bce964	7ebec83f-f17b-4770-a9af-ea290f26e168	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	7	8	f
c9e15547-e10f-4469-b1db-4296ef12a288	40a52df7-f50b-4105-b4d2-00e0b391156b	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	7	8	f
5f317f43-2a7e-433b-bb16-ce3a08c9b30d	6edb9c7d-338c-42b3-8bed-95c037398e1d	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	9	8	f
320bc973-b718-4ef7-9d3e-d4be145a88b7	0de6a87e-13a1-4713-988d-655e950c9fea	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	8	8	f
bfc6f691-fe26-4ca9-a64f-1c51dcbc1ed2	76d7ba34-af4d-41e0-934a-63461dc3aeac	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	9	8	f
499acf4d-183a-417a-a547-157d2b2c89df	92214907-4fe9-442f-9f35-c7b59f78e08a	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	9	9	f
ab89b41c-1639-4c71-874c-23988d8226d6	9c95ce1a-b395-4179-9558-10abb9105fd0	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	9	9	f
b7b0c3a8-7197-4066-958d-a70a6b18cd18	e2500f5c-1aea-4ffe-9f18-9b86022fce62	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	8	9	f
9059fdc1-e46c-4acf-b7b0-f0fcc8c0bec7	33ce32f8-0ac8-47f6-a2a9-f5aa880442f4	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	f	\N	\N	f
4f4148f6-0222-49dc-bd9a-fbf28e2ed3be	e3e017a1-6c30-4320-8ccf-3b2b276e8128	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	8	9	f
d7a6cb34-08f2-4500-b068-1be82e522c73	3cb1e21e-1338-4fac-8380-c69946fc26c6	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	\N	8	f
804709b0-0111-42a8-adae-d3b8f4149654	e1ceb28e-8139-41aa-bf55-3ef379c568ab	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	8	7	f
e3c4d5a0-e2c1-4475-90f6-1559f59f68bc	72a94026-88ad-4cbb-b1e4-e6aa917db696	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	9	9	f
96b76240-b165-4441-9718-095be851691c	5de52dab-1765-4acf-8020-053b68336487	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	\N	8	f
d0f8bbd8-74a3-4c18-8291-c11bee2e4602	268e1a31-5cba-4861-8aae-7d38fb140f13	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	9	9	f
1b8399e2-813e-420f-94d5-1f27980f06ea	0b357c38-9cda-428a-8a3b-0254143564df	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	8	8	f
e39e8640-a8ed-482a-875b-1afa65683466	01ab146e-d9da-4562-a7dc-f3d151d4992b	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	f	\N	\N	f
e2958b6d-545b-4973-a60c-0927e67b93b6	9fc6c35d-b42d-4594-a960-5836531c7282	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	8	9	f
534a9200-93f6-44f7-b983-f2b26cb16fb8	18ccbf25-0831-40e9-9145-602b9d17ed2c	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	9	9	f
b01522d2-619b-4400-853f-f2f0421b4ee5	189e5ac6-f54b-4b10-ae14-ff92e63c3e5f	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	t	8	8	f
edac3bbf-ecdd-4956-a568-eee9182c229c	39e44baf-d5a4-4a7b-85ba-8d9ef3dd9567	\N	7609e570-5d24-4cc0-9daf-efce6e08a02a	f	\N	\N	f
c0675007-bfed-483a-abab-116a532c1959	9f715b18-4cd7-48ac-b927-f43f7c166538	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	9	8	f
ab0c33a3-1b8e-4ce3-a3ef-406915e9ed56	d2bb5704-bed1-47cc-8879-681b17da4686		79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	9	8	f
158aabf8-2028-4e14-846e-3ce3f0dccc93	31a2c199-fb37-4e7c-afb7-2619cc4f8260	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	9	8	f
2273e654-7d5b-47a9-84c9-37a59306c46a	36f9a75d-23d0-4a2c-b6c0-e04cee9b1e26	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	f	\N	\N	f
0a9fc27d-4ae3-46b2-8c75-ad4c29f1149b	25567d61-dd6a-4b36-a934-5f6894070674	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	8	8	f
f532f7cd-5db7-4f2f-8395-b47efb33c98f	f3d70376-e85f-44c5-ae21-9c138e6c1663	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	\N	8	f
91c38c21-4399-44fb-9f29-c8a83b8cc658	de688b84-f770-47b6-9e15-3224c355d563	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	9	8	f
9f5a3bb8-ff40-43ef-9c45-9bd4d1595ec5	c177824f-0392-45e8-a26b-95cd21f3bbdb	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	8	9	f
806f7126-31e8-44db-9f8d-422b04eefb0b	aaf7140c-7da3-4882-b2a2-99b19054b43c	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	f	\N	\N	f
d2f485a3-ccbf-49de-905a-315df0bcf76c	fa187771-3d5e-4cb5-81eb-342568b7e833	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	\N	9	f
d27551fd-d182-4158-ba80-c86ec03636bc	cd2ac37f-bba5-4131-8a91-20280bb9b26c	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	8	8	f
ef982c58-af24-455d-99bc-d177fa556790	a5fcc76a-56b1-4ed8-ba9d-5d62e20510d7	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	9	8	f
437a46d6-b96a-4a4c-85ed-12bc5a3dd30e	cf94a62d-ef7c-448b-9f61-16a9c6b90911	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	f	\N	\N	f
82b65215-3c6b-4ca4-8d0c-c6a365ede71a	e1ee0c51-198d-441c-a0e3-cce4c418d122	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	8	9	f
f843fe39-1a0a-4473-b867-ae667d97fe6d	69c689de-b305-43a9-a6e8-c65382e4e476	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	9	8	f
60e8606b-82d7-44d7-9404-d36861288606	288da2c9-c807-4e5f-9f49-507f1cabc93e	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	8	8	f
a534b345-4356-4426-8885-16373199b534	918413c4-6838-4a64-b031-6d026f3ce183	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	f	\N	\N	f
9b6fa097-9c6a-4688-ab3e-51642d94c218	4ac1e1d2-cafe-4171-a02a-773ae38292c9	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	8	9	f
60721bda-c46a-4b2e-8a83-fb0c24710930	d2430900-d731-43d5-ae88-a0166a7cfdde	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	8	9	f
29b92ed1-ee27-433f-89ac-6d257341e71e	1f768e05-8228-4b44-9288-7eae6b5b4686	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	9	9	f
9ca50455-068a-432f-b7ba-c2de40c8d70f	d3433aa4-3325-4b9d-8d15-c4ebfdc7533b	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	9	9	f
603a35af-242e-452a-a66b-120455bc2b6d	a29cc6ca-adec-4a7e-8b7b-3a6261a709be	\N	79af44c1-41f7-47d7-bfdf-30611f8c3b9a	t	8	8	f
a7a79c44-865d-4ed8-8bfd-1b9e4a790c2e	f30953fb-1f87-41c5-b6f1-b9dbc28825ed	\N	93edd4be-dd55-4f42-b568-a782849af230	f	\N	\N	f
6478d072-5c87-4b5b-9343-95a1219800a8	d8d038a9-73b4-4ae5-8a92-88ed3edde4fe	\N	93edd4be-dd55-4f42-b568-a782849af230	f	\N	\N	f
a6b0f23e-5b2f-4af0-94ca-cebd5c5e20b1	789cb197-e7fc-43dc-b4bf-99fa339f92b4	\N	93edd4be-dd55-4f42-b568-a782849af230	t	9	9	f
f6ed49a5-ba6a-4b53-94ad-a8e2f7dd9149	eb053966-13fe-4afb-996f-d6646db325e4	\N	93edd4be-dd55-4f42-b568-a782849af230	t	9	9	f
53b68a89-db08-410a-ad76-7675e91f3b8e	1242a7b5-d53d-4cd5-ae38-f65402ecf98d	\N	93edd4be-dd55-4f42-b568-a782849af230	t	9	\N	f
edd02941-cbd9-40b8-86a0-1b0c1ea5c598	e8b17234-4ce5-4c04-9507-ef785e100d73	\N	93edd4be-dd55-4f42-b568-a782849af230	t	9	\N	f
a41e1b5d-32cf-432d-a90d-6a5050a96450	abb97912-4c5e-4cec-b3e7-d1d840be7e81	\N	93edd4be-dd55-4f42-b568-a782849af230	t	\N	\N	f
727ee902-e276-4044-a92d-48ea67fbe638	9573f6aa-4bd6-4bf6-b320-1ee6b5ba8edb	\N	93edd4be-dd55-4f42-b568-a782849af230	t	8	9	f
23577006-2c8a-47e2-bf78-169c60da2e49	7993aaf7-401e-4bef-b8c2-185aefd95344	\N	93edd4be-dd55-4f42-b568-a782849af230	t	\N	\N	f
f46823fa-503c-4d4c-bec7-ecd4b9bc4d7b	0bd6f7ee-7d70-4a7b-9342-0e0d7b6548f7	\N	93edd4be-dd55-4f42-b568-a782849af230	t	9	9	f
3af0f13e-be85-442c-bfcb-b0063e2a5594	51954512-0767-4d9d-b15b-439329a27094	\N	93edd4be-dd55-4f42-b568-a782849af230	t	8	9	f
dc85dbeb-1449-483f-8e4c-70e9339bfa8d	f510b335-8874-49a7-b7a5-e0e1c68bf05c	\N	93edd4be-dd55-4f42-b568-a782849af230	t	9	9	f
8623253c-c459-4c18-ac0f-dad6ab7ec605	da006afb-aec4-4638-91e8-81bab1da0a69	\N	93edd4be-dd55-4f42-b568-a782849af230	t	9	9	f
8bc6c012-faa5-4c3c-8b50-08103faa1f04	deca6386-deb7-4ce1-a697-d43c08ebe017	\N	93edd4be-dd55-4f42-b568-a782849af230	t	9	9	f
4e7ea400-9081-47bf-9ec1-42d60b6cf08e	f198a966-c599-4457-ab33-bc075adefadf	\N	0c9c65c8-8dc0-4396-aa0c-29f07ecc1fe0	t	9	8	f
ef555102-9e7d-47cd-9e6c-5a9a4a902a16	6743208b-a2b7-4951-9d65-602313f52be8	\N	0c9c65c8-8dc0-4396-aa0c-29f07ecc1fe0	t	9	9	f
fb1237fc-9c5e-4482-9bc2-2de9f44f2a68	f7aff351-6b9f-4caf-8717-5a611192f6d9	\N	0c9c65c8-8dc0-4396-aa0c-29f07ecc1fe0	t	8	\N	f
eaec40e9-b9dc-46ac-899b-3d682b6c6d42	7cb540a6-c01f-42c7-a0e2-099d290c0b6a	\N	0c9c65c8-8dc0-4396-aa0c-29f07ecc1fe0	t	8	9	f
bd90190b-3f49-4d13-87a6-887036cff318	2a397255-ca16-43dc-b47e-a977a917f032	\N	0c9c65c8-8dc0-4396-aa0c-29f07ecc1fe0	t	9	9	f
77801cad-04ac-4a59-abec-e3595248e33d	b25c03f9-3bec-48f9-a045-c78745703bf7	\N	0c9c65c8-8dc0-4396-aa0c-29f07ecc1fe0	t	\N	\N	f
85c95581-9e5c-43f1-8263-234ff0f9d0c1	d989226b-aa7a-4dd9-a34c-6bf06ae4a429	\N	0c9c65c8-8dc0-4396-aa0c-29f07ecc1fe0	t	9	\N	f
bc895b42-95fc-48e0-9b6c-ae9986ce8206	959e8e48-e3dc-4672-b263-cb8fcb8f3057	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	9	9	f
b4ae35cd-5a27-4a7c-b3d5-3d372d06c01b	ac72adf3-79e8-4479-a81a-be13b2603b33	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	9	\N	f
94d68351-bd09-429f-a940-0bd133095e81	403d2ef2-23cd-437b-9688-43756e24a287	\N	f3a651ac-f25e-4f56-9927-7946332213cd	f	\N	\N	f
dfbd6935-dc45-411e-9939-c606b4c5c736	c71cbbc5-3ad5-4c1b-a751-616db7f95169	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	8	8	f
881d4888-9244-42fc-9832-c0f46cfbe49c	8585f583-e996-4173-acc7-e61b2992a3c3	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	\N	8	f
94e1946d-0ee3-4c31-905c-b0006467a8d7	ed8b008e-b272-4a8f-a28b-3e10943865d0	\N	f3a651ac-f25e-4f56-9927-7946332213cd	f	\N	\N	f
2b99395e-1121-4405-b65f-9088b58de97c	b924bdca-75a4-4049-978c-22b6d57a75ed	\N	f3a651ac-f25e-4f56-9927-7946332213cd	f	\N	\N	f
ed66c153-e9e2-4565-91b5-a991f293d1c5	05d139e2-1d0d-44d0-9d55-8640833f9067	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	8	8	f
2ba7378d-336b-40de-87df-6d891251aca6	fe65a7a8-1054-4dce-a078-47e176bca0d3	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	\N	7	f
48dd82b6-c176-4824-b545-3cac4434e0d8	3ff48490-fb0c-4328-8b8e-010efa10de13	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	8	8	f
d428333d-c14f-4ad9-aa09-959369c2c045	394795ec-5959-4d19-9ee5-362213b77dee	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	\N	8	f
57776aed-2344-4dc5-8947-d8e77718faa2	53394cde-fdca-44d6-bae2-9c928f2f23a0	\N	f3a651ac-f25e-4f56-9927-7946332213cd	f	\N	\N	f
9e450b68-012c-4986-ae53-4c654d084a24	476293ef-adda-4c53-9a52-f977cb79d14e	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	\N	8	f
8df6c860-8134-4463-b333-e0126054bccc	89864582-b6ce-4434-97ee-14767b35e1d0	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	\N	8	f
e68e57d9-7cfa-4037-b4b8-abef5f0ba029	b7be5ecd-cc80-443f-8a6a-8125c91da527	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	9	9	f
a0563f7a-e63d-47b0-8efe-3ca9ab14044c	1199e08d-681c-4104-b883-89ebd887d53e	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	7	7	f
c2b9b597-ec58-4162-bb65-e4a5c697acf9	fb382ba6-005a-42a0-9882-9735de457bc0	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	\N	7	f
d88856ef-4cce-4c67-abc6-83f98a1749cf	1d0f2b30-e376-4890-86af-e2585b65ee33	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	8	8	f
b7dc7cb0-acf3-4fe2-84e9-d2c1803759fd	8fc516e0-c5ba-4181-a5cd-01f85629b4ac	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	8	8	f
4081614b-232e-43c3-a0db-6cffe9bc24a6	41dbd3de-0883-454d-baaf-7613476052f3	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	9	7	f
b6af9e2f-cc05-45d4-a44c-e98a1ccf618f	5092be97-7e39-4aa6-bd2a-a517b48ff540	\N	f3a651ac-f25e-4f56-9927-7946332213cd	f	\N	\N	f
ed7865a3-0db5-425b-9156-8765cf2b459b	264fe413-3243-45aa-809a-0f752bce3b4a	\N	f3a651ac-f25e-4f56-9927-7946332213cd	t	8	8	f
87ad67e7-9164-4ba1-9cb2-2d5bfc26f803	71f99d4c-e3e1-4c88-af9f-2641131f3422	\N	f3a651ac-f25e-4f56-9927-7946332213cd	f	\N	\N	f
c1cbd89d-4bcf-4f3d-ab80-2da7e3483a16	03397f36-f253-476a-a333-556ae179dbda	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	8	8	f
d5ae246d-b11e-4d20-8436-c132bbcefe44	e0c8876f-57f1-43dc-9950-3851d82380fe	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	8	9	f
776fcb61-3a7c-408c-83f5-d774bcfeac7c	4e00db97-fd93-416f-a349-655a240056ae		f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	8	9	f
b7e97dae-2c1b-4418-9efe-6cb887af816b	28e533c4-faf3-4e9f-ac97-ea948c1b019a	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	8	9	f
56ec01e8-311b-4f68-8eb2-e941a287ef62	775a7c76-dc4a-4849-baf1-d7f9080eaf89	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	9	9	f
73a09f4a-5d49-4268-98bd-6178124e99e5	02ea3a66-aa4a-420a-9334-f2b0941c564b	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	9	\N	f
26bc9ec7-cba5-4f7b-a68f-1268fd058fc8	1dd2a92e-8754-4265-884f-db0a12b6a4c8	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	9	9	f
e6403050-641c-4fa0-ae18-3563bda54dda	5e5f9c60-1c5e-43f6-97ff-6e6144ecf55f	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	8	9	f
66f6f3c8-b96b-4592-8a4a-3b9163078aba	b03cc979-7da3-4d75-b187-943264397b04	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	8	8	f
1538f6ad-5a77-4265-aea1-dcfee6d83d3f	db1510ed-3bb6-4856-8ea9-5012eeb68192	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	8	8	f
d6a0c67f-75f6-4868-acd9-bfb24ee62637	cfea9e73-0c9f-433f-909a-a088c3931b8f	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	f	\N	\N	f
9ed61bf5-2a90-49a4-99b3-7f71caf505d1	ffb872b2-2bb5-4267-8e92-0514977ba44b	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	8	9	f
9d53cff6-4c32-4c24-86ee-9aaa6bd44b84	e34d25fc-b0e2-48f1-8d86-77ce7464822e	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	f	\N	\N	f
6da18371-3625-4a2e-a8b8-1c9ac04a42ef	05795f8f-d6de-4ec8-88fc-0df98df77292	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	6	6	f
a5d7a51b-0b12-4856-811d-60b8858dfa3b	de0b5abf-b8c5-4046-aaf7-f9bffc544ca4	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	9	8	f
93fa13ff-48dd-4fb7-a07a-cf87e6929909	0eba0b59-1564-4d93-a65c-d5aa57c2ba93	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	8	9	f
7480dd8d-4a64-4f63-ade5-c34399904a75	1aa8b618-de8a-4a56-b1ef-33ea240f027b	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	\N	\N	f
459269f5-2ffe-45d1-8d63-c2c3bb38d4da	dccdded4-f3c3-4949-937a-cfd65fae056d	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	8	8	f
dcde2b7a-e937-40c1-8057-8677ac261da0	e7eb8c8a-033d-416a-848a-6da0d65cbf8e	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	8	\N	f
4522f1a3-346b-4d02-b68e-10a0df7ea3a0	241042e2-7fa6-413a-a501-ab6c28dd86e7	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	8	8	f
3cf26e93-7583-4935-9347-a3ac504a3de8	16530cbd-5612-4a8c-920c-9744e32be7bc	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	8	8	f
a24fe224-8f31-4727-a1d2-c4f31a42670a	f18a8f1a-a17a-49da-8cc1-3603b4c21dc8	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	8	9	f
98283516-f0a1-45d2-a7bb-4eb8e485458b	8cb49f42-d3d0-4a6a-9ac1-9569aed4991f	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	t	9	9	f
e5a605cf-0b66-45f4-9784-189d7f14ce7f	8a429230-9011-476a-9f6f-15494ecf57f2	\N	f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	f	\N	\N	f
78753235-efae-4334-a377-aae94f26116e	4d9888c7-3be7-4fec-a5d7-07759cdff766	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	9	f
9bef502f-f97e-406e-9171-48aba62fdaef	436f9966-c204-4794-89fa-e5e1a30b6247	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	\N	f
9c65373f-1b73-4be1-b9ad-2e773b0db9fb	5c10a0b2-145a-4701-a64c-80a9369890a3	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	8	f
1318811a-b751-4a6f-b45b-90efc83150ce	8c057200-e725-4e08-b93c-88bd891fe862	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	9	f
bfb1adbc-e7dd-489d-8ab4-ff7ea1e11007	ad4248b3-989a-4794-844e-af4cb598a1e7	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	8	f
2e246a1b-7ac5-4f44-abb1-b63d9c9b3ff2	61780abd-03a9-4ce4-89cc-059b5a2f5177	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	8	f
26655bce-d010-4c6a-931b-5f1c09615ea3	92eecb4d-b8c2-43ce-ac29-eb7a46566311	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	\N	f
f12c08d3-2b6f-4b5e-ab35-17cca635b966	e17db94c-c058-4163-b1df-3824f2f732b8	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	9	f
e75823d1-ec6c-407e-aa14-7c835aa52300	139ee728-7bd5-4ed5-b88e-65e455770b9f	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	9	f
96e8eb1f-40aa-44d5-93ce-a49cd9878cf9	28bf177a-d273-4b22-963c-4206fcffa9cf	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	9	f
00e4fac3-4681-4a15-a501-fd3455c71afa	48f6a291-18c4-4349-8578-e9d40a016f99	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	9	f
8a288deb-e090-4fb7-9409-0cf8530999c2	d1c1ad1a-62d0-4d6b-bf48-2dead02ed1f6	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	9	f
7c183439-437b-415f-bc80-ff29b3f1f516	e6537a2f-233d-4b11-8f1b-5a0814a675c0	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	\N	f
4f51a8ca-977c-47dc-a798-9fc0d8627b9b	6f8a2928-32c2-4e60-9c99-b8073fcd9d35	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	9	f
18b4ad9e-6e00-4870-911e-36c6c645ffee	1a420969-4c65-4a34-bdc2-80e13ed51f0b	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	9	f
028fe5f7-fd3f-4aba-a1da-6c580b9cee4a	6e24ea61-532f-452b-865d-b67df86c48c4	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	9	f
df181410-12bb-4cd8-8ac2-da5634768e51	c08c69f9-ef26-4f6a-95ee-455d176dfa61	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	f	\N	\N	f
87405cd9-b041-46cd-9c39-2652d567616c	3b6d04be-cd10-4e54-b5aa-28a67e8e2186	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	7	f
32d986c9-8e17-4ceb-a635-86f72b910828	ec51a182-bf8d-436e-8704-b2d5cd897604	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	9	f
48f517e7-8d48-4713-927d-1d296cf00059	a8df8354-0125-404f-a1d8-5584462a5b82	\N	dceb37c4-11e9-4a50-bf78-6efb1af605f4	t	\N	7	f
c5adb64a-302a-401b-8b70-38467af0c266	c80a1da2-c657-4a2d-8ee3-55eaa6a3b1f9	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	f	\N	\N	f
2971860c-7eb0-443d-b781-5f3c6e281dce	74744cbc-e78c-48df-b758-713f9a81751e	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	9	7	f
6ed1b610-f3bc-447a-8dd0-fe961dd937a2	634c3f80-8b4f-4c38-ac4e-937418ec9e8d	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	f	\N	\N	f
005d0992-acbc-42d0-8400-e2fb247d1e2f	5ce6b918-bcba-4712-98c1-d891eec91168	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	8	9	f
02d48d9e-2147-4aad-baee-ca32c6927172	5e0e74f1-308a-4c20-bf9a-5011dff427d1	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	9	7	f
1bf6de8a-9ac8-4bda-ae6a-a1651d0922d3	a2216f2c-6ade-4f5a-a8c5-515f09bd4b08	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	9	9	f
1bd30757-29b8-4058-9e0e-4489f7d3516f	b0aa13eb-dd72-4d41-9158-63ed22b2f65b	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	9	8	f
f407a4d2-158b-4428-a4fd-14c70588600b	904493af-2f99-494c-8b42-5ebe4c1ae1b6	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	9	8	f
af37446b-9665-4a8b-a5d9-b0843a44a581	db8905a7-084f-4d92-af60-cf29824dabe7	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	7	9	f
791e92c6-482c-418a-99c5-44aa4119b82d	fa71c8f8-45c8-4a24-b0fb-6a0ecd67af3c	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	f	\N	\N	f
272a4deb-b519-45b5-944d-acf2a4497027	5f877b5d-eaeb-404c-b3cc-d51a467fa428	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	8	9	f
efe72059-dc73-491a-a6b6-e7ec365c7cb4	fcabdea5-1224-442b-8142-62be862508e3	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	9	9	f
b10cead5-5a71-40f7-a8aa-327df23642cf	b580b35d-10c3-4ce3-9f87-37ce3a436eaf	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	8	9	f
3e56d9e3-e1a6-4c86-b14a-ba03094fe8fa	f034aa91-48ff-496e-b25b-9c81eaaaa3e3	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	8	\N	f
cae951e9-0a24-45a0-8e7d-9d472b9f6aa5	bf09f310-3700-49db-b3f3-384cd041e6f2	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	8	\N	f
fa06213f-e6cd-45c7-b818-b48ade9f8601	eb6a2d6e-33a5-4ad2-95ea-a39741e9b905	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	8	9	f
ed6292a7-1f56-497e-9f2b-bbf467460f6b	7df2a50b-b064-49a7-a5d5-747b117f107c	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	7	7	f
f6f96d1e-e1a5-4cc1-a49e-58b95bd248e3	fe5ede8f-8290-4b69-b575-75aeaab46f2f	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	8	9	f
5427adaf-6597-4474-8596-5ebc314b94a6	50d7ab1f-3cf2-4e10-9286-36df63a6e81b	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	9	9	f
f1cf7727-d0af-4582-b421-785089d7186f	7756327f-59aa-40f9-aa95-88889e4ea759	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	7	7	f
915dc1dc-df91-4291-8d10-2047ed945b4d	c5a69235-e2da-483a-b4d4-898fe3bd4c75	\N	689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	t	8	8	f
0ff01252-c8c4-4951-b4c8-b6740a967166	d0c101ca-4d6b-43c2-beb1-a4680f44dd5a	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	\N	\N	f
a6edbf92-bd67-4cb1-a61d-55d94d82c171	db6b1a3f-e485-4b8f-8a25-0a8e518a2026	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	8	9	f
431f69c3-8e8d-4d4f-9e72-f91e4dd84227	7e447ce6-5569-47f0-9000-20ae93a68bd3	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	9	\N	f
678e9794-2cb8-4b30-9c1c-b7c195f664cb	95db6c22-a14c-4f47-b6c3-5ddffdbd933f	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	8	8	f
01ed6b74-ea6f-429e-83a7-42ab5f101db0	0025a5a3-6947-4d23-b100-bcd5a58c6e09	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	f	\N	\N	f
6ae86206-aef0-4675-9422-170fe7fe89cb	971b8500-6c50-4f89-ab1e-f5219ccdef93	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	9	9	f
648299fe-d44c-47aa-b02a-b74328cf10a2	a3be9480-89da-4490-aad6-4507acd56e6c	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	8	9	f
afdf99cb-7aba-4c64-8d71-d4f9f293ebb6	c695adc1-a07a-4ebf-b99f-9714e4ab4bf7	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	f	\N	\N	f
2b10da1e-4ab0-408b-b2d8-ec26b5ffc136	2abacf8c-b973-4678-9504-e30861fdcba5	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	8	9	f
023d615d-f83e-47e9-b2e9-466995859a86	bdbdbd45-458b-41df-ba2f-ab5e4406bb26	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	8	9	f
fb09d3f0-632b-4acb-b3e7-c44f10f8541d	e0562708-15b5-478a-8f5a-1863c55a6f38	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	8	9	f
b143344f-50db-4c2b-81d6-2036d60c22e5	8730fbfe-4cab-41db-8b7d-a750e3448184	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	8	9	f
47fbfcbf-d8e5-4010-9dce-51098a6a2fb7	52c3b46f-5204-40ad-9150-17b0a7077eed	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	8	9	f
e692d047-3ef8-4a0b-a063-da5f5ad9811b	0d894576-e308-4a66-a809-d8530eb5753e	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	8	9	f
6eb10d06-d2ae-4bcb-a611-557417206b95	e111c54d-9b2e-406b-aab4-e61fe921dbe2	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	8	9	f
46cd5930-eb15-478b-af53-2c82a7848738	7ac64248-1e14-4e88-ab15-a9a552d3811c	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	9	9	f
b58538a7-9c49-44d0-9d90-fe01d0759334	f4df5072-2986-4859-a7cc-6d06a6fe21ad	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	9	9	f
96a7314d-6800-447f-9e00-3635b8d57ed3	3cd7167d-e20f-4291-9e18-5241b854e116	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	8	9	f
e2d467df-c2a0-4b73-b410-e1f1c5339dc9	1e7d2903-2e91-4fca-b77f-211821ad0b07	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	8	9	f
075f0b28-7c50-41ce-81fb-8a8cbec61a84	5e4779f0-fad2-4f94-b350-e56b4c5f5471	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	9	9	f
73c33478-b84f-4c3d-a935-881efde51e46	77793959-dc53-44d1-8cd5-ddbe3c4b25a4	\N	9a404a41-2b08-4367-85ac-3a5450fbaadc	t	\N	9	f
3d408acb-a4b4-4fa7-aa70-782cd901f37e	d9ac630a-298d-422c-8d37-72fc3991857d	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	f	\N	\N	f
a8f92ade-2049-408e-a70f-153a625956c3	1f12b19a-138f-4000-a576-c5dab30ec9e9	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	\N	f
e40398d0-1c02-400c-b380-7465fdd4fda8	c732359d-e9bd-44c3-aa2e-bd92bfb911c2		2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	9	f
aa0aa56c-f844-4bb7-b298-16c0218b4010	7c8f19ba-b172-40e7-8e9b-da74d07eb54a	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	\N	f
256836df-017f-477f-9508-818b0a65d669	f031aca9-7acb-43fa-9884-72547dac5709	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	\N	f
badd3997-d67f-462b-8479-ecae8d161b0c	2113c63e-c4a7-4e49-90a6-626646c3d949	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	\N	f
87549197-5fd9-48fd-aa4e-011b40d35b81	3eb15f99-938b-40e3-b16f-bce35248b3b8	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	9	f
2bb40193-6af6-4c91-a6e2-8494c2a9653b	e0357050-7b2a-4b32-87cf-af5747b17208	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	9	f
321a010d-77c9-4dce-bcd9-8a2de354b8d6	a09eec89-d6b8-4a66-b95d-356d800aaa8f	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	f	\N	\N	f
9f831513-c1ad-48e1-9b86-9678662fbbff	d202ea60-e678-49fd-8ecc-581cad6b508c	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	\N	f
1d2334fe-21b6-4580-9ee4-c7271771a87d	d4e6aa85-cd60-4901-bd59-413ee93a3314	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	9	f
157a25f9-50d8-4ef9-a483-a4bc31d564e9	7a3453eb-b303-4944-9bfa-f7bfdde76864	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	9	f
f43ab10e-22ba-44f8-abcd-7ce7800be848	13e7ba68-1fc6-4e4f-947a-0370f5aff61a	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	9	f
1cbbd834-f5a7-462c-b359-801430914fe9	0fe083de-7bae-4fc1-815e-b4ead74b6a69	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	9	f
d558e82e-3b93-412a-bfaa-2c92b9598cb1	9b2269f7-aba5-42f6-afab-ccfa7bc42585	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	\N	f
b0aad506-d7d4-4e4f-8198-c1709dd3b1f6	23d41b74-018e-45f5-966c-c729188c1ca3	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	9	f
76d74c5e-f198-49c8-b6a1-cdb3d86b4077	c0a2a247-d6f0-4e43-bfd7-79d01e4eb16c	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	9	f
fe3072c4-6ec1-4f34-945c-3ff9d7f424c2	848b881e-e506-4273-b778-61cd669267d2	\N	2ec02719-3e89-4c09-ae72-492da1ea8eec	t	\N	\N	f
72e2f4ba-c4cb-43ff-85da-56e2fd56ce85	7ebec83f-f17b-4770-a9af-ea290f26e168	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	8	9	f
d7fadd0d-5bcf-42cc-9ce8-c82e2b9d929b	40a52df7-f50b-4105-b4d2-00e0b391156b	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	9	9	f
461e2543-1b92-4f05-a316-7cec13e3581d	6edb9c7d-338c-42b3-8bed-95c037398e1d	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	9	8	f
7e63422e-b57b-4ead-899a-7e2ef233df7d	0de6a87e-13a1-4713-988d-655e950c9fea	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	8	7	f
94cdc7d6-6d05-42e1-b409-34788a129b94	76d7ba34-af4d-41e0-934a-63461dc3aeac	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	9	8	f
96107d0a-b1de-4b83-b9ec-4aced41ff998	92214907-4fe9-442f-9f35-c7b59f78e08a	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	\N	9	f
0ba4435a-9bb4-4a50-bfa8-d624ebcddaa6	9c95ce1a-b395-4179-9558-10abb9105fd0	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	\N	\N	f
47e5a01f-c880-4342-a067-1a917ac2a25b	e2500f5c-1aea-4ffe-9f18-9b86022fce62	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	8	\N	f
3a5058ac-e5db-4031-bfe3-401d6229f713	33ce32f8-0ac8-47f6-a2a9-f5aa880442f4	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	9	9	f
83a06363-453c-4927-8724-0b3d5b4145a0	e3e017a1-6c30-4320-8ccf-3b2b276e8128	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	8	9	f
3c2cf0ea-a243-45b0-a18a-990fd406cc45	3cb1e21e-1338-4fac-8380-c69946fc26c6	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	8	7	f
dc62ee5f-2a26-49a0-be9f-29a4fb44e695	e1ceb28e-8139-41aa-bf55-3ef379c568ab	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	\N	9	f
01abfc4d-2d6a-4134-a746-898b37064e30	72a94026-88ad-4cbb-b1e4-e6aa917db696	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	9	9	f
25ae22d7-2cc9-482d-8b1f-bcc0a02b033a	5de52dab-1765-4acf-8020-053b68336487	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	8	7	f
204feb3f-122b-401e-9efb-f6d2aefad39c	268e1a31-5cba-4861-8aae-7d38fb140f13	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	9	9	f
3de2b540-8218-48a0-865c-0cec9003cbdf	0b357c38-9cda-428a-8a3b-0254143564df	\N	442e2cf3-3583-4bb1-9848-691cba355568	f	\N	\N	f
1cf6abee-c593-46bb-8ef5-dda2f80bb8fc	01ab146e-d9da-4562-a7dc-f3d151d4992b	\N	442e2cf3-3583-4bb1-9848-691cba355568	f	\N	\N	f
22a006a5-22ef-4410-bff1-6b6c35475579	9fc6c35d-b42d-4594-a960-5836531c7282	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	8	9	f
e4ef4217-1a02-4967-a56a-64ebf2adf3a1	18ccbf25-0831-40e9-9145-602b9d17ed2c	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	9	9	f
38bd3622-14c6-4866-b4c8-977f9db9e307	189e5ac6-f54b-4b10-ae14-ff92e63c3e5f	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	9	9	f
228922b0-a5b5-42f1-818c-a5b396919011	39e44baf-d5a4-4a7b-85ba-8d9ef3dd9567	\N	442e2cf3-3583-4bb1-9848-691cba355568	t	9	8	f
4e2bcda9-92df-4f80-bb47-d3c2697c075f	9f715b18-4cd7-48ac-b927-f43f7c166538	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	8	8	f
9ed2ef01-9c88-44a2-b62d-3bcd0ef087cc	d2bb5704-bed1-47cc-8879-681b17da4686	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	\N	7	f
c11f9d00-5cc6-4e19-8f22-c0840a830c18	31a2c199-fb37-4e7c-afb7-2619cc4f8260	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	9	7	f
a218b322-b2fa-4669-8349-716e874e6bc5	36f9a75d-23d0-4a2c-b6c0-e04cee9b1e26	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	f	\N	\N	f
c04eee1d-a54e-43b8-a812-4ed63085e349	25567d61-dd6a-4b36-a934-5f6894070674	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	8	8	f
e736a63d-cd63-413e-a216-08ec5a24eca9	f3d70376-e85f-44c5-ae21-9c138e6c1663	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	\N	9	f
5e054568-30bd-4b92-a682-b0e2ed820cca	de688b84-f770-47b6-9e15-3224c355d563	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	9	8	f
eedc8a8d-170f-41ec-b9cc-6aade5050d67	c177824f-0392-45e8-a26b-95cd21f3bbdb	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	9	9	f
3d6ea362-3cdd-49df-ba2b-069000850117	aaf7140c-7da3-4882-b2a2-99b19054b43c	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	8	8	f
b31104cd-da5e-43c1-a407-fb7f6c11fd48	fa187771-3d5e-4cb5-81eb-342568b7e833	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	\N	\N	f
d81dc272-fd40-418f-a287-ae53765e5e9a	cd2ac37f-bba5-4131-8a91-20280bb9b26c	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	8	8	f
afd27dd2-c604-4ecf-b2ad-baff68ebb194	a5fcc76a-56b1-4ed8-ba9d-5d62e20510d7	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	\N	7	f
52658923-a210-4067-a50c-333a12a13cf3	cf94a62d-ef7c-448b-9f61-16a9c6b90911	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	8	8	f
dc343643-cdf8-49f7-883f-ef17c546c1f7	e1ee0c51-198d-441c-a0e3-cce4c418d122	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	9	\N	f
f476d8f9-ff72-4aba-8d5b-01dbcfadfa53	69c689de-b305-43a9-a6e8-c65382e4e476	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	\N	7	f
f205ea78-4ff9-4e3a-99e6-7e7fc79266c3	288da2c9-c807-4e5f-9f49-507f1cabc93e	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	8	8	f
cf2bb3dc-3c45-464c-9e23-7a5f22dd16ce	918413c4-6838-4a64-b031-6d026f3ce183	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	\N	7	f
c264daa5-6a78-4ca3-93b0-aca34dba76e0	4ac1e1d2-cafe-4171-a02a-773ae38292c9	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	8	9	f
cf6bfb7a-b9f8-4370-9de7-b797d3552f2d	d2430900-d731-43d5-ae88-a0166a7cfdde	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	8	9	f
78e9b341-ce50-4fd1-89b1-ad3f4267f122	1f768e05-8228-4b44-9288-7eae6b5b4686	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	8	9	f
2f5b46ff-36d8-402c-a6ab-df63e839b822	d3433aa4-3325-4b9d-8d15-c4ebfdc7533b	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	t	9	9	f
b34c2b83-a763-48eb-b1ba-4d228aebf443	a29cc6ca-adec-4a7e-8b7b-3a6261a709be	\N	fb90b138-5af6-4566-895f-c9cfd96c7833	f	\N	\N	f
fb186ee1-a3a7-4964-8a7d-bbf6b4e7f288	f30953fb-1f87-41c5-b6f1-b9dbc28825ed	\N	0cf4bcfb-197b-4c26-b667-09af78a35d2a	t	8	9	f
cbdabc51-ca0e-45fe-b141-a16fdef65e66	d8d038a9-73b4-4ae5-8a92-88ed3edde4fe	\N	0cf4bcfb-197b-4c26-b667-09af78a35d2a	t	8	9	f
5b1db1a9-cd00-41a8-8bf0-5548867b8fff	789cb197-e7fc-43dc-b4bf-99fa339f92b4	\N	0cf4bcfb-197b-4c26-b667-09af78a35d2a	f	\N	\N	f
b8b2e652-601d-4880-a90c-d917a327c6af	eb053966-13fe-4afb-996f-d6646db325e4	\N	0cf4bcfb-197b-4c26-b667-09af78a35d2a	t	\N	9	f
66e3485c-3cc4-4003-87e9-64209781da3b	1242a7b5-d53d-4cd5-ae38-f65402ecf98d	\N	0cf4bcfb-197b-4c26-b667-09af78a35d2a	t	8	9	f
6c69e75d-7b84-4fe9-9d20-5a46f01ae729	e8b17234-4ce5-4c04-9507-ef785e100d73	\N	0cf4bcfb-197b-4c26-b667-09af78a35d2a	t	8	8	f
08d4512e-5664-4866-bf2d-e4cf99b0fce9	abb97912-4c5e-4cec-b3e7-d1d840be7e81	\N	0cf4bcfb-197b-4c26-b667-09af78a35d2a	t	9	\N	f
0f98301d-4ae2-4e47-a138-39e22c6070f3	9573f6aa-4bd6-4bf6-b320-1ee6b5ba8edb	\N	0cf4bcfb-197b-4c26-b667-09af78a35d2a	t	8	8	f
5a54bb24-dcd3-4bda-b6d6-9bfa18f5e1ee	7993aaf7-401e-4bef-b8c2-185aefd95344	\N	0cf4bcfb-197b-4c26-b667-09af78a35d2a	t	9	9	f
f6872773-0d7b-4e4c-af89-6214bcf979cf	0bd6f7ee-7d70-4a7b-9342-0e0d7b6548f7	\N	0cf4bcfb-197b-4c26-b667-09af78a35d2a	t	9	9	f
ee378d78-c195-4f3e-a135-79834b218f5b	51954512-0767-4d9d-b15b-439329a27094	\N	0cf4bcfb-197b-4c26-b667-09af78a35d2a	f	\N	\N	f
1a1acd05-8261-4dd7-8712-00cfc315fcec	f510b335-8874-49a7-b7a5-e0e1c68bf05c	\N	0cf4bcfb-197b-4c26-b667-09af78a35d2a	t	\N	9	f
e18a3e1d-5e9f-400a-aa90-36bfbda17d77	da006afb-aec4-4638-91e8-81bab1da0a69	\N	0cf4bcfb-197b-4c26-b667-09af78a35d2a	t	9	9	f
45c85abe-af23-44f4-aaa7-98a358d45a60	deca6386-deb7-4ce1-a697-d43c08ebe017	\N	0cf4bcfb-197b-4c26-b667-09af78a35d2a	t	\N	9	f
4c3dd3dd-4063-446a-87b2-6117db489a4a	f198a966-c599-4457-ab33-bc075adefadf	\N	c25cbba8-88d5-4757-87a0-2f2bbc77c5c4	f	\N	\N	f
564c5d74-d63a-4ac6-bde9-eb4ebb9cced4	6743208b-a2b7-4951-9d65-602313f52be8	\N	c25cbba8-88d5-4757-87a0-2f2bbc77c5c4	f	\N	\N	f
f5cfbd59-2ea5-4d2d-82d8-0f4cbb8bbc2a	f7aff351-6b9f-4caf-8717-5a611192f6d9	Jm	c25cbba8-88d5-4757-87a0-2f2bbc77c5c4	t	9	8	f
90da3b67-4065-4e84-9e63-1eb9612a1800	7cb540a6-c01f-42c7-a0e2-099d290c0b6a		c25cbba8-88d5-4757-87a0-2f2bbc77c5c4	t	\N	\N	f
186bc865-d4cd-43de-88e4-d911c4a24938	2a397255-ca16-43dc-b47e-a977a917f032	\N	c25cbba8-88d5-4757-87a0-2f2bbc77c5c4	t	9	9	f
5ee8a030-7b38-4f0d-a230-aea31b710777	b25c03f9-3bec-48f9-a045-c78745703bf7	\N	c25cbba8-88d5-4757-87a0-2f2bbc77c5c4	t	8	9	f
cb229444-52b2-4e0c-a1c7-b04d9bab4209	d989226b-aa7a-4dd9-a34c-6bf06ae4a429	\N	c25cbba8-88d5-4757-87a0-2f2bbc77c5c4	t	\N	9	f
51207a23-7f22-4c04-9dec-f95fe9624caa	4d9888c7-3be7-4fec-a5d7-07759cdff766	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	\N	f
490f04db-d6df-4853-a8ba-107602382d62	436f9966-c204-4794-89fa-e5e1a30b6247	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	9	f
84ccc25f-2688-460a-ac3c-7f35e37f6242	5c10a0b2-145a-4701-a64c-80a9369890a3	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	9	f
656aad31-9ebb-4342-b86a-baaf6869094c	8c057200-e725-4e08-b93c-88bd891fe862	\N	d4d650de-1b77-4d27-867e-32246c10aa72	f	\N	\N	f
5c1dd639-72cb-44dc-9fb6-07cb5560a02a	ad4248b3-989a-4794-844e-af4cb598a1e7	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	8	f
9ce2f92c-9d56-43ee-8875-3b94bd2d278b	61780abd-03a9-4ce4-89cc-059b5a2f5177	\N	d4d650de-1b77-4d27-867e-32246c10aa72	f	\N	\N	f
e4a31305-d9ab-435d-a31d-e74525e935e4	92eecb4d-b8c2-43ce-ac29-eb7a46566311	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	9	f
4a49a4c0-f95c-40e5-bf6f-82eddd2764cb	e17db94c-c058-4163-b1df-3824f2f732b8	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	9	f
6f5fdf9b-7460-4ff3-8804-9a323cbeeb6f	139ee728-7bd5-4ed5-b88e-65e455770b9f	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	9	f
cb32547e-5aae-4494-88f1-034666e9d466	28bf177a-d273-4b22-963c-4206fcffa9cf	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	\N	f
9b4f778d-c302-4c5a-8136-ffb8f3a90778	48f6a291-18c4-4349-8578-e9d40a016f99	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	9	f
e6022e14-075e-4517-9d14-1560dc781794	d1c1ad1a-62d0-4d6b-bf48-2dead02ed1f6	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	\N	f
760c6641-b0f9-4b13-a030-cfa649ca7aa8	e6537a2f-233d-4b11-8f1b-5a0814a675c0	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	\N	f
ab58b884-7f89-4421-860b-a1ea6d93e833	6f8a2928-32c2-4e60-9c99-b8073fcd9d35	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	\N	f
200e8e9f-2c86-44dc-ae27-089aea77698d	1a420969-4c65-4a34-bdc2-80e13ed51f0b	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	\N	f
3bbf8c72-dfc0-4cf5-b04f-f3e1a904dc92	6e24ea61-532f-452b-865d-b67df86c48c4	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	\N	f
a0058c36-002e-4427-af8b-144bb55aaf30	c08c69f9-ef26-4f6a-95ee-455d176dfa61	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	8	f
2d0894f4-af8a-46cf-9a9e-721a624d351a	3b6d04be-cd10-4e54-b5aa-28a67e8e2186	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	8	f
5f6ce66d-d05c-4454-b867-acfecc47a958	ec51a182-bf8d-436e-8704-b2d5cd897604	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	9	f
ef0073ae-0986-4050-a31b-1d6df4003746	a8df8354-0125-404f-a1d8-5584462a5b82	\N	d4d650de-1b77-4d27-867e-32246c10aa72	t	\N	8	f
dd063cde-b227-4caa-9556-aa7a462848f9	959e8e48-e3dc-4672-b263-cb8fcb8f3057	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	9	\N	f
daef9738-a521-4e69-aad5-9a36ca588714	ac72adf3-79e8-4479-a81a-be13b2603b33	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	f	\N	\N	f
019a34b5-d644-4697-ba8a-a9c65e9e091b	403d2ef2-23cd-437b-9688-43756e24a287	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	9	9	f
c7902690-d2ea-4971-b252-6ce6d3c202d8	c71cbbc5-3ad5-4c1b-a751-616db7f95169	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	8	9	f
69a74f08-618b-4d1c-a322-36a93eb44f67	8585f583-e996-4173-acc7-e61b2992a3c3	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	9	9	f
990ec820-6bcc-47b3-be60-d07fb7935c30	ed8b008e-b272-4a8f-a28b-3e10943865d0	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	8	9	f
c70abfcd-5a42-4761-9cf0-926010d3be11	b924bdca-75a4-4049-978c-22b6d57a75ed	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	8	9	f
17d0c711-1d50-4431-a58a-2817d57fcf63	05d139e2-1d0d-44d0-9d55-8640833f9067	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	8	9	f
c21e2e1d-c960-45ef-8415-391d3b4aeb0e	fe65a7a8-1054-4dce-a078-47e176bca0d3	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	f	\N	\N	f
dbc90eaf-1b0a-4979-aad5-b825148cd34b	3ff48490-fb0c-4328-8b8e-010efa10de13	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	\N	\N	f
29b65ccd-a6b7-4128-9e0a-9dc6bf79bfbe	394795ec-5959-4d19-9ee5-362213b77dee	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	9	9	f
7401c4a3-8276-4654-8424-43bb5af9e88e	53394cde-fdca-44d6-bae2-9c928f2f23a0	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	8	9	f
9f77dfa7-2eba-4404-bcf9-659b467b11c1	476293ef-adda-4c53-9a52-f977cb79d14e	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	\N	9	f
74d2225a-6633-4b63-8608-547f88beafd3	89864582-b6ce-4434-97ee-14767b35e1d0	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	f	\N	\N	f
171a19eb-1f13-4756-b1ff-89c54f9f3ef2	b7be5ecd-cc80-443f-8a6a-8125c91da527	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	\N	9	f
ba049e15-a261-4ec1-b8f0-7e0fcc338950	1199e08d-681c-4104-b883-89ebd887d53e	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	9	9	f
43b2ffbc-5540-41f2-94be-1d22ae9bebe3	fb382ba6-005a-42a0-9882-9735de457bc0	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	f	\N	\N	f
c8145bbd-39cb-4741-8304-a45fa12df76d	1d0f2b30-e376-4890-86af-e2585b65ee33	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	9	9	f
8fe1f20a-89e8-4d36-9586-a8e068f437f1	8fc516e0-c5ba-4181-a5cd-01f85629b4ac	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	8	8	f
6eb30b61-c01b-4470-9b64-295ca467ce63	41dbd3de-0883-454d-baaf-7613476052f3	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	7	7	f
cd488449-d071-46fb-827f-1d0865af5a31	5092be97-7e39-4aa6-bd2a-a517b48ff540	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	f	\N	\N	f
94713524-ae4d-4ac5-862d-98ea368fd2ff	264fe413-3243-45aa-809a-0f752bce3b4a	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	8	8	f
315d008a-0bf9-4a93-948e-9fc8c76a3f7f	71f99d4c-e3e1-4c88-af9f-2641131f3422	\N	86c90257-a257-48c0-94b1-57dadfca0a6e	t	9	9	f
72e754fe-0ef7-4537-b29e-11231cc60b00	f198a966-c599-4457-ab33-bc075adefadf	\N	be68b171-5a7e-4fae-9219-149771d8af9a	t	9	9	f
c524094e-1266-481c-8699-3f8a4abb0720	6743208b-a2b7-4951-9d65-602313f52be8	\N	be68b171-5a7e-4fae-9219-149771d8af9a	t	7	8	f
917d9634-a777-4527-a87c-e2b2e6ff4af5	f7aff351-6b9f-4caf-8717-5a611192f6d9	\N	be68b171-5a7e-4fae-9219-149771d8af9a	t	7	7	f
5d754192-e96c-46c8-8859-672639790f23	7cb540a6-c01f-42c7-a0e2-099d290c0b6a	\N	be68b171-5a7e-4fae-9219-149771d8af9a	t	8	8	f
22381f74-d714-4a4b-bf5a-dfcb606066f2	2a397255-ca16-43dc-b47e-a977a917f032	\N	be68b171-5a7e-4fae-9219-149771d8af9a	t	9	\N	f
854333bc-d21d-494f-8dc0-d90862bd2b2e	b25c03f9-3bec-48f9-a045-c78745703bf7	\N	be68b171-5a7e-4fae-9219-149771d8af9a	t	8	9	f
c55b4843-b91f-4e29-a763-7e422aebd53c	d989226b-aa7a-4dd9-a34c-6bf06ae4a429	\N	be68b171-5a7e-4fae-9219-149771d8af9a	t	9	9	f
560a248a-f8de-485a-91f5-4aec21e94768	4fa0db05-161f-4165-b00c-52528866490c	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	9	7	f
cf73975e-7322-4f45-86bc-975f307502cf	d77c55c5-670a-4bc5-bf46-5ff9662077f6	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	9	9	f
73a99d23-160d-4a3d-a150-e906308c88f4	8f2c8d2d-5ffd-42ae-abd0-cce3cddc1dff	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	f	\N	\N	f
0f77d728-5f60-414e-a1ba-e41331d0f0a8	dc2a0312-bdaf-45d4-b3a4-9c3216012e4b	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	9	8	f
efd92838-fe34-44e5-8fcc-a83c628f1bf5	cac00e26-1bd0-47c3-b2a8-4eb754562d6d	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	8	9	f
e298152a-58a9-400d-9127-69b90b4ca0dc	17a303e2-58b9-434a-b0e3-a3227ba197dc	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	7	7	f
644f1fe4-175e-49cb-beee-fd7a4c6c5ca9	a6eb654d-12a2-4350-a687-128314062791	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	f	\N	\N	f
1fc63742-ee13-475f-a299-cf53d34f5c03	08d712ee-e2bc-4ca6-9660-fa986c4c4158	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	\N	9	f
d16a97bc-487d-45dc-8ea3-e68a95edb4a6	5e8a31cb-3ca8-4d0d-9489-dc20d318827b	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	9	9	f
b6df03e9-729b-4e60-bc50-80d8c848f3dc	7131d54d-4686-4ca4-8a4f-cf090eaa7d5e	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	8	7	f
18d70583-3427-4993-ae0c-1c0735cfc9c5	a722bd23-2313-44d9-a0c6-82a5270900a8	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	8	8	f
19540002-4b5b-401a-b15b-4fc657a27b4f	5a07f60b-4776-4160-947b-fe207b5d64e5	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	f	\N	\N	f
9999aa44-0476-4591-bef3-1d4c4a657946	3e6e5df9-5dfa-4ca7-9a45-d715cff22c70	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	\N	\N	f
dcfc9aa0-ae85-4eb1-b190-6bb0f67c0464	45d76ed8-35ff-473d-b70c-92c0762d7a89	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	9	\N	f
efb9e372-bcc9-41cf-b22f-86bd0a7b7fcf	8cc39180-992f-41be-88d7-d798fc88abe0	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	9	9	f
a471ade5-0128-4759-ad04-4885a5bd0379	f8d6ffe2-7f9a-4126-9e27-9d374e3ab509	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	7	8	f
150e48f7-220c-4273-aa2c-932ce1cde518	789e18c3-638d-4651-be65-ec0a1661539f	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	8	9	f
a535602b-dc87-40ac-a522-b60db44acf82	d4a4ffc6-fd8b-45ae-82a2-f49d61729300	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	\N	9	f
a8aef383-f4c7-44bb-9314-85419d2ab1ab	9a8e559f-1792-4dbf-b515-2bff3261aaf6	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	7	8	f
e01b44c9-31db-42cc-86d5-d1126407368d	55d97917-9df6-48ee-9afe-cbbfa0fe1796	\N	683da996-f2cf-4d1a-abf2-9f84d7c36541	t	9	8	f
3d633493-7332-4f29-b81c-4eb987de35da	df5032e6-8740-4c54-a869-03e11dab715e	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	9	8	f
499e1cae-3c01-40a4-bb8e-9d1c3c3f752c	79171cdb-2833-4e72-bbf7-504cd4304ed1		f304a4cb-5765-44f0-abe9-662cf64c4732	t	8	8	f
b5c16b26-ce56-4037-bbd2-afc51896bf4d	9aaed25e-67f8-4d9d-ab09-96d4607a98a7	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	9	9	f
9558ebc4-7fb7-4b8f-b68b-607e68605792	28948e5b-d16f-4720-8387-92541786db50	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	\N	9	f
5fbce3a0-3621-4032-99aa-bc12a316803e	d63a461f-521c-4430-8e64-c4a05a9d6114	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	9	9	f
f8514833-71fd-46ca-9e12-1b3691766d36	75c425cd-2ba2-433d-a0b1-cfaca6290abd	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	8	9	f
ba06dfe6-e5b8-49d3-bccf-a8720a6faed6	892e5773-39a1-4412-84cc-c219683ca4f9	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	9	8	f
b8528065-6bdb-4e5d-a5a7-6e761440f67e	b5e44718-3033-432f-83a9-81edc4a14d47	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	8	9	f
6ce50180-b1aa-47bf-a066-4d6c8fcfa8e5	91a52f1d-e774-4925-8a10-9f5d7d7995fc	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	8	8	f
800ec886-01bc-4211-a4d3-0107348ccb4d	ae1feef0-be68-422a-8522-98700c2bd931	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	9	9	f
5787fdae-9a60-4d43-8fc1-6eeedb1374d4	a56a92a5-893f-4de0-af0a-e764be900502	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	9	9	f
ef651bf8-7027-4261-8b3c-be0e69c21f4c	82cd71ff-8e57-44ab-829f-f296a2929585	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	9	9	f
a0305409-9253-455f-aad8-47b387497982	d08c6dc6-1dc2-4a86-af3c-22e920af695e	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	8	9	f
48d95811-bfc9-4574-af2a-3f7b06729ea8	b71238b6-1cfd-41c1-92dd-fae83e40bea6	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	8	9	f
671a0c0f-7c84-42c1-8db8-ecf7f4f90e91	e5032b31-071d-4ac1-a61e-f341a7170084	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	8	9	f
d54855aa-1a11-4e90-a2ac-e0678a011b19	35c11fca-684d-4018-bbe6-ff17c59a80d2	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	9	9	f
169473c1-eb72-4831-8afc-41572d6cbc61	f5051172-84d5-4fbc-bca0-e4d808fa36f3	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	f	\N	\N	f
808bcc46-b602-41d4-9ed2-ce3532dce467	498d994f-bb8a-4e31-8451-79c4519c6541	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	\N	\N	f
4b04d686-84a6-4423-b3ba-4a0c321d15f9	9549b80b-fa32-4340-98fb-f827e29982ee	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	9	9	f
be51e12e-9910-4773-b818-7c355a0f2f55	20f182b2-d260-4286-a228-80f03a83d6d5	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	9	9	f
91b0c55a-1262-4973-a4ad-aabb263458f8	a678e014-275a-4fc3-96dd-0d356b8b84e3	\N	f304a4cb-5765-44f0-abe9-662cf64c4732	t	8	8	f
1ec6b56a-31f1-4a25-b7f2-19b4dd3c36e8	03397f36-f253-476a-a333-556ae179dbda	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	9	\N	f
3ac8912d-7367-4c86-a220-4b4cef9bedad	e0c8876f-57f1-43dc-9950-3851d82380fe	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	8	9	f
29088218-3c19-47fa-8b38-7626e0af379d	4e00db97-fd93-416f-a349-655a240056ae	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	9	9	f
41acd3c3-6d60-460b-bf14-8b6d4809a6c3	28e533c4-faf3-4e9f-ac97-ea948c1b019a	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	9	\N	f
84b21fff-ff91-408c-8bc5-629fd5038bae	775a7c76-dc4a-4849-baf1-d7f9080eaf89	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	9	9	f
f8d16e25-1ef8-43a0-86c3-fa472e33a160	02ea3a66-aa4a-420a-9334-f2b0941c564b	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	9	\N	f
a69d6734-c2d5-4118-9a50-8fbeade8835d	1dd2a92e-8754-4265-884f-db0a12b6a4c8	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	\N	\N	f
b73920f3-a8cc-41ab-93a2-3b6ebd450a48	5e5f9c60-1c5e-43f6-97ff-6e6144ecf55f	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	8	8	f
89356c91-3143-4410-b4fd-92642454f02b	b03cc979-7da3-4d75-b187-943264397b04	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	9	9	f
790b315f-518f-4b64-9487-ef8a09b9a4d5	db1510ed-3bb6-4856-8ea9-5012eeb68192	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	8	9	f
397d472c-97b0-4155-acf7-50436893d528	cfea9e73-0c9f-433f-909a-a088c3931b8f	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	9	9	f
63a1d1f7-75da-4dc1-8681-fac49c10f47d	ffb872b2-2bb5-4267-8e92-0514977ba44b	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	9	9	f
58e9d2ba-84fa-40db-a68b-bfdb036509ca	e34d25fc-b0e2-48f1-8d86-77ce7464822e	\N	fb583211-e331-41f4-a30d-2eb95e904950	f	\N	\N	f
a34f5f65-9334-4a4f-9fd7-96071144c418	05795f8f-d6de-4ec8-88fc-0df98df77292	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	8	8	f
6111bbb5-c116-454c-bf59-f7bac5c855e7	de0b5abf-b8c5-4046-aaf7-f9bffc544ca4	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	9	\N	f
e3b8e148-9fc2-4e64-8b64-b5802fc529f1	0eba0b59-1564-4d93-a65c-d5aa57c2ba93	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	9	\N	f
036417dc-cd6f-4227-93b2-22348246b594	1aa8b618-de8a-4a56-b1ef-33ea240f027b	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	\N	\N	f
e8df8951-3f93-4667-a2b5-f33234791160	dccdded4-f3c3-4949-937a-cfd65fae056d	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	8	8	f
37c046e8-568e-44d3-8363-3c993f6c97df	e7eb8c8a-033d-416a-848a-6da0d65cbf8e	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	9	9	f
e024fc7e-9646-4827-b8f5-40509ebea272	241042e2-7fa6-413a-a501-ab6c28dd86e7	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	9	9	f
810de00b-a21c-4098-b33e-edc569eb4e27	16530cbd-5612-4a8c-920c-9744e32be7bc	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	9	8	f
4a4e3fec-f5b9-49d0-848d-9e26855f7678	f18a8f1a-a17a-49da-8cc1-3603b4c21dc8	\N	fb583211-e331-41f4-a30d-2eb95e904950	f	\N	\N	f
a7870ede-4622-4621-b115-32bb9d2950b6	8cb49f42-d3d0-4a6a-9ac1-9569aed4991f	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	9	9	f
0cf73c16-b437-4600-84fa-c13680366c91	8a429230-9011-476a-9f6f-15494ecf57f2	\N	fb583211-e331-41f4-a30d-2eb95e904950	t	8	8	f
44be4e30-c14b-425b-adbc-b67dc6291451	c80a1da2-c657-4a2d-8ee3-55eaa6a3b1f9	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	8	9	f
ccb40162-4c6e-456e-92a6-33764c4b7e7e	8d17fa6e-0f31-4356-b76c-428b979d263d	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	9	7	f
d9f34a6c-4dc7-4271-9d52-d0cc1d9c1042	74744cbc-e78c-48df-b758-713f9a81751e	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	f	\N	\N	f
42ad5210-0b63-42e0-9658-91076cbf85e9	634c3f80-8b4f-4c38-ac4e-937418ec9e8d	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	f	\N	\N	f
b6053621-fdba-4633-a56d-59c359084754	5ce6b918-bcba-4712-98c1-d891eec91168	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	9	9	f
b88330d0-ec5e-4a2d-aacf-cd50bd62c2db	5e0e74f1-308a-4c20-bf9a-5011dff427d1	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	\N	7	f
5f0d3a8c-53f6-4de4-85c3-550985a29817	a2216f2c-6ade-4f5a-a8c5-515f09bd4b08	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	\N	8	f
fcdca3a9-131e-4e61-a00e-bceb18c81b56	b0aa13eb-dd72-4d41-9158-63ed22b2f65b	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	\N	\N	f
87ecdc23-9a62-43a4-9c83-f9e1f0e3d8af	904493af-2f99-494c-8b42-5ebe4c1ae1b6	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	\N	\N	f
d8b558dd-f4fb-48d0-8e74-0e5a02d2c15b	db8905a7-084f-4d92-af60-cf29824dabe7	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	9	8	f
ff03c37f-a45b-4362-8412-768dd9911caf	fa71c8f8-45c8-4a24-b0fb-6a0ecd67af3c	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	8	8	f
dc5e488e-bcdb-4dc8-b100-6bcc6460630c	5f877b5d-eaeb-404c-b3cc-d51a467fa428	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	9	\N	f
7a8a09cb-5147-430b-b220-a3ba1aa99b40	fcabdea5-1224-442b-8142-62be862508e3	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	\N	8	f
b7c765d9-ef0f-44fb-b0e0-f77c9d13e42e	b580b35d-10c3-4ce3-9f87-37ce3a436eaf	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	9	9	f
5d80d224-0281-41c3-bc13-bf0c6b5f1c85	f034aa91-48ff-496e-b25b-9c81eaaaa3e3	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	9	9	f
2ca125bf-0698-4a1d-b142-da514d6fbbb0	bf09f310-3700-49db-b3f3-384cd041e6f2	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	9	9	f
3f4afd86-5020-45b5-8ad8-241df66fd596	eb6a2d6e-33a5-4ad2-95ea-a39741e9b905	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	9	9	f
9a9bb3dd-58ad-41c3-975b-3874a540623c	7df2a50b-b064-49a7-a5d5-747b117f107c	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	f	\N	\N	f
6676c18e-b7ea-4c10-9bfc-258e4191515a	fe5ede8f-8290-4b69-b575-75aeaab46f2f	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	9	9	f
690edbf1-5d32-4b09-9b97-295cf3d0d39e	50d7ab1f-3cf2-4e10-9286-36df63a6e81b	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	f	\N	\N	f
1d518b7e-70c9-4f2c-9353-768e2ee353bb	7756327f-59aa-40f9-aa95-88889e4ea759	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	9	8	f
19869038-a537-42d6-b1bc-c9efebbed637	c5a69235-e2da-483a-b4d4-898fe3bd4c75	\N	2f6a5924-807e-47a5-96c4-0f4d7d42ed18	t	9	8	f
699b1df8-1c2b-4740-b92d-1ab9ff3a85bb	148a28ac-012b-44c4-b684-87a00ace9c72	\N	71a91b99-d2d2-4328-8d09-b34be35f4bc4	t	9	\N	f
d5d7b1b9-eb0b-415c-af22-f2c06eab13e1	d0c101ca-4d6b-43c2-beb1-a4680f44dd5a	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	9	9	f
9b86ffbb-c0d3-4d93-93e0-960ffe83517b	db6b1a3f-e485-4b8f-8a25-0a8e518a2026	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	8	8	f
178e3d9b-a9f7-4e48-ad87-f9fad71ca8d7	7e447ce6-5569-47f0-9000-20ae93a68bd3	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	9	9	f
997c528c-542b-4978-a0e2-da67b7b7a576	95db6c22-a14c-4f47-b6c3-5ddffdbd933f	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	\N	9	f
6ebe5e91-c112-4e26-94e8-8ec2cef2b0c7	0025a5a3-6947-4d23-b100-bcd5a58c6e09	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	8	8	f
0848d29c-1445-4ec7-801d-de0f28605a1c	971b8500-6c50-4f89-ab1e-f5219ccdef93	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	9	9	f
fd56908a-e134-45a6-bf6d-36e9aa3083e6	a3be9480-89da-4490-aad6-4507acd56e6c	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	8	8	f
9139639a-308f-43a2-8318-ec329cc11d64	c695adc1-a07a-4ebf-b99f-9714e4ab4bf7	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	f	\N	\N	f
934bc2a1-feec-48c7-8952-59bdecd93bb1	2abacf8c-b973-4678-9504-e30861fdcba5	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	9	9	f
b89ab9f5-0c62-4837-bf44-048128939df5	bdbdbd45-458b-41df-ba2f-ab5e4406bb26	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	9	9	f
2fb1723f-f1ce-4291-a349-4f2369af261b	e0562708-15b5-478a-8f5a-1863c55a6f38	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	9	9	f
5aa4506d-a5a8-4125-bd68-063723f9918f	8730fbfe-4cab-41db-8b7d-a750e3448184	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	9	9	f
f578876f-f535-4800-a5ee-2504652a533a	52c3b46f-5204-40ad-9150-17b0a7077eed	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	9	9	f
a5aa8ab8-c3ad-4e79-aa37-1f95c015a83d	0d894576-e308-4a66-a809-d8530eb5753e	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	9	\N	f
d2fcf108-905a-4562-8d73-872a20b105d6	e111c54d-9b2e-406b-aab4-e61fe921dbe2	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	8	9	f
f4cbd982-84bd-4ea1-b5cf-dc6437a84911	7ac64248-1e14-4e88-ab15-a9a552d3811c	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	\N	9	f
1636c885-29b9-4247-a25a-1e7506132534	f4df5072-2986-4859-a7cc-6d06a6fe21ad	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	f	\N	\N	f
9c4759d1-13af-47a1-99b5-2f5753fc0e6e	3cd7167d-e20f-4291-9e18-5241b854e116	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	9	9	f
1c7c9ece-150a-444b-ab0d-89c33e9e3f76	1e7d2903-2e91-4fca-b77f-211821ad0b07	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	9	9	f
820c7811-ebc0-475e-8685-03616dc66a62	5e4779f0-fad2-4f94-b350-e56b4c5f5471	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	9	9	f
c16ba20c-f960-46f6-b483-4c42e73125a0	77793959-dc53-44d1-8cd5-ddbe3c4b25a4	\N	c9c54bfb-7c50-4775-88cd-a79b941ebd09	t	9	9	f
580625a2-8012-42e6-99ae-d272399dc5c2	d9ac630a-298d-422c-8d37-72fc3991857d	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	f	\N	\N	f
bbc17756-a0e4-4866-a5c6-81b2f17ea37f	1f12b19a-138f-4000-a576-c5dab30ec9e9	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	9	8	f
31e414d7-6ec8-4b3a-a8d9-095c5f5e3bdb	c732359d-e9bd-44c3-aa2e-bd92bfb911c2	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	8	8	f
7ea4835a-1617-4780-815c-4f3021900abf	7c8f19ba-b172-40e7-8e9b-da74d07eb54a	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	\N	\N	f
e0076957-0dd5-4234-9e79-a9bc2b037853	f031aca9-7acb-43fa-9884-72547dac5709	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	9	9	f
2d583d28-974c-44c3-a0d9-8e989616ca62	2113c63e-c4a7-4e49-90a6-626646c3d949	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	9	8	f
975aaf74-efd8-4513-b149-762ff9617f51	3eb15f99-938b-40e3-b16f-bce35248b3b8	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	f	\N	\N	f
9f9e377e-9fdf-418f-802e-b264e5d1b5e1	e0357050-7b2a-4b32-87cf-af5747b17208	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	9	9	f
a6868ce2-74b5-40c2-9ec7-310ebb7ef2b4	a09eec89-d6b8-4a66-b95d-356d800aaa8f	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	\N	\N	f
9aea221a-8ddb-4074-a632-bb9f53e5c6e9	d202ea60-e678-49fd-8ecc-581cad6b508c	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	\N	9	f
904c5887-f1c8-46fd-bb0b-1e807590087f	d4e6aa85-cd60-4901-bd59-413ee93a3314	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	9	8	f
616d04e2-c850-402b-98bd-b699ababb3cb	7a3453eb-b303-4944-9bfa-f7bfdde76864	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	9	9	f
795d90c2-3f6d-411c-9f26-2585adc54e03	13e7ba68-1fc6-4e4f-947a-0370f5aff61a	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	9	8	f
b296943d-d1db-4a81-a972-e25edfd07c0e	0fe083de-7bae-4fc1-815e-b4ead74b6a69	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	9	9	f
a347e061-e748-4bf6-a94c-4984ede406be	9b2269f7-aba5-42f6-afab-ccfa7bc42585	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	9	9	f
ab584559-4af1-414f-aa1d-c12f0dfb9562	23d41b74-018e-45f5-966c-c729188c1ca3	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	9	8	f
bdd524da-76a3-4970-95f4-2b5673fff1a4	c0a2a247-d6f0-4e43-bfd7-79d01e4eb16c	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	9	9	f
6d6d4659-f96b-4463-8ef6-63372c5f210c	848b881e-e506-4273-b778-61cd669267d2	\N	2bcf4c09-33ba-4738-a859-976b4e4e65b1	t	9	9	f
f8727a1e-178d-42f6-8ffd-503cd53feb11	7ebec83f-f17b-4770-a9af-ea290f26e168	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	9	9	f
115c0b23-58ea-4bf2-a79c-208b0c6e9f23	40a52df7-f50b-4105-b4d2-00e0b391156b	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	f	\N	\N	f
245ff2c6-d0af-47c8-a875-00ef93de97f6	6edb9c7d-338c-42b3-8bed-95c037398e1d	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	\N	9	f
d952c414-26a9-470a-bcde-9aa15f292af6	0de6a87e-13a1-4713-988d-655e950c9fea	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	8	7	f
4ddcaefd-9b6b-4c86-8358-ddf8143defe7	76d7ba34-af4d-41e0-934a-63461dc3aeac	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	\N	9	f
3f552e10-33c2-4e10-9b45-3b29ecdebcdb	92214907-4fe9-442f-9f35-c7b59f78e08a	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	f	\N	\N	f
e294844b-3c22-4489-9a39-e7b9312f3c0f	9c95ce1a-b395-4179-9558-10abb9105fd0	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	\N	\N	f
73447a89-9a1e-4247-917d-c5c5a5b060c9	e2500f5c-1aea-4ffe-9f18-9b86022fce62	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	\N	\N	f
f9f8b794-457f-4b3c-ae2e-655bbfd55904	20ecb99e-8262-4a44-944f-00642e085fab	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	8	8	f
1cad8642-7f8a-4551-880f-7b6ad71201e5	33ce32f8-0ac8-47f6-a2a9-f5aa880442f4	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	9	9	f
2fac385a-e943-41de-ad09-be097f6302a0	e3e017a1-6c30-4320-8ccf-3b2b276e8128	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	9	9	f
d087a9e9-476e-4828-82ae-f3d71f658791	3cb1e21e-1338-4fac-8380-c69946fc26c6	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	7	7	f
23c2c82f-bd75-4648-9caa-3ecd6c8e45ed	e1ceb28e-8139-41aa-bf55-3ef379c568ab	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	9	8	f
7a51c6a4-f5e7-4d78-b5ee-0fe3e23802f3	72a94026-88ad-4cbb-b1e4-e6aa917db696	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	9	9	f
1cf0df58-0f17-4dd1-98d6-938ddb736ff2	5de52dab-1765-4acf-8020-053b68336487	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	7	7	f
f71c7374-3145-4c69-bff7-8d95bbdf6124	268e1a31-5cba-4861-8aae-7d38fb140f13	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	\N	9	f
04c2bf83-1b7b-463c-90f2-bca49eb29c01	0b357c38-9cda-428a-8a3b-0254143564df	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	8	8	f
c16841ad-5bc8-4674-a903-e8275ce9958a	01ab146e-d9da-4562-a7dc-f3d151d4992b	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	9	9	f
a8a72469-397f-43ce-9dba-bb6d3424b7ad	9fc6c35d-b42d-4594-a960-5836531c7282	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	9	9	f
11263013-ad59-4736-8405-295ae90701e0	18ccbf25-0831-40e9-9145-602b9d17ed2c	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	9	9	f
bf83a8fe-c894-4011-9f00-907e115f4c39	189e5ac6-f54b-4b10-ae14-ff92e63c3e5f	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	\N	\N	f
10973762-a2e9-46bd-a6f6-8e9d202d68c5	39e44baf-d5a4-4a7b-85ba-8d9ef3dd9567	\N	edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	t	\N	\N	f
0ae3f620-0e53-4d2c-9035-6beb78d75d8f	fb55d701-d27f-4ecd-a5ac-e4a1eb439afc	\N	848c9d35-2b6f-4314-ac47-a586d8261405	t	9	9	f
22d41fda-12b8-4be6-8340-5675a27337bb	39c0a18f-7107-4c0d-8108-b9829dcb7451	\N	848c9d35-2b6f-4314-ac47-a586d8261405	t	6	\N	f
3fd5ab44-23b6-4ab3-8b89-4d73c0dc7cc8	c6cff715-fd29-4442-b5ca-7874a7815566	\N	848c9d35-2b6f-4314-ac47-a586d8261405	f	\N	\N	f
3aafbf2b-820d-4356-b899-b8871a5b9e3d	33460758-511d-4f77-b17e-405a2427b733	\N	848c9d35-2b6f-4314-ac47-a586d8261405	t	\N	\N	f
186ed267-f408-4f9c-b895-91a612ed9fc6	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	c5e7d13a-39ea-43a2-9490-1f8e8473e66f	t	7	7	f
a2fca3a4-414a-4a81-bbea-5f2005512515	1d5babbc-5045-4ded-b39c-52920bc7f82c	\N	fe36ee80-78be-42a3-bbf0-3677b51326b1	t	7	8	f
bf52a2e9-3a38-4678-bcad-2a2f8f879847	df05106e-6e95-4a82-af93-c5f6f8a58047	\N	319b9693-947d-454c-bec8-429501c9ceb3	t	8	9	f
da628c94-5580-4e40-bd7e-e99b08042086	24bd87c1-454d-412e-a843-595ffdc4892b	\N	319b9693-947d-454c-bec8-429501c9ceb3	t	8	8	f
cf0bcd17-838b-4945-845e-5bdd5746c276	e459564c-d6aa-4fec-8790-508218a41435	\N	319b9693-947d-454c-bec8-429501c9ceb3	t	8	7	f
136476dd-5872-4ff7-ab2a-54140c3016e8	c99cbc5a-d88b-4022-bc5a-aae33f51e30b	\N	319b9693-947d-454c-bec8-429501c9ceb3	t	9	9	f
4c7d076f-68e0-459f-912e-642a5416b796	19e1dc4a-356f-4eb6-ac1e-f81f0561db71	\N	7ed4fdd0-0d57-4bcf-97a4-646f0fcc2790	t	9	8	f
5ee19974-c017-42b4-b892-47abea2f3f38	8a881aaf-8159-4745-ae81-31760bf6a53c	\N	7ed4fdd0-0d57-4bcf-97a4-646f0fcc2790	t	10	10	f
50f1b0be-b79c-4ea9-b78b-0f5ae5b5fdfe	f71fab39-54cc-44ea-b9fd-2b4cea23aaea	\N	7ed4fdd0-0d57-4bcf-97a4-646f0fcc2790	t	8	8	f
3801231c-72eb-4ccb-89be-23b79d0dcf9e	1dba0411-e9c0-4fc0-a546-4b3b0b6e0d7c	\N	7ed4fdd0-0d57-4bcf-97a4-646f0fcc2790	t	9	8	f
0ca88808-cb6d-41bb-9f0a-1120a2a72218	1bfba8d7-258c-400c-be9b-e8bc391bb98a	\N	7ed4fdd0-0d57-4bcf-97a4-646f0fcc2790	t	9	8	f
34b448ae-de09-4464-9445-3c319919e066	3644e4a4-3155-40a9-aa52-bae1461f8676	\N	7ed4fdd0-0d57-4bcf-97a4-646f0fcc2790	t	7	6	f
12a8fe59-54f3-42bd-9df1-b2f9d858830b	368b58cc-6d2b-4b27-a7ce-c6df69b4b29d	\N	7ed4fdd0-0d57-4bcf-97a4-646f0fcc2790	t	8	9	f
7f028599-68ae-4f8c-8548-d1481bce39c0	f3d70376-e85f-44c5-ae21-9c138e6c1663	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	10	9	f
40deb374-d72e-417b-98a7-12a4ae30e23a	de688b84-f770-47b6-9e15-3224c355d563	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	9	8	f
94edd631-21f3-4707-a870-faf9372e9d99	c177824f-0392-45e8-a26b-95cd21f3bbdb	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	f	\N	\N	f
c0075ee7-cf2b-4382-b9f2-ec4982f19147	aaf7140c-7da3-4882-b2a2-99b19054b43c	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	7	8	f
b9701332-a4c8-4d23-a2eb-962b69115e59	fa187771-3d5e-4cb5-81eb-342568b7e833	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	10	9	f
067a3bd6-fefc-477c-be39-8a21eb6cea5f	cd2ac37f-bba5-4131-8a91-20280bb9b26c	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	8	8	f
96228443-e3b8-4c41-8212-9e39b90cb4fc	a5fcc76a-56b1-4ed8-ba9d-5d62e20510d7	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	9	8	f
32a7058d-bebd-404d-b4d6-275e12f7476c	cf94a62d-ef7c-448b-9f61-16a9c6b90911	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	8	8	f
0c3ed236-8dd8-44bf-91f7-53a89954c336	e1ee0c51-198d-441c-a0e3-cce4c418d122	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	9	9	f
ba79ac3c-26af-4664-889e-ac4ffa9822e6	69c689de-b305-43a9-a6e8-c65382e4e476	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	10	7	f
0f96236f-eec3-488e-9746-e0b21b04bf06	288da2c9-c807-4e5f-9f49-507f1cabc93e	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	7	8	f
bae6b876-a8c4-41c7-8670-384e78dda14a	918413c4-6838-4a64-b031-6d026f3ce183	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	10	7	f
06ad131f-869a-4cda-bee4-14eaa9840db0	4ac1e1d2-cafe-4171-a02a-773ae38292c9	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	9	9	f
68155299-59cc-4890-a802-10032ca4570d	d2430900-d731-43d5-ae88-a0166a7cfdde	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	8	9	f
07f3ec2d-faee-470d-aa44-d907f9d35a2f	1f768e05-8228-4b44-9288-7eae6b5b4686	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	9	8	f
069fca5f-7989-4f5d-8e48-87f22d8fdcfb	d3433aa4-3325-4b9d-8d15-c4ebfdc7533b	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	f	\N	\N	f
b78c03c4-bb72-42bc-8097-3797bce8ee56	a29cc6ca-adec-4a7e-8b7b-3a6261a709be	\N	eded69bb-0030-4d76-915c-ff9b56f0bf37	t	7	8	f
2ba3897a-cf8e-4e8a-8aff-f2bd25064611	f30953fb-1f87-41c5-b6f1-b9dbc28825ed	\N	3b1e4ba1-e6b4-4a0b-8963-6622d754c465	t	9	10	f
496b7dba-4913-4758-9513-6a6cf0bfeeb1	d8d038a9-73b4-4ae5-8a92-88ed3edde4fe	\N	3b1e4ba1-e6b4-4a0b-8963-6622d754c465	t	9	9	f
3eaadebc-6418-4b64-81d2-b6860abdf3ae	789cb197-e7fc-43dc-b4bf-99fa339f92b4	\N	3b1e4ba1-e6b4-4a0b-8963-6622d754c465	t	9	8	f
58755506-0583-4b5d-8dcc-6fabdf548e68	eb053966-13fe-4afb-996f-d6646db325e4	\N	3b1e4ba1-e6b4-4a0b-8963-6622d754c465	t	10	9	f
7ec67a38-8851-4ac4-9e64-d849fd7c2842	1242a7b5-d53d-4cd5-ae38-f65402ecf98d	\N	3b1e4ba1-e6b4-4a0b-8963-6622d754c465	f	\N	\N	f
5d3ec898-fcf0-4cbc-8bba-7d8105a5ab12	e8b17234-4ce5-4c04-9507-ef785e100d73	\N	3b1e4ba1-e6b4-4a0b-8963-6622d754c465	t	10	9	f
a1aed396-c7c2-4228-8870-51890b46173f	abb97912-4c5e-4cec-b3e7-d1d840be7e81	\N	3b1e4ba1-e6b4-4a0b-8963-6622d754c465	t	9	10	f
2d3cb057-ad8a-41b9-8fa3-5b3dd03baaf6	9573f6aa-4bd6-4bf6-b320-1ee6b5ba8edb	\N	3b1e4ba1-e6b4-4a0b-8963-6622d754c465	t	8	9	f
4c949c49-aa80-4d8b-9e58-53cf2bf4bd51	7993aaf7-401e-4bef-b8c2-185aefd95344	\N	3b1e4ba1-e6b4-4a0b-8963-6622d754c465	t	9	9	f
a221dfad-8225-40c7-8d08-3d4e1e418d73	0bd6f7ee-7d70-4a7b-9342-0e0d7b6548f7	\N	3b1e4ba1-e6b4-4a0b-8963-6622d754c465	f	\N	\N	f
af9c7b57-a750-4468-89c2-b384e8a0d723	51954512-0767-4d9d-b15b-439329a27094	\N	3b1e4ba1-e6b4-4a0b-8963-6622d754c465	f	\N	\N	f
c2ab652a-0ee1-4b0f-beeb-8aed22d57e27	f510b335-8874-49a7-b7a5-e0e1c68bf05c	\N	3b1e4ba1-e6b4-4a0b-8963-6622d754c465	f	\N	\N	f
0edc5b4e-84eb-4758-aefc-fa3b2a923d1f	da006afb-aec4-4638-91e8-81bab1da0a69	\N	3b1e4ba1-e6b4-4a0b-8963-6622d754c465	t	9	8	f
2091b2ec-605e-4489-a6e7-00b66cf71047	deca6386-deb7-4ce1-a697-d43c08ebe017	\N	3b1e4ba1-e6b4-4a0b-8963-6622d754c465	t	9	9	f
9372b035-d0ac-4678-9d9e-11ee8244b058	df05106e-6e95-4a82-af93-c5f6f8a58047	\N	1bc699a0-733c-4e83-ba1b-b6175076e18d	t	8	8	f
2b8eca1c-a67a-473a-9dae-e090bd37e260	24bd87c1-454d-412e-a843-595ffdc4892b	\N	1bc699a0-733c-4e83-ba1b-b6175076e18d	t	8	9	f
be24e57d-2098-4aab-b34b-f9f12a08eb33	e459564c-d6aa-4fec-8790-508218a41435	\N	1bc699a0-733c-4e83-ba1b-b6175076e18d	t	8	8	f
5891bc4f-20ac-451c-b5eb-c148f96e6f80	c99cbc5a-d88b-4022-bc5a-aae33f51e30b	\N	1bc699a0-733c-4e83-ba1b-b6175076e18d	t	10	9	f
e3076e2b-6a7b-4563-a62d-1ca6236bf465	2c42a7d7-10ee-46d8-b057-103c9d3773d9	\N	7a7c9ff7-05cd-45f8-94ef-d35c694786ef	t	6	7	f
2f9d6b18-545e-4ba4-8911-b05e5702e8fb	82730f97-2ae0-4d3a-837f-5240a2f2c2a6	\N	cd607d5e-69e1-42cf-a1a6-ee16359bf6df	t	8	8	f
e8d34052-20b8-455f-b057-b6e5bc49e2c4	e2ecf55f-a86e-42a3-a3a6-4fe343a72714	\N	cd607d5e-69e1-42cf-a1a6-ee16359bf6df	t	7	4	f
54d97114-53ec-438b-9ff9-5821222e09c4	36b348ce-52b7-4eb4-bd76-baffbf5d115f	\N	cd607d5e-69e1-42cf-a1a6-ee16359bf6df	t	9	9	f
c24c00e4-db18-4752-864e-3b21d63dfb1d	73f03e4f-8b55-4142-b087-ca4ee1eff895	Kallelle lampaita. Ei pystynyt tekemään aamupalaa kertaakaan koko reissulla. Hävetkää!\n	cd607d5e-69e1-42cf-a1a6-ee16359bf6df	t	7	4	f
910051b7-8247-4467-83aa-426972d45653	66b45f46-15a3-45d1-ba38-0dab4c7d4acb	\N	44b021a4-4a91-448d-b422-02edb42a1a3e	t	8	8	f
1bf908d7-7b9b-448e-9c02-c163965189f4	e73686ce-bcea-4b2a-bc63-aae356311ac4	\N	44b021a4-4a91-448d-b422-02edb42a1a3e	t	9	8	f
1ccafb5d-a10b-4281-8c44-dbbb56d2a6f0	550ee65e-9c0b-43ef-bf36-e3d86ef613d0	\N	44b021a4-4a91-448d-b422-02edb42a1a3e	t	10	10	f
f31c1b07-8bfb-4ff9-94e8-7a13cf5c968f	57aefd40-c100-4ecb-9d57-998ae10249de	\N	44b021a4-4a91-448d-b422-02edb42a1a3e	t	9	9	f
4001791c-e555-4248-8a33-23933ce2cdc5	100ba60e-fd34-415a-a458-552400f75ef3	\N	44b021a4-4a91-448d-b422-02edb42a1a3e	t	8	8	f
0501f13c-1348-42df-904e-cc561ad93900	8d7f13ef-7847-4d41-aff7-d0bc70fcf797	\N	44b021a4-4a91-448d-b422-02edb42a1a3e	t	9	8	f
9ded9b0e-cde3-4da5-93d7-b65a3d5ac364	637a9688-3c94-42f0-aeba-65bc859d4ddc	\N	44b021a4-4a91-448d-b422-02edb42a1a3e	t	7	8	f
0f98ff64-308b-4df4-96eb-130b9310ddfc	11575e9b-f03b-475b-b91f-d603a3736412	\N	44b021a4-4a91-448d-b422-02edb42a1a3e	t	7	6	f
d7645a16-5e95-4e6c-b02a-bde18e1ac8e4	18f3169d-e9b8-4853-9a86-ca751a88cdc9	\N	44b021a4-4a91-448d-b422-02edb42a1a3e	t	7	7	f
44d12928-6be5-4b8d-8d98-ae6708778766	c4421b10-1a79-4f11-a1be-50efaf377673	Opit hienosti kiekonheiton alkeet ja osallistuit tunnilla aktiivisesti toimintaan, hyvä!	20fd7772-564d-49d2-8894-d349e53dee28	t	9	10	f
89d530a3-79aa-4633-add9-e4cd01007834	272f6dea-2e4e-48f4-89d0-d2e35ccae1b4	Työskentelit tunnilla aktiivisesti ja varmasti opit kiekonheittoon uusia vinkkejä.	20fd7772-564d-49d2-8894-d349e53dee28	t	8	9	f
acee69b3-c7b0-4ce3-9348-c7c6267cdc74	884de3a6-f689-423a-aaef-d7b34cb5c9d4	\N	20fd7772-564d-49d2-8894-d349e53dee28	t	9	8	f
2c9822c0-fe62-4582-97be-52549d50a2af	fcfaac7e-a6f4-41d5-9866-c9495aaf4161	\N	20fd7772-564d-49d2-8894-d349e53dee28	t	8	8	f
72c78a9d-c262-4b79-8ea5-81dbd87f2ab5	a620ae00-156e-48f0-9067-9edb21e5b746	Saavutit loistavasti taitojen oppimisen tavoitteet, mutta harmillisesti taas keskittyminen välillä herpaantui Micon kanssa. Muuten työskentelit hyvin ja innostuit kiekonheitosta, josta halusit saada palautetta ja kehittyä siinä.	20fd7772-564d-49d2-8894-d349e53dee28	t	10	9	f
672885e7-7139-459f-813a-8e3e1f81bd02	615f7448-1b41-4ed3-879b-2bb3d5043cfe	Työskentelysi oli tunnin huonoa, etkä juurikaan saanut tuotua esille liikunnallisia taitoja. Taitojen arviointi on vaikeaa, jos opettaja ei nää niitä huonon työskentelyn takia.	20fd7772-564d-49d2-8894-d349e53dee28	t	7	7	f
1a7b0c0b-d011-4a52-8774-1576aef5cd8b	d94665be-b668-4c42-8c9e-5bdef501b832	\N	20fd7772-564d-49d2-8894-d349e53dee28	f	\N	\N	f
1a4d6b1c-f1b2-43cb-88b6-6bf04dec90c1	cb46f328-5e29-4df0-932e-5829eef3786f	Osallistuit kivasti sekä käsipalloon että kiekonheittoon, hienoa!	20fd7772-564d-49d2-8894-d349e53dee28	t	8	8	f
0898fbd6-58bd-4f21-8a1a-fb369e789fb9	ea46af04-d0c5-4d32-9ac4-6a31c848514c	\N	20fd7772-564d-49d2-8894-d349e53dee28	f	\N	\N	f
4626e13e-055d-4211-b507-d89ff2e77614	4b1dd29d-5953-40b2-b0c7-abd8ea728ab6	Työskentelytaitojen tavoitteena oli parhaansa yrittäminen reilun pelin hengessä ja siinä oli sinulla hieman haasteita. Esimerkiksi jäit purnaamaan tuomioita opettajan ja muiden oppilaiden kanssa.	20fd7772-564d-49d2-8894-d349e53dee28	t	8	8	f
add3d84a-b59c-46fb-a65f-20b215cf6892	9e572ef0-8ceb-40c4-b2f8-04c9dd988432	Osallistuit hienosti käsipalloon ja sait siinä kivasti onnistumisia.	20fd7772-564d-49d2-8894-d349e53dee28	t	6	8	f
eda2b2e2-ecc4-4022-811a-c6d478231648	4a8b8ecd-75fe-4ae3-a869-f09063a6770a	Loistavaa tekemistä sekä käsipallossa että kiekonheitossa!	20fd7772-564d-49d2-8894-d349e53dee28	t	10	10	f
73024d29-0429-4b40-a5ee-6b7ece42d653	8413e666-efc7-426e-a147-b27040cffe46	\N	20fd7772-564d-49d2-8894-d349e53dee28	f	\N	\N	f
5d7808a9-cd7d-425e-b6c9-c971ca53ed1c	85177c4d-7db2-49a6-bdad-68a528cf112a	Loistavaa tekemistä sekä käsipallossa että kiekonheitossa!\n	20fd7772-564d-49d2-8894-d349e53dee28	t	10	10	f
9a7e4dfc-c50c-47da-b09c-36864542eaab	f65f351a-ef4b-4e1c-adad-e922ffc3cb6c	\N	0dc45b77-63e5-45af-a850-9618308a47e7	t	9	9	f
e46ec779-d17a-4288-87a0-58f03d46b8e8	a8b26b54-ac8b-4413-90e4-a0e93cb445c0	\N	0dc45b77-63e5-45af-a850-9618308a47e7	t	8	9	f
c7ffdcb3-4aa0-4cb0-bd2e-ce4fb93fd622	5603622d-f94e-43f9-bd63-f3db770d63e8	\N	0dc45b77-63e5-45af-a850-9618308a47e7	t	8	8	f
532a56f1-ebe4-4929-9921-8ca21dc28d97	0af63b5a-f6d8-4a96-bf25-48edf23cced6	\N	0dc45b77-63e5-45af-a850-9618308a47e7	t	8	8	f
30b002d8-504c-46a7-a0a2-e023a56ded10	7b6a128e-3218-41e0-b08e-f1de59a25ec6	\N	0dc45b77-63e5-45af-a850-9618308a47e7	t	8	8	f
700a598c-0008-49c9-8e3f-629ca148737d	4ce5b44e-70c7-44ca-bef9-0f58bd4c4066	\N	0dc45b77-63e5-45af-a850-9618308a47e7	t	10	10	f
b3c100d1-c1e9-4102-9d62-454ad5864290	82a750ba-35a8-4a53-bba8-6c67041d8ef9	\N	0dc45b77-63e5-45af-a850-9618308a47e7	t	10	9	f
5a284a4b-a54c-404f-ab53-a9d07a764195	b212bc91-6990-4647-8b3a-d15a6188fbdb	\N	e4c3d476-62fa-4353-8fe6-3cf0b6ceaf74	t	6	8	f
49ba09d7-f649-4fc1-bc7c-27868f5d76c0	f198a966-c599-4457-ab33-bc075adefadf	\N	d4d9d93d-8632-4c20-870e-2fe1bd957194	t	10	9	f
1a13cbec-3a1a-4d9e-9d30-848933d9af00	6743208b-a2b7-4951-9d65-602313f52be8	\N	d4d9d93d-8632-4c20-870e-2fe1bd957194	t	9	10	f
1d369e3a-ad07-4c21-9479-4af39b44ede6	f7aff351-6b9f-4caf-8717-5a611192f6d9	\N	d4d9d93d-8632-4c20-870e-2fe1bd957194	t	9	9	f
3063f0e1-c5b7-4c9d-b508-26a3054bdafe	7cb540a6-c01f-42c7-a0e2-099d290c0b6a	\N	d4d9d93d-8632-4c20-870e-2fe1bd957194	t	10	10	f
6626a9d2-6bca-45da-bbf7-64248f5ed1f6	2a397255-ca16-43dc-b47e-a977a917f032	\N	d4d9d93d-8632-4c20-870e-2fe1bd957194	t	9	10	f
3b485892-9710-4669-b859-662ac53c3412	b25c03f9-3bec-48f9-a045-c78745703bf7	\N	d4d9d93d-8632-4c20-870e-2fe1bd957194	t	10	9	f
71c48209-9cd0-4a7c-8142-e8354159e7cb	d989226b-aa7a-4dd9-a34c-6bf06ae4a429	\N	d4d9d93d-8632-4c20-870e-2fe1bd957194	t	9	10	f
623fc1ba-085f-461e-b074-d2d06c5cb577	f198a966-c599-4457-ab33-bc075adefadf	\N	17e86dd3-05d1-486d-b4ea-341799da4e3f	t	9	10	f
f4afb14e-2bd3-42eb-8ea6-cdb9a39f52f5	6743208b-a2b7-4951-9d65-602313f52be8	\N	17e86dd3-05d1-486d-b4ea-341799da4e3f	t	10	9	f
02fee430-9613-4485-9023-6a2b4612eb5c	f7aff351-6b9f-4caf-8717-5a611192f6d9	\N	17e86dd3-05d1-486d-b4ea-341799da4e3f	t	10	10	f
256f5251-983a-4dc2-b7c8-148582a95e6c	7cb540a6-c01f-42c7-a0e2-099d290c0b6a	\N	17e86dd3-05d1-486d-b4ea-341799da4e3f	t	9	9	f
e3614df1-3a52-4ba6-a940-d1d0695d271a	2a397255-ca16-43dc-b47e-a977a917f032	\N	17e86dd3-05d1-486d-b4ea-341799da4e3f	t	9	10	f
4e0bd397-03ef-408e-8fd1-66091e54d4cc	b25c03f9-3bec-48f9-a045-c78745703bf7	\N	17e86dd3-05d1-486d-b4ea-341799da4e3f	t	10	9	f
cdde18be-5859-4c26-b321-b56cb5a53fbe	d989226b-aa7a-4dd9-a34c-6bf06ae4a429	\N	17e86dd3-05d1-486d-b4ea-341799da4e3f	t	8	10	f
12e7fa68-05c3-46e7-a636-da427406c677	e14ce7f2-2695-48b6-9f1c-b539d34db079	Hienosti mukana ryhmätehtävissä!	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
660de458-d2fc-47be-a675-6298e1244bf0	9bc7c029-1716-47c7-9122-ed869c3e1015	Hienosti mukana ryhmätehtävissä!	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
837754a5-8d59-4935-9f34-37f06ad7a98f	04a8f732-2f64-4e15-b5df-ee017dec6175	Hienosti mukana ryhmätehtävissä!	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
a3eec459-6012-405a-a2fb-37b5b8afa184	125cc11e-face-470c-a7f7-906146b2a9f9	Hienosti mukana ryhmätehtävissä!	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
84e0611d-46be-4ff7-81b1-b2ad5f9b2a0b	ad57009d-5992-4256-bd8f-d9f84d2048f7	Olit hienosti mukana erilaisissa ryhmätehtävissä retki-iltapäivässä!	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
9104681f-128f-41c9-a73b-b74d3f7df994	c261c216-59c0-4ee7-8492-5f4ec3b41472	Olit hienosti mukana ryhmätehtävissä!	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
dd5b6125-9194-4f59-88b2-b254f34c1474	f9edfe55-559b-45ac-a1e3-c8630a9fdd07	Olit hienosti mukana ryhmätehtävissä!	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
54e4ce1a-1c58-4513-b7df-aa49c97d28cd	70f7d948-5ed8-4e7c-9d8b-fa5a59c07bcb	Olit hienosti mukana retken tehtäväpisteillä!	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
30b00aed-7388-41dd-8b9c-173dd9d3947a	90876ceb-a561-4cd9-a574-160177ac0393	Olit hienosti mukana luontoretken tehtäväpisteillä!	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
4982b36e-70a4-4705-8f00-15f20a733fb0	8c33c0b4-feaf-4a0c-85d4-73692a7342cf	Toimit hienosti luontoretken tehtäväpisteillä!\n	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
5d7e4504-3864-4db3-99c5-dc8941fc5a7e	7f4dd268-b542-4251-ab71-eced924dc791	Toimit hienosti luontoretken ryhmätehtävissä!	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
70b8895f-28aa-4115-9793-7a0a37d00aee	aec45342-4e40-4fe5-ae8a-bbc540d5f37f	\N	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	f	\N	\N	f
d9e914b8-1614-44d1-aece-5bbfdfe9e651	c69b1bae-f764-4d10-a90f-e1774686f31a	Toimit hienosti luontoretkellä ja sen tehtävissä!	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
8eb98532-5bf2-471d-92d9-307cb3027233	223a77ad-fc3c-4fe5-9ba0-fb26c8acfd30	\N	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	f	\N	\N	f
c7044d76-9b54-4018-bbca-ee8ffed5a8a4	fa66a9b0-f68e-4d21-bde2-e5440bd9e31c	Olit mukana hienosti ryhmätehtävissä luontoretken tehtäväpisteillä! 	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
9dbf7672-60f9-4010-8209-236d35648d80	367a36fd-227b-459c-ab29-9d63b591b8ec	Osallistuit innokkaasti luontoretken tehtäväpisteisiin!	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
88aba82f-bc29-4a6c-8b6b-8dfe5555b187	f74d8ece-7999-41b6-9244-c5af75e60633	Osallistuit hienosti luontoretken tehtäväpisteisiin!\n\n	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	t	10	10	f
f73d6413-ddfc-4455-a321-81ebc254fa0e	75faa4db-dfe1-4868-8d17-5bf5efd0155b	\N	7cbb3790-0e71-4f81-88b4-e9f627ab5e54	f	\N	\N	f
b91fdf42-3f26-4125-9037-7750a127f7e2	6f84a877-de90-4947-a9aa-98dba5207d81	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	8	9	f
51a95563-6614-4220-91af-b4ae978637ac	3a98c8b5-c036-480e-a81f-0621611204c9	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	8	9	f
1289efe8-2c8a-4a00-9bb1-e36d6a17ed15	c6363293-72eb-43a3-a6ec-fcba15990890	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	8	9	f
e1c5e270-3dd3-4343-b47a-9c17ed074eac	55b8bc01-7c43-4bf9-9a6d-77125514df24	Hienosti tsemppasit tunnilla!	b258d162-fb69-49c5-a342-5646aedc2187	t	9	10	f
d169ec56-10e9-4976-a11f-8bcafc4a16f4	65fbd2ac-f00b-4667-b303-d5fa1d6ca312	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	8	9	f
4123e003-faa9-4623-830d-8bd8b03a5c77	b9995bd3-4e10-42cf-a6d3-a523af20b130	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	9	9	f
d651fcc0-dcc7-4d39-8306-2239f683649f	e3964be1-ccb6-4040-8cae-7b316905c506	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	7	9	f
d0a6b393-3e75-4743-8856-c5b83ad2ff87	69873627-7b5e-421e-bde8-e8053c7b0e32	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	8	9	f
c8bb7bcc-209d-484a-9f15-72ef75e7fc61	e0940e8c-9511-410b-b041-6d10be5df549	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	9	9	f
b5388177-e38b-4f90-9057-7a63e67e7066	4f17afe8-667b-442e-bfc5-db9fa67d868b	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	8	9	f
bdf6ee5b-28d3-4647-9aca-ccf3f978db58	43705cbc-c707-410e-8481-688aaeec47b8	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	8	9	f
46090bb9-98b7-4cb7-9cb4-2214242d7f0d	e0e98c3c-64b6-4369-99f2-f61b315630b8	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	8	9	f
c4167bb7-59cb-491c-89ea-7fccb9d6ccb5	1c626c9c-7847-4d25-9047-9e5dfcc80a20	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	8	9	f
e3e87b74-dba6-4fdd-bf5d-57323893c373	231ac2c5-01b0-4b9e-a429-dd5ffd6e5c86	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	8	9	f
19975471-8705-427a-b410-6df8adaba83e	a6eb7748-b086-43bb-a243-b01c8073d057	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	7	9	f
aefbaca3-fa71-4e3e-b2df-871b93a9bfec	e6130ddf-6c1d-4e87-958c-eda7b0da1d65	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	8	9	f
b43a2c6e-fdfe-4d51-a1d6-37e8fee1e3b0	528c90f1-73f3-4bfd-81d8-b54ed67d7d09	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	8	9	f
48988f20-9b32-4ef4-9c3e-5c8c58c4fae5	dbb9aa4f-3000-4282-a32d-b118f125d260	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	7	9	f
24332640-7837-47f8-84e3-6bbf54ee8b92	5c600723-4533-402d-9c4d-8058c3e62b7c	\N	b258d162-fb69-49c5-a342-5646aedc2187	t	8	9	f
8ef41675-ebbc-4ccb-ba35-3368eb3e6fa7	55532bb4-1b81-467a-8073-4247a4a1e4b9	Aktiivista työskentelyä! Muista kuitenkin keskittyä enemmän omaan tekemiseen kuin muiden\n	b258d162-fb69-49c5-a342-5646aedc2187	t	10	9	f
4db344c7-afbf-4503-8b3e-8d448e444d2e	4011c1e3-a470-4919-af20-f1481857b626	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
10a30959-9b4a-4746-8027-2537c28bafde	5809c414-4e68-45f5-87b6-230845adc43d	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
c9a96d6e-a1eb-40a3-85ee-dca4905fd54c	793629f4-7160-4ba2-9a65-7fa9afa33d98	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
514f4b25-fa63-46d2-8e62-58cfddfadfad	986afb6e-d943-402b-bd89-90311832ef2c	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
184cdd6a-891f-4a61-a57c-93182e09e481	d38c401a-0343-41e0-bd69-0b54cce19241	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
1c9f1df0-50ce-4c18-984b-3efc746f15e3	03ac1fc5-1e04-48a1-ac35-e870d9378a37	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
d57085af-d60c-4a30-aa35-7e2f2221300e	5dc99e90-cdcb-4184-95aa-815bac526b8f	Todella aktiivista	cfab6204-6948-45e6-b556-86192d073cfb	t	9	9	f
0a22f0b1-056f-4008-bad3-cff2097f21d9	fc904e94-d131-4f09-8df1-0f664d89b160	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
764a5129-cd86-4c98-bec6-c8d7b34112ea	17de0a9e-947c-40c7-b2d6-57469c4d9c9b	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
93cf34b2-df7f-4655-9525-d243be9d3e2e	2ee38c25-4953-4a5e-961e-69c5075818bd	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
444dda0a-b427-4425-bd9c-7b5975db6623	a74ada74-8ad9-478a-b938-aad81dc5ad50	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
b98547ef-0f07-4dc1-85eb-c88861e35071	3403b4ae-6fd4-4e75-be49-2a59f4e77d75	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
480c88e6-7f80-4d4a-b034-47791d2ec15f	258c5a2f-4f3e-4692-b7cc-bcce3ff8fde8	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
6bf9d4de-e98c-4652-b180-e95b02d1b79f	d50a1c11-4d8e-4ac1-a99f-cb85e4ef10ea	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
c2331e8d-7556-4c7e-b7eb-a83affb4ea1e	f3bf1cd6-247b-4258-9ad9-d464bea8dcef	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
4471e7ef-945a-4f3f-8041-ba9ef0081184	43eb8192-493d-4e62-a08d-0c91f3dd9a40	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
a4d9718a-5842-4e8a-98f2-d58986393b8d	40fadd6a-1868-40e0-9611-8afd90260c2d	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
d601594e-83ed-463e-8f5a-acdef5ef50f8	f2643c22-6a89-402f-917a-850f365cbb77	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
906f1df1-f5a8-47a5-800a-5e3d2666edcd	1721d09c-8008-4ad0-896a-840f6314eec3	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
d09b3d28-7fc7-461a-9165-33bfe021f3c1	ca23c749-9a48-40c8-af25-09810af787d9	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
58330edd-ccd1-4890-8e01-fe47b3f2afd5	f75d829d-906e-4b23-ae70-b710b86cdaf8	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
42bd921c-0733-476a-aa43-868190f69b01	d5225734-f651-4db1-a7f0-0108457018ab	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
300e83b8-ef36-4646-8f27-e4ea678e752b	9ca51b65-1c6a-4b2b-9572-ca3b907116bf	Hieman lisää keskittymistä välillä	cfab6204-6948-45e6-b556-86192d073cfb	t	8	8	f
bec72d2a-96df-4afd-9b9f-e6c23cebf474	d4e0e2f6-8d00-442d-ad2a-ee8ad9818358	Aktiivista\n osallistumista	cfab6204-6948-45e6-b556-86192d073cfb	t	9	9	f
4fa014b7-8648-449b-9293-126d310a2146	f6426a3c-cd1f-49e8-bc42-f207b325f724	Todella aktiivinen osallistuminen. 	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
da8e0e7d-b1d1-47d5-a982-fbb620e8a2c5	514ae707-0937-49f9-8d76-8324e0fe3bbd	\N	cfab6204-6948-45e6-b556-86192d073cfb	t	8	9	f
7d418df1-5866-45b1-afa4-0d088f9241d7	998d4f0f-27c6-46d7-80c6-f80e6f1ec435	\N	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	7	7	f
6385cda2-b8c9-4900-8789-e37167e99a85	36fbe971-59db-4bfe-b275-c7b66c22b684	Hyvää kommentointia väärin mainittuu asiaan	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	8	9	f
2de8ce89-07a0-40dc-aed0-844d7a00b306	a7b58927-350d-4192-87cf-278e28f73023	\N	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	7	9	f
c78e1666-cac3-4e9d-b726-9b8f6e8ed9e5	a250d210-7f95-4b3a-88a9-1debe71e25d4	Hyvin vastailit kysymyksiin	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	9	9	f
e5fd9d2b-43a9-4354-ab26-c52d58605b97	48fdf9d8-10cb-4326-a0f2-973ca6f2ea60	Hyvin vastailit kysymyksiin	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	10	10	f
432ac596-9e89-4e72-b556-d47f37458da8	306d8ded-254d-4175-90b4-ba6cf4346ba2	\N	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	10	10	f
3160fa14-788a-4127-b18d-eae45db40a1c	148cab1c-f39d-4f6f-b2a6-a3ecb669586f	\N	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	7	7	f
4599a571-be5b-4aec-bff8-9b32662a1426	0c873abb-ead5-403f-9096-c88045eb692b	\N	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	7	7	f
9b1773e3-5922-4fbb-ac92-f7cf5a42d330	ae42a284-0701-4aef-8a45-3e806f43453e	Hyvää aktiivisuutta ja ajattelua tunnilla	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	10	10	f
27c68909-0061-4b76-9109-efec908f4e16	2636dc3e-1570-47d1-a25a-d381f9dd0e05	Rohkeas osallitumista	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	8	8	f
88d32285-f405-4868-9543-9609ba4b9c57	35db733d-965d-42ae-87fb-0af1702edf6c	\N	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	7	7	f
1fa00488-4a66-484c-bf70-77619d9a33b6	d948d3cc-bd28-46db-a852-3259e32936f4	Rohkeaa vastailua	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	8	8	f
f076bc83-75c2-49ce-8b95-ae47bfb31464	399fc7f3-b250-4a26-b555-8d4ab95703dc	\N	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	7	7	f
3a945ec8-f706-46b9-9659-7bfadd37cfa2	eed2be00-edb7-4f51-be59-7b175268b83d	Hyvää aktiivisuutta ja oikeita vastauksia	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	10	10	f
f63ab3ea-87ba-464b-9f60-5b0b20df5604	84aa7004-282f-4e61-a7a1-32e63eff4027	\N	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	7	7	f
e9e89f12-ed17-4924-ba79-ebbac4e44f1f	6436d514-4b05-4ed4-818a-fcb19e07a802	Loistavaa osallistumista	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	10	10	f
2fb3253a-6f85-4d22-82a8-483f1eaf9eab	41db76f2-a837-4435-a47b-afb830fdc560	Hyvää osallistumista	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	8	8	f
05a57c62-52d8-4309-9839-7ff62742a4aa	019d79c6-6604-4b6d-bd7c-9faf456dbef2	Rohkeaa osallistumista keskusteluihin	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	9	9	f
ba68f081-4869-4af9-81c7-a5b5c2e7368f	e989013c-9300-49e3-a222-e17457440ce2	\N	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	7	7	f
8ade67cd-36e8-4445-9985-94061a6571ce	44e9c567-7ec0-470a-ad27-d67e711967d6	Hyvä pointin esiintuonti ryhmätehtävässä	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	8	8	f
fd36c0a9-51f5-4d17-83e9-4ddfb365e4d2	d933e40a-df76-4419-b593-d6c86e0d56be	Rohkeasti vastattu tunnilla	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	8	8	f
fb7983c2-c346-4fb7-8b8b-82765a8f34a7	f6634ebc-2da6-4040-babd-5cc42c00f474	Hienosti osallistuttu keskusteluun	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	9	9	f
7069f76b-cb69-43cf-8bd1-b19c5979e006	201a3f35-a04a-4a59-ad74-d1ace5d1aaed	Hyvä osallistuminen ryhmätehtävässä	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	8	8	f
5ddb8c14-cbdf-4f8c-8b37-d40ed4747964	dbebbaf1-528b-4f40-b4d0-9ca69805bbdd	\N	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	7	7	f
73d23691-3eb5-4855-b74d-537a2743abab	e7af4b57-c167-4a9f-a65b-1bbdd5d6f70c	\N	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	7	7	f
71d42202-a7ed-4b25-a278-2deb638f3d41	1b5607d7-0aee-485c-bbfe-22d1bf3e886b	\N	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	7	7	f
6708d636-d526-4365-957d-18c4dae3b3ff	728671ba-3ed4-422a-ba53-13c14a3776b1	Hyvää pohdintaa ryhmätehtävässä	9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	t	8	8	f
e532e932-0886-4217-bfa8-05e6ce9018ed	4d9888c7-3be7-4fec-a5d7-07759cdff766	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	9	f
65c47eeb-98a2-43ee-9ed8-18f22be3c4fc	436f9966-c204-4794-89fa-e5e1a30b6247	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	9	f
f8141943-256f-41c3-b08a-b246fc38ade4	5c10a0b2-145a-4701-a64c-80a9369890a3	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	9	f
2f670078-a766-4155-ac34-c825ad96a3a6	8c057200-e725-4e08-b93c-88bd891fe862	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	10	f
b4029f2f-6016-4940-a6f8-8452700f6a51	ad4248b3-989a-4794-844e-af4cb598a1e7	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	9	f
1d07467f-3a2a-4f54-aac2-4d1edc6fe439	61780abd-03a9-4ce4-89cc-059b5a2f5177	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	10	f
af227589-0b3b-428e-8559-1e220803d6e9	92eecb4d-b8c2-43ce-ac29-eb7a46566311	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	9	f
b855f81a-68eb-4c90-888f-c060e9629c78	e17db94c-c058-4163-b1df-3824f2f732b8	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	9	f
d23d270f-3726-4646-bf2f-68b2bb0620bd	139ee728-7bd5-4ed5-b88e-65e455770b9f	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	9	f
8da65146-2d3d-45d4-a2af-d2ba3e477785	28bf177a-d273-4b22-963c-4206fcffa9cf	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	9	f
d48a6595-1bda-4007-a61c-045428c50277	48f6a291-18c4-4349-8578-e9d40a016f99	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	9	f
09579fe5-e7b1-4293-8aa0-077c45a45ef4	d1c1ad1a-62d0-4d6b-bf48-2dead02ed1f6	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	10	f
7cdf9c87-abbb-433a-84f6-aedbc09aabdc	e6537a2f-233d-4b11-8f1b-5a0814a675c0	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	10	f
332aafb7-9685-4b87-ba41-532ba4a50198	6f8a2928-32c2-4e60-9c99-b8073fcd9d35	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	10	f
a85e8d0d-b59b-4116-9b79-d124508d7482	1a420969-4c65-4a34-bdc2-80e13ed51f0b	\N	1b127087-3655-4766-bfc5-601ca4e3731c	f	\N	\N	f
75657251-b703-49a1-b423-846fcb6bbb18	6e24ea61-532f-452b-865d-b67df86c48c4	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	9	f
1859549e-2651-40f2-b35b-0251abb0dc2f	c08c69f9-ef26-4f6a-95ee-455d176dfa61	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	8	f
425ff9cb-be6c-499f-9b52-f080ae525ad0	3b6d04be-cd10-4e54-b5aa-28a67e8e2186	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	9	f
f4e3d361-1137-41b1-b372-4e8171d955ec	ec51a182-bf8d-436e-8704-b2d5cd897604	\N	1b127087-3655-4766-bfc5-601ca4e3731c	t	\N	9	f
fdf9822b-dca6-4a5f-9487-56679271b5ba	a8df8354-0125-404f-a1d8-5584462a5b82	\N	1b127087-3655-4766-bfc5-601ca4e3731c	f	\N	\N	f
d2e60e18-fa3e-4214-8c7e-9996a87a60a0	27cf24c0-2562-41e2-b341-82abab049a1e	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	7	7	f
1ce8cd8a-ec8a-4785-9eb3-ea2a43c3e4bb	382a71c0-af7d-465a-a739-0ebca2e1e639	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	7	9	f
3ae22dc8-f016-4ce4-a428-c52975ca624f	327f0893-dc5b-482c-acfa-a5bb977a04ab	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	10	10	f
c8609f3e-7060-4061-bfa1-860b02867be2	74e0dc95-58e5-4dae-9c8f-ad74d0473a68	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	f	\N	\N	f
712cd319-6bd3-4e8c-b104-e7f37370c4eb	04c10328-decc-426f-be4c-728256cc89f6	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	8	9	f
0a589280-7322-46b5-99c2-cbbaf9ccf7e9	fae7c131-a61b-4df9-84c1-c58881921a9d	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	8	8	f
7dbab2cb-290e-4fd5-990c-59f9bff7f971	51e2aa93-2eb0-422b-a954-efab9144e01a	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	7	8	f
48778b11-568d-43c4-a4ae-19e4a05bb02b	9a1c0221-90b2-4321-89ed-96eda8b2be6a	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	8	7	f
1e8c2c87-db77-4692-ab19-ff930d62b6f4	2408aec3-5b57-43df-a51f-6b9431428d21	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	8	6	f
d6abaeb8-6b83-40c8-b160-682f0acef546	7e8bfa8b-017c-4203-8860-aee243347646	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	9	9	f
37e11537-8132-4ecd-b2cf-81c241b6cbea	307d197f-ff26-4df2-808a-53bd60407b2a	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	f	\N	\N	f
908575ca-02a6-48ca-83dc-9df857df81b3	0036bb62-5801-4282-bb15-e83fd56b814b	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	9	8	f
778d6c4c-48d6-4399-a02e-85783fb8c6f9	b99e91ab-5482-4d43-8d3d-66fced671a62	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	f	\N	\N	f
ed54f931-ecc9-4ebf-ac23-07beae67f582	7a24b6b2-6ab6-491a-9cbe-dbebbe0438aa	\n	85a149ec-da1c-4b44-874b-1208bf8be03a	t	7	9	f
3cf7af88-fc11-4c4d-935b-7112ed5509a3	626a3179-8f65-4d72-85a2-864a2d27f2b1	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	8	10	f
208207c0-e320-44c2-a907-c4ae418060c7	626ae0fc-2414-479b-877b-b5f886574910	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	6	8	f
b49700ef-c5d3-4a07-adb8-9f25e01f4504	8ae4a627-229b-49eb-8a86-35ee6ac0e71d	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	f	\N	\N	f
5b53971b-da01-480d-b55b-d20ad014a9f6	6a1dc2f8-f64d-4126-bf94-bd86e5a2c7c7	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	7	6	f
2083c4d4-08c6-40b9-b866-6062b742dcb0	dc7afe5c-c9b6-48d8-a1a4-e4d5dc5eefbc	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	7	7	f
bcb72d48-3a15-4b63-9cc8-778ee3318273	388f0b8e-91ab-4a09-8224-7dd5e2f13df9	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	10	10	f
5bce2460-3220-4ae2-87b5-96eaa83613ea	7ac75cd2-6f92-4e1d-8366-8480ad847179	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	7	9	f
7d601b0b-9ec3-4624-920c-3a9a920084ef	fcba63ba-50b7-4104-9488-23ec79551844	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	10	10	f
e25e43b8-7bfa-48c0-8536-880a31edc885	f0bdea44-7d36-4cc2-81ee-dd87e3ed2de2	\N	85a149ec-da1c-4b44-874b-1208bf8be03a	t	8	8	f
0f551fad-dd83-458b-8eb1-c67d810ae09d	ab22ae23-0efe-46d6-968d-e2b6711d1a87	Yritit kaikkea reippaasti vaikka välillä keskittyminen meni Vapun kanssa jutteluun/istumiseen	73b52af5-0332-4511-b57e-89b4806d2a51	t	7	7	f
519adfa8-8c3a-4f87-8320-87e69ba4aaac	c06cee5b-023d-4288-b21b-d9ca5577dfc8	Yritit parhaasi, vaikka ryhmä ei ollut meiluinen (3poikaa +sinä)	73b52af5-0332-4511-b57e-89b4806d2a51	t	8	9	f
dff40afb-0e18-4b1e-be94-6a4ff23f7810	bafa760d-85bd-4abd-a915-8f168cd9fcc3	Ryhmässä toimiminen oli tänään hyvää! 	73b52af5-0332-4511-b57e-89b4806d2a51	t	10	9	f
18a52a90-ba2e-4ea0-b8eb-0dc00d8f9d06	a519e6c1-545a-4ded-abba-b2081cbf1990	Työskentely ok, pientä härväämistä ryhmässä	73b52af5-0332-4511-b57e-89b4806d2a51	t	8	8	f
50cffdf5-88ab-43fd-b1ee-301e0d3f61b3	9c19cd28-20bc-4c45-96fb-0d93396be790	\N	73b52af5-0332-4511-b57e-89b4806d2a51	t	8	10	f
cae20943-6c64-40c8-bf4d-702e9ac4b8d2	2f6620f6-5a34-4be0-a94b-f0b1463687d8	Kuuntelu ja tehtävien teko hieman haastavaa ryhmässä	73b52af5-0332-4511-b57e-89b4806d2a51	t	8	7	f
47ff9237-0125-482a-9c84-1ad953e4bef3	42d209d8-92ac-4f35-b789-f63f21142169	Erittäin hyvin työskennelty ja hommat lähti käyntiin ryhmässä	73b52af5-0332-4511-b57e-89b4806d2a51	t	9	10	f
8f804fab-0baa-4c6b-bd50-cada106e6ee0	f8513393-8371-4e09-b5e9-66d53a992253	\N	73b52af5-0332-4511-b57e-89b4806d2a51	t	9	8	f
f0a7f8bc-b912-48eb-b44b-2ea6a39608e6	83148628-1263-4fbe-9629-51aab83b598d	Ohjeiden kuuntelu välillä haastavaa	73b52af5-0332-4511-b57e-89b4806d2a51	t	8	7	f
eb709ce9-5934-4654-bc95-49714752a4eb	cbc945da-3ffb-45fb-9392-febb6dace205	\N	73b52af5-0332-4511-b57e-89b4806d2a51	t	8	9	f
219d65e0-9a44-43a0-8532-5ddbf05a02cc	75382621-eef4-4e85-bc0a-e988b906eb97	\N	73b52af5-0332-4511-b57e-89b4806d2a51	t	9	9	f
aa81021f-6362-4ca9-b82c-b28f38ed3fd9	9056b851-29b1-4618-9f9f-6de7cbf445d1	\N	73b52af5-0332-4511-b57e-89b4806d2a51	t	9	8	f
31e30932-1221-43fe-a36e-5b91ce7d327f	38d8b67b-b1fa-4109-9abc-973a8ab9a84c	\N	73b52af5-0332-4511-b57e-89b4806d2a51	t	8	8	f
0c2a7ee4-6304-4ac8-877a-6c432dd79ed4	8a300fda-6923-40eb-8109-1eeeddfa6c9d	\N	73b52af5-0332-4511-b57e-89b4806d2a51	t	\N	10	f
d0aba5b8-f007-4dab-9b6a-cda20fc21fe3	f57eaf58-4be6-465d-bee0-1c73c5308e94	Kannustit muita, ryhmätyöskentely sujui	73b52af5-0332-4511-b57e-89b4806d2a51	t	8	9	f
29f36405-481e-4156-a382-64940d6b3b05	a11d93c5-501b-4450-b7e3-935395239f80	\N	73b52af5-0332-4511-b57e-89b4806d2a51	t	9	9	f
e8f3d920-f6a5-4a7c-9d0e-6c6e4fdf52f2	742470ca-1ade-473f-a662-e86b4d46fd06	\N	73b52af5-0332-4511-b57e-89b4806d2a51	t	8	9	f
b2ed0da4-d86b-492a-b1f8-5964095a75c0	a4465d66-f0e8-4b22-845b-be41355cbdc0	Yritit kaikkea reippaasti vaikka välillä keskittyminen meni Alinan kanssa jutteluun/istumiseen	73b52af5-0332-4511-b57e-89b4806d2a51	t	7	7	f
a64fbaa6-9491-4109-9217-da035687c4b5	bc8d055a-f914-4b59-906c-f78b145b2aa3	\N	a0c15016-a50b-44ce-81b5-56016d56e8a1	t	8	9	f
421f28a8-bdf7-43c5-9316-197e81f59ef8	88352b90-69f8-48f3-bc89-640cff5ae4b1	\N	a0c15016-a50b-44ce-81b5-56016d56e8a1	t	9	8	f
3d488eb6-f2a8-4e92-bcf7-1528c117ea5b	754b7f19-e695-429d-bed1-46aab0b80e1c	\N	a0c15016-a50b-44ce-81b5-56016d56e8a1	t	9	8	f
fa8563c7-d080-42f6-baef-ff341398a654	c4bd1fb9-e546-4232-ab32-af6b7c5cf8ea	\N	a0c15016-a50b-44ce-81b5-56016d56e8a1	f	\N	\N	f
f4c9f8f7-cffe-4080-99df-620a2763dfac	247e39c5-4b02-4280-a60e-a7bf6dbf93f7	\N	a0c15016-a50b-44ce-81b5-56016d56e8a1	f	\N	\N	f
38966941-3ac8-498c-8b4c-7635cbad6ed7	5826af21-2a2d-4469-84d6-00489384e244	\N	a0c15016-a50b-44ce-81b5-56016d56e8a1	t	9	9	f
c16b983c-4e1f-4784-899b-4542bd0d8a96	35e924bb-5995-485f-93d5-b178dbc06511	\N	a0c15016-a50b-44ce-81b5-56016d56e8a1	t	9	8	f
c52b9c6d-63c0-4f66-836a-d72a828f674f	a049b7e7-a46b-40b4-bd92-1d33a44167c3	\N	a0c15016-a50b-44ce-81b5-56016d56e8a1	f	\N	\N	f
c5e1ef37-f1b2-4141-870a-5406d25c8f84	1b166df8-ff7f-41bd-873f-8cfde41120c5	\N	a0c15016-a50b-44ce-81b5-56016d56e8a1	t	10	8	f
edbaa884-91a7-4cdf-a42b-1b59c3e4651a	98fa0eb9-3fe2-4ace-af2a-fec217e69752	\N	a0c15016-a50b-44ce-81b5-56016d56e8a1	t	8	9	f
778d688e-fd66-4ecd-aa91-1bd9560145e9	dd4cf76d-9099-4cb3-8830-bdd9b8825bb6	\N	a0c15016-a50b-44ce-81b5-56016d56e8a1	t	8	9	f
293834e3-4aa9-46f8-8107-a6d592fabc70	56dd6659-5c6a-4cb6-9624-8a67f610bb2c	\N	a0c15016-a50b-44ce-81b5-56016d56e8a1	f	\N	\N	f
0838e220-5842-4b31-9375-30b8313fdfcd	1a533d71-5f46-45ad-8d33-042e309031e7	\N	a0c15016-a50b-44ce-81b5-56016d56e8a1	t	9	9	f
f141d148-3b33-45ec-b59a-16c9bfc62de1	08a7431c-990e-4d04-a85a-cddb3d6a50e6	\N	a0c15016-a50b-44ce-81b5-56016d56e8a1	f	\N	\N	f
987456da-1465-44d8-84ae-79984f4cf58d	1bccfce4-b06e-4412-97e9-2497713207c1	Hyvää syöttelyä	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	8	9	f
7f1f9b18-db02-4d99-b7ee-b5e8f03fbbc3	83d9e60c-8ebe-4079-a3c1-743edb327882	Hyvää syöttelyä	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	7	7	f
f1ffcd45-2c80-448c-be8a-e3e1eca55b07	aadbef19-7cdd-4494-aa78-eb8dbdf1bb5f	Olet taitava futsalin pelaaja	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	9	10	f
a12547bb-bb67-4a3a-844b-63e9c07f3fff	10848b56-426e-49e5-be56-04035f1e6eae	Noudatit hienosti reilun pelin periaatetta	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	8	9	f
e4122275-358c-4588-9580-af42312df527	6d2719ab-c31d-4b1e-9e37-1a3825b93132	Työskentelyssä voisit huomioida muut oppilaat paremmin	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	8	6	f
aba79458-c42c-47c0-a70e-e7ee2dd70b5a	39f34934-f654-4066-9af9-6fc6e610f986	\N	0aaa8915-25de-4565-a886-585dd8f5bd3a	f	\N	\N	f
c422b6ad-8f89-477e-9504-c0e0c857a530	54f68364-b0f3-4117-8f76-c78f6580b39c	\N	0aaa8915-25de-4565-a886-585dd8f5bd3a	f	\N	\N	f
e7ed34ed-305a-4847-a8d7-0443cef70ecb	923a5db8-023a-43c9-b1d8-ebe62ec5d3f0	Osaat futsalin salat ja autat muita	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	10	10	f
5bc7f1d8-3d38-452c-b570-213e8d555723	a0fc5e29-0b7c-45d5-9055-0902012b8c89	Hienosti sait tänään tehtyä pari maalia	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	8	8	f
d7d72e5e-239f-43e4-8963-1a3b572f43e7	5ab613ce-8c01-4959-bef4-4f7f328a0fcd	Edistit toiminnallasia pelin sujumista	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	9	9	f
3fe3df5d-d948-42d5-ba55-d8c71a03570b	43008a91-d3df-4930-a05c-2d2ec2d66bee	Kehityit tunnin aikana hyvin syöttämisessä	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	7	8	f
c807a903-b3f4-4102-9ce1-59b5cb461ef3	c409da13-5a71-44f6-bf24-1cfa1e4da99a	 kehityit syöttämisessä ja autoit kavereita oppimaan	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	8	8	f
a652c09b-f219-4e53-bc8e-68179dd96454	3ed89fa7-2a7a-46bd-b109-800b5a38a5d8	 tsemppasi tänään tunnilla vaikka futsal ei ole lempiaiheesi	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	7	8	f
06d08f9c-c530-4b15-8b9d-1c33fd4c4618	2516903b-55cc-4ba4-9b1c-c968791ab7c1	Monipuoliset futsal taidot	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	9	9	f
0a46d9a9-7a95-4577-a1b4-55ab37359a46	16fcf811-2820-41f2-92d8-a2c3051145df	Kehitystä tuli pallonkäsittelyssä	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	8	8	f
6df41fad-5d0e-476b-8b39-a0cbf03e867b	b0dece5c-b8fd-4197-a8a6-8571b56eb2d2	Vetäytyi pois puolen tunnin ajaksi. Tekeminen Hyvää kun oli paikalla.	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	6	6	f
9cb420f9-2e5d-4c4e-8245-ddc105e0cd24	1820ac8b-b6da-4377-8763-bb35a656d039	Loistavat futsal taidot 	0aaa8915-25de-4565-a886-585dd8f5bd3a	t	10	9	f
934ccead-c7b2-4f5b-8d1a-03edeb49f393	0dcd3b90-6ad4-4127-8bd7-abf019c6dba2	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
2dc287ff-5c9e-49ea-9b21-3bbd87b45f4d	a469eda5-134c-41e0-8ff6-6d914f3496ee	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
b026984f-436c-4ec3-a02d-82f78715d653	daa90cfa-fbd2-4f2d-b1b9-defda50f2a85	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
b42d7ce0-4d9a-42bc-a7b2-38a7fdc669a7	85b176c8-ba3b-4eb0-8e5a-49f25aeb8973	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
18de60e9-6095-444e-a534-4fb0e7f1d584	76a63a01-26fd-482e-8480-bcb5c993b891	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
a38710f9-a007-41bb-b636-1e10ff04cf8d	fca50e1d-4f85-4c30-84bf-2f754a7e045d	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
50568156-0d3c-4407-9a2a-4a00fc528c65	6622f6f8-f125-4028-923e-71b3d81ba051	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
e7b98d71-12de-4b36-ac5f-1011af7dd63a	841b231a-6161-4c74-a1a9-3226dbce4ba2	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
8903de00-dd57-4fe9-9529-271333d91fce	2c2e2c34-e16a-47df-bbea-0b56741dfeb9	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
4d0e9b21-8b5d-4489-a9aa-6f8bb2bf63b2	fd5841ee-a527-43f1-9ce3-f8c6e07f1aa6	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
a0e487de-6803-4f22-9cfe-35638ba86e2f	3c238e43-601b-4633-bed4-99b1070db4da	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
a1c23928-6a38-41a5-8a1d-42b1cde4fa0b	8166a152-fa65-4afb-8398-fbff180dd783	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
be0b2698-14e9-4b15-b42c-7286ac4048a4	d5663de4-2ca0-4714-b244-54e221ad0181	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
093e0a92-0236-401c-a8c5-aaf9013e4e2d	e711a807-828d-44f1-9829-a5cd4fcceb44	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
ebc40d48-85d4-4156-a1c8-ba8b208eb698	a52cb130-d267-4ae0-871d-b771c31ba828	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
3ade63a1-c51a-494c-ace9-149f1dc0316b	fd0770a7-57eb-4fae-9c3c-00a6f53a546c	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
5fb9fb4e-59c6-41d0-8eef-006ad9a3337d	7d6ebc04-0079-49e4-bc33-1c0ac2b4fb89	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
c8f0fa8e-1f1a-4a4f-ae30-6744fe972c01	03d40a1c-184d-4fc0-8211-d765f2b731ee	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
3071dbd1-4c25-427c-bb1f-d4bc658a1662	c68d9ccb-793d-45f7-846e-2f2ce2e38bef	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
6e9d49aa-9813-4b15-bf08-243b0e174333	576a4db0-a7f6-468c-a618-ddd15b218b88	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
02670802-c09c-4d3f-accd-b7290390bee8	7307935a-04d1-47b4-8db4-656939df1ab4	\N	4aa43e58-24a2-49ac-b69e-ea8e540203e8	t	\N	\N	f
806e3ee8-8cc4-44b9-838b-b10c5839edda	959e8e48-e3dc-4672-b263-cb8fcb8f3057	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	t	9	9	f
507ef6a8-2f6f-4be4-a71a-e58234ba7e3d	ac72adf3-79e8-4479-a81a-be13b2603b33	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	f	\N	\N	f
03b284b7-2491-4613-842d-30fdc80cb9ff	403d2ef2-23cd-437b-9688-43756e24a287	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	f	\N	\N	f
5ed77ef0-7a23-47e5-b56e-217bd8b78231	c71cbbc5-3ad5-4c1b-a751-616db7f95169	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	f	\N	\N	f
d3ffff46-f5ec-4d36-a7a1-4811ed2a3b07	8585f583-e996-4173-acc7-e61b2992a3c3	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	f	\N	\N	f
909b2b76-f611-4ac7-b0d3-e0b28f574084	ed8b008e-b272-4a8f-a28b-3e10943865d0	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	f	\N	\N	f
e791607d-2d94-4a17-bc89-1c6a295e8da8	b924bdca-75a4-4049-978c-22b6d57a75ed	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	f	\N	\N	f
7fcbdef0-9300-459e-bd7b-0eb0a6be628f	05d139e2-1d0d-44d0-9d55-8640833f9067	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	f	\N	\N	f
005102e6-26b1-47de-8b05-f4a83f01be8b	fe65a7a8-1054-4dce-a078-47e176bca0d3	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	t	7	6	f
a58a473e-3f44-47f1-b9fc-fb94235a4ace	3ff48490-fb0c-4328-8b8e-010efa10de13	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	f	\N	\N	f
b2f584b2-10f9-4065-b77d-77f07750c943	394795ec-5959-4d19-9ee5-362213b77dee	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	f	\N	\N	f
478e6d6a-f722-40bd-99f2-359cba169bb3	53394cde-fdca-44d6-bae2-9c928f2f23a0	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	t	9	9	f
7140afb4-62d4-4386-9276-ed536ea9a4bd	476293ef-adda-4c53-9a52-f977cb79d14e	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	t	10	9	f
eb0c841d-899f-417d-9429-eae0681bbff2	89864582-b6ce-4434-97ee-14767b35e1d0	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	t	10	9	f
e3e9095c-d8b1-4731-aa51-c16151016a83	b7be5ecd-cc80-443f-8a6a-8125c91da527	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	t	9	10	f
9a44e2ca-ab42-422b-88f5-8a747990083b	1199e08d-681c-4104-b883-89ebd887d53e	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	t	8	9	f
818d198f-fdda-46cf-b25a-c28e4656cece	fb382ba6-005a-42a0-9882-9735de457bc0	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	t	8	8	f
64821c51-e56e-469a-abd3-e31d67fd66d2	1d0f2b30-e376-4890-86af-e2585b65ee33	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	f	\N	\N	f
efe7ac2b-727f-48d1-afb5-76ff1cab9ba1	8fc516e0-c5ba-4181-a5cd-01f85629b4ac	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	t	8	9	f
33f9df96-502c-4812-b701-ef05abee6de4	41dbd3de-0883-454d-baaf-7613476052f3	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	t	7	6	f
6299c0b2-72b2-42fe-8b8c-04fba2ec38b7	5092be97-7e39-4aa6-bd2a-a517b48ff540	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	f	\N	\N	f
af53b914-45bf-41d2-a959-57902ef51cb9	264fe413-3243-45aa-809a-0f752bce3b4a	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	t	8	9	f
8fd3432e-d58c-4d5e-8145-b2094ea3d81f	71f99d4c-e3e1-4c88-af9f-2641131f3422	\N	bd77100d-766d-4ce4-8e59-6718b3f4061a	f	\N	\N	f
1c48bd44-3a4e-4efd-aae5-a3b0b1ddee0f	df5032e6-8740-4c54-a869-03e11dab715e	\N	3736eb77-801f-4566-8f11-57b2263b201a	f	\N	\N	f
51b683ed-c7e5-43e9-9f00-5a60533dfc59	79171cdb-2833-4e72-bbf7-504cd4304ed1	\N	3736eb77-801f-4566-8f11-57b2263b201a	t	8	8	f
421b84c2-6555-49b9-8c66-b7c3c4974143	9aaed25e-67f8-4d9d-ab09-96d4607a98a7	\N	3736eb77-801f-4566-8f11-57b2263b201a	f	\N	\N	f
236cba33-95cf-4ccb-b943-2a1cf6af6300	28948e5b-d16f-4720-8387-92541786db50	\N	3736eb77-801f-4566-8f11-57b2263b201a	f	\N	\N	f
54650fc6-3e92-4425-be26-8e0c3c6d141d	d63a461f-521c-4430-8e64-c4a05a9d6114	\N	3736eb77-801f-4566-8f11-57b2263b201a	t	10	9	f
c26e4591-e385-4782-be66-0160299fee41	75c425cd-2ba2-433d-a0b1-cfaca6290abd	\N	3736eb77-801f-4566-8f11-57b2263b201a	f	\N	\N	f
88fee8d5-bb3e-4ef2-80f3-e632bb322fb8	892e5773-39a1-4412-84cc-c219683ca4f9	\N	3736eb77-801f-4566-8f11-57b2263b201a	t	7	8	f
141e9bcc-bf01-4b38-9fa5-d106fa475246	b5e44718-3033-432f-83a9-81edc4a14d47	\N	3736eb77-801f-4566-8f11-57b2263b201a	t	8	9	f
56870bf0-42cc-4e7a-8ccb-7148d2ac4478	91a52f1d-e774-4925-8a10-9f5d7d7995fc	\N	3736eb77-801f-4566-8f11-57b2263b201a	t	8	8	f
dfd5d1d1-26ee-43cc-93fe-e1f75af6ad4b	ae1feef0-be68-422a-8522-98700c2bd931	\N	3736eb77-801f-4566-8f11-57b2263b201a	t	9	9	f
f9ffaeb8-2d7f-4f94-94dc-d2fd15cce5c3	a56a92a5-893f-4de0-af0a-e764be900502	\N	3736eb77-801f-4566-8f11-57b2263b201a	t	8	9	f
89b8b56d-bc3f-4e52-8d48-aa43fe219a3c	82cd71ff-8e57-44ab-829f-f296a2929585	\N	3736eb77-801f-4566-8f11-57b2263b201a	t	9	9	f
22f5b516-f4b2-411d-8495-9a62deedcd98	d08c6dc6-1dc2-4a86-af3c-22e920af695e	\N	3736eb77-801f-4566-8f11-57b2263b201a	t	9	9	f
fb6fa1cc-4b80-4092-90e0-0112681366b3	b71238b6-1cfd-41c1-92dd-fae83e40bea6	\N	3736eb77-801f-4566-8f11-57b2263b201a	f	\N	\N	f
fae1a318-a368-4c00-9246-eddc71b3ac42	e5032b31-071d-4ac1-a61e-f341a7170084	\N	3736eb77-801f-4566-8f11-57b2263b201a	f	\N	\N	f
c87e6ecf-7bc4-4d24-be64-733762c8ad16	35c11fca-684d-4018-bbe6-ff17c59a80d2	\N	3736eb77-801f-4566-8f11-57b2263b201a	t	9	9	f
050f99ad-e3d0-4c96-bf64-a5ad7af296d8	f5051172-84d5-4fbc-bca0-e4d808fa36f3	\N	3736eb77-801f-4566-8f11-57b2263b201a	t	9	8	f
5385d67f-e62f-4c00-af26-196137b0d2aa	498d994f-bb8a-4e31-8451-79c4519c6541	\N	3736eb77-801f-4566-8f11-57b2263b201a	f	\N	\N	f
a55c8ca8-5eec-4d19-9dfa-8f0ead9c4c20	9549b80b-fa32-4340-98fb-f827e29982ee	\N	3736eb77-801f-4566-8f11-57b2263b201a	f	\N	\N	f
7059ebec-f4db-4192-91bf-b6305afcffba	20f182b2-d260-4286-a228-80f03a83d6d5	\N	3736eb77-801f-4566-8f11-57b2263b201a	t	9	9	f
d274df6c-1766-4443-87fa-e6c63a2c4ac1	a678e014-275a-4fc3-96dd-0d356b8b84e3	\N	3736eb77-801f-4566-8f11-57b2263b201a	t	7	8	f
89e1a51b-8400-46cd-bd60-2ce0d9ea3a78	7dbb7ebb-6d40-444b-8d99-719e03340fa7	Tiedostaa itse ettei suunnistus ominta juttua, harrastaa cheerleadingia\n	a6ef21b8-7092-4dce-947f-057904ea6d6b	t	8	9	f
8ae3e2a3-f688-4d08-b5c4-1864e9da5345	85f1f74e-9777-42f4-b12e-e855414773a3	Aktiivinen, osaa suunnistaa	a6ef21b8-7092-4dce-947f-057904ea6d6b	t	10	10	f
31c1254a-47b7-4439-9907-dd37046a9a7d	09fc776b-9df7-4a19-a7f8-38ff0bba4e28	\N	a6ef21b8-7092-4dce-947f-057904ea6d6b	t	8	8	f
3fc0fc8c-1420-4e00-9b3a-c5bc3a31c5ba	23d381a8-9079-4422-87ea-0fda6011af7e		a6ef21b8-7092-4dce-947f-057904ea6d6b	t	8	8	f
682d7feb-2ab3-4360-84fc-af71473175ad	8bcb3b99-fef1-45ee-90fb-a9d9ded9f8ef	Yritti parhaansa, hieman haasteita suunnistuksessa ja kartan oikein päin saannissa	a6ef21b8-7092-4dce-947f-057904ea6d6b	t	7	9	f
e6adf67e-c0d6-4725-b9c6-0da1e332fc4e	c60de93a-3791-4cfa-b4aa-6bd0daf58139	Suunnistus ei kiinnosta yhtään, lähti kuitenkin parin kanssa	a6ef21b8-7092-4dce-947f-057904ea6d6b	t	7	8	f
0bb90645-9c70-4873-b4cb-f683426da286	88c6c7cd-afe6-492c-9c08-84488a74f9a6	Löysivät hyvin rastit	a6ef21b8-7092-4dce-947f-057904ea6d6b	t	9	9	f
1c86fdb8-74b2-4d83-a2c2-29a57d10ddc7	09ff1263-379f-43a0-a353-8f68895203f5	Suunnistus ei ehkä lemppari	a6ef21b8-7092-4dce-947f-057904ea6d6b	t	8	8	f
bd8959e2-b6b3-4ec7-a3e4-1a151be0ff74	9c013a83-feac-4f39-911c-7d0452f1935c	Aktiivinen, löysivät rastit	a6ef21b8-7092-4dce-947f-057904ea6d6b	t	9	9	f
574578b2-ec1b-4103-83a7-50d1b5abe1b2	5f302e09-a7ec-4f45-a16f-467e695a9cbf	Eivät löytäneet rasteja	a6ef21b8-7092-4dce-947f-057904ea6d6b	t	7	8	f
a28fd3e1-f1f2-4c5c-b06e-568c55bcfb22	23a3cda4-5a4f-416a-b2af-6fd1708be539	Tuli myöhässä, partiolainen joten pystyi lähteä yksin suunnistamaan	a6ef21b8-7092-4dce-947f-057904ea6d6b	t	9	9	f
5fccab43-62da-43e8-8805-a85a487d0699	0135e75a-eff6-4f1a-8953-e3eb91d10979	\N	a6ef21b8-7092-4dce-947f-057904ea6d6b	t	8	8	f
8ae53da4-cf94-4726-8009-c2fd1c3c9d37	d8a0b8ab-9b15-4308-9257-7d73339c92fa	Löysivät hyvin rastit	a6ef21b8-7092-4dce-947f-057904ea6d6b	t	9	9	f
0514b9cc-805e-4941-af2f-506c7b710428	a2a4fa89-ec64-4fee-8791-7fefe4d34bcd	Armin parina, haasteita vielä suunnistuksessa	a6ef21b8-7092-4dce-947f-057904ea6d6b	t	7	8	f
8933c511-f5a5-4ac8-b21b-33e079f2574a	2b601443-21fd-4bd6-8a9d-223db3a3d26b	\N	a6ef21b8-7092-4dce-947f-057904ea6d6b	f	\N	\N	f
59f96317-399d-4266-b9eb-69327099beb1	cc46d0fa-c8dd-4984-b8dc-82666d8f36ea	\N	a6ef21b8-7092-4dce-947f-057904ea6d6b	t	7	8	f
40422617-89c4-43eb-9125-34dae5b589f5	998d4f0f-27c6-46d7-80c6-f80e6f1ec435	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	8	8	f
220346b3-2055-405c-b064-515436daabb9	36fbe971-59db-4bfe-b275-c7b66c22b684	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	8	8	f
d829be23-bc40-4621-8e7d-55c9bd17978a	a7b58927-350d-4192-87cf-278e28f73023	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	8	8	f
69325075-a23e-46cf-824f-ea0e3c789925	a250d210-7f95-4b3a-88a9-1debe71e25d4	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	8	8	f
b521d995-470f-45b1-8028-6ebb04bba707	48fdf9d8-10cb-4326-a0f2-973ca6f2ea60	Hyvää osallistumista ryhmissä opetettaviin aiheisiin ja vastauksia avoimiin kysymyksiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	9	8	f
3d624565-7803-4eb7-9c3a-bb2aac66d2f9	306d8ded-254d-4175-90b4-ba6cf4346ba2	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	9	9	f
5550dc61-31f5-4b5c-9a69-3de90d476c4e	148cab1c-f39d-4f6f-b2a6-a3ecb669586f	\N	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	f	\N	\N	f
95b3cca0-d1e4-42b9-933e-669673fb13fd	0c873abb-ead5-403f-9096-c88045eb692b	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
5230bfba-9400-4940-b731-0d5ce4f2ec46	ae42a284-0701-4aef-8a45-3e806f43453e	Hyvää osallistumista ryhmissä opetettaviin aiheisiin ja hienoa osallistumista ja pohdintaa keskusteluissa	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	10	10	f
88b01c3c-2bfa-4a5d-9ec4-ad64692c00e6	2636dc3e-1570-47d1-a25a-d381f9dd0e05	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
aa2fd346-0590-4d89-8ebb-40ca01ea66c6	35db733d-965d-42ae-87fb-0af1702edf6c	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
ada7e2e2-b532-45bb-84e6-429c60ef5a76	d948d3cc-bd28-46db-a852-3259e32936f4	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
fe7918c7-8311-4a3d-8a3e-60e232079a7f	399fc7f3-b250-4a26-b555-8d4ab95703dc	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
54e79551-6666-4955-9ad2-7b2ac3addfa6	eed2be00-edb7-4f51-be59-7b175268b83d	Hyvää osallistumista ryhmissä opetettaviin aiheisiin sekä osallistumista keskusteluihin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	9	9	f
8983cd27-cdc2-46aa-8c84-b4ac26f3068a	84aa7004-282f-4e61-a7a1-32e63eff4027	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
8d3998b4-1afb-47b5-9612-6f265c872d16	6436d514-4b05-4ed4-818a-fcb19e07a802	Hyvää osallistumista ryhmissä opetettaviin aiheisiin sekä vastaamisia kysymyksiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	8	8	f
8e06ebfb-505c-4f18-9247-ce3eb8fc07e1	41db76f2-a837-4435-a47b-afb830fdc560	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
778367ce-a0ea-49a7-b393-1049ef5e4146	019d79c6-6604-4b6d-bd7c-9faf456dbef2	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
d67cfb3f-6d68-47d5-a30b-cdc4b13fcd55	e989013c-9300-49e3-a222-e17457440ce2	\N	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	f	\N	\N	f
2a0c4cf9-2a02-4e67-b677-292f397e9829	44e9c567-7ec0-470a-ad27-d67e711967d6	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
4cf32e78-0740-4717-9f6f-1fae525452a4	d933e40a-df76-4419-b593-d6c86e0d56be	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
41b6d2ee-0685-4d22-8c7f-f3dbcff3c6dc	f6634ebc-2da6-4040-babd-5cc42c00f474	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
4c6592fb-7911-48c1-91a6-4d939a1528e1	201a3f35-a04a-4a59-ad74-d1ace5d1aaed	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
5fca501b-f16c-4c80-b95e-adb6ce8e4e57	dbebbaf1-528b-4f40-b4d0-9ca69805bbdd	Hyvää osallistumista ryhmissä opetettaviin aiheisiin ja pohdintaa tehtävässä	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
3d365319-d87f-4efd-8be7-137ed021bc22	e7af4b57-c167-4a9f-a65b-1bbdd5d6f70c	Hyvää osallistumista ryhmissä opetettaviin aiheisiin sekä kavereiden auttamista	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
079c6203-63a9-4ec7-a3fa-0da3cc999bf2	1b5607d7-0aee-485c-bbfe-22d1bf3e886b	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
c9adb19e-6e11-4805-ab90-f2d0753e0f25	728671ba-3ed4-422a-ba53-13c14a3776b1	Hyvää osallistumista ryhmissä opetettaviin aiheisiin	3973c4f0-84bb-4b53-bef0-2571ba7e86d6	t	7	7	f
97542322-dac5-4960-9fae-60ba9e23b005	d9ac630a-298d-422c-8d37-72fc3991857d	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	t	8	8	f
7545c2b1-9b69-417c-ad90-5a9e15178f3b	1f12b19a-138f-4000-a576-c5dab30ec9e9	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	f	\N	\N	f
fea740d6-9243-45d5-aed7-1cb6586a82f5	c732359d-e9bd-44c3-aa2e-bd92bfb911c2	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	t	9	8	f
a1c77ef7-3259-4e7b-adf3-2945393da7f8	7c8f19ba-b172-40e7-8e9b-da74d07eb54a	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	t	10	10	f
6f3d9d4a-b699-4642-b98d-8054ad6f305e	f031aca9-7acb-43fa-9884-72547dac5709	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	f	\N	\N	f
0706e822-74fc-4bc5-9679-dcdb9a166097	2113c63e-c4a7-4e49-90a6-626646c3d949	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	f	\N	\N	f
273baad5-fa0c-458f-90c2-1676e9bc576c	3eb15f99-938b-40e3-b16f-bce35248b3b8	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	t	8	8	f
f9a832ce-fd7a-4d4f-8f39-452e8a0df255	e0357050-7b2a-4b32-87cf-af5747b17208	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	f	\N	\N	f
cae0b39e-4228-4e43-833b-c6ff9bcaa4cb	a09eec89-d6b8-4a66-b95d-356d800aaa8f	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	t	8	8	f
6c01f1f6-afe2-42a7-ad7d-a6e4e7b765a8	d202ea60-e678-49fd-8ecc-581cad6b508c	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	t	9	9	f
0bbab296-99cc-42a8-86a1-834bcfeb3611	d4e6aa85-cd60-4901-bd59-413ee93a3314	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	f	\N	\N	f
0203eb6a-0f7f-4293-ae7a-1e1022dfe952	7a3453eb-b303-4944-9bfa-f7bfdde76864	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	f	\N	\N	f
59fe0f02-91da-456e-b4ad-bbb8dfa1dcd0	13e7ba68-1fc6-4e4f-947a-0370f5aff61a	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	f	\N	\N	f
da108bac-bfcf-4d53-9fda-f60a3d428680	0fe083de-7bae-4fc1-815e-b4ead74b6a69	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	t	9	9	f
0fd27763-d866-4884-a9cc-db95f5fd9fcf	9b2269f7-aba5-42f6-afab-ccfa7bc42585	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	f	\N	\N	f
87c3db69-5c41-42c6-9324-74bcb5eca0f1	23d41b74-018e-45f5-966c-c729188c1ca3	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	t	9	9	f
a8c367de-634c-4209-bc47-3ea5f143a20b	c0a2a247-d6f0-4e43-bfd7-79d01e4eb16c	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	f	\N	\N	f
39e3b614-9784-4336-b7a8-119ce3614363	848b881e-e506-4273-b778-61cd669267d2	\N	4b1b54c2-ea63-4061-b45c-e18b9e85c500	t	10	9	f
3d37021e-be51-4836-814e-bb026252046f	ced65c86-c2e0-4fa1-b49a-e24b1c20b57c	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	t	8	8	f
3911567c-4d6d-41c0-9561-34a2cda3d5cb	5d237526-992b-455b-9989-54b39d93203d	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	t	8	9	f
aa3bb78f-5b68-413c-8403-b8fcb26a6c84	6674aea5-a4bc-4b1a-9928-4e1770d783fa	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	t	8	8	f
23586a58-d31c-44a7-a2f5-9ff2332ac986	0ea9db84-8033-4777-b8a1-651e9a7893b3	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	t	8	9	f
94606a72-8d56-4120-87e9-80fd825c75d0	9a96f001-81e8-400f-b208-ea7a9661fbfc		b14f2c21-613d-49dd-93f1-8bdac3f71800	t	8	9	f
ca563117-d6a1-4136-8adc-85e160c5cbcf	3adfff1b-7142-45a6-9419-d2bcfa98c472	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	f	\N	\N	f
c74ea944-82d9-4f99-b719-78a43d883f05	33a6559f-6fca-4fab-bb33-c3b8c331caab	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	f	\N	\N	f
44a661f5-3815-4760-9036-029a0c7125d1	01f275c3-256a-46bd-a5c8-782d563062d3	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	t	8	8	f
495c5849-6f95-4aeb-8118-d8397e7f5b69	5c4372f4-865d-498a-bb1e-846e3cbfc9fa	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	f	\N	\N	f
22f6e370-82d3-409a-a3ec-495d6ad1d144	5c7333fc-5b09-4c44-819d-818d8e68cc18	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	t	8	9	f
b5baec5f-aaac-49df-badd-268ef369e687	01e71d62-ef6a-4b7b-8eca-9cc93a6b701d	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	t	8	9	f
9358095f-0ffa-467c-9e5d-77116152a39d	6c0bab1f-3112-448c-b26c-ba54fe2a7834	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	t	8	8	f
73e821ff-369a-4d3f-b597-692062115519	5b4b45a7-4957-4f78-a20f-ce4552f56eef	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	f	\N	\N	f
2652ba86-a5e8-4490-ae5a-00a4591653b9	e673cce8-a11d-424e-bc4e-b18213f6b064	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	t	8	8	f
289b7f01-ba55-474d-9635-e4624fd345bb	ad3c205e-1fd1-4369-a301-f1008f182b81	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	f	\N	\N	f
a1fd3e3b-6478-4960-b9b2-dd986a6998a9	9cefd235-f6ab-4561-940c-ada01360b117	\N	b14f2c21-613d-49dd-93f1-8bdac3f71800	t	8	8	f
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
4a81ce87-bccf-4fb5-af09-51e8899bbed1	2023-08-21 00:00:00		Heitto ja työntö	LI_PERUS	31169d42-b6c4-485c-8ced-f3fca6fe9ea9	{T3}
032c110b-9a4c-47b8-914a-c07dc4a7f82d	2023-08-21 00:00:00		Koripallo ja beach volley	LI_PALLO	999be80c-ff15-4515-ba2d-3f330319b986	{T4}
bee802eb-1d02-4fec-9e4d-003a1361685e	2023-08-21 00:00:00		Kpk ja fudis	LI_PALLO	45982a54-e42c-4e48-8b84-32689d592abd	{T4}
ce80c783-0a4b-4c58-90ad-ba79266f522c	2023-08-23 00:00:00		Keihäs ja kuula	LI_PERUS	640e87de-8063-4c00-9087-c17709e34059	{T3}
1577f95a-7961-4c4e-a2aa-74db477eb72b	2023-08-23 00:00:00		Koripallo ja beach volley	LI_PALLO	61dc37a4-b86f-4563-8fca-37aad69a1f05	{T4}
a5be85c5-7133-4454-8af9-694ac0d8e3f2	2023-08-24 00:00:00			LI_TALVI	1cc91b32-fe7b-4efe-8b2e-d9cc852d7600	{T3}
858a71a5-c43a-46fe-8f9c-52e26563fc88	2023-08-25 00:00:00		Keihäs ja kuula	LI_PERUS	fd028225-16dd-4d8e-8c86-a81a9d9243e5	{T3}
be216fb7-97e2-45b0-aed5-40e935bf7707	2023-08-28 00:00:00		Sisällä pituus ja korkeus	LI_PERUS	31169d42-b6c4-485c-8ced-f3fca6fe9ea9	{T3}
7fb30ed7-affa-40dc-b83c-e1c024283074	2023-08-28 00:00:00		Fireball ja sulkapallo	LI_PALLO	999be80c-ff15-4515-ba2d-3f330319b986	{T4}
6dd0a225-308e-4284-b74f-539133806168	2023-08-29 00:00:00		Pituushyppy ja korkeushyppy	LI_PERUS	640e87de-8063-4c00-9087-c17709e34059	{T3}
79af44c1-41f7-47d7-bfdf-30611f8c3b9a	2023-08-30 00:00:00		Kpk ja hyppyleikit sisällä	LI_PERUS	cf7246cc-5760-499a-9252-c3d1bbcc79e8	{T3}
93edd4be-dd55-4f42-b568-a782849af230	2023-08-30 00:00:00		Sulkapallo ja fudistennis	LI_PALLO	61dc37a4-b86f-4563-8fca-37aad69a1f05	{T4}
0c9c65c8-8dc0-4396-aa0c-29f07ecc1fe0	2023-08-30 00:00:00			LI_VOIM	b83c3bfe-9b2c-417b-a955-5d725e54f94e	{T4,T1}
f3a651ac-f25e-4f56-9927-7946332213cd	2023-09-01 00:00:00		Fireball, kpk, futsal	LI_PALLO	a6a42248-8033-4254-8b5d-ba325479414d	{T4}
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
520adbc2-e093-40f1-8a8f-5b071f9c9c3f	2023-08-22 00:00:00		Keihäs ja kuula	LI_PERUS	c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	{T3}
d6e498fa-92dc-4425-ba9a-6ea712d40f92	2023-08-22 00:00:00		Keihäs ja kuula	LI_PERUS	f6160571-beff-4c21-b3af-399f376429ae	{T3}
31deeadb-5e29-4f3b-93b7-ee2d17f51631	2023-08-23 00:00:00		Keihäs ja kuula	LI_PERUS	cf7246cc-5760-499a-9252-c3d1bbcc79e8	{T3}
ce15d4d7-9363-4b93-97af-afd713c97a0e	2023-08-24 00:00:00		Keihäs ja kuula	LI_PERUS	45982a54-e42c-4e48-8b84-32689d592abd	{T3}
b7990e52-4204-4f2a-8e1f-aa9212420eba	2023-08-25 00:00:00		Keihäs ja kuula	LI_PERUS	a6a42248-8033-4254-8b5d-ba325479414d	{T3}
523a6273-c7bd-4d67-8b9b-48b16e66d4e5	2023-08-25 00:00:00		Kpk ja koris/fudis	LI_PALLO	640e87de-8063-4c00-9087-c17709e34059	{T4}
e8502f11-5dcd-4889-bc35-0728a210d64b	2023-08-28 00:00:00		Kpk ja koripallo	LI_PALLO	45982a54-e42c-4e48-8b84-32689d592abd	{T4}
9264da22-1da2-43d0-99ab-564dee2d8326	2023-08-29 00:00:00		Korkeushyppy ja pituushyppy	LI_PERUS	c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	{T3}
7609e570-5d24-4cc0-9daf-efce6e08a02a	2023-08-29 00:00:00		Pituus- ja korkeushyppy	LI_PERUS	f6160571-beff-4c21-b3af-399f376429ae	{T3}
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
f47cb6c8-1735-4a98-a7b8-88f9af04e6e5	2023-09-04 00:00:00		Juoksu ja aitajuoksu	LI_PERUS	31169d42-b6c4-485c-8ced-f3fca6fe9ea9	{T3}
dceb37c4-11e9-4a50-bf78-6efb1af605f4	2023-09-04 00:00:00		Movet	LI_KUNTO	45982a54-e42c-4e48-8b84-32689d592abd	{T5}
689dd5bb-4c12-4aed-a6bd-5ab3e9bda2ec	2023-09-04 00:00:00		Tennis ja koris/fudis/lentis	LI_PALLO	999be80c-ff15-4515-ba2d-3f330319b986	{T4}
9a404a41-2b08-4367-85ac-3a5450fbaadc	2023-09-05 00:00:00		Juoksuleikit, kestävyysjuoksu ja aitajuoksu	LI_PERUS	c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	{T3}
2ec02719-3e89-4c09-ae72-492da1ea8eec	2023-09-05 00:00:00		Move-tesit	LI_KUNTO	640e87de-8063-4c00-9087-c17709e34059	{T5}
442e2cf3-3583-4bb1-9848-691cba355568	2023-09-05 00:00:00		Juoksuleikit, kestävyys ja aitajuoksu	LI_PERUS	f6160571-beff-4c21-b3af-399f376429ae	{T3}
fb90b138-5af6-4566-895f-c9cfd96c7833	2023-09-06 00:00:00		Juoksuleikit, kestävyysjuoksu, aitajuoksu	LI_PERUS	cf7246cc-5760-499a-9252-c3d1bbcc79e8	{T3}
0cf4bcfb-197b-4c26-b667-09af78a35d2a	2023-09-06 00:00:00		Tennis ja pesäpallo	LI_PALLO	61dc37a4-b86f-4563-8fca-37aad69a1f05	{T4}
c25cbba8-88d5-4757-87a0-2f2bbc77c5c4	2023-09-06 00:00:00			LI_PALLO	b83c3bfe-9b2c-417b-a955-5d725e54f94e	{T1,T4}
d4d650de-1b77-4d27-867e-32246c10aa72	2023-09-07 00:00:00		Move-mittaukset	LI_KUNTO	45982a54-e42c-4e48-8b84-32689d592abd	{T5}
86c90257-a257-48c0-94b1-57dadfca0a6e	2023-09-08 00:00:00		Juoksuleikit, kestävyysjuoksu, aitajuoksu	LI_PERUS	a6a42248-8033-4254-8b5d-ba325479414d	{T3}
be68b171-5a7e-4fae-9219-149771d8af9a	2023-09-08 00:00:00			LI_VESI	b83c3bfe-9b2c-417b-a955-5d725e54f94e	{T6}
683da996-f2cf-4d1a-abf2-9f84d7c36541	2023-09-08 00:00:00			LI_PALLO	230317b4-fb83-4092-8da4-e641aadb600b	{T1,T4}
f304a4cb-5765-44f0-abe9-662cf64c4732	2023-09-08 00:00:00		Juoksuleikit, kestävyysjuoksu, aitajuoksu	LI_PERUS	fd028225-16dd-4d8e-8c86-a81a9d9243e5	{T3}
fb583211-e331-41f4-a30d-2eb95e904950	2023-09-11 00:00:00		Lenkki, liikkuvuus, ulkokuntosali	LI_KUNTO	31169d42-b6c4-485c-8ced-f3fca6fe9ea9	{T5}
2f6a5924-807e-47a5-96c4-0f4d7d42ed18	2023-09-11 00:00:00		Lippupallo	LI_PALLO	999be80c-ff15-4515-ba2d-3f330319b986	{T4}
c9c54bfb-7c50-4775-88cd-a79b941ebd09	2023-09-12 00:00:00		Lenkki, liikkuvuus ja ulkokuntosali	LI_KUNTO	c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	{T5}
2bcf4c09-33ba-4738-a859-976b4e4e65b1	2023-09-12 00:00:00		Move-mittaukset ja fireball	LI_KUNTO	640e87de-8063-4c00-9087-c17709e34059	{T5}
edf92d9b-7d05-4843-8ed1-ee29ba8d16c6	2023-09-12 00:00:00		Lenkki, liikkuvuus ja ulkokuntosali	LI_KUNTO	f6160571-beff-4c21-b3af-399f376429ae	{T5}
848c9d35-2b6f-4314-ac47-a586d8261405	2023-09-12 00:00:00			LI_TANSSI	c27efea4-643a-4cdc-9c40-e58525a49720	{T1,T5}
c5e7d13a-39ea-43a2-9490-1f8e8473e66f	2023-09-13 00:00:00			LI_LUONTO	89d861be-d5e9-41a3-8672-d977b0895d54	{T5,T4}
fe36ee80-78be-42a3-bbf0-3677b51326b1	2023-09-13 00:00:00			LI_VOIM	e3aba1ba-865b-4174-b776-b5936ab840d3	{T5,T4}
319b9693-947d-454c-bec8-429501c9ceb3	2023-09-13 00:00:00			LI_VESI	1cc91b32-fe7b-4efe-8b2e-d9cc852d7600	{T5,T8}
7ed4fdd0-0d57-4bcf-97a4-646f0fcc2790	2023-09-13 00:00:00			LI_TALVI	8ffe45c2-e5a4-4702-89d4-2df665869687	{T2,T1}
eded69bb-0030-4d76-915c-ff9b56f0bf37	2023-09-13 00:00:00		Norsupallo, amerikkalaisen heittäminen, ultimate amerikkalaisella\n	LI_PALLO	cf7246cc-5760-499a-9252-c3d1bbcc79e8	{T4}
8d478ae5-8238-4ee2-9731-b04edb5026c6	2023-09-13 00:00:00			LI_PERUS	b83c3bfe-9b2c-417b-a955-5d725e54f94e	{T5,T3}
3b1e4ba1-e6b4-4a0b-8963-6622d754c465	2023-09-13 00:00:00		Jenkkifutiksen heitto, ultimate ja soikkispeli	LI_PALLO	61dc37a4-b86f-4563-8fca-37aad69a1f05	{T4}
1bc699a0-733c-4e83-ba1b-b6175076e18d	2023-09-13 00:00:00			LI_PALLO	1cc91b32-fe7b-4efe-8b2e-d9cc852d7600	{T5,T4}
7a7c9ff7-05cd-45f8-94ef-d35c694786ef	2023-09-13 00:00:00			LI_VESI	89d861be-d5e9-41a3-8672-d977b0895d54	{T4,T3}
cd607d5e-69e1-42cf-a1a6-ee16359bf6df	2023-09-13 00:00:00			LI_TALVI	6f377d70-cfec-45c3-aabb-c41bdedaa327	{}
0dc45b77-63e5-45af-a850-9618308a47e7	2023-09-13 00:00:00			LI_LUONTO	0736c55e-a30f-468d-ac92-011155f63782	{T10}
44b021a4-4a91-448d-b422-02edb42a1a3e	2023-09-13 00:00:00		Sulkapallo	LI_PALLO	fc400672-2a2e-44b1-966b-d887bb7d1f40	{}
e4c3d476-62fa-4353-8fe6-3cf0b6ceaf74	2023-09-13 00:00:00		Tier	LI_LUONTO	94673584-2806-4e30-9a43-1fd7c50320d8	{T8,T1}
20fd7772-564d-49d2-8894-d349e53dee28	2023-09-13 00:00:00		Käsipallo + kiekonheiton alkeet	LI_PERUS	d872e1e1-07ed-4fe7-b285-f11e407754c7	{T4,T9,T1}
d4d9d93d-8632-4c20-870e-2fe1bd957194	2023-09-13 00:00:00			LI_PALLO	b83c3bfe-9b2c-417b-a955-5d725e54f94e	{T4,T1}
17e86dd3-05d1-486d-b4ea-341799da4e3f	2023-09-14 00:00:00			LI_PALLO	b83c3bfe-9b2c-417b-a955-5d725e54f94e	{T5,T2}
4aa43e58-24a2-49ac-b69e-ea8e540203e8	2023-09-15 00:00:00		Viuhkasuunnistus (Cluedo) Harjulla. Tavoitteena kartan suuntaaminen, karttamerkkien tunnistaminen, mittakaavan hahmottaminen ja yhteistyö parin kanssa. 	LI_LUONTO	63f2c632-042f-45d8-864e-8ecf96d21f70	{T2,T9}
b258d162-fb69-49c5-a342-5646aedc2187	2023-09-12 00:00:00		Jalkapallo eka tunti	LI_PALLO	d427be8a-0aba-47fb-8960-a447826b0343	{T1,T4,T2,T9,T10}
cfab6204-6948-45e6-b556-86192d073cfb	2023-09-14 00:00:00			LI_PERUS	36347506-9fe3-4cc1-bd70-3f56675ba66c	{T1,T3,T6}
9faf68b0-a85b-4c09-abb0-d4c9e0e19e79	2023-09-14 00:00:00		Terveystiedon ravintotunti	LI_MUU	a6290fba-9996-4d99-9ba6-d6f68cf8463b	{}
1b127087-3655-4766-bfc5-601ca4e3731c	2023-09-14 00:00:00		Move-mittaukset	LI_KUNTO	45982a54-e42c-4e48-8b84-32689d592abd	{T5}
85a149ec-da1c-4b44-874b-1208bf8be03a	2023-09-14 00:00:00			LI_PALLO	1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	{T4,T2,T8,T9}
73b52af5-0332-4511-b57e-89b4806d2a51	2023-09-14 00:00:00		Heittäminen, kiinniottaminen, lyöminen	LI_PALLO	f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	{T4,T8}
a0c15016-a50b-44ce-81b5-56016d56e8a1	2023-09-14 00:00:00			LI_PALLO	a153dc01-0752-4f56-9501-8fc52ba97f0b	{T3,T4,T8,T10}
0aaa8915-25de-4565-a886-585dd8f5bd3a	2023-09-14 00:00:00		Sisäpalloilu, futsal	LI_PALLO	c90e44ff-5e1a-4114-a2f1-aa8f139019a1	{T4,T9}
bd77100d-766d-4ce4-8e59-6718b3f4061a	2023-09-15 00:00:00		Kävely, liikkuvuus, ulkokuntosali, lentopallo	LI_KUNTO	a6a42248-8033-4254-8b5d-ba325479414d	{T5}
3736eb77-801f-4566-8f11-57b2263b201a	2023-09-15 00:00:00		Kävely, lentopallo, ulkokuntosali	LI_KUNTO	fd028225-16dd-4d8e-8c86-a81a9d9243e5	{T5}
a6ef21b8-7092-4dce-947f-057904ea6d6b	2023-09-11 00:00:00			LI_LUONTO	587a6af4-afdd-4bf5-90a9-04bcadbb4807	{T8,T2}
3973c4f0-84bb-4b53-bef0-2571ba7e86d6	2023-09-15 00:00:00		Terveystiedon liikuntatunti	LI_MUU	a6290fba-9996-4d99-9ba6-d6f68cf8463b	{}
4b1b54c2-ea63-4061-b45c-e18b9e85c500	2023-09-15 00:00:00		Lippupallo	LI_PALLO	640e87de-8063-4c00-9087-c17709e34059	{T4}
7cbb3790-0e71-4f81-88b4-e9f627ab5e54	2023-09-12 00:00:00		Retki Laajavuoressa ryhmäytymispainotuksella	LI_LUONTO	d3f5eb51-9cac-441e-91ac-bad14e134b9d	{T3,T2}
b14f2c21-613d-49dd-93f1-8bdac3f71800	2023-09-13 00:00:00		Luontopolku: kävely ja tehtäväkortin täyttö	LI_LUONTO	49f0263b-9be4-44f2-be54-8f95a1942dae	{T7,T10}
\.


--
-- Data for Name: Group; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Group" (id, name, "teacherId", "updatedAt", "subjectCode", "currentYearCode", archived) FROM stdin;
293d7530-587a-4b1a-b216-585601c65f30	Uusi luokka	a44319a9-1556-4e03-b825-48b8648a4699	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
7ceb709a-05c1-408b-912c-f8196c3b8694	Toinen luokka	a44319a9-1556-4e03-b825-48b8648a4699	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
176d8452-d61a-4115-9c3e-cfeb2c990daa	Kolmas luokka	a44319a9-1556-4e03-b825-48b8648a4699	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
a5e350b6-8d0e-40da-a480-a9146a6eb556	Neljäs luokka	a44319a9-1556-4e03-b825-48b8648a4699	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
8c596bfe-60ff-4649-a27e-bddc4c81aa7e	Uusi luokka	5b637712-3af1-46a2-aeb0-a4a016b134bc	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
f3bf4d11-99a7-4ec9-a8a5-cc5743424a92	Toinen luokka	5b637712-3af1-46a2-aeb0-a4a016b134bc	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
1dc7d4c5-27c3-49c4-80de-9afdd54d69a1	Testi luokka	5b637712-3af1-46a2-aeb0-a4a016b134bc	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
2701efce-305c-4914-b604-dcea230c2689	Herran huone	483e736f-00a6-46d1-a1c3-3099eb626012	2023-04-19 16:57:12.014	LI	PRIMARY_FIRST	f
0af98668-1b27-481f-a1c1-54b3d775ee51	Li 8a/8b	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-04-20 11:15:51.865	LI	PRIMARY_FIRST	f
69f26527-bdb1-4e38-b999-9f2481fd62f6	Testi luokka	5b637712-3af1-46a2-aeb0-a4a016b134bc	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
54fac98f-4253-487e-9e4e-e0ef4ae2443a	Testi luokka	8548a9c5-dfdb-48e6-936d-f221845157b4	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
c3f1e3d5-7abc-44bb-bfa5-12a0fd2c6769	LI03	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-04-20 13:04:36.448	LI	PRIMARY_FIRST	f
aff9ac1f-ab9d-4d21-a161-408240f222d6	7B	1112c6f9-bfbf-4207-83cd-910ffe0582f2	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
eab532a9-07cc-4c9d-b11a-2d4ddb84996d	9A	1112c6f9-bfbf-4207-83cd-910ffe0582f2	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
54d739bd-6c9f-48df-850c-78a43ed48a61	13b	1112c6f9-bfbf-4207-83cd-910ffe0582f2	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
8eda8460-b4f6-4ed0-b43a-253608ef0298	Valinnainen LI 8a/8b	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-04-14 08:48:29.463	LI	PRIMARY_FIRST	f
c42525f7-172d-4d1f-9bf1-96bbed39414f	Nooran ryhmä	96549af2-ad08-4066-b742-cb1048b3876d	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
1811d42e-eb46-4b97-a067-8d91a4c60bd1	LI01	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
d2dd3387-7d32-4ab0-bafb-a04aa89621d6	VLI 9a/9b	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-04-19 07:07:11.778	LI	PRIMARY_FIRST	f
1dffd2ea-91a3-4f2f-a001-ca61df2631b8	Eka ryhmä	185a9cc2-8497-493f-94da-65abda04a320	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
9c0fff82-1597-4447-84d2-28051ef96223	LI 7b	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-04-19 14:28:01.278	LI	PRIMARY_FIRST	f
1d45a2c2-1ae0-4068-adf4-d09fb4d6f31d	6B	483e736f-00a6-46d1-a1c3-3099eb626012	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
e61dbeae-376b-4fac-bd5b-7441b0533ee9	LI 7a/a	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-04-19 14:32:33.021	LI	PRIMARY_FIRST	f
110c9dff-5530-4184-baf5-bb6bb05bb40f	LI 9a/9b	c71a57e7-5fb0-452d-88b0-f96072f8be2d	2023-04-19 14:38:27.521	LI	PRIMARY_FIRST	f
88e7273d-605d-483a-ae82-2c548472a6ec	Tapitus	483e736f-00a6-46d1-a1c3-3099eb626012	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
2556b6a9-4cab-4b65-99fe-94f5cf5d9123	A	45f62aaf-431d-478a-96b2-629928472f0f	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
11f9a50c-6d6d-405e-882d-dd0d828980c5	B	45f62aaf-431d-478a-96b2-629928472f0f	2023-03-30 18:34:09.249	LI	PRIMARY_FIRST	f
fde7c856-7b1b-4ca8-a624-67809c32bd65	Testiryhmä	e31f2fbf-4637-46e9-94c2-93f00a138edf	2023-05-19 11:44:05.791	LI	PRIMARY_FIRST	f
c65eb9ef-7f0b-48ec-8e07-29b20f9cfeb0	Jsjskdjsj	8548a9c5-dfdb-48e6-936d-f221845157b4	2023-05-19 13:25:26.995	LI	PRIMARY_THIRD	f
57d7802e-5dd9-44d2-a652-4185942f2b97	testiryhmä	6bcb2e61-7d1e-4697-9e41-93a8f62a3cd6	2023-06-01 10:17:04.501	BI	PRIMARY_SECOND	f
723f1c8d-8a79-4484-b31b-d2e4f7f50efd	toinen ryhmä	6bcb2e61-7d1e-4697-9e41-93a8f62a3cd6	2023-06-01 10:20:17.176	LI	PRIMARY_SECOND	f
23a47b66-cd2e-4a9c-ab78-d6b1a8e5643f	4AC	4f38a727-897b-40d0-a974-cf8a7d2efda1	2023-04-22 12:40:09.521	LI	PRIMARY_FOURTH	f
556d49fe-2a7d-4818-8a64-3ecc6a59009c	Name	483e736f-00a6-46d1-a1c3-3099eb626012	2023-06-21 12:56:04.927	LI	PRIMARY_FOURTH	f
909b50c8-56c4-4618-bb55-e1a1feb7f1a9	Kettujen kerho	483e736f-00a6-46d1-a1c3-3099eb626012	2023-04-22 12:43:54.406	LI	PRIMARY_THIRD	f
f118eb20-2ff4-4bec-a6b7-458e97ef062d	Nelkut	94f0b047-8048-49a1-8578-889686e3127a	2023-05-03 19:49:12.607	LI	PRIMARY_FOURTH	f
e5fde4bf-6630-4459-9d8e-31740b307c02	9. Valinnainen	df4df12f-c686-4f62-a276-e42e8162c218	2023-09-13 10:10:26.864	LI	PRIMARY_NINTH	f
668d593b-2679-480d-9c37-6a7f5d4fb257	Name	483e736f-00a6-46d1-a1c3-3099eb626012	2023-06-21 12:56:07.627	LI	PRIMARY_FOURTH	f
b5e709c0-8913-42b6-82b0-04d702347380	test@email.com	8548a9c5-dfdb-48e6-936d-f221845157b4	2023-08-23 08:17:27.322	LI	PRIMARY_FIRST	f
0df0a9e8-d7d4-4a24-a2ad-e5f263696a27	Testi iso ryhmä	4f38a727-897b-40d0-a974-cf8a7d2efda1	2023-09-08 10:31:55.772	LI	PRIMARY_NINTH	f
36b2f528-25fa-4ce2-8d35-6d487a5078d9	8C	df4df12f-c686-4f62-a276-e42e8162c218	2023-09-14 09:04:50.106	LI	PRIMARY_EIGHTH	f
e6299525-7a48-4030-a523-cf249433d62a	Testi	df4df12f-c686-4f62-a276-e42e8162c218	2023-08-20 18:23:59.295	LI	PRIMARY_FIRST	t
9d124d20-5f11-4647-9256-b1c43740dd81	Testi	df4df12f-c686-4f62-a276-e42e8162c218	2023-08-20 18:24:03.326	LI	PRIMARY_FIRST	t
558998de-3364-412a-908a-70b27920ea42	Testi	df4df12f-c686-4f62-a276-e42e8162c218	2023-08-20 07:33:44.762	LI	PRIMARY_SEVENTH	t
b03b85ef-19a9-47ab-9903-b0a2b82bb1de	Testi	df4df12f-c686-4f62-a276-e42e8162c218	2023-08-20 07:33:16.858	LI	PRIMARY_SEVENTH	t
53bbc105-6e07-4841-a795-c75f806bea01	Testi	df4df12f-c686-4f62-a276-e42e8162c218	2023-08-20 18:23:55.193	LI	PRIMARY_FIRST	t
c9fc597a-3fe4-4035-8773-b858579c2f3c	8G	4f38a727-897b-40d0-a974-cf8a7d2efda1	2023-09-13 09:36:40.319	LI	PRIMARY_EIGHTH	f
a0cd3827-7fc0-4b11-944f-cd459880a439	Jhg	483e736f-00a6-46d1-a1c3-3099eb626012	2023-08-24 14:12:48.362	LI	PRIMARY_SIXTH	f
5922e468-ecb6-481e-bfdb-c4e2386cb070	8. Valinnainen	df4df12f-c686-4f62-a276-e42e8162c218	2023-09-11 12:18:38.898	LI	PRIMARY_EIGHTH	f
4c36484b-3244-47a9-a5e3-235c9474383e	7D	df4df12f-c686-4f62-a276-e42e8162c218	2023-09-11 07:12:39.605	LI	PRIMARY_SEVENTH	f
562cb013-14e0-4d29-ae33-5ba1813dfec6	Testi pieni ryhmä	4f38a727-897b-40d0-a974-cf8a7d2efda1	2023-09-13 12:35:10.655	LI	PRIMARY_NINTH	f
e768794b-c688-4dce-9445-23e8d4c3c986	7B	df4df12f-c686-4f62-a276-e42e8162c218	2023-09-12 06:58:01.107	LI	PRIMARY_SEVENTH	f
942b9f78-b7b8-46aa-abff-18cf8da3ac9b	7A	df4df12f-c686-4f62-a276-e42e8162c218	2023-09-12 11:13:09.765	LI	PRIMARY_SEVENTH	f
da15b065-9c67-4003-8ec0-7e1e2eee111f	6b	b174d04e-39ef-4356-a65b-cb73d9543176	2023-09-12 16:52:20.048	LI	PRIMARY_SIXTH	f
41f9142b-c05f-41c7-baea-7afafeabb8c7	8a	dc1c8071-ac93-4952-8c66-85fb342f98ea	2023-09-13 10:33:34.823	LI	PRIMARY_EIGHTH	f
92ce53f7-53e2-46a0-ac39-ecdefa3dfef7	4d	b174d04e-39ef-4356-a65b-cb73d9543176	2023-09-12 19:57:58.249	LI	PRIMARY_FOURTH	f
8eba147b-a52c-4bb7-b42c-7525324113f4	7C	df4df12f-c686-4f62-a276-e42e8162c218	2023-09-13 09:57:38.711	LI	PRIMARY_SEVENTH	f
5d674efc-3549-4837-b221-44c4d622eb09	9B	df4df12f-c686-4f62-a276-e42e8162c218	2023-09-15 11:13:24.58	LI	PRIMARY_NINTH	f
ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f	8D	df4df12f-c686-4f62-a276-e42e8162c218	2023-09-15 12:24:54.158	LI	PRIMARY_EIGHTH	f
d7eb105b-f258-443d-8ed8-c69546ac564c	Kdkdkdk	483e736f-00a6-46d1-a1c3-3099eb626012	2023-09-13 09:08:07.458	LI	PRIMARY_FIFTH	f
e3b855ae-8277-4c8f-b9e2-5f8b66351bcb	Hhuh	dc1c8071-ac93-4952-8c66-85fb342f98ea	2023-09-13 09:15:52.203	LI	PRIMARY_FIFTH	f
018cd027-6fa7-468f-b53a-cee9bbf557cf	9A	483e736f-00a6-46d1-a1c3-3099eb626012	2023-09-13 10:34:35.338	LI	PRIMARY_FIRST	f
a03847bf-8bef-44b1-922d-1626e7837406	Hhh	dc1c8071-ac93-4952-8c66-85fb342f98ea	2023-09-13 10:34:47.375	LI	PRIMARY_SIXTH	f
bc655f0c-1e07-47b4-9e8b-0a4ba9242d05	Lilu5	a9ffce62-5103-4e4a-9882-a1ac8b76cdb7	2023-09-13 11:52:36.473	LI	HIGH_SCHOOL_SECOND	f
9ebcb35c-02e8-4b5d-ad9c-3dae255bdab9	9bde	bd173322-259a-474e-af00-551b843abd26	2023-09-13 12:00:59.888	LI	PRIMARY_NINTH	f
b811f8b1-7d1c-447a-8cda-853f44e55fb6	L2 Lyseo harkkaryhmä	3a1486a1-98dd-44cc-8f8d-15f0e1635cf9	2023-09-13 12:01:57.792	LI	HIGH_SCHOOL_SECOND	f
4fe72bd5-8f67-4212-a715-4a0ca602e632	LI1	3386ad42-5f46-49ab-ab12-fa11bb8723a5	2023-09-13 12:02:09.205	LI	HIGH_SCHOOL_FIRST	f
c96447b3-d0d3-4985-878c-02536cf49e7f	Tahko guys	9f926abb-96f8-4ccd-baf0-f52eead78eb3	2023-09-13 12:02:50.172	LI	VOCATIONAL_OBLIGATORY	f
9e608b2c-cf73-43cb-af7f-0c86315d9184	5AB	ace2434a-877e-41a1-a272-50af1c2a8960	2023-09-13 12:02:54.896	LI	PRIMARY_FIFTH	f
d457226c-cff9-41c7-aebf-44a439e626c4	Ammttiopisto	8619ef13-7ce0-4b24-ad34-25a0c50502fa	2023-09-13 12:04:02.301	LI	VOCATIONAL_OBLIGATORY	f
4117be07-2cdb-4d17-a14d-f6b970f78821	Lukio LI 1 a	03125a3a-ced3-4bba-ad60-b8f0bef67281	2023-09-13 12:04:02.364	LI	HIGH_SCHOOL_FIRST	f
d0ef07c9-3848-4ec9-9d15-57168b896cf6	9ek	5e82d30b-73e1-4eb3-91a5-3e8e6a1e1e76	2023-09-13 12:04:54.032	LI	PRIMARY_NINTH	f
fddc0331-595a-4010-bada-fb28a1214d56	Gradia Lukio	bd419cf9-79a0-46a1-aec9-a72403acc960	2023-09-13 12:05:06.08	LI	HIGH_SCHOOL_FIRST	f
b509833f-510c-48b3-ac2f-f3a224f7689b	LPV3	a7935ade-dce6-4954-9616-d96d0534bd59	2023-09-14 13:18:36.484	LI	PRIMARY_EIGHTH	f
f963a69e-577f-45ee-bdf1-f3ade1a8fac4	Norssi 5 AB	b0cb2c48-123c-4c21-ad7b-d6f1a432f1e5	2023-09-13 12:06:18.507	LI	PRIMARY_FIFTH	f
328073c3-0870-4171-93de-3d88100d6acc	9a	bd419cf9-79a0-46a1-aec9-a72403acc960	2023-09-13 12:06:59.7	LI	PRIMARY_NINTH	f
93ecb125-ab82-4d66-99dc-ed689a177ba0	8BCE	51f117fe-e000-4e3d-ac13-7cfd1d5409c6	2023-09-13 12:07:39.087	LI	PRIMARY_EIGHTH	t
4f76d4a5-d7bd-45b0-8041-357685155fd6	8ADF	ca58c632-42f0-4423-9c35-338eda50c9b3	2023-09-13 12:10:34.839	LI	PRIMARY_EIGHTH	f
bf327012-7775-405f-b937-3a7c1508eda3	Norssi 9bde	d7ea5704-9071-41af-b5ec-4311fc5088f3	2023-09-13 12:10:41.25	LI	PRIMARY_NINTH	f
f375a966-3fef-43db-9afc-3ff484bf14c7	7	ca58c632-42f0-4423-9c35-338eda50c9b3	2023-09-13 12:14:28.869	LI	PRIMARY_SEVENTH	f
bffeb915-f568-4167-aee3-a59ad70d0ac6	5D	b2f96969-d008-4fb4-9367-d1f463b33bf0	2023-09-13 13:29:33.85	LI	PRIMARY_FIFTH	f
05921118-fee3-4527-ae43-518e2b92b04c	Test	246b2c10-e69f-4efe-bb88-b85b157a53a5	2023-09-14 13:22:53.407	LI	PRIMARY_NINTH	f
0c583991-c6d6-4d39-aa2e-3cb6b477fd43	2C	b2f96969-d008-4fb4-9367-d1f463b33bf0	2023-09-14 06:56:33.231	LI	PRIMARY_SECOND	f
5068fa59-55a9-48cf-9bb2-38a2a7b9ae0e	Testi	eb3000c7-1f5c-4d51-84d3-92a321fee7e3	2023-09-13 14:59:26.497	LI	HIGH_SCHOOL_FIRST	t
1eae19b4-6de5-45d6-9f05-2039e90f8df9	7 luokan harkka	905f4503-4974-4298-804f-41a23d29c106	2023-09-13 16:24:28.952	LI	PRIMARY_SEVENTH	f
e8fd1190-3395-4370-af51-9d9884a145b4	8ab	9f62e202-600f-4452-be5e-de1c0350a622	2023-09-13 16:43:10.236	LI	PRIMARY_EIGHTH	f
20952378-342a-4b6e-9cd2-040bcee46e69	7 CDF	5ca4b120-4155-459f-acea-cbadbaf95437	2023-09-13 16:52:33.255	LI	PRIMARY_SEVENTH	f
a7f2d79a-709e-4edf-bb8c-cf50567f926e	7 harkka	905f4503-4974-4298-804f-41a23d29c106	2023-09-13 19:38:13.124	LI	PRIMARY_SEVENTH	f
5c1dbf22-8f21-42df-a878-43f0d7446bde	Li1	68456b93-bed5-463f-b298-7b7d69c21980	2023-09-14 04:20:22.726	LI	HIGH_SCHOOL_FIRST	f
d49cfd99-fa09-4729-8fcd-1d1b66102c89	4A	51b0ee01-f526-4d88-bcf6-fe9f4f5f4bca	2023-09-14 07:49:38.768	LI	PRIMARY_FOURTH	f
bb364b38-c286-46d4-9bd4-fbf13531a884	23B Terveystieto	eb3000c7-1f5c-4d51-84d3-92a321fee7e3	2023-09-14 08:31:24.042	LI	HIGH_SCHOOL_FIRST	t
cd74808e-451c-4d1d-93a2-47c46f8385e3	23B Liikunta	eb3000c7-1f5c-4d51-84d3-92a321fee7e3	2023-09-14 08:31:45.262	LI	HIGH_SCHOOL_FIRST	t
0fb115d6-0135-4a01-aa83-019cbdd01cc3	23B Liikunta	eb3000c7-1f5c-4d51-84d3-92a321fee7e3	2023-09-14 08:45:36.978	LI	HIGH_SCHOOL_FIRST	f
43ce3dc0-4659-4c6c-969e-65c92e3b24db	Lukio 1	4f38a727-897b-40d0-a974-cf8a7d2efda1	2023-09-14 12:30:47.023	LI	HIGH_SCHOOL_SECOND	t
feb81b2f-c70c-47f8-a2c1-623dcdfe48aa	5AC	64ae9e69-39e8-43f4-9a3c-628b4c9332ea	2023-09-14 12:31:56.878	LI	PRIMARY_FIFTH	f
ef819731-2f4e-4980-9534-bec0630fee53	Kekeke	483e736f-00a6-46d1-a1c3-3099eb626012	2023-09-14 18:56:14.398	LI	HIGH_SCHOOL_FOURTH	f
bde28363-5c62-493c-afee-04d21e9eecde	9A	df4df12f-c686-4f62-a276-e42e8162c218	2023-09-15 08:44:26.648	LI	PRIMARY_NINTH	f
2cba9a0f-2452-495a-9fbc-0180ea49411e	Päättö syksy	9d7305e7-6591-446f-a593-7265e800d65a	2023-09-16 07:07:02.935	LI	HIGH_SCHOOL_FIRST	f
33ea6ccf-76a2-43e4-9f8b-3e365da6eb17	23B Terveystieto	eb3000c7-1f5c-4d51-84d3-92a321fee7e3	2023-09-15 11:58:45.248	LI	HIGH_SCHOOL_FIRST	f
a421b5e1-eb01-462e-899b-adb1b57e3b0d	Päättö syksy, 7ABE	49fdcd3d-aa2f-4c86-baec-e6c0c35665cd	2023-09-16 06:35:51.587	LI	PRIMARY_SEVENTH	f
f5010fc6-0d96-433f-aa33-9eda0587072e	Päättöharkka 2023	75c9c331-7658-4978-9fab-aedb00a430e9	2023-09-16 06:37:57.567	LI	PRIMARY_EIGHTH	f
acfe9dc5-5e1e-4302-9188-b0cb623b42ad	Päättö	f0b32130-0241-4b16-ab61-e6683cddbab3	2023-09-16 08:12:25.114	LI	PRIMARY_SEVENTH	f
872249e8-3e3c-47f4-8237-b25a13afce6f	Päättöharkka syksy	51f117fe-e000-4e3d-ac13-7cfd1d5409c6	2023-09-16 06:49:53.569	LI	PRIMARY_EIGHTH	f
ccd44372-5947-4b45-acc4-585c5f15c338	OPEA515, liikunta	9ec8ee79-0762-4208-a893-e44b5061b468	2023-09-16 09:41:40.559	LI	PRIMARY_NINTH	f
3e75cd57-f337-4778-acf3-7df420b17374	8lk. Liikka, syksy (PH)	898d7e61-abc9-4d1e-9bc5-3bc3a3b5727d	2023-09-16 07:02:53.375	LI	PRIMARY_EIGHTH	f
2fddc898-f1d1-4f7d-8406-be7c3a7e261b	Päättöharkka terveystieto	eb3000c7-1f5c-4d51-84d3-92a321fee7e3	2023-09-16 08:42:51.555	LI	HIGH_SCHOOL_FIRST	t
a7449b51-02e7-4f28-a799-bbc7f7f1496d	8lk	cc2e0dfe-3d7a-46bb-bde6-84a627f135f8	2023-09-16 14:39:50.434	LI	PRIMARY_EIGHTH	f
7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd	Päättöharkka liikka syksy	9b9baaa3-ebc6-4b4a-a014-7e588e84a8f8	2023-09-16 15:00:26.728	LI	PRIMARY_FIFTH	f
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
ce193ad9-d314-4c7f-bdb6-908585b7fad0	Eetu Immu Jaska Pekka	e6299525-7a48-4030-a523-cf249433d62a
9aaed25e-67f8-4d9d-ab09-96d4607a98a7	9B Ahti Aleksanteri	5d674efc-3549-4837-b221-44c4d622eb09
a56a92a5-893f-4de0-af0a-e764be900502	9B Katusiime Esther 	5d674efc-3549-4837-b221-44c4d622eb09
ae1feef0-be68-422a-8522-98700c2bd931	9B Kahin Haamud	5d674efc-3549-4837-b221-44c4d622eb09
82cd71ff-8e57-44ab-829f-f296a2929585	9B Koivusalo Sara	5d674efc-3549-4837-b221-44c4d622eb09
892e5773-39a1-4412-84cc-c219683ca4f9	9B Ikon Janal	5d674efc-3549-4837-b221-44c4d622eb09
d08c6dc6-1dc2-4a86-af3c-22e920af695e	9B Matan Nawaal	5d674efc-3549-4837-b221-44c4d622eb09
35c11fca-684d-4018-bbe6-ff17c59a80d2	9B Roimaa Sara	5d674efc-3549-4837-b221-44c4d622eb09
e5032b31-071d-4ac1-a61e-f341a7170084	9B Rastas Elina	5d674efc-3549-4837-b221-44c4d622eb09
91a52f1d-e774-4925-8a10-9f5d7d7995fc	9B Jama Mohamed	5d674efc-3549-4837-b221-44c4d622eb09
f5051172-84d5-4fbc-bca0-e4d808fa36f3	9B Salmela Lukas	5d674efc-3549-4837-b221-44c4d622eb09
498d994f-bb8a-4e31-8451-79c4519c6541	9B Torkkel Emma	5d674efc-3549-4837-b221-44c4d622eb09
a678e014-275a-4fc3-96dd-0d356b8b84e3	9B Zhang Kairuo	5d674efc-3549-4837-b221-44c4d622eb09
9549b80b-fa32-4340-98fb-f827e29982ee	9B Vuzimpundu Happy 	5d674efc-3549-4837-b221-44c4d622eb09
20f182b2-d260-4286-a228-80f03a83d6d5	9B Woolley Silja	5d674efc-3549-4837-b221-44c4d622eb09
b71238b6-1cfd-41c1-92dd-fae83e40bea6	9B Mirzae Sadaf	5d674efc-3549-4837-b221-44c4d622eb09
b5e44718-3033-432f-83a9-81edc4a14d47	9B Jama Fadumo	5d674efc-3549-4837-b221-44c4d622eb09
df5032e6-8740-4c54-a869-03e11dab715e	9B Ahmed Aaron	5d674efc-3549-4837-b221-44c4d622eb09
d63a461f-521c-4430-8e64-c4a05a9d6114	9B Al-Tikriti Yusuf	5d674efc-3549-4837-b221-44c4d622eb09
75c425cd-2ba2-433d-a0b1-cfaca6290abd	9B Hassan Kowsar	5d674efc-3549-4837-b221-44c4d622eb09
79171cdb-2833-4e72-bbf7-504cd4304ed1	9B Ahmed Abdi Abdi 	5d674efc-3549-4837-b221-44c4d622eb09
2113c63e-c4a7-4e49-90a6-626646c3d949	8D How Oliver	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
3eb15f99-938b-40e3-b16f-bce35248b3b8	8D Kaitaranta Daniel 	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
f031aca9-7acb-43fa-9884-72547dac5709	8D Hopia Valtteri	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
1f12b19a-138f-4000-a576-c5dab30ec9e9	8D Abdikadir Abdi Caziiza 	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
e0357050-7b2a-4b32-87cf-af5747b17208	8D Keränen Iiris	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
7c8f19ba-b172-40e7-8e9b-da74d07eb54a	8D Hongisto Aarni	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
c732359d-e9bd-44c3-aa2e-bd92bfb911c2	8D Häkkinen Andreas 	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
d202ea60-e678-49fd-8ecc-581cad6b508c	8D Lahtinen Lukas	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
0fe083de-7bae-4fc1-815e-b4ead74b6a69	8D Nykäin Tuomas	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
13e7ba68-1fc6-4e4f-947a-0370f5aff61a	8D Nikula Laura	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
a09eec89-d6b8-4a66-b95d-356d800aaa8f	8D Keskinen Eino	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
7a3453eb-b303-4944-9bfa-f7bfdde76864	8D Näränen Ida	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
9b2269f7-aba5-42f6-afab-ccfa7bc42585	8D Perez Joakim	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
23d41b74-018e-45f5-966c-c729188c1ca3	8D Piipponen Teemu 	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
c0a2a247-d6f0-4e43-bfd7-79d01e4eb16c	8D Taivaanranta Soraja 	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
d9ac630a-298d-422c-8d37-72fc3991857d	7-9F Jaakkola Andreas	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
d4e6aa85-cd60-4901-bd59-413ee93a3314	8D Lamminen Joel	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
03397f36-f253-476a-a333-556ae179dbda	7D Abdalla Karim	4c36484b-3244-47a9-a5e3-235c9474383e
8a429230-9011-476a-9f6f-15494ecf57f2	7D Yamin Rana	4c36484b-3244-47a9-a5e3-235c9474383e
3b6d04be-cd10-4e54-b5aa-28a67e8e2186	8C Pekki Samu	36b2f528-25fa-4ce2-8d35-6d487a5078d9
5e0e74f1-308a-4c20-bf9a-5011dff427d1	8A Khan Muhammad 	5922e468-ecb6-481e-bfdb-c4e2386cb070
f4df5072-2986-4859-a7cc-6d06a6fe21ad	7B Saksa Samuel	e768794b-c688-4dce-9445-23e8d4c3c986
9f715b18-4cd7-48ac-b927-f43f7c166538	 7C Matikainen Vera 	8eba147b-a52c-4bb7-b42c-7525324113f4
3cb1e21e-1338-4fac-8380-c69946fc26c6	7A Peltokangas Stella	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
403d2ef2-23cd-437b-9688-43756e24a287	9A Kainulainen Julia	bde28363-5c62-493c-afee-04d21e9eecde
848b881e-e506-4273-b778-61cd669267d2	8D Väisänen Vilho	ca4d6aa5-12b6-4f4e-830d-ba8a02f7cc5f
c71cbbc5-3ad5-4c1b-a751-616db7f95169	9A Kettunen Olivia	bde28363-5c62-493c-afee-04d21e9eecde
4e00db97-fd93-416f-a349-655a240056ae	7D Ali Abdulahi	4c36484b-3244-47a9-a5e3-235c9474383e
1aa8b618-de8a-4a56-b1ef-33ea240f027b	7D Pham Tu (Jessie)	4c36484b-3244-47a9-a5e3-235c9474383e
a8df8354-0125-404f-a1d8-5584462a5b82	8C Saarinen Juuso	36b2f528-25fa-4ce2-8d35-6d487a5078d9
fa187771-3d5e-4cb5-81eb-342568b7e833	7C Khan Mishel	8eba147b-a52c-4bb7-b42c-7525324113f4
6edb9c7d-338c-42b3-8bed-95c037398e1d	7A Azizi Asl Daniar	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
789cb197-e7fc-43dc-b4bf-99fa339f92b4	9A Marttila Eemeli 	e5fde4bf-6630-4459-9d8e-31740b307c02
ac72adf3-79e8-4479-a81a-be13b2603b33	9A Al-Abedi Ahmed	bde28363-5c62-493c-afee-04d21e9eecde
264fe413-3243-45aa-809a-0f752bce3b4a	9A Vähätörmä Alisa	bde28363-5c62-493c-afee-04d21e9eecde
8cb49f42-d3d0-4a6a-9ac1-9569aed4991f	7D Velho Roope	4c36484b-3244-47a9-a5e3-235c9474383e
ec51a182-bf8d-436e-8704-b2d5cd897604	8C Piskunen Juulia	36b2f528-25fa-4ce2-8d35-6d487a5078d9
c5a69235-e2da-483a-b4d4-898fe3bd4c75	8D Piipponen Teemu	5922e468-ecb6-481e-bfdb-c4e2386cb070
1e7d2903-2e91-4fca-b77f-211821ad0b07	7B Seppälä Lili	e768794b-c688-4dce-9445-23e8d4c3c986
69c689de-b305-43a9-a6e8-c65382e4e476	7C Mirzae Kamran (Ali)	8eba147b-a52c-4bb7-b42c-7525324113f4
e1ceb28e-8139-41aa-bf55-3ef379c568ab	7A Prydnia Yaroslava	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
f30953fb-1f87-41c5-b6f1-b9dbc28825ed	7-9G Mokan Brajikan 	e5fde4bf-6630-4459-9d8e-31740b307c02
959e8e48-e3dc-4672-b263-cb8fcb8f3057	9A Ahmed Nada	bde28363-5c62-493c-afee-04d21e9eecde
71f99d4c-e3e1-4c88-af9f-2641131f3422	9A Wdane Ridab	bde28363-5c62-493c-afee-04d21e9eecde
f18a8f1a-a17a-49da-8cc1-3603b4c21dc8	7D Torikka Toivo	4c36484b-3244-47a9-a5e3-235c9474383e
c08c69f9-ef26-4f6a-95ee-455d176dfa61	8C Öhman Jimmy	36b2f528-25fa-4ce2-8d35-6d487a5078d9
5f877b5d-eaeb-404c-b3cc-d51a467fa428	8B Laiho Katariina 	5922e468-ecb6-481e-bfdb-c4e2386cb070
3cd7167d-e20f-4291-9e18-5241b854e116	7B Satomaa Klara	e768794b-c688-4dce-9445-23e8d4c3c986
918413c4-6838-4a64-b031-6d026f3ce183	7C Pyrylä Lucas	8eba147b-a52c-4bb7-b42c-7525324113f4
5de52dab-1765-4acf-8020-053b68336487	7A Rinta-Kahila Fanni	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
9573f6aa-4bd6-4bf6-b320-1ee6b5ba8edb	9B Jama Mohamed	e5fde4bf-6630-4459-9d8e-31740b307c02
8585f583-e996-4173-acc7-e61b2992a3c3	9A Korpijaakko Ilari	bde28363-5c62-493c-afee-04d21e9eecde
28e533c4-faf3-4e9f-ac97-ea948c1b019a	7D Bakac Aisha	4c36484b-3244-47a9-a5e3-235c9474383e
4d9888c7-3be7-4fec-a5d7-07759cdff766	8C Ahmed Ruqiya	36b2f528-25fa-4ce2-8d35-6d487a5078d9
634c3f80-8b4f-4c38-ac4e-937418ec9e8d	7-9E Rauhansalo Emil	5922e468-ecb6-481e-bfdb-c4e2386cb070
db6b1a3f-e485-4b8f-8a25-0a8e518a2026	7B Al-Dulaimi Rimas	e768794b-c688-4dce-9445-23e8d4c3c986
52c3b46f-5204-40ad-9150-17b0a7077eed	7B Mohamud Mohamed Nasteho 	e768794b-c688-4dce-9445-23e8d4c3c986
4ac1e1d2-cafe-4171-a02a-773ae38292c9	7C Rissanen Leo 	8eba147b-a52c-4bb7-b42c-7525324113f4
72a94026-88ad-4cbb-b1e4-e6aa917db696	7A Rastas Lotta	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
abb97912-4c5e-4cec-b3e7-d1d840be7e81	9B Al-Tikriti Yusuf 	e5fde4bf-6630-4459-9d8e-31740b307c02
ed8b008e-b272-4a8f-a28b-3e10943865d0	9A Kuha Felix	bde28363-5c62-493c-afee-04d21e9eecde
e0c8876f-57f1-43dc-9950-3851d82380fe	7D Al-Jafari Elaf	4c36484b-3244-47a9-a5e3-235c9474383e
16530cbd-5612-4a8c-920c-9744e32be7bc	7D Siitonen Marcus	4c36484b-3244-47a9-a5e3-235c9474383e
e6537a2f-233d-4b11-8f1b-5a0814a675c0	8C Metso Julia	36b2f528-25fa-4ce2-8d35-6d487a5078d9
d0c101ca-4d6b-43c2-beb1-a4680f44dd5a	7B Abdikadir Ali Nawal 	e768794b-c688-4dce-9445-23e8d4c3c986
d2430900-d731-43d5-ae88-a0166a7cfdde	7C Ruokonen Laura 	8eba147b-a52c-4bb7-b42c-7525324113f4
9fc6c35d-b42d-4594-a960-5836531c7282	7A Sumarokov Timur-Artur 	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
e8b17234-4ce5-4c04-9507-ef785e100d73	9B Ahmed Abdi Abdi	e5fde4bf-6630-4459-9d8e-31740b307c02
b924bdca-75a4-4049-978c-22b6d57a75ed	9A Lönnqvist Mai	bde28363-5c62-493c-afee-04d21e9eecde
02ea3a66-aa4a-420a-9334-f2b0941c564b	7D Haaksikari Luca	4c36484b-3244-47a9-a5e3-235c9474383e
8c057200-e725-4e08-b93c-88bd891fe862	8C Friman Renata 	36b2f528-25fa-4ce2-8d35-6d487a5078d9
74744cbc-e78c-48df-b758-713f9a81751e	6-8H Hamshar Shabnam 	5922e468-ecb6-481e-bfdb-c4e2386cb070
fa71c8f8-45c8-4a24-b0fb-6a0ecd67af3c	8A Sistonen Samuel	5922e468-ecb6-481e-bfdb-c4e2386cb070
77793959-dc53-44d1-8cd5-ddbe3c4b25a4	7B Wisam Latif Muhammed 	e768794b-c688-4dce-9445-23e8d4c3c986
288da2c9-c807-4e5f-9f49-507f1cabc93e	7C Mutka Ronja	8eba147b-a52c-4bb7-b42c-7525324113f4
268e1a31-5cba-4861-8aae-7d38fb140f13	7A Saastamoinen Anton	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
d8d038a9-73b4-4ae5-8a92-88ed3edde4fe	7-9G Öztürk Ahmet 	e5fde4bf-6630-4459-9d8e-31740b307c02
3ff48490-fb0c-4328-8b8e-010efa10de13	9A Metsämaa Vilma	bde28363-5c62-493c-afee-04d21e9eecde
b03cc979-7da3-4d75-b187-943264397b04	7D Kettunen Topias 	4c36484b-3244-47a9-a5e3-235c9474383e
436f9966-c204-4794-89fa-e5e1a30b6247	8C El-Habbal Musa 	36b2f528-25fa-4ce2-8d35-6d487a5078d9
b0aa13eb-dd72-4d41-9158-63ed22b2f65b	8A Rumjantsev Nikita	5922e468-ecb6-481e-bfdb-c4e2386cb070
7e447ce6-5569-47f0-9000-20ae93a68bd3	7B Al-Tikriti Rawan	e768794b-c688-4dce-9445-23e8d4c3c986
d2bb5704-bed1-47cc-8879-681b17da4686	7C Abdilkader Isse Hamza 	8eba147b-a52c-4bb7-b42c-7525324113f4
a5fcc76a-56b1-4ed8-ba9d-5d62e20510d7	7C Lahti Noa	8eba147b-a52c-4bb7-b42c-7525324113f4
189e5ac6-f54b-4b10-ae14-ff92e63c3e5f	7A Tiullinen Tatiana	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
1242a7b5-d53d-4cd5-ae38-f65402ecf98d	9A Wdane Ridab	e5fde4bf-6630-4459-9d8e-31740b307c02
476293ef-adda-4c53-9a52-f977cb79d14e	9A Mohamed Mohamed	bde28363-5c62-493c-afee-04d21e9eecde
5e5f9c60-1c5e-43f6-97ff-6e6144ecf55f	7D Kalenius Iina 	4c36484b-3244-47a9-a5e3-235c9474383e
5c10a0b2-145a-4701-a64c-80a9369890a3	8C Elasri Samira	36b2f528-25fa-4ce2-8d35-6d487a5078d9
5ce6b918-bcba-4712-98c1-d891eec91168	8A Hassan Samira	5922e468-ecb6-481e-bfdb-c4e2386cb070
0025a5a3-6947-4d23-b100-bcd5a58c6e09	7B Ali Aisha	e768794b-c688-4dce-9445-23e8d4c3c986
77457577-1ab9-4dbb-8065-2ab12ece1a84	Eetu	53bbc105-6e07-4841-a795-c75f806bea01
d3433aa4-3325-4b9d-8d15-c4ebfdc7533b	7C Tuomi Sara	8eba147b-a52c-4bb7-b42c-7525324113f4
0b357c38-9cda-428a-8a3b-0254143564df	7A Salmi Viola	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
eb053966-13fe-4afb-996f-d6646db325e4	9A Pavlushkin Artõm 	e5fde4bf-6630-4459-9d8e-31740b307c02
394795ec-5959-4d19-9ee5-362213b77dee	9A Mielonen Patrick	bde28363-5c62-493c-afee-04d21e9eecde
775a7c76-dc4a-4849-baf1-d7f9080eaf89	7D Diamonika Kinsangula Destiny 	4c36484b-3244-47a9-a5e3-235c9474383e
e17db94c-c058-4163-b1df-3824f2f732b8	8C Ibrahimkhel Marwa	36b2f528-25fa-4ce2-8d35-6d487a5078d9
a2216f2c-6ade-4f5a-a8c5-515f09bd4b08	8A Plaku Rapush	5922e468-ecb6-481e-bfdb-c4e2386cb070
95db6c22-a14c-4f47-b6c3-5ddffdbd933f	7B Alhiiti Eslem	e768794b-c688-4dce-9445-23e8d4c3c986
31a2c199-fb37-4e7c-afb7-2619cc4f8260	7C Ahmed Abdi Abdishakur 	8eba147b-a52c-4bb7-b42c-7525324113f4
a29cc6ca-adec-4a7e-8b7b-3a6261a709be	7C Zhang Jingxian (Tiina)	8eba147b-a52c-4bb7-b42c-7525324113f4
39e44baf-d5a4-4a7b-85ba-8d9ef3dd9567	7A Välilahti Emre	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
7993aaf7-401e-4bef-b8c2-185aefd95344	9B Kahin Haamud	e5fde4bf-6630-4459-9d8e-31740b307c02
05d139e2-1d0d-44d0-9d55-8640833f9067	9A Mahad Ainab Naeema	bde28363-5c62-493c-afee-04d21e9eecde
1dd2a92e-8754-4265-884f-db0a12b6a4c8	7D Heliara Unna 	4c36484b-3244-47a9-a5e3-235c9474383e
92eecb4d-b8c2-43ce-ac29-eb7a46566311	8C Hautanen Aaron	36b2f528-25fa-4ce2-8d35-6d487a5078d9
904493af-2f99-494c-8b42-5ebe4c1ae1b6	8A Salmi Johan	5922e468-ecb6-481e-bfdb-c4e2386cb070
2abacf8c-b973-4678-9504-e30861fdcba5	7B Kallioniemi Neve	e768794b-c688-4dce-9445-23e8d4c3c986
36f9a75d-23d0-4a2c-b6c0-e04cee9b1e26	7C Ahmed Ali Mahad	8eba147b-a52c-4bb7-b42c-7525324113f4
7ebec83f-f17b-4770-a9af-ea290f26e168	7A Ali Hoodo	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
f510b335-8874-49a7-b7a5-e0e1c68bf05c	9C Ormo Juuso	e5fde4bf-6630-4459-9d8e-31740b307c02
fe65a7a8-1054-4dce-a078-47e176bca0d3	9A Marttila Eemeli	bde28363-5c62-493c-afee-04d21e9eecde
db1510ed-3bb6-4856-8ea9-5012eeb68192	7D Kibala Carmelo 	4c36484b-3244-47a9-a5e3-235c9474383e
ad4248b3-989a-4794-844e-af4cb598a1e7	8C Graham Daniel 	36b2f528-25fa-4ce2-8d35-6d487a5078d9
db8905a7-084f-4d92-af60-cf29824dabe7	8A Sheikh Ilyaas	5922e468-ecb6-481e-bfdb-c4e2386cb070
971b8500-6c50-4f89-ab1e-f5219ccdef93	7B Elberg Oliver	e768794b-c688-4dce-9445-23e8d4c3c986
40a52df7-f50b-4105-b4d2-00e0b391156b	7A Arkan Marija	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
0bd6f7ee-7d70-4a7b-9342-0e0d7b6548f7	9C Khalif Mohamed Abshir 	e5fde4bf-6630-4459-9d8e-31740b307c02
89864582-b6ce-4434-97ee-14767b35e1d0	9A Mohamud Mohamed Said 	bde28363-5c62-493c-afee-04d21e9eecde
0eba0b59-1564-4d93-a65c-d5aa57c2ba93	7D Pandey Ayushma	4c36484b-3244-47a9-a5e3-235c9474383e
1a420969-4c65-4a34-bdc2-80e13ed51f0b	8C Moisio Olli	36b2f528-25fa-4ce2-8d35-6d487a5078d9
50d7ab1f-3cf2-4e10-9286-36df63a6e81b	8D Lahtinen Lukas	5922e468-ecb6-481e-bfdb-c4e2386cb070
e111c54d-9b2e-406b-aab4-e61fe921dbe2	7B Mudei Kaalid	e768794b-c688-4dce-9445-23e8d4c3c986
cf94a62d-ef7c-448b-9f61-16a9c6b90911	7C Laine Elsa	8eba147b-a52c-4bb7-b42c-7525324113f4
e2500f5c-1aea-4ffe-9f18-9b86022fce62	7A Kosonen Matias	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
da006afb-aec4-4638-91e8-81bab1da0a69	9C Salmi Severi	e5fde4bf-6630-4459-9d8e-31740b307c02
53394cde-fdca-44d6-bae2-9c928f2f23a0	9A Mohamed Farah Fartun 	bde28363-5c62-493c-afee-04d21e9eecde
cfea9e73-0c9f-433f-909a-a088c3931b8f	7D Kiuru Matias	4c36484b-3244-47a9-a5e3-235c9474383e
139ee728-7bd5-4ed5-b88e-65e455770b9f	8C Immonen Matias	36b2f528-25fa-4ce2-8d35-6d487a5078d9
b580b35d-10c3-4ce3-9f87-37ce3a436eaf	8C Metso Julia	5922e468-ecb6-481e-bfdb-c4e2386cb070
a3be9480-89da-4490-aad6-4507acd56e6c	7B Ibrahimkhel Safa 	e768794b-c688-4dce-9445-23e8d4c3c986
f3d70376-e85f-44c5-ae21-9c138e6c1663	7C Cherkasov Artur 	8eba147b-a52c-4bb7-b42c-7525324113f4
92214907-4fe9-442f-9f35-c7b59f78e08a	7A Köiv Thomas	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
51954512-0767-4d9d-b15b-439329a27094	9C Kinturi Matias	e5fde4bf-6630-4459-9d8e-31740b307c02
fb382ba6-005a-42a0-9882-9735de457bc0	9A Pavlushkin Artõm	bde28363-5c62-493c-afee-04d21e9eecde
e34d25fc-b0e2-48f1-8d86-77ce7464822e	7D Mattanen Jimi	4c36484b-3244-47a9-a5e3-235c9474383e
61780abd-03a9-4ce4-89cc-059b5a2f5177	8C Halgma Kail	36b2f528-25fa-4ce2-8d35-6d487a5078d9
bf09f310-3700-49db-b3f3-384cd041e6f2	8C Muhumed Kalombi Salma 	5922e468-ecb6-481e-bfdb-c4e2386cb070
0d894576-e308-4a66-a809-d8530eb5753e	7B Mude Sabirina	e768794b-c688-4dce-9445-23e8d4c3c986
cd2ac37f-bba5-4131-8a91-20280bb9b26c	7C Kujala Beata	8eba147b-a52c-4bb7-b42c-7525324113f4
76d7ba34-af4d-41e0-934a-63461dc3aeac	7A Karimi Shahed	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
deca6386-deb7-4ce1-a697-d43c08ebe017	9C Sutt Sebastian	e5fde4bf-6630-4459-9d8e-31740b307c02
1d0f2b30-e376-4890-86af-e2585b65ee33	9A Selenius Pinja	bde28363-5c62-493c-afee-04d21e9eecde
05795f8f-d6de-4ec8-88fc-0df98df77292	7D Obandarme-Mokulu Blessing 	4c36484b-3244-47a9-a5e3-235c9474383e
6e24ea61-532f-452b-865d-b67df86c48c4	8C Muhumed Kalombi Salma 	36b2f528-25fa-4ce2-8d35-6d487a5078d9
7df2a50b-b064-49a7-a5d5-747b117f107c	8C Saarinen Juuso	5922e468-ecb6-481e-bfdb-c4e2386cb070
8730fbfe-4cab-41db-8b7d-a750e3448184	7B Mahad Ainab Najma	e768794b-c688-4dce-9445-23e8d4c3c986
33ce32f8-0ac8-47f6-a2a9-f5aa880442f4	7A Nieminen Aatos	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
689748d3-6df3-4578-ba76-9f081abb32c4	Eetu	9d124d20-5f11-4647-9256-b1c43740dd81
b7be5ecd-cc80-443f-8a6a-8125c91da527	9A Muhumed Kalombi Saara 	bde28363-5c62-493c-afee-04d21e9eecde
dccdded4-f3c3-4949-937a-cfd65fae056d	7D Pitkänen Emma	4c36484b-3244-47a9-a5e3-235c9474383e
6f8a2928-32c2-4e60-9c99-b8073fcd9d35	8C Mielonen Alexandra	36b2f528-25fa-4ce2-8d35-6d487a5078d9
fe5ede8f-8290-4b69-b575-75aeaab46f2f	8D Hopia Valtteri	5922e468-ecb6-481e-bfdb-c4e2386cb070
bdbdbd45-458b-41df-ba2f-ab5e4406bb26	7B Leinonen Taika	e768794b-c688-4dce-9445-23e8d4c3c986
aaf7140c-7da3-4882-b2a2-99b19054b43c	7C Kaikkonen Sofia 	8eba147b-a52c-4bb7-b42c-7525324113f4
9c95ce1a-b395-4179-9558-10abb9105fd0	7A Koivulahti Max	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
c2d546b1-48e3-45d8-a6dc-6042c118f2b8	Immu	9d124d20-5f11-4647-9256-b1c43740dd81
8fc516e0-c5ba-4181-a5cd-01f85629b4ac	9A Sileoni Jenni	bde28363-5c62-493c-afee-04d21e9eecde
ffb872b2-2bb5-4267-8e92-0514977ba44b	7D Lindberg Rony	4c36484b-3244-47a9-a5e3-235c9474383e
48f6a291-18c4-4349-8578-e9d40a016f99	8C Leinonen Jermu	36b2f528-25fa-4ce2-8d35-6d487a5078d9
f034aa91-48ff-496e-b25b-9c81eaaaa3e3	8C Mielonen Alexandra	5922e468-ecb6-481e-bfdb-c4e2386cb070
e0562708-15b5-478a-8f5a-1863c55a6f38	7B Louko Seela	e768794b-c688-4dce-9445-23e8d4c3c986
c177824f-0392-45e8-a26b-95cd21f3bbdb	7C Ikonen Pihla	8eba147b-a52c-4bb7-b42c-7525324113f4
0de6a87e-13a1-4713-988d-655e950c9fea	7A Heikkerö Minja	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
b0fdc629-cd54-4a92-9827-472024663b28	Jaska	9d124d20-5f11-4647-9256-b1c43740dd81
1199e08d-681c-4104-b883-89ebd887d53e	9A Olkhovskiy Jegor	bde28363-5c62-493c-afee-04d21e9eecde
e7eb8c8a-033d-416a-848a-6da0d65cbf8e	7D Pohjonen Joonatan	4c36484b-3244-47a9-a5e3-235c9474383e
d1c1ad1a-62d0-4d6b-bf48-2dead02ed1f6	8C Liao Elli	36b2f528-25fa-4ce2-8d35-6d487a5078d9
7756327f-59aa-40f9-aa95-88889e4ea759	8D Nykäin Tuomas	5922e468-ecb6-481e-bfdb-c4e2386cb070
7ac64248-1e14-4e88-ab15-a9a552d3811c	7B Muyima Djency	e768794b-c688-4dce-9445-23e8d4c3c986
de688b84-f770-47b6-9e15-3224c355d563	7C El Farkoussi Anas 	8eba147b-a52c-4bb7-b42c-7525324113f4
e3e017a1-6c30-4320-8ccf-3b2b276e8128	7A Osman Ikraam	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
cd357f8b-2fc9-489c-a3b2-a5850207d2d2	Pekka	9d124d20-5f11-4647-9256-b1c43740dd81
41dbd3de-0883-454d-baaf-7613476052f3	9A Starov Daniil	bde28363-5c62-493c-afee-04d21e9eecde
241042e2-7fa6-413a-a501-ab6c28dd86e7	7D Repo Antti	4c36484b-3244-47a9-a5e3-235c9474383e
28bf177a-d273-4b22-963c-4206fcffa9cf	8C Laitala Altti	36b2f528-25fa-4ce2-8d35-6d487a5078d9
fcabdea5-1224-442b-8142-62be862508e3	8C Hautanen Aaron	5922e468-ecb6-481e-bfdb-c4e2386cb070
c695adc1-a07a-4ebf-b99f-9714e4ab4bf7	7B Jatkola Ada	e768794b-c688-4dce-9445-23e8d4c3c986
25567d61-dd6a-4b36-a934-5f6894070674	7C Al-Nazary Fatima	8eba147b-a52c-4bb7-b42c-7525324113f4
e1ee0c51-198d-441c-a0e3-cce4c418d122	7C Lämsä Veera	8eba147b-a52c-4bb7-b42c-7525324113f4
18ccbf25-0831-40e9-9145-602b9d17ed2c	7A Tekko Krislin	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
5092be97-7e39-4aa6-bd2a-a517b48ff540	9A Tammi Nea	bde28363-5c62-493c-afee-04d21e9eecde
de0b5abf-b8c5-4046-aaf7-f9bffc544ca4	7D Olice Elin	4c36484b-3244-47a9-a5e3-235c9474383e
c80a1da2-c657-4a2d-8ee3-55eaa6a3b1f9	6-8H Al Hillo Rukaia	5922e468-ecb6-481e-bfdb-c4e2386cb070
eb6a2d6e-33a5-4ad2-95ea-a39741e9b905	8C Piskunen Juulia	5922e468-ecb6-481e-bfdb-c4e2386cb070
5e4779f0-fad2-4f94-b350-e56b4c5f5471	7B Üzün Mustafa	e768794b-c688-4dce-9445-23e8d4c3c986
1f768e05-8228-4b44-9288-7eae6b5b4686	7C Syväste Ellen 	8eba147b-a52c-4bb7-b42c-7525324113f4
01ab146e-d9da-4562-a7dc-f3d151d4992b	7A Seppälä Veeti	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
f5bddcf1-a27d-45e3-8822-d06a860511da	Kjjkk	a0cd3827-7fc0-4b11-944f-cd459880a439
8d17fa6e-0f31-4356-b76c-428b979d263d	6-8H Elvis Syväniemi	5922e468-ecb6-481e-bfdb-c4e2386cb070
20ecb99e-8262-4a44-944f-00642e085fab	7A Leyla Yandiyeva	942b9f78-b7b8-46aa-abff-18cf8da3ac9b
28948e5b-d16f-4720-8387-92541786db50	9B Ahtinen Matias	5d674efc-3549-4837-b221-44c4d622eb09
0b2dacea-aac1-4485-943c-4a547772b19e	Tero	da15b065-9c67-4003-8ec0-7e1e2eee111f
2ed20be8-dff1-4288-b134-c5464a62a71a	Pirkko	da15b065-9c67-4003-8ec0-7e1e2eee111f
1ddb42c2-6724-47fa-9de8-cb38d2a23d63	Jani	da15b065-9c67-4003-8ec0-7e1e2eee111f
33460758-511d-4f77-b17e-405a2427b733	Tero	92ce53f7-53e2-46a0-ac39-ecdefa3dfef7
39c0a18f-7107-4c0d-8108-b9829dcb7451	Matti	92ce53f7-53e2-46a0-ac39-ecdefa3dfef7
fb55d701-d27f-4ecd-a5ac-e4a1eb439afc	Liisa	92ce53f7-53e2-46a0-ac39-ecdefa3dfef7
c6cff715-fd29-4442-b5ca-7874a7815566	Satu	92ce53f7-53e2-46a0-ac39-ecdefa3dfef7
f71fab39-54cc-44ea-b9fd-2b4cea23aaea	Miki	c9fc597a-3fe4-4035-8773-b858579c2f3c
1bfba8d7-258c-400c-be9b-e8bc391bb98a	Riki	c9fc597a-3fe4-4035-8773-b858579c2f3c
1dba0411-e9c0-4fc0-a546-4b3b0b6e0d7c	Ossi	c9fc597a-3fe4-4035-8773-b858579c2f3c
8a881aaf-8159-4745-ae81-31760bf6a53c	Eetu	c9fc597a-3fe4-4035-8773-b858579c2f3c
19e1dc4a-356f-4eb6-ac1e-f81f0561db71	Akseli	c9fc597a-3fe4-4035-8773-b858579c2f3c
368b58cc-6d2b-4b27-a7ce-c6df69b4b29d	Valtteri	c9fc597a-3fe4-4035-8773-b858579c2f3c
3644e4a4-3155-40a9-aa52-bae1461f8676	Thomas	c9fc597a-3fe4-4035-8773-b858579c2f3c
1d5babbc-5045-4ded-b39c-52920bc7f82c	Mo	e3b855ae-8277-4c8f-b9e2-5f8b66351bcb
c44a70c5-42c4-4e68-8523-77d04ac76e3a	Znnskddk	d7eb105b-f258-443d-8ed8-c69546ac564c
2093feb1-589c-45e4-8551-4425364f1a6e	Djkdkd	d7eb105b-f258-443d-8ed8-c69546ac564c
e25a6a80-8f21-4eab-8b69-beb1243eaa1a	Skksks	d7eb105b-f258-443d-8ed8-c69546ac564c
d3579ab2-98d2-4ca7-a15a-50296e003dd1	Dkdkdn	d7eb105b-f258-443d-8ed8-c69546ac564c
06b4fa3d-58c5-4e1b-820a-ca7af5b69d19	Joona	c9fc597a-3fe4-4035-8773-b858579c2f3c
921a2286-9887-4072-8ea5-1c7ee77aac0f	Jesse	c9fc597a-3fe4-4035-8773-b858579c2f3c
3c7ae401-4032-492c-9421-acfdbedf161f	Jimi	c9fc597a-3fe4-4035-8773-b858579c2f3c
5bc4a788-a515-4012-82de-88f027654e1b	Ko	e3b855ae-8277-4c8f-b9e2-5f8b66351bcb
b7ef4d3e-a79a-4a57-901e-0d51c7947a1d	Ho	e3b855ae-8277-4c8f-b9e2-5f8b66351bcb
ff8713c7-f2a8-405a-8c15-0d7b861ec206	Inka	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
52d44ce9-e882-4c35-9718-76d9df228c7f	Noora	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
7590ae59-6d53-410b-a4de-7f2441a8da1b	Roosa	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
817cafbc-bd78-4c9b-adce-ae31e7cf1265	Olga	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
88ec603a-0841-4613-acee-9c2d7d717028	Erin	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
018faa61-3914-4905-bd1f-5bb8cb344681	Sofia	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
68c7c9a0-3cee-4753-924f-0386ad8aa70d	Ada	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
2dbf7f68-f8b1-4f8d-bad3-14d6359cfb2d	Vilja	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
494ff9fa-f752-48ce-85af-194d97ef84cb	Iida-Maija	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
93342c3d-0726-4229-b124-877fbf815835	Veera	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
156d8717-f98b-4412-8b34-94861626037d	Peppi	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
dc71afc6-19d2-40b8-9839-0f71bc07096c	Sanni	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
f4c4f80f-a24c-4f54-bf35-fdc1a814d176	Venny	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
1896f4c1-d958-4116-a001-441610ec320c	Usva	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
aded70f6-1486-444c-8bfb-1d90c95b7fc6	Eeva	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
1f0d3e95-5f2a-4817-a31a-8f43a6e79ac7	Sara	bc655f0c-1e07-47b4-9e8b-0a4ba9242d05
73f03e4f-8b55-4142-b087-ca4ee1eff895	Kakelinho	c96447b3-d0d3-4985-878c-02536cf49e7f
36b348ce-52b7-4eb4-bd76-baffbf5d115f	Nyrhitty	c96447b3-d0d3-4985-878c-02536cf49e7f
e2ecf55f-a86e-42a3-a3a6-4fe343a72714	Kage99	c96447b3-d0d3-4985-878c-02536cf49e7f
82730f97-2ae0-4d3a-837f-5240a2f2c2a6	Faija	c96447b3-d0d3-4985-878c-02536cf49e7f
82a750ba-35a8-4a53-bba8-6c67041d8ef9	Ukko	d0ef07c9-3848-4ec9-9d15-57168b896cf6
4ce5b44e-70c7-44ca-bef9-0f58bd4c4066	Niko	d0ef07c9-3848-4ec9-9d15-57168b896cf6
f65f351a-ef4b-4e1c-adad-e922ffc3cb6c	Aaron	d0ef07c9-3848-4ec9-9d15-57168b896cf6
a8b26b54-ac8b-4413-90e4-a0e93cb445c0	Eemeli	d0ef07c9-3848-4ec9-9d15-57168b896cf6
7b6a128e-3218-41e0-b08e-f1de59a25ec6	Lucas	d0ef07c9-3848-4ec9-9d15-57168b896cf6
5603622d-f94e-43f9-bd63-f3db770d63e8	Jean	d0ef07c9-3848-4ec9-9d15-57168b896cf6
0af63b5a-f6d8-4a96-bf25-48edf23cced6	Jing	d0ef07c9-3848-4ec9-9d15-57168b896cf6
83cc247a-c0a8-4725-8d9c-711473a68009	Liisa	4fe72bd5-8f67-4212-a715-4a0ca602e632
18f3169d-e9b8-4853-9a86-ca751a88cdc9	Topi	fddc0331-595a-4010-bada-fb28a1214d56
e73686ce-bcea-4b2a-bc63-aae356311ac4	Joonas	fddc0331-595a-4010-bada-fb28a1214d56
8d7f13ef-7847-4d41-aff7-d0bc70fcf797	Sami	fddc0331-595a-4010-bada-fb28a1214d56
57aefd40-c100-4ecb-9d57-998ae10249de	Oto	fddc0331-595a-4010-bada-fb28a1214d56
11575e9b-f03b-475b-b91f-d603a3736412	Taneli	fddc0331-595a-4010-bada-fb28a1214d56
66b45f46-15a3-45d1-ba38-0dab4c7d4acb	Jaakko	fddc0331-595a-4010-bada-fb28a1214d56
803a949e-0590-4a68-8c52-b6eefd6e3d29	Teo	f5010fc6-0d96-433f-aa33-9eda0587072e
637a9688-3c94-42f0-aeba-65bc859d4ddc	Sami B	fddc0331-595a-4010-bada-fb28a1214d56
550ee65e-9c0b-43ef-bf36-e3d86ef613d0	Juha	fddc0331-595a-4010-bada-fb28a1214d56
100ba60e-fd34-415a-a458-552400f75ef3	Roope	fddc0331-595a-4010-bada-fb28a1214d56
2f6620f6-5a34-4be0-a94b-f0b1463687d8	Joosua	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
cbc945da-3ffb-45fb-9392-febb6dace205	Lotta	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
bafa760d-85bd-4abd-a915-8f168cd9fcc3	Artur	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
38d8b67b-b1fa-4109-9abc-973a8ab9a84c	Reino	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
42d209d8-92ac-4f35-b789-f63f21142169	Josa	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
a4465d66-f0e8-4b22-845b-be41355cbdc0	Vappu	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
ab22ae23-0efe-46d6-968d-e2b6711d1a87	Alina	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
a11d93c5-501b-4450-b7e3-935395239f80	Stella	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
75382621-eef4-4e85-bc0a-e988b906eb97	Olavi	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
f8513393-8371-4e09-b5e9-66d53a992253	Julius	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
9056b851-29b1-4618-9f9f-6de7cbf445d1	Ossi	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
c06cee5b-023d-4288-b21b-d9ca5577dfc8	Anette	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
9c19cd28-20bc-4c45-96fb-0d93396be790	Fanny	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
83148628-1263-4fbe-9629-51aab83b598d	Lauri	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
f57eaf58-4be6-465d-bee0-1c73c5308e94	Sofia	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
a519e6c1-545a-4ded-abba-b2081cbf1990	Caius	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
742470ca-1ade-473f-a662-e86b4d46fd06	Taimi	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
8a300fda-6923-40eb-8109-1eeeddfa6c9d	Saga	feb81b2f-c70c-47f8-a2c1-623dcdfe48aa
85177c4d-7db2-49a6-bdad-68a528cf112a	Väinö	bf327012-7775-405f-b937-3a7c1508eda3
fcfaac7e-a6f4-41d5-9866-c9495aaf4161	Markus	bf327012-7775-405f-b937-3a7c1508eda3
4a8b8ecd-75fe-4ae3-a869-f09063a6770a	Topias	bf327012-7775-405f-b937-3a7c1508eda3
615f7448-1b41-4ed3-879b-2bb3d5043cfe	Mico M	bf327012-7775-405f-b937-3a7c1508eda3
d94665be-b668-4c42-8c9e-5bdef501b832	Mico N	bf327012-7775-405f-b937-3a7c1508eda3
884de3a6-f689-423a-aaef-d7b34cb5c9d4	Kristian	bf327012-7775-405f-b937-3a7c1508eda3
9e572ef0-8ceb-40c4-b2f8-04c9dd988432	Taisto	bf327012-7775-405f-b937-3a7c1508eda3
a620ae00-156e-48f0-9067-9edb21e5b746	Matias	bf327012-7775-405f-b937-3a7c1508eda3
c4421b10-1a79-4f11-a1be-50efaf377673	Aatos 	bf327012-7775-405f-b937-3a7c1508eda3
cb46f328-5e29-4df0-932e-5829eef3786f	Niklas	bf327012-7775-405f-b937-3a7c1508eda3
ea46af04-d0c5-4d32-9ac4-6a31c848514c	Niko	bf327012-7775-405f-b937-3a7c1508eda3
8413e666-efc7-426e-a147-b27040cffe46	Urho	bf327012-7775-405f-b937-3a7c1508eda3
4b1dd29d-5953-40b2-b0c7-abd8ea728ab6	Onni	bf327012-7775-405f-b937-3a7c1508eda3
272f6dea-2e4e-48f4-89d0-d2e35ccae1b4	Hugo	bf327012-7775-405f-b937-3a7c1508eda3
5a6e87d7-5c81-4364-b0b9-c34b973ce86b	Joosua	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
dddee3d7-88f2-4111-92ed-1d1b2d964c82	Lotta	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
f05a57de-566b-426c-aed1-4105d73e4da4	Artur	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
31b293cd-259f-4f1e-82be-b7dec7756a06	Reino	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
dcf4c142-a227-4867-9a9a-787d58afe6c7	Josa	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
c7b9b89a-40d6-4909-911b-c5be073987a6	Vappu	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
8b20ba89-0fab-4cb8-a1f6-89de0bd71d99	Alina	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
695db218-3ccd-41dd-a54a-5289cc4eee37	Stella	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
bb0cb981-956c-4a19-991e-0d933b55e675	Olavi	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
28af6b29-9f23-4c7f-b46b-a8408be92a5f	Julius	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
6e177d09-aed6-416f-840f-a0347350b5c4	Ossi	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
c1980116-b8a9-42cd-848b-4af50d00186d	Anette	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
4f144e23-d7d8-40a1-ad55-6aa8985b0fe5	Fanny	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
e4777d3b-9943-4a95-8236-c32cdc374cb4	Lauri	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
3181ad2a-a49d-408a-a083-2c0624c7101b	Sofia	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
7019d6bf-4771-4142-a1eb-0aa80c6f5869	Caius	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
b853620d-d401-4c16-a31b-e3f0eff48bcf	Taimi	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
c71ded06-600b-41c7-b05d-4682bd21000e	Ketonen Kerttu	93ecb125-ab82-4d66-99dc-ed689a177ba0
7c6f1701-b9e0-4360-a53b-261e34966146	Lamminmäki Lilja	93ecb125-ab82-4d66-99dc-ed689a177ba0
9904ff7c-c03b-4b9b-b2dc-abeeff226e59	J	328073c3-0870-4171-93de-3d88100d6acc
4ba5b49a-48dc-4b5c-b69d-5d5c835ec7a8	J	328073c3-0870-4171-93de-3d88100d6acc
68b089f0-8c8d-4a6c-9c5a-19273c9593ab	L	328073c3-0870-4171-93de-3d88100d6acc
efeeda80-28f4-49aa-80ba-4a10caedc06a	V	328073c3-0870-4171-93de-3d88100d6acc
f6277a9b-3cdb-4745-9a3d-1423e2d7164c	Lehtonen Liinu	93ecb125-ab82-4d66-99dc-ed689a177ba0
5826af21-2a2d-4469-84d6-00489384e244	Kristian Huopalainen	b509833f-510c-48b3-ac2f-f3a224f7689b
c4bd1fb9-e546-4232-ab32-af6b7c5cf8ea	Joel Huovinen	b509833f-510c-48b3-ac2f-f3a224f7689b
1b166df8-ff7f-41bd-873f-8cfde41120c5	Onni-Jalmari Auvinen	b509833f-510c-48b3-ac2f-f3a224f7689b
754b7f19-e695-429d-bed1-46aab0b80e1c	Jaakko Salomäenpää	b509833f-510c-48b3-ac2f-f3a224f7689b
98fa0eb9-3fe2-4ace-af2a-fec217e69752	Peetu Paalatie	b509833f-510c-48b3-ac2f-f3a224f7689b
bc8d055a-f914-4b59-906c-f78b145b2aa3	Aapeli Hietamäki	b509833f-510c-48b3-ac2f-f3a224f7689b
1a533d71-5f46-45ad-8d33-042e309031e7	Väinö Saloranta	b509833f-510c-48b3-ac2f-f3a224f7689b
35e924bb-5995-485f-93d5-b178dbc06511	Luka Huhtala	b509833f-510c-48b3-ac2f-f3a224f7689b
08a7431c-990e-4d04-a85a-cddb3d6a50e6	Zhen Hao Zhong	b509833f-510c-48b3-ac2f-f3a224f7689b
85f1f74e-9777-42f4-b12e-e855414773a3	Kerttu	872249e8-3e3c-47f4-8237-b25a13afce6f
23d381a8-9079-4422-87ea-0fda6011af7e	Lilja	872249e8-3e3c-47f4-8237-b25a13afce6f
c60de93a-3791-4cfa-b4aa-6bd0daf58139	Liinu	872249e8-3e3c-47f4-8237-b25a13afce6f
09ff1263-379f-43a0-a353-8f68895203f5	Selma	872249e8-3e3c-47f4-8237-b25a13afce6f
9c013a83-feac-4f39-911c-7d0452f1935c	Friida	872249e8-3e3c-47f4-8237-b25a13afce6f
86996843-bd5a-4ea9-8f20-c4a0e39da0cd	Saga	7e67bc6e-c273-42a2-9d1b-dbd39b25d5dd
2b601443-21fd-4bd6-8a9d-223db3a3d26b	Sirkka	872249e8-3e3c-47f4-8237-b25a13afce6f
7dbb7ebb-6d40-444b-8d99-719e03340fa7	Emilia	872249e8-3e3c-47f4-8237-b25a13afce6f
5f302e09-a7ec-4f45-a16f-467e695a9cbf	Alma	872249e8-3e3c-47f4-8237-b25a13afce6f
23a3cda4-5a4f-416a-b2af-6fd1708be539	Sofia	872249e8-3e3c-47f4-8237-b25a13afce6f
0135e75a-eff6-4f1a-8953-e3eb91d10979	Alisa	872249e8-3e3c-47f4-8237-b25a13afce6f
cc46d0fa-c8dd-4984-b8dc-82666d8f36ea	Laura	872249e8-3e3c-47f4-8237-b25a13afce6f
09fc776b-9df7-4a19-a7f8-38ff0bba4e28	Aada	872249e8-3e3c-47f4-8237-b25a13afce6f
8bcb3b99-fef1-45ee-90fb-a9d9ded9f8ef	Armi	872249e8-3e3c-47f4-8237-b25a13afce6f
88c6c7cd-afe6-492c-9c08-84488a74f9a6	Edith	872249e8-3e3c-47f4-8237-b25a13afce6f
d8a0b8ab-9b15-4308-9257-7d73339c92fa	Ansa	872249e8-3e3c-47f4-8237-b25a13afce6f
a2a4fa89-ec64-4fee-8791-7fefe4d34bcd	Elisa	872249e8-3e3c-47f4-8237-b25a13afce6f
b212bc91-6990-4647-8b3a-d15a6188fbdb	Ella	4f76d4a5-d7bd-45b0-8041-357685155fd6
258c5a2f-4f3e-4692-b7cc-bcce3ff8fde8	Juuso Haverinen	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
fc904e94-d131-4f09-8df1-0f664d89b160	Henni Hokka	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
1721d09c-8008-4ad0-896a-840f6314eec3	Milja Humalamäki	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
d50a1c11-4d8e-4ac1-a99f-cb85e4ef10ea	Kerttu Juuma	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
ca23c749-9a48-40c8-af25-09810af787d9	Minttu Kerttula	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
793629f4-7160-4ba2-9a65-7fa9afa33d98	Antto Kinnunen	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
986afb6e-d943-402b-bd89-90311832ef2c	Artturi Kiviniemi	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
9ca51b65-1c6a-4b2b-9572-ca3b907116bf	Rasmus Kortelainen	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
a74ada74-8ad9-478a-b938-aad81dc5ad50	Joska Koskinen	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
40fadd6a-1868-40e0-9611-8afd90260c2d	Maxim Koudelia	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
f3bf1cd6-247b-4258-9ad9-d464bea8dcef	Luca Laiho	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
d4e0e2f6-8d00-442d-ad2a-ee8ad9818358	Samuel Mattila	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
43eb8192-493d-4e62-a08d-0c91f3dd9a40	Lumi Mikkola	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
03ac1fc5-1e04-48a1-ac35-e870d9378a37	Eeli Mäkinen	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
f2643c22-6a89-402f-917a-850f365cbb77	Mikki Nissinen	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
5dc99e90-cdcb-4184-95aa-815bac526b8f	Elmo Orrain	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
d5225734-f651-4db1-a7f0-0108457018ab	Peppi Rantala	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
3403b4ae-6fd4-4e75-be49-2a59f4e77d75	Juni Parkkonen	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
f6426a3c-cd1f-49e8-bc42-f207b325f724	Scarlett Rantanen	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
5809c414-4e68-45f5-87b6-230845adc43d	Amanda Saartoala	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
2ee38c25-4953-4a5e-961e-69c5075818bd	Jonni Saksala	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
d38c401a-0343-41e0-bd69-0b54cce19241	Atte Santakallio	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
17de0a9e-947c-40c7-b2d6-57469c4d9c9b	Iina Tiainen	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
f75d829d-906e-4b23-ae70-b710b86cdaf8	Neela Varis	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
514ae707-0937-49f9-8d76-8324e0fe3bbd	Sohvi Vesamäki	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
4011c1e3-a470-4919-af20-f1481857b626	Aaro Vuosjärvi	0c583991-c6d6-4d39-aa2e-3cb6b477fd43
1f79fa56-e530-4b02-869e-5d7acf1cc245	Seela Helenius	bffeb915-f568-4167-aee3-a59ad70d0ac6
825279a7-a0bb-481e-bd13-5a1ba039ff87	Leevi Hyvärinen	bffeb915-f568-4167-aee3-a59ad70d0ac6
9bf0c924-75f9-4cc3-9aea-a066e36df97f	Otto Kiviranta	bffeb915-f568-4167-aee3-a59ad70d0ac6
7b5ebee2-1971-402a-8c72-1ff336ad0fd2	Viela Liukko	bffeb915-f568-4167-aee3-a59ad70d0ac6
a6fc047f-c520-4d72-8afe-a2851ab6b1cc	Niiu Marttinen	bffeb915-f568-4167-aee3-a59ad70d0ac6
29ac41db-57e6-4560-b51d-2db4e75e2edb	Sohvi Mynttinen	bffeb915-f568-4167-aee3-a59ad70d0ac6
f4f0a5fa-6166-4051-ade6-104e9f3675d3	Peetu Mäkiranta	bffeb915-f568-4167-aee3-a59ad70d0ac6
f643cd18-aa84-4343-8b49-6b2e24081b30	Sampo Niemelä	bffeb915-f568-4167-aee3-a59ad70d0ac6
2c723a08-5d26-48f4-a856-9fefc488bc62	Sara Nygren	bffeb915-f568-4167-aee3-a59ad70d0ac6
d5bc915d-5bcd-4260-a475-99f9eddac2aa	Wiljami Parantainen	bffeb915-f568-4167-aee3-a59ad70d0ac6
33da0dd5-4e68-4701-aed3-69cada308008	Silja Partanen	bffeb915-f568-4167-aee3-a59ad70d0ac6
e554a279-4618-428c-8094-d168e793d147	Friida Piironen	bffeb915-f568-4167-aee3-a59ad70d0ac6
4866728b-95c6-40d9-ac9d-03b16a7f6f5b	Erika Pollari	bffeb915-f568-4167-aee3-a59ad70d0ac6
b2242681-a055-4bb5-97db-3e9af4cb5c5f	Niilo Purontakanen	bffeb915-f568-4167-aee3-a59ad70d0ac6
f589e3ce-cd29-4a02-a83e-ddf1bbd3efbf	Leevi Rajala	bffeb915-f568-4167-aee3-a59ad70d0ac6
9a9bf145-4c54-40ec-a135-36f5917cd7cc	Vilma Rajala	bffeb915-f568-4167-aee3-a59ad70d0ac6
2390d22b-a0a8-4727-9a5d-7bd201dff488	Mikko Seuntiens	bffeb915-f568-4167-aee3-a59ad70d0ac6
5772b4bb-718e-472f-9738-6638b19e49f4	Niki Sillman	bffeb915-f568-4167-aee3-a59ad70d0ac6
85244cdd-72d9-4434-b61b-d4764d23d0cc	Jemina Sundberg	bffeb915-f568-4167-aee3-a59ad70d0ac6
65eb65fb-e318-493d-b157-8e6cd6c8640e	Minja Tanttu	bffeb915-f568-4167-aee3-a59ad70d0ac6
24694ccb-857d-4129-9cc7-980ae2162dea	Pietari Tervanen	bffeb915-f568-4167-aee3-a59ad70d0ac6
f812e160-b43b-4344-a181-d3be3dc3cc2c	Doris Tuunanen 	bffeb915-f568-4167-aee3-a59ad70d0ac6
fa66a9b0-f68e-4d21-bde2-e5440bd9e31c	Sanni A	2cba9a0f-2452-495a-9fbc-0180ea49411e
223a77ad-fc3c-4fe5-9ba0-fb26c8acfd30	Reetta J	2cba9a0f-2452-495a-9fbc-0180ea49411e
9bc7c029-1716-47c7-9122-ed869c3e1015	Amanda M	2cba9a0f-2452-495a-9fbc-0180ea49411e
367a36fd-227b-459c-ab29-9d63b591b8ec	Sanni M	2cba9a0f-2452-495a-9fbc-0180ea49411e
75faa4db-dfe1-4868-8d17-5bf5efd0155b	Venla N	2cba9a0f-2452-495a-9fbc-0180ea49411e
70f7d948-5ed8-4e7c-9d8b-fa5a59c07bcb	Kerttu R	2cba9a0f-2452-495a-9fbc-0180ea49411e
ad57009d-5992-4256-bd8f-d9f84d2048f7	Hilla S	2cba9a0f-2452-495a-9fbc-0180ea49411e
f74d8ece-7999-41b6-9244-c5af75e60633	Sara S	2cba9a0f-2452-495a-9fbc-0180ea49411e
04a8f732-2f64-4e15-b5df-ee017dec6175	Emilia S	2cba9a0f-2452-495a-9fbc-0180ea49411e
c261c216-59c0-4ee7-8492-5f4ec3b41472	Iida T	2cba9a0f-2452-495a-9fbc-0180ea49411e
e14ce7f2-2695-48b6-9f1c-b539d34db079	Aino T	2cba9a0f-2452-495a-9fbc-0180ea49411e
c69b1bae-f764-4d10-a90f-e1774686f31a	Oona V	2cba9a0f-2452-495a-9fbc-0180ea49411e
90876ceb-a561-4cd9-a574-160177ac0393	Kerttu W	2cba9a0f-2452-495a-9fbc-0180ea49411e
7f4dd268-b542-4251-ab71-eced924dc791	Matilda P	2cba9a0f-2452-495a-9fbc-0180ea49411e
f9edfe55-559b-45ac-a1e3-c8630a9fdd07	Ilona P	2cba9a0f-2452-495a-9fbc-0180ea49411e
125cc11e-face-470c-a7f7-906146b2a9f9	Eveliina R	2cba9a0f-2452-495a-9fbc-0180ea49411e
8c33c0b4-feaf-4a0c-85d4-73692a7342cf	Lilja T	2cba9a0f-2452-495a-9fbc-0180ea49411e
6285c6db-24e9-41d5-901e-f82c48e91df1	Antton Åkerlund	bffeb915-f568-4167-aee3-a59ad70d0ac6
30906d0f-a0f8-4a8d-b266-83af08749216	Eetu	43ce3dc0-4659-4c6c-969e-65c92e3b24db
29edfb40-1617-4766-b9a9-91738e1c5887	Jalmari	43ce3dc0-4659-4c6c-969e-65c92e3b24db
88352b90-69f8-48f3-bc89-640cff5ae4b1	Aatos Hyvärinen	b509833f-510c-48b3-ac2f-f3a224f7689b
56dd6659-5c6a-4cb6-9624-8a67f610bb2c	Veeti Liukkonen	b509833f-510c-48b3-ac2f-f3a224f7689b
247e39c5-4b02-4280-a60e-a7bf6dbf93f7	Konsta Kippola	b509833f-510c-48b3-ac2f-f3a224f7689b
a049b7e7-a46b-40b4-bd92-1d33a44167c3	Max Nykänen	b509833f-510c-48b3-ac2f-f3a224f7689b
dd4cf76d-9099-4cb3-8830-bdd9b8825bb6	Tuukka Vertamo	b509833f-510c-48b3-ac2f-f3a224f7689b
f830c9ea-eb40-405b-bab5-9f096459b6f3	Aatu	1eae19b4-6de5-45d6-9f05-2039e90f8df9
6b46a923-1a15-411c-a067-b89d0a0d0361	Kaisla Matilainen	e8fd1190-3395-4370-af51-9d9884a145b4
2b3c66e1-6ae2-4bb8-bb5f-9367b1c60a13	Iida Palola	e8fd1190-3395-4370-af51-9d9884a145b4
ce6a330a-8983-4648-883f-2a37ad323d82	Ilona Pelkonen	e8fd1190-3395-4370-af51-9d9884a145b4
f1735521-da56-4045-a8d2-6cab449c03e3	Martta Rasmus	e8fd1190-3395-4370-af51-9d9884a145b4
c73e46e3-f07d-4f63-8287-4bd64777e4eb	Aisha Ceesay	e8fd1190-3395-4370-af51-9d9884a145b4
48b10a29-5087-44ca-86fe-bea7baefe809	Wiam Chafqane	e8fd1190-3395-4370-af51-9d9884a145b4
7516a6b1-34d1-493f-8446-d4b92224a81a	Kaynat Ali Bazvan	e8fd1190-3395-4370-af51-9d9884a145b4
47b2d98d-8065-4802-bbb8-007af120033c	Aya Al-Nassar	e8fd1190-3395-4370-af51-9d9884a145b4
a1953c8f-d3de-49f5-a5f2-290fefb0744e	Senni Heiskanen	e8fd1190-3395-4370-af51-9d9884a145b4
853e59ab-93ec-43c2-a614-479ff74fc968	Krista Janhonen	e8fd1190-3395-4370-af51-9d9884a145b4
a00436ee-4ac5-4921-9e7f-93c2bb90958e	Kaisa Kisonen	e8fd1190-3395-4370-af51-9d9884a145b4
6ffb3e2a-2229-40e2-b575-cd686bad06e6	Aino Talassalo	e8fd1190-3395-4370-af51-9d9884a145b4
9f630151-9990-4987-a1e5-5a8b280051bc	Veea Soikkeli	e8fd1190-3395-4370-af51-9d9884a145b4
156c691f-acee-423a-aa54-c43fc7ef362d	Amanda Leppänen	e8fd1190-3395-4370-af51-9d9884a145b4
2e1d4a5a-e1be-4563-855c-13d40eedaf99	Soma Soltanpanah	e8fd1190-3395-4370-af51-9d9884a145b4
9dca9f7d-9c60-41cc-a840-fbb4ff1d32ed	Ella Hyytiänen	e8fd1190-3395-4370-af51-9d9884a145b4
8cf84965-ed78-46ec-a5a5-5cb9319e1eb2	Rania Soliman	e8fd1190-3395-4370-af51-9d9884a145b4
4aed6796-0bf5-4ca9-808c-b9f602ead89b	Jemina Lindeman	e8fd1190-3395-4370-af51-9d9884a145b4
fd5841ee-a527-43f1-9ce3-f8c6e07f1aa6	Iita Heinonen	20952378-342a-4b6e-9cd2-040bcee46e69
85b176c8-ba3b-4eb0-8e5a-49f25aeb8973	Alma Waris	20952378-342a-4b6e-9cd2-040bcee46e69
d5663de4-2ca0-4714-b244-54e221ad0181	Minda Matilainen	20952378-342a-4b6e-9cd2-040bcee46e69
576a4db0-a7f6-468c-a618-ddd15b218b88	Sofia Paju	20952378-342a-4b6e-9cd2-040bcee46e69
daa90cfa-fbd2-4f2d-b1b9-defda50f2a85	Alisa Pirttiniemi	20952378-342a-4b6e-9cd2-040bcee46e69
7307935a-04d1-47b4-8db4-656939df1ab4	Teresa Pirttiniemi	20952378-342a-4b6e-9cd2-040bcee46e69
e711a807-828d-44f1-9829-a5cd4fcceb44	Minja Järvinen	20952378-342a-4b6e-9cd2-040bcee46e69
2c2e2c34-e16a-47df-bbea-0b56741dfeb9	Fanni Kangaskorpi	20952378-342a-4b6e-9cd2-040bcee46e69
03d40a1c-184d-4fc0-8211-d765f2b731ee	Siiri Kinnunen	20952378-342a-4b6e-9cd2-040bcee46e69
841b231a-6161-4c74-a1a9-3226dbce4ba2	Evelina Moncada	20952378-342a-4b6e-9cd2-040bcee46e69
8166a152-fa65-4afb-8398-fbff180dd783	Lumina Repo	20952378-342a-4b6e-9cd2-040bcee46e69
6622f6f8-f125-4028-923e-71b3d81ba051	Emma Lampinen	20952378-342a-4b6e-9cd2-040bcee46e69
0dcd3b90-6ad4-4127-8bd7-abf019c6dba2	Aada Välimäki	20952378-342a-4b6e-9cd2-040bcee46e69
7d6ebc04-0079-49e4-bc33-1c0ac2b4fb89	Senja Rajamäki	20952378-342a-4b6e-9cd2-040bcee46e69
fca50e1d-4f85-4c30-84bf-2f754a7e045d	Cecilia Ojala	20952378-342a-4b6e-9cd2-040bcee46e69
fd0770a7-57eb-4fae-9c3c-00a6f53a546c	Saranna Haasanen	20952378-342a-4b6e-9cd2-040bcee46e69
a52cb130-d267-4ae0-871d-b771c31ba828	Noora Ruuskanen	20952378-342a-4b6e-9cd2-040bcee46e69
04c10328-decc-426f-be4c-728256cc89f6	Joose J	a421b5e1-eb01-462e-899b-adb1b57e3b0d
307d197f-ff26-4df2-808a-53bd60407b2a	Luka K	a421b5e1-eb01-462e-899b-adb1b57e3b0d
8ae4a627-229b-49eb-8a86-35ee6ac0e71d	Onni K	a421b5e1-eb01-462e-899b-adb1b57e3b0d
51e2aa93-2eb0-422b-a954-efab9144e01a	Kaapo S	a421b5e1-eb01-462e-899b-adb1b57e3b0d
fae7c131-a61b-4df9-84c1-c58881921a9d	Juho S	a421b5e1-eb01-462e-899b-adb1b57e3b0d
382a71c0-af7d-465a-a739-0ebca2e1e639	Anttu K	a421b5e1-eb01-462e-899b-adb1b57e3b0d
7a24b6b2-6ab6-491a-9cbe-dbebbe0438aa	Milo K	a421b5e1-eb01-462e-899b-adb1b57e3b0d
b99e91ab-5482-4d43-8d3d-66fced671a62	Mauri K	a421b5e1-eb01-462e-899b-adb1b57e3b0d
626a3179-8f65-4d72-85a2-864a2d27f2b1	Olavi M	a421b5e1-eb01-462e-899b-adb1b57e3b0d
0036bb62-5801-4282-bb15-e83fd56b814b	Lukas M	a421b5e1-eb01-462e-899b-adb1b57e3b0d
fcba63ba-50b7-4104-9488-23ec79551844	Veerti S	a421b5e1-eb01-462e-899b-adb1b57e3b0d
7e8bfa8b-017c-4203-8860-aee243347646	Leo T	a421b5e1-eb01-462e-899b-adb1b57e3b0d
327f0893-dc5b-482c-acfa-a5bb977a04ab	Dipal B	a421b5e1-eb01-462e-899b-adb1b57e3b0d
74e0dc95-58e5-4dae-9c8f-ad74d0473a68	Iiro L	a421b5e1-eb01-462e-899b-adb1b57e3b0d
6a1dc2f8-f64d-4126-bf94-bd86e5a2c7c7	Robert N	a421b5e1-eb01-462e-899b-adb1b57e3b0d
626ae0fc-2414-479b-877b-b5f886574910	Oleg P	a421b5e1-eb01-462e-899b-adb1b57e3b0d
9a1c0221-90b2-4321-89ed-96eda8b2be6a	Kosmo P	a421b5e1-eb01-462e-899b-adb1b57e3b0d
2408aec3-5b57-43df-a51f-6b9431428d21	Leo R	a421b5e1-eb01-462e-899b-adb1b57e3b0d
dc7afe5c-c9b6-48d8-a1a4-e4d5dc5eefbc	Sebastian S	a421b5e1-eb01-462e-899b-adb1b57e3b0d
388f0b8e-91ab-4a09-8224-7dd5e2f13df9	Sulo T	a421b5e1-eb01-462e-899b-adb1b57e3b0d
7ac75cd2-6f92-4e1d-8366-8480ad847179	Tai Jun	a421b5e1-eb01-462e-899b-adb1b57e3b0d
27cf24c0-2562-41e2-b341-82abab049a1e	Aleksi V	a421b5e1-eb01-462e-899b-adb1b57e3b0d
76a63a01-26fd-482e-8480-bcb5c993b891	Anni Jaakkola	20952378-342a-4b6e-9cd2-040bcee46e69
3c238e43-601b-4633-bed4-99b1070db4da	Lumi Juuti	20952378-342a-4b6e-9cd2-040bcee46e69
a469eda5-134c-41e0-8ff6-6d914f3496ee	Aivi Paalatie	20952378-342a-4b6e-9cd2-040bcee46e69
c68d9ccb-793d-45f7-846e-2f2ce2e38bef	Silja Soppela	20952378-342a-4b6e-9cd2-040bcee46e69
6f84a877-de90-4947-a9aa-98dba5207d81	Aapo Kallio	a7f2d79a-709e-4edf-bb8c-cf50567f926e
e0940e8c-9511-410b-b041-6d10be5df549	Lenni Koskinen	a7f2d79a-709e-4edf-bb8c-cf50567f926e
e6130ddf-6c1d-4e87-958c-eda7b0da1d65	Riku Kukkonen	a7f2d79a-709e-4edf-bb8c-cf50567f926e
e0e98c3c-64b6-4369-99f2-f61b315630b8	Nykänen Pyry	a7f2d79a-709e-4edf-bb8c-cf50567f926e
3a98c8b5-c036-480e-a81f-0621611204c9	Aarne Nyman	a7f2d79a-709e-4edf-bb8c-cf50567f926e
a6eb7748-b086-43bb-a243-b01c8073d057	Patrik Saari	a7f2d79a-709e-4edf-bb8c-cf50567f926e
65fbd2ac-f00b-4667-b303-d5fa1d6ca312	Joona Sammallahti	a7f2d79a-709e-4edf-bb8c-cf50567f926e
dbb9aa4f-3000-4282-a32d-b118f125d260	Sisu Sarkasuo	a7f2d79a-709e-4edf-bb8c-cf50567f926e
5c600723-4533-402d-9c4d-8058c3e62b7c	Topias Bottas	a7f2d79a-709e-4edf-bb8c-cf50567f926e
55b8bc01-7c43-4bf9-9a6d-77125514df24	Arthur Halonen-Gautret	a7f2d79a-709e-4edf-bb8c-cf50567f926e
528c90f1-73f3-4bfd-81d8-b54ed67d7d09	Rudolf Kasurinen	a7f2d79a-709e-4edf-bb8c-cf50567f926e
e3964be1-ccb6-4040-8cae-7b316905c506	Lauri Kiviniemi	a7f2d79a-709e-4edf-bb8c-cf50567f926e
1c626c9c-7847-4d25-9047-9e5dfcc80a20	Onni Sarvilinna	a7f2d79a-709e-4edf-bb8c-cf50567f926e
69873627-7b5e-421e-bde8-e8053c7b0e32	Leevi Jaakkola	a7f2d79a-709e-4edf-bb8c-cf50567f926e
43705cbc-c707-410e-8481-688aaeec47b8	Noel Kuusenmäki	a7f2d79a-709e-4edf-bb8c-cf50567f926e
55532bb4-1b81-467a-8073-4247a4a1e4b9	Totti Lamberg	a7f2d79a-709e-4edf-bb8c-cf50567f926e
b9995bd3-4e10-42cf-a6d3-a523af20b130	Lassi Noponen	a7f2d79a-709e-4edf-bb8c-cf50567f926e
c6363293-72eb-43a3-a6ec-fcba15990890	Akseli Seppä	a7f2d79a-709e-4edf-bb8c-cf50567f926e
231ac2c5-01b0-4b9e-a429-dd5ffd6e5c86	Onni Sinkkonen	a7f2d79a-709e-4edf-bb8c-cf50567f926e
4f17afe8-667b-442e-bfc5-db9fa67d868b	Matias Taipale	a7f2d79a-709e-4edf-bb8c-cf50567f926e
69a1448e-3e8e-47b0-acd6-a38e925f0a7a	Leo Toppi	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
031436bf-cbfb-4a2b-8416-6a9846d7f81c	Eeli	f5010fc6-0d96-433f-aa33-9eda0587072e
b601a7d0-879c-49c8-b25a-35985a43d3c1	Aapeli	f5010fc6-0d96-433f-aa33-9eda0587072e
6e43aeab-a138-4e37-b7fc-8bfad1789710	Luka	f5010fc6-0d96-433f-aa33-9eda0587072e
ff3ad08b-2e62-442a-bb2d-bd4a93552a5c	Matias	f5010fc6-0d96-433f-aa33-9eda0587072e
29bfa558-1118-4341-8190-0954f618c097	Kaarlo	f5010fc6-0d96-433f-aa33-9eda0587072e
44622324-1558-4b57-83fb-3b6ba6d1897d	Esko	f5010fc6-0d96-433f-aa33-9eda0587072e
c522fa6d-35e6-4f5f-b4ac-90d590952dba	Pyry	f5010fc6-0d96-433f-aa33-9eda0587072e
1f74912c-4d5d-44cb-aa1f-b36a73ffc24f	Eero	f5010fc6-0d96-433f-aa33-9eda0587072e
0862817d-ffa5-4439-8bb8-c5818f77d6bc	Arvo	f5010fc6-0d96-433f-aa33-9eda0587072e
8735d27d-785f-4cd8-9959-40d1bb360494	Kalle	f5010fc6-0d96-433f-aa33-9eda0587072e
0290ca35-62b2-4794-978f-4249007d98b5	Otto	f5010fc6-0d96-433f-aa33-9eda0587072e
fa89a08c-d26d-47b0-962a-58a6b91baf72	Olavi	f5010fc6-0d96-433f-aa33-9eda0587072e
ad59bbed-6193-4714-83fa-873dbf7afd69	Aleksis	f5010fc6-0d96-433f-aa33-9eda0587072e
e07b2d17-0659-416d-bc16-548b26b40769	Joel	f5010fc6-0d96-433f-aa33-9eda0587072e
abc88ff7-7b08-4197-8c64-6ef3212f0368	Eino	f5010fc6-0d96-433f-aa33-9eda0587072e
adf2a662-505f-4c06-8c5d-2a5cdd161ef3	Leo	f5010fc6-0d96-433f-aa33-9eda0587072e
d8e4241d-f7af-4f8d-85ce-aa3b44a2ffe6	Valtte	f5010fc6-0d96-433f-aa33-9eda0587072e
609de4fa-b867-41f3-b093-7001e7cdbcf6	Peetu	f5010fc6-0d96-433f-aa33-9eda0587072e
9574336d-82b6-4375-916e-2e0b71f37656	Eeti	f5010fc6-0d96-433f-aa33-9eda0587072e
7772f088-a0c6-4b21-8fa3-b759e43d2a3d	Niko	f5010fc6-0d96-433f-aa33-9eda0587072e
da07864a-da79-4201-93f7-c74839352dd0	Tinka J-F.	3e75cd57-f337-4778-acf3-7df420b17374
2816893e-1e76-415d-b098-e58c836f0b5a	Veerti	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
209058c6-2689-46b6-b6be-7f7875d4f7a7	Sulo	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
1d2dda6c-988d-411f-a3aa-187f538a9ad7	Milo	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
b465a048-77bb-4bc4-ab0c-3c13a8fb3b07	Robert	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
abf85ef8-4a05-4e27-aced-7a265e69fb6b	Joose	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
a3a9b2d7-f6d2-4816-aebe-4f3f5e895bbb	Iiro	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
8f178032-7e5b-44ff-ac80-490e5fe74a11	Juho	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
b16e43fb-d738-4256-bf4a-105a6c6a738d	Mauri	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
63afa461-4bc3-4ca3-b7c4-dd4c1562bf36	Aleksi	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
a0f109eb-11d7-4fce-92b2-de9a16c4161e	Kaapo	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
3e62f10e-cb31-4f9a-bd6b-9a12f8fa1503	Leo	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
1cdb2315-bacd-4013-8354-a22663789f99	Sebastian	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
f921d929-11c8-4413-9ba6-8358c99ccc5d	Anttu	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
b0964b67-f4d8-4510-bfd3-a2fbfaa8a264	Lukas	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
0f8c1a7a-c2dd-48eb-ab2e-b17c156d5261	Jun	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
2561e538-d279-481d-9dde-51e97f76ad5a	Luka	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
b260021c-5d5b-4598-8546-24426c2934a5	Oleg	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
7da03184-1f31-4068-8549-b0cd527d7117	Olavi	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
5044bb3e-fe9f-4c22-beaf-b30f91e6fb0b	Kosmo	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
60b7e67b-e29f-4810-9910-aaf917dfafb9	Onni	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
d4e4abf9-f753-4bc6-8fcd-dc63b3f5f82a	Veikko	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
3b63b6ed-9c36-4bdf-a84e-855f7d31ffc7	Dipal	acfe9dc5-5e1e-4302-9188-b0cb623b42ad
d9e03117-e483-4069-aef8-a841a45377ec	Maija	d49cfd99-fa09-4729-8fcd-1d1b66102c89
3a9ac052-3dec-418f-9b0a-0bda8f2e4c9e	Hannes	bb364b38-c286-46d4-9bd4-fbf13531a884
0c873abb-ead5-403f-9096-c88045eb692b	Hannes	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
a250d210-7f95-4b3a-88a9-1debe71e25d4	Eelis	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
148cab1c-f39d-4f6f-b2a6-a3ecb669586f	Enni	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
306d8ded-254d-4175-90b4-ba6cf4346ba2	Elsi	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
35db733d-965d-42ae-87fb-0af1702edf6c	Jinna	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
e7af4b57-c167-4a9f-a65b-1bbdd5d6f70c	Veera	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
998d4f0f-27c6-46d7-80c6-f80e6f1ec435	Aleksi	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
dbebbaf1-528b-4f40-b4d0-9ca69805bbdd	Totti	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
ae42a284-0701-4aef-8a45-3e806f43453e	Iida	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
41db76f2-a837-4435-a47b-afb830fdc560	Konsta	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
728671ba-3ed4-422a-ba53-13c14a3776b1	Veikko	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
36fbe971-59db-4bfe-b275-c7b66c22b684	Antti	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
e989013c-9300-49e3-a222-e17457440ce2	Noora	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
201a3f35-a04a-4a59-ad74-d1ace5d1aaed	Susanna	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
84aa7004-282f-4e61-a7a1-32e63eff4027	Katariina	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
2636dc3e-1570-47d1-a25a-d381f9dd0e05	Ilmari	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
a7b58927-350d-4192-87cf-278e28f73023	Eeli	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
f6634ebc-2da6-4040-babd-5cc42c00f474	Saara	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
d948d3cc-bd28-46db-a852-3259e32936f4	Joel R	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
eed2be00-edb7-4f51-be59-7b175268b83d	Kaisa	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
48fdf9d8-10cb-4326-a0f2-973ca6f2ea60	Elli	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
019d79c6-6604-4b6d-bd7c-9faf456dbef2	Liina	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
d933e40a-df76-4419-b593-d6c86e0d56be	Paavo	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
6436d514-4b05-4ed4-818a-fcb19e07a802	Kerttu	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
44e9c567-7ec0-470a-ad27-d67e711967d6	Otso	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
1b5607d7-0aee-485c-bbfe-22d1bf3e886b	Veikka	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
399fc7f3-b250-4a26-b555-8d4ab95703dc	Joel V	33ea6ccf-76a2-43e4-9f8b-3e365da6eb17
7d1a6caf-5fe3-4317-a185-e797b6b000ae	Hannes	0fb115d6-0135-4a01-aa83-019cbdd01cc3
145b4c83-91ae-47ca-9e91-cc1a66a36639	Eelis	0fb115d6-0135-4a01-aa83-019cbdd01cc3
4e10eb1c-a213-4b0e-b022-dace3423963e	Enni	0fb115d6-0135-4a01-aa83-019cbdd01cc3
29805757-53a0-4fe1-94bf-28cf5e2d448f	Elsi	0fb115d6-0135-4a01-aa83-019cbdd01cc3
2ea40892-153d-4bad-a2de-37645aca5b2d	Jinna	0fb115d6-0135-4a01-aa83-019cbdd01cc3
5030a567-6de6-49c7-b691-31b46561047d	Veera	0fb115d6-0135-4a01-aa83-019cbdd01cc3
63f1e71b-4f89-4eac-8ca2-001fbfe06a4c	Aleksi	0fb115d6-0135-4a01-aa83-019cbdd01cc3
0ae9c885-6d57-4ae8-ba13-6fb54ccc54b0	Totti	0fb115d6-0135-4a01-aa83-019cbdd01cc3
c34f70d1-6ac5-4722-b7cf-dcfbc09b4415	Iida	0fb115d6-0135-4a01-aa83-019cbdd01cc3
762c8ec6-699d-4967-899d-1d46176510c0	Konsta	0fb115d6-0135-4a01-aa83-019cbdd01cc3
9be010a9-864e-40c8-8ca3-88229719d44b	Veikko	0fb115d6-0135-4a01-aa83-019cbdd01cc3
22844cde-daa0-4aac-b628-1c9e58ab26eb	Antti	0fb115d6-0135-4a01-aa83-019cbdd01cc3
977d1a2d-63e4-410b-9e70-46520cb83755	Noora	0fb115d6-0135-4a01-aa83-019cbdd01cc3
0ca5ab00-50d4-4034-b2e0-4a13cae1a60f	Susanna	0fb115d6-0135-4a01-aa83-019cbdd01cc3
84b26025-b675-45dd-931f-bfb4332ecf33	Katariina	0fb115d6-0135-4a01-aa83-019cbdd01cc3
20fa312d-e016-4aec-a3be-89f42881eb58	Ilmari	0fb115d6-0135-4a01-aa83-019cbdd01cc3
f31a7a44-e65a-4807-8ca5-4aa34b336e0a	Eeli	0fb115d6-0135-4a01-aa83-019cbdd01cc3
8da4a480-ed95-48fe-b93e-0db9b288d483	Saara	0fb115d6-0135-4a01-aa83-019cbdd01cc3
45fe8201-a27f-4c03-92e7-d62b5ce3454c	Joel R	0fb115d6-0135-4a01-aa83-019cbdd01cc3
ab4784ce-750a-4259-9fca-69c81bbf0abc	Kaisa	0fb115d6-0135-4a01-aa83-019cbdd01cc3
02620da9-86ee-4f54-bae8-3f087f88ceec	Elli	0fb115d6-0135-4a01-aa83-019cbdd01cc3
1be88ea1-d5e3-4b18-8525-d421bb9e9de5	Liina	0fb115d6-0135-4a01-aa83-019cbdd01cc3
86f0304c-b40f-471b-8c74-f9ff5e74f46e	Paavo	0fb115d6-0135-4a01-aa83-019cbdd01cc3
898f72a6-27a6-47d8-a9b7-923cca5bbe94	Kerttu	0fb115d6-0135-4a01-aa83-019cbdd01cc3
9ec67e5f-3f95-443c-9874-37113ea1f5f1	Otso	0fb115d6-0135-4a01-aa83-019cbdd01cc3
82597408-2c30-4632-b221-10345686604f	Veikka	0fb115d6-0135-4a01-aa83-019cbdd01cc3
11c9cf53-3e9f-4504-88e6-1ead23482a53	Joel V	0fb115d6-0135-4a01-aa83-019cbdd01cc3
c6376f51-c190-4ef8-8a11-59e876d8e3fc	Antila Hertta	4117be07-2cdb-4d17-a14d-f6b970f78821
86a5eb2d-cb3e-45dc-978c-618bc9d876d1	Miro M.	3e75cd57-f337-4778-acf3-7df420b17374
67e3f6f7-6a9d-4042-8cd6-2b9f161215cc	Helmi T.	3e75cd57-f337-4778-acf3-7df420b17374
3ede6c29-5cbd-45e5-b35a-75d5064ba7d0	Noora A.	3e75cd57-f337-4778-acf3-7df420b17374
ebf4d506-5057-48f8-b6b6-db01a02eb113	Martta A.	3e75cd57-f337-4778-acf3-7df420b17374
2aec05ab-c5d4-4339-9e09-5ddb5a44c54b	Inga K.	3e75cd57-f337-4778-acf3-7df420b17374
ed23c72d-9cee-4e51-90f2-438f1e0ccfb0	Aamu K.	3e75cd57-f337-4778-acf3-7df420b17374
6224e1e2-a4eb-4e84-973c-4a0f81ad5321	Milla K.	3e75cd57-f337-4778-acf3-7df420b17374
f1c4be6d-6c64-4e00-9014-51502c41660c	Miitta M.	3e75cd57-f337-4778-acf3-7df420b17374
e1f492a6-3f0b-49d8-8767-b4c4df5c79bf	Ella N.	3e75cd57-f337-4778-acf3-7df420b17374
030b7a34-fc03-4e0a-b3cc-c99d160910a7	Jemina H.	3e75cd57-f337-4778-acf3-7df420b17374
4e5d96a3-13fa-43ee-8a78-aeb58d9b5bee	Edla J.	3e75cd57-f337-4778-acf3-7df420b17374
55255135-20b6-4012-8d3d-48ce730d5a02	Veera M.	3e75cd57-f337-4778-acf3-7df420b17374
37acf53d-f124-448a-a2eb-acc698907a97	Rosa S.	3e75cd57-f337-4778-acf3-7df420b17374
eaa5fba0-c488-4fb0-b148-edcf6064d844	Verona V.	3e75cd57-f337-4778-acf3-7df420b17374
7655e061-6d51-4f4a-98bb-4026d4244ccf	Avikainen Alida	4117be07-2cdb-4d17-a14d-f6b970f78821
f35edc64-2727-4f8e-b43e-e5139c0e61f4	Ballve Daniel	4117be07-2cdb-4d17-a14d-f6b970f78821
c3c3adee-5b93-4ad0-93bc-8c2ef1d6e91c	Haikara Viena	4117be07-2cdb-4d17-a14d-f6b970f78821
6fab2d6e-ec3e-4d36-bcd7-221e712af17b	Hakkarainen Atte	4117be07-2cdb-4d17-a14d-f6b970f78821
648d81d7-52c0-4c19-89f1-d5a5868c3feb	Honkasen Adalmiina	4117be07-2cdb-4d17-a14d-f6b970f78821
d619492c-a42a-489e-bdfb-9bab560d2e36	Huhtala Viljami	4117be07-2cdb-4d17-a14d-f6b970f78821
a5bfd401-f805-4023-8faf-9bef4e06107c	Isoviita Emilia	4117be07-2cdb-4d17-a14d-f6b970f78821
1a5b2121-ce9e-492e-bfaa-c0bfd1aaefaa	Kallberg Pihla	4117be07-2cdb-4d17-a14d-f6b970f78821
49166b2a-f416-4ad8-bf7b-b361d2f56e34	Karvinen Sini	4117be07-2cdb-4d17-a14d-f6b970f78821
d01fbc62-fdcf-4305-b5bc-1004d6bba3e9	Koistinen Erika	4117be07-2cdb-4d17-a14d-f6b970f78821
ce6f4446-e91c-4dd5-918e-528add94e695	Kokkonen Aada	4117be07-2cdb-4d17-a14d-f6b970f78821
848d50e7-fa9e-467f-8579-d1614e65d65f	Lahtinen Helmi	4117be07-2cdb-4d17-a14d-f6b970f78821
a0fc5e29-0b7c-45d5-9055-0902012b8c89	Mikko Virtanen	05921118-fee3-4527-ae43-518e2b92b04c
1bccfce4-b06e-4412-97e9-2497713207c1	Anna Korpela	05921118-fee3-4527-ae43-518e2b92b04c
39f34934-f654-4066-9af9-6fc6e610f986	Juha Nieminen	05921118-fee3-4527-ae43-518e2b92b04c
3ed89fa7-2a7a-46bd-b109-800b5a38a5d8	Sari Järvinen	05921118-fee3-4527-ae43-518e2b92b04c
5ab613ce-8c01-4959-bef4-4f7f328a0fcd	Pekka Lehtonen	05921118-fee3-4527-ae43-518e2b92b04c
10848b56-426e-49e5-be56-04035f1e6eae	Elina Rantanen	05921118-fee3-4527-ae43-518e2b92b04c
6d2719ab-c31d-4b1e-9e37-1a3825b93132	Joonas Hakala	05921118-fee3-4527-ae43-518e2b92b04c
54f68364-b0f3-4117-8f76-c78f6580b39c	Laura Karppinen	05921118-fee3-4527-ae43-518e2b92b04c
16fcf811-2820-41f2-92d8-a2c3051145df	Teemu Laaksonen	05921118-fee3-4527-ae43-518e2b92b04c
b0dece5c-b8fd-4197-a8a6-8571b56eb2d2	Tiina Koskinen	05921118-fee3-4527-ae43-518e2b92b04c
c409da13-5a71-44f6-bf24-1cfa1e4da99a	Sami Mäkinen	05921118-fee3-4527-ae43-518e2b92b04c
43008a91-d3df-4930-a05c-2d2ec2d66bee	Riikka Mattila	05921118-fee3-4527-ae43-518e2b92b04c
83d9e60c-8ebe-4079-a3c1-743edb327882	Antti Rautio	05921118-fee3-4527-ae43-518e2b92b04c
923a5db8-023a-43c9-b1d8-ebe62ec5d3f0	Maria Saari	05921118-fee3-4527-ae43-518e2b92b04c
1820ac8b-b6da-4377-8763-bb35a656d039	Ville Hämäläinen	05921118-fee3-4527-ae43-518e2b92b04c
2516903b-55cc-4ba4-9b1c-c968791ab7c1	Susanna Leppänen	05921118-fee3-4527-ae43-518e2b92b04c
aadbef19-7cdd-4494-aa78-eb8dbdf1bb5f	Eero Heikkinen	05921118-fee3-4527-ae43-518e2b92b04c
dc6df45d-5f28-4e6f-87ba-2282769f4119	Lius Joonas	4117be07-2cdb-4d17-a14d-f6b970f78821
adf769f3-3290-41da-a76d-a727718367fc	Lyyra Jouka	4117be07-2cdb-4d17-a14d-f6b970f78821
94f4c442-5eef-4bdd-9780-0f11f70827dc	Matikainen Senni	4117be07-2cdb-4d17-a14d-f6b970f78821
a82c6591-3e32-44ae-9cdf-4f4f0df987fc	Mäkelä Veera	4117be07-2cdb-4d17-a14d-f6b970f78821
1cab603a-4071-498c-a887-180a4767fbcc	Eronen Ella	4117be07-2cdb-4d17-a14d-f6b970f78821
a6de62cb-cb84-4485-9351-4854ae0a03e5	Kauppinen Eemil	4117be07-2cdb-4d17-a14d-f6b970f78821
5331ea66-1b37-4ddd-85bc-baae6ed32f1f	Moisio Sulo	4117be07-2cdb-4d17-a14d-f6b970f78821
45699ead-d72a-4af7-a7d2-b19918e3e728	Martta	a7449b51-02e7-4f28-a799-bbc7f7f1496d
49a57911-a010-483a-b4de-6e5c63bff047	Ilona	a7449b51-02e7-4f28-a799-bbc7f7f1496d
2dce9b39-eeea-47e1-83de-f995535b0ee4	Kaisa	a7449b51-02e7-4f28-a799-bbc7f7f1496d
00da31e5-78e8-4943-96a2-381942a65b4d	Julia	a7449b51-02e7-4f28-a799-bbc7f7f1496d
c206d8ab-ee2a-4112-ba69-2ad869063696	Iida	a7449b51-02e7-4f28-a799-bbc7f7f1496d
2fb082c2-280a-4832-bb2c-f7802483e286	Essi	a7449b51-02e7-4f28-a799-bbc7f7f1496d
e6536f66-e651-493d-a06a-73ccc7e07380	KMS	a7449b51-02e7-4f28-a799-bbc7f7f1496d
8f0bbf6f-6689-478b-a5a0-185a8346ed5d	Kevine	a7449b51-02e7-4f28-a799-bbc7f7f1496d
0e9338c4-e46e-48a8-8633-e95c416fbacb	Lui Lui	a7449b51-02e7-4f28-a799-bbc7f7f1496d
445c8ceb-e9a9-47cd-bac8-d14ebc7f1914	Aaro	a7449b51-02e7-4f28-a799-bbc7f7f1496d
d3e2a228-a155-4466-b91a-ad9f92df74d8	Verner	a7449b51-02e7-4f28-a799-bbc7f7f1496d
c70cac02-8d88-4fbd-a75a-849dc83cc1b4	Joe	a7449b51-02e7-4f28-a799-bbc7f7f1496d
07435cb6-f5d7-4579-b95e-a0067a740cc1	Ilari	a7449b51-02e7-4f28-a799-bbc7f7f1496d
e481cca6-8751-4065-96df-b66f3e91d703	Oliver	a7449b51-02e7-4f28-a799-bbc7f7f1496d
1cd4bffb-9ffa-489c-aad7-c7bc30dd323c	Lenny	a7449b51-02e7-4f28-a799-bbc7f7f1496d
6e51a926-7e18-4857-9da1-bf7a8c54b7a0	Eelis	a7449b51-02e7-4f28-a799-bbc7f7f1496d
bc054213-6ce6-47f4-af5c-cb635fb7d16c	Vitali	a7449b51-02e7-4f28-a799-bbc7f7f1496d
835d6517-e658-46f4-bd03-31ae9ce9abc8	Pekka	ef819731-2f4e-4980-9534-bec0630fee53
f0bdea44-7d36-4cc2-81ee-dd87e3ed2de2	Veikko A	a421b5e1-eb01-462e-899b-adb1b57e3b0d
6f63189e-bce0-4f8f-84d2-2335d120cecc	Olivia J.	3e75cd57-f337-4778-acf3-7df420b17374
528f5a28-f9eb-4ebe-9239-fe663d54cc13	Ella K.	3e75cd57-f337-4778-acf3-7df420b17374
aec45342-4e40-4fe5-ae8a-bbc540d5f37f	Oona H	2cba9a0f-2452-495a-9fbc-0180ea49411e
3d9b6cf8-3d7d-4999-a328-777a1d0e1932	Tero	2fddc898-f1d1-4f7d-8406-be7c3a7e261b
01e71d62-ef6a-4b7b-8eca-9cc93a6b701d	Saga	ccd44372-5947-4b45-acc4-585c5f15c338
0ea9db84-8033-4777-b8a1-651e9a7893b3	Elli	ccd44372-5947-4b45-acc4-585c5f15c338
5b4b45a7-4957-4f78-a20f-ce4552f56eef	Selma	ccd44372-5947-4b45-acc4-585c5f15c338
9a96f001-81e8-400f-b208-ea7a9661fbfc	Fiona	ccd44372-5947-4b45-acc4-585c5f15c338
e673cce8-a11d-424e-bc4e-b18213f6b064	Sofia H	ccd44372-5947-4b45-acc4-585c5f15c338
3adfff1b-7142-45a6-9419-d2bcfa98c472	Hulda	ccd44372-5947-4b45-acc4-585c5f15c338
6c0bab1f-3112-448c-b26c-ba54fe2a7834	Sara	ccd44372-5947-4b45-acc4-585c5f15c338
6674aea5-a4bc-4b1a-9928-4e1770d783fa	Daniela	ccd44372-5947-4b45-acc4-585c5f15c338
ced65c86-c2e0-4fa1-b49a-e24b1c20b57c	Alisa	ccd44372-5947-4b45-acc4-585c5f15c338
33a6559f-6fca-4fab-bb33-c3b8c331caab	Inka	ccd44372-5947-4b45-acc4-585c5f15c338
5c7333fc-5b09-4c44-819d-818d8e68cc18	Saara	ccd44372-5947-4b45-acc4-585c5f15c338
9cefd235-f6ab-4561-940c-ada01360b117	Unni	ccd44372-5947-4b45-acc4-585c5f15c338
5c4372f4-865d-498a-bb1e-846e3cbfc9fa	Peppi	ccd44372-5947-4b45-acc4-585c5f15c338
ad3c205e-1fd1-4369-a301-f1008f182b81	Sofia K	ccd44372-5947-4b45-acc4-585c5f15c338
5d237526-992b-455b-9989-54b39d93203d	Anni	ccd44372-5947-4b45-acc4-585c5f15c338
01f275c3-256a-46bd-a5c8-782d563062d3	Kerttu	ccd44372-5947-4b45-acc4-585c5f15c338
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
b174d04e-39ef-4356-a65b-cb73d9543176	artte@arwi.fi	$2a$12$adVfxaKVdhTQrUuAcGbIBulUSL5pDv0WRgwDF2W7w4DS9VdGzKXyi
68456b93-bed5-463f-b298-7b7d69c21980	su_vi96@hotmail.com	$2a$12$iIfNOMgogOvmNaBwpBqhvu5yqn9Rx0myLFxJvuxF9HuFzL1b4YInu
a9ffce62-5103-4e4a-9882-a1ac8b76cdb7	jansku.kivela@hotmail.com	$2a$12$izfzB2QfbQBOcvHIho2cfuGFqBWNt8VXEJZHsU5Jpb1nHsuUvryAW
b92091d3-63bc-4182-9716-93f7f49a1c27	Taavi_helimaki@hotmail.fi	$2a$12$2OhaDkD.n3Xn2noBf8Z3SuwY5A09S4Sp0xgRYd4DIoNKRhDneB0HK
8619ef13-7ce0-4b24-ad34-25a0c50502fa	roope.k.kastarinen@student.jyu.fi	$2a$12$hFzebiAN1Fkt7INdHe.fZ.4Gm1/xwI5MUi5/jvNY3LutmiXlrnjpS
5e82d30b-73e1-4eb3-91a5-3e8e6a1e1e76	silvro@jyu.fi	$2a$12$dN7DD11bGS3OCN3N9jKUqekBe4j5pE09WvXXy4uwm9VRQSijdhILa
246b2c10-e69f-4efe-bb88-b85b157a53a5	ale.pirinen1996@hotmail.fi	$2a$12$VOPwsJH24AdHlZzud0YKR.yFOq21f0tvkUiJ/m4wMrfZ/eRKgwUA2
eb3000c7-1f5c-4d51-84d3-92a321fee7e3	atte.luukinen@gmail.com	$2a$12$ptFrTtguUMKchfEv0afMcu4BN3cj09wddcbhS2DdQCD6d2Ela8TiS
a7935ade-dce6-4954-9616-d96d0534bd59	jalmari.karanta@gmail.com	$2a$12$gERozlwU0uUKBnKA5PqOKOzbcNTo0y82cX8Du5pLLvmy98bbXSHCi
49fdcd3d-aa2f-4c86-baec-e6c0c35665cd	karrimatti.leisimo@gmail.com	$2a$12$Q.7njV9qOFEUBnIGjqIXSuDKi4//ZXOy/3OOWe1K/a2NAIjqb5Eqa
51f117fe-e000-4e3d-ac13-7cfd1d5409c6	kia.rajakaltio@gmail.com	$2a$12$8MPgHpzWCSrICwjC0mxO1.NR0vuGF5H4wj/dyM7twfhyFjabj006G
9f926abb-96f8-4ccd-baf0-f52eead78eb3	lenni-98@hotmail.com	$2a$12$BEi/5pYDN02OGM0Bz.RLVOOX9I8nJjC5NJecmOf6MheTmRuKUqZra
bd173322-259a-474e-af00-551b843abd26	henri.tiensuu@hotmail.com	$2a$12$ORAlQe0Blvl7j/qUVzU.SegZUQiS9lecsetTQ4sk0exWjx4k.P2.i
51b0ee01-f526-4d88-bcf6-fe9f4f5f4bca	iida.pulkkanen@gmail.com	$2a$12$E4nCpiCMSznR59yMRwgWp.3faolYUgrKjuHO3iC7aiREP6P9/8ifi
b0cb2c48-123c-4c21-ad7b-d6f1a432f1e5	kalle.ojala5@gmail.com	$2a$12$iZf7mEFlnWMjKBXX5RHzJuoNgwbNbq6lQb606d4uAJEiTdApjHCFS
8e0b609f-444e-48d2-9488-dd5b468d8399	niko.hakulinen@hotmail.com	$2a$12$nbXWUvQampLXKahrCD3e4epoucltWNRzZJP6mG/HWKj2pF06aqZJi
2187d3cb-865f-41ee-8557-a908a9d19680	noora.o.n99@gmail.com	$2a$12$orP5L3jKc64S30a5jR4qQeYCuV6g59L3hmGa09z3UB2u6U.UE6HdW
9ec8ee79-0762-4208-a893-e44b5061b468	tuuli.eveliina@gmail.com	$2a$12$6V9NeV53S6xqzc/3PvJTuOoJbKdO47pdv.80Bh5r2.6D46qDRNm4e
b2f96969-d008-4fb4-9367-d1f463b33bf0	petrusturunen@gmail.com	$2a$12$7.hs2o4JJvn0ACxw6GFBIunLlnRJ/KxJKyBxvUpRER01iVPCD57cO
905f4503-4974-4298-804f-41a23d29c106	samuelgerovoi@gmail.com	$2a$12$PuIx0bakqjPiDwpCjB2j/eh2Fa6nWpbxGvYnYEgjRxxyO2zRXqtRa
cc2e0dfe-3d7a-46bb-bde6-84a627f135f8	petra.akkinen@elisanet.fi	$2a$12$.9qoaTcEohibOnOwuNfFSuNkKaQ81gz4.FV7qsRB4NMg1q6P3XAGW
9b9baaa3-ebc6-4b4a-a014-7e588e84a8f8	sara.papunen@gmail.com	$2a$12$wpwMzd3lItZcDYbI0Ko5m.lD2hETbZlGSZwaXpmHwFCh9C9aNvbl.
bd419cf9-79a0-46a1-aec9-a72403acc960	joona.luotonen@gmail.com	$2a$12$Q2AVnEteWfbM1AzwSi3Gk.L2gypZ332xwMmeHEDaR3urwCMfUsn.C
75c9c331-7658-4978-9fab-aedb00a430e9	jankke.sula@gmail.com	$2a$12$R22hyS/LPEmioL44rqU8wO7ii1WnGjsT77/NClJdvn1VDOSAtD73q
3a1486a1-98dd-44cc-8f8d-15f0e1635cf9	t4ru.partanen@gmail.com	$2a$12$8obRDynYpmQ7w3KLUwktZu9oPCBxPxsf9wSeH5NqBVdrD23nWRUTq
d7ea5704-9071-41af-b5ec-4311fc5088f3	toni.nyrhinen@gmail.com	$2a$12$/8uP1d0e3s9aAoBrzrJoFuvZBG5w0cfRRFpH/y8YajmfgpLsy1aPy
64ae9e69-39e8-43f4-9a3c-628b4c9332ea	veera18.mantynen@gmail.com	$2a$12$GMLox41el7Z.XkUN/swcDuxlzs5piJrayWbF4PAZ75gSrEBUP0xie
f0b32130-0241-4b16-ab61-e6683cddbab3	toni.rikkonen@hotmail.com	$2a$12$Kb2Eq//t38vKULnjWodrw.N6u6/oXibt48qYIJliOGqeQiLwa5tgq
39240c58-568c-4cf3-9de1-17f531f90226	jonne.saarikko@gmail.com	$2a$12$/ITgooFF.OVcbRLC4I9Ba.OQ/ZLZIe/M2mv2PDaELlTwA73iqq.my
6cca763c-2932-4340-b008-267abd27e51c	lauriarvijohannes@gmail.com	$2a$12$kwi4uS7tnaxpcTolvYDhleCQZxuEcakUIDRRYSS/.gafOe42xp5ca
898d7e61-abc9-4d1e-9bc5-3bc3a3b5727d	elli-maija@hotmail.com	$2a$12$wXPArMY5oRs2lLGvVxDJqOm614hzRLJ.Tm2IczyPqN7dn5c7t3iiK
3386ad42-5f46-49ab-ab12-fa11bb8723a5	jjk.lappi@gmail.com	$2a$12$iocMbYQaqkK.sz4/ceHJW.J7Tf98XLvqprdASSligorkpV1F1Aux.
9f62e202-600f-4452-be5e-de1c0350a622	erolainka@gmail.com	$2a$12$nY1S6PI.LEl8BxAGAAn9e.sbOHGNLLAV7fXJHnTn1VEIIySJsItNK
a7bcc47a-e782-473a-aeb1-d8b9b72578f9	elmeri.sajasalo@kolumbus.fi	$2a$12$OfgZrKaJy/hvL6xpdATFkuVhkkKVw57mOfKqBP5LAjNKh9p/xIrzK
06ace530-dac3-49c4-a804-0a61d35ac989	ainoaineslahti96@gmail.com	$2a$12$jwsPYUxgvAGTDv2LBrjwOuu46o/vF9cWQQzv74UJ4yQB..jx0Omeq
9d7305e7-6591-446f-a593-7265e800d65a	pinja.koivumaki@gmail.com	$2a$12$WpWnqbAeVgP4NKf9rWIbn.31SOz/UbdIBw89C6dxguk9cF0.viZKi
69480da5-515d-4ac1-bd6b-2de9c259a968	ronja.k.linna@gmail.com	$2a$12$omdWsMnYHWXDjGjsAErOQOvmcs9a8VtmSBKTAUyV8kK.wL.fFgS4K
755c60e1-a067-4985-9bd9-7bb29f63fac0	ihmeellinen_i@hotmail.com	$2a$12$mm.Bq620zESK1sEuh.lFE.OUS69tcVMDo5DtTWonjhXy8jWaYeNJC
03125a3a-ced3-4bba-ad60-b8f0bef67281	anttisiltovuori@gmail.com	$2a$12$qjUipvmU7Tso5aZygWvtWuDsEZcTpNmr4iMhPf7VIhtMApfdOYHW6
9eb688f1-ffe9-44a8-b4b8-e83f1ec6fc3b	koskinenvilma98@gmail.com	$2a$12$1Ol03TN.Cexy43ul.4wCX.Va.iayfKiMTPjoCMeLX8PKOLxxxzLIW
ace2434a-877e-41a1-a272-50af1c2a8960	pielhaar@jyu.fi	$2a$12$rLT2bHcdF7gb.21IPhV0Y.90/AbFMnd404doSDuZeLXc3yGYdgM.O
f43825f4-73c6-49e0-8a07-d3f7f8139263	arttu.flinck@gmail.com	$2a$12$jRV.FSIUBqFJwQYTEcROVuGkouW6FlAwzjEEJD3m9H5L6Z/VOo7.m
5ca4b120-4155-459f-acea-cbadbaf95437	anmariia.karkela@gmail.com	$2a$12$SCQLik97LUVZ2oHvmfJEiOwLOjUl/6ohm6lyVhrB792hzq5ptgpri
ca58c632-42f0-4423-9c35-338eda50c9b3	emma.jyrkinen@gmail.com	$2a$12$Lq4COJpiJaxOmwdYkMQZwuwW6Pd1t.kyLhhkICzw4j6hr7thANaEq
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
efb5a121-cf07-45c5-9c50-72f7be1fb9ff	2c42a7d7-10ee-46d8-b057-103c9d3773d9
fd028225-16dd-4d8e-8c86-a81a9d9243e5	9aaed25e-67f8-4d9d-ab09-96d4607a98a7
fd028225-16dd-4d8e-8c86-a81a9d9243e5	a56a92a5-893f-4de0-af0a-e764be900502
fd028225-16dd-4d8e-8c86-a81a9d9243e5	ae1feef0-be68-422a-8522-98700c2bd931
fd028225-16dd-4d8e-8c86-a81a9d9243e5	82cd71ff-8e57-44ab-829f-f296a2929585
fd028225-16dd-4d8e-8c86-a81a9d9243e5	892e5773-39a1-4412-84cc-c219683ca4f9
fd028225-16dd-4d8e-8c86-a81a9d9243e5	d08c6dc6-1dc2-4a86-af3c-22e920af695e
fd028225-16dd-4d8e-8c86-a81a9d9243e5	35c11fca-684d-4018-bbe6-ff17c59a80d2
fd028225-16dd-4d8e-8c86-a81a9d9243e5	e5032b31-071d-4ac1-a61e-f341a7170084
fd028225-16dd-4d8e-8c86-a81a9d9243e5	91a52f1d-e774-4925-8a10-9f5d7d7995fc
fd028225-16dd-4d8e-8c86-a81a9d9243e5	f5051172-84d5-4fbc-bca0-e4d808fa36f3
fd028225-16dd-4d8e-8c86-a81a9d9243e5	498d994f-bb8a-4e31-8451-79c4519c6541
fd028225-16dd-4d8e-8c86-a81a9d9243e5	a678e014-275a-4fc3-96dd-0d356b8b84e3
fd028225-16dd-4d8e-8c86-a81a9d9243e5	9549b80b-fa32-4340-98fb-f827e29982ee
fd028225-16dd-4d8e-8c86-a81a9d9243e5	20f182b2-d260-4286-a228-80f03a83d6d5
fd028225-16dd-4d8e-8c86-a81a9d9243e5	b71238b6-1cfd-41c1-92dd-fae83e40bea6
fd028225-16dd-4d8e-8c86-a81a9d9243e5	b5e44718-3033-432f-83a9-81edc4a14d47
fd028225-16dd-4d8e-8c86-a81a9d9243e5	df5032e6-8740-4c54-a869-03e11dab715e
fd028225-16dd-4d8e-8c86-a81a9d9243e5	d63a461f-521c-4430-8e64-c4a05a9d6114
fd028225-16dd-4d8e-8c86-a81a9d9243e5	75c425cd-2ba2-433d-a0b1-cfaca6290abd
fd028225-16dd-4d8e-8c86-a81a9d9243e5	79171cdb-2833-4e72-bbf7-504cd4304ed1
640e87de-8063-4c00-9087-c17709e34059	2113c63e-c4a7-4e49-90a6-626646c3d949
640e87de-8063-4c00-9087-c17709e34059	3eb15f99-938b-40e3-b16f-bce35248b3b8
640e87de-8063-4c00-9087-c17709e34059	f031aca9-7acb-43fa-9884-72547dac5709
640e87de-8063-4c00-9087-c17709e34059	1f12b19a-138f-4000-a576-c5dab30ec9e9
640e87de-8063-4c00-9087-c17709e34059	e0357050-7b2a-4b32-87cf-af5747b17208
640e87de-8063-4c00-9087-c17709e34059	7c8f19ba-b172-40e7-8e9b-da74d07eb54a
640e87de-8063-4c00-9087-c17709e34059	c732359d-e9bd-44c3-aa2e-bd92bfb911c2
640e87de-8063-4c00-9087-c17709e34059	d202ea60-e678-49fd-8ecc-581cad6b508c
640e87de-8063-4c00-9087-c17709e34059	0fe083de-7bae-4fc1-815e-b4ead74b6a69
640e87de-8063-4c00-9087-c17709e34059	13e7ba68-1fc6-4e4f-947a-0370f5aff61a
640e87de-8063-4c00-9087-c17709e34059	a09eec89-d6b8-4a66-b95d-356d800aaa8f
640e87de-8063-4c00-9087-c17709e34059	7a3453eb-b303-4944-9bfa-f7bfdde76864
640e87de-8063-4c00-9087-c17709e34059	9b2269f7-aba5-42f6-afab-ccfa7bc42585
640e87de-8063-4c00-9087-c17709e34059	23d41b74-018e-45f5-966c-c729188c1ca3
640e87de-8063-4c00-9087-c17709e34059	c0a2a247-d6f0-4e43-bfd7-79d01e4eb16c
640e87de-8063-4c00-9087-c17709e34059	d9ac630a-298d-422c-8d37-72fc3991857d
640e87de-8063-4c00-9087-c17709e34059	d4e6aa85-cd60-4901-bd59-413ee93a3314
640e87de-8063-4c00-9087-c17709e34059	848b881e-e506-4273-b778-61cd669267d2
b84acf3b-29a2-48a0-899c-8ea75f7920f2	689748d3-6df3-4578-ba76-9f081abb32c4
b84acf3b-29a2-48a0-899c-8ea75f7920f2	c2d546b1-48e3-45d8-a6dc-6042c118f2b8
b84acf3b-29a2-48a0-899c-8ea75f7920f2	b0fdc629-cd54-4a92-9827-472024663b28
b84acf3b-29a2-48a0-899c-8ea75f7920f2	cd357f8b-2fc9-489c-a3b2-a5850207d2d2
a6a42248-8033-4254-8b5d-ba325479414d	403d2ef2-23cd-437b-9688-43756e24a287
a6a42248-8033-4254-8b5d-ba325479414d	c71cbbc5-3ad5-4c1b-a751-616db7f95169
a6a42248-8033-4254-8b5d-ba325479414d	ac72adf3-79e8-4479-a81a-be13b2603b33
a6a42248-8033-4254-8b5d-ba325479414d	264fe413-3243-45aa-809a-0f752bce3b4a
a6a42248-8033-4254-8b5d-ba325479414d	959e8e48-e3dc-4672-b263-cb8fcb8f3057
a6a42248-8033-4254-8b5d-ba325479414d	71f99d4c-e3e1-4c88-af9f-2641131f3422
a6a42248-8033-4254-8b5d-ba325479414d	8585f583-e996-4173-acc7-e61b2992a3c3
a6a42248-8033-4254-8b5d-ba325479414d	ed8b008e-b272-4a8f-a28b-3e10943865d0
a6a42248-8033-4254-8b5d-ba325479414d	b924bdca-75a4-4049-978c-22b6d57a75ed
a6a42248-8033-4254-8b5d-ba325479414d	3ff48490-fb0c-4328-8b8e-010efa10de13
a6a42248-8033-4254-8b5d-ba325479414d	476293ef-adda-4c53-9a52-f977cb79d14e
a6a42248-8033-4254-8b5d-ba325479414d	394795ec-5959-4d19-9ee5-362213b77dee
a6a42248-8033-4254-8b5d-ba325479414d	05d139e2-1d0d-44d0-9d55-8640833f9067
a6a42248-8033-4254-8b5d-ba325479414d	fe65a7a8-1054-4dce-a078-47e176bca0d3
a6a42248-8033-4254-8b5d-ba325479414d	89864582-b6ce-4434-97ee-14767b35e1d0
a6a42248-8033-4254-8b5d-ba325479414d	53394cde-fdca-44d6-bae2-9c928f2f23a0
a6a42248-8033-4254-8b5d-ba325479414d	fb382ba6-005a-42a0-9882-9735de457bc0
a6a42248-8033-4254-8b5d-ba325479414d	1d0f2b30-e376-4890-86af-e2585b65ee33
a6a42248-8033-4254-8b5d-ba325479414d	b7be5ecd-cc80-443f-8a6a-8125c91da527
a6a42248-8033-4254-8b5d-ba325479414d	8fc516e0-c5ba-4181-a5cd-01f85629b4ac
a6a42248-8033-4254-8b5d-ba325479414d	1199e08d-681c-4104-b883-89ebd887d53e
a6a42248-8033-4254-8b5d-ba325479414d	41dbd3de-0883-454d-baaf-7613476052f3
a6a42248-8033-4254-8b5d-ba325479414d	5092be97-7e39-4aa6-bd2a-a517b48ff540
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	03397f36-f253-476a-a333-556ae179dbda
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	8a429230-9011-476a-9f6f-15494ecf57f2
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	4e00db97-fd93-416f-a349-655a240056ae
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	1aa8b618-de8a-4a56-b1ef-33ea240f027b
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	8cb49f42-d3d0-4a6a-9ac1-9569aed4991f
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	f18a8f1a-a17a-49da-8cc1-3603b4c21dc8
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	28e533c4-faf3-4e9f-ac97-ea948c1b019a
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	e0c8876f-57f1-43dc-9950-3851d82380fe
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	16530cbd-5612-4a8c-920c-9744e32be7bc
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	02ea3a66-aa4a-420a-9334-f2b0941c564b
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	b03cc979-7da3-4d75-b187-943264397b04
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	5e5f9c60-1c5e-43f6-97ff-6e6144ecf55f
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	775a7c76-dc4a-4849-baf1-d7f9080eaf89
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	1dd2a92e-8754-4265-884f-db0a12b6a4c8
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	db1510ed-3bb6-4856-8ea9-5012eeb68192
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	0eba0b59-1564-4d93-a65c-d5aa57c2ba93
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	cfea9e73-0c9f-433f-909a-a088c3931b8f
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	e34d25fc-b0e2-48f1-8d86-77ce7464822e
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	05795f8f-d6de-4ec8-88fc-0df98df77292
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	dccdded4-f3c3-4949-937a-cfd65fae056d
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	ffb872b2-2bb5-4267-8e92-0514977ba44b
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	e7eb8c8a-033d-416a-848a-6da0d65cbf8e
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	241042e2-7fa6-413a-a501-ab6c28dd86e7
31169d42-b6c4-485c-8ced-f3fca6fe9ea9	de0b5abf-b8c5-4046-aaf7-f9bffc544ca4
11455bcc-2381-45d9-aeac-ad4bb321eab9	77457577-1ab9-4dbb-8065-2ab12ece1a84
999be80c-ff15-4515-ba2d-3f330319b986	5e0e74f1-308a-4c20-bf9a-5011dff427d1
999be80c-ff15-4515-ba2d-3f330319b986	c5a69235-e2da-483a-b4d4-898fe3bd4c75
999be80c-ff15-4515-ba2d-3f330319b986	5f877b5d-eaeb-404c-b3cc-d51a467fa428
999be80c-ff15-4515-ba2d-3f330319b986	634c3f80-8b4f-4c38-ac4e-937418ec9e8d
999be80c-ff15-4515-ba2d-3f330319b986	74744cbc-e78c-48df-b758-713f9a81751e
999be80c-ff15-4515-ba2d-3f330319b986	fa71c8f8-45c8-4a24-b0fb-6a0ecd67af3c
999be80c-ff15-4515-ba2d-3f330319b986	b0aa13eb-dd72-4d41-9158-63ed22b2f65b
999be80c-ff15-4515-ba2d-3f330319b986	5ce6b918-bcba-4712-98c1-d891eec91168
999be80c-ff15-4515-ba2d-3f330319b986	a2216f2c-6ade-4f5a-a8c5-515f09bd4b08
999be80c-ff15-4515-ba2d-3f330319b986	904493af-2f99-494c-8b42-5ebe4c1ae1b6
999be80c-ff15-4515-ba2d-3f330319b986	db8905a7-084f-4d92-af60-cf29824dabe7
999be80c-ff15-4515-ba2d-3f330319b986	50d7ab1f-3cf2-4e10-9286-36df63a6e81b
999be80c-ff15-4515-ba2d-3f330319b986	b580b35d-10c3-4ce3-9f87-37ce3a436eaf
999be80c-ff15-4515-ba2d-3f330319b986	bf09f310-3700-49db-b3f3-384cd041e6f2
999be80c-ff15-4515-ba2d-3f330319b986	7df2a50b-b064-49a7-a5d5-747b117f107c
999be80c-ff15-4515-ba2d-3f330319b986	fe5ede8f-8290-4b69-b575-75aeaab46f2f
999be80c-ff15-4515-ba2d-3f330319b986	f034aa91-48ff-496e-b25b-9c81eaaaa3e3
999be80c-ff15-4515-ba2d-3f330319b986	7756327f-59aa-40f9-aa95-88889e4ea759
999be80c-ff15-4515-ba2d-3f330319b986	fcabdea5-1224-442b-8142-62be862508e3
999be80c-ff15-4515-ba2d-3f330319b986	c80a1da2-c657-4a2d-8ee3-55eaa6a3b1f9
999be80c-ff15-4515-ba2d-3f330319b986	eb6a2d6e-33a5-4ad2-95ea-a39741e9b905
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	f4df5072-2986-4859-a7cc-6d06a6fe21ad
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	1e7d2903-2e91-4fca-b77f-211821ad0b07
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	3cd7167d-e20f-4291-9e18-5241b854e116
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	db6b1a3f-e485-4b8f-8a25-0a8e518a2026
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	52c3b46f-5204-40ad-9150-17b0a7077eed
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	d0c101ca-4d6b-43c2-beb1-a4680f44dd5a
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	77793959-dc53-44d1-8cd5-ddbe3c4b25a4
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	7e447ce6-5569-47f0-9000-20ae93a68bd3
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	0025a5a3-6947-4d23-b100-bcd5a58c6e09
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	95db6c22-a14c-4f47-b6c3-5ddffdbd933f
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	2abacf8c-b973-4678-9504-e30861fdcba5
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	971b8500-6c50-4f89-ab1e-f5219ccdef93
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	e111c54d-9b2e-406b-aab4-e61fe921dbe2
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	a3be9480-89da-4490-aad6-4507acd56e6c
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	0d894576-e308-4a66-a809-d8530eb5753e
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	8730fbfe-4cab-41db-8b7d-a750e3448184
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	bdbdbd45-458b-41df-ba2f-ab5e4406bb26
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	e0562708-15b5-478a-8f5a-1863c55a6f38
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	7ac64248-1e14-4e88-ab15-a9a552d3811c
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	c695adc1-a07a-4ebf-b99f-9714e4ab4bf7
c9e8ca9f-fd68-4505-b112-1cc21aeb8b7e	5e4779f0-fad2-4f94-b350-e56b4c5f5471
cf7246cc-5760-499a-9252-c3d1bbcc79e8	9f715b18-4cd7-48ac-b927-f43f7c166538
cf7246cc-5760-499a-9252-c3d1bbcc79e8	fa187771-3d5e-4cb5-81eb-342568b7e833
cf7246cc-5760-499a-9252-c3d1bbcc79e8	69c689de-b305-43a9-a6e8-c65382e4e476
cf7246cc-5760-499a-9252-c3d1bbcc79e8	918413c4-6838-4a64-b031-6d026f3ce183
cf7246cc-5760-499a-9252-c3d1bbcc79e8	4ac1e1d2-cafe-4171-a02a-773ae38292c9
cf7246cc-5760-499a-9252-c3d1bbcc79e8	d2430900-d731-43d5-ae88-a0166a7cfdde
cf7246cc-5760-499a-9252-c3d1bbcc79e8	288da2c9-c807-4e5f-9f49-507f1cabc93e
cf7246cc-5760-499a-9252-c3d1bbcc79e8	d2bb5704-bed1-47cc-8879-681b17da4686
cf7246cc-5760-499a-9252-c3d1bbcc79e8	a5fcc76a-56b1-4ed8-ba9d-5d62e20510d7
cf7246cc-5760-499a-9252-c3d1bbcc79e8	d3433aa4-3325-4b9d-8d15-c4ebfdc7533b
cf7246cc-5760-499a-9252-c3d1bbcc79e8	31a2c199-fb37-4e7c-afb7-2619cc4f8260
cf7246cc-5760-499a-9252-c3d1bbcc79e8	a29cc6ca-adec-4a7e-8b7b-3a6261a709be
cf7246cc-5760-499a-9252-c3d1bbcc79e8	36f9a75d-23d0-4a2c-b6c0-e04cee9b1e26
cf7246cc-5760-499a-9252-c3d1bbcc79e8	cf94a62d-ef7c-448b-9f61-16a9c6b90911
cf7246cc-5760-499a-9252-c3d1bbcc79e8	f3d70376-e85f-44c5-ae21-9c138e6c1663
cf7246cc-5760-499a-9252-c3d1bbcc79e8	cd2ac37f-bba5-4131-8a91-20280bb9b26c
cf7246cc-5760-499a-9252-c3d1bbcc79e8	aaf7140c-7da3-4882-b2a2-99b19054b43c
cf7246cc-5760-499a-9252-c3d1bbcc79e8	c177824f-0392-45e8-a26b-95cd21f3bbdb
cf7246cc-5760-499a-9252-c3d1bbcc79e8	de688b84-f770-47b6-9e15-3224c355d563
cf7246cc-5760-499a-9252-c3d1bbcc79e8	25567d61-dd6a-4b36-a934-5f6894070674
cf7246cc-5760-499a-9252-c3d1bbcc79e8	e1ee0c51-198d-441c-a0e3-cce4c418d122
cf7246cc-5760-499a-9252-c3d1bbcc79e8	1f768e05-8228-4b44-9288-7eae6b5b4686
f6160571-beff-4c21-b3af-399f376429ae	3cb1e21e-1338-4fac-8380-c69946fc26c6
f6160571-beff-4c21-b3af-399f376429ae	6edb9c7d-338c-42b3-8bed-95c037398e1d
f6160571-beff-4c21-b3af-399f376429ae	e1ceb28e-8139-41aa-bf55-3ef379c568ab
f6160571-beff-4c21-b3af-399f376429ae	5de52dab-1765-4acf-8020-053b68336487
f6160571-beff-4c21-b3af-399f376429ae	72a94026-88ad-4cbb-b1e4-e6aa917db696
f6160571-beff-4c21-b3af-399f376429ae	9fc6c35d-b42d-4594-a960-5836531c7282
f6160571-beff-4c21-b3af-399f376429ae	268e1a31-5cba-4861-8aae-7d38fb140f13
f6160571-beff-4c21-b3af-399f376429ae	189e5ac6-f54b-4b10-ae14-ff92e63c3e5f
f6160571-beff-4c21-b3af-399f376429ae	0b357c38-9cda-428a-8a3b-0254143564df
f6160571-beff-4c21-b3af-399f376429ae	39e44baf-d5a4-4a7b-85ba-8d9ef3dd9567
f6160571-beff-4c21-b3af-399f376429ae	7ebec83f-f17b-4770-a9af-ea290f26e168
f6160571-beff-4c21-b3af-399f376429ae	40a52df7-f50b-4105-b4d2-00e0b391156b
f6160571-beff-4c21-b3af-399f376429ae	e2500f5c-1aea-4ffe-9f18-9b86022fce62
f6160571-beff-4c21-b3af-399f376429ae	92214907-4fe9-442f-9f35-c7b59f78e08a
f6160571-beff-4c21-b3af-399f376429ae	76d7ba34-af4d-41e0-934a-63461dc3aeac
f6160571-beff-4c21-b3af-399f376429ae	33ce32f8-0ac8-47f6-a2a9-f5aa880442f4
f6160571-beff-4c21-b3af-399f376429ae	9c95ce1a-b395-4179-9558-10abb9105fd0
f6160571-beff-4c21-b3af-399f376429ae	0de6a87e-13a1-4713-988d-655e950c9fea
f6160571-beff-4c21-b3af-399f376429ae	e3e017a1-6c30-4320-8ccf-3b2b276e8128
f6160571-beff-4c21-b3af-399f376429ae	18ccbf25-0831-40e9-9145-602b9d17ed2c
f6160571-beff-4c21-b3af-399f376429ae	01ab146e-d9da-4562-a7dc-f3d151d4992b
7bfd943e-c11d-458c-a010-48c84b8a6a43	ce193ad9-d314-4c7f-bdb6-908585b7fad0
61dc37a4-b86f-4563-8fca-37aad69a1f05	789cb197-e7fc-43dc-b4bf-99fa339f92b4
61dc37a4-b86f-4563-8fca-37aad69a1f05	f30953fb-1f87-41c5-b6f1-b9dbc28825ed
61dc37a4-b86f-4563-8fca-37aad69a1f05	9573f6aa-4bd6-4bf6-b320-1ee6b5ba8edb
61dc37a4-b86f-4563-8fca-37aad69a1f05	abb97912-4c5e-4cec-b3e7-d1d840be7e81
61dc37a4-b86f-4563-8fca-37aad69a1f05	e8b17234-4ce5-4c04-9507-ef785e100d73
61dc37a4-b86f-4563-8fca-37aad69a1f05	d8d038a9-73b4-4ae5-8a92-88ed3edde4fe
61dc37a4-b86f-4563-8fca-37aad69a1f05	1242a7b5-d53d-4cd5-ae38-f65402ecf98d
61dc37a4-b86f-4563-8fca-37aad69a1f05	eb053966-13fe-4afb-996f-d6646db325e4
61dc37a4-b86f-4563-8fca-37aad69a1f05	7993aaf7-401e-4bef-b8c2-185aefd95344
61dc37a4-b86f-4563-8fca-37aad69a1f05	f510b335-8874-49a7-b7a5-e0e1c68bf05c
61dc37a4-b86f-4563-8fca-37aad69a1f05	0bd6f7ee-7d70-4a7b-9342-0e0d7b6548f7
61dc37a4-b86f-4563-8fca-37aad69a1f05	da006afb-aec4-4638-91e8-81bab1da0a69
61dc37a4-b86f-4563-8fca-37aad69a1f05	51954512-0767-4d9d-b15b-439329a27094
61dc37a4-b86f-4563-8fca-37aad69a1f05	deca6386-deb7-4ce1-a697-d43c08ebe017
45982a54-e42c-4e48-8b84-32689d592abd	3b6d04be-cd10-4e54-b5aa-28a67e8e2186
45982a54-e42c-4e48-8b84-32689d592abd	a8df8354-0125-404f-a1d8-5584462a5b82
45982a54-e42c-4e48-8b84-32689d592abd	ec51a182-bf8d-436e-8704-b2d5cd897604
45982a54-e42c-4e48-8b84-32689d592abd	c08c69f9-ef26-4f6a-95ee-455d176dfa61
45982a54-e42c-4e48-8b84-32689d592abd	4d9888c7-3be7-4fec-a5d7-07759cdff766
45982a54-e42c-4e48-8b84-32689d592abd	e6537a2f-233d-4b11-8f1b-5a0814a675c0
45982a54-e42c-4e48-8b84-32689d592abd	8c057200-e725-4e08-b93c-88bd891fe862
45982a54-e42c-4e48-8b84-32689d592abd	436f9966-c204-4794-89fa-e5e1a30b6247
45982a54-e42c-4e48-8b84-32689d592abd	5c10a0b2-145a-4701-a64c-80a9369890a3
45982a54-e42c-4e48-8b84-32689d592abd	e17db94c-c058-4163-b1df-3824f2f732b8
45982a54-e42c-4e48-8b84-32689d592abd	92eecb4d-b8c2-43ce-ac29-eb7a46566311
45982a54-e42c-4e48-8b84-32689d592abd	ad4248b3-989a-4794-844e-af4cb598a1e7
45982a54-e42c-4e48-8b84-32689d592abd	1a420969-4c65-4a34-bdc2-80e13ed51f0b
45982a54-e42c-4e48-8b84-32689d592abd	139ee728-7bd5-4ed5-b88e-65e455770b9f
45982a54-e42c-4e48-8b84-32689d592abd	61780abd-03a9-4ce4-89cc-059b5a2f5177
45982a54-e42c-4e48-8b84-32689d592abd	6e24ea61-532f-452b-865d-b67df86c48c4
45982a54-e42c-4e48-8b84-32689d592abd	6f8a2928-32c2-4e60-9c99-b8073fcd9d35
45982a54-e42c-4e48-8b84-32689d592abd	48f6a291-18c4-4349-8578-e9d40a016f99
45982a54-e42c-4e48-8b84-32689d592abd	d1c1ad1a-62d0-4d6b-bf48-2dead02ed1f6
45982a54-e42c-4e48-8b84-32689d592abd	28bf177a-d273-4b22-963c-4206fcffa9cf
b6a7dc4a-0717-4b80-a18e-39651d41c5a4	f5bddcf1-a27d-45e3-8822-d06a860511da
999be80c-ff15-4515-ba2d-3f330319b986	8d17fa6e-0f31-4356-b76c-428b979d263d
f6160571-beff-4c21-b3af-399f376429ae	20ecb99e-8262-4a44-944f-00642e085fab
fd028225-16dd-4d8e-8c86-a81a9d9243e5	28948e5b-d16f-4720-8387-92541786db50
9b7eb5b0-ddfe-4af4-94d5-53bb36f98117	0b2dacea-aac1-4485-943c-4a547772b19e
9b7eb5b0-ddfe-4af4-94d5-53bb36f98117	2ed20be8-dff1-4288-b134-c5464a62a71a
9b7eb5b0-ddfe-4af4-94d5-53bb36f98117	1ddb42c2-6724-47fa-9de8-cb38d2a23d63
c27efea4-643a-4cdc-9c40-e58525a49720	33460758-511d-4f77-b17e-405a2427b733
c27efea4-643a-4cdc-9c40-e58525a49720	39c0a18f-7107-4c0d-8108-b9829dcb7451
c27efea4-643a-4cdc-9c40-e58525a49720	fb55d701-d27f-4ecd-a5ac-e4a1eb439afc
c27efea4-643a-4cdc-9c40-e58525a49720	c6cff715-fd29-4442-b5ca-7874a7815566
8ffe45c2-e5a4-4702-89d4-2df665869687	f71fab39-54cc-44ea-b9fd-2b4cea23aaea
8ffe45c2-e5a4-4702-89d4-2df665869687	1bfba8d7-258c-400c-be9b-e8bc391bb98a
8ffe45c2-e5a4-4702-89d4-2df665869687	1dba0411-e9c0-4fc0-a546-4b3b0b6e0d7c
8ffe45c2-e5a4-4702-89d4-2df665869687	8a881aaf-8159-4745-ae81-31760bf6a53c
8ffe45c2-e5a4-4702-89d4-2df665869687	19e1dc4a-356f-4eb6-ac1e-f81f0561db71
8ffe45c2-e5a4-4702-89d4-2df665869687	368b58cc-6d2b-4b27-a7ce-c6df69b4b29d
8ffe45c2-e5a4-4702-89d4-2df665869687	3644e4a4-3155-40a9-aa52-bae1461f8676
e3aba1ba-865b-4174-b776-b5936ab840d3	1d5babbc-5045-4ded-b39c-52920bc7f82c
bb17b295-c660-46a1-bfa1-7c299d3b0a57	c44a70c5-42c4-4e68-8523-77d04ac76e3a
bb17b295-c660-46a1-bfa1-7c299d3b0a57	2093feb1-589c-45e4-8551-4425364f1a6e
bb17b295-c660-46a1-bfa1-7c299d3b0a57	e25a6a80-8f21-4eab-8b69-beb1243eaa1a
bb17b295-c660-46a1-bfa1-7c299d3b0a57	d3579ab2-98d2-4ca7-a15a-50296e003dd1
8ffe45c2-e5a4-4702-89d4-2df665869687	06b4fa3d-58c5-4e1b-820a-ca7af5b69d19
8ffe45c2-e5a4-4702-89d4-2df665869687	921a2286-9887-4072-8ea5-1c7ee77aac0f
8ffe45c2-e5a4-4702-89d4-2df665869687	3c7ae401-4032-492c-9421-acfdbedf161f
e3aba1ba-865b-4174-b776-b5936ab840d3	5bc4a788-a515-4012-82de-88f027654e1b
e3aba1ba-865b-4174-b776-b5936ab840d3	b7ef4d3e-a79a-4a57-901e-0d51c7947a1d
3d9e5620-5258-4bb0-b561-5942790e6f0d	ff8713c7-f2a8-405a-8c15-0d7b861ec206
3d9e5620-5258-4bb0-b561-5942790e6f0d	52d44ce9-e882-4c35-9718-76d9df228c7f
3d9e5620-5258-4bb0-b561-5942790e6f0d	7590ae59-6d53-410b-a4de-7f2441a8da1b
3d9e5620-5258-4bb0-b561-5942790e6f0d	817cafbc-bd78-4c9b-adce-ae31e7cf1265
3d9e5620-5258-4bb0-b561-5942790e6f0d	88ec603a-0841-4613-acee-9c2d7d717028
3d9e5620-5258-4bb0-b561-5942790e6f0d	018faa61-3914-4905-bd1f-5bb8cb344681
3d9e5620-5258-4bb0-b561-5942790e6f0d	68c7c9a0-3cee-4753-924f-0386ad8aa70d
3d9e5620-5258-4bb0-b561-5942790e6f0d	2dbf7f68-f8b1-4f8d-bad3-14d6359cfb2d
3d9e5620-5258-4bb0-b561-5942790e6f0d	494ff9fa-f752-48ce-85af-194d97ef84cb
3d9e5620-5258-4bb0-b561-5942790e6f0d	93342c3d-0726-4229-b124-877fbf815835
3d9e5620-5258-4bb0-b561-5942790e6f0d	156d8717-f98b-4412-8b34-94861626037d
3d9e5620-5258-4bb0-b561-5942790e6f0d	dc71afc6-19d2-40b8-9839-0f71bc07096c
3d9e5620-5258-4bb0-b561-5942790e6f0d	f4c4f80f-a24c-4f54-bf35-fdc1a814d176
3d9e5620-5258-4bb0-b561-5942790e6f0d	1896f4c1-d958-4116-a001-441610ec320c
3d9e5620-5258-4bb0-b561-5942790e6f0d	aded70f6-1486-444c-8bfb-1d90c95b7fc6
3d9e5620-5258-4bb0-b561-5942790e6f0d	1f0d3e95-5f2a-4817-a31a-8f43a6e79ac7
6f377d70-cfec-45c3-aabb-c41bdedaa327	73f03e4f-8b55-4142-b087-ca4ee1eff895
6f377d70-cfec-45c3-aabb-c41bdedaa327	36b348ce-52b7-4eb4-bd76-baffbf5d115f
6f377d70-cfec-45c3-aabb-c41bdedaa327	e2ecf55f-a86e-42a3-a3a6-4fe343a72714
6f377d70-cfec-45c3-aabb-c41bdedaa327	82730f97-2ae0-4d3a-837f-5240a2f2c2a6
0736c55e-a30f-468d-ac92-011155f63782	82a750ba-35a8-4a53-bba8-6c67041d8ef9
0736c55e-a30f-468d-ac92-011155f63782	4ce5b44e-70c7-44ca-bef9-0f58bd4c4066
0736c55e-a30f-468d-ac92-011155f63782	f65f351a-ef4b-4e1c-adad-e922ffc3cb6c
0736c55e-a30f-468d-ac92-011155f63782	a8b26b54-ac8b-4413-90e4-a0e93cb445c0
0736c55e-a30f-468d-ac92-011155f63782	7b6a128e-3218-41e0-b08e-f1de59a25ec6
0736c55e-a30f-468d-ac92-011155f63782	5603622d-f94e-43f9-bd63-f3db770d63e8
0736c55e-a30f-468d-ac92-011155f63782	0af63b5a-f6d8-4a96-bf25-48edf23cced6
9b8adc7f-39c7-4925-847a-818b9389c18b	803a949e-0590-4a68-8c52-b6eefd6e3d29
07ad7d5a-6bde-4c10-b4af-70932def7817	83cc247a-c0a8-4725-8d9c-711473a68009
fc400672-2a2e-44b1-966b-d887bb7d1f40	18f3169d-e9b8-4853-9a86-ca751a88cdc9
fc400672-2a2e-44b1-966b-d887bb7d1f40	e73686ce-bcea-4b2a-bc63-aae356311ac4
fc400672-2a2e-44b1-966b-d887bb7d1f40	8d7f13ef-7847-4d41-aff7-d0bc70fcf797
fc400672-2a2e-44b1-966b-d887bb7d1f40	57aefd40-c100-4ecb-9d57-998ae10249de
fc400672-2a2e-44b1-966b-d887bb7d1f40	11575e9b-f03b-475b-b91f-d603a3736412
fc400672-2a2e-44b1-966b-d887bb7d1f40	66b45f46-15a3-45d1-ba38-0dab4c7d4acb
fc400672-2a2e-44b1-966b-d887bb7d1f40	637a9688-3c94-42f0-aeba-65bc859d4ddc
fc400672-2a2e-44b1-966b-d887bb7d1f40	550ee65e-9c0b-43ef-bf36-e3d86ef613d0
fc400672-2a2e-44b1-966b-d887bb7d1f40	100ba60e-fd34-415a-a458-552400f75ef3
a153dc01-0752-4f56-9501-8fc52ba97f0b	5826af21-2a2d-4469-84d6-00489384e244
a153dc01-0752-4f56-9501-8fc52ba97f0b	c4bd1fb9-e546-4232-ab32-af6b7c5cf8ea
a153dc01-0752-4f56-9501-8fc52ba97f0b	1b166df8-ff7f-41bd-873f-8cfde41120c5
a153dc01-0752-4f56-9501-8fc52ba97f0b	754b7f19-e695-429d-bed1-46aab0b80e1c
a153dc01-0752-4f56-9501-8fc52ba97f0b	98fa0eb9-3fe2-4ace-af2a-fec217e69752
a153dc01-0752-4f56-9501-8fc52ba97f0b	56dd6659-5c6a-4cb6-9624-8a67f610bb2c
a153dc01-0752-4f56-9501-8fc52ba97f0b	bc8d055a-f914-4b59-906c-f78b145b2aa3
a153dc01-0752-4f56-9501-8fc52ba97f0b	1a533d71-5f46-45ad-8d33-042e309031e7
a153dc01-0752-4f56-9501-8fc52ba97f0b	35e924bb-5995-485f-93d5-b178dbc06511
a153dc01-0752-4f56-9501-8fc52ba97f0b	88352b90-69f8-48f3-bc89-640cff5ae4b1
a153dc01-0752-4f56-9501-8fc52ba97f0b	08a7431c-990e-4d04-a85a-cddb3d6a50e6
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	2f6620f6-5a34-4be0-a94b-f0b1463687d8
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	cbc945da-3ffb-45fb-9392-febb6dace205
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	bafa760d-85bd-4abd-a915-8f168cd9fcc3
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	38d8b67b-b1fa-4109-9abc-973a8ab9a84c
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	42d209d8-92ac-4f35-b789-f63f21142169
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	a4465d66-f0e8-4b22-845b-be41355cbdc0
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	ab22ae23-0efe-46d6-968d-e2b6711d1a87
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	a11d93c5-501b-4450-b7e3-935395239f80
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	75382621-eef4-4e85-bc0a-e988b906eb97
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	f8513393-8371-4e09-b5e9-66d53a992253
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	9056b851-29b1-4618-9f9f-6de7cbf445d1
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	c06cee5b-023d-4288-b21b-d9ca5577dfc8
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	9c19cd28-20bc-4c45-96fb-0d93396be790
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	83148628-1263-4fbe-9629-51aab83b598d
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	f57eaf58-4be6-465d-bee0-1c73c5308e94
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	a519e6c1-545a-4ded-abba-b2081cbf1990
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	742470ca-1ade-473f-a662-e86b4d46fd06
f5b7f191-2b9f-4606-b7f4-69f2fab61d6d	8a300fda-6923-40eb-8109-1eeeddfa6c9d
d872e1e1-07ed-4fe7-b285-f11e407754c7	85177c4d-7db2-49a6-bdad-68a528cf112a
d872e1e1-07ed-4fe7-b285-f11e407754c7	fcfaac7e-a6f4-41d5-9866-c9495aaf4161
d872e1e1-07ed-4fe7-b285-f11e407754c7	4a8b8ecd-75fe-4ae3-a869-f09063a6770a
d872e1e1-07ed-4fe7-b285-f11e407754c7	615f7448-1b41-4ed3-879b-2bb3d5043cfe
d872e1e1-07ed-4fe7-b285-f11e407754c7	d94665be-b668-4c42-8c9e-5bdef501b832
d872e1e1-07ed-4fe7-b285-f11e407754c7	884de3a6-f689-423a-aaef-d7b34cb5c9d4
d872e1e1-07ed-4fe7-b285-f11e407754c7	9e572ef0-8ceb-40c4-b2f8-04c9dd988432
d872e1e1-07ed-4fe7-b285-f11e407754c7	a620ae00-156e-48f0-9067-9edb21e5b746
d872e1e1-07ed-4fe7-b285-f11e407754c7	c4421b10-1a79-4f11-a1be-50efaf377673
d872e1e1-07ed-4fe7-b285-f11e407754c7	cb46f328-5e29-4df0-932e-5829eef3786f
d872e1e1-07ed-4fe7-b285-f11e407754c7	ea46af04-d0c5-4d32-9ac4-6a31c848514c
d872e1e1-07ed-4fe7-b285-f11e407754c7	8413e666-efc7-426e-a147-b27040cffe46
d872e1e1-07ed-4fe7-b285-f11e407754c7	4b1dd29d-5953-40b2-b0c7-abd8ea728ab6
d872e1e1-07ed-4fe7-b285-f11e407754c7	272f6dea-2e4e-48f4-89d0-d2e35ccae1b4
d77b1c6d-e41d-420f-8f22-e8494af72bcf	5a6e87d7-5c81-4364-b0b9-c34b973ce86b
d77b1c6d-e41d-420f-8f22-e8494af72bcf	dddee3d7-88f2-4111-92ed-1d1b2d964c82
d77b1c6d-e41d-420f-8f22-e8494af72bcf	f05a57de-566b-426c-aed1-4105d73e4da4
d77b1c6d-e41d-420f-8f22-e8494af72bcf	31b293cd-259f-4f1e-82be-b7dec7756a06
d77b1c6d-e41d-420f-8f22-e8494af72bcf	dcf4c142-a227-4867-9a9a-787d58afe6c7
d77b1c6d-e41d-420f-8f22-e8494af72bcf	c7b9b89a-40d6-4909-911b-c5be073987a6
d77b1c6d-e41d-420f-8f22-e8494af72bcf	8b20ba89-0fab-4cb8-a1f6-89de0bd71d99
d77b1c6d-e41d-420f-8f22-e8494af72bcf	695db218-3ccd-41dd-a54a-5289cc4eee37
d77b1c6d-e41d-420f-8f22-e8494af72bcf	bb0cb981-956c-4a19-991e-0d933b55e675
d77b1c6d-e41d-420f-8f22-e8494af72bcf	28af6b29-9f23-4c7f-b46b-a8408be92a5f
d77b1c6d-e41d-420f-8f22-e8494af72bcf	6e177d09-aed6-416f-840f-a0347350b5c4
d77b1c6d-e41d-420f-8f22-e8494af72bcf	c1980116-b8a9-42cd-848b-4af50d00186d
d77b1c6d-e41d-420f-8f22-e8494af72bcf	4f144e23-d7d8-40a1-ad55-6aa8985b0fe5
d77b1c6d-e41d-420f-8f22-e8494af72bcf	e4777d3b-9943-4a95-8236-c32cdc374cb4
d77b1c6d-e41d-420f-8f22-e8494af72bcf	3181ad2a-a49d-408a-a083-2c0624c7101b
d77b1c6d-e41d-420f-8f22-e8494af72bcf	7019d6bf-4771-4142-a1eb-0aa80c6f5869
d77b1c6d-e41d-420f-8f22-e8494af72bcf	b853620d-d401-4c16-a31b-e3f0eff48bcf
f3845ff7-d477-4acd-b451-31db79a8c7b1	c71ded06-600b-41c7-b05d-4682bd21000e
f3845ff7-d477-4acd-b451-31db79a8c7b1	7c6f1701-b9e0-4360-a53b-261e34966146
04402773-b275-48b2-83f5-0758c257167b	9904ff7c-c03b-4b9b-b2dc-abeeff226e59
04402773-b275-48b2-83f5-0758c257167b	4ba5b49a-48dc-4b5c-b69d-5d5c835ec7a8
04402773-b275-48b2-83f5-0758c257167b	68b089f0-8c8d-4a6c-9c5a-19273c9593ab
04402773-b275-48b2-83f5-0758c257167b	efeeda80-28f4-49aa-80ba-4a10caedc06a
f3845ff7-d477-4acd-b451-31db79a8c7b1	f6277a9b-3cdb-4745-9a3d-1423e2d7164c
587a6af4-afdd-4bf5-90a9-04bcadbb4807	85f1f74e-9777-42f4-b12e-e855414773a3
587a6af4-afdd-4bf5-90a9-04bcadbb4807	23d381a8-9079-4422-87ea-0fda6011af7e
587a6af4-afdd-4bf5-90a9-04bcadbb4807	c60de93a-3791-4cfa-b4aa-6bd0daf58139
587a6af4-afdd-4bf5-90a9-04bcadbb4807	09ff1263-379f-43a0-a353-8f68895203f5
587a6af4-afdd-4bf5-90a9-04bcadbb4807	9c013a83-feac-4f39-911c-7d0452f1935c
587a6af4-afdd-4bf5-90a9-04bcadbb4807	2b601443-21fd-4bd6-8a9d-223db3a3d26b
587a6af4-afdd-4bf5-90a9-04bcadbb4807	7dbb7ebb-6d40-444b-8d99-719e03340fa7
587a6af4-afdd-4bf5-90a9-04bcadbb4807	5f302e09-a7ec-4f45-a16f-467e695a9cbf
587a6af4-afdd-4bf5-90a9-04bcadbb4807	23a3cda4-5a4f-416a-b2af-6fd1708be539
587a6af4-afdd-4bf5-90a9-04bcadbb4807	0135e75a-eff6-4f1a-8953-e3eb91d10979
587a6af4-afdd-4bf5-90a9-04bcadbb4807	cc46d0fa-c8dd-4984-b8dc-82666d8f36ea
587a6af4-afdd-4bf5-90a9-04bcadbb4807	09fc776b-9df7-4a19-a7f8-38ff0bba4e28
587a6af4-afdd-4bf5-90a9-04bcadbb4807	8bcb3b99-fef1-45ee-90fb-a9d9ded9f8ef
587a6af4-afdd-4bf5-90a9-04bcadbb4807	88c6c7cd-afe6-492c-9c08-84488a74f9a6
587a6af4-afdd-4bf5-90a9-04bcadbb4807	d8a0b8ab-9b15-4308-9257-7d73339c92fa
587a6af4-afdd-4bf5-90a9-04bcadbb4807	a2a4fa89-ec64-4fee-8791-7fefe4d34bcd
d77b1c6d-e41d-420f-8f22-e8494af72bcf	86996843-bd5a-4ea9-8f20-c4a0e39da0cd
94673584-2806-4e30-9a43-1fd7c50320d8	b212bc91-6990-4647-8b3a-d15a6188fbdb
36347506-9fe3-4cc1-bd70-3f56675ba66c	258c5a2f-4f3e-4692-b7cc-bcce3ff8fde8
36347506-9fe3-4cc1-bd70-3f56675ba66c	fc904e94-d131-4f09-8df1-0f664d89b160
d3f5eb51-9cac-441e-91ac-bad14e134b9d	aec45342-4e40-4fe5-ae8a-bbc540d5f37f
d3f5eb51-9cac-441e-91ac-bad14e134b9d	fa66a9b0-f68e-4d21-bde2-e5440bd9e31c
d3f5eb51-9cac-441e-91ac-bad14e134b9d	223a77ad-fc3c-4fe5-9ba0-fb26c8acfd30
d3f5eb51-9cac-441e-91ac-bad14e134b9d	9bc7c029-1716-47c7-9122-ed869c3e1015
d3f5eb51-9cac-441e-91ac-bad14e134b9d	367a36fd-227b-459c-ab29-9d63b591b8ec
d3f5eb51-9cac-441e-91ac-bad14e134b9d	75faa4db-dfe1-4868-8d17-5bf5efd0155b
d3f5eb51-9cac-441e-91ac-bad14e134b9d	70f7d948-5ed8-4e7c-9d8b-fa5a59c07bcb
d3f5eb51-9cac-441e-91ac-bad14e134b9d	ad57009d-5992-4256-bd8f-d9f84d2048f7
d3f5eb51-9cac-441e-91ac-bad14e134b9d	f74d8ece-7999-41b6-9244-c5af75e60633
d3f5eb51-9cac-441e-91ac-bad14e134b9d	04a8f732-2f64-4e15-b5df-ee017dec6175
d3f5eb51-9cac-441e-91ac-bad14e134b9d	c261c216-59c0-4ee7-8492-5f4ec3b41472
d3f5eb51-9cac-441e-91ac-bad14e134b9d	e14ce7f2-2695-48b6-9f1c-b539d34db079
d3f5eb51-9cac-441e-91ac-bad14e134b9d	c69b1bae-f764-4d10-a90f-e1774686f31a
d3f5eb51-9cac-441e-91ac-bad14e134b9d	90876ceb-a561-4cd9-a574-160177ac0393
d3f5eb51-9cac-441e-91ac-bad14e134b9d	7f4dd268-b542-4251-ab71-eced924dc791
d3f5eb51-9cac-441e-91ac-bad14e134b9d	f9edfe55-559b-45ac-a1e3-c8630a9fdd07
d3f5eb51-9cac-441e-91ac-bad14e134b9d	125cc11e-face-470c-a7f7-906146b2a9f9
d3f5eb51-9cac-441e-91ac-bad14e134b9d	8c33c0b4-feaf-4a0c-85d4-73692a7342cf
36347506-9fe3-4cc1-bd70-3f56675ba66c	1721d09c-8008-4ad0-896a-840f6314eec3
36347506-9fe3-4cc1-bd70-3f56675ba66c	d50a1c11-4d8e-4ac1-a99f-cb85e4ef10ea
36347506-9fe3-4cc1-bd70-3f56675ba66c	ca23c749-9a48-40c8-af25-09810af787d9
36347506-9fe3-4cc1-bd70-3f56675ba66c	793629f4-7160-4ba2-9a65-7fa9afa33d98
36347506-9fe3-4cc1-bd70-3f56675ba66c	9ca51b65-1c6a-4b2b-9572-ca3b907116bf
36347506-9fe3-4cc1-bd70-3f56675ba66c	f3bf1cd6-247b-4258-9ad9-d464bea8dcef
36347506-9fe3-4cc1-bd70-3f56675ba66c	d4e0e2f6-8d00-442d-ad2a-ee8ad9818358
36347506-9fe3-4cc1-bd70-3f56675ba66c	03ac1fc5-1e04-48a1-ac35-e870d9378a37
36347506-9fe3-4cc1-bd70-3f56675ba66c	f2643c22-6a89-402f-917a-850f365cbb77
36347506-9fe3-4cc1-bd70-3f56675ba66c	5dc99e90-cdcb-4184-95aa-815bac526b8f
36347506-9fe3-4cc1-bd70-3f56675ba66c	3403b4ae-6fd4-4e75-be49-2a59f4e77d75
36347506-9fe3-4cc1-bd70-3f56675ba66c	f6426a3c-cd1f-49e8-bc42-f207b325f724
36347506-9fe3-4cc1-bd70-3f56675ba66c	d38c401a-0343-41e0-bd69-0b54cce19241
36347506-9fe3-4cc1-bd70-3f56675ba66c	17de0a9e-947c-40c7-b2d6-57469c4d9c9b
78e46daf-61ca-4997-bf43-5c5277ff6f4c	1f79fa56-e530-4b02-869e-5d7acf1cc245
78e46daf-61ca-4997-bf43-5c5277ff6f4c	825279a7-a0bb-481e-bd13-5a1ba039ff87
78e46daf-61ca-4997-bf43-5c5277ff6f4c	9bf0c924-75f9-4cc3-9aea-a066e36df97f
78e46daf-61ca-4997-bf43-5c5277ff6f4c	7b5ebee2-1971-402a-8c72-1ff336ad0fd2
78e46daf-61ca-4997-bf43-5c5277ff6f4c	a6fc047f-c520-4d72-8afe-a2851ab6b1cc
78e46daf-61ca-4997-bf43-5c5277ff6f4c	29ac41db-57e6-4560-b51d-2db4e75e2edb
78e46daf-61ca-4997-bf43-5c5277ff6f4c	f4f0a5fa-6166-4051-ade6-104e9f3675d3
78e46daf-61ca-4997-bf43-5c5277ff6f4c	f643cd18-aa84-4343-8b49-6b2e24081b30
78e46daf-61ca-4997-bf43-5c5277ff6f4c	2c723a08-5d26-48f4-a856-9fefc488bc62
78e46daf-61ca-4997-bf43-5c5277ff6f4c	d5bc915d-5bcd-4260-a475-99f9eddac2aa
78e46daf-61ca-4997-bf43-5c5277ff6f4c	33da0dd5-4e68-4701-aed3-69cada308008
78e46daf-61ca-4997-bf43-5c5277ff6f4c	e554a279-4618-428c-8094-d168e793d147
78e46daf-61ca-4997-bf43-5c5277ff6f4c	4866728b-95c6-40d9-ac9d-03b16a7f6f5b
78e46daf-61ca-4997-bf43-5c5277ff6f4c	b2242681-a055-4bb5-97db-3e9af4cb5c5f
78e46daf-61ca-4997-bf43-5c5277ff6f4c	f589e3ce-cd29-4a02-a83e-ddf1bbd3efbf
78e46daf-61ca-4997-bf43-5c5277ff6f4c	9a9bf145-4c54-40ec-a135-36f5917cd7cc
78e46daf-61ca-4997-bf43-5c5277ff6f4c	2390d22b-a0a8-4727-9a5d-7bd201dff488
78e46daf-61ca-4997-bf43-5c5277ff6f4c	5772b4bb-718e-472f-9738-6638b19e49f4
78e46daf-61ca-4997-bf43-5c5277ff6f4c	85244cdd-72d9-4434-b61b-d4764d23d0cc
78e46daf-61ca-4997-bf43-5c5277ff6f4c	65eb65fb-e318-493d-b157-8e6cd6c8640e
78e46daf-61ca-4997-bf43-5c5277ff6f4c	24694ccb-857d-4129-9cc7-980ae2162dea
78e46daf-61ca-4997-bf43-5c5277ff6f4c	f812e160-b43b-4344-a181-d3be3dc3cc2c
78e46daf-61ca-4997-bf43-5c5277ff6f4c	6285c6db-24e9-41d5-901e-f82c48e91df1
36347506-9fe3-4cc1-bd70-3f56675ba66c	986afb6e-d943-402b-bd89-90311832ef2c
36347506-9fe3-4cc1-bd70-3f56675ba66c	2ee38c25-4953-4a5e-961e-69c5075818bd
36347506-9fe3-4cc1-bd70-3f56675ba66c	f75d829d-906e-4b23-ae70-b710b86cdaf8
36347506-9fe3-4cc1-bd70-3f56675ba66c	514ae707-0937-49f9-8d76-8324e0fe3bbd
36347506-9fe3-4cc1-bd70-3f56675ba66c	4011c1e3-a470-4919-af20-f1481857b626
36347506-9fe3-4cc1-bd70-3f56675ba66c	a74ada74-8ad9-478a-b938-aad81dc5ad50
36347506-9fe3-4cc1-bd70-3f56675ba66c	40fadd6a-1868-40e0-9611-8afd90260c2d
36347506-9fe3-4cc1-bd70-3f56675ba66c	43eb8192-493d-4e62-a08d-0c91f3dd9a40
36347506-9fe3-4cc1-bd70-3f56675ba66c	d5225734-f651-4db1-a7f0-0108457018ab
36347506-9fe3-4cc1-bd70-3f56675ba66c	5809c414-4e68-45f5-87b6-230845adc43d
fd2e1441-8e35-4b56-bcff-0ba580e2b583	30906d0f-a0f8-4a8d-b266-83af08749216
fd2e1441-8e35-4b56-bcff-0ba580e2b583	29edfb40-1617-4766-b9a9-91738e1c5887
d96c1f14-518f-46dd-a672-241f18ade35f	30906d0f-a0f8-4a8d-b266-83af08749216
d96c1f14-518f-46dd-a672-241f18ade35f	29edfb40-1617-4766-b9a9-91738e1c5887
a153dc01-0752-4f56-9501-8fc52ba97f0b	247e39c5-4b02-4280-a60e-a7bf6dbf93f7
a153dc01-0752-4f56-9501-8fc52ba97f0b	a049b7e7-a46b-40b4-bd92-1d33a44167c3
a153dc01-0752-4f56-9501-8fc52ba97f0b	dd4cf76d-9099-4cb3-8830-bdd9b8825bb6
8b14c644-c872-44fa-9f1c-52f86c74bdc7	f830c9ea-eb40-405b-bab5-9f096459b6f3
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	f0bdea44-7d36-4cc2-81ee-dd87e3ed2de2
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	04c10328-decc-426f-be4c-728256cc89f6
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	307d197f-ff26-4df2-808a-53bd60407b2a
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	8ae4a627-229b-49eb-8a86-35ee6ac0e71d
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	51e2aa93-2eb0-422b-a954-efab9144e01a
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	fae7c131-a61b-4df9-84c1-c58881921a9d
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	382a71c0-af7d-465a-a739-0ebca2e1e639
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	7a24b6b2-6ab6-491a-9cbe-dbebbe0438aa
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	b99e91ab-5482-4d43-8d3d-66fced671a62
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	626a3179-8f65-4d72-85a2-864a2d27f2b1
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	0036bb62-5801-4282-bb15-e83fd56b814b
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	fcba63ba-50b7-4104-9488-23ec79551844
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	7e8bfa8b-017c-4203-8860-aee243347646
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	327f0893-dc5b-482c-acfa-a5bb977a04ab
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	74e0dc95-58e5-4dae-9c8f-ad74d0473a68
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	6a1dc2f8-f64d-4126-bf94-bd86e5a2c7c7
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	626ae0fc-2414-479b-877b-b5f886574910
7f091af6-1c43-4020-9360-e05a6563e18a	6b46a923-1a15-411c-a067-b89d0a0d0361
7f091af6-1c43-4020-9360-e05a6563e18a	2b3c66e1-6ae2-4bb8-bb5f-9367b1c60a13
7f091af6-1c43-4020-9360-e05a6563e18a	ce6a330a-8983-4648-883f-2a37ad323d82
7f091af6-1c43-4020-9360-e05a6563e18a	f1735521-da56-4045-a8d2-6cab449c03e3
7f091af6-1c43-4020-9360-e05a6563e18a	c73e46e3-f07d-4f63-8287-4bd64777e4eb
7f091af6-1c43-4020-9360-e05a6563e18a	48b10a29-5087-44ca-86fe-bea7baefe809
7f091af6-1c43-4020-9360-e05a6563e18a	7516a6b1-34d1-493f-8446-d4b92224a81a
7f091af6-1c43-4020-9360-e05a6563e18a	47b2d98d-8065-4802-bbb8-007af120033c
7f091af6-1c43-4020-9360-e05a6563e18a	a1953c8f-d3de-49f5-a5f2-290fefb0744e
7f091af6-1c43-4020-9360-e05a6563e18a	853e59ab-93ec-43c2-a614-479ff74fc968
7f091af6-1c43-4020-9360-e05a6563e18a	a00436ee-4ac5-4921-9e7f-93c2bb90958e
7f091af6-1c43-4020-9360-e05a6563e18a	6ffb3e2a-2229-40e2-b575-cd686bad06e6
7f091af6-1c43-4020-9360-e05a6563e18a	9f630151-9990-4987-a1e5-5a8b280051bc
7f091af6-1c43-4020-9360-e05a6563e18a	156c691f-acee-423a-aa54-c43fc7ef362d
7f091af6-1c43-4020-9360-e05a6563e18a	2e1d4a5a-e1be-4563-855c-13d40eedaf99
7f091af6-1c43-4020-9360-e05a6563e18a	9dca9f7d-9c60-41cc-a840-fbb4ff1d32ed
7f091af6-1c43-4020-9360-e05a6563e18a	8cf84965-ed78-46ec-a5a5-5cb9319e1eb2
7f091af6-1c43-4020-9360-e05a6563e18a	4aed6796-0bf5-4ca9-808c-b9f602ead89b
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	9a1c0221-90b2-4321-89ed-96eda8b2be6a
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	2408aec3-5b57-43df-a51f-6b9431428d21
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	dc7afe5c-c9b6-48d8-a1a4-e4d5dc5eefbc
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	7ac75cd2-6f92-4e1d-8366-8480ad847179
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	388f0b8e-91ab-4a09-8224-7dd5e2f13df9
1a1e15fb-3b13-4ac2-90e0-8f4d19dafd90	27cf24c0-2562-41e2-b341-82abab049a1e
63f2c632-042f-45d8-864e-8ecf96d21f70	fd5841ee-a527-43f1-9ce3-f8c6e07f1aa6
63f2c632-042f-45d8-864e-8ecf96d21f70	85b176c8-ba3b-4eb0-8e5a-49f25aeb8973
63f2c632-042f-45d8-864e-8ecf96d21f70	d5663de4-2ca0-4714-b244-54e221ad0181
63f2c632-042f-45d8-864e-8ecf96d21f70	576a4db0-a7f6-468c-a618-ddd15b218b88
63f2c632-042f-45d8-864e-8ecf96d21f70	daa90cfa-fbd2-4f2d-b1b9-defda50f2a85
63f2c632-042f-45d8-864e-8ecf96d21f70	7307935a-04d1-47b4-8db4-656939df1ab4
63f2c632-042f-45d8-864e-8ecf96d21f70	e711a807-828d-44f1-9829-a5cd4fcceb44
63f2c632-042f-45d8-864e-8ecf96d21f70	2c2e2c34-e16a-47df-bbea-0b56741dfeb9
63f2c632-042f-45d8-864e-8ecf96d21f70	03d40a1c-184d-4fc0-8211-d765f2b731ee
63f2c632-042f-45d8-864e-8ecf96d21f70	841b231a-6161-4c74-a1a9-3226dbce4ba2
63f2c632-042f-45d8-864e-8ecf96d21f70	8166a152-fa65-4afb-8398-fbff180dd783
63f2c632-042f-45d8-864e-8ecf96d21f70	6622f6f8-f125-4028-923e-71b3d81ba051
63f2c632-042f-45d8-864e-8ecf96d21f70	0dcd3b90-6ad4-4127-8bd7-abf019c6dba2
63f2c632-042f-45d8-864e-8ecf96d21f70	7d6ebc04-0079-49e4-bc33-1c0ac2b4fb89
63f2c632-042f-45d8-864e-8ecf96d21f70	fca50e1d-4f85-4c30-84bf-2f754a7e045d
63f2c632-042f-45d8-864e-8ecf96d21f70	fd0770a7-57eb-4fae-9c3c-00a6f53a546c
63f2c632-042f-45d8-864e-8ecf96d21f70	a52cb130-d267-4ae0-871d-b771c31ba828
63f2c632-042f-45d8-864e-8ecf96d21f70	76a63a01-26fd-482e-8480-bcb5c993b891
63f2c632-042f-45d8-864e-8ecf96d21f70	3c238e43-601b-4633-bed4-99b1070db4da
63f2c632-042f-45d8-864e-8ecf96d21f70	a469eda5-134c-41e0-8ff6-6d914f3496ee
63f2c632-042f-45d8-864e-8ecf96d21f70	c68d9ccb-793d-45f7-846e-2f2ce2e38bef
d427be8a-0aba-47fb-8960-a447826b0343	6f84a877-de90-4947-a9aa-98dba5207d81
d427be8a-0aba-47fb-8960-a447826b0343	e0940e8c-9511-410b-b041-6d10be5df549
d427be8a-0aba-47fb-8960-a447826b0343	e6130ddf-6c1d-4e87-958c-eda7b0da1d65
d427be8a-0aba-47fb-8960-a447826b0343	e0e98c3c-64b6-4369-99f2-f61b315630b8
d427be8a-0aba-47fb-8960-a447826b0343	3a98c8b5-c036-480e-a81f-0621611204c9
d427be8a-0aba-47fb-8960-a447826b0343	a6eb7748-b086-43bb-a243-b01c8073d057
d427be8a-0aba-47fb-8960-a447826b0343	65fbd2ac-f00b-4667-b303-d5fa1d6ca312
d427be8a-0aba-47fb-8960-a447826b0343	dbb9aa4f-3000-4282-a32d-b118f125d260
d427be8a-0aba-47fb-8960-a447826b0343	5c600723-4533-402d-9c4d-8058c3e62b7c
d427be8a-0aba-47fb-8960-a447826b0343	55b8bc01-7c43-4bf9-9a6d-77125514df24
d427be8a-0aba-47fb-8960-a447826b0343	528c90f1-73f3-4bfd-81d8-b54ed67d7d09
d427be8a-0aba-47fb-8960-a447826b0343	e3964be1-ccb6-4040-8cae-7b316905c506
d427be8a-0aba-47fb-8960-a447826b0343	1c626c9c-7847-4d25-9047-9e5dfcc80a20
d427be8a-0aba-47fb-8960-a447826b0343	69873627-7b5e-421e-bde8-e8053c7b0e32
d427be8a-0aba-47fb-8960-a447826b0343	43705cbc-c707-410e-8481-688aaeec47b8
d427be8a-0aba-47fb-8960-a447826b0343	55532bb4-1b81-467a-8073-4247a4a1e4b9
d427be8a-0aba-47fb-8960-a447826b0343	b9995bd3-4e10-42cf-a6d3-a523af20b130
d427be8a-0aba-47fb-8960-a447826b0343	c6363293-72eb-43a3-a6ec-fcba15990890
d427be8a-0aba-47fb-8960-a447826b0343	231ac2c5-01b0-4b9e-a429-dd5ffd6e5c86
d427be8a-0aba-47fb-8960-a447826b0343	4f17afe8-667b-442e-bfc5-db9fa67d868b
d934236a-8a21-4500-8408-d8aee2cb6b27	d4e4abf9-f753-4bc6-8fcd-dc63b3f5f82a
d934236a-8a21-4500-8408-d8aee2cb6b27	abf85ef8-4a05-4e27-aced-7a265e69fb6b
d934236a-8a21-4500-8408-d8aee2cb6b27	2561e538-d279-481d-9dde-51e97f76ad5a
d934236a-8a21-4500-8408-d8aee2cb6b27	60b7e67b-e29f-4810-9910-aaf917dfafb9
d934236a-8a21-4500-8408-d8aee2cb6b27	a0f109eb-11d7-4fce-92b2-de9a16c4161e
d934236a-8a21-4500-8408-d8aee2cb6b27	8f178032-7e5b-44ff-ac80-490e5fe74a11
d934236a-8a21-4500-8408-d8aee2cb6b27	f921d929-11c8-4413-9ba6-8358c99ccc5d
d934236a-8a21-4500-8408-d8aee2cb6b27	1d2dda6c-988d-411f-a3aa-187f538a9ad7
d934236a-8a21-4500-8408-d8aee2cb6b27	b16e43fb-d738-4256-bf4a-105a6c6a738d
d934236a-8a21-4500-8408-d8aee2cb6b27	7da03184-1f31-4068-8549-b0cd527d7117
d934236a-8a21-4500-8408-d8aee2cb6b27	b0964b67-f4d8-4510-bfd3-a2fbfaa8a264
d934236a-8a21-4500-8408-d8aee2cb6b27	2816893e-1e76-415d-b098-e58c836f0b5a
d934236a-8a21-4500-8408-d8aee2cb6b27	69a1448e-3e8e-47b0-acd6-a38e925f0a7a
d934236a-8a21-4500-8408-d8aee2cb6b27	3b63b6ed-9c36-4bdf-a84e-855f7d31ffc7
d934236a-8a21-4500-8408-d8aee2cb6b27	a3a9b2d7-f6d2-4816-aebe-4f3f5e895bbb
d934236a-8a21-4500-8408-d8aee2cb6b27	b465a048-77bb-4bc4-ab0c-3c13a8fb3b07
d934236a-8a21-4500-8408-d8aee2cb6b27	b260021c-5d5b-4598-8546-24426c2934a5
d934236a-8a21-4500-8408-d8aee2cb6b27	5044bb3e-fe9f-4c22-beaf-b30f91e6fb0b
d934236a-8a21-4500-8408-d8aee2cb6b27	3e62f10e-cb31-4f9a-bd6b-9a12f8fa1503
d934236a-8a21-4500-8408-d8aee2cb6b27	1cdb2315-bacd-4013-8354-a22663789f99
d934236a-8a21-4500-8408-d8aee2cb6b27	0f8c1a7a-c2dd-48eb-ab2e-b17c156d5261
d934236a-8a21-4500-8408-d8aee2cb6b27	209058c6-2689-46b6-b6be-7f7875d4f7a7
d934236a-8a21-4500-8408-d8aee2cb6b27	63afa461-4bc3-4ca3-b7c4-dd4c1562bf36
9b8adc7f-39c7-4925-847a-818b9389c18b	031436bf-cbfb-4a2b-8416-6a9846d7f81c
9b8adc7f-39c7-4925-847a-818b9389c18b	b601a7d0-879c-49c8-b25a-35985a43d3c1
9b8adc7f-39c7-4925-847a-818b9389c18b	6e43aeab-a138-4e37-b7fc-8bfad1789710
9b8adc7f-39c7-4925-847a-818b9389c18b	ff3ad08b-2e62-442a-bb2d-bd4a93552a5c
9b8adc7f-39c7-4925-847a-818b9389c18b	29bfa558-1118-4341-8190-0954f618c097
9b8adc7f-39c7-4925-847a-818b9389c18b	44622324-1558-4b57-83fb-3b6ba6d1897d
9b8adc7f-39c7-4925-847a-818b9389c18b	c522fa6d-35e6-4f5f-b4ac-90d590952dba
9b8adc7f-39c7-4925-847a-818b9389c18b	1f74912c-4d5d-44cb-aa1f-b36a73ffc24f
9b8adc7f-39c7-4925-847a-818b9389c18b	0862817d-ffa5-4439-8bb8-c5818f77d6bc
9b8adc7f-39c7-4925-847a-818b9389c18b	8735d27d-785f-4cd8-9959-40d1bb360494
9b8adc7f-39c7-4925-847a-818b9389c18b	0290ca35-62b2-4794-978f-4249007d98b5
9b8adc7f-39c7-4925-847a-818b9389c18b	fa89a08c-d26d-47b0-962a-58a6b91baf72
9b8adc7f-39c7-4925-847a-818b9389c18b	ad59bbed-6193-4714-83fa-873dbf7afd69
9b8adc7f-39c7-4925-847a-818b9389c18b	e07b2d17-0659-416d-bc16-548b26b40769
9b8adc7f-39c7-4925-847a-818b9389c18b	abc88ff7-7b08-4197-8c64-6ef3212f0368
9b8adc7f-39c7-4925-847a-818b9389c18b	adf2a662-505f-4c06-8c5d-2a5cdd161ef3
9b8adc7f-39c7-4925-847a-818b9389c18b	d8e4241d-f7af-4f8d-85ce-aa3b44a2ffe6
9b8adc7f-39c7-4925-847a-818b9389c18b	609de4fa-b867-41f3-b093-7001e7cdbcf6
9b8adc7f-39c7-4925-847a-818b9389c18b	9574336d-82b6-4375-916e-2e0b71f37656
9b8adc7f-39c7-4925-847a-818b9389c18b	7772f088-a0c6-4b21-8fa3-b759e43d2a3d
8497021a-61fa-49ee-ac25-5f321fc52fde	6f63189e-bce0-4f8f-84d2-2335d120cecc
8497021a-61fa-49ee-ac25-5f321fc52fde	da07864a-da79-4201-93f7-c74839352dd0
8497021a-61fa-49ee-ac25-5f321fc52fde	528f5a28-f9eb-4ebe-9239-fe663d54cc13
8497021a-61fa-49ee-ac25-5f321fc52fde	86a5eb2d-cb3e-45dc-978c-618bc9d876d1
8497021a-61fa-49ee-ac25-5f321fc52fde	67e3f6f7-6a9d-4042-8cd6-2b9f161215cc
8497021a-61fa-49ee-ac25-5f321fc52fde	3ede6c29-5cbd-45e5-b35a-75d5064ba7d0
8497021a-61fa-49ee-ac25-5f321fc52fde	ebf4d506-5057-48f8-b6b6-db01a02eb113
8497021a-61fa-49ee-ac25-5f321fc52fde	2aec05ab-c5d4-4339-9e09-5ddb5a44c54b
8497021a-61fa-49ee-ac25-5f321fc52fde	ed23c72d-9cee-4e51-90f2-438f1e0ccfb0
8497021a-61fa-49ee-ac25-5f321fc52fde	6224e1e2-a4eb-4e84-973c-4a0f81ad5321
8497021a-61fa-49ee-ac25-5f321fc52fde	f1c4be6d-6c64-4e00-9014-51502c41660c
8497021a-61fa-49ee-ac25-5f321fc52fde	e1f492a6-3f0b-49d8-8767-b4c4df5c79bf
8497021a-61fa-49ee-ac25-5f321fc52fde	030b7a34-fc03-4e0a-b3cc-c99d160910a7
8497021a-61fa-49ee-ac25-5f321fc52fde	4e5d96a3-13fa-43ee-8a78-aeb58d9b5bee
8497021a-61fa-49ee-ac25-5f321fc52fde	55255135-20b6-4012-8d3d-48ce730d5a02
8497021a-61fa-49ee-ac25-5f321fc52fde	37acf53d-f124-448a-a2eb-acc698907a97
8497021a-61fa-49ee-ac25-5f321fc52fde	eaa5fba0-c488-4fb0-b148-edcf6064d844
f5f01d31-e035-4996-b260-dc63d21906db	d9e03117-e483-4069-aef8-a841a45377ec
585c3f5d-302c-46c6-95d2-ef7e1a1ce04b	3a9ac052-3dec-418f-9b0a-0bda8f2e4c9e
a6290fba-9996-4d99-9ba6-d6f68cf8463b	0c873abb-ead5-403f-9096-c88045eb692b
a6290fba-9996-4d99-9ba6-d6f68cf8463b	a250d210-7f95-4b3a-88a9-1debe71e25d4
a6290fba-9996-4d99-9ba6-d6f68cf8463b	148cab1c-f39d-4f6f-b2a6-a3ecb669586f
a6290fba-9996-4d99-9ba6-d6f68cf8463b	306d8ded-254d-4175-90b4-ba6cf4346ba2
a6290fba-9996-4d99-9ba6-d6f68cf8463b	35db733d-965d-42ae-87fb-0af1702edf6c
a6290fba-9996-4d99-9ba6-d6f68cf8463b	e7af4b57-c167-4a9f-a65b-1bbdd5d6f70c
a6290fba-9996-4d99-9ba6-d6f68cf8463b	998d4f0f-27c6-46d7-80c6-f80e6f1ec435
a6290fba-9996-4d99-9ba6-d6f68cf8463b	dbebbaf1-528b-4f40-b4d0-9ca69805bbdd
a6290fba-9996-4d99-9ba6-d6f68cf8463b	ae42a284-0701-4aef-8a45-3e806f43453e
a6290fba-9996-4d99-9ba6-d6f68cf8463b	41db76f2-a837-4435-a47b-afb830fdc560
a6290fba-9996-4d99-9ba6-d6f68cf8463b	728671ba-3ed4-422a-ba53-13c14a3776b1
a6290fba-9996-4d99-9ba6-d6f68cf8463b	36fbe971-59db-4bfe-b275-c7b66c22b684
a6290fba-9996-4d99-9ba6-d6f68cf8463b	e989013c-9300-49e3-a222-e17457440ce2
a6290fba-9996-4d99-9ba6-d6f68cf8463b	201a3f35-a04a-4a59-ad74-d1ace5d1aaed
a6290fba-9996-4d99-9ba6-d6f68cf8463b	84aa7004-282f-4e61-a7a1-32e63eff4027
a6290fba-9996-4d99-9ba6-d6f68cf8463b	2636dc3e-1570-47d1-a25a-d381f9dd0e05
a6290fba-9996-4d99-9ba6-d6f68cf8463b	a7b58927-350d-4192-87cf-278e28f73023
a6290fba-9996-4d99-9ba6-d6f68cf8463b	f6634ebc-2da6-4040-babd-5cc42c00f474
a6290fba-9996-4d99-9ba6-d6f68cf8463b	d948d3cc-bd28-46db-a852-3259e32936f4
a6290fba-9996-4d99-9ba6-d6f68cf8463b	eed2be00-edb7-4f51-be59-7b175268b83d
a6290fba-9996-4d99-9ba6-d6f68cf8463b	48fdf9d8-10cb-4326-a0f2-973ca6f2ea60
a6290fba-9996-4d99-9ba6-d6f68cf8463b	019d79c6-6604-4b6d-bd7c-9faf456dbef2
a6290fba-9996-4d99-9ba6-d6f68cf8463b	d933e40a-df76-4419-b593-d6c86e0d56be
a6290fba-9996-4d99-9ba6-d6f68cf8463b	6436d514-4b05-4ed4-818a-fcb19e07a802
a6290fba-9996-4d99-9ba6-d6f68cf8463b	44e9c567-7ec0-470a-ad27-d67e711967d6
a6290fba-9996-4d99-9ba6-d6f68cf8463b	1b5607d7-0aee-485c-bbfe-22d1bf3e886b
a6290fba-9996-4d99-9ba6-d6f68cf8463b	399fc7f3-b250-4a26-b555-8d4ab95703dc
64b534f4-7461-422c-bf3b-8d5bde2e36f7	7d1a6caf-5fe3-4317-a185-e797b6b000ae
64b534f4-7461-422c-bf3b-8d5bde2e36f7	145b4c83-91ae-47ca-9e91-cc1a66a36639
64b534f4-7461-422c-bf3b-8d5bde2e36f7	4e10eb1c-a213-4b0e-b022-dace3423963e
64b534f4-7461-422c-bf3b-8d5bde2e36f7	29805757-53a0-4fe1-94bf-28cf5e2d448f
64b534f4-7461-422c-bf3b-8d5bde2e36f7	2ea40892-153d-4bad-a2de-37645aca5b2d
64b534f4-7461-422c-bf3b-8d5bde2e36f7	5030a567-6de6-49c7-b691-31b46561047d
64b534f4-7461-422c-bf3b-8d5bde2e36f7	63f1e71b-4f89-4eac-8ca2-001fbfe06a4c
64b534f4-7461-422c-bf3b-8d5bde2e36f7	0ae9c885-6d57-4ae8-ba13-6fb54ccc54b0
64b534f4-7461-422c-bf3b-8d5bde2e36f7	c34f70d1-6ac5-4722-b7cf-dcfbc09b4415
64b534f4-7461-422c-bf3b-8d5bde2e36f7	762c8ec6-699d-4967-899d-1d46176510c0
64b534f4-7461-422c-bf3b-8d5bde2e36f7	9be010a9-864e-40c8-8ca3-88229719d44b
64b534f4-7461-422c-bf3b-8d5bde2e36f7	22844cde-daa0-4aac-b628-1c9e58ab26eb
64b534f4-7461-422c-bf3b-8d5bde2e36f7	977d1a2d-63e4-410b-9e70-46520cb83755
64b534f4-7461-422c-bf3b-8d5bde2e36f7	0ca5ab00-50d4-4034-b2e0-4a13cae1a60f
64b534f4-7461-422c-bf3b-8d5bde2e36f7	84b26025-b675-45dd-931f-bfb4332ecf33
64b534f4-7461-422c-bf3b-8d5bde2e36f7	20fa312d-e016-4aec-a3be-89f42881eb58
64b534f4-7461-422c-bf3b-8d5bde2e36f7	f31a7a44-e65a-4807-8ca5-4aa34b336e0a
64b534f4-7461-422c-bf3b-8d5bde2e36f7	8da4a480-ed95-48fe-b93e-0db9b288d483
64b534f4-7461-422c-bf3b-8d5bde2e36f7	45fe8201-a27f-4c03-92e7-d62b5ce3454c
64b534f4-7461-422c-bf3b-8d5bde2e36f7	ab4784ce-750a-4259-9fca-69c81bbf0abc
64b534f4-7461-422c-bf3b-8d5bde2e36f7	02620da9-86ee-4f54-bae8-3f087f88ceec
64b534f4-7461-422c-bf3b-8d5bde2e36f7	1be88ea1-d5e3-4b18-8525-d421bb9e9de5
64b534f4-7461-422c-bf3b-8d5bde2e36f7	86f0304c-b40f-471b-8c74-f9ff5e74f46e
64b534f4-7461-422c-bf3b-8d5bde2e36f7	898f72a6-27a6-47d8-a9b7-923cca5bbe94
64b534f4-7461-422c-bf3b-8d5bde2e36f7	9ec67e5f-3f95-443c-9874-37113ea1f5f1
64b534f4-7461-422c-bf3b-8d5bde2e36f7	82597408-2c30-4632-b221-10345686604f
64b534f4-7461-422c-bf3b-8d5bde2e36f7	11c9cf53-3e9f-4504-88e6-1ead23482a53
0e33bb0f-b6ba-4005-9106-3ecef0171499	c6376f51-c190-4ef8-8a11-59e876d8e3fc
0e33bb0f-b6ba-4005-9106-3ecef0171499	7655e061-6d51-4f4a-98bb-4026d4244ccf
0e33bb0f-b6ba-4005-9106-3ecef0171499	f35edc64-2727-4f8e-b43e-e5139c0e61f4
0e33bb0f-b6ba-4005-9106-3ecef0171499	1cab603a-4071-498c-a887-180a4767fbcc
0e33bb0f-b6ba-4005-9106-3ecef0171499	c3c3adee-5b93-4ad0-93bc-8c2ef1d6e91c
0e33bb0f-b6ba-4005-9106-3ecef0171499	6fab2d6e-ec3e-4d36-bcd7-221e712af17b
0e33bb0f-b6ba-4005-9106-3ecef0171499	648d81d7-52c0-4c19-89f1-d5a5868c3feb
0e33bb0f-b6ba-4005-9106-3ecef0171499	d619492c-a42a-489e-bdfb-9bab560d2e36
0e33bb0f-b6ba-4005-9106-3ecef0171499	a5bfd401-f805-4023-8faf-9bef4e06107c
0e33bb0f-b6ba-4005-9106-3ecef0171499	1a5b2121-ce9e-492e-bfaa-c0bfd1aaefaa
0e33bb0f-b6ba-4005-9106-3ecef0171499	49166b2a-f416-4ad8-bf7b-b361d2f56e34
0e33bb0f-b6ba-4005-9106-3ecef0171499	a6de62cb-cb84-4485-9351-4854ae0a03e5
0e33bb0f-b6ba-4005-9106-3ecef0171499	5331ea66-1b37-4ddd-85bc-baae6ed32f1f
0e33bb0f-b6ba-4005-9106-3ecef0171499	d01fbc62-fdcf-4305-b5bc-1004d6bba3e9
0e33bb0f-b6ba-4005-9106-3ecef0171499	848d50e7-fa9e-467f-8579-d1614e65d65f
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	a0fc5e29-0b7c-45d5-9055-0902012b8c89
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	1bccfce4-b06e-4412-97e9-2497713207c1
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	39f34934-f654-4066-9af9-6fc6e610f986
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	3ed89fa7-2a7a-46bd-b109-800b5a38a5d8
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	5ab613ce-8c01-4959-bef4-4f7f328a0fcd
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	10848b56-426e-49e5-be56-04035f1e6eae
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	6d2719ab-c31d-4b1e-9e37-1a3825b93132
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	54f68364-b0f3-4117-8f76-c78f6580b39c
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	16fcf811-2820-41f2-92d8-a2c3051145df
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	b0dece5c-b8fd-4197-a8a6-8571b56eb2d2
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	c409da13-5a71-44f6-bf24-1cfa1e4da99a
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	43008a91-d3df-4930-a05c-2d2ec2d66bee
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	83d9e60c-8ebe-4079-a3c1-743edb327882
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	923a5db8-023a-43c9-b1d8-ebe62ec5d3f0
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	1820ac8b-b6da-4377-8763-bb35a656d039
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	2516903b-55cc-4ba4-9b1c-c968791ab7c1
c90e44ff-5e1a-4114-a2f1-aa8f139019a1	aadbef19-7cdd-4494-aa78-eb8dbdf1bb5f
0e33bb0f-b6ba-4005-9106-3ecef0171499	dc6df45d-5f28-4e6f-87ba-2282769f4119
0e33bb0f-b6ba-4005-9106-3ecef0171499	adf769f3-3290-41da-a76d-a727718367fc
0e33bb0f-b6ba-4005-9106-3ecef0171499	a82c6591-3e32-44ae-9cdf-4f4f0df987fc
0e33bb0f-b6ba-4005-9106-3ecef0171499	ce6f4446-e91c-4dd5-918e-528add94e695
0e33bb0f-b6ba-4005-9106-3ecef0171499	94f4c442-5eef-4bdd-9780-0f11f70827dc
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	45699ead-d72a-4af7-a7d2-b19918e3e728
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	49a57911-a010-483a-b4de-6e5c63bff047
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	2dce9b39-eeea-47e1-83de-f995535b0ee4
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	00da31e5-78e8-4943-96a2-381942a65b4d
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	c206d8ab-ee2a-4112-ba69-2ad869063696
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	2fb082c2-280a-4832-bb2c-f7802483e286
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	e6536f66-e651-493d-a06a-73ccc7e07380
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	8f0bbf6f-6689-478b-a5a0-185a8346ed5d
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	0e9338c4-e46e-48a8-8633-e95c416fbacb
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	445c8ceb-e9a9-47cd-bac8-d14ebc7f1914
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	d3e2a228-a155-4466-b91a-ad9f92df74d8
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	c70cac02-8d88-4fbd-a75a-849dc83cc1b4
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	07435cb6-f5d7-4579-b95e-a0067a740cc1
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	e481cca6-8751-4065-96df-b66f3e91d703
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	1cd4bffb-9ffa-489c-aad7-c7bc30dd323c
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	6e51a926-7e18-4857-9da1-bf7a8c54b7a0
afc9216c-d2b7-47d2-9e19-4a23a91acb9e	bc054213-6ce6-47f4-af5c-cb635fb7d16c
fba7b151-8a02-40bb-9dbc-62c14c786c4d	835d6517-e658-46f4-bd03-31ae9ce9abc8
25247b17-635d-4a64-a9a4-1462133e7d50	3d9b6cf8-3d7d-4999-a328-777a1d0e1932
49f0263b-9be4-44f2-be54-8f95a1942dae	01e71d62-ef6a-4b7b-8eca-9cc93a6b701d
49f0263b-9be4-44f2-be54-8f95a1942dae	0ea9db84-8033-4777-b8a1-651e9a7893b3
49f0263b-9be4-44f2-be54-8f95a1942dae	5b4b45a7-4957-4f78-a20f-ce4552f56eef
49f0263b-9be4-44f2-be54-8f95a1942dae	9a96f001-81e8-400f-b208-ea7a9661fbfc
49f0263b-9be4-44f2-be54-8f95a1942dae	e673cce8-a11d-424e-bc4e-b18213f6b064
49f0263b-9be4-44f2-be54-8f95a1942dae	3adfff1b-7142-45a6-9419-d2bcfa98c472
49f0263b-9be4-44f2-be54-8f95a1942dae	6c0bab1f-3112-448c-b26c-ba54fe2a7834
49f0263b-9be4-44f2-be54-8f95a1942dae	6674aea5-a4bc-4b1a-9928-4e1770d783fa
49f0263b-9be4-44f2-be54-8f95a1942dae	ced65c86-c2e0-4fa1-b49a-e24b1c20b57c
49f0263b-9be4-44f2-be54-8f95a1942dae	33a6559f-6fca-4fab-bb33-c3b8c331caab
49f0263b-9be4-44f2-be54-8f95a1942dae	5c7333fc-5b09-4c44-819d-818d8e68cc18
49f0263b-9be4-44f2-be54-8f95a1942dae	9cefd235-f6ab-4561-940c-ada01360b117
49f0263b-9be4-44f2-be54-8f95a1942dae	5c4372f4-865d-498a-bb1e-846e3cbfc9fa
49f0263b-9be4-44f2-be54-8f95a1942dae	ad3c205e-1fd1-4369-a301-f1008f182b81
49f0263b-9be4-44f2-be54-8f95a1942dae	5d237526-992b-455b-9989-54b39d93203d
49f0263b-9be4-44f2-be54-8f95a1942dae	01f275c3-256a-46bd-a5c8-782d563062d3
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
a01e1463-973a-4f48-a97a-9c5788be3871	beb0b64276136a296ea62c6afeb10766f9af3aeea0a380bb32bc6075eaedcfdc	2023-09-13 09:03:06.655792+00	20230908140133_change_rating_to_numeric	\N	\N	2023-09-13 09:03:06.551215+00	1
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
471e4ee5-2f27-4915-9067-15f623cd7925	562dd89e9b5f87d8136e42da2d3bd9c88835d978fb9ceb12dc2850077e66f525	2023-08-22 16:25:02.487183+00	20230729120240_add_failed_and_passable_to_rating	\N	\N	2023-08-22 16:25:02.182201+00	1
7439170f-3aa0-4d00-973a-77a4101e40a7	5912a098235fbd2048f7e170150df03fbbd5b8daacf5e483d1addb0cef48c476	2023-04-27 09:01:47.635856+00	20230427090000_add_test_field	\N	\N	2023-04-27 09:01:47.110439+00	1
d198d750-dcc1-4c68-b712-a6675fd83852	6b7cbf721b055709c56dc637c0c5a2ece79992a1223b46c5db56df1f57b9d054	2023-04-27 09:22:09.581958+00	20230427090653_remove_test_field	\N	\N	2023-04-27 09:22:09.174543+00	1
0ce73e9a-34ca-4a43-a2cb-23e22df7de57	8d7a41e5392215de7be93b31c88a59d46dd0c55a187dbff8f40b4190993de164	2023-08-22 16:25:02.929782+00	20230810063517_add_archived_field_to_group	\N	\N	2023-08-22 16:25:02.614717+00	1
6c823fa7-81df-4dd4-a1fe-4ba8f0b56df5	5bc483c89be5183d99b9b26f51470bda259302acad901b4c93416422620f4969	2023-09-14 18:55:52.921647+00	20230914120114_add_high_school_and_vocational_class_years	\N	\N	2023-09-14 18:55:52.879713+00	1
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

