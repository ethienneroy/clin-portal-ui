import { ArrangerResultsTree } from 'graphql/models';

export interface IVariantResultTree {
  cnv: ArrangerResultsTree<VariantEntity>;
}

export type ITableVariantEntity = VariantEntity & {
  key: string;
};

export type ITableGeneEntity = GeneEntity & {
  key: string;
};

export type VariantEntity = {
  id: string;
  patient_id: string;
  name: string;
  type: string;
  qual: number;
  chromosome: string;
  start: number;
  end: number;
  reflen: number;
  number_genes: number;
  filters: string[];
  calls: number[];
  cn: number;
  sm: number;
  bc: number;
  pe: number[];
  genes: ArrangerResultsTree<GeneEntity>;
};

export type GeneEntity = {
  id: string;
  gene_length: number;
  overlap_bases: number;
  overlap_cnv_ratio: number;
  overlap_exons: number;
  overlap_gene_ratio: number;
  symbol: string;
  panels: string[];
};
