import style from '../styles/FaceForm.module.css'

export const FaceForm = () => {
  return (
    <fieldset className={style.fieldset}>
      <input id="title" className={style.title}/>
      <input id="image" type="file" accept="image/*" />
      <textarea id="description"/>
    </fieldset>
  )
}

export default FaceForm