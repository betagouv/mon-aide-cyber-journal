/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
// On devrait récupérer les identifiants via un fichier ou une variable d'env... à discuter
const lesIdentifiants = process.env.IDENTIFIANTS_GENDARMES?.split(',') || [];

exports.up = knex => {
  knex('journal_mac.evenements').then(lignes => {
    const aidantsCrees = lignes.filter(l => l.type === 'AIDANT_CREE');
    const misesAJour = aidantsCrees.filter(a => lesIdentifiants.includes(a.donnees.identifiant))
      .map(a => {
        const { typeAidant, ...reste } = a.donnees;
        const donneesMisesAJour = {...reste, typeAidant: 'Gendarme'};
        return knex('journal_mac.evenements').where('id', a.id).update({
          donnees: donneesMisesAJour,
        });
      });
    return Promise.all(misesAJour);
  });
};

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

};
