import styles from '../css/Textarea.module.css'

function Textarea({ className = '', variant = 'primary', ...props }) {
    return (
        <textarea className={`${styles.textarea} ${styles[variant]} ${className}`} {...props}></textarea>
    )
}
export default Textarea;