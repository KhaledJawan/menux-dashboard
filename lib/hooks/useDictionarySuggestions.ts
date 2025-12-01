import { useQuery } from "@tanstack/react-query";

export function useDictionarySuggestions(locale: string, query: string) {
  return useQuery({
    queryKey: ["dictionary-suggest", locale, query],
    queryFn: async () => {
      const res = await fetch(
        `/api/dictionary/suggest?locale=${locale}&q=${encodeURIComponent(query)}`
      );
      if (!res.ok) return [];
      const data = await res.json();
      return data.suggestions ?? [];
    },
    enabled: query.length >= 2,
  });
}
