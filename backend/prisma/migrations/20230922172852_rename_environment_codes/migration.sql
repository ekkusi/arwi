-- Rename environment codes

UPDATE "EvaluationCollection" SET "environmentCode" = CASE
  WHEN "environmentCode" = 'LI_TALVI' THEN 'LI_ENV_TAL'
  WHEN "environmentCode" = 'LI_PALLO' THEN 'LI_ENV_PAL'
  WHEN "environmentCode" = 'LI_VESI' THEN 'LI_ENV_VES'
  WHEN "environmentCode" = 'LI_VOIM' THEN 'LI_ENV_VOI'
  WHEN "environmentCode" = 'LI_LUONTO' THEN 'LI_ENV_LUO'
  WHEN "environmentCode" = 'LI_TANSSI' THEN 'LI_ENV_TAN'
  WHEN "environmentCode" = 'LI_KUNTO' THEN 'LI_ENV_KUN'
  WHEN "environmentCode" = 'LI_PERUS' THEN 'LI_ENV_PER'
  WHEN "environmentCode" = 'LI_MUU' THEN 'LI_ENV_MUU'
  ELSE 'NOT_VALID_ENV'
END;