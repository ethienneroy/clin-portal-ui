import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';

const panelsDictionaries = [
  'MMG',
  'DYSM',
  'RHAB',
  'MYAC',
  'MYOC',
  'HYPM',
  'MITN',
  'RGDI',
  'RGDI+',
  'POLYM',
  'TUPED',
  'TUHEM',
  ArrangerValues.missing,
];

export const dictionaries: Record<string, string[]> = {
  // Patients:
  'donors.analysis_code': panelsDictionaries,
  'donors.affected_status_code': ['affected', 'not_affected', 'unknown'],
  'donors.gender': ['Female', 'Male', 'Other', 'unknown'],
  // Variants
  type: ['GAIN', 'LOSS', ArrangerValues.missing],
  variant_class: ['deletion', 'insertion', 'SNV', ArrangerValues.missing],
  'consequences.consequences': [
    'transcript_ablation',
    'splice_acceptor_variant',
    'splice_donor_variant',
    'stop_gained',
    'frameshift_variant',
    'stop_lost',
    'start_lost',
    'transcript_amplification',
    'inframe_insertion',
    'inframe_deletion',
    'missense_variant',
    'protein_altering_variant',
    'splice_region_variant',
    'splice_donor_5th_base_variant',
    'splice_donor_region_variant',
    'splice_polypyrimidine_tract_variant',
    'incomplete_terminal_codon_variant',
    'start_retained_variant',
    'stop_retained_variant',
    'synonymous_variant',
    'coding_sequence_variant',
    'mature_miRNA_variant',
    '5_prime_UTR_variant',
    '3_prime_UTR_variant',
    'non_coding_transcript_exon_variant',
    'intron_variant',
    'NMD_transcript_variant',
    'non_coding_transcript_variant',
    'upstream_gene_variant',
    'downstream_gene_variant',
    'TFBS_ablation',
    'TFBS_amplification',
    'TF_binding_site_variant',
    'regulatory_region_ablation',
    'regulatory_region_amplification',
    'feature_elongation',
    'regulatory_region_variant',
    'feature_truncation',
    'intergenic_variant',
    ArrangerValues.missing,
  ],
  variant_external_reference: ['DBSNP', 'Clinvar', 'Pubmed', ArrangerValues.missing],
  chromosome: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    'X',
    'Y',
    ArrangerValues.missing,
  ],
  // Genes
  'consequences.biotype': [
    'IG_C_gene',
    'IG_D_gene',
    'IG_J_gene',
    'IG_LV_gene',
    'IG_V_gene',
    'TR_C_gene',
    'TR_J_gene',
    'TR_V_gene',
    'TR_D_gene',
    'IG_pseudogene',
    'IG_C_pseudogene',
    'IG_J_pseudogene',
    'IG_V_pseudogene',
    'TR_V_pseudogene',
    'TR_J_pseudogene',
    'Mt_rRNA',
    'Mt_tRNA',
    'miRNA',
    'misc_RNA',
    'rRNA',
    'scRNA',
    'snRNA',
    'snoRNA',
    'ribozyme',
    'sRNA',
    'scaRNA',
    'Non-coding',
    'lncRNA',
    'Mt_tRNA_pseudogene',
    'tRNA_pseudogene',
    'snoRNA_pseudogene',
    'snRNA_pseudogene',
    'scRNA_pseudogene',
    'rRNA_pseudogene',
    'misc_RNA_pseudogene',
    'miRNA_pseudogene',
    'TEC',
    'nonsense_mediated_decay',
    'non_stop_decay',
    'retained_intron',
    'protein_coding',
    'protein_coding_LoF',
    'protein_coding_CDS_not_defined',
    'processed_transcript',
    'non_coding',
    'ambiguous_orf',
    'sense_intronic',
    'sense_overlapping',
    'antisense/antisense_RNA',
    'known_ncrna',
    'pseudogene',
    'processed_pseudogene',
    'polymorphic_pseudogene',
    'retrotransposed',
    'transcribed_processed_pseudogene',
    'transcribed_unprocessed_pseudogene',
    'transcribed_unitary_pseudogene',
    'translated_processed_pseudogene',
    'translated_unprocessed_pseudogene',
    'unitary_pseudogene',
    'unprocessed_pseudogene',
    'artifact',
    'lincRNA',
    'macro_lncRNA',
    '3prime_overlapping_ncRNA',
    'disrupted_domain',
    'vaultRNA/vault_RNA',
    'bidirectional_promoter_lncRNA',
    ArrangerValues.missing,
  ],
  gene_external_reference: ['OMIM', 'HPO', 'Orphanet', ArrangerValues.missing],
  'genes.panels': panelsDictionaries,
  panels: panelsDictionaries,
  // Pathogenicity
  'clinvar.clin_sig': [
    'Benign',
    'Likely_benign',
    'Uncertain_significance',
    'Conflicting_interpretations_of_pathogenicity',
    'Pathogenic',
    'Not_provided',
    'Drug_response',
    'Risk_factor',
    'Likely_pathogenic',
    'Association',
    'Other',
    'Affects',
    'Protective',
    'Confers_sensitivity',
    'Uncertain_risk_allele',
    ArrangerValues.missing,
  ],
  'varsome.acmg.verdict.verdict': [
    'Pathogenic',
    'Likely Pathogenic',
    'Uncertain Significance',
    'Likely Benign',
    'Benign',
    ArrangerValues.missing,
  ],
  'varsome.acmg.classifications.name': [
    'PVS1',
    'PS1',
    'PS2',
    'PS3',
    'PS4',
    'PM1',
    'PM2',
    'PM3',
    'PM4',
    'PM5',
    'PM6',
    'PP1',
    'PP2',
    'PP3',
    'PP4',
    'PP5',
    'BA1',
    'BS1',
    'BS2',
    'BS3',
    'BS4',
    'BP1',
    'BP2',
    'BP3',
    'BP4',
    'BP5',
    'BP6',
    'BP7',
    ArrangerValues.missing,
  ],
  'consequences.vep_impact': ['HIGH', 'MODERATE', 'LOW', 'MODIFIER', ArrangerValues.missing],
  'consequences.predictions.fathmm_pred': ['D', 'T', ArrangerValues.missing],
  'consequences.predictions.lrt_pred': ['D', 'N', 'U', ArrangerValues.missing],
  'consequences.predictions.polyphen2_hvar_pred': ['B', 'D', 'P', ArrangerValues.missing],
  'consequences.predictions.sift_pred': ['D', 'T', ArrangerValues.missing],
  // Occurrence
  'donors.zygosity': ['HOM', 'HEM', 'HET'],
  'donors.mother_zygosity': ['HOM', 'HEM', 'HET', 'WT', 'UNK'],
  'donors.father_zygosity': ['HOM', 'HEM', 'HET', 'WT', 'UNK'],
  'donors.parental_origin': [
    'denovo',
    'possible_denovo',
    'both',
    'mother',
    'father',
    'possible_father',
    'possible_mother',
    'ambiguous',
    'unknown',
    ArrangerValues.missing,
  ],
  'donors.transmission': [
    'autosomal_dominant_de_novo',
    'autosomal_dominant',
    'autosomal_recessive',
    'x_linked_dominant_de_novo',
    'x_linked_recessive_de_novo',
    'x_linked_dominant',
    'x_linked_recessive',
    'non_carrier_proband',
    'unknown_parents_genotype',
    'unknown_proband_genotype',
    ArrangerValues.missing,
  ],
  'donors.filters': [
    'PASS',
    'DRAGENSnpHardQUAL',
    'DRAGENIndelHardQUAL',
    'LowDepth',
    'PloidyConflict',
    'base_quality',
    'lod_fstar',
    ArrangerValues.missing,
  ],
  filters: ['PASS', 'cnvQual', ArrangerValues.missing],
};
