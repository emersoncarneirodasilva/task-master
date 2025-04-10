export default function filterEnumValues<T extends string>(
  term: string,
  enumObj: Record<string, T>
): T[] {
  const upperTerm = term.toUpperCase();
  return Object.values(enumObj).filter((value) =>
    value.toUpperCase().includes(upperTerm)
  );
}
