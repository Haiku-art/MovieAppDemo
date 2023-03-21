/* import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tiny Movie App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tiny Movie App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
 */

/* import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonSearchbar,
	IonItem,
	IonLabel,
	IonSelect,
	IonSelectOption,
	IonPage
} from '@ionic/react';
import { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';
import { SearchType } from '../hooks/useApi';

const Home: React.FC = () => {
	const { searchData } = useApi();

	const [searchTerm, setSearchTerm] = useState('');
	const [type, setType] = useState<SearchType>(SearchType.all);
	const [results, setResults] = useState([]);

	useEffect(() => {
		console.log('SEARCH CHANGED');
	}, [searchTerm, type]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>My Movie Search</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<IonSearchbar
					value={searchTerm}
					debounce={300}
					onIonChange={(e) => setSearchTerm(e.detail.value!)}
				></IonSearchbar>

				<IonItem>
					<IonLabel>Select Searchtype</IonLabel>
					<IonSelect value={type} onIonChange={(e) => setType(e.detail.value)}>
						<IonSelectOption value="">All</IonSelectOption>
						<IonSelectOption value="movie">Movie</IonSelectOption>
						<IonSelectOption value="series">Series</IonSelectOption>
						<IonSelectOption value="episode">Episode</IonSelectOption>
					</IonSelect>
				</IonItem>
			</IonContent>
		</IonPage>
	);
};

export default Home; */

import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonSearchbar,
	IonItem,
	IonLabel,
	IonSelect,
	IonSelectOption,
	IonAvatar,
	IonIcon,
	IonList,
	IonImg,
	IonPage
} from '@ionic/react';
import { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';
import { SearchType } from '../hooks/useApi';
import { gameControllerOutline, tvOutline, videocamOutline } from 'ionicons/icons';

const Home: React.FC = () => {
	const { searchData } = useApi();

	const [searchTerm, setSearchTerm] = useState('');
	const [type, setType] = useState<SearchType>(SearchType.all);
	const [results, setResults] = useState([]);

	useEffect(() => {
		if (searchTerm === '') {
			setResults([]);
			return;
		}
		const loadData = async () => {
			const result = await searchData(searchTerm, type);
			if (result.Search) {
				setResults(result.Search);
			} else {
				// TODO
			}
		};
		loadData();
	}, [searchTerm, type]);

	return (
		<IonPage id="H01">
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>&#128526; Tiny Movie App </IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<IonSearchbar
					value={searchTerm}
					debounce={300}
					onIonChange={(e) => setSearchTerm(e.detail.value!)}
					color="light"
				></IonSearchbar>

				<IonItem>
					<IonLabel>Select Searchtype</IonLabel>
					<IonSelect value={type} onIonChange={(e) => setType(e.detail.value)}>
						<IonSelectOption value="">All</IonSelectOption>
						<IonSelectOption value="movie">Movie</IonSelectOption>
						<IonSelectOption value="series">Series</IonSelectOption>
						<IonSelectOption value="episode">Episode</IonSelectOption>
					</IonSelect>
				</IonItem>

				<IonList>
					{results.map((item: any) => (
						<IonItem button routerLink={`/movies/${item.imdbID}`} key={item.imdbID}>
							<IonAvatar slot="start">{item.Poster && <IonImg src={item.Poster} />}</IonAvatar>

							<IonLabel className="ion-text-wrap">{item.Title}</IonLabel>

							{item.Type === 'movie' && <IonIcon color="light" slot="end" icon={videocamOutline} />}
							{item.Type === 'series' && <IonIcon color="light" slot="end" icon={tvOutline} />}
							{item.Type === 'game' && <IonIcon color="light" slot="end" icon={gameControllerOutline} />}
						</IonItem>
					))}
				</IonList>

				<IonImg src="assets/images/movieticket.png" id="popcorn"></IonImg>
				<h1><b>Welcome to Tiny Movie App </b></h1>
				<p>You can search for movies, series and episodes from IMDb.</p>



			</IonContent>
			
		</IonPage>
	);
};

export default Home;