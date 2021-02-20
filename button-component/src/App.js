import ButtonDesc from './components/ButtonDesc';

export default function App() {
  return (
    <main className='button-components'>
      <h1>Buttons</h1>
      
      <div className='buttons'>
        <ButtonDesc
          color={'default'}
          desc={''}
        />
        <ButtonDesc
          color={'default'}
          state={'hover-focus'}
        />
      </div>

      <div className='Buttons'>
        <ButtonDesc
          variant={'outline'}
          desc={'variant="outline"'}
        />
        <ButtonDesc 
          variant={'outline'}
          state={'hover-focus'}
        />
      </div>
      
      <div className='buttons'>
        <ButtonDesc
          variant={'text'}
          desc={'variant="text"'}
        />
        <ButtonDesc
          variant={'text'}
          state={'hover-focus'}
        />
      </div>

      <div className='buttons'>
        <ButtonDesc
          variant={'disable-shadow'}
          desc={'disableShadow'}
        />
      </div>

      <div className='buttons'>
        <ButtonDesc
          isDisabled={true}
          desc={'disabled'}
        />
        <ButtonDesc
          isDisabled={true}
          variant={'text'}
          desc={'variant="text" disabled'}
        />
      </div>

      <div className='buttons'>
        <ButtonDesc 
          color={'primary'}
          iconPosition={'start'}
          desc={'startIcon="local_grocery_store"'}
        />
        <ButtonDesc 
          color={'primary'}
          iconPosition={'end'}
          desc={'endIcon="local_grocery_store"'}

        />
      </div>

      <div className='buttons'>
        <ButtonDesc
          size={'sm'}
          color={'primary'}
          desc={'size="sm"'}
        />
        <ButtonDesc
          size={'md'}
          color={'primary'}
          desc={'size="md"'}
        />
        <ButtonDesc
          size={'lg'}
          color={'primary'}
          desc={'size="lg"'}
        />
      </div>
      
      <div className='buttons'>
        <ButtonDesc
          color={'default'}
          desc={'color="default"'}
        />
        <ButtonDesc
          color={'primary'}
          desc={'color="primary"'}
        />
        <ButtonDesc
          color={'secondary'}
          desc={'color="secondary"'}
        />
        <ButtonDesc
          color={'danger'}
          desc={'color="danger"'}
        />
      </div>

      <div className='buttons'>
        <ButtonDesc
          color={'default'}
          state={'hover-focus'}
        />
        <ButtonDesc
          color={'primary'}
          state={'hover-focus'}
          desc={''}
          />
        <ButtonDesc
          color={'secondary'}
          state={'hover-focus'}
          desc={''}
          />
        <ButtonDesc
          color={'danger'}
          state={'hover-focus'}
          desc={''}
        />
      </div>
      <footer>
        <div>
          Icons: <a href="https://material.io/resources/icons/?style=round">https://material.io/resources/icons/?style=round</a>
        </div>
        <div>
          Kirill Chubko @ DevChallenges.io
        </div>
      </footer>
    </main>
  );
}