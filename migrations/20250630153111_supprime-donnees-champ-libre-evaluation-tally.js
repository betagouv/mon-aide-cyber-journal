/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex('journal_mac.evenements').then((lignes) => {
  const reponsesTally = lignes.filter(ligne => ligne.type === 'REPONSE_TALLY_RECUE');
  const misesAJour = reponsesTally.map(reponse => {
    const { reponses, ...reste } = reponse.donnees
    const reponsesAConserver = reponses.filter(reponse => typeof reponse.valeur === 'number');
    const nouvelleReponse = { ...reste, reponses: reponsesAConserver };
    return knex('journal_mac.evenements').where('id', reponse.id).update({
      donnees: nouvelleReponse,
    });
  });
  return Promise.all(misesAJour);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

};
