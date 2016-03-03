const regex = {
  /**
   * Matches a password rule, containing at least 6 characters: 1 lower case character,
   * 1 upper chase character, and at least 1 number.
   * http://regexr.com/3cshs
   * @type {RegExp}
   */
  password: /^$|^(?=^.{6,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,

  /**
   * Matches a USD currency amount (cents optional).
   * http://www.regexr.com/3cmml
   * @type {RegExp}
   */
  usd: /^[+-]?[0-9]{1,3}(?:(,[0-9]{3})*|([0-9]{3})*)(?:\.[0-9]{2})?$/,

  /**
   * Matches a USD currency amount (cents optional) over time (month, day, year, quarter).
   * http://www.regexr.com/3cmml
   * @type {RegExp}
   */
  usdOverTime: /^[+-]?[0-9]{1,3}(?:(,[0-9]{3})*|([0-9]{3})*)(?:\.[0-9]{2})?\/(month|day|year|week|quarter)$/,

  /**
   * Matches a UUID.
   * http://www.regexr.com/3cm4u
   * @type {RegExp}
   */
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
}

export default regex
