<?php

namespace Icap\WikiBundle\Manager;

use Icap\WikiBundle\Entity\Contribution;
use Icap\WikiBundle\Entity\Section;
use Icap\WikiBundle\Repository\ContributionRepository;
use JMS\DiExtraBundle\Annotation as DI;
use Icap\HtmlDiff\HtmlDiff;

/**
 * @DI\Service("icap.wiki.contribution_manager")
 */
class ContributionManager
{
	/** @var \Icap\WikiBundle\Repository\ContributionRepository */
    protected $contributionRepository;

    /**
     * @DI\InjectParams({
     *     "contributionRepository" = @DI\Inject("icap.wiki.contribution_repository")
     * })
     */
    public function __construct(ContributionRepository $contributionRepository)
    {
        $this->contributionRepository = $contributionRepository;
    }

    /**
     * @return \Icap\WikiBundle\Repository\ContributionRepository
     */
    public function getContributionRepository ()
    {
        return $this->contributionRepository;
    }

    /**
     * @param Section $section
     * @param array $ids
     * @return array $contributions
     */
    public function compareContributions (Section $section, $ids)
    {
    	$contributions = $this->contributionRepository->findyBySectionAndIds($section, $ids);
    	$titleDiff = new HtmlDiff($contributions[0]->getTitle(), $contributions[1]->getTitle(), false);
    	$textDiff = new HtmlDiff($contributions[0]->getText(), $contributions[1]->getText(), true);
    	$contributions[0]->setText($textDiff->outputDiff()->toString());
    	$contributions[1]->setText($textDiff->outputDiff()->toString());

    	return $contributions;
    }
}