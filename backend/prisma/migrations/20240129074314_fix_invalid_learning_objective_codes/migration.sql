BEGIN TRANSACTION;

-- Update statement for the EvaluationCollection table
UPDATE "EvaluationCollection"
SET "learningObjectiveCodes" = array(SELECT regexp_replace(
    unnest("learningObjectiveCodes"),  -- Column to perform the replacement
    'TI(\d+)',               -- Regex pattern to find incorrect codes
    'T\1',                  -- Replacement pattern (using \\1 for backreference)
    'g'
));

COMMIT TRANSACTION;
