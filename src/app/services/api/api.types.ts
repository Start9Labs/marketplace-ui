import { Manifest, URL } from '../../util/manifest-types'

export type GetDataReq = Record<string, never>;
export type GetDataRes = MarketplaceData;

export type GetPackagesReq = {
  ids?: { id: string; version: string }[];
  // iff !id
  category?: string;
  query?: string;
  page?: string;
  'per-page'?: string;
};
export type GetPackagesRes = Pkg[];

export interface MarketplaceData {
  categories: string[];
}

export interface Pkg {
  icon: URL;
  license: URL;
  instructions: URL;
  manifest: Manifest;
  categories: string[];
  versions: string[];
  'dependency-metadata': {
    [id: string]: {
      title: string;
      icon: URL;
    };
  };
}
