export function normalizeText(text: string) {
  return text
    .toLowerCase()
    .replace(/[.,?!]/g, "")
    .trim();
}

export function stripArticle(text: string) {
  return text.replace(/^(der|die|das|ein|eine)\s+/i, "").trim();
}

export function getArticle(text: string) {
  const match = text.match(/^(der|die|das|ein|eine)\s+/i);
  return match ? match[1].toLowerCase() : "";
}

export function removeParentheses(text: string) {
  return text.replace(/\(.*?\)/g, "").trim();
}

export function extractParenthesesContent(text: string) {
  const matches = text.match(/\((.*?)\)/g);
  if (!matches) return [];
  return matches.map((m) => m.replace(/[()]/g, "").trim().toLowerCase());
}

function levenshtein(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0),
  );
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }
  return matrix[a.length][b.length];
}

export function checkAnswer(
  userInput: string,
  target: string,
  isGermanTarget: boolean,
) {
  const targetSynonyms = target
    .split(/[/,]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const userSynonyms = userInput
    .split(/[/,]/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (userSynonyms.length === 0) return { isCorrect: false, points: 0 };

  let totalPoints = 0;
  let matchedTargets = new Set<number>();
  let wrongGenderMessage = "";

  for (const userSyn of userSynonyms) {
    const rawUser = userSyn;
    const normUser = normalizeText(removeParentheses(userSyn));
    const normUserNoArticle = stripArticle(normUser);
    const userArticle = getArticle(normalizeText(userSyn));

    let bestMatchPoints = 0;
    let bestTargetIdx = -1;
    let genderWrongForThisMatch = false;
    let correctGenderForThisMatch = "";
    let extraPoints = 0;

    for (let i = 0; i < targetSynonyms.length; i++) {
      if (matchedTargets.has(i)) continue;

      const rawTarget = targetSynonyms[i];
      const normTarget = normalizeText(removeParentheses(rawTarget));
      const normTargetNoArticle = stripArticle(normTarget);
      const targetArticle = getArticle(normalizeText(rawTarget));
      const targetOptionals = extractParenthesesContent(rawTarget);

      const maxDistance = Math.max(
        1,
        Math.floor(normTargetNoArticle.length / 5),
      );

      const isBaseMatch =
        normUserNoArticle === normTargetNoArticle ||
        levenshtein(normUserNoArticle, normTargetNoArticle) <= maxDistance;

      if (isBaseMatch) {
        let points = 10;
        let genderWrong = false;

        if (isGermanTarget && targetArticle) {
          if (userArticle !== targetArticle) {
            points = 5;
            genderWrong = true;
          }
        }

        // Check optional content
        let bonus = 0;
        if (targetOptionals.length > 0) {
          const userFullText = normalizeText(rawUser);
          for (const opt of targetOptionals) {
            const normOpt = normalizeText(opt);
            if (
              rawUser.includes(`(${opt})`) ||
              userFullText.endsWith(` ${normOpt}`) ||
              userFullText.includes(` ${normOpt} `)
            ) {
              bonus += 5;
            }
          }
        }

        if (points + bonus > bestMatchPoints) {
          bestMatchPoints = points;
          bestTargetIdx = i;
          genderWrongForThisMatch = genderWrong;
          correctGenderForThisMatch = targetArticle;
          extraPoints = bonus;
        }
      }
    }

    if (bestTargetIdx !== -1) {
      totalPoints += bestMatchPoints + extraPoints;
      matchedTargets.add(bestTargetIdx);
      if (genderWrongForThisMatch) {
        wrongGenderMessage = `Wrong gender! The correct gender is "${correctGenderForThisMatch}".`;
      }
    }
  }

  let isCorrect = matchedTargets.size > 0;

  if (matchedTargets.size > 1 && targetSynonyms.length > 1) {
    totalPoints += 10; // Extra points for multiple synonyms
  }

  return {
    isCorrect,
    points: totalPoints,
    message: wrongGenderMessage || undefined,
  };
}
