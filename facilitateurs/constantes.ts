export const nomIndexTypeEvenement = "IDX_EVENEMENTS_COLONNE_TYPE";
export const nomsEntites = {
    schemas: "journal_nis2",
    tables: {
        Nis2Concernes: "nis_2_concernes",
        Evenements: "evenements",
    },
    index: {
        Nis2Concernes: {
            secteur: "IDX_NIS_2_CONCERNES_SECTEUR",
            sousSecteur: "IDX_NIS_2_CONCERNES_SOUS_SECTEUR",
            typeStructure: "IDX_NIS_2_CONCERNES_SECTEUR",
            trancheNombreEmploye: "IDX_NIS_2_CONCERNES_SECTEUR",
            trancheChiffreAffaire: "IDX_NIS_2_CONCERNES_SECTEUR",
        }
    }

} as const
