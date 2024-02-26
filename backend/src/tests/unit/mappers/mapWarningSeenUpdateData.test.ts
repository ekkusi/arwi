import { Teacher } from "@prisma/client";
import { mapTeacherUsageData } from "@/graphql/utils/mappers";
import { MONTHLY_TOKEN_USE_LIMIT, MONTHLY_TOKEN_USE_WARNING_THRESHOLDS } from "@/config";

const baseTeacherData: Teacher = {
  id: "1",
  monthlyTokensUsed: 0,
  hasSeenFirstMonthlyTokenWarning: false,
  hasSeenSecondMonthlyTokenWarning: false,
  passwordResetTries: 0,
  passwordResetStartedAt: null,
  languagePreference: "fi",
  consentsAnalytics: false,
  passwordHash: null,
  email: null,
  mPassID: null,
};

describe("mapTeacherUsageData", () => {
  it("should return no warning for usage below the first threshold", () => {
    const teacher = baseTeacherData;
    const result = mapTeacherUsageData(teacher);
    expect(result.warning).toBeUndefined();
  });

  it("should return a first warning for usage above the first threshold", () => {
    const teacher: Teacher = {
      ...baseTeacherData,
      monthlyTokensUsed: MONTHLY_TOKEN_USE_LIMIT * MONTHLY_TOKEN_USE_WARNING_THRESHOLDS.FIRST_WARNING + 1, // Just above the first threshold
    };

    const result = mapTeacherUsageData(teacher);
    expect(result.warning).toEqual({
      warning: "FIRST_WARNING",
      threshhold: MONTHLY_TOKEN_USE_WARNING_THRESHOLDS.FIRST_WARNING,
    });
  });

  it("should return a second warning for usage above the second threshold", () => {
    const teacher: Teacher = {
      ...baseTeacherData,
      monthlyTokensUsed: MONTHLY_TOKEN_USE_LIMIT * MONTHLY_TOKEN_USE_WARNING_THRESHOLDS.SECOND_WARNING + 1, // Just above the second threshold
    };

    const result = mapTeacherUsageData(teacher);
    expect(result.warning).toEqual({
      warning: "SECOND_WARNING",
      threshhold: MONTHLY_TOKEN_USE_WARNING_THRESHOLDS.SECOND_WARNING,
    });
  });

  it("should not return any warning if the teacher has already seen the second warning it", () => {
    const teacher: Teacher = {
      ...baseTeacherData,
      monthlyTokensUsed: MONTHLY_TOKEN_USE_LIMIT * MONTHLY_TOKEN_USE_WARNING_THRESHOLDS.SECOND_WARNING + 1,
      hasSeenSecondMonthlyTokenWarning: true, // Teacher has already seen the second warning
    };

    const result = mapTeacherUsageData(teacher);
    expect(result.warning).toBeUndefined();
  });

  it("should not return a first warning if the teacher has already seen it", () => {
    const teacher: Teacher = {
      ...baseTeacherData,
      monthlyTokensUsed: MONTHLY_TOKEN_USE_LIMIT * MONTHLY_TOKEN_USE_WARNING_THRESHOLDS.FIRST_WARNING + 1,
      hasSeenFirstMonthlyTokenWarning: true, // Teacher has already seen the first warning
    };

    const result = mapTeacherUsageData(teacher);
    expect(result.warning).not.toEqual({
      warning: "FIRST_WARNING",
      threshhold: MONTHLY_TOKEN_USE_WARNING_THRESHOLDS.FIRST_WARNING,
    });
  });
});
