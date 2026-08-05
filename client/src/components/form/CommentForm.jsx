import Textarea from './Textarea';
import SubmitButton from './SubmitButton';

export default function CommentForm() {
  return (
    <form>
      <Textarea
        label='댓글 달기'
        type='text'
        id='comment'
        placeholder='댓글을 입력해주세요'
        varient='comment'
      />
      <SubmitButton>
        등록
      </SubmitButton>
    </form>
  )
}