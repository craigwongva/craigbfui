/**
 * Copyright 2016, RadiantBlue Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

const styles: any = require('./Navigation.css')
const brand: string = require('../images/brand-experiment2.svg')
const brandSmall: string = require('../images/brand-small-circle.svg')

import * as React from 'react'
import {Link} from './Link'

const Icon = ({ path }) => (
  <svg className={styles.icon} viewBox="0 0 40 40">
    <g className={styles.iconShadow} transform="translate(0, 2)">
      <path d={path} fillRule="evenodd"/>
    </g>
    <path d={path} fillRule="evenodd"/>
  </svg>
)

interface Props {
  activeRoute: { pathname: string, search: string, hash: string }
  onClick(loc: { pathname: string, search: string, hash: string }): void
}

export const Navigation = ({ activeRoute, onClick }: Props) => (
  <nav className={`${styles.root} ${activeRoute.pathname === '/' ? styles.atHome : ''}`}>
    <Link pathname="/about" onClick={onClick}>
      <img className={styles.brand} src={brand} alt="Beachfront"/>
    </Link>
    <ul>
      <li className={styles.home}>
        <Link pathname="/" className={styles.linkHome} activeClassName={styles.active} onClick={onClick}>
          <img className={styles.complexIcon} src={brandSmall} alt="Beachfront"/>
          <svg className={styles.icon} viewBox="0 0 64 64"><path d="M59.6305489,46.0698989 C54.5032913,56.1187691 44.0552444,63 32,63 C14.8791728,63 1,49.1208272 1,32 C1,28.0810946 1.72718288,24.3320319 3.05397516,20.8803853 L59.6305489,46.0698989 Z M61.996774,39.8525794 C62.6514818,37.3446727 63,34.7130367 63,32 C63,14.8791728 49.1208272,1 32,1 C21.1717335,1 11.6401539,6.55177631 6.09644201,14.9641481 L61.996774,39.8525794 Z" fillRule="evenodd"/></svg>
        </Link>
      </li>
      <li>
        <Link pathname="/jobs" search={activeRoute.search} className={styles.linkJobs} activeClassName={styles.active} onClick={onClick}>
          <Icon path="M13.5589135,25.5589135 L8,20 L20,8 L23.9505138,11.9505138 C23.2880814,12.2969707 22.7037162,12.732624 22.1878372,13.2558341 L23.6119931,14.660035 C24.124968,14.1397702 24.7275842,13.7418864 25.4601299,13.4601299 L32,20 L20,32 L15.0780494,27.0780494 C15.8268777,26.7966408 16.4990221,26.4371481 17.1016684,26.000657 L15.9284865,24.3808903 C15.2648933,24.8615247 14.4788818,25.2253895 13.5358199,25.4698104 L13.5589135,25.5589135 Z M19.9224238,17.0413914 L21.7831226,17.77474 C22.1908354,16.740265 22.5801678,15.9718355 23.0440022,15.3334747 L21.4260143,14.1578409 C20.8472404,14.9543891 20.3867667,15.863231 19.9224238,17.0413914 Z M19.3513683,18.5888408 C19.2678095,18.8239487 19.2274209,18.9374763 19.1844797,19.0576066 C18.9197448,19.7982164 18.7334951,20.2907933 18.5296779,20.7732179 L20.3720036,21.5515728 C20.5937477,21.0267159 20.791388,20.5040141 21.067777,19.7308013 C21.1113096,19.6090168 21.1522715,19.4938774 21.2357615,19.2589618 C21.3236693,19.0117633 21.3802234,18.8535965 21.4388691,18.6915292 L19.558212,18.0109936 C19.4980101,18.1773611 19.4404198,18.3384262 19.3513683,18.5888408 Z M16.5987246,23.8170739 L17.99286,25.2510845 C18.7639387,24.501447 19.3827569,23.6094337 19.9221683,22.5323012 L18.1338755,21.6367517 C17.6884398,22.5262273 17.1952799,23.2371069 16.5987246,23.8170739 Z"/>
          <span className={styles.label}>Jobs</span>
        </Link>
      </li>
      <li>
        <Link pathname="/create-job" className={styles.linkCreateJob} activeClassName={styles.active} onClick={onClick}>
          <Icon path="M10.5589135,25.5589135 L5,20 L17,8 L20.9505138,11.9505138 C20.2880814,12.2969707 19.7037162,12.732624 19.1878372,13.2558341 L20.6119931,14.660035 C21.124968,14.1397702 21.7275842,13.7418864 22.4601299,13.4601299 L29,20 L17,32 L12.0780494,27.0780494 C12.8268777,26.7966408 13.4990221,26.4371481 14.1016684,26.000657 L12.9284865,24.3808903 C12.2648933,24.8615247 11.4788818,25.2253895 10.5358199,25.4698104 L10.5589135,25.5589135 Z M31.6785714,29.3214286 L31.6785714,25 L29.3214286,25 L29.3214286,29.3214286 L25,29.3214286 L25,31.6785714 L29.3214286,31.6785714 L29.3214286,36 L31.6785714,36 L31.6785714,31.6785714 L36,31.6785714 L36,29.3214286 L31.6785714,29.3214286 Z M16.9224238,17.0413914 L18.7831226,17.77474 C19.1908354,16.740265 19.5801678,15.9718355 20.0440022,15.3334747 L18.4260143,14.1578409 C17.8472404,14.9543891 17.3867667,15.863231 16.9224238,17.0413914 Z M16.3513683,18.5888408 C16.2678095,18.8239487 16.2274209,18.9374763 16.1844797,19.0576066 C15.9197448,19.7982164 15.7334951,20.2907933 15.5296779,20.7732179 L17.3720036,21.5515728 C17.5937477,21.0267159 17.791388,20.5040141 18.067777,19.7308013 C18.1113096,19.6090168 18.1522715,19.4938774 18.2357615,19.2589618 C18.3236693,19.0117633 18.3802234,18.8535965 18.4388691,18.6915292 L16.558212,18.0109936 C16.4980101,18.1773611 16.4404198,18.3384262 16.3513683,18.5888408 Z M13.5987246,23.8170739 L14.99286,25.2510845 C15.7639387,24.501447 16.3827569,23.6094337 16.9221683,22.5323012 L15.1338755,21.6367517 C14.6884398,22.5262273 14.1952799,23.2371069 13.5987246,23.8170739 Z"/>
          <span className={styles.label}>Create Job</span>
        </Link>
      </li>
      <li>
        <Link pathname="/product-lines" className={styles.linkProductLines} activeClassName={styles.active} onClick={onClick}>
          <Icon path="M9.3674987,31.9446632 L9,31.5771645 L13.9497475,26.627417 L16.0883464,28.7660159 C15.9713465,28.8668939 15.851997,28.9657321 15.7303303,29.0625518 L16.9756869,30.6275077 C17.1566375,30.4835113 17.3333963,30.3355307 17.5058607,30.1835303 L18.8994949,31.5771645 L13.9497475,36.5269119 L11.0120247,33.5891892 C11.1020899,33.5634956 11.1922051,33.5371492 11.2823525,33.5101404 L10.7083471,31.5942808 C10.2603124,31.7285152 9.81232931,31.844876 9.3674987,31.9446632 Z M16.8166515,28.0801074 L14.6568542,25.9203102 L19.6066017,20.9705627 L20.85206,22.2160211 L19.8066976,22.0330705 C19.5795432,23.3310094 19.1888676,24.4975395 18.6470824,25.5421819 L20.4225091,26.4629752 C20.9674099,25.4123253 21.3798593,24.2637177 21.6516617,23.0156227 L24.5563492,25.9203102 L19.6066017,30.8700577 L18.2310155,29.4944714 C18.8484971,28.8614465 19.3995917,28.1675844 19.8783793,27.4108157 L18.1882373,26.3415075 C17.7898306,26.9712266 17.3314264,27.5499649 16.8166515,28.0801074 Z M20.0391273,19.1238236 L19.6066017,19.5563492 L14.6568542,14.6066017 L19.6066017,9.65685425 L22.2634175,12.31367 L21.6549883,11.9944668 C21.0203657,13.2041126 20.5653249,14.5673215 20.3027053,16.0878934 L22.2735274,16.4282761 C22.4742764,15.2659355 22.8001942,14.2232048 23.24201,13.2922625 L24.5563492,14.6066017 L21.8367228,17.3262281 L20.1545014,17.1412235 C20.0845357,17.7774117 20.045875,18.4381606 20.0391273,19.1238236 Z M21.3034078,21.2531552 L25.263456,25.2132034 L30.2132034,20.263456 L25.263456,15.3137085 L22.0550757,18.5220887 C22.044486,18.7730013 22.0388167,19.0283221 22.0381291,19.2880863 C22.0362727,19.9893636 21.998912,20.6672003 21.9267446,21.3218687 L21.3034078,21.2531552 Z M22.2890959,10.9251349 L20.3137085,8.94974747 L25.263456,4 L27.7586021,6.49514615 C27.2161808,6.72607369 26.6912335,6.98827435 26.1865369,7.28362519 L27.1966883,9.00977531 C27.8554732,8.62425122 28.5606456,8.30227427 29.3029095,8.03945354 L30.2132034,8.94974747 L25.263456,13.8994949 L22.6500909,11.2861299 L23.9053744,12.1069584 C24.5825874,11.0713045 25.4298345,10.2090603 26.4285114,9.50392616 L25.2749422,7.8701336 C24.1031563,8.69749449 23.0980412,9.7118838 22.2890959,10.9251349 Z M13.9497475,15.3137085 L18.8994949,20.263456 L13.9497475,25.2132034 L9,20.263456 L13.9497475,15.3137085 Z M11.6088639,31.2989232 L12.2821905,33.1821734 C13.6501535,32.6930797 14.9278007,32.0651402 16.0848579,31.2815773 L14.9634069,29.6255737 C13.9531626,30.3097145 12.8255399,30.8639198 11.6088639,31.2989232 Z"/>
          <span className={styles.label}>View Product Lines</span>
        </Link>
      </li>
      <li>
        <Link pathname="/create-product-line" className={styles.linkCreateProductLine} activeClassName={styles.active} onClick={onClick}>
          <Icon path="M6.3674987,31.9446632 L6,31.5771645 L10.9497475,26.627417 L13.0883464,28.7660159 C12.9713465,28.8668939 12.851997,28.9657321 12.7303303,29.0625518 L13.9756869,30.6275077 C14.1566375,30.4835113 14.3333963,30.3355307 14.5058607,30.1835303 L15.8994949,31.5771645 L10.9497475,36.5269119 L8.01202471,33.5891892 C8.10208991,33.5634956 8.19220513,33.5371492 8.28235248,33.5101404 L7.70834711,31.5942808 C7.26031245,31.7285152 6.81232931,31.844876 6.3674987,31.9446632 Z M13.8166515,28.0801074 L11.6568542,25.9203102 L16.6066017,20.9705627 L17.85206,22.2160211 L16.8066976,22.0330705 C16.5795432,23.3310094 16.1888676,24.4975395 15.6470824,25.5421819 L17.4225091,26.4629752 C17.9674099,25.4123253 18.3798593,24.2637177 18.6516617,23.0156227 L21.5563492,25.9203102 L16.6066017,30.8700577 L15.2310155,29.4944714 C15.8484971,28.8614465 16.3995917,28.1675844 16.8783793,27.4108157 L15.1882373,26.3415075 C14.7898306,26.9712266 14.3314264,27.5499649 13.8166515,28.0801074 Z M17.0391273,19.1238236 L16.6066017,19.5563492 L11.6568542,14.6066017 L16.6066017,9.65685425 L19.2634175,12.31367 L18.6549883,11.9944668 C18.0203657,13.2041126 17.5653249,14.5673215 17.3027053,16.0878934 L19.2735274,16.4282761 C19.4742764,15.2659355 19.8001942,14.2232048 20.24201,13.2922625 L21.5563492,14.6066017 L18.8367228,17.3262281 L17.1545014,17.1412235 C17.0845357,17.7774117 17.045875,18.4381606 17.0391273,19.1238236 Z M18.3034078,21.2531552 L22.263456,25.2132034 L27.2132034,20.263456 L22.263456,15.3137085 L19.0550757,18.5220887 C19.044486,18.7730013 19.0388167,19.0283221 19.0381291,19.2880863 C19.0362727,19.9893636 18.998912,20.6672003 18.9267446,21.3218687 L18.3034078,21.2531552 Z M19.2890959,10.9251349 L17.3137085,8.94974747 L22.263456,4 L24.7586021,6.49514615 C24.2161808,6.72607369 23.6912335,6.98827435 23.1865369,7.28362519 L24.1966883,9.00977531 C24.8554732,8.62425122 25.5606456,8.30227427 26.3029095,8.03945354 L27.2132034,8.94974747 L22.263456,13.8994949 L19.6500909,11.2861299 L20.9053744,12.1069584 C21.5825874,11.0713045 22.4298345,10.2090603 23.4285114,9.50392616 L22.2749422,7.8701336 C21.1031563,8.69749449 20.0980412,9.7118838 19.2890959,10.9251349 Z M31.6785714,29.3214286 L31.6785714,25 L29.3214286,25 L29.3214286,29.3214286 L25,29.3214286 L25,31.6785714 L29.3214286,31.6785714 L29.3214286,36 L31.6785714,36 L31.6785714,31.6785714 L36,31.6785714 L36,29.3214286 L31.6785714,29.3214286 Z M10.9497475,15.3137085 L15.8994949,20.263456 L10.9497475,25.2132034 L6,20.263456 L10.9497475,15.3137085 Z M8.6088639,31.2989232 L9.28219046,33.1821734 C10.6501535,32.6930797 11.9278007,32.0651402 13.0848579,31.2815773 L11.9634069,29.6255737 C10.9531626,30.3097145 9.8255399,30.8639198 8.6088639,31.2989232 Z"/>
          <span className={styles.label}>Create Product Line</span>
        </Link>
      </li>
      <li>
        <a href="/docs/user-guide.html" className={styles.linkHelp} target="user-guide">
          <Icon path="M20,32 C26.627417,32 32,26.627417 32,20 C32,13.372583 26.627417,8 20,8 C13.372583,8 8,13.372583 8,20 C8,26.627417 13.372583,32 20,32 Z M18.8009868,25.1803043 L21.9255757,25.1803043 L21.9255757,28.2105263 L18.8009868,28.2105263 L18.8009868,25.1803043 Z M17.0604441,13.3949424 C17.8852837,12.8636898 18.8988427,12.5980674 20.1011513,12.5980674 C21.680929,12.5980674 22.993313,12.9755308 24.0383429,13.7304687 C25.0833728,14.4854067 25.6058799,15.6038166 25.6058799,17.0857319 C25.6058799,17.9944536 25.3787029,18.7598653 24.9243421,19.3819901 C24.6587158,19.7594591 24.1484413,20.2417734 23.3935033,20.8289474 L22.6490543,21.4056332 C22.2436246,21.7201907 21.9745072,22.087169 21.8416941,22.5065789 C21.7578121,22.7722053 21.7123767,23.1846189 21.7053865,23.7438322 L18.8743832,23.7438322 C18.9163242,22.5624941 19.0281652,21.7464044 19.2099095,21.2955387 C19.3916539,20.8446729 19.859988,20.3256608 20.614926,19.7384868 L21.3803454,19.1408306 C21.6319914,18.9520961 21.8347032,18.7458893 21.9884868,18.5222039 C22.2680935,18.1377448 22.4078947,17.7148461 22.4078947,17.2534951 C22.4078947,16.7222424 22.2523659,16.2381806 21.9413035,15.8012952 C21.630241,15.3644098 21.0622985,15.1459704 20.2374589,15.1459704 C19.4265996,15.1459704 18.851667,15.4150878 18.5126439,15.9533306 C18.1736208,16.4915734 18.0041118,17.0507783 18.0041118,17.6309622 L14.9738898,17.6309622 C15.0577718,15.6387647 15.7532829,14.2267723 17.0604441,13.3949424 Z"/>
          <span className={styles.label}>User's Guide</span>
        </a>
      </li>
    </ul>
  </nav>
)
