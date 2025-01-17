/// <reference types="Cypress" />
import '../../support/commands';

const epCHUSJ_ldmCHUSJ = JSON.parse(Cypress.env('presc_EP_CHUSJ_LDM_CHUSJ'));

beforeEach(() => {
  cy.login(Cypress.env('username_DG_CHUSJ_CUSM_CHUS'), Cypress.env('password'));
  cy.visitPrescriptionEntityPage(epCHUSJ_ldmCHUSJ.prescriptionId);
});

afterEach(() => {
  cy.logout();
});

describe('Page d\'une prescription', () => {
  describe('Vérifier les informations affichées', () => {
    it('De la section Analyse', () => {
      cy.get('[data-cy="AnalysisCard"]').contains(epCHUSJ_ldmCHUSJ.prescriptionId).should('exist');
      cy.get('[data-cy="AnalysisCard"]').contains('Approuvée').should('exist');
      cy.get('[data-cy="AnalysisCard"]').contains('Retard global de développement / Déficience intellectuelle (Trio) (RGDI)').should('exist');
      cy.get('[data-cy="AnalysisCard"]').contains(epCHUSJ_ldmCHUSJ.stampDate).should('exist');
      cy.get('[data-cy="AnalysisCard"]').contains('LDM-CHUSJ').should('exist');
    });
    
    it('De la section Patient', () => {
      cy.get('[data-cy="PatientCard"]').contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist');
      cy.get('[data-cy="PatientCard"]').contains(epCHUSJ_ldmCHUSJ.mrnProb).should('exist');
      cy.get('[data-cy="PatientCard"]').contains(epCHUSJ_ldmCHUSJ.ramqProb).should('exist');
      cy.get('[data-cy="PatientCard"]').contains(epCHUSJ_ldmCHUSJ.lastNameProb).should('exist');
      cy.get('[data-cy="PatientCard"]').contains(epCHUSJ_ldmCHUSJ.firstNameProb).should('exist');
      cy.get('[data-cy="PatientCard"]').contains(epCHUSJ_ldmCHUSJ.birthdayProb).should('exist');
      cy.get('[data-cy="PatientCard"]').contains(epCHUSJ_ldmCHUSJ.genderProb).should('exist');
    });
    
    it('De la section Information clinique', () => {
      cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.requestProbId).should('exist');
      cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').contains('Complétée').should('exist');
      cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.stampDate).should('exist');
      cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.sampleProbId).should('exist');
      cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').contains('Fichiers').should('exist');
      cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').contains('Variants').should('exist');
    });
    
    it('De la section Mère', () => {
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.mrnMth, {matchCase: false}).should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.ramqMth).should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.lastNameMth).should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.firstNameMth).should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.birthdayMth).should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').contains('Féminin').should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.statusMth).should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.requestMthId).should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').contains('Complétée').should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.stampDate).should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.sampleMthId, {matchCase: false}).should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').contains('Fichiers').should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').contains('Variants').should('exist');
    });
    
    it('De la section Père', () => {
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.mrnFth).should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.ramqFth).should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.lastNameFth).should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.firstNameFth).should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.birthdayFth).should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').contains('Masculin').should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.statusFth).should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.requestFthId).should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').contains('Complétée').should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.stampDate).should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').contains(epCHUSJ_ldmCHUSJ.sampleFthId).should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').contains('Fichiers').should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').contains('Variants').should('exist');
    });
  });
 
  describe('Valider les liens disponibles', () => {
    it('Bouton Voir les variants', () => {
      cy.clickAndIntercept('button[data-cy="SeeVariantsButton"]', 'POST', '**/graphql', 3);
      cy.contains('Patient ID : '+epCHUSJ_ldmCHUSJ.patientProbId).should('exist', {timeout: 20*1000});
    });

    it('Lien Fichiers (Cas-index)', () => {
      cy.clickAndIntercept('[data-cy="ArchiveLink_'+epCHUSJ_ldmCHUSJ.requestProbId+'"]', 'POST', '**/$graphql', 1);
      cy.contains(epCHUSJ_ldmCHUSJ.patientProbId).should('exist', {timeout: 20*1000});
    });

    it('Lien Fichiers (Mère)', () => {
      cy.clickAndIntercept('[data-cy="ArchiveLink_'+epCHUSJ_ldmCHUSJ.requestMthId+'"]', 'POST', '**/$graphql', 1);
      cy.contains(epCHUSJ_ldmCHUSJ.patientMthId).should('exist', {timeout: 20*1000});
    });

    it('Lien Fichiers (Père)', () => {
      cy.clickAndIntercept('[data-cy="ArchiveLink_'+epCHUSJ_ldmCHUSJ.requestFthId+'"]', 'POST', '**/$graphql', 1);
      cy.contains(epCHUSJ_ldmCHUSJ.patientFthId).should('exist', {timeout: 20*1000});
    });

    it('Lien Variants (Cas-index)', () => {
      cy.clickAndIntercept('[data-cy="VariantsLink_'+epCHUSJ_ldmCHUSJ.patientProbId+'_'+epCHUSJ_ldmCHUSJ.requestProbId+'"]', 'POST', '**/graphql', 3);
      cy.contains('Patient ID : '+epCHUSJ_ldmCHUSJ.patientProbId).should('exist', {timeout: 20*1000});
    });

    it('Lien Variants (Mère)', () => {
      cy.clickAndIntercept('[data-cy="VariantsLink_'+epCHUSJ_ldmCHUSJ.patientMthId+'_'+epCHUSJ_ldmCHUSJ.requestMthId+'"]', 'POST', '**/graphql', 3);
      cy.contains('Patient ID : '+epCHUSJ_ldmCHUSJ.patientMthId).should('exist', {timeout: 20*1000});
    });

    it('Lien Variants (Père)', () => {
      cy.clickAndIntercept('[data-cy="VariantsLink_'+epCHUSJ_ldmCHUSJ.patientFthId+'_'+epCHUSJ_ldmCHUSJ.requestFthId+'"]', 'POST', '**/graphql', 3);
      cy.contains('Patient ID : '+epCHUSJ_ldmCHUSJ.patientFthId).should('exist', {timeout: 20*1000});
    });
  });

  describe('Valider les panneaux masquables', () => {
    it('Panneau Information clinique', () => {
      cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
      cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
      cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('[data-cy="ClinicalInformation_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    });

    it('Panneau Mère', () => {
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('[data-cy="ParentCard_Mère_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    });

    it('Panneau Père', () => {
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
      cy.get('[data-cy="ParentCard_Père_CollapsePanel"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    });
  });
});