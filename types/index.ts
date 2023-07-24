export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-4"
}

export type Source = {
  url: string;
  text: string;
};

export type SearchQuery = {
  query: string;
  sourceLinks: string[];
};