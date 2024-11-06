import React, { useState, useEffect } from 'react';

const MedicalAnalyzer = () => {
  const [symptomsData, setSymptomsData] = useState([]);
  const [doctorsData, setDoctorsData] = useState({});
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [followUpAnswers, setFollowUpAnswers] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');
  const [medication, setMedication] = useState('');
  const [doctorRecommendations, setDoctorRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        
        // Log the response before parsing to JSON
        const text = await response.text();
        console.log("Response Text:", text);  // See the actual content of the response
  
        // Check if the response is successful (status 200)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = JSON.parse(text);  // Manually parse the JSON text
        console.log("Parsed JSON Data:", data);
        
        setSymptomsData(data.symptoms);
        setDoctorsData(data.doctors);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    setTimeout(() => { // Simulate loading time
      const symptomData = symptomsData.find(item => item.symptom === selectedSymptom);
      if (symptomData) {
        const answers = followUpAnswers;
        const diagnosisMessages = [];
        const medicationMessages = [];

        symptomData.followUpQuestions.forEach((question, index) => {
          if (answers[index]) {
            diagnosisMessages.push(symptomData.diagnosis[answers[index]].message);
            medicationMessages.push(symptomData.diagnosis[answers[index]].medicine);
          }
        });

        setDiagnosis(diagnosisMessages.length ? diagnosisMessages.join(" ") : "Diagnosis not found.");
        setMedication(medicationMessages.length ? medicationMessages.join(" ") : "No medication recommended.");

        // Update doctor recommendations based on the symptom
        setDoctorRecommendations(doctorsData[selectedSymptom] || []);
      }

      setLoading(false); // End loading
    }, 2000); // 2 seconds loading time
  };

  const filteredSymptoms = symptomsData.filter(item =>
    item.symptom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className='flex flex-col border-2 border-blue-200 rounded-md h-[600px] w-[700px]'>
        <h1 className="text-3xl font-bold mb-4 text-center py-10">Medical Symptom Analyzer</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for a symptom..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value) {
                  setSelectedSymptom(''); // Reset selected symptom if search is cleared
                  setFollowUpAnswers({}); // Reset follow-up answers
                }
              }}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          {searchQuery && filteredSymptoms.length > 0 && (
            <div className="mb-4">
              <h2 className="mb-2">Select a symptom:</h2>
              <ul className="border border-gray-300 rounded max-h-32 overflow-y-auto">
                {filteredSymptoms.map((item) => (
                  <li
                    key={item.symptom}
                    onClick={() => {
                      setSelectedSymptom(item.symptom);
                      setFollowUpAnswers({}); // Reset previous answers when selecting a new symptom
                    }}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    {item.symptom}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedSymptom && (
            <div className="mb-4">
              <h2 className="mb-2">Follow-up questions for {selectedSymptom}:</h2>
              {symptomsData
                .find((item) => item.symptom === selectedSymptom)
                .followUpQuestions.map((question, index) => (
                  <div key={index} className="mb-2">
                    <label className="block">{question.question}</label>
                    <select
                      className="border border-gray-300 p-2 rounded w-full"
                      onChange={(e) => {
                        setFollowUpAnswers({
                          ...followUpAnswers,
                          [index]: e.target.value,
                        });
                      }}
                    >
                      <option value="">Select an answer</option>
                      {question.options.map((option, idx) => (
                        <option key={idx} value={idx + 1}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
            </div>
          )}

          <div className="mb-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              {loading ? 'Analyzing...' : 'Analyze Symptoms'}
            </button>
          </div>
        </form>

        {diagnosis && (
          <div className="p-4 border-t-2 border-gray-300">
            <h3 className="font-bold">Diagnosis</h3>
            <p>{diagnosis}</p>
            <h4 className="font-bold mt-4">Medication Recommendations</h4>
            <p>{medication}</p>
          </div>
        )}

        {doctorRecommendations.length > 0 && (
          <div className="p-4 border-t-2 border-gray-300">
            <h3 className="font-bold">Doctor Recommendations</h3>
            <ul>
              {doctorRecommendations.map((doctor, index) => (
                <li key={index}>
                  <p><strong>{doctor.name}</strong> ({doctor.specialty})</p>
                  <p>Contact: {doctor.contact}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalAnalyzer;

