import style from '../styles/TitleHeader.module.css'

export const TitleHeader = () => (
  <header id={style.header}>
    <h1 className={style.h1}>
      <span className={style.org}>
        <span className={style['cap-letter']}>M</span>eta
        <span className={style['cap-letter']}>G</span>ame’s
      </span>
      <span className={style.year}>2023</span>
      <span className={style.event}>
        <span className={style['cap-letter']}>G</span>ifting
      </span>
    </h1>
    <h1 className={[style.outline, style.h1].join(' ')}>
      <span className={style.org}>
        <span className={style['cap-letter']}>M</span>eta
        <span className={style['cap-letter']}>G</span>ame’s
      </span>
      <span className={style.year}>2023</span>
      <span className={style.event}>
        <span className={style['cap-letter']}>G</span>ifting
      </span>
    </h1>
  </header>
)