import Header from './components/Header'
import Footer from './components/Footer'
import AddExerciseForm from './components/AddExerciseForm'
import RecordForm from './components/RecordForm'
import RecordList from './components/RecordList'
import SectionCard from './components/SectionCard'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow flex flex-col justify-center items-center">
        <div className="w-full max-w-lg p-6 bg-white rounded shadow-md mt-8 mb-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4 text-center">筋トレ記録アプリ</h1>
          <div className="w-full flex flex-col items-center gap-4">
            <AddExerciseForm />
            <RecordForm />
            <RecordList />
            <SectionCard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
